'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import {
  Bug,
  Chatbox,
  Database,
  FolderOpen,
  Layers,
  MagnifyingGlass,
} from '@/components/icons';
import { Editor } from '@/components/ui/editor';
import Hydrated from './hydrated';

export default function Routing() {
  const searchParams = useSearchParams();

  return (
    <Hydrated>
      <Editor.List nostyle direction='horizontal' spacing={3}>
        <Link
          href='/?chat'
          shallow
          className={`text-gray-500 hover:text-primary aria-selected:text-primary`}
          aria-selected={searchParams.has('chat')}
        >
          <Chatbox />
        </Link>

        <Link
          href='/?filesystem'
          shallow
          className='text-gray-500 hover:text-primary aria-selected:text-primary'
          aria-selected={searchParams.has('filesystem')}
        >
          <FolderOpen />
        </Link>

        <Link
          href='/?database'
          shallow
          className='text-gray-500 hover:text-primary aria-selected:text-primary'
          aria-selected={searchParams.has('database')}
        >
          <Database />
        </Link>

        <Link
          href='/?layers'
          shallow
          className='text-gray-500 hover:text-primary aria-selected:text-primary'
          aria-selected={searchParams.has('layers')}
        >
          <Layers />
        </Link>

        <Link
          href='/?search'
          shallow
          className='text-gray-500 hover:text-primary aria-selected:text-primary'
          aria-selected={searchParams.has('search')}
        >
          <MagnifyingGlass />
        </Link>

        <Link
          href='/?debugger'
          shallow
          className='text-gray-500 hover:text-primary aria-selected:text-primary'
          aria-selected={searchParams.has('debugger')}
        >
          <Bug />
        </Link>
      </Editor.List>
    </Hydrated>
  );
}
