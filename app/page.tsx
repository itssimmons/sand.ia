import Image from 'next/image';

import {
  Bug,
  Chatbox,
  Database,
  FolderOpen,
  Layers,
  MagnifyingGlass,
  Play,
  SidebarCollapsableRightIcon,
} from '@/components/icons';
import { Editor } from '@/src/components/ui/editor';
import { Preview } from '@/src/components/ui/preview';

export default function Home() {
  return (
    <main className='grid grid-cols-[425px_1fr] h-screen w-full overflow-hidden'>
      <aside className='flex flex-col border-r border-gray-700'>
        <Editor.List
          bordered={{ bottom: true }}
          data-role='title'
          className='min-h-[52px]'
        >
          <div className='flex items-center gap-2'>
            <Image src='/acme.png' alt='Logo' width={20} height={20} />
            <strong>ACME</strong>
          </div>

          <button className='flex flex-1'>
            <Play />
          </button>
        </Editor.List>

        <Editor.List
          as='nav'
          bordered={{ bottom: true }}
          direction='horizontal'
          justify='between'
        >
          <Editor.List nostyle direction='horizontal' gap={4}>
            <a href='#'>
              <Chatbox />
            </a>

            <a href='#'>
              <FolderOpen />
            </a>

            <a href='#'>
              <Database />
            </a>

            <a href='#'>
              <Layers />
            </a>

            <a href='#'>
              <MagnifyingGlass />
            </a>

            <a href='#'>
              <Bug />
            </a>
          </Editor.List>

          <Editor.List nostyle direction='horizontal'>
            <button>
              <SidebarCollapsableRightIcon />
            </button>
          </Editor.List>
        </Editor.List>

        <Editor.Chatbox />
      </aside>

      <section>
        <Editor.List
          bordered={{ bottom: true }}
          data-role='preview-toolbar'
          className='min-h-[52px]'
        >
          <Preview.Info />
          <Preview.UrlBar uri='https://wikipedia.org' />
          <Preview.Reload />
        </Editor.List>

        <Preview.WebView
          src='https://wikipedia.org'
          width='100%'
          height='100%'
          sandbox='allow-same-origin allow-scripts'
        ></Preview.WebView>
      </section>
    </main>
  );
}
