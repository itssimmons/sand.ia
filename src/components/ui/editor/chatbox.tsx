'use client';
import { useRef, useState, startTransition, useEffect } from 'react';
import { marked } from 'marked';

import { ArrowUpward } from '../../icons';
import './chatbox.css';
import '@/app/markdown.css';

interface Message {
  id: number;
  sender: 'user' | 'assistant';
  content: string;
}

const downloadThinkingSession = async () => {
  const session = await LanguageModel.create({
    signal: AbortSignal.timeout(2 * 60 * 1000), // 2min timeout
    temperature: 0.9,
    topK: 20,
    expectedOutputs: [
      {
        type: 'text',
        languages: ['en'],
      },
    ],
    expectedInputs: [
      {
        type: 'text',
        languages: ['en'],
      },
    ],
    monitor(m) {
      m.addEventListener('downloadprogress', e => {
        console.log(`Downloaded ${e.loaded * 100}%`);
      });
    },
    initialPrompts: [
      {
        role: 'system',
        content: `Your goal is to think a bit deeper how the application could be built.
          
          Expected Model Behavior:
          - Analyze previous conversation messages thoroughly.
          - Generate a detailed plan step-by-step on how to proceed.
          - Suggest improvements or alternative approaches.
          - Maintain a thoughtful and analytical tone.
          - You must diagram at least 1 folder structure for the initialization of the project.
          - Provide at least 3 detailed steps in your plan.
            1. First step: focus on architecture design / project structure.
            2. Second step: focus on user experience.
            3. Third step: focus on performance optimization.

          Constraints:
          - Limit responses to a maximum of 5000 words.
          - Avoid repeating information from previous messages.
          - Focus on depth of analysis rather than breadth.
          - Avoid purpose to use old & unmaintained libraries (JQuery, Bootstrap...).
          
          User Interaction Examples:
          User: "How do I create a responsive navbar?"
          Assistant: "To create a responsive navbar, you can use CSS Flexbox or Grid. Here's a simple example using Flexbox..."
          Assistant: "After analyzing our previous discussion, here is a step-by-step plan to create the responsive navbar:
          1. Define the HTML structure for the navbar.
          2. Use CSS Flexbox to arrange the items horizontally.
          3. Implement media queries to adjust the layout for smaller screens.
          4. Test the navbar across different devices to ensure responsiveness."
          `,
      },
    ],
  });

  return session;
};

const downloadChatSession = async () => {
  const session = await LanguageModel.create({
    temperature: 0.7,
    topK: 40,
    expectedOutputs: [
      {
        type: 'text',
        languages: ['en'],
      },
    ],
    expectedInputs: [
      {
        type: 'text',
        languages: ['en'],
      },
    ],
    monitor(m) {
      m.addEventListener('downloadprogress', e => {
        console.log(`Downloaded ${e.loaded * 100}%`);
      });
    },
    initialPrompts: [
      {
        role: 'system',
        content: `You are an helpful assistant that helps users to create web applications.
          
          Expected Model Behavior:
          - Treat the user as a non-technical individual.
          - Explain concepts in simple terms.
          - Provide clear and concise responses to user prompts.
          - Suggest relevant code snippets and best practices.
          - Ask clarifying questions if the user's request is ambiguous.
          - Maintain a friendly and professional tone.
          
          Constraints:
          - Limit responses to a maximum of 250 words.
          - Avoid using technical jargon unless necessary.
          - Suggesting code snippets is absolutely prohibited.
          - DO NOT explain how to code, or run it, just provide your reasoning.
          - ALWAYS prefer TypeScript over JavaScript.
          - Use modern frameworks and libraries (React, Next.js, Shadcn, etc...).
          - Avoid the use of old or unmaintained libraries/frameworks/languages (JQuery, Bootstrap, JavaScript, CoffeeScript...).
          - Stick to the KISS principle (Keep It Simple, Stupid).
          
          User Interaction Examples:
          User: "How do I create a responsive navbar?"
          Assistant: "To create a responsive navbar, you can use CSS Flexbox or Grid. Let's create a simple example using Flexbox..."`,
      },
    ],
  });

  return session;
};

export default function Chatbox(props: React.HTMLAttributes<HTMLDivElement>) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [helperText, setHelperText] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  // singleton LLMs sessions
  const llmChatSessionRef = useRef<LanguageModel | null>(null);
  const llmThinkingSessionRef = useRef<LanguageModel | null>(null);

  function enterSubmit(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }

  async function streamResponse(input: string): Promise<Message | void> {
    if (!llmChatSessionRef.current) {
      console.error('LLM session not initialized');
      return;
    }

    const stream = llmChatSessionRef.current?.promptStreaming(input);

    const reader = stream.getReader();

    const message: Message = {
      id: Date.now(),
      sender: 'assistant',
      content: '',
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      for (const chunk of value) {
        message.content += chunk;
        startTransition(() => {
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.sender === 'assistant') {
              return [...prev.slice(0, -1), message];
            }
            return [...prev, message];
          });
        });
      }
    }

    reader.releaseLock();
    return message;
  }

  async function deeplyThinking(...lastMessages: [Message, Message]) {
    console.debug('Starting deep thinking...');

    if (!llmThinkingSessionRef.current) {
      console.error('LLM thinking session not initialized');
      return;
    }

    try {
      setHelperText('Thinking deeply...');
      const response = await llmThinkingSessionRef.current?.prompt([
        ...lastMessages.map(msg => ({
          role: msg.sender,
          content: msg.content,
        })),
        {
          role: 'user',
          content:
            'Think more deeply about the previous conversation, generate a plan step-by-step in what to do next, to generate the best possible application for what the user is trying to achieve.',
        },
      ]);

      return response;
    } catch (err) {
      console.error('Error during deep thinking prompt:', err);
    } finally {
      setHelperText('');
    }
  }

  const downloadModelIfNeeded = async () => {
    if (!llmChatSessionRef.current || !llmThinkingSessionRef.current) {
      try {
        setHelperText('Downloading LLMs...');
        const [chatSession, thinkingSession] = await Promise.all([
          downloadChatSession(),
          downloadThinkingSession(),
        ]);
        llmChatSessionRef.current = chatSession;
        llmThinkingSessionRef.current = thinkingSession;
      } catch (err) {
        console.error('Error downloading models:', err);
      } finally {
        setHelperText('');
      }
    }

    return await LanguageModel.availability();
  };

  const appendMessage = (input: string) => {
    const newMessage: Message = {
      id: Date.now(),
      sender: 'user',
      content: input,
    };

    setMessages(prev => [...prev, newMessage]);

    return newMessage;
  };

  async function thinking(...messages: [Message, Message]) {
    const thoughts = await deeplyThinking(...messages);
    if (thoughts) {
      console.debug('Deep thinking result:', thoughts);
    }
  }

  async function respond(input: string) {
    const completeResponse = await streamResponse(input);
    if (!completeResponse) return;
    return completeResponse;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const input = (formData.get('input') as string)?.trim() || '';
    if (!input) return;

    const userMessage = appendMessage(input);
    e.currentTarget.reset();

    const availability = await downloadModelIfNeeded();

    if (availability === 'available') {
      const assistantMessage = await respond(input);
      if (!assistantMessage) return;

      await thinking(userMessage, assistantMessage);
    }
  };

  return (
    // Watch out: reversed column layout
    <section className='flex h-full flex-col-reverse text-white pb-2 overflow-y-hidden'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-start bg-gray text-text px-4 py-3 gap-2 h-max mx-2 rounded-3xl relative
        before:content-[""] before:block before:h-1/2 before:w-full before:absolute before:top-[-50%] before:left-0 before:bg-linear-to-t before:from-background before:to-transparent before:pointer-events-none'
      >
        {helperText && (
          <div className='absolute top-[-26px] left-[14px] text-gray-400 text-sm font-medium select-none shine'>
            {helperText}
          </div>
        )}
        <textarea
          ref={inputRef}
          onKeyDown={enterSubmit}
          name='input'
          placeholder='Prompt your application here...'
          className='font-sans text-sm outline-none resize-none w-full scrollbar-hide placeholder:text-gray-400'
          rows={4}
        />

        <ul className='w-full flex justify-end'>
          <li>
            <button type='submit' className='p-2 rounded-full bg-white'>
              <ArrowUpward color='#1F1F21' />
            </button>
          </li>
        </ul>
      </form>

      <div
        className='flex flex-col gap-2 pb-6 pt-2 px-2 h-[calc(100vh-251px)] overflow-y-scroll'
        {...props}
      >
        {messages.map((msg, idx, arr) => {
          const prev = arr[idx - 1];
          const next = arr[idx + 1];

          const isFirstInGroup = !prev || prev.sender !== msg.sender;
          const isLastInGroup = !next || next.sender !== msg.sender;

          const paragraphClassNames = [
            'text-sm py-2 px-3 rounded-2xl font-sans max-w-[90%] min-w-[50%] w-max',
            !isFirstInGroup ? 'not-first-in-group' : '',
            !isLastInGroup ? 'not-last-in-group' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div
              key={msg.id + '-' + idx}
              data-sender={msg.sender}
              className='flex w-full'
            >
              <div
                className={paragraphClassNames}
                data-typo={msg.sender === 'assistant' ? 'markdown' : ''}
                dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
