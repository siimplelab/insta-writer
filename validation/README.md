# Validation kit — Korean → Global English

The goal: prove (or disprove) that the existing `icp-writer`, `app-store-copy`,
and `launch-tweet-thread` skills produce *commercially usable* English output
when fed a Korean app brief.

If they do, the bilingual launch-kit is mostly cosmetic. If they don't, we
build the `localize-marketing-copy` + `cross-cultural-icp` skills targeting
exactly where they fail.

**Time budget:** 30 minutes. Stop and write the findings even if you're not
finished — partial signal beats no signal.

---

## Procedure

1. **Pick a real product.** Yours, a friend's, or one you've launched before.
   Real signal > hypothetical.

2. **Fill in the brief:**
   ```bash
   cp validation/app-brief.template.md validation/app-brief.md
   # Edit app-brief.md in Korean. ~5 min.
   ```

3. **Run the three skills in Claude Code** against this repo. Save each
   output to its own file:
   ```
   validation/out-icp.md
   validation/out-app-store-copy.md
   validation/out-launch-thread.md
   ```

   In Claude Code:
   ```
   /skill icp-writer
   # paste app-brief.md content. save output.

   /skill app-store-copy
   # paste app-brief.md + ICP output. save output.

   /skill launch-tweet-thread
   # paste app-brief.md + ICP output. save output.
   ```

4. **Fill in findings.md** using the rubric. ~10 min.
   ```bash
   cp validation/findings.template.md validation/findings.md
   ```

5. **Send `findings.md` to Claude** with the message:
   *"Here are the validation results — build the fixes."*

   I'll read the failures, pick which skills/agents to build (or skip), and
   ship them targeting exactly the issues you found.

---

## What we're looking for

Three failure modes that would justify building the bilingual layer:

| Failure mode | What it looks like |
|---|---|
| **Translated-stiff openers** | "We provide…", "Our mission is…", "We strive to…" |
| **Wrong marketing register** | Long formal sentences where punchy hooks should be |
| **Channel blindness** | ICP says "developers" but no Reddit/HN/IH specifics |

If 2+ of these show up in ≥2 of the 3 skill outputs, build the bilingual
fix. If none show up, the existing skills are already good enough and we
just add a Korean-context wrapper agent.

---

## Why this matters

Two days of dev time goes a lot further when it's targeted at the actual
gaps. This 30-minute test is the cheapest way to find them.
