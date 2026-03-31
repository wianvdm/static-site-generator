import { useState } from 'react';
import type { z } from 'zod';
import type { navbar2Schema } from '@static-site-generator/schema';
import { ActionLink } from '../../actions/action-link.component';
import { Button } from '../../components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../../components/ui/sheet';
import { Menu, ArrowRight } from 'lucide-react';

type Navbar2Props = z.infer<typeof navbar2Schema>;

export function Navbar2({
  logoSrc,
  logoText,
  brandTagline,
  actions,
  cta,
}: Navbar2Props) {
  const [open, setOpen] = useState(false);
  const midIndex = Math.ceil(actions.length / 2);
  const leftActions = actions.slice(0, midIndex);
  const rightActions = actions.slice(midIndex);

  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center px-6 py-5">
        {/* Left wing: links + extending line + dot */}
        <div className="hidden lg:flex items-center flex-1 gap-3">
          <div className="flex items-center gap-1">
            {leftActions.map((item, index) => (
              <ActionLink
                key={index}
                action={item.action}
                className="px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 rounded-lg hover:bg-muted"
              >
                {item.label}
              </ActionLink>
            ))}
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
        </div>

        {/* Center logo */}
        <ActionLink
          action={{ type: 'route', to: '/' }}
          className="flex flex-col items-center gap-1.5 shrink-0 px-6 group"
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoText}
              className="w-11 h-11 rounded-xl object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
              {logoText.charAt(0)}
            </div>
          )}
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold tracking-tight leading-tight">
              {logoText}
            </span>
            {brandTagline && (
              <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase leading-tight">
                {brandTagline}
              </span>
            )}
          </div>
        </ActionLink>

        {/* Right wing: dot + extending line + link + CTA */}
        <div className="hidden lg:flex items-center flex-1 gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
          <div className="flex-1 h-px bg-border" />
          <div className="flex items-center gap-1">
            {rightActions.map((item, index) => (
              <ActionLink
                key={index}
                action={item.action}
                className="px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 rounded-lg hover:bg-muted"
              >
                {item.label}
              </ActionLink>
            ))}
            {cta && (
              <>
                <div className="w-px h-5 bg-border mx-1" />
                <ActionLink action={cta.action}>
                  <Button className="gap-2 text-xs font-semibold uppercase tracking-widest rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300">
                    {cta.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </ActionLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden ml-auto">
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