import { createFileRoute } from '@tanstack/react-router';
import { SectionsRenderer } from '../../src/engine';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen">
      <SectionsRenderer />
    </main>
  );
}