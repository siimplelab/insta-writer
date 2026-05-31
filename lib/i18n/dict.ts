export const LOCALES = ["en", "ko"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const dict = {
  en: {
    appTitle: "siimply",
    appTagline:
      "Simply-effective marketing for indie founders. Just what works — AI skills, focused guides, and one-tool-per-job software you can drop into Claude Code or Codex.",

    // Top-level hub navigation
    hub: {
      startHere: "Start here",
      startHereDesc: "Total beginner? Glossary + 5-step roadmap.",
      guides: "Guides",
      guidesDesc: "Long-form walkthroughs of the marketing playbook.",
      skills: "AI Skills",
      skillsDesc: "Drop-in prompts for Claude Code & Codex.",
      tools: "Tools",
      toolsDesc: "Working tools you can run today.",
      resources: "Resources",
      resourcesDesc: "Curated books, communities, SaaS.",
      settings: "Settings",
      settingsDesc: "Language + extension API key.",
    },

    // Generic
    toolsBackToIndex: "All tools",
    skillsBackToIndex: "All skills",
    guidesBackToIndex: "All guides",
    readingMinutes: "min read",
    copy: "Copy",
    copied: "Copied",
    download: "Download .md",

    // Scheduler tool (was: the whole app)
    scheduler: {
      title: "Multi-platform Scheduler",
      tagline:
        "Schedule posts to your own Instagram (Creator/Business) and X accounts via official APIs. AI-assisted captions. Browser-extension capture.",
      indexBlurb:
        "Working scheduler for IG and X. Local-first, runs from your machine.",
    },
    pageCapture: {
      title: "Page Capture (Chrome Extension)",
      tagline:
        "Capture images and text from any webpage into a draft post in the Scheduler.",
    },

    // Existing scheduler strings (legacy keys kept so moved pages still work)
    connectedAccounts: "Connected accounts",
    connectButton: "Connect Instagram",
    onboardingHint:
      "Have a regular Instagram account? You'll need to switch to a Creator profile first — it takes 30 seconds, is invisible to your followers, and is reversible.",
    onboardingCta: "Read the 30-second guide →",
    guidesNav: "Guides",
    guidesTagline: "Marketing playbook",
    tokenExpires: "token expires",
    nav: {
      compose: "Compose",
      calendar: "Calendar",
      analytics: "Analytics",
      settings: "Settings",
    },
    recentPosts: "Recent posts",
    noPosts: "No posts yet.",
    cols: {
      when: "When",
      kind: "Kind",
      caption: "Caption",
      status: "Status",
      day: "Day",
      reach: "Reach",
      impressions: "Impressions",
      profileViews: "Profile views",
      followers: "Followers",
    },
    compose: {
      title: "Compose",
      connectFirst: "Connect an Instagram account first from the scheduler home.",
      account: "Account",
      kind: "Kind",
      photo: "Photo",
      carousel: "Carousel",
      reel: "Reel",
      story: "Story",
      media: "Media",
      caption: "Caption",
      aiSuggest: "AI suggest",
      firstComment: "First comment (optional, for hashtags)",
      scheduledFor: "Scheduled for (local)",
      schedule: "Schedule",
      scheduled: "Scheduled",
      uploadFirst: "Upload an image first",
      uploadAtLeastOne: "Upload at least one media",
      noCaptionReturned: "No caption returned",
    },
    calendar: {
      title: "Calendar",
      empty: "Nothing scheduled.",
      delete: "Delete",
      deleted: "Deleted",
      confirmDelete: "Delete this scheduled item?",
    },
    analytics: {
      title: "Analytics",
      empty: "No insights yet — run the insights cron after you connect.",
    },
    settings: {
      title: "Settings",
      language: "Language",
      english: "English",
      korean: "한국어 (Korean)",
      save: "Save",
      saved: "Saved — refresh to see changes.",
      extensionTitle: "Chrome extension",
      extensionDesc:
        "Install the companion Chrome extension to capture page content into draft posts. It authenticates against this app using an API key.",
      apiKeyConfigured: "API key is configured.",
      apiKeyMissing:
        "APP_API_KEY env var is NOT set. Generate with `openssl rand -hex 32` and add it to your .env.local.",
      extensionInstall: "Install the extension",
    },
    dbError: "Could not reach the database. Restart the dev server to auto-create it.",

    common: {
      home: "Home",
      open: "Open",
      minRead: "min read",
    },

    pages: {
      home: {
        badge: "For indie founders launching a new digital product",
        beginnerTag: "Beginner",
        ctaStart: "Start here",
        ctaPlaybook: "Read the launch playbook",
        flagshipBadge: "New flagship guide",
        flagshipTitle: "How to promote a new mobile app",
        flagshipDesc:
          "5 phases from idea to first 1,000 users. No hype, no “growth hacks” — just the steps that actually compound.",
        flagshipCta: "Read the playbook",
        toolBadge: "Working tool",
        toolTitle: "Visual Builder",
        toolDesc: "Code-driven social-image generator. No design app needed.",
      },
      startHere: {
        badge: "Orientation · 10 min",
        title: "Start here",
        intro:
          "You don't need to know marketing to ship a product that gets used. You need a vocabulary, a roadmap, and the discipline to send things. This page is the 10-minute version.",
        tldrTitle: "TL;DR",
        tldr1: "Learn the 12 terms below — you'll see them everywhere.",
        tldr2: "Then walk the 5 steps in order. Each one feeds the next.",
        tldr3:
          "You will get more from posting consistently for 6 weeks than from reading any one guide for 6 hours.",
        glossaryTitle: "Glossary — 12 terms to know",
        glossarySub: "Skim now, refer back later.",
        roadmapTitle: "5-step roadmap",
        roadmapSub: "Do these in order. Don't skip — each one feeds the next.",
        ruleTitle: "One honest rule of thumb",
        ruleBody:
          "You will get more from posting consistently for 6 weeks than from reading any one guide for 6 hours. Skim, ship, measure, repeat.",
      },
      guidesIndex: {
        badgeSuffix: "guides",
        title: "Marketing Guides",
        intro:
          "Practical guides for indie founders. What actually works in 2026 — not generic checklists.",
        flagship: "Flagship",
      },
      guideDetail: {
        badge: "Guide",
        backAll: "All guides",
        tldrTitle: "TL;DR — the 30-second version",
        footer:
          "Was this useful? Head back to all guides or try one of the AI skills to put it into practice.",
        footerGuides: "all guides",
        footerSkills: "AI skills",
        bodyEnNote: "The full guide below is in English. A Korean translation is coming.",
      },
      skillsIndex: {
        badgeSuffix: "skills",
        intro:
          "Drop-in prompts for Claude Code and Codex. Each one is a Markdown file with YAML frontmatter — install instructions on each detail page.",
        catCopy: "Copy",
        catCopyDesc: "Run once when you need the output. Fill in the inputs, paste the result.",
        catCron: "Cron-friendly",
        catCronDesc:
          "Designed for a schedule (Claude Code scheduled tasks, Vercel Cron, or your own crontab). Structured output downstream tools can ingest.",
        catDesign: "Design briefs",
        catDesignDesc:
          "Generate precise specs for Figma templates or code-driven visual-builder images.",
        calloutTitle: "New to Claude Code skills?",
        calloutBody:
          "See the Marketing on Autopilot guide — it explains how to install skills, schedule them with cron, and wire them into the scheduler.",
      },
      skillDetail: {
        backAll: "All skills",
        oneShot: "One-shot",
        cronFriendly: "Cron-friendly",
        designBrief: "Design brief",
        tldrTitle: "What it does, in 10 seconds",
        inputs: "Inputs you provide",
        outputs: "What you get back",
        sourceTitle: "Skill source",
        installTitle: "Install",
        missing: "Skill file is missing from public/skills/.",
      },
      resources: {
        badge: "Curated",
        intro:
          "Hand-picked. Each entry has a one-line reason it's on this list. No affiliate links, no SEO filler.",
        tldrTitle: "TL;DR — if you only read 3 things",
      },
      tools: {
        badgeSuffix: "tools",
        intro:
          "Working tools you can run today. Each one is local-first and uses official APIs of the platform it touches.",
        schedulerBadge: "Stateful",
        visualBadge: "Stateless",
        extensionBadge: "Chrome extension",
        catalogBadge: "Catalog",
        visualTitle: "Visual Builder",
        visualDesc:
          "Generate branded social images (OG / Instagram / Story) from templates. No design app required.",
        imageGenTitle: "AI image generators",
        imageGenDesc:
          "Catalog of widely-used image-gen services (Midjourney, ChatGPT, Gemini, Flux, Ideogram, Recraft, and more) with honest one-line assessments.",
      },
      imageGen: {
        badge: "Catalog · 16 services",
        title: "AI image generators",
        intro:
          "Widely-used image-generation services in 2026, with one-line honest assessments. Each entry links out to the service. None of these run locally in this app — for templates with text overlays, use our Visual Builder instead.",
        pick3Title: "The indie-founder stack — if you only pick 3",
        avoidTitle: "What to NOT use AI imagery for",
        briefTitle: "Need to brief these tools systematically?",
        briefBody:
          "The social-image-spec skill writes a spec a developer can implement in Vercel OG. The figma-template-brief skill writes a spec for a Figma designer. Use these to drive image production at any scale.",
        bestForLabel: "Best for",
      },
      pageCapture: {
        badge: "Chrome extension",
        whatTitle: "What it does",
        installTitle: "Install",
        apiKeyTitle: "You'll need an API key",
      },
    },
  },
  ko: {
    appTitle: "siimply",
    appTagline:
      "1인 창업자를 위한 심플하고 효과적인 마케팅. 꼭 필요한 것만 — AI 스킬, 핵심 가이드, 그리고 Claude Code · Codex에 바로 붙여 쓰는 한 가지 일에 충실한 도구들.",

    hub: {
      startHere: "시작하기",
      startHereDesc: "처음이세요? 용어집과 5단계 로드맵.",
      guides: "가이드",
      guidesDesc: "마케팅 플레이북 장문 가이드.",
      skills: "AI 스킬",
      skillsDesc: "Claude Code · Codex 용 즉시 사용 가능한 프롬프트.",
      tools: "도구",
      toolsDesc: "오늘 바로 쓸 수 있는 도구.",
      resources: "자료",
      resourcesDesc: "엄선된 책, 커뮤니티, 서비스.",
      settings: "설정",
      settingsDesc: "언어 및 확장 프로그램 API 키.",
    },

    toolsBackToIndex: "도구 목록",
    skillsBackToIndex: "스킬 목록",
    guidesBackToIndex: "가이드 목록",
    readingMinutes: "분",
    copy: "복사",
    copied: "복사됨",
    download: ".md 다운로드",

    scheduler: {
      title: "멀티 플랫폼 스케줄러",
      tagline:
        "공식 API로 내 인스타그램(크리에이터·비즈니스)과 X 계정에 게시물을 예약합니다. AI 캡션 보조. 브라우저 확장으로 콘텐츠 캡처.",
      indexBlurb: "IG와 X를 위한 동작하는 스케줄러. 로컬 우선, 내 기기에서 실행됩니다.",
    },
    pageCapture: {
      title: "페이지 캡처 (크롬 확장)",
      tagline: "웹페이지의 이미지와 텍스트를 스케줄러의 초안 게시물로 캡처합니다.",
    },

    connectedAccounts: "연결된 계정",
    connectButton: "Instagram 연결",
    onboardingHint:
      "일반 인스타그램 계정을 쓰고 계신가요? 먼저 크리에이터 프로필로 전환해야 합니다 — 30초면 끝나고, 팔로워에게는 보이지 않으며, 언제든 되돌릴 수 있습니다.",
    onboardingCta: "30초 가이드 읽기 →",
    guidesNav: "가이드",
    guidesTagline: "마케팅 플레이북",
    tokenExpires: "토큰 만료일",
    nav: {
      compose: "작성",
      calendar: "캘린더",
      analytics: "분석",
      settings: "설정",
    },
    recentPosts: "최근 게시물",
    noPosts: "아직 게시물이 없습니다.",
    cols: {
      when: "예약 시각",
      kind: "유형",
      caption: "캡션",
      status: "상태",
      day: "날짜",
      reach: "도달",
      impressions: "노출",
      profileViews: "프로필 방문",
      followers: "팔로워",
    },
    compose: {
      title: "게시물 작성",
      connectFirst: "먼저 스케줄러에서 인스타그램 계정을 연결하세요.",
      account: "계정",
      kind: "유형",
      photo: "사진",
      carousel: "캐러셀",
      reel: "릴스",
      story: "스토리",
      media: "미디어",
      caption: "캡션",
      aiSuggest: "AI 추천",
      firstComment: "첫 댓글 (선택, 해시태그용)",
      scheduledFor: "예약 시각 (로컬)",
      schedule: "예약",
      scheduled: "예약되었습니다",
      uploadFirst: "먼저 이미지를 업로드하세요",
      uploadAtLeastOne: "최소 한 개 이상의 미디어를 업로드하세요",
      noCaptionReturned: "캡션을 받지 못했습니다",
    },
    calendar: {
      title: "캘린더",
      empty: "예약된 게시물이 없습니다.",
      delete: "삭제",
      deleted: "삭제되었습니다",
      confirmDelete: "이 예약 항목을 삭제할까요?",
    },
    analytics: {
      title: "분석",
      empty: "아직 인사이트가 없습니다 — 연결 후 인사이트 크론을 실행하세요.",
    },
    settings: {
      title: "설정",
      language: "언어",
      english: "English",
      korean: "한국어",
      save: "저장",
      saved: "저장되었습니다 — 새로고침하면 적용됩니다.",
      extensionTitle: "크롬 확장 프로그램",
      extensionDesc:
        "동반 크롬 확장 프로그램을 설치하면 웹페이지에서 콘텐츠를 가져와 초안 게시물로 저장할 수 있습니다. API 키로 인증합니다.",
      apiKeyConfigured: "API 키가 설정되어 있습니다.",
      apiKeyMissing:
        "APP_API_KEY 환경 변수가 설정되어 있지 않습니다. `openssl rand -hex 32`로 생성한 뒤 .env.local에 추가하세요.",
      extensionInstall: "확장 프로그램 설치 방법",
    },
    dbError: "데이터베이스에 접근할 수 없습니다. 개발 서버를 재시작하면 자동으로 생성됩니다.",

    common: {
      home: "홈",
      open: "열기",
      minRead: "분 분량",
    },

    pages: {
      home: {
        badge: "새 디지털 제품을 출시하는 1인 창업자를 위해",
        beginnerTag: "초보자",
        ctaStart: "시작하기",
        ctaPlaybook: "출시 플레이북 읽기",
        flagshipBadge: "대표 가이드",
        flagshipTitle: "새 모바일 앱 홍보하는 법",
        flagshipDesc:
          "아이디어에서 첫 1,000명까지 5단계. 과장도, '그로스 해킹'도 없이 — 실제로 누적되는 단계들만.",
        flagshipCta: "플레이북 읽기",
        toolBadge: "실제 도구",
        toolTitle: "비주얼 빌더",
        toolDesc: "코드 기반 소셜 이미지 생성기. 디자인 앱이 필요 없습니다.",
      },
      startHere: {
        badge: "오리엔테이션 · 10분",
        title: "시작하기",
        intro:
          "사용되는 제품을 출시하는 데 마케팅 지식이 꼭 필요한 건 아닙니다. 필요한 건 용어, 로드맵, 그리고 꾸준히 내보내는 실행력입니다. 이 페이지는 그 10분 요약본입니다.",
        tldrTitle: "한눈에 보기",
        tldr1: "아래 12개 용어를 익히세요 — 어디서나 마주치게 됩니다.",
        tldr2: "그다음 5단계를 순서대로 밟으세요. 각 단계가 다음 단계로 이어집니다.",
        tldr3: "가이드 하나를 6시간 읽는 것보다 6주 동안 꾸준히 올리는 것이 더 많은 걸 가져다줍니다.",
        glossaryTitle: "용어집 — 꼭 알아야 할 12개",
        glossarySub: "지금은 훑어보고, 나중에 다시 참고하세요.",
        roadmapTitle: "5단계 로드맵",
        roadmapSub: "순서대로 진행하세요. 건너뛰지 마세요 — 각 단계가 다음으로 이어집니다.",
        ruleTitle: "솔직한 경험칙 하나",
        ruleBody:
          "가이드 하나를 6시간 읽는 것보다 6주 동안 꾸준히 올리는 것이 더 많은 걸 가져다줍니다. 훑고, 내보내고, 측정하고, 반복하세요.",
      },
      guidesIndex: {
        badgeSuffix: "개 가이드",
        title: "마케팅 가이드",
        intro: "1인 창업자를 위한 실전 가이드. 2026년에 실제로 통하는 것 — 일반적인 체크리스트가 아닙니다.",
        flagship: "대표",
      },
      guideDetail: {
        badge: "가이드",
        backAll: "가이드 목록",
        tldrTitle: "한눈에 보기 — 30초 요약",
        footer: "유용했나요? 가이드 목록으로 돌아가거나, AI 스킬로 바로 실행에 옮겨 보세요.",
        footerGuides: "가이드 목록",
        footerSkills: "AI 스킬",
        bodyEnNote: "아래 본문은 영어로 제공됩니다. 한국어 번역은 곧 추가됩니다.",
      },
      skillsIndex: {
        badgeSuffix: "개 스킬",
        intro:
          "Claude Code와 Codex에 바로 붙여 쓰는 프롬프트. 각각 YAML 프런트매터가 있는 Markdown 파일이며, 설치 방법은 상세 페이지에 있습니다.",
        catCopy: "카피",
        catCopyDesc: "필요할 때 한 번 실행하세요. 입력을 채우고 결과를 붙여넣습니다.",
        catCron: "크론 친화",
        catCronDesc:
          "스케줄 실행용 (Claude Code 예약 작업, Vercel Cron, 또는 직접 crontab). 하위 도구가 바로 받아 쓸 수 있는 구조화된 출력.",
        catDesign: "디자인 브리프",
        catDesignDesc: "Figma 템플릿이나 코드 기반 비주얼 빌더 이미지를 위한 정밀 명세를 생성합니다.",
        calloutTitle: "Claude Code 스킬이 처음이신가요?",
        calloutBody:
          "'마케팅 자동조종' 가이드를 보세요 — 스킬 설치, 크론 예약, 스케줄러 연동 방법을 설명합니다.",
      },
      skillDetail: {
        backAll: "스킬 목록",
        oneShot: "단발 실행",
        cronFriendly: "크론 친화",
        designBrief: "디자인 브리프",
        tldrTitle: "10초 요약: 이게 하는 일",
        inputs: "입력값",
        outputs: "결과물",
        sourceTitle: "스킬 소스",
        installTitle: "설치",
        missing: "public/skills/ 에 스킬 파일이 없습니다.",
      },
      resources: {
        badge: "엄선",
        intro:
          "직접 골랐습니다. 각 항목에는 이 목록에 있는 이유가 한 줄로 적혀 있습니다. 제휴 링크도, SEO 채우기 글도 없습니다.",
        tldrTitle: "한눈에 보기 — 딱 3개만 본다면",
      },
      tools: {
        badgeSuffix: "개 도구",
        intro:
          "오늘 바로 쓸 수 있는 도구들. 모두 로컬 우선이며 각 플랫폼의 공식 API를 사용합니다.",
        schedulerBadge: "상태 저장",
        visualBadge: "상태 없음",
        extensionBadge: "크롬 확장",
        catalogBadge: "카탈로그",
        visualTitle: "비주얼 빌더",
        visualDesc:
          "템플릿에서 브랜드 소셜 이미지(OG / 인스타그램 / 스토리)를 생성합니다. 디자인 앱이 필요 없습니다.",
        imageGenTitle: "AI 이미지 생성기",
        imageGenDesc:
          "널리 쓰이는 이미지 생성 서비스(Midjourney, ChatGPT, Gemini, Flux, Ideogram, Recraft 등) 카탈로그. 솔직한 한 줄 평가와 함께.",
      },
      imageGen: {
        badge: "카탈로그 · 16개 서비스",
        title: "AI 이미지 생성기",
        intro:
          "2026년 널리 쓰이는 이미지 생성 서비스를 솔직한 한 줄 평가와 함께 정리했습니다. 각 항목은 해당 서비스로 연결됩니다. 이 중 어느 것도 이 앱 안에서 실행되지 않습니다 — 텍스트가 들어가는 템플릿은 비주얼 빌더를 쓰세요.",
        pick3Title: "1인 창업자 스택 — 딱 3개만 고른다면",
        avoidTitle: "AI 이미지를 쓰지 말아야 할 곳",
        briefTitle: "이 도구들을 체계적으로 브리핑하고 싶다면?",
        briefBody:
          "social-image-spec 스킬은 개발자가 Vercel OG로 구현할 수 있는 명세를 작성합니다. figma-template-brief 스킬은 Figma 디자이너용 명세를 작성합니다. 어떤 규모에서든 이미지 제작을 돌리는 데 쓰세요.",
        bestForLabel: "적합한 용도",
      },
      pageCapture: {
        badge: "크롬 확장",
        whatTitle: "하는 일",
        installTitle: "설치",
        apiKeyTitle: "API 키가 필요합니다",
      },
    },
  },
};

export type Dict = (typeof dict)["en"];
