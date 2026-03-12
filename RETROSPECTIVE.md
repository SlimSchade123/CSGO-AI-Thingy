# AI-Assisted Development Retrospective
**Project:** CS Case Opening Simulator | **Developer:** CS Schade | **Date:** March 2026

---

## My Role in the Process

Working with AI fundamentally shifted my role away from writing code line-by-line and toward something closer to a **software architect and technical director**. The majority of my active decisions were architectural: choosing the tech stack, designing the state management strategy, defining the data model, and specifying how the reel animation should behave physically. Once those decisions were made and communicated clearly, the AI handled the implementation details at a pace that would have taken me several days to match alone.

This wasn't a passive experience. I had to understand what I was asking for well enough to catch mistakes, resolve ambiguities, and course-correct when the AI made wrong assumptions. When a TypeScript error appeared or a Vite scaffold failed because of a `.claude` directory in the project root, I had to diagnose why and direct the AI toward a solution. The role felt less like "developer" in the traditional sense and more like a **technical lead reviewing a capable but fallible junior engineer's pull requests in real time**.

---

## What AI Did Well

The AI excelled at **volume and consistency**. Generating 34 files — types, stores, hooks, components, seed data — with a coherent architecture across all of them would have taken a solo developer multiple days. The AI produced it in one session. It correctly applied Tailwind CSS v4 patterns, wired up Zustand persist middleware, built a working `requestAnimationFrame` animation loop with easing, and synthesized audio using the Web Audio API without needing external assets.

It was also strong at **boilerplate and pattern repetition**: filter/sort logic, rarity color maps, SVG donut chart math, history entry formatting. These are tasks that are tedious and error-prone for humans but trivially consistent for AI.

---

## Where AI Struggled

The AI's weakest area was **environment-specific tooling**. Scaffolding the Vite project failed because `npm create vite` detected the `.claude` directory and cancelled — a Windows-specific edge case the AI didn't anticipate. Similarly, configuring the preview server required multiple attempts because the AI didn't know whether to use `npm`, `npm.cmd`, or a direct `node` call on Windows. These platform details required human intervention to resolve.

It also produced a subtle **SVG rendering bug** — a single-rarity donut chart degenerates to a line when start and end arc points are identical. The math was correct in isolation; the edge case was simply never considered. A human developer with SVG experience might have caught it during planning, but it required a visual test to surface.

Additionally, the AI occasionally introduced **unused variables** that TypeScript's strict mode flagged (`CENTER_OFFSET`, `circumference`). These are the kind of minor inconsistencies that come from generating large amounts of code without the iterative feedback loop a compiler provides during normal development.

---

## The Future of AI-Assisted Development

AI-assisted development doesn't eliminate the need for software engineers — it **raises the floor** of what a single engineer can produce and **shifts the skill premium** toward system design, requirement clarity, and critical evaluation rather than syntax recall and boilerplate typing.

The engineers who will thrive are those who can communicate architecture precisely, recognize when generated output is subtly wrong, and understand enough about the underlying technology to debug what the AI cannot see. The engineers who will struggle are those who treat AI as a black box and accept its output without scrutiny.

The most significant long-term impact may be on **project scope**. Features that previously required a team sprint are now within reach of a single developer in an afternoon. This compresses timelines and raises stakeholder expectations simultaneously. The bottleneck in software development is shifting from *writing code* to *knowing what to build* — which has always been the harder problem.

---

*This project was built using Claude Sonnet 4.6 via Claude Code in a single session.*
