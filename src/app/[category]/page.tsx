import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getComponentData } from "@/registry/api";
import { ComponentDisplay } from "@/components/component-display";
import { registry } from "@/registry";

const categoryMeta: Record<string, { title: string; description: string }> = {
  form:           { title: "Forms",        description: "Multi-step forms with validation, progress indicators, and Zod schemas." },
  auth:           { title: "Auth Forms",   description: "Sign in and sign up forms with social login options." },
  import:         { title: "Import Wizard", description: "4-step bulk data import wizard with CSV upload, column mapping, and validation." },
  "file-manager": { title: "File Manager", description: "Professional file management system with folder navigation and grid/list views." },
  acl:            { title: "ACL Tree",     description: "Granular access control with hierarchical tree structure and indeterminate checkboxes." },
};

const VALID_CATEGORIES = Object.keys(categoryMeta);

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description },
    twitter:    { title: meta.title, description: meta.description },
  };
}

export default async function CategoryPage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category)) notFound();

  const filteredComponents = await Promise.all(
    registry
      .filter((item) => item.category === category)
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
        {filteredComponents.length === 0 && (
          <div className="text-center text-muted-foreground py-20">
            No components found for this category.
          </div>
        )}
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
