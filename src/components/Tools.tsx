import { Reveal, Stagger, StaggerItem } from "./Motion";
import { CardSlides } from "./CardSlides";

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
      <CardSlides compact>
        {tools.map(([name, slug]) => (
          <StaggerItem key={slug} className="liquid-glass flex flex-col items-center gap-3 p-5 text-center">
            <img src={`https://cdn.simpleicons.org/${slug}`} alt={name} width={32} height={32} loading="lazy" className="size-8" />
            <span className="text-xs text-muted-foreground">{name}</span>
          </StaggerItem>
        ))}
      </CardSlides>
    </section>
  );
}
