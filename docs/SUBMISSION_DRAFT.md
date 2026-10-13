# JakeAI CulturePilot — submission update draft

## Elevator pitch
Turn a cultural starting point into three evidence-linked, testable small-business campaigns. CulturePilot discovers connections through Qloo, translates them into creative ideas, and gives the owner a measurable experiment before spending.

## Problem
Small-business owners can generate endless marketing copy, but have little basis for selecting a cultural direction. Generic AI suggestions often lack traceable evidence. CulturePilot makes the connection between discovery and action visible.

## What it does
Enter a business, intended audience, a real artist/movie/brand, and a goal. The backend resolves the seed through Qloo search, retrieves film, music and brand affinities, and passes the resulting entities to an AI planner. Each campaign must cite actual returned Qloo IDs. The backend verifies those IDs and writes the evidence explanation independently of the model. Each idea includes a channel, hook, execution and measurable test plan. Copy the brief for review; nothing is posted automatically.

## Why Qloo matters
The model supplies creative planning; Qloo supplies retrieved cultural connections and affinity evidence. A comparison mode runs the same brief through the same model service and generation settings without Qloo evidence. Judges can examine both outputs directly. This comparison illustrates grounding, not measured marketing uplift.

## Try it
Live demo: https://jakeai-culturepilot-rq6v10.v2.appdeploy.ai/

1. Run the default Blue Ridge Coffee / Taylor Swift brief.
2. Inspect cultural connections, campaign explanations and test plans.
3. Select Compare with LLM-only to inspect the evidence difference.
4. Try Blue Ridge Outdoor Shop / Patagonia with Brand selected.
5. Clear cultural inspiration and verify the validation message.

## Build and boundaries
React, TypeScript, Vite, AppDeploy backend/AI SDK and Qloo REST API. API key is a server secret. Only the named cultural seed and selected type go to Qloo; business/audience text is used by the AI planner. No personal customer data is required. Affinity is not an individual prediction or proof of demographic demand. Referenced brands and media do not imply endorsement, partnership or licensing permission.

## Progress during hackathon
Live Qloo access connected October 13. Coffee-shop and outdoor-shop scenarios verified. Evidence interpretation hardened after a real model output overclaimed demographic applicability. Added explicit test plans, validated entity references and LLM-only comparison.

## Honest limitations
No real customer campaign or revenue uplift has been measured. Model-only comparison is qualitative and the model service is not a pinned reproducible model build. Current Devpost narrative must be reviewed in a signed-in session before replacing it.

Source: https://github.com/JakeAIGO/jakeai-culturepilot-qloo — MIT license.
