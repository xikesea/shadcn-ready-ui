import { getComponentData } from "@/registry/api";
import { ComponentDisplay } from "@/components/component-display";
import { registry } from "@/registry";

export default async function Home(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams;
  const currentCategory = searchParams.category || "table";

  const components = await Promise.all(
    registry.map((item) => getComponentData(item.id))
  );

  const filteredComponents = components.filter((comp) => comp?.category === currentCategory);

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

      <footer className="mt-20 border-t py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} shadcn/kit.
      </footer>
    </div>
  );
}
