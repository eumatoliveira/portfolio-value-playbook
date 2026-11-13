<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Use reusable Framer Motion reveal/stagger helpers with reduced-motion checks; this keeps scroll effects consistent and accessible.
- Keep simulator prices in the shared quote module and currency conversions in a separate reference-rate module; results and service pricing have different meanings.
- Support requests use authenticated server functions and owner/admin RLS; roles live only in the protected role table to prevent privilege escalation.
- New accounts receive only client access; administrator access must be assigned to a verified account explicitly, never from signup metadata.
- Support calls store administrator-provided Calendly or Meet links; do not imply automatic provider booking without a connected integration.
- Store translations as local dictionaries and render them through React context; never translate customer messages or mutate React-owned DOM text.
- Card slides use shared scroll-linked motion with native horizontal scrolling and arrow controls; reduced motion disables scroll-linked transforms.
