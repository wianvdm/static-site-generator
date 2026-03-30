import type { z } from 'zod';
import { ActionLink } from '../../actions';
import { navbar1Schema } from '@static-site-generator/schema';

type Navbar1Props = z.infer<typeof navbar1Schema>;

export function Navbar1({ logoText, actions }: Navbar1Props) {
  return (
    <nav className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <span className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
        {logoText}
      </span>
      <ul className="flex gap-4 list-none m-0 p-0">
        {actions.map((item, index) => (
          <li key={index}>
            <ActionLink
              action={item.action}
              className="text-sm text-muted-foreground"
              label={item.label}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}