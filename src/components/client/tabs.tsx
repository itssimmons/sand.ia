'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { Editor } from '@/components/ui/editor';
import ExperimentalActivity from '@/components/server/experimental-activity';

export default function Tabs() {
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ExperimentalActivity mode={searchParams.has('chat') ? 'visible' : 'hidden'}>
        <Editor.Chatbox />
      </ExperimentalActivity>
    </Suspense>
  );
}
