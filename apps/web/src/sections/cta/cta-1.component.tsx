import type { z } from 'zod';
import { cta1Schema } from '@static-site-generator/schema';
import { ActionLink } from '../../actions';

type Cta1Props = z.infer<typeof cta1Schema>;

export function Cta1({ heading, subheading, buttonLabel, buttonAction }: Cta1Props) {
  return (
    <section
      id="cta"
      className="flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: 'var(--color-muted)' }}
    >
      <h2 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>
        {heading}
      </h2>
      {subheading && (
        <p className="mt-2" style={{ color: 'var(--color-muted-foreground)' }}>
          {subheading}
        </p>
      )}
      {buttonLabel && buttonAction && (
        <ActionLink
          action={buttonAction}
          label={buttonLabel}
          className="mt-6 inline-block rounded-lg px-6 py-3 text-sm font-semibold"
          style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
        />
      )}
    </section>
  );
}
