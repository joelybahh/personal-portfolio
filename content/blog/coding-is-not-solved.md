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

## The Claude Code {{flicker:Flicker}} Problem

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

## The Industry Keeps Acting Like The Bottleneck Was Typing

A lot of AI coding hype sounds like it came from people who think software engineering is mostly typing. The pitch is simple: developers spend time writing code, AI writes code faster, therefore software becomes faster.

There is some truth in that, but it is incomplete. In most healthy engineering teams, the expensive part is not pressing keys. It is {{underline:deciding what should change}} and making sure the change is safe.

A senior engineer can often write the code quickly. What takes time is understanding the blast radius. What does this touch? What assumptions does it rely on? What happens when this API returns null? What happens when this job runs twice? What happens when a customer has old data? What happens when the feature flag is half rolled out? What happens when the migration succeeds for 99% of rows and silently corrupts the remaining 1%?

And maybe most importantly: what happens when the person who generated the code does not actually understand the code?

That question is going to matter more and more, because AI does not remove accountability. It just makes accountability easier to blur.
