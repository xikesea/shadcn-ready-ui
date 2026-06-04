import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getComponentData } from "@/registry/api";
import { ComponentDisplay } from "@/components/component-display";
import { registry } from "@/registry";
import { CATEGORIES } from "@/lib/categories";
import { HeroSection, PageFooter } from "@/components/page-sections";

export const dynamicParams = false;

const ROUTED_CATEGORIES = CATEGORIES.filter(c => c.href !== "/");

export function generateStaticParams() {
  return ROUTED_CATEGORIES.map(c => ({ category: c.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  const meta = ROUTED_CATEGORIES.find(c => c.id === category);
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
  if (!ROUTED_CATEGORIES.find(c => c.id === category)) notFound();

  const filteredComponents = await Promise.all(
    registry
      .filter((item) => item.category === category)
      .map((item) => getComponentData(item.id))
  );

  const visibleComponents = filteredComponents.filter((c): c is NonNullable<typeof c> => c !== null);

  return (
    <div className="container mx-auto py-10 px-4">
      <HeroSection />

      <div className="space-y-20">
        {visibleComponents.map((comp) => (
          <ComponentDisplay key={comp.id} component={comp} />
        ))}
        {visibleComponents.length === 0 && (
          <div className="text-center text-muted-foreground py-20">
            No components found for this category.
          </div>
        )}
      </div>

      <PageFooter />
    </div>
  );
}
