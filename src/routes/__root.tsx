import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AppLayout } from "@/components/AppLayout";
import { ToastHost } from "@/components/Toast";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand">
          Ira
        </p>
        <h1 className="mt-3 font-display text-7xl text-ink">404</h1>
        <h2 className="mt-2 font-display text-xl text-ink">Page not found</h2>
        <p className="mt-3 text-sm text-ink-soft">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ira — Point of Sale & Inventory" },
      {
        name: "description",
        content:
          "Ira POS, inventory and analytics — an editorial point-of-sale workspace.",
      },
      { property: "og:title", content: "Ira — Point of Sale & Inventory" },
      { name: "twitter:title", content: "Ira — Point of Sale & Inventory" },
      { name: "description", content: "Inventory with POS ." },
      { property: "og:description", content: "Inventory with POS ." },
      { name: "twitter:description", content: "Inventory with POS ." },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e8a7f7e2-c1d9-4897-8da8-92bc0e0ef917/id-preview-8da5ddac--6c188075-679a-4613-9d79-cb0bb887c96a.lovable.app-1778038494315.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e8a7f7e2-c1d9-4897-8da8-92bc0e0ef917/id-preview-8da5ddac--6c188075-679a-4613-9d79-cb0bb887c96a.lovable.app-1778038494315.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <AppLayout />
      <ToastHost />
    </>
  );
}
