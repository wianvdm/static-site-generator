import { useState } from 'react';
import type { z } from 'zod';
import type { sidebar1Schema } from '@static-site-generator/schema';
import { ActionLink } from '../../actions/action-link.component';
import { Button } from '../../components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../../components/ui/sheet';
import { Menu, ArrowRight } from 'lucide-react';

type Sidebar1Props = z.infer<typeof sidebar1Schema>;

export function Sidebar1({
  logoSrc,
  logoText,
  brandTagline,
  tagline,
  navigationLabel,
  actions,
  activeIndex,
  cta,
  ctaSubtext,
}: Sidebar1Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden sm:flex flex-col w-60 shrink-0 border-r border-border bg-muted/30">
        {/* Logo */}
        <ActionLink
          action={{ type: 'route', to: '/' }}
          className="flex items-center gap-3 px-5 pt-6 pb-3 group"
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoText}
              className="w-9 h-9 rounded-lg object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
              {logoText.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
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

        {/* Tagline */}
        {tagline && (
          <p className="px-5 pb-4 text-[10px] text-muted-foreground leading-relaxed italic">
            {tagline}
          </p>
        )}

        <div className="h-px bg-border mx-4" />

        {/* Navigation label */}
        {navigationLabel && (
          <span className="px-5 pt-4 pb-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">
            {navigationLabel}
          </span>
        )}

        {/* Links with active state */}
        <div className="flex flex-col gap-0.5 px-3 flex-1">
          {actions.map((item, index) => (
            <ActionLink
              key={index}
              action={item.action}
              className={
                index === activeIndex
                  ? 'flex items-center gap-3 px-3 py-2.5 text-xs font-medium tracking-wide text-primary bg-primary/5 rounded-r-lg border-l-2 border-primary transition-all duration-300'
                  : 'flex items-center gap-3 px-3 py-2.5 text-xs font-medium tracking-wide text-muted-foreground hover:text-primary hover:bg-background rounded-r-lg border-l-2 border-transparent hover:border-primary transition-all duration-300'
              }
            >
              {item.label}
            </ActionLink>
          ))}
        </div>

        {/* CTA pinned to bottom */}
        {cta && (
          <div className="px-4 pb-5 pt-4 border-t border-border mt-auto">
            <ActionLink action={cta.action}>
              <Button className="flex items-center justify-center gap-2 w-full text-xs font-semibold uppercase tracking-widest rounded-lg hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
                {cta.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </ActionLink>
            {ctaSubtext && (
              <p className="text-center text-[10px] text-muted-foreground mt-2">
                {ctaSubtext}
              </p>
            )}
          </div>
        )}
      </nav>

      {/* Mobile: horizontal top bar */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
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
                {navigationLabel && (
                  <span className="px-4 pb-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">
                    {navigationLabel}
                  </span>
                )}
                {actions.map((item, index) => (
                  <ActionLink
                    key={index}
                    action={item.action}
                    className={
                      index === activeIndex
                        ? 'px-4 py-3 text-sm font-medium text-primary bg-primary/5 rounded-lg transition-colors'
                        : 'px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors'
                    }
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
      </div>
    </>
  );
}