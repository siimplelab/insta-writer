/**
 * Quick-read summaries for each guide. Rendered at the top of the detail page.
 * Keep each bullet short — under ~16 words. 3-5 bullets per guide.
 */
export const GUIDE_TLDR: Record<string, string[]> = {
  "promote-mobile-app": [
    "Five phases: pre-launch, launch day, first 30 days, 100→1,000 users, beyond.",
    "Pick a Tuesday for Product Hunt — coordinate everything to fire on that day.",
    "Month 1 is for listening (cold-DMs, calls, reviews), not for scaling.",
    "Don't buy ads before you have 100 manual users — you'll burn money learning what manual outreach teaches free.",
    "ASO + vertical video beat SEO blogs until you have 1,000 users.",
  ],
  "first-100-users": [
    "Manual outreach beats every paid channel at zero followers.",
    "Cold-DMs at ~10% conversion: 100 sent = ~3 keeps.",
    "Two niche communities + Hacker News Show HN + Indie Hackers + your network = enough.",
    "Skip ads and SEO blogs at this stage. They burn money or take too long.",
  ],
  "aso-basics": [
    "Title + subtitle do most of the work. Get the primary keyword in.",
    "First 3 screenshots are seen by ~70% of visitors. Lead with the outcome, not the UI.",
    "iOS keyword field is 100 chars total — every plural or repeat is wasted.",
    "ASO compounds. Iterate monthly, not yearly.",
  ],
  "ai-for-marketers": [
    "Use AI to do more, not to skip thinking. Mediocre AI = treadmill.",
    "AI wins at: synthesizing reviews, generating variations, first drafts, localization.",
    "AI loses at: your voice, real stories, replying to humans, images at scale (looks fake).",
    "Three workflow recipes: Monday content batch, Friday review digest, launch warmup.",
  ],
  "video-marketing": [
    "Vertical short-form video is the highest-leverage channel for a new app in 2026.",
    "Algorithm pushes Reels/TikTok/Shorts to non-followers — no audience required.",
    "AI stack: Sora 2 / Veo 3 / Runway for generation, HeyGen for avatars, ElevenLabs for voice, Submagic for captions.",
    "Three pipelines: demo Reel (10 min), AI avatar tutorial (15 min), generative B-roll (20 min).",
    "Strip TikTok watermarks before cross-posting to Reels.",
  ],
  "marketing-on-autopilot": [
    "Three setups: Claude Code scheduled tasks, Vercel Cron + AI SDK, or your own crontab.",
    "Three recipes: Monday content batch, Friday review digest, daily competitor signal.",
    "MCP lets Claude reach your scheduler API directly from any session.",
    "Default to draft, not queued. Never auto-publish without human eyes on it.",
  ],
  "design-automation": [
    "Four paths: Vercel OG (code), Figma (template), AI imagery, paid SaaS.",
    "Use Vercel OG (/tools/visual-builder) for social images. Use Figma for App Store screenshots.",
    "AI imagery for backgrounds + heroes — not anything with text or your UI.",
    "Skip paid SaaS unless you're producing 100+ images/week.",
    "Brand consistency = 1 typeface, 1 accent color, 1 illustration style. Stop changing them.",
  ],
  "switch-to-creator": [
    "Personal Instagram accounts have no API. Period. Buffer, Later, and this app all require Creator/Business.",
    "Switching takes 30 seconds in the IG app. Free. Invisible to followers. Reversible.",
    "Account type and tools → Switch to professional account → Creator.",
    "You lose the ability to set Private. You gain Insights + DM tabs + API access.",
  ],
  "content-strategy": [
    "70% educate or entertain. 20% community. 10% direct promotion.",
    "Saves + shares > likes. The algorithm rewards posts your followers send to a friend.",
    "Check your next 10 scheduled posts. If 6+ are promo, swap them.",
  ],
  "hashtags": [
    "Use 3-5, not 30. Specific (#sourdoughtoronto) beats broad (#bread).",
    "Caption or first comment doesn't matter (anymore). Put them wherever's cleanest.",
    "Avoid huge tags (>1M posts) for marketing — you drown in 5 min.",
    "On X, hashtags don't help reach. Skip them unless targeting a specific search.",
  ],
  "reels-strategy": [
    "First 3 seconds decide everything. Lead with the conclusion or surprise.",
    "Hook → value → CTA. 7-30 seconds total.",
    "Captions on-video (80%+ of viewers have sound off). Vertical 9:16, no watermarks.",
    "Record 4 Reels in one 30-min sitting on one topic. Schedule across 8 days.",
  ],
  "dm-funnels": [
    "Instagram's API limits DM auto-replies to within a 24-hour window after the user contacts you.",
    "This app deliberately doesn't build DM automation — requires always-on webhook hosting.",
    "Use ManyChat or Customers.ai if you want it. Best-in-class.",
    "Manual quick replies in the IG app are free and surprisingly effective.",
  ],
  "cadence-and-timing": [
    "Consistency beats 'best time' charts. 3 posts/week forever > 7 in week 1 + 0 after.",
    "Use your own Insights to find your audience's actual peak times.",
    "Engage in the first hour after posting. The algorithm reads first-hour engagement.",
    "On X: replies > posts. Aim for as many replies as original posts.",
  ],
  "twitter-marketing": [
    "X rewards engagement density. One thoughtful reply beats 20 of your own posts.",
    "Pick 20 niche accounts. Reply early (within 30 min of their post).",
    "70% single tweets / 20% threads / 10% images. Don't promote in replies.",
    "Bookmarks are X's strongest positive signal — stronger than likes.",
  ],
  analytics: [
    "Follower count is a vanity metric. Saves, shares, and bookmarks are real signal.",
    "Activation rate + day-7 retention predict long-term success more than reach.",
    "Track leads/week as your one-number dashboard. That's what ties to revenue.",
    "Reply to every comment that's > 4 words. Single emojis barely register.",
  ],
};

/** Korean translations of the guide TL;DRs. */
export const GUIDE_TLDR_KO: Record<string, string[]> = {
  "promote-mobile-app": [
    "다섯 단계: 출시 전, 출시일, 첫 30일, 100→1,000명, 그 이후.",
    "Product Hunt는 화요일에. 모든 걸 그날 한 번에 터뜨리도록 맞추세요.",
    "1개월차는 확장이 아니라 경청(콜드 DM, 통화, 리뷰)을 위한 시간입니다.",
    "수동으로 100명을 모으기 전엔 광고를 사지 마세요 — 수동 아웃리치가 공짜로 가르쳐 줄 걸 돈 주고 배우게 됩니다.",
    "1,000명이 되기 전까진 ASO + 세로형 영상이 SEO 블로그를 이깁니다.",
  ],
  "first-100-users": [
    "팔로워 0명일 때는 수동 아웃리치가 모든 유료 채널을 이깁니다.",
    "콜드 DM 전환율 약 10%: 100건 보내면 약 3명 정착.",
    "틈새 커뮤니티 2곳 + Hacker News Show HN + Indie Hackers + 내 네트워크면 충분합니다.",
    "이 단계에선 광고와 SEO 블로그는 건너뛰세요. 돈을 태우거나 너무 오래 걸립니다.",
  ],
  "aso-basics": [
    "제목 + 부제목이 대부분의 일을 합니다. 핵심 키워드를 꼭 넣으세요.",
    "방문자 약 70%가 처음 3개 스크린샷만 봅니다. UI가 아니라 결과를 앞세우세요.",
    "iOS 키워드 필드는 총 100자 — 복수형이나 중복은 모두 낭비입니다.",
    "ASO는 복리로 쌓입니다. 1년이 아니라 매달 개선하세요.",
  ],
  "ai-for-marketers": [
    "AI는 사고를 건너뛰려고가 아니라 더 많이 하려고 쓰세요. 어중간한 AI = 쳇바퀴.",
    "AI가 잘하는 것: 리뷰 종합, 변형 생성, 초안, 현지화.",
    "AI가 못하는 것: 당신의 목소리, 진짜 스토리, 사람에게 답장, 대량 이미지(가짜 티 남).",
    "워크플로 3가지: 월요일 콘텐츠 배치, 금요일 리뷰 요약, 출시 워밍업.",
  ],
  "video-marketing": [
    "세로형 숏폼 영상은 2026년 새 앱에 가장 레버리지가 큰 채널입니다.",
    "알고리즘이 릴스/틱톡/쇼츠를 비팔로워에게 밀어줍니다 — 청중이 없어도 됩니다.",
    "AI 스택: 생성은 Sora 2 / Veo 3 / Runway, 아바타는 HeyGen, 음성은 ElevenLabs, 자막은 Submagic.",
    "파이프라인 3가지: 데모 릴(10분), AI 아바타 튜토리얼(15분), 생성형 B롤(20분).",
    "릴스로 교차 게시하기 전에 틱톡 워터마크를 제거하세요.",
  ],
  "marketing-on-autopilot": [
    "세 가지 구성: Claude Code 예약 작업, Vercel Cron + AI SDK, 또는 직접 crontab.",
    "레시피 3가지: 월요일 콘텐츠 배치, 금요일 리뷰 요약, 매일 경쟁사 시그널.",
    "MCP를 쓰면 Claude가 어느 세션에서든 스케줄러 API에 직접 접근합니다.",
    "기본값은 'queued'가 아니라 'draft'. 사람 눈을 거치지 않고 자동 게시하지 마세요.",
  ],
  "design-automation": [
    "네 가지 경로: Vercel OG(코드), Figma(템플릿), AI 이미지, 유료 SaaS.",
    "소셜 이미지는 Vercel OG(/tools/visual-builder), 앱스토어 스크린샷은 Figma.",
    "AI 이미지는 배경 + 히어로용 — 텍스트나 내 UI가 들어가는 건 안 됩니다.",
    "주당 100장 이상 만드는 게 아니라면 유료 SaaS는 건너뛰세요.",
    "브랜드 일관성 = 글꼴 1개, 강조색 1개, 일러스트 스타일 1개. 그만 바꾸세요.",
  ],
  "switch-to-creator": [
    "개인 인스타그램 계정엔 API가 없습니다. 끝. Buffer, Later, 이 앱 모두 크리에이터/비즈니스가 필요합니다.",
    "전환은 IG 앱에서 30초. 무료. 팔로워에게 안 보임. 되돌릴 수 있음.",
    "계정 유형 및 도구 → 프로페셔널 계정으로 전환 → 크리에이터.",
    "비공개 설정 기능을 잃습니다. 대신 인사이트 + DM 탭 + API 접근을 얻습니다.",
  ],
  "content-strategy": [
    "70% 교육 또는 재미. 20% 커뮤니티. 10% 직접 홍보.",
    "저장 + 공유 > 좋아요. 알고리즘은 팔로워가 친구에게 보내는 게시물을 보상합니다.",
    "예약된 다음 10개 게시물을 확인하세요. 6개 이상이 홍보면 교체하세요.",
  ],
  hashtags: [
    "30개가 아니라 3-5개. 구체적인 것(#sourdoughtoronto)이 넓은 것(#bread)을 이깁니다.",
    "캡션이든 첫 댓글이든 (이제) 상관없습니다. 깔끔한 곳에 두세요.",
    "마케팅엔 초대형 태그(100만+ 게시물)를 피하세요 — 5분이면 묻힙니다.",
    "X에서는 해시태그가 도달에 도움이 안 됩니다. 특정 검색을 노리는 게 아니면 빼세요.",
  ],
  "reels-strategy": [
    "처음 3초가 전부를 결정합니다. 결론이나 의외성을 앞세우세요.",
    "훅 → 가치 → CTA. 총 7-30초.",
    "영상에 자막 필수(시청자 80%+가 소리 끔). 세로 9:16, 워터마크 없이.",
    "한 주제로 30분 앉아 릴 4개를 찍으세요. 8일에 걸쳐 예약하세요.",
  ],
  "dm-funnels": [
    "인스타그램 API는 사용자가 연락한 뒤 24시간 안으로만 DM 자동 응답을 허용합니다.",
    "이 앱은 DM 자동화를 일부러 만들지 않습니다 — 상시 가동 웹훅 호스팅이 필요하기 때문.",
    "원한다면 ManyChat이나 Customers.ai를 쓰세요. 동급 최고입니다.",
    "IG 앱의 수동 빠른 답장은 무료이고 의외로 효과적입니다.",
  ],
  "cadence-and-timing": [
    "꾸준함이 '최적 시간' 차트를 이깁니다. 매주 3개 영원히 > 1주차 7개 + 이후 0개.",
    "내 인사이트를 써서 내 청중의 실제 피크 시간을 찾으세요.",
    "게시 후 첫 1시간에 소통하세요. 알고리즘은 첫 1시간 반응을 봅니다.",
    "X에서는 답글 > 게시물. 원글만큼 답글을 다는 걸 목표로.",
  ],
  "twitter-marketing": [
    "X는 참여 밀도를 보상합니다. 사려 깊은 답글 하나가 내 게시물 20개를 이깁니다.",
    "틈새 계정 20곳을 고르세요. 일찍(게시 후 30분 내) 답글을 다세요.",
    "단문 70% / 스레드 20% / 이미지 10%. 답글에서 홍보하지 마세요.",
    "북마크는 X의 가장 강력한 긍정 신호 — 좋아요보다 강합니다.",
  ],
  analytics: [
    "팔로워 수는 허영 지표. 저장, 공유, 북마크가 진짜 신호입니다.",
    "활성화율 + 7일차 유지가 도달보다 장기 성공을 더 잘 예측합니다.",
    "주당 리드 수를 단일 대시보드로 추적하세요. 그게 매출과 연결됩니다.",
    "4단어 넘는 댓글엔 모두 답하세요. 이모지 하나는 거의 잡히지 않습니다.",
  ],
};

/**
 * Quick-read summaries for each skill — the 10-second pitch shown at top.
 */
export const SKILL_TLDR: Record<string, string> = {
  "icp-writer":
    "Run FIRST. Output is reused by every other copy skill. 80-word ICP paragraph + 5 attributes + 3 hangouts + a 7-word headline.",
  "app-store-copy":
    "Both iOS and Play Store listings, optimized for ASO. Title, subtitle, descriptions, keyword field.",
  "launch-tweet-thread":
    "Hook variants + 8-tweet thread + posting tips. 30 minutes from blank page to ready-to-post.",
  "ph-launch-kit":
    "Tagline, description, pinned maker comment, and pre-written FAQ replies. Everything you need to launch on Product Hunt.",
  "cold-outreach-email":
    "First-touch email + two follow-ups. Personalized openers, under 150 words, no Calendly link in email #1.",
  "video-script-writer":
    "Vertical-video script with hook variants, shot list, on-screen text, and target duration. Designed for solo founders.",
  "weekly-content-batch":
    "Runs every Monday on a cron. Outputs 7 days of social posts as JSON. Feed it straight into the scheduler's /api/v1/drafts.",
  "app-store-review-digest":
    "Friday cron. Synthesizes reviews into themes + action items + 5 quotable testimonials. Replaces hours of manual reading.",
  "figma-template-brief":
    "A precise spec a freelancer can quote in minutes and finish in one Figma session. App Store screenshots, ads, landing heroes.",
  "social-image-spec":
    "A spec concrete enough that a developer implements a Next.js `next/og` image template in 30 minutes.",
};

/** Korean translations of the skill TL;DRs. */
export const SKILL_TLDR_KO: Record<string, string> = {
  "icp-writer":
    "가장 먼저 실행하세요. 출력은 다른 모든 카피 스킬에 재사용됩니다. 80단어 ICP 문단 + 속성 5개 + 활동 공간 3곳 + 7단어 헤드라인.",
  "app-store-copy":
    "iOS와 플레이스토어 등록 정보를 ASO에 맞춰 작성. 제목, 부제목, 설명, 키워드 필드.",
  "launch-tweet-thread":
    "훅 변형 + 8개 트윗 스레드 + 게시 팁. 빈 화면에서 바로 게시 가능까지 30분.",
  "ph-launch-kit":
    "태그라인, 설명, 고정 메이커 댓글, 미리 작성된 FAQ 답변. Product Hunt 출시에 필요한 전부.",
  "cold-outreach-email":
    "첫 접촉 이메일 + 후속 2건. 개인화된 도입부, 150단어 이내, 첫 메일엔 캘린들리 링크 없음.",
  "video-script-writer":
    "세로형 영상 대본: 훅 변형, 샷 리스트, 화면 텍스트, 목표 길이. 1인 창업자용.",
  "weekly-content-batch":
    "매주 월요일 크론으로 실행. 7일치 소셜 게시물을 JSON으로 출력. 스케줄러의 /api/v1/drafts에 바로 투입.",
  "app-store-review-digest":
    "금요일 크론. 리뷰를 테마 + 액션 아이템 + 인용할 만한 후기 5개로 종합. 수동으로 읽는 몇 시간을 대체합니다.",
  "figma-template-brief":
    "프리랜서가 몇 분 만에 견적 내고 한 번의 Figma 세션으로 끝낼 수 있는 정밀 명세. 앱스토어 스크린샷, 광고, 랜딩 히어로.",
  "social-image-spec":
    "개발자가 30분 안에 Next.js `next/og` 이미지 템플릿을 구현할 만큼 구체적인 명세.",
};

export function guideTldr(slug: string, locale: string): string[] | undefined {
  if (locale === "ko" && GUIDE_TLDR_KO[slug]) return GUIDE_TLDR_KO[slug];
  return GUIDE_TLDR[slug];
}

export function skillTldr(slug: string, locale: string): string | undefined {
  if (locale === "ko" && SKILL_TLDR_KO[slug]) return SKILL_TLDR_KO[slug];
  return SKILL_TLDR[slug];
}
