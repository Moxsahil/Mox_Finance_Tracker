export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
        </div>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 text-center">
          Loading...
        </p>
      </div>
    </div>
  );
}