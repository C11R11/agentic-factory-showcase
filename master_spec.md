# Master Specification: FinOps Dashboard Iterations

## Overview
This project follows an iterative development path for the AI Factory FinOps Dashboard. Each iteration builds upon the previous one, adding complexity and features while maintaining a pure HTML/JS/CSS stack.

## Iteration 1: Token Registry
- **Focus:** Token consumption transparency.
- **Features:**
    - Displays total token counts (Prompt, Reasoning, Output).
    - Breaks down tokens by factory phase (Foundations, Specs, Planning, etc.).
    - Lists individual "slices" (tasks) and their token usage.
- **Constraints:** No cost or monetary data. Purely quantitative metrics of model labor.

## Iteration 2: Financial Operations (FinOps)
- **Focus:** Economic value and subsidized cost transparency.
- **Features:**
    - All features from Iteration 1.
    - USD calculations based on Industrial Rates ($5.00/1M Prompt, $37.00/1M Reasoning/Output).
    - Economic Value vs. Subsidized Cost comparison (Google AI Studio Free Tier).
    - Unit Value per slice in USD.
- **Constraints:** Maintains the same raw web stack (No Node.js).
