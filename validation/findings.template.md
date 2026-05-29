# Validation findings — Korean → Global English

App: <product name>
Tested on: <YYYY-MM-DD>
Time spent: <minutes>

---

## Skill 1: `icp-writer`

### Was the output usable? (1 = unusable, 5 = ship-ready)

Score: __ / 5

### Translation traps detected (check all that apply)

- [ ] "We provide…" / "We are committed…" / "We strive to…" / "Our mission is…"
- [ ] Passive voice as the default sentence structure
- [ ] Long sentences (most sentences > 25 words)
- [ ] Generic role descriptions ("developers", "users", "consumers") instead of specific personas
- [ ] Korean honorifics literally translated ("Mr.", "Ms.", "sir/madam")
- [ ] Reads as a translation of Korean text, not as English written natively
- [ ] Other: ___________

### Concrete examples (paste 2-3 sentences that felt off, in EN)

```
<example 1>

<example 2>
```

### Channel/community recommendations

Did the output suggest specific Western communities (named subreddits, X
niches, Discord servers, newsletters)?

- [ ] Yes, with specific names — actionable
- [ ] Yes, but only generic categories ("Reddit", "Twitter")
- [ ] No channel suggestions at all

What was missing or wrong: ___________

### 7-word English headline

Paste it: `____________________`

Rate it 1-5 for "would I actually use this on a landing page": __

If < 4: what's wrong with it? ___________

---

## Skill 2: `app-store-copy`

### Was the English output usable? (1-5)

Score: __ / 5

### Title (max 30 chars)

Paste: `____________________`

- [ ] Reads natively
- [ ] Has a clear benefit / outcome
- [ ] Sounds translated

### Subtitle (max 30 chars)

Paste: `____________________`

- [ ] Reads natively
- [ ] Sounds translated

### Description opener (first 2 sentences)

Paste:
```
<paste>
```

- [ ] Leads with outcome (not company / feature)
- [ ] Has an active voice
- [ ] No banned phrases ("revolutionize", "unleash", "innovative solutions")
- [ ] Sounds translated

### Korean output (if generated)

Did the skill also produce a Korean version? Was it natural?

- [ ] Korean version was produced and reads naturally
- [ ] Korean version was produced but reads like back-translation
- [ ] No Korean version was produced (skill only output English)

---

## Skill 3: `launch-tweet-thread`

### Was the English output usable? (1-5)

Score: __ / 5

### Hook (tweet 1)

Paste: `____________________`

- [ ] Stops a scroll
- [ ] No emoji unless intentional
- [ ] No "🚀 Today I'm excited to announce…"
- [ ] Sounds translated

### Overall thread

- [ ] 8 distinct tweets, each under 280 chars
- [ ] Concrete features → benefits (not feature lists)
- [ ] CTA in tweet 8 is small ("try it" / "tell me what's broken"), not "BUY NOW"
- [ ] Tone is builder-to-builder, not corporate

### Two tweets that felt off

```
<tweet n>

<tweet m>
```

Why: ___________

---

## Final scoring

Total score across the three skills: __ / 15

- **12-15**: The current skills are basically working. Just add a Korean-context wrapper agent that prompts them with the right framing.
- **8-11**: There are real failures. Build `localize-marketing-copy` + the `global-launch-director` agent. ~2 days.
- **< 8**: The skills are translation-bound. Rebuild the prompts with explicit good/bad transformation examples. ~3 days but high payoff.

## The one thing that surprised you

What was unexpectedly good or unexpectedly bad?

`____________________`

---

## What to build (your recommendation, not the model's)

If you had 2 days of Claude time to fix the biggest gap, what would you have
me build first?

`____________________`
