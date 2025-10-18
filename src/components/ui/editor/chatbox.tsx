'use client';
import {
  useOptimistic,
  useRef,
  useState,
  startTransition,
  useEffect,
} from 'react';
import { marked } from 'marked';

import { ArrowUpward } from '../../icons';
import './chatbox.css';
import '@/app/markdown.css';

interface Message {
  id: number;
  sender: 'user' | 'assistant';
  content: string;
}

const createSession = async () => {
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
        content:
          'You are an helpful assistant that helps users to create web applications.',
      },
    ],
  });

  return session;
};

// Module-level singleton promise so we only create the session once on the client.
let llmSessionPromise: Promise<any> | null = null;

function getLLMSessionOnce() {
  if (!llmSessionPromise) {
    llmSessionPromise = createSession();
  }

  return llmSessionPromise;
}

export default function Chatbox(props: React.HTMLAttributes<HTMLDivElement>) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, newMessage: Message) => [
      ...state,
      { ...newMessage, content: newMessage.content + ' (processing...)' },
    ]
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const llmSessionRef = useRef<LanguageModel | null>(null);

  useEffect(() => {
    let mounted = true;

    getLLMSessionOnce()
      .then(session => {
        if (!mounted) return;
        llmSessionRef.current = session;
      })
      .catch(err => {
        console.error('Failed to create LLM session', err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  function enterSubmit(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }

  async function streamResponse(input: string) {
    if (!llmSessionRef.current) {
      console.error('LLM session not initialized');
      return;
    }

    const stream = llmSessionRef.current?.promptStreaming(input);

    const reader = stream.getReader();
    let assistantContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      for (const chunk of value) {
        assistantContent += chunk;
        startTransition(() => {
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.sender === 'assistant') {
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, content: assistantContent },
              ];
            }
            return [
              ...prev,
              {
                id: Date.now(),
                sender: 'assistant',
                content: assistantContent,
              },
            ];
          });
        });
      }
    }
    reader.releaseLock();
  }

  // Server action to create a new message
  async function createMessage(e: React.FormEvent<HTMLFormElement>) {
    // 'use server';

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const input = (formData.get('input') as string)?.trim();
    if (!input) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'user',
      content: input,
    };

    e.currentTarget.reset();

    startTransition(() => {
      addOptimistic(newMessage);
    });

    await new Promise(res => setTimeout(res, 250)); // fake delay
    
    setMessages(prev => [...prev, newMessage]);

    streamResponse(input);
  }

  return (
    // Watch out: reversed column layout
    <section className='flex h-full flex-col-reverse text-white pb-2 overflow-y-hidden'>
      <form
        onSubmit={createMessage}
        className='flex flex-col items-start bg-gray-800 px-4 py-3 gap-2 h-max mx-2 rounded-3xl'
      >
        <textarea
          ref={inputRef}
          onKeyDown={enterSubmit}
          name='input'
          placeholder='Prompt your application here...'
          className='font-sans text-sm outline-none resize-none w-full scrollbar-hide'
          rows={4}
        />

        <ul className='w-full flex justify-end'>
          <li>
            <button type='submit' className='p-2 rounded-full bg-white'>
              <ArrowUpward />
            </button>
          </li>
        </ul>
      </form>

      <div className='flex flex-col gap-2 p-2 h-[calc(100vh-251px)] overflow-y-scroll' {...props}>
        {optimisticMessages.map((msg, idx, arr) => {
          const prev = arr[idx - 1];
          const next = arr[idx + 1];

          const isFirstInGroup = !prev || prev.sender !== msg.sender;
          const isLastInGroup = !next || next.sender !== msg.sender;

          const paragraphClassNames = [
            'text-sm p-2 rounded-2xl font-sans max-w-[90%] min-w-[50%] w-max',
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
              <p
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
