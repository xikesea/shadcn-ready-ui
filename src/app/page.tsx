import type { Metadata } from "next";
import { getComponentData } from "@/registry/api";
import { ComponentDisplay } from "@/components/component-display";
import { registry } from "@/registry";

export const metadata: Metadata = {
  title: "Data Tables",
  description: "Advanced data tables with sorting, filtering, pagination, and CRUD dialogs.",
  openGraph: { title: "Data Tables", description: "Advanced data tables with sorting, filtering, pagination, and CRUD dialogs." },
  twitter:    { title: "Data Tables", description: "Advanced data tables with sorting, filtering, pagination, and CRUD dialogs." },
};

export default async function Home() {
  const filteredComponents = await Promise.all(
    registry
      .filter((item) => item.category === "table")
      .map((item) => getComponentData(item.id))
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <section className="mb-12 text-center space-y-4">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Elevate shadcn/ui for real-world projects
        </h2>
        <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
          Production-ready components customized for complex tasks, saving you hours of coding.
        </p>
      </section>

      <div className="space-y-20">
        {filteredComponents.map((comp) => (
          comp && <ComponentDisplay key={comp.id} component={comp} />
        ))}
      </div>

      <footer className="mt-20 pt-0 pb-10 text-center text-sm text-muted-foreground">
        <svg
          width="100%"
          height="24"
          viewBox="0 0 1000 24"
          preserveAspectRatio="none"
          className="block text-border mb-6"
          aria-hidden="true"
        >
          <line x1="0" y1="24" x2="72" y2="0" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <line x1="72" y1="0" x2="928" y2="0" stroke="currentColor" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
          <line x1="928" y1="0" x2="1000" y2="24" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        © {new Date().getFullYear()} Shadcn Ready UI.
      </footer>
    </div>
  );
}
