import { useState } from 'react';
import type { z } from 'zod';
import type { navbar3Schema } from '@static-site-generator/schema';
import { ActionLink } from '../../actions/action-link.component';
import { Button } from '../../components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../../components/ui/sheet';
import { Menu, ArrowRight } from 'lucide-react';

type Navbar3Props = z.infer<typeof navbar3Schema>;

export function Navbar3({
  logoSrc,
  logoText,
  brandTagline,
  actions,
  cta,
}: Navbar3Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background">
      {/* Desktop: inline flow centered */}
      <div className="hidden md:flex items-center justify-center px-6 py-4 gap-0">
        {/* Logo inline */}
        <ActionLink
          action={{ type: 'route', to: '/' }}
          className="flex items-center gap-2.5 group px-5 py-2 rounded-lg hover:bg-muted transition-colors duration-300 shrink-0"
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoText}
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
              {logoText.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-tight leading-tight">
              {logoText}
            </span>
            {brandTagline && (
              <span className="text-[9px] font-medium tracking-wide text-muted-foreground uppercase leading-tight">
                {brandTagline}
              </span>
            )}
          </div>
        </ActionLink>

        <div className="w-px h-8 bg-border mx-1" />

        {actions.map((item, index) => (
          <span key={index} className="flex items-center">
            <ActionLink
              action={item.action}
              className="px-5 py-2 text-xs font-medium tracking-wide text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors duration-300"
            >
              {item.label}
            </ActionLink>
            {index < actions.length - 1 || cta ? (
              <div className="w-px h-8 bg-border mx-1" />
            ) : null}
          </span>
        ))}

        {cta && (
          <ActionLink action={cta.action}>
            <Button className="gap-2 text-xs font-semibold uppercase tracking-widest rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 shrink-0">
              {cta.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </ActionLink>
        )}
      </div>

      {/* Mobile: simplified bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4">
        <ActionLink
          action={{ type: 'route', to: '/' }}
          className="flex items-center gap-2.5 group"
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoText}
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-border"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
              {logoText.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-tight leading-tight">
              {logoText}
            </span>
            {brandTagline && (
              <span className="text-[9px] font-medium tracking-wide text-muted-foreground uppercase leading-tight">
                {brandTagline}
              </span>
            )}
          </div>
        </ActionLink>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <div
              className="flex flex-col gap-1 pt-8 px-4"
              onClick={() => setOpen(false)}
            >
              {actions.map((item, index) => (
                <ActionLink
                  key={index}
                  action={item.action}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                </ActionLink>
              ))}
              {cta && (
                <>
                  <div className="h-px bg-border my-2" />
                  <ActionLink
                    action={cta.action}
                    className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-accent-foreground bg-accent rounded-lg"
                  >
                    {cta.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </ActionLink>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}