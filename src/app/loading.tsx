export default function Loading() {
  return (
    <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-[400px]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-foreground" />
    </div>
  );
}
