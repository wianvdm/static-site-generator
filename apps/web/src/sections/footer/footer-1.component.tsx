import type { z } from 'zod';
import { footer1Schema } from '@static-site-generator/schema';
import { ActionLink } from '../../actions';

type Footer1Props = z.infer<typeof footer1Schema>;

export function Footer1({ copyright, links }: Footer1Props) {
  return (
    <footer
      className="flex flex-col items-center justify-center gap-4 p-4"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      {links && links.length > 0 && (
        <ul className="flex gap-4 list-none m-0 p-0">
          {links.map((item, index) => (
            <li key={index}>
              <ActionLink
                action={item.action}
                label={item.label}
                className="text-sm"
                style={{ color: 'var(--color-muted-foreground)' }}
              />
            </li>
          ))}
        </ul>
      )}
      {copyright && (
        <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
          {copyright}
        </p>
      )}
    </footer>
  );
}
