export const LOCALES = ["en", "ko"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const dict = {
  en: {
    appTitle: "miinimal",
    appTagline:
      "A minimal marketing toolkit for indie founders. Just what works — AI skills, focused guides, and one-tool-per-job software you can drop into Claude Code or Codex.",

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
  },
  ko: {
    appTitle: "miinimal",
    appTagline:
      "1인 창업자를 위한 미니멀 마케팅 키트. 꼭 필요한 것만 — AI 스킬, 핵심 가이드, 그리고 Claude Code · Codex에 바로 붙여 쓰는 한 가지 일에 충실한 도구들.",

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
  },
};

export type Dict = (typeof dict)["en"];
