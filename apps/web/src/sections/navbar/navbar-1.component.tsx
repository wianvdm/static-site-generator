import { useState } from 'react';
import type { z } from 'zod';
import type { navbar1Schema } from '@static-site-generator/schema';
import { ActionLink } from '../../actions/action-link.component';
import { Button } from '../../components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../../components/ui/sheet';
import { Menu, Phone, ArrowRight } from 'lucide-react';

type Navbar1Props = z.infer<typeof navbar1Schema>;

export function Navbar1({
  logoSrc,
  logoText,
  brandTagline,
  actions,
  cta,
  phone,
}: Navbar1Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <ActionLink
          action={{ type: 'route', to: '/' }}
          className="flex items-center gap-3 shrink-0 group"
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoText}
              className="w-10 h-10 rounded-lg object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {actions.map((item, index) => (
            <ActionLink
              key={index}
              action={item.action}
              className="border-l-2 border-transparent pl-3 pr-1 py-1 text-xs font-medium tracking-wide text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
            >
              {item.label}
            </ActionLink>
          ))}

          {(phone || cta) && (
            <div className="w-px h-6 bg-border mx-1" />
          )}

          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{phone}</span>
            </a>
          )}

          {cta && (
            <ActionLink action={cta.action}>
              <Button className="gap-2 text-xs font-semibold uppercase tracking-widest rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300">
                {cta.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </ActionLink>
          )}
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
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
                  className="border-l-2 border-transparent pl-4 py-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary hover:bg-muted rounded-r-lg transition-all duration-300"
                >
                  {item.label}
                </ActionLink>
              ))}

              {phone && (
                <>
                  <div className="h-px bg-border my-2" />
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground"
                  >
                    <Phone className="w-4 h-4" />
                    {phone}
                  </a>
                </>
              )}

              {cta && (
                <>
                  <div className="h-px bg-border my-2" />
                  <ActionLink
                    action={cta.action}
                    className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-accent-foreground bg-accent rounded-lg mt-1"
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