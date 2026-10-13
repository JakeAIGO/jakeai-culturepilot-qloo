# JakeAI CulturePilot

An independent entry project for the [Qloo Agentic Hackathon](https://qloo.devpost.com/). CulturePilot turns Qloo-derived cultural connections into three small-business campaign ideas using an AI planning step.

## Project status

Live Qloo integration verified October 13, 2026: the Taylor Swift / Blue Ridge Coffee scenario returned 12 cultural signals and three campaign directions. Illustrative preview remains explicitly labeled and is never a fallback for failed live calls.

## How it works

1. Enter a business, target audience, a named cultural seed (artist/movie/brand), and objective.
2. Server searches Qloo for the cultural seed, requests cross-category insights, and extracts named results.
3. An AI call produces three campaign concepts, each selecting actual Qloo entity IDs and a measurable low-cost test.
4. Server validates the selected IDs and writes the cultural evidence explanation deterministically. Qloo signals are never presented as measured demographic demand.
5. User reviews, copies, and approves ideas. No publishing or personal data collection.

The Qloo key is a server-side secret named `QLOO_API_KEY`; it is never sent to browsers or checked into source control. The code is separate from the private JakeAI platform.

## Stack

React 19, TypeScript, Vite, AppDeploy's backend route and AI SDK, Qloo REST API. To run locally, install packages with `npm install` and run `npm run dev`. Backend routes require a compatible AppDeploy backend runtime and server secret; frontend-only local development is not the complete live demo.

## API routes

- `GET /api/status` — truthfully reports whether Qloo credentials are installed.
- `POST /api/campaign` — checks request fields, queries Qloo and generates grounded campaigns, or returns an explicit error when access is missing.

## Constraints and ethics

Qloo affinity data is aggregate, not evidence of individual tastes; do not infer personal traits or demographic targeting accuracy. A cultural reference does not grant permission to use copyrighted media or protected brand materials.

## License

MIT. See `LICENSE`.
