import { Reveal } from "./Motion";

const tools = [
  ["Anthropic", "anthropic"], ["Gemini", "googlegemini"], ["Hugging Face", "huggingface"], ["Google Cloud", "googlecloud"],
  ["Python", "python"], ["TypeScript", "typescript"], ["React", "react"], ["Jira", "jira"],
  ["Trello", "trello"], ["Notion", "notion"], ["Postman", "postman"], ["GitHub", "github"],
  ["n8n", "n8n"], ["Supabase", "supabase"], ["Docker", "docker"], ["Figma", "figma"],
] as const;

export function Tools() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <Reveal>
        <p className="eyebrow">Stack</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Sistemas e ferramentas que uso</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {tools.map(([name, slug], i) => (
          <Reveal key={slug} delay={i * 0.03} className="liquid-glass flex flex-col items-center gap-3 p-5 text-center">
            <img src={`https://cdn.simpleicons.org/${slug}/ffffff`} alt={name} width={32} height={32} loading="lazy" className="size-8 opacity-90" onError={(e) => (e.currentTarget.style.display = "none")} />
            <span className="text-xs text-muted-foreground">{name}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
