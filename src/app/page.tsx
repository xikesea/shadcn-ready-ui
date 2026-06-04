import type { Metadata } from "next";
import { getComponentData } from "@/registry/api";
import { ComponentDisplay } from "@/components/component-display";
import { registry } from "@/registry";
import { CATEGORIES } from "@/lib/categories";
import { HeroSection, PageFooter } from "@/components/page-sections";

const TABLE = CATEGORIES.find(c => c.id === "table")!;

export const metadata: Metadata = {
  title: `${TABLE.title} | Shadcn Ready UI`,
  description: TABLE.description,
  openGraph: { title: TABLE.title, description: TABLE.description },
  twitter:    { title: TABLE.title, description: TABLE.description },
};

export default async function Home() {
  const filteredComponents = await Promise.all(
    registry
      .filter((item) => item.category === "table")
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
