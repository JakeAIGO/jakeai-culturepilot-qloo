# CulturePilot live validation — October 13, 2026

## Observed results

- Blue Ridge Coffee / Taylor Swift / artist: live Qloo returned 12 signals and three campaigns. Verified campaign cards include cited cultural connections and measurable tests.
- Blue Ridge Outdoor Shop / Patagonia / brand: live Qloo returned 12 signals, including The Dawn Wall, Free Solo, Lord Huron, REI and The North Face; three distinct campaigns with test plans.
- Empty cultural inspiration: visible validation error; generation blocked.
- Latest deployment reported ready with no frontend or backend errors. These status checks are not evidence that all automated workflow tests ran.
- Public repository verified; MIT LICENSE present.
- Devpost submission confirmation email verified. Earlier draft notice was superseded by the later confirmation. Submission editor currently requires login, so current description and screenshots were not inspected.

## Failure lesson

Initial generated cultural explanations described seed-level affinity as demographic audience evidence. Cause: model-written evidence interpretation exceeded the queried scope. Fix: campaigns select actual returned entity IDs; server validates IDs and writes the cultural explanation deterministically, explicitly identifying the idea as a hypothesis rather than measured audience demand. Strengthened prompt limits demographic and licensing claims. Creative execution remains AI-generated and requires human review.

## Next-pass checks

- Every live campaign references returned Qloo IDs and has a measurable test plan.
- Failed live requests clear old results and never silently substitute illustrative content.
- Brand/movie/artist briefs must produce scenario-specific cultural evidence.
- Compare identical briefs with and without Qloo before claiming better performance or ROI.

## Remaining competition evidence

No customer campaign has been deployed or measured; no uplift or sales claims are supported. An LLM-only comparison has not yet been run. Current Devpost text/screenshots need a signed-in review. No new contest submission was made during this validation.
