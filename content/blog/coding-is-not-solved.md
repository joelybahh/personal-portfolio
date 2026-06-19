---
title: Coding Is <em>Not Solved</em>...
summary: AI can produce code fast, but coding was never the bottleneck. This post talks to why "coding is solved" quietly confuses code generation with software engineering, and the risks it carries.
tags: [AI, Software Engineering, Opinion]
featured: true
publishedAt: "2026-06-17"
sortOrder: 1
---

There is a strange confidence in the software industry right now. Not just that AI coding tools are useful, because they obviously are. Not just that they will change how software is built, because they obviously will. The strange part is the leap from “AI can produce code quickly” to “coding is basically solved.”

That leap feels premature at best, and dangerously confused at worst.

Software engineering has never been just the act of producing code. The job is not {{strike-through:typing}}. It is understanding a system, changing it safely, knowing what trade-offs are being made, reviewing the consequences, operating it in production, and owning the failure when something breaks.

AI is getting very good at one slice of that work: producing code.

But I am not convinced that raw code output was ever the main bottleneck in serious software teams. The bottleneck was usually {{highlight:confidence}}. Confidence that the change was correct. Confidence that it matched the actual requirement. Confidence that it would not quietly break another customer. Confidence that someone understood the diff deeply enough to own it. Confidence that the system could be deployed, observed, rolled back, and maintained.

If AI increases code output without increasing confidence at the same rate, then software engineering is not solved. It is just moving faster with {{circle:less understanding}} attached.

## The {{flicker:Flicker}} Problem

Claude Code is one of the most capable coding agents available today. It is built by Anthropic, one of the leading AI companies in the world, and it sits near the centre of the current “AI is going to transform software engineering” story.

And yet, one of the visible issues around it has been terminal flickering.

On its own, that is just a bug. All software has bugs. I am not pretending otherwise. But symbolically, it is perfect, because the same industry telling us that coding is solved is also still dealing with terminal rendering problems. We are still rediscovering that terminal behaviour is weird, that scrollback matters, that VS Code terminals behave differently, that tmux and iTerm2 matter, that alternate screen buffers matter, and that redraw strategies can make a tool feel broken even when the model behind it is impressive.

The engineering still matters.
The details still matter.
The edge cases still matter.

The things that look beneath the grand AI narrative are often the things that determine whether software feels reliable or chaotic to the person using it.

So when people say coding is solved, I think the more accurate version is that {{box:code generation}} is becoming increasingly solved. That is a very big deal. But it is not the same thing as solving software engineering.

## Was Code Output Ever The Main Bottleneck?

This is the question I keep coming back to: has raw coding output ever really been the thing holding good engineering teams back?

Sometimes, yes. There are tasks where implementation speed matters a lot. But a majority of the time, the bottleneck is often somewhere else. It is unclear requirements. It is legacy systems nobody fully understands. It is integration points with unclear failure modes. It is test suites that are too slow, too flaky, or too incomplete to create real confidence. It is production environments that behave differently from local ones. It is data migrations, backwards compatibility, observability, security, reliability, downtime, and the uncomfortable question of whether the code {{bracket:should exist at all}}.

In that world, producing more code faster does not automatically help. It can make the problem worse.

If your bottleneck is review, AI can flood review. If your bottleneck is testing, AI can create more behaviours your tests do not cover. If your bottleneck is architecture, AI can generate locally plausible code that makes the system less coherent. If your bottleneck is operational confidence, AI can increase the number of changes moving through a system faster than your team can understand them.

That is not {{crossed-off:solved}} engineering. That is faster uncertainty.

## The {{arrow:Accountability}} Problem Is Coming

The part that worries me most is not that AI will write more code.

It is that companies will start measuring AI adoption in the {{highlight:dumbest possible way}}.

How many tokens did the team use?
How many prompts were sent?
How many pull requests had AI involved?
How much code was generated?

We already learned this lesson with {{underline:lines of code}}. Measuring engineers by output volume was always a terrible idea, because more code does not mean more value. Sometimes the best engineering work is deleting code. Sometimes it is choosing not to build something. Sometimes it is spending a day understanding the risk properly so the actual change is tiny.

Token usage has the same problem. It looks modern, but it is just a new version of the {{highlight:same bad metric}}.

If the goal becomes “use more AI”, then engineers will use more AI. They will throw it at every problem. They will generate more code, more tests, more abstractions, more churn, and more review burden. Not because it is the right tool for the job, but because the metric rewards usage.

That is not engineering progress. That is {{box:KPI cosplay}}.

A healthier metric would be closer to {{highlight:token efficiency}}. Not “who used the most AI”, but who used it effectively. Did it reduce risk? Did it improve delivery? Did it help the engineer understand the system better? Did it make the final change safer, smaller, clearer, or easier to maintain?

Because that is where accountability starts to matter.

If an engineer ships AI-generated code they do not understand, who owns the outcome? The engineer? The reviewer? The tech lead? The manager who pushed AI usage targets? The executive who wanted adoption numbers? The AI vendor? The AI that generated it?

The answer, in practice, will still land on the engineering team. Production does not care that the code was generated. Customers do not care that the model was impressive. Incidents do not care that the demo looked good.

Someone still has to understand the system. Someone still has to review the blast radius. Someone still has to know what happens when the job runs twice, the API returns null, the feature flag is half rolled out, or the migration silently corrupts 1% of the data.

And if the answer to “who reviews the AI-written code?” is “another AI”, then we are not {{crossed-off:solving accountability}}. We are {{underline:laundering it}}.

That is the part I think the industry is underestimating. AI can absolutely make good engineers faster. But if companies treat usage as the goal, instead of {{highlight:understanding, judgement and ownership}}, they are going to create a lot of software that nobody fully understands, nobody properly reviewed, and everybody is somehow responsible for.

