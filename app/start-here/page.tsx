import Link from "next/link";
import { ArrowRight, ArrowLeft, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDict, getLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

const GLOSSARY: { term: string; full: string; fullKo: string; def: string; defKo: string }[] = [
  {
    term: "PMF",
    full: "Product-Market Fit",
    fullKo: "제품-시장 적합성",
    def: "The point where your product satisfies real demand. Practically: your users would be very disappointed if your product disappeared. Don't scale marketing before you have it.",
    defKo: "제품이 실제 수요를 충족하는 지점. 실질적으로는: 제품이 사라지면 사용자가 크게 아쉬워하는 상태. 이게 없는데 마케팅부터 키우지 마세요.",
  },
  {
    term: "MVP",
    full: "Minimum Viable Product",
    fullKo: "최소 기능 제품",
    def: "The smallest version of your product that solves the core problem for one user. Ship it sooner than you think.",
    defKo: "한 명의 사용자에게 핵심 문제를 해결해 주는 가장 작은 버전. 생각보다 빨리 내보내세요.",
  },
  {
    term: "ICP",
    full: "Ideal Customer Profile",
    fullKo: "이상적 고객 프로필",
    def: "A specific description of the user you'd most want. \"Indie iOS devs in the US, 25–40, ship side projects\" beats \"developers.\"",
    defKo: "가장 원하는 사용자에 대한 구체적 묘사. \"개발자\"보다 \"미국의 25–40세 사이드 프로젝트를 출시하는 인디 iOS 개발자\"가 낫습니다.",
  },
  {
    term: "GTM",
    full: "Go-To-Market",
    fullKo: "시장 진입 전략",
    def: "Your launch and distribution plan. \"GTM strategy\" = how the right people will find and try your product.",
    defKo: "출시 및 유통 계획. \"GTM 전략\" = 맞는 사람들이 제품을 어떻게 발견하고 써 보게 할 것인가.",
  },
  {
    term: "AARRR",
    full: "Acquisition / Activation / Retention / Revenue / Referral",
    fullKo: "획득 / 활성화 / 유지 / 매출 / 추천",
    def: "Dave McClure's funnel. Diagnose where you're leaking users by measuring each stage.",
    defKo: "데이브 맥클루어의 퍼널. 각 단계를 측정해 어디서 사용자가 새는지 진단합니다.",
  },
  {
    term: "NSM",
    full: "North-Star Metric",
    fullKo: "북극성 지표",
    def: "The single number that best represents value delivered. Examples: weekly active conversations (Slack), nights booked (Airbnb).",
    defKo: "전달된 가치를 가장 잘 대표하는 단 하나의 숫자. 예: 주간 활성 대화(슬랙), 예약된 숙박 수(에어비앤비).",
  },
  {
    term: "CAC",
    full: "Customer Acquisition Cost",
    fullKo: "고객 획득 비용",
    def: "How much it costs (ads + content + tools) to get one paying customer. CAC < LTV is the basic survival math.",
    defKo: "유료 고객 한 명을 얻는 데 드는 비용(광고+콘텐츠+도구). CAC < LTV가 기본 생존 공식입니다.",
  },
  {
    term: "LTV",
    full: "Lifetime Value",
    fullKo: "고객 생애 가치",
    def: "Total revenue from a customer before they churn. LTV / CAC > 3 is the rough healthy ratio for SaaS.",
    defKo: "이탈하기 전까지 한 고객에게서 나오는 총매출. SaaS에서는 LTV / CAC > 3이 대략 건강한 비율입니다.",
  },
  {
    term: "Churn",
    full: "Churn rate",
    fullKo: "이탈률",
    def: "% of users who leave per period. 5% monthly = you replace your whole user base every ~20 months. Mobile churn is usually worse — measure it.",
    defKo: "기간당 떠나는 사용자 비율. 월 5% = 약 20개월마다 전체 사용자가 교체됨. 모바일 이탈률은 보통 더 나쁩니다 — 꼭 측정하세요.",
  },
  {
    term: "Activation",
    full: "Activation",
    fullKo: "활성화",
    def: "The user reaching the moment where they feel value for the first time. Define yours precisely — e.g., \"first photo edit completed.\"",
    defKo: "사용자가 처음으로 가치를 느끼는 순간에 도달하는 것. 자신만의 기준을 명확히 정의하세요 — 예: \"첫 사진 편집 완료\".",
  },
  {
    term: "ASO",
    full: "App Store Optimization",
    fullKo: "앱스토어 최적화",
    def: "Optimizing your App Store / Play Store listing (keywords, screenshots, video, ratings) so people who search find you and tap install.",
    defKo: "검색한 사람들이 발견해 설치를 누르도록 앱스토어 / 플레이스토어 등록 정보(키워드, 스크린샷, 영상, 평점)를 최적화하는 것.",
  },
  {
    term: "MoM",
    full: "Month-over-Month growth",
    fullKo: "전월 대비 성장률",
    def: "(This month − last month) / last month. 10–20% MoM compounds dramatically. <5% MoM and you're stalling.",
    defKo: "(이번 달 − 지난달) / 지난달. 월 10–20%는 극적으로 복리됩니다. 월 5% 미만이면 정체 중인 겁니다.",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Read the launch playbook",
    titleKo: "출시 플레이북 읽기",
    body: "Open /guides/promote-mobile-app — 5 phases, ~20 minutes to read. It's the spine for everything that follows.",
    bodyKo: "/guides/promote-mobile-app 를 여세요 — 5단계, 약 20분 분량. 이후 모든 것의 척추가 됩니다.",
    href: "/guides/promote-mobile-app",
    hrefLabel: "Open the playbook",
    hrefLabelKo: "플레이북 열기",
  },
  {
    n: 2,
    title: "Write your ICP and copy",
    titleKo: "ICP와 카피 작성하기",
    body: "Use the AI Skills page. Run icp-writer first (so you know who you're talking to), then app-store-copy, ph-launch-kit, launch-tweet-thread, cold-outreach-email.",
    bodyKo: "AI 스킬 페이지를 쓰세요. icp-writer를 먼저 실행한 뒤(대상이 누구인지 알도록), app-store-copy, ph-launch-kit, launch-tweet-thread, cold-outreach-email 순으로.",
    href: "/skills",
    hrefLabel: "Browse skills",
    hrefLabelKo: "스킬 둘러보기",
  },
  {
    n: 3,
    title: "Set up the scheduler",
    titleKo: "스케줄러 설정하기",
    body: "Connect your IG (Creator/Business) and X accounts. Doesn't matter if you only post twice a week — consistency is the win.",
    bodyKo: "인스타그램(크리에이터/비즈니스)과 X 계정을 연결하세요. 주 2회만 올려도 괜찮습니다 — 꾸준함이 이깁니다.",
    href: "/tools/scheduler",
    hrefLabel: "Open scheduler",
    hrefLabelKo: "스케줄러 열기",
  },
  {
    n: 4,
    title: "Launch",
    titleKo: "출시하기",
    body: "Pick a date 2–4 weeks out. Use the playbook's launch-day checklist. Don't wait for \"perfect.\" Perfect kills more launches than bugs do.",
    bodyKo: "2–4주 뒤 날짜를 정하세요. 플레이북의 출시일 체크리스트를 쓰세요. \"완벽\"을 기다리지 마세요. 완벽은 버그보다 더 많은 출시를 죽입니다.",
    href: "/guides/promote-mobile-app",
    hrefLabel: "Launch-day checklist",
    hrefLabelKo: "출시일 체크리스트",
  },
  {
    n: 5,
    title: "Measure and adjust",
    titleKo: "측정하고 조정하기",
    body: "Pick your North-Star Metric (see glossary). Track it weekly. Read /guides/analytics for what actually matters vs. vanity metrics.",
    bodyKo: "북극성 지표를 정하세요(용어집 참고). 매주 추적하세요. 허영 지표 대신 진짜 중요한 것은 /guides/analytics 에서 읽으세요.",
    href: "/guides/analytics",
    hrefLabel: "Read the analytics guide",
    hrefLabelKo: "분석 가이드 읽기",
  },
];

export default async function StartHere() {
  const t = await getDict();
  const locale = await getLocale();
  const ko = locale === "ko";
  const p = t.pages.startHere;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12 space-y-10">
      <Button variant="ghost" size="sm" className="-ml-3" asChild>
        <Link href="/"><ArrowLeft className="h-4 w-4" /> {t.common.home}</Link>
      </Button>

      <header className="space-y-3">
        <Badge variant="secondary">{p.badge}</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h1>
        <p className="text-lg text-muted-foreground">{p.intro}</p>
      </header>

      <Alert variant="info">
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>{p.tldrTitle}</AlertTitle>
        <AlertDescription>
          <ul className="ml-1 mt-1 list-disc space-y-1 pl-5">
            <li>{p.tldr1}</li>
            <li>{p.tldr2}</li>
            <li>{p.tldr3}</li>
          </ul>
        </AlertDescription>
      </Alert>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{p.glossaryTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{p.glossarySub}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {GLOSSARY.map((g) => (
            <Card key={g.term} className="border-border/60">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">{g.term}</Badge>
                  <span className="text-xs text-muted-foreground">{ko ? g.fullKo : g.full}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm leading-relaxed">{ko ? g.defKo : g.def}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{p.roadmapTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{p.roadmapSub}</p>
        </div>
        <ol className="space-y-3">
          {STEPS.map((s) => (
            <li key={s.n}>
              <Card>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {s.n}
                  </div>
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-base">{ko ? s.titleKo : s.title}</CardTitle>
                    <CardDescription>{ko ? s.bodyKo : s.body}</CardDescription>
                    <Button variant="link" className="-ml-4 mt-1 h-8" asChild>
                      <Link href={s.href}>
                        {ko ? s.hrefLabelKo : s.hrefLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <Alert variant="warning">
        <AlertTitle>{p.ruleTitle}</AlertTitle>
        <AlertDescription>{p.ruleBody}</AlertDescription>
      </Alert>
    </div>
  );
}
