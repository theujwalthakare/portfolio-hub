export default function Learn() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <aside className="border-r pr-4 space-y-3">
        <h2 className="text-lg font-semibold">Tutorials</h2>
        <ul className="space-y-2 text-sm">
          <li>Portfolio Setup</li>
          <li>GitHub Basics</li>
          <li>CI/CD Workflow</li>
        </ul>
      </aside>

      <div className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-4">Welcome to PRAP Learn</h1>
        <p className="text-gray-700">
          Structured tutorials will be rendered here using MDX or documentation components.
        </p>
      </div>
    </div>
  );
}
