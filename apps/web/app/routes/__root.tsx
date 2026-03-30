import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Static Site</title>
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Not Found</title>
      </head>
      <body>
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-lg">Page not found</p>
        </main>
      </body>
    </html>
  );
}
