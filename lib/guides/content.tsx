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
