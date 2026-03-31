import type { z } from 'zod';
import { hero1Schema } from '@static-site-generator/schema';
import { ActionLink } from '../../actions';

type Hero1Props = z.infer<typeof hero1Schema>;

export function Hero1({ heading, subheading, ctaLabel, ctaAction }: Hero1Props) {
  return (
    <section className="flex flex-col items-center justify-center p-16" style={{ minHeight: 'var(--spacing-section, 4rem)' }}>
      <h1 className="text-4xl font-bold" style={{ color: 'var(--color-foreground)' }}>
        {heading}
      </h1>
      {subheading && (
        <p className="mt-4 text-lg" style={{ color: 'var(--color-muted-foreground)' }}>
          {subheading}
        </p>
      )}
      {ctaLabel && ctaAction && (
        <ActionLink
          action={ctaAction}
          label={ctaLabel}
          className="mt-8 inline-block rounded-lg px-6 py-3 text-sm font-semibold"
          style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
        />
      )}
    </section>
  );
}
