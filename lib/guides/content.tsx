import type { ReactNode } from "react";

export type Guide = {
  slug: string;
  title: string;
  titleKo?: string;
  blurb: string;
  blurbKo?: string;
  readingMinutes: number;
  body: () => ReactNode;
};

// Tiny prose helpers so the JSX stays readable
const P = ({ children }: { children: ReactNode }) => (
  <p className="my-3 leading-relaxed">{children}</p>
);
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-8 mb-3 text-xl font-semibold">{children}</h2>
);
const UL = ({ children }: { children: ReactNode }) => (
  <ul className="my-3 list-disc space-y-1 pl-6">{children}</ul>
);
const OL = ({ children }: { children: ReactNode }) => (
  <ol className="my-3 list-decimal space-y-1 pl-6">{children}</ol>
);
const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800">
    {children}
  </code>
);
const Quote = ({ children }: { children: ReactNode }) => (
  <blockquote className="my-4 border-l-4 border-neutral-300 pl-4 italic text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
    {children}
  </blockquote>
);
const Em = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold">{children}</strong>
);

export const GUIDES: Guide[] = [
  // -----------------------------------------------------------------------
  // Flagship: promote a new mobile app
  // -----------------------------------------------------------------------
  {
    slug: "promote-mobile-app",
    title: "How to promote a new mobile app — the indie founder playbook",
    titleKo: "신규 모바일 앱 홍보 가이드 — 1인 창업자용 플레이북",
    blurb:
      "Five phases, idea to first 1,000 users. Pick a launch date, work backwards. No hype, no \"growth hacks\" — just the steps that actually compound.",
    blurbKo:
      "5단계, 아이디어부터 첫 1,000명까지. 출시일을 정하고 거꾸로 계획합니다. 과장도, '그로스 해킹'도 없이 실제로 누적되는 단계들.",
    readingMinutes: 20,
    body: () => (
      <>
        <P>
          Most app launches die from one of three things: nobody knew about it,
          nobody who knew about it cared, or the people who cared churned in
          week one. The first two are marketing problems. The third is a
          product problem. This guide handles the first two.
        </P>
        <P>
          We&apos;ll walk five phases. Each phase has 3-6 concrete actions and a
          done-when checklist. Use the AI Skills (linked throughout) to do the
          writing parts in minutes instead of hours.
        </P>

        <H2>Phase 1 — Pre-launch (week −4 to −1)</H2>
        <P>
          Your goal: when launch day arrives, you already have 100 people
          waiting. Cold-launching to zero followers is the single most common
          mistake.
        </P>
        <UL>
          <li>
            <Em>Write your ICP.</Em> Use the{" "}
            <a className="underline" href="/skills/icp-writer">
              icp-writer
            </a>{" "}
            skill. Output a 1-paragraph description of one specific person.
            &quot;Indie iOS devs in the US, 25-40, ship side projects, hate
            marketing&quot; beats &quot;developers&quot;.
          </li>
          <li>
            <Em>Find 3 places that ICP hangs out.</Em> One subreddit, one
            Discord/Slack, one X/IG niche. Lurk for a week. Read the rules.
            Don&apos;t post.
          </li>
          <li>
            <Em>Build a landing page</Em> in a day. One screen: 7-word
            headline, 1-sentence subtitle, 3-bullet feature list, one
            screenshot/mockup, email-capture form. Use Tally or Framer if you
            don&apos;t want to design.
          </li>
          <li>
            <Em>Start an audience.</Em> One Twitter/X thread per week about
            building. One TikTok showing a feature in 15 seconds. Aim for
            consistency over reach — algorithms reward weekly posters.
          </li>
          <li>
            <Em>Recruit 5 beta users from your network.</Em> Cold-DM 20
            people you know who fit the ICP. 5 will say yes. They&apos;ll
            become your launch-day social proof.
          </li>
        </UL>
        <P>
          <Em>Done when:</Em> you have a landing page, 50+ email signups, a
          recognizable handle in 1-2 communities, and 5 beta users who&apos;ve
          tried the app and (ideally) said something nice about it.
        </P>

        <H2>Phase 2 — Launch day (the &quot;Tuesday&quot;)</H2>
        <P>
          Pick a Tuesday or Wednesday for Product Hunt (their best traffic
          days). Coordinate everything to fire on that day. Tell the people
          on your email list one week ahead, three days ahead, and the
          morning of.
        </P>
        <P>
          <Em>The launch-day checklist, in order:</Em>
        </P>
        <OL>
          <li>
            <Em>00:01 PST</Em> — Product Hunt post goes live (or scheduled
            to). Tagline + description from the{" "}
            <a className="underline" href="/skills/ph-launch-kit">
              ph-launch-kit
            </a>{" "}
            skill. Pin a maker comment with the story behind the product.
          </li>
          <li>
            <Em>06:00 your time</Em> — Show HN post on Hacker News. Title
            format: <Code>Show HN: My App — one-sentence what it does</Code>.
            First comment: longer story, who it&apos;s for, why you built it.
            Don&apos;t spam refresh.
          </li>
          <li>
            <Em>07:00</Em> — Indie Hackers Milestones post. Tone is
            celebratory + transparent (share the journey, not just the link).
          </li>
          <li>
            <Em>08:00</Em> — X launch thread. Use{" "}
            <a className="underline" href="/skills/launch-tweet-thread">
              launch-tweet-thread
            </a>{" "}
            to draft 8 tweets: hook → problem → solution → 3 features →
            social proof from beta users → CTA. Tag people who helped.
          </li>
          <li>
            <Em>09:00</Em> — Personal network mobilization. DM 30 people who
            said they&apos;d support. Don&apos;t ask for upvotes; ask for
            honest feedback and let them choose to share.
          </li>
          <li>
            <Em>10:00</Em> — Email blast to your list. Subject: short. Body:
            why you built it, three sentences about what it does, big CTA
            button. Track opens.
          </li>
          <li>
            <Em>11:00</Em> — Target subreddits. <Em>Only</Em> ones where
            you&apos;ve participated for weeks. Follow each sub&apos;s
            self-promo rules to the letter. Bonus: post a problem-solution
            story, not a launch announcement.
          </li>
          <li>
            <Em>Every hour</Em> — reply to every Product Hunt comment within
            10 minutes. PH ranking heavily weights maker engagement.
          </li>
        </OL>
        <P>
          <Em>Done when:</Em> you&apos;re top 5 on PH for the day (aim for top
          3), 50+ HN points, &gt; 1,000 site visits, 20+ paying users or 200+
          signups depending on your business model.
        </P>
        <Quote>
          A &quot;bad&quot; PH day is still a great day. Even a #15 finish gets
          you 800 visitors, 50 trial users, and one thoughtful customer call
          worth more than the rest combined.
        </Quote>

        <H2>Phase 3 — First 30 days (the &quot;listen phase&quot;)</H2>
        <P>
          Don&apos;t pour fuel on the fire yet. Your job in month one is to
          learn, not grow.
        </P>
        <UL>
          <li>
            <Em>Cold-DM 20 ideal users for 15-minute calls.</Em> Use the
            Mom Test approach (see Resources). Ask about their day, not your
            product. Notice the words they use to describe the problem —
            those words go into your next round of copy.
          </li>
          <li>
            <Em>Install analytics.</Em> PostHog (recommended) or Mixpanel
            free tier. Track: signup, first-action (your activation event),
            retention day 1 / 7 / 30, share / referral events.
          </li>
          <li>
            <Em>Define your North-Star Metric.</Em> Not DAU. Something tied
            to value delivered. Photo-edit app: photos exported per user per
            week. Habit app: streak length. Pick one number.
          </li>
          <li>
            <Em>Reply to every review.</Em> App Store + Play Store. Public
            replies signal that you care, even to people who haven&apos;t
            installed yet. Negative reviews? Reply calmly and improve the
            thing.
          </li>
          <li>
            <Em>Ship one improvement per week</Em> based on the calls and
            reviews. Tell your audience about each one — &quot;build in
            public&quot; is content marketing that costs nothing.
          </li>
        </UL>

        <H2>Phase 4 — First 100 → 1,000 users (the &quot;turn it on&quot;)</H2>
        <P>
          You know who you&apos;re for, what they call the problem, and what
          activates them. Now scale the channels that worked in phase 2.
        </P>
        <UL>
          <li>
            <Em>ASO drill-down.</Em> See <a className="underline" href="/guides/aso-basics">aso-basics</a>.
            Optimize App Store title + subtitle + keywords + screenshots +
            preview video. ASO compounds — every improvement helps every
            future visitor.
          </li>
          <li>
            <Em>Content marketing routine.</Em> Pick TWO channels max. For
            most app founders, that&apos;s vertical short video (TikTok or
            Reels) + X. Post one Reel and one X thread per week minimum. Use
            the{" "}
            <a className="underline" href="/skills/video-script-writer">
              video-script-writer
            </a>{" "}
            skill.
          </li>
          <li>
            <Em>Micro-influencer partnerships.</Em> Don&apos;t hire
            mega-influencers ($10K+ per post, ROI rarely works). Find
            creators with 5-50K followers in your niche. Offer free
            lifetime + $50-500. 1 in 5 will say yes.
          </li>
          <li>
            <Em>Paid ad tests.</Em> $5-20/day on Meta + TikTok Ads. Run 3
            creative variations per platform. Goal at this stage isn&apos;t
            ROI, it&apos;s learning which message + visual pulls. Kill
            losers fast.
          </li>
          <li>
            <Em>Referral.</Em> If your app has any social or
            collaboration element, add a referral incentive. Even a simple
            &quot;invite a friend, both get X&quot; can compound.
          </li>
        </UL>

        <H2>Phase 5 — Beyond 1,000 (the &quot;business&quot; phase)</H2>
        <P>
          You&apos;ve proven distribution. Now the leverage moves from
          acquisition to retention + monetization.
        </P>
        <UL>
          <li>
            <Em>Retention engineering.</Em> Push notifications, lifecycle
            emails, onboarding optimization. Reducing day-30 churn by 5%
            often produces more revenue than doubling top-of-funnel.
          </li>
          <li>
            <Em>Pricing experiments.</Em> If you have a paid tier, run an
            A/B test on price. Most early-stage apps charge too little.
          </li>
          <li>
            <Em>Community.</Em> Open a Discord, a subreddit, a forum, or a
            Circle/Mighty Networks space. The 5% of users who join become
            your support team, beta testers, and most loyal evangelists.
          </li>
          <li>
            <Em>Story-worthy moments.</Em> 10K users, $10K MRR, a notable
            customer — anything specific is press-worthy. Pitch a few
            relevant outlets. TechCrunch ignores most pitches; niche
            publications love good stories.
          </li>
        </UL>

        <H2>What this guide deliberately doesn&apos;t cover</H2>
        <UL>
          <li>
            <Em>Brand identity / design.</Em> Important, but you&apos;re
            optimizing the wrong thing if you don&apos;t have 1,000 users
            yet.
          </li>
          <li>
            <Em>SEO blog posts.</Em> Takes 6+ months to compound. Worth doing
            in parallel but not the lead channel for a new app.
          </li>
          <li>
            <Em>Press / PR firms.</Em> $5K+/month for unpredictable results.
            Do it later.
          </li>
        </UL>
        <P>
          When in doubt: ship more, post more, talk to more users. The
          founders who win are usually not the smartest ones — they&apos;re
          the ones who showed up every week for two years.
        </P>
      </>
    ),
  },

  // -----------------------------------------------------------------------
  // First 100 users
  // -----------------------------------------------------------------------
  {
    slug: "first-100-users",
    title: "Getting your first 100 users — without paid ads",
    blurb:
      "Practical channels for going from zero to a hundred. Cold-DMs, communities, manual outreach. Boring works.",
    readingMinutes: 5,
    body: () => (
      <>
        <P>
          The first 100 is the hardest stretch. You don&apos;t have social
          proof, search rankings, or word-of-mouth yet. The good news: you
          don&apos;t need ads. You need 100 specific people, and you can
          reach them one by one.
        </P>

        <H2>Channel mix that actually works at zero</H2>
        <OL>
          <li>
            <Em>Cold-DM your ICP, one at a time.</Em> Twitter, LinkedIn, even
            email. Use the{" "}
            <a className="underline" href="/skills/cold-outreach-email">
              cold-outreach-email
            </a>{" "}
            skill. Realistic conversion: 10-20% reply, 5-10% try the product.
            That means 100 DMs → 10 trials → maybe 3 keeps.
          </li>
          <li>
            <Em>Post in 2-3 niche communities.</Em> Not the big subreddits.
            The 10K-subscriber ones where the rules are friendly. Tell a
            story, not an ad: &quot;I built X because I kept running into Y.
            Here&apos;s what I learned. Demo: link.&quot;
          </li>
          <li>
            <Em>Hacker News &quot;Show HN&quot;.</Em> Even 10 upvotes gets
            you ~50 users. Title formula:{" "}
            <Code>Show HN: ProductName — one-sentence what it does</Code>.
            First comment: who it&apos;s for, why you built it.
          </li>
          <li>
            <Em>Indie Hackers + r/SideProject.</Em> Saturday Showcase
            threads are low-friction. Won&apos;t blow up but reliably brings
            5-20 curious people per post.
          </li>
          <li>
            <Em>Personal network.</Em> The friends-and-family launch is
            cringe but it works. They&apos;re your first 20.
          </li>
        </OL>

        <H2>The math, honestly</H2>
        <P>
          100 users in 30 days = 3-4 per day. That&apos;s doable through
          manual outreach alone. Aim for 100 DMs per week + 2 community
          posts per week + 1 podcast appearance / interview if you can swing
          it. Repeat.
        </P>

        <H2>What to avoid</H2>
        <UL>
          <li>
            <Em>Buying ads.</Em> You don&apos;t know who converts yet. Ads
            burn money learning what manual outreach teaches you for free.
          </li>
          <li>
            <Em>SEO blog posts.</Em> Takes too long. Do them later.
          </li>
          <li>
            <Em>Generic mass DMs.</Em> Personalize the first sentence
            (their tweet, project, bio). Generic DMs get reported.
          </li>
          <li>
            <Em>Caring about follower count.</Em> 100 paying users with 50
            followers beats 10K followers and 0 paying users every time.
          </li>
        </UL>
      </>
    ),
  },

  // -----------------------------------------------------------------------
  // ASO basics
  // -----------------------------------------------------------------------
  {
    slug: "aso-basics",
    title: "App Store Optimization (ASO) basics that actually move the needle",
    blurb:
      "What to put in your title, subtitle, screenshots, and preview video so the App Store + Play Store rank you and the right people tap install.",
    readingMinutes: 6,
    body: () => (
      <>
        <P>
          ASO is the closest thing app marketing has to a free lunch. Your
          App Store listing is a 24/7 salesperson — small improvements
          compound over thousands of visitors.
        </P>

        <H2>The fields that matter, in order</H2>
        <OL>
          <li>
            <Em>App name + subtitle (iOS) / title + short description
            (Play).</Em> Most important. Include your main keyword in the
            title if natural. Subtitle = second-most-searched keyword + a
            benefit. Total visible characters matter: 30 + 30 on iOS, 50 +
            80 on Play.
          </li>
          <li>
            <Em>Icon.</Em> Decides ~25% of tap-through rate. Test 3
            variations. Bold, simple, readable at 30 pixels. Avoid text in
            the icon.
          </li>
          <li>
            <Em>Screenshots (first 3 only).</Em> ~70% of visitors never
            scroll past the third screenshot. First one should sell the
            outcome, not show the UI. Format: large heading on top + 1
            screen + 1-line caption.
          </li>
          <li>
            <Em>Preview video.</Em> Auto-plays on iOS. Show the &quot;wow
            moment&quot; in the first 3 seconds. Captions on, sound off
            (most viewers have it muted).
          </li>
          <li>
            <Em>Keywords field (iOS) / long description (Play).</Em> 100
            characters on iOS, 4000 on Play. iOS: comma-separated, no
            spaces, no plurals (algorithm handles them). Play: keyword
            density in the long description still matters but less than it
            used to.
          </li>
          <li>
            <Em>Ratings + reviews.</Em> 4.5+ stars is the threshold most
            users filter for. Prompt for reviews after activation, not at
            launch.
          </li>
        </OL>

        <H2>Keyword research, 30 minutes a quarter</H2>
        <OL>
          <li>
            Make a list of 20 keywords your ICP would search.
          </li>
          <li>
            For each, check 2 things in App Store search: how many
            competitors show up (saturation) and whether their reviews are
            satisfied (opportunity).
          </li>
          <li>
            Pick 5-8 keywords with medium volume + low saturation. Work
            them into title, subtitle, and the iOS keyword field.
          </li>
          <li>
            Use a tool: AppFollow free tier, or ASOMobile.
          </li>
        </OL>

        <H2>Screenshots — a template that works</H2>
        <Quote>
          Screenshot 1: bold outcome statement (&quot;Build a 30-day habit
          streak&quot;) + screen. Screenshot 2: the simplest feature.
          Screenshot 3: social proof (&quot;500K users&quot; or a real
          quote). 4-10: deeper features for the curious.
        </Quote>
        <P>
          Tools: Mockuuups, Previewed, or Figma + a free phone mockup. Don&apos;t
          spend more than a Saturday on screenshots v1 — ship them, iterate
          monthly.
        </P>

        <H2>The honest expectation</H2>
        <P>
          ASO produces compounding 5-30% improvements in install rate. It
          won&apos;t make a bad product good. But if your product is
          decent, ASO is the highest-ROI marketing work you can do.
        </P>
      </>
    ),
  },

  // -----------------------------------------------------------------------
  // AI for marketers
  // -----------------------------------------------------------------------
  {
    slug: "ai-for-marketers",
    title: "Using AI for marketing without sounding like a robot",
    blurb:
      "Where AI is genuinely a force multiplier (copy variations, customer-review synthesis), where it's a trap (generic posts that nobody reads), and the workflow recipes that work.",
    readingMinutes: 6,
    body: () => (
      <>
        <P>
          AI has changed marketing more in 18 months than the previous 10
          years combined. But it&apos;s also flooded social feeds with
          mid-quality content that nobody saves or shares. The difference
          between AI as a multiplier and AI as a treadmill is{" "}
          <Em>using AI for the parts humans are bad at</Em>, not the parts
          humans are good at.
        </P>

        <H2>Where AI genuinely wins</H2>
        <UL>
          <li>
            <Em>Synthesizing user feedback.</Em> 200 App Store reviews →
            3 themes + action items. A human takes 4 hours. Claude takes 2
            minutes. Use the{" "}
            <a className="underline" href="/skills/app-store-review-digest">
              app-store-review-digest
            </a>{" "}
            skill.
          </li>
          <li>
            <Em>Generating variations.</Em> Need 10 ad headlines, 8 tweet
            hooks, 5 cold-email opening lines? AI is fine here. You pick
            the best, then write the rest yourself.
          </li>
          <li>
            <Em>First drafts.</Em> Blank page is the enemy. A medium-quality
            AI draft you edit beats staring at the cursor for an hour.
          </li>
          <li>
            <Em>Translation + localization.</Em> Especially for short copy
            (App Store, ads). Always have a native speaker review before
            shipping.
          </li>
          <li>
            <Em>Customer research.</Em> Feed Claude a survey CSV, ask for
            patterns. Saves the &quot;reading 200 free-text responses&quot;
            phase.
          </li>
        </UL>

        <H2>Where AI loses</H2>
        <UL>
          <li>
            <Em>The thing that makes your voice <Em>yours</Em>.</Em> AI
            converges on the median. Your edge as a small founder is that
            you&apos;re not the median. Write the hook yourself.
          </li>
          <li>
            <Em>Specific stories.</Em> A real customer&apos;s real
            anecdote beats any AI-generated &quot;customer journey&quot;.
            Use AI to clean up the writing, not to invent the story.
          </li>
          <li>
            <Em>Comments + replies.</Em> Auto-replying with AI to other
            people&apos;s posts is a fast way to get blocked or, on X,
            permanently muted by the people you wanted to reach.
          </li>
          <li>
            <Em>Image / video at scale.</Em> AI imagery is now <em>known</em> at
            a glance in 2026. It signals low effort. Use sparingly, mostly
            for ideation or B-roll.
          </li>
        </UL>

        <H2>Three workflow recipes</H2>
        <H2>1. The Monday content batch</H2>
        <P>
          Every Monday morning, run the{" "}
          <a className="underline" href="/skills/weekly-content-batch">
            weekly-content-batch
          </a>{" "}
          skill with: your brand brief (1 paragraph), your North-Star
          metric, last week&apos;s top-performing post, and 2-3 product
          updates. Output: 7 draft posts. Review for 20 minutes. Schedule
          via{" "}
          <a className="underline" href="/tools/scheduler">
            the scheduler
          </a>
          . Done in under 30 minutes per week.
        </P>

        <H2>2. The Friday review digest</H2>
        <P>
          Pipe new App Store / Play Store reviews into{" "}
          <a className="underline" href="/skills/app-store-review-digest">
            app-store-review-digest
          </a>
          . Output: 3 themes, 3 action items, 3 quotable customer
          sentences. Skim for 10 minutes. The quotable sentences become
          next week&apos;s social proof.
        </P>

        <H2>3. The launch warmup</H2>
        <P>
          Before any launch, run{" "}
          <a className="underline" href="/skills/icp-writer">
            icp-writer
          </a>{" "}
          →{" "}
          <a className="underline" href="/skills/app-store-copy">
            app-store-copy
          </a>{" "}
          →{" "}
          <a className="underline" href="/skills/launch-tweet-thread">
            launch-tweet-thread
          </a>{" "}
          →{" "}
          <a className="underline" href="/skills/ph-launch-kit">
            ph-launch-kit
          </a>
          . That&apos;s a full launch copy kit in about an hour of writing
          + editing. Without AI it&apos;s a day of work minimum.
        </P>

        <H2>The honest principle</H2>
        <Quote>
          Use AI to do more, not to do less thinking. The founders who win
          are the ones who used AI to ship 5× more iterations — not the
          ones who used it to skip the iteration.
        </Quote>
      </>
    ),
  },

  // -----------------------------------------------------------------------
  // Video marketing + AI video stack
  // -----------------------------------------------------------------------
  {
    slug: "video-marketing",
    title: "Video marketing for a new app — strategy + the AI video stack",
    titleKo: "신규 앱을 위한 비디오 마케팅 — 전략과 AI 비디오 스택",
    blurb:
      "Vertical short video is the highest-leverage channel for a new app in 2026. Here's what to make, and the AI tools that turn a one-person team into a content factory.",
    readingMinutes: 8,
    body: () => (
      <>
        <P>
          If you can only do one marketing channel for a new mobile app,
          do vertical short video. The algorithm pushes it to non-followers
          (no audience required), demos are tappable proof, and the AI
          stack has gotten good enough that one founder can produce 3-5
          videos a week solo.
        </P>

        <H2>Why vertical short video wins for apps</H2>
        <UL>
          <li>
            <Em>Algorithm-pushed.</Em> TikTok, IG Reels, YT Shorts all
            distribute video to non-followers. A still image or text post
            mostly reaches your existing audience.
          </li>
          <li>
            <Em>Demos convert.</Em> Showing a feature in 5 seconds beats
            describing it in 100 words. Tap-to-install conversion from a
            demo Reel is typically 2-5×{" "}
            higher than from a text ad.
          </li>
          <li>
            <Em>Cheap iteration.</Em> Record a feature in 30 seconds. If
            it bombs, record another. The economics ruin paid ads for the
            same purpose.
          </li>
        </UL>

        <H2>What to make (4 video types that work)</H2>
        <OL>
          <li>
            <Em>The 5-second demo.</Em> Just the feature, no setup. Caption
            tells the story. Best for the &quot;wow&quot; moments.
          </li>
          <li>
            <Em>The before/after.</Em> Old way (a competitor, manual process,
            spreadsheet) → your app. 7-15 seconds. Strong conversion.
          </li>
          <li>
            <Em>The voice-over tutorial.</Em> Talking head OR screen
            recording with your voice. 30-60 seconds. Best for retention +
            authority.
          </li>
          <li>
            <Em>The build-in-public clip.</Em> &quot;I&apos;m adding X.
            Here&apos;s how I&apos;m thinking about it.&quot; Founders + the
            curious eat this up. Authentic = unbeatable on AI-flooded feeds.
          </li>
        </OL>

        <H2>The AI video stack in 2026</H2>
        <P>
          Honest assessment, no &quot;everything is amazing&quot; framing:
        </P>

        <H2>Generative video</H2>
        <UL>
          <li>
            <Em>Sora 2 (OpenAI)</Em> — best general-purpose text-to-video.
            Strong for B-roll, cutaways, generated scenery. Recognizable AI
            look for character work.
          </li>
          <li>
            <Em>Veo 3 (Google)</Em> — best for realistic short clips. Strong
            camera control. Native audio generation is the standout feature.
          </li>
          <li>
            <Em>Runway Gen-4</Em> — the editor-friendly option. Good for
            inpainting / motion-on-static-image. Pro tier is overpriced for
            indies.
          </li>
          <li>
            <Em>Pika 2.0</Em> — fast iteration. Great for quick concept
            tests, weaker than Veo/Sora for final output.
          </li>
          <li>
            <Em>Kling 2.0, Hailuo</Em> — strong on physics + motion, less
            consistent overall. Cheap. Worth trying if Sora is rate-limited.
          </li>
        </UL>

        <H2>AI avatars / talking head</H2>
        <UL>
          <li>
            <Em>HeyGen</Em> — the &quot;don&apos;t want to be on camera&quot;
            solution. Train a custom avatar in 5 minutes. Lip-sync is good
            enough that people don&apos;t notice unless they&apos;re looking
            for it. Use sparingly — overuse looks fake.
          </li>
          <li>
            <Em>Synthesia</Em> — enterprise-grade, more expensive. Skip for
            indie.
          </li>
          <li>
            <Em>Captions</Em> — combines avatar + captions + B-roll. Closest
            to one-click vertical video. Quality is middling.
          </li>
        </UL>

        <H2>Voice</H2>
        <UL>
          <li>
            <Em>ElevenLabs</Em> — best voiceover quality, period. Free tier
            covers a couple of videos a week. Clone your own voice in 1
            minute if you want consistency without recording.
          </li>
          <li>
            <Em>PlayHT</Em> — alternative with cheaper bulk pricing.
          </li>
        </UL>

        <H2>Editing + captions</H2>
        <UL>
          <li>
            <Em>CapCut</Em> — free, ubiquitous, what most TikTokers use. The
            auto-captions are now excellent.
          </li>
          <li>
            <Em>Submagic</Em> — paid tier (~$15/mo). Best-in-class
            auto-captions with style presets that match the high-converting
            TikTok look. Cuts hours of CapCut work.
          </li>
          <li>
            <Em>Opus Clip</Em> — feed a long video, get short clips
            auto-cropped + captioned. Useful if you&apos;re repurposing
            podcasts or webinars.
          </li>
          <li>
            <Em>Veed.io</Em> — browser-based, simpler than CapCut.
          </li>
        </UL>

        <H2>Three pipelines you can run today</H2>
        <H2>Pipeline A — The demo Reel (10 min total)</H2>
        <OL>
          <li>Screen record your app showing one feature (15-30 sec)</li>
          <li>
            Run the{" "}
            <a className="underline" href="/skills/video-script-writer">
              video-script-writer
            </a>{" "}
            skill — give it your feature + ICP, get a hook + 30-sec script
          </li>
          <li>Record voiceover with ElevenLabs (or just read it yourself)</li>
          <li>Combine in CapCut, add auto-captions (or pass through Submagic)</li>
          <li>Export 9:16, post to IG Reels + TikTok + YT Shorts</li>
        </OL>

        <H2>Pipeline B — The AI avatar tutorial (15 min total)</H2>
        <OL>
          <li>Run video-script-writer for a 60-sec tutorial</li>
          <li>Paste into HeyGen with your trained avatar</li>
          <li>Add screen-recording cutaways at the &quot;feature&quot; moments</li>
          <li>Auto-captions in Submagic</li>
          <li>Export, post</li>
        </OL>

        <H2>Pipeline C — Generative B-roll (20 min total)</H2>
        <OL>
          <li>Record your main footage (talking head or screen)</li>
          <li>
            Identify 3-4 moments that need B-roll. Generate each with Veo 3
            or Sora 2 — 3-second clips.
          </li>
          <li>Cut them in as cutaways in CapCut</li>
          <li>Caption + export</li>
        </OL>

        <H2>Prompt formula for Sora / Veo</H2>
        <P>
          The &quot;Subject + Action + Setting + Style + Camera +
          Duration&quot; pattern. Example:
        </P>
        <Quote>
          A young product designer (subject) typing on a laptop in a coffee
          shop (action + setting), warm cinematic lighting, shallow depth
          of field (style), slow dolly-in (camera), 5 seconds (duration).
        </Quote>

        <H2>Cross-posting + watermarks</H2>
        <UL>
          <li>
            <Em>Strip watermarks before cross-posting.</Em> TikTok watermarks
            on IG Reels = algorithm suppression. Use snaptik or similar.
          </li>
          <li>
            <Em>Vertical 9:16 everywhere.</Em> 1080×1920. Same file works on
            TikTok, Reels, Shorts.
          </li>
          <li>
            <Em>Cover image / thumbnail matters.</Em> Pick a frame that
            makes sense without sound. People scrolling will see this on
            your profile grid.
          </li>
        </UL>
      </>
    ),
  },

  // -----------------------------------------------------------------------
  // Marketing on autopilot — Claude on a schedule
  // -----------------------------------------------------------------------
  {
    slug: "marketing-on-autopilot",
    title: "Marketing on autopilot — running Claude on a schedule",
    titleKo: "마케팅 자동조종 — Claude를 스케줄로 실행하기",
    blurb:
      "Three real ways to put Claude on a cron (Claude Code scheduled tasks, Vercel Cron + AI SDK, or your own cron). Three concrete recipes — including weekly content batches that flow straight into the scheduler. Plus MCP for marketing.",
    readingMinutes: 8,
    body: () => (
      <>
        <P>
          &quot;AI marketing automation&quot; doesn&apos;t mean a black-box
          tool posting on your behalf. It means a small AI program that
          runs on a schedule, does a specific bounded task, and queues the
          result for your review. Done right, you spend 20 minutes a week
          reviewing instead of 5 hours generating.
        </P>

        <H2>Three valid setups</H2>

        <H2>Option A — Claude Code scheduled tasks</H2>
        <P>
          Claude Code supports running skills on a cron from your machine
          (or a small VPS). The skill executes, output goes to a file or an
          HTTP endpoint, you review later. Lowest setup; doesn&apos;t need
          a cloud host. Downsides: your machine must be on when the cron
          fires, or you skip that window.
        </P>
        <P>
          Quick start:
        </P>
        <OL>
          <li>
            Install the skill (e.g.{" "}
            <Code>~/.claude/skills/weekly-content-batch/SKILL.md</Code>) — see{" "}
            <a className="underline" href="/skills">/skills</a> for ready-made files
          </li>
          <li>
            Configure a Claude Code scheduled task (see Claude Code docs;
            built-in feature) to run it Monday 09:00 with your brand brief
            as input
          </li>
          <li>
            Pipe the output to <Code>/api/v1/drafts</Code> via curl. Drafts
            appear in the calendar.
          </li>
        </OL>

        <H2>Option B — Vercel Cron + AI SDK + AI Gateway</H2>
        <P>
          A Next.js / Vercel Function on a cron schedule calls Claude (via
          AI Gateway with a <Code>&quot;anthropic/claude-sonnet&quot;</Code>{" "}
          provider string), processes the result, and POSTs into your
          database. Pros: runs 24/7, no laptop required. Cons: needs a
          hosted DB if you want persistence (current local-SQLite setup
          won&apos;t work on Vercel).
        </P>
        <P>
          The route handler is just an{" "}
          <Code>app/api/cron/&lt;name&gt;/route.ts</Code> that calls{" "}
          <Code>generateText({"{"} model: &quot;anthropic/claude-sonnet&quot;,
          ... {"}"})</Code> and writes the output.
        </P>

        <H2>Option C — Your own crontab + Next.js route</H2>
        <P>
          A regular Unix cron (or launchd / Task Scheduler) hits a Next.js
          route on a schedule. The route runs the AI work and stores the
          result. This is what the existing scheduler uses for{" "}
          <Code>/api/cron/publish-due</Code>.
        </P>
        <P>
          Example macOS crontab line:
        </P>
        <Code>
          0 9 * * 1 curl -fsS -H &quot;Authorization: Bearer $CRON_SECRET&quot;
          http://localhost:3000/api/cron/weekly-content-batch
        </Code>

        <H2>Three concrete recipes</H2>

        <H2>Recipe 1 — Monday morning content batch</H2>
        <P>
          Goal: 7 days of social posts queued for review by 09:30 every
          Monday.
        </P>
        <OL>
          <li>
            Skill:{" "}
            <a className="underline" href="/skills/weekly-content-batch">
              weekly-content-batch
            </a>
          </li>
          <li>
            Cron: <Code>0 9 * * 1</Code>
          </li>
          <li>
            Skill output: JSON array of 7 draft posts, one per day, with
            text + suggested image keywords.
          </li>
          <li>
            Cron handler POSTs each one to{" "}
            <Code>/api/v1/drafts</Code> with{" "}
            <Code>{"{ status: \"draft\" }"}</Code>. Drafts (not queued)
            until you explicitly approve.
          </li>
          <li>
            You spend Monday morning reviewing in the Calendar UI. Approve
            ones you like, edit captions, delete bad ones. Approved →
            queued → published by the existing publisher cron.
          </li>
        </OL>

        <H2>Recipe 2 — Friday review digest</H2>
        <P>
          Goal: a 2-minute email every Friday summarizing the week&apos;s
          App Store reviews into themes.
        </P>
        <OL>
          <li>
            Fetch new reviews via the App Store Connect API (or scrape with{" "}
            <Code>app-store-scraper</Code> — npm package)
          </li>
          <li>
            Pipe through the{" "}
            <a className="underline" href="/skills/app-store-review-digest">
              app-store-review-digest
            </a>{" "}
            skill
          </li>
          <li>
            Email the result to yourself via Resend (or post to a Slack /
            Discord webhook)
          </li>
          <li>Cron: <Code>0 16 * * 5</Code></li>
        </OL>

        <H2>Recipe 3 — Daily competitor signal</H2>
        <P>
          Goal: 5-minute daily digest of what competitors did.
        </P>
        <OL>
          <li>
            Pick 3-5 competitors. Add their RSS feeds (blog + changelog) +
            their X handles
          </li>
          <li>
            Cron fetches new items, dedupes against yesterday
          </li>
          <li>
            Pass new items to Claude with a prompt: &quot;Summarize each into
            one sentence. Flag any pricing changes, new features, or PR
            mentions.&quot;
          </li>
          <li>Email yourself the digest. Cron: <Code>0 8 * * *</Code></li>
        </OL>

        <H2>MCP (Model Context Protocol) for marketing</H2>
        <P>
          MCP lets Claude in Claude Code <Em>reach external tools</Em> —
          your database, your analytics, your scheduler. Concretely: you
          can talk to Claude Code about &quot;schedule a post for tomorrow
          with this caption&quot; and Claude executes the API call without
          you copy-pasting.
        </P>
        <P>
          To expose this app&apos;s <Code>/api/v1/*</Code> endpoints to
          Claude Code as an MCP server, drop the example config file at{" "}
          <a className="underline" href="/skills/mcp-marketing-server.example.json">
            /skills/mcp-marketing-server.example.json
          </a>{" "}
          into{" "}
          <Code>~/.claude/mcp_servers.json</Code>. Now from any Claude Code
          session you can: &quot;list my connected accounts&quot;,
          &quot;create a draft tweet for Friday saying X&quot;, etc.
        </P>

        <H2>Safety + governance</H2>
        <UL>
          <li>
            <Em>Default to draft, not queued.</Em> AI output is never published
            without your eyes on it.
          </li>
          <li>
            <Em>Log every cron run.</Em> Have an audit trail for what fired,
            with what input, and what came out.
          </li>
          <li>
            <Em>Cap rate-limits.</Em> If the AI generates 10 posts a day in
            a buggy loop, you don&apos;t want all 10 to publish. The
            scheduler&apos;s stale-post protection prevents this for the
            scheduler — apply similar caps elsewhere.
          </li>
          <li>
            <Em>Don&apos;t auto-reply to humans</Em> — even with AI.
            People can tell, and you&apos;ll torch trust to save 5 minutes.
          </li>
        </UL>
      </>
    ),
  },

  // -----------------------------------------------------------------------
  // Design automation
  // -----------------------------------------------------------------------
  {
    slug: "design-automation",
    title: "Design automation — making marketing visuals without a designer",
    titleKo: "디자인 자동화 — 디자이너 없이 마케팅 비주얼 만들기",
    blurb:
      "Four paths from copy to image: Vercel OG (code-driven), Figma (template-driven), AI imagery, and paid SaaS. Honest trade-offs and one recommendation for each use case.",
    blurbKo:
      "카피에서 이미지까지 네 가지 경로: Vercel OG (코드 기반), Figma (템플릿 기반), AI 이미지 생성, 유료 SaaS. 솔직한 트레이드오프와 사용 사례별 추천.",
    readingMinutes: 7,
    body: () => (
      <>
        <P>
          You need App Store screenshots, social-share images, ad creatives,
          and landing-page hero visuals. You&apos;re one person. Hiring a
          designer is expensive and you don&apos;t need one for 80% of these.
          Here&apos;s the practical landscape.
        </P>

        <H2>Four production paths, ranked by use case</H2>

        <H2>Path A — Vercel OG (code-driven, programmatic)</H2>
        <P>
          Next.js ships <Code>next/og</Code> built-in. You write a React
          component, pass props (title, subtitle, accent color, background),
          and the framework returns a PNG. Perfect for repeatable templates
          where you swap text frequently.
        </P>
        <UL>
          <li>
            <Em>Best for:</Em> social-share / OpenGraph images,
            Instagram-square branded thumbnails, headers for blog posts.
          </li>
          <li>
            <Em>Setup time:</Em> ~30 minutes for one template. Templates are
            reusable.
          </li>
          <li>
            <Em>Cost:</Em> free — runs as a Next.js Route Handler.
          </li>
          <li>
            <Em>Founder&apos;s entry point:</Em>{" "}
            <a className="underline" href="/tools/visual-builder">
              /tools/visual-builder
            </a>{" "}
            — pick template, fill form, preview, download.
          </li>
          <li>
            <Em>Limitation:</Em> the output is functional, not gorgeous.
            For an indie-launch aesthetic that&apos;s usually fine.
          </li>
        </UL>

        <H2>Path B — Figma + template (template-driven)</H2>
        <P>
          You (or a freelancer for $200) build a master Figma file with 5-10
          frames: App Store screenshot variants, social post squares, Story
          covers, ad layouts. You duplicate a frame and edit the text +
          screenshot for each new asset.
        </P>
        <UL>
          <li>
            <Em>Best for:</Em> App Store screenshots (where polish matters),
            ads, landing-page heroes, anything that needs an &quot;eye&quot;
            for layout that code can&apos;t do.
          </li>
          <li>
            <Em>Setup time:</Em> 4-8 hours for a brand template (or pay a
            freelancer once).
          </li>
          <li>
            <Em>Cost:</Em> free Figma tier is fine for personal use.
          </li>
          <li>
            <Em>Automation option:</Em> Figma has a REST API and a Plugin
            API. For higher volume, write a small Node script that reads a
            CSV of copy and produces variant frames programmatically. Use
            the <Code>figma-template-brief</Code> skill to write a clear
            spec for the template before you build it.
          </li>
          <li>
            <Em>Limitation:</Em> requires manual swap if you&apos;re not
            automating. Slower than Vercel OG for repetitive output.
          </li>
        </UL>

        <H2>Path C — AI image generation</H2>
        <P>
          DALL-E 3, Midjourney, Imagen, Stable Diffusion XL. Generate
          imagery from a text prompt.
        </P>
        <UL>
          <li>
            <Em>Best for:</Em> hero photography, abstract backgrounds, mood
            pieces, illustration concepts. Especially good when you&apos;d
            otherwise resort to stock photos.
          </li>
          <li>
            <Em>Bad for:</Em> anything with text in the image (gibberish),
            anything with your actual product UI in it, talking-head photos
            (uncanny in 2026).
          </li>
          <li>
            <Em>Cost:</Em> ~$0.04-$0.10 per image via API.
          </li>
          <li>
            <Em>Pro tip:</Em> generate the imagery, then composite text on
            top in Vercel OG or Figma. Don&apos;t ask AI to render text.
          </li>
        </UL>

        <H2>Path D — Paid SaaS (Bannerbear, Placid, Canva Connect)</H2>
        <P>
          API-driven design SaaS. You design a template once in their editor,
          then call their API to swap text/images.
        </P>
        <UL>
          <li>
            <Em>Best for:</Em> producing 100+ images a week with consistent
            branding. Marketing teams, not solo founders.
          </li>
          <li>
            <Em>Cost:</Em> $50-200/month.
          </li>
          <li>
            <Em>Skip unless:</Em> you&apos;ve outgrown Vercel OG and don&apos;t
            want to maintain code. Most indie founders never hit this point.
          </li>
        </UL>

        <H2>Recommended stack for an indie founder</H2>
        <OL>
          <li>
            Use <Em>Vercel OG</Em> (this app&apos;s{" "}
            <a className="underline" href="/tools/visual-builder">
              visual-builder
            </a>
            ) for all social-share images, branded thumbnails, and quick
            iterations.
          </li>
          <li>
            Build one <Em>Figma template</Em> for App Store screenshots
            (this is the one place polish matters disproportionately). Use
            the <Code>figma-template-brief</Code> skill to write the spec,
            then either DIY in Figma or hire a freelancer with that brief.
          </li>
          <li>
            Use <Em>AI imagery</Em> sparingly for hero / background pieces
            where you&apos;d otherwise use stock.
          </li>
          <li>
            Skip the paid SaaS unless / until you have a real automation
            volume problem.
          </li>
        </OL>

        <H2>The under-discussed rule</H2>
        <Quote>
          Brand consistency comes from picking 1 typeface, 1 accent color,
          and 1 illustration style — and applying them everywhere. Stop
          changing them. Boring is good.
        </Quote>
        <P>
          The founders who look &quot;designed&quot; aren&apos;t the ones
          who designed more. They&apos;re the ones who picked a palette
          early and stopped touching it.
        </P>
      </>
    ),
  },

  // -----------------------------------------------------------------------
  // Existing guides below
  // -----------------------------------------------------------------------
  {
    slug: "switch-to-creator",
    title: "Use any Instagram account — switch to a Creator profile in 30 seconds",
    titleKo: "어떤 인스타그램 계정이든 사용하기 — 30초 만에 크리에이터 계정으로 전환",
    blurb:
      "Why this app (and Buffer, Later, every other scheduler) needs a Creator or Business account, and how to switch without your followers noticing.",
    blurbKo:
      "이 앱(그리고 Buffer, Later 등 모든 스케줄러)이 크리에이터/비즈니스 계정을 요구하는 이유와, 팔로워가 눈치채지 못하게 전환하는 방법.",
    readingMinutes: 2,
    body: () => (
      <>
        <P>
          Short version: Instagram&apos;s official API only works with{" "}
          <Em>Creator</Em> or <Em>Business</Em> profiles. Personal accounts
          have no public API for posting, DMs, comments, or insights — none.
          This isn&apos;t a quirk of this app. Buffer, Later, Hootsuite,
          Metricool — every legitimate scheduler has the same requirement,
          because they all use the same Meta Graph API.
        </P>
        <P>
          The good news: switching is free, takes 30 seconds, is invisible to
          your followers, and is reversible at any time.
        </P>

        <H2>Why not just &quot;use my regular account&quot;?</H2>
        <P>
          The only way to automate a personal account is browser automation
          or reverse-engineered private mobile APIs. Both are explicit
          Terms-of-Use violations. Instagram&apos;s spam detection catches
          them within days for any account that posts or DMs at scale, and
          the typical outcome is a permanent ban — losing all your followers
          and content. We don&apos;t build that path here, and you shouldn&apos;t
          use any service that does.
        </P>

        <H2>How to switch (Instagram mobile app)</H2>
        <OL>
          <li>Tap your profile picture → menu (☰) → <Em>Settings and activity</Em></li>
          <li>Tap <Em>Account type and tools</Em></li>
          <li>Tap <Em>Switch to professional account</Em></li>
          <li>Pick a category (your niche — &quot;Personal Blog&quot; is fine if unsure)</li>
          <li>
            Choose <Em>Creator</Em> (or Business — Creator is the better default
            for personal brands, influencers, freelancers; Business is for shops
            and companies). You can switch between Creator and Business later.
          </li>
          <li>Skip the &quot;contact info&quot; step if you want — it&apos;s optional</li>
        </OL>

        <H2>What changes?</H2>
        <UL>
          <li>Your followers and posts stay exactly as they are</li>
          <li>Your profile looks the same to visitors (you can hide the category label in settings)</li>
          <li>You get an Insights tab in the app — reach, impressions, follower demographics</li>
          <li>Your DMs split into &quot;Primary&quot;, &quot;General&quot;, and &quot;Requests&quot; tabs</li>
          <li>You can now run ads if you want (you don&apos;t have to)</li>
          <li>You unlock API access — this app and others can now connect</li>
        </UL>

        <H2>What you might lose</H2>
        <UL>
          <li>
            The ability to set your account to <Em>Private</Em>. Creator and
            Business profiles must be public.
          </li>
          <li>
            Music in Stories for some regions, due to licensing. Most regions
            still get music access on Creator accounts.
          </li>
        </UL>

        <H2>Switching back</H2>
        <P>
          Same place: <Em>Settings and activity</Em> → <Em>Account type and tools</Em> →{" "}
          <Em>Switch account type</Em> → <Em>Switch to personal account</Em>.
          Your data is preserved.
        </P>

        <H2>Now connect</H2>
        <P>
          Head back to the <a className="underline" href="/">home page</a> and
          click <Em>Connect Instagram</Em>.
        </P>
      </>
    ),
  },

  {
    slug: "content-strategy",
    title: "Content strategy: the 70 / 20 / 10 rule",
    blurb:
      "A simple ratio that keeps your feed from turning into an ad break — and keeps your audience showing up.",
    readingMinutes: 3,
    body: () => (
      <>
        <P>
          The fastest way to kill an Instagram or Twitter account is to make
          every post about you and your product. The fastest way to build one
          is to be genuinely useful 90% of the time. The 70/20/10 rule
          enforces that.
        </P>

        <H2>The split</H2>
        <UL>
          <li>
            <Em>70% — educate or entertain</Em> in your niche. No CTA, no
            product pitch. Just stuff your ideal customer wants to see whether
            they buy from you or not.
          </li>
          <li>
            <Em>20% — community</Em>. Repost a customer&apos;s photo, run a
            poll in Stories, reply to a comment with a video, share a
            collaborator&apos;s post. You&apos;re showing your audience to your
            audience.
          </li>
          <li>
            <Em>10% — direct promotion</Em>. New product, sale, link in bio,
            book a call. This is the slot that pays the bills.
          </li>
        </UL>

        <H2>Why the ratio matters</H2>
        <P>
          Instagram&apos;s ranking signals are dominated by{" "}
          <Em>saves and shares</Em>, not likes. Educational and entertaining
          posts get saved and shared. Promo posts get scrolled past. If 100%
          of your posts are promo, your reach collapses and even your promo
          posts stop being seen — including by people who already follow you.
        </P>

        <Quote>
          The platform rewards posts your followers actively send to a friend.
          Promo posts are almost never sent to a friend.
        </Quote>

        <H2>Examples by industry</H2>
        <UL>
          <li>
            <Em>SaaS for designers</Em>: 70% one-shot design tips and tool
            walkthroughs · 20% reposting customer work · 10% feature launches
            and pricing
          </li>
          <li>
            <Em>Solo coach</Em>: 70% short frameworks and client wins (anonymous
            if needed) · 20% &quot;ask me anything&quot; in Stories · 10% open
            slots and program launches
          </li>
          <li>
            <Em>Local restaurant</Em>: 70% behind-the-kitchen and recipe-style
            Reels · 20% reposting guests · 10% specials and reservations
          </li>
        </UL>

        <H2>How to enforce it</H2>
        <P>
          In this app&apos;s Calendar view, look at your next 10 posts. Count
          how many fall in each bucket. If you have 6+ promo posts in a row,
          delay or swap them. The discipline is the strategy.
        </P>
      </>
    ),
  },

  {
    slug: "hashtags",
    title: "Hashtags in 2026: use fewer, more specific ones",
    blurb:
      "The 30-hashtag spray-and-pray approach died years ago. Here's what actually works now.",
    readingMinutes: 3,
    body: () => (
      <>
        <P>
          Instagram&apos;s own product team has said publicly: more than 3–5
          hashtags doesn&apos;t improve reach. Their algorithm now ranks
          content primarily by topic classification (which it infers from the
          image, video, and caption text), not by hashtag match. Hashtags
          still matter as a topic signal and for hashtag-search discovery,
          but the math has flipped.
        </P>

        <H2>The new rules</H2>
        <UL>
          <li>
            <Em>3 to 5 hashtags</Em>. Not 11. Not 30. Five is the
            magic-feeling number; three is fine.
          </li>
          <li>
            <Em>Specific beats broad</Em>.{" "}
            <Code>#sourdoughtoronto</Code> outperforms <Code>#bread</Code> by
            10x in conversion-relevant impressions, because the people
            searching the specific tag are already 80% of the way to caring.
          </li>
          <li>
            <Em>Caption or first comment — doesn&apos;t matter</Em>. This used
            to be a contested ritual. Meta confirmed in 2022 there&apos;s no
            difference. Put them wherever looks cleanest.
          </li>
          <li>
            <Em>Avoid huge tags ({">"} 1M posts)</Em> for marketing. You
            get drowned in 5 minutes. Aim for tags with 10k-500k posts where
            you can actually rank.
          </li>
          <li>
            <Em>Don&apos;t use banned tags</Em>. They quietly shadowban
            individual posts. Quick check: search the tag — if it says
            &quot;Recent posts hidden&quot;, skip it.
          </li>
        </UL>

        <H2>A working template</H2>
        <P>
          One broad tag (your niche), one mid-size tag (your sub-niche), one
          local tag (city/region if relevant), one community tag (e.g.{" "}
          <Code>#solofounders</Code>), one branded tag (your own — pick one
          and use it forever).
        </P>

        <H2>Twitter / X</H2>
        <P>
          Different game entirely. On X, hashtags don&apos;t help reach —
          replies, retweets, and bookmarks do. Use a hashtag only if{" "}
          <Em>you specifically want to be findable in that tag&apos;s search</Em>
          {" "}(rare). Otherwise drop them; they make tweets look spammy.
        </P>
      </>
    ),
  },

  {
    slug: "reels-strategy",
    title: "Why Reels eat everything (and how to ride them)",
    blurb:
      "Instagram is now a Reels-first platform. If you're not posting vertical video, you're invisible to non-followers.",
    readingMinutes: 3,
    body: () => (
      <>
        <P>
          Meta&apos;s ranking algorithm shifted in 2022-2023 to push Reels to
          non-followers in the Explore feed and Reels tab. The result: a Reel
          with no followers can get tens of thousands of views; a feed photo
          from the same account rarely escapes its follower base. This
          isn&apos;t coming back. If you want to grow on Instagram in 2026,
          Reels are the channel.
        </P>

        <H2>What works</H2>
        <UL>
          <li>
            <Em>The first 3 seconds decide everything</Em>. If a viewer
            doesn&apos;t stop scrolling, the algorithm logs a skip. Lead with
            the conclusion or the surprise, not the setup.
          </li>
          <li>
            <Em>Hook → value → CTA</Em>. 7-30 seconds total. &quot;Here&apos;s
            the mistake&quot; → &quot;here&apos;s the fix&quot; → &quot;save
            this for later&quot; or &quot;DM me CODE&quot;.
          </li>
          <li>
            <Em>Captions on-video</Em>. 80%+ of viewers watch with sound off.
            Auto-captions are fine; manually clean them up if you&apos;re
            sharp about it.
          </li>
          <li>
            <Em>Vertical 9:16, no watermarks</Em>. Reels with visible TikTok
            watermarks get suppressed. Use snaptik or similar to strip them
            if you&apos;re cross-posting from TikTok.
          </li>
          <li>
            <Em>Cover image matters</Em>. The thumbnail is what people see on
            your grid. Pick a frame that makes sense without the audio.
          </li>
        </UL>

        <H2>What doesn&apos;t</H2>
        <UL>
          <li>Long intros (&quot;Hey guys! Today we&apos;re going to talk about...&quot;)</li>
          <li>Watermarked content from other platforms</li>
          <li>Static text-on-image &quot;Reels&quot; — they signal low effort and get throttled</li>
          <li>Posting more than 1 Reel/day on a small account — quality dilutes</li>
        </UL>

        <H2>The lazy-but-honest workflow</H2>
        <P>
          Record 4 Reels in one 30-minute sitting, all on one topic, each from a
          different angle. Upload them to this app and schedule one every
          other day. You&apos;ve got 8 days of content from 30 minutes of
          work, and the algorithm gets a consistent topic signal — which
          increases your reach over time.
        </P>
      </>
    ),
  },

  {
    slug: "dm-funnels",
    title: "On DM funnels: this app doesn't do them (and why)",
    blurb:
      "If you want keyword-triggered DM auto-replies (\"comment LINK and I'll DM you\"), you need a different tool. Here's the honest landscape.",
    readingMinutes: 2,
    body: () => (
      <>
        <P>
          DM auto-replies on Instagram require <Em>three things this app deliberately
          doesn&apos;t do</Em>: a publicly-reachable webhook endpoint, an always-on
          server, and a Meta App Review to enable <Code>instagram_manage_messages</Code>.
          We considered building it and cut it — the &quot;run on my laptop&quot;
          deployment story doesn&apos;t work for live event handling.
        </P>

        <H2>If you want this feature</H2>
        <UL>
          <li>
            <Em>ManyChat</Em> (free tier exists) — best-in-class. Their entire
            product is keyword-triggered IG/FB/WhatsApp flows.
          </li>
          <li>
            <Em>Customers.ai</Em> (formerly MobileMonkey) — similar.
          </li>
          <li>
            <Em>Manual quick replies</Em> in the Instagram app — &quot;Settings →
            Business tools → Saved replies&quot;. Free, no automation, but
            instant template insertion when you reply manually.
          </li>
        </UL>

        <H2>The 24-hour rule</H2>
        <P>
          Whatever tool you use: Instagram only lets you send a DM within{" "}
          <Em>24 hours</Em> after the user&apos;s last message to you. Cold
          outbound DM blasts to followers aren&apos;t API-allowed, regardless
          of which tool you pick. If a vendor promises this, they&apos;re
          using browser automation and your account will get banned.
        </P>

        <H2>What this app gives you instead</H2>
        <P>
          The bio-link or first-comment play is still very effective and doesn&apos;t
          need any of this infrastructure: post a Reel with &quot;link in bio&quot;,
          rotate your bio link via a Linktree-like page, capture leads on
          your own landing page. Schedule the Reel with this app, write the
          caption with AI, done.
        </P>
      </>
    ),
  },
  {
    slug: "cadence-and-timing",
    title: "Posting cadence and timing: stop optimizing the wrong thing",
    blurb:
      "Generic 'best time to post' charts are mostly noise. What actually matters: consistency and your own audience's pattern.",
    readingMinutes: 3,
    body: () => (
      <>
        <P>
          You&apos;ve probably seen the &quot;post on Tuesdays at 11am
          EST&quot; charts. They&apos;re averages across millions of unrelated
          accounts. Your followers might all be in Seoul, or all be insomniacs,
          or all be moms with the same nap-time window. Generic timing
          advice is averaged into uselessness.
        </P>

        <H2>What actually matters, in order</H2>
        <OL>
          <li>
            <Em>You publish consistently.</Em> 3 posts/week forever beats 7
            posts in week 1 and 0 after.
          </li>
          <li>
            <Em>You post when your specific audience is awake.</Em> Use this
            app&apos;s Insights data (after a month or two of posting) — it
            shows when your followers are actually online.
          </li>
          <li>
            <Em>You post when you can engage for the first hour.</Em> The
            algorithm uses the first hour&apos;s engagement rate to decide how
            far to push the post. If you publish and immediately go offline,
            you&apos;re wasting it.
          </li>
        </OL>

        <H2>Realistic cadence by account size</H2>
        <UL>
          <li>
            <Em>Under 1k followers</Em>: 3-5 posts/week. Mix of 1-2 Reels and
            2-3 feed/carousel. Posting more dilutes quality and your reach
            won&apos;t recover proportionally.
          </li>
          <li>
            <Em>1k-10k</Em>: 5 posts/week + daily Stories. Reels at least 2x
            weekly.
          </li>
          <li>
            <Em>10k+</Em>: Daily is fine if you can keep quality up. Reels
            3-5x weekly.
          </li>
        </UL>

        <H2>Twitter / X cadence</H2>
        <P>
          Totally different rhythm. 3-10 tweets per day is normal for an
          active account. Replies to other people&apos;s tweets count more
          than your own posts for reach — aim for at least as many replies as
          original posts. The platform rewards being present in conversations,
          not broadcasting.
        </P>

        <H2>The honest workflow</H2>
        <P>
          Batch-create content on Saturday or Sunday: 4 IG posts and 20
          tweets. Schedule them across the week via this app. Spend your
          weekday time engaging in DMs, comments, and replies — that&apos;s
          where reach is actually earned.
        </P>
      </>
    ),
  },

  {
    slug: "twitter-marketing",
    title: "Twitter / X playbook for marketing (it's mostly replies)",
    blurb:
      "X is a conversation platform with a posting feature attached. If you only post and never reply, you'll get nowhere.",
    readingMinutes: 3,
    body: () => (
      <>
        <P>
          X&apos;s algorithm rewards engagement-density much more aggressively
          than Instagram&apos;s. A single thoughtful reply to a big account in
          your niche can outperform 20 of your own posts. This is the single
          most-underused tactic on the platform.
        </P>

        <H2>The reply game</H2>
        <UL>
          <li>
            <Em>Pick 20 accounts</Em> in your niche bigger than you. Follow
            them, turn on notifications for 5.
          </li>
          <li>
            <Em>Reply within the first 30 minutes</Em> of their post going
            live. Early replies get pinned higher in the reply thread, which
            means more eyeballs.
          </li>
          <li>
            <Em>Add value, don&apos;t suck up</Em>. &quot;Great post!&quot; is
            invisible. A counter-example, a related stat, or an honest
            disagreement gets profile clicks.
          </li>
          <li>
            <Em>Don&apos;t self-promote in the reply</Em>. Let your bio do
            that. Self-promo in replies gets you muted, blocked, or worse —
            ignored.
          </li>
        </UL>

        <H2>When to post vs thread</H2>
        <UL>
          <li>
            <Em>Single tweet</Em>: a punchy take, a number, a screenshot of
            something interesting. ~70% of your posts.
          </li>
          <li>
            <Em>Thread</Em>: a story or how-to that needs more than 280
            characters but less than a blog post. Hook tweet → 3-8 follow-up
            tweets → final tweet with a CTA. ~20%.
          </li>
          <li>
            <Em>Image / chart</Em>: data, before/afters, screenshots of code
            or DMs (with permission). Images double median reach. ~10%.
          </li>
        </UL>

        <H2>Bookmarks matter</H2>
        <P>
          Bookmarks are the X algorithm&apos;s strongest positive signal,
          stronger than likes. People bookmark stuff they want to return to.
          If your post has high bookmark-to-impression ratio, X will keep
          pushing it for days. Make posts worth bookmarking — references,
          checklists, frameworks.
        </P>

        <H2>Free tier reality</H2>
        <P>
          Free API tier is 1,500 posts/month. Plenty for personal use. Reads
          are 100/month — too tight to do real analytics polling, so this app
          intentionally doesn&apos;t try.
        </P>
      </>
    ),
  },

  {
    slug: "analytics",
    title: "What to actually measure (and what to ignore)",
    blurb:
      "Follower count is a vanity metric. Here are the numbers that predict whether your account makes you money.",
    readingMinutes: 3,
    body: () => (
      <>
        <P>
          Most creators obsess over follower count and like count. Both are
          almost entirely uncorrelated with revenue. Here&apos;s what the
          numbers really mean.
        </P>

        <H2>Instagram metrics, ranked by usefulness</H2>
        <OL>
          <li>
            <Em>Saves per impression</Em>. This is the strongest predictor of
            reach growth. A 2% save rate is great, 5%+ is exceptional. Saves
            mean you said something worth returning to.
          </li>
          <li>
            <Em>Shares per impression</Em>. People sent your post to a friend
            in DM. The single highest-value engagement signal.
          </li>
          <li>
            <Em>Profile visits → Follow conversion rate</Em>. Of the people who
            tap to your profile, how many follow? 20%+ is good. Low rate
            means your bio + grid isn&apos;t closing.
          </li>
          <li>
            <Em>DMs received per post</Em>. If you&apos;re doing lead-gen,
            this is the only output number that matters.
          </li>
          <li>
            <Em>Reach</Em>. Of these, this is the &quot;health check&quot;.
            Watch the trend, not the absolute number.
          </li>
        </OL>

        <H2>What to ignore</H2>
        <UL>
          <li>
            <Em>Likes</Em>. Inflated by passive scrollers, lightly weighted by
            the algorithm.
          </li>
          <li>
            <Em>Follower count alone</Em>. Without engagement, a big follower
            number means nothing. The Instagram algorithm doesn&apos;t care
            how many followers you have when deciding reach.
          </li>
          <li>
            <Em>Comments unless they&apos;re &gt; 4 words</Em>. Single emojis
            or &quot;🔥🔥&quot; barely register.
          </li>
        </UL>

        <H2>Twitter / X metrics</H2>
        <UL>
          <li>
            <Em>Bookmarks</Em>. Stronger signal than likes.
          </li>
          <li>
            <Em>Replies per post</Em>. Replies = the platform is amplifying
            you to non-followers.
          </li>
          <li>
            <Em>Profile clicks</Em>. Visible in X analytics. Predicts follower
            growth from a given post.
          </li>
          <li>
            <Em>Quote tweets vs retweets</Em>. Quote tweets bring your post to
            another audience with commentary — gold. Retweets are weaker.
          </li>
        </UL>

        <H2>The one-number dashboard</H2>
        <Quote>
          Track <Em>leads per week</Em> — DM conversations + email signups +
          replies-to-CTA. That&apos;s the only number that connects to revenue.
        </Quote>
        <P>
          Everything else is a leading or lagging indicator of that one number.
          If leads/week is going up, you&apos;re doing it right — even if
          followers, likes, or reach are flat for a stretch.
        </P>
      </>
    ),
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
