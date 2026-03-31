import { createFileRoute } from '@tanstack/react-router';
import { SectionsRenderer } from '../../src/engine';
import { DevWrapper } from '../../src/dev';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen">
      {import.meta.env.DEV ? <DevWrapper /> : <SectionsRenderer />}
    </main>
  );
}
