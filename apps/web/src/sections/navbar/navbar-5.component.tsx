import { useState } from 'react';
import type { z } from 'zod';
import type { navbar5Schema } from '@static-site-generator/schema';
import { ActionLink } from '../../actions/action-link.component';
import { Button } from '../../components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../../components/ui/sheet';
import { Menu, ArrowRight } from 'lucide-react';

type Navbar5Props = z.infer<typeof navbar5Schema>;

export function Navbar5({
  logoSrc,
  logoText,
  brandTagline,
  actions,
  cta,
}: Navbar5Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-background">
      <div className="flex flex-col items-center gap-4 pt-6 pb-5 px-6">
        {/* Centered brand block */}
        <ActionLink
          action={{ type: 'route', to: '/' }}
          className="flex flex-col items-center gap-2 group"
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoText}
              className="w-11 h-11 rounded-2xl object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
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

        {/* Floating pill nav bar */}
        <div className="hidden md:flex items-center gap-1 bg-muted rounded-2xl px-2 py-1.5 ring-1 ring-border">
          {actions.map((item, index) => (
            <span key={index} className="flex items-center">
              <ActionLink
                action={item.action}
                className="px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground hover:text-foreground hover:bg-background rounded-xl transition-all duration-300"
              >
                {item.label}
              </ActionLink>
              {index < actions.length - 1 && (
                <span className="text-border text-xs select-none px-0.5">
                  ·
                </span>
              )}
            </span>
          ))}
          {cta && (
            <>
              <div className="w-px h-5 bg-border mx-1" />
              <ActionLink action={cta.action}>
                <Button className="gap-2 text-xs font-semibold uppercase tracking-widest rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
                  {cta.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </ActionLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-6 pb-4 border-t border-border">
        <ActionLink
          action={{ type: 'route', to: '/' }}
          className="flex items-center gap-2.5 group"
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoText}
              className="w-8 h-8 rounded-xl object-cover ring-1 ring-border"
            />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
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