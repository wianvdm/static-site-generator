import { lazy, Suspense, type FC } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { SectionsRenderer } from '../../src/engine';

const DevWrapper = import.meta.env.DEV
  ? lazy(() => import('../../src/dev').then((m) => ({ default: m.DevWrapper })))
  : (null as unknown as FC);

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen">
      {import.meta.env.DEV ? (
        <Suspense>
          <DevWrapper />
        </Suspense>
      ) : (
        <SectionsRenderer />
      )}
    </main>
  );
}
