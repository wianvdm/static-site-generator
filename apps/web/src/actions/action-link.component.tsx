import { Link } from '@tanstack/react-router';
import type { Action } from '@static-site-generator/schema';

interface ActionLinkProps {
  action: Action;
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

export function ActionLink({ action, className, children, label }: ActionLinkProps) {
  const content = children ?? label;

  if (action.type === 'external') {
    return (
      <a
        href={action.href}
        target={action.openInNewTab ? '_blank' : undefined}
        rel={action.openInNewTab ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  if (action.type === 'scroll') {
    return (
      <a href={`#${action.targetId}`} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link to={action.to} className={className}>
      {content}
    </Link>
  );
}