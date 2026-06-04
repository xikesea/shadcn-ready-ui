export function HeroSection() {
  return (
    <section className="mb-12 text-center space-y-4">
      <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Elevate shadcn/ui for real-world projects
      </h2>
      <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
        Production-ready components customized for complex tasks, saving you hours of coding.
      </p>
    </section>
  );
}

export function PageFooter() {
  return (
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
  );
}
