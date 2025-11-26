export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-12 bg-background px-6 py-24 text-foreground sm:px-12 lg:px-24">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 text-center sm:text-left">
        <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
          MCA 2025 Readiness
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Professional Readiness & Automation Platform (PRAP)
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          A unified workspace that combines candidate experience, automation pipelines, and actionable
          insights to accelerate professional readiness for the MCA 2025 cohort.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <a
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 font-semibold text-background transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
            href="https://vercel.com/"
            target="_blank"
            rel="noreferrer"
          >
            View Deployment Pipeline
          </a>
          <a
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 font-semibold text-foreground transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            href="https://supabase.com/"
            target="_blank"
            rel="noreferrer"
          >
            Explore Data Platform
          </a>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Automation-first",
            body:
              "GitHub Actions guard the codebase with linting and builds on every pull request, while Vercel previews keep stakeholders aligned.",
          },
          {
            title: "Data Connected",
            body:
              "Supabase Postgres underpins user data, assessments, and automation state with room to extend into analytics streams.",
          },
          {
            title: "Modular Frontend",
            body:
              "Next.js App Router, React Server Components, and Tailwind CSS v4 deliver responsive, accessible interfaces fast.",
          },
        ].map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{card.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
