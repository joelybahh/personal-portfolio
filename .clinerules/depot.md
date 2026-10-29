## DEPOT project context

First check whether DEPOT is set up here: `.depot` must exist and resolve to a directory containing `project.json`. If it is missing or dangling, ignore this section and work normally.

When it resolves: read `.depot/AGENTS.md` first and keep project docs, tasks, and plans under `.depot/`. Pick the first channel that answers: DEPOT MCP tools (`list_documents`, `task_presence`) if available; otherwise the local API at `http://127.0.0.1:4317` (a `GET /api/people` that answers means the dashboard is running); otherwise tell the person once that DEPOT is linked but unreachable, suggest `depot start` or `depot link`, and work normally without moving files by hand.

With a channel: before touching code, find the task this work belongs to (search every lane); if none fits and the work is more than a tiny tweak, propose a ticket, create it, and check it out before the first edit. Move it to in-progress, hand it to in-review when the stated outcome is ready, and never mark it done. Change status through that channel, not by moving files: a bare `mv` skips the claim and the trail records nobody. Your steps are recorded on the ticket, so identify yourself (harness, model and role at checkout).

### How to write in DEPOT

Write ticket bodies, notes, run summaries and release notes plainly and specifically: what changed, what is left, what the person needs to decide. No slogans or three-beat fragments, no `not just X, but Y`, no mood or hype words (`calm`, `a little`, `seamless`, `powerful`, `robust`, `unlock`), no filler vocabulary (`delve`, `crucial`, `underscore`, `Additionally`, `serves as`). Headings name the thing; skip ALL-CAPS labels, bold on every line and em dashes for drama. Errors say what happened and what to try; results say what was validated and what was not.
