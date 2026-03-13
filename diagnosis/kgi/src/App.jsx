export default function OwnerKgiDiagnosisApp() {
  const { useMemo, useState } = React;

  const palette = {
    bg: "bg-stone-50",
    panel: "bg-white",
    text: "text-stone-900",
    muted: "text-stone-600",
    soft: "text-stone-500",
    line: "border-stone-200",
    wash: "bg-stone-100",
    accent: "bg-stone-900",
    accentText: "text-white",
  };

  const types = {
    stability: {
      id: "stability",
      name: "生存・安定型",
      lead: "まず守ることを優先する、堅実な経営タイプです。",
      summary:
        "利益の見栄えよりも、資金繰り・固定費耐性・返済余力を重視する傾向があります。会社を長く健やかに続けるために、足元の現金と安全性を丁寧に整えることが、このタイプの王道です。",
      kpis: ["現預金残高", "営業CF", "損益分岐点売上", "借入返済余力"],
      trap:
        "試算表の黒字に安心して、現金の動きや返済負担の重さを見落とすと危険です。",
      next:
        "月次試算表に加えて、資金繰り表と固定費一覧を整えるところから始めると、意思決定の精度が上がります。",
      recommendation: "『現金が残る経営』の整理シートとの相性が良いタイプです。",
    },
    income: {
      id: "income",
      name: "所得最大化型",
      lead: "会社そのものより、オーナー個人の豊かさに重心があるタイプです。",
      summary:
        "役員報酬、配当、退職金などを含め、会社から個人へどう価値を移すかを考える発想に向いています。税後でいくら残るかを見ながら、個人と法人の最適配分を設計することが重要です。",
      kpis: ["税後キャッシュ", "役員報酬", "配当可能利益", "実効税率"],
      trap:
        "節税に寄りすぎると、銀行評価や将来の企業価値まで削ってしまうことがあります。",
      next:
        "会社に残すお金と個人に移すお金を、税後ベースで整理してみると、経営の解像度が一段上がります。",
      recommendation: "役員報酬・利益・内部留保の配分設計を先に見ると、かなり効きます。",
    },
    growth: {
      id: "growth",
      name: "成長・拡大型",
      lead: "守りよりも、規模拡大と成長余地に価値を置くタイプです。",
      summary:
        "売上の拡大やシェアの獲得に魅力を感じる一方で、成長の質が伴わないと苦しくなります。売上ではなく粗利、勢いではなく再現性まで見ることが鍵になります。",
      kpis: ["売上成長率", "粗利成長率", "LTV/CAC", "投資回収期間"],
      trap:
        "売上だけが伸びて粗利が増えない、採用が追いつかない、営業CFが苦しくなる。この三重苦に注意です。",
      next:
        "チャネル別粗利、顧客獲得効率、採用充足率をセットで追うと、成長の質が見えやすくなります。",
      recommendation: "マーケ投資と回収の因果を数字でつなぐ設計が向いています。",
    },
    succession: {
      id: "succession",
      name: "承継・長寿型",
      lead: "一代で終わらず、次世代へ渡せる会社を目指すタイプです。",
      summary:
        "利益だけでなく、属人性の低下や権限移譲、継続可能な組織づくりを大切にします。今の社長が抜けても会社が回る状態に、少しずつ近づけていく発想が合っています。",
      kpis: ["社長依存売上比率", "権限委譲率", "自己資本比率", "継続黒字"],
      trap:
        "社長が優秀すぎる会社は、今は強く見えても承継局面で急に脆くなることがあります。",
      next:
        "社長が関与しなくても回る業務を一つずつ増やし、幹部育成の進捗を数字で追うのが有効です。",
      recommendation: "後継者育成より先に、社長依存の棚卸しを始めると整理しやすくなります。",
    },
    exit: {
      id: "exit",
      name: "売却・資本政策型",
      lead: "会社を“高く評価される資産”として育てたいタイプです。",
      summary:
        "将来の売却や資本提携を見据え、収益力だけでなく再現性や管理体制の整備も重視します。利益の水準に加えて、買い手が安心できる企業のかたちを整えることが重要です。",
      kpis: ["EBITDA", "継続売上比率", "顧客集中度", "月次決算早期化"],
      trap:
        "利益だけを磨いても、属人性や管理の粗さが残ると評価は伸びません。",
      next:
        "正常収益力を説明できる状態と、デューデリに耐える管理体制づくりを先に進めるのが王道です。",
      recommendation: "“社長を買う案件”ではなく“仕組みを買う案件”に近づける意識が重要です。",
    },
  };

  const questions = [
    {
      id: 1,
      text: "3年後に一番うれしい状態はどれですか。",
      options: [
        { label: "資金繰りの不安なく、安定して黒字で回っている", scores: { stability: 3, succession: 1 } },
        { label: "自分や家族の生活が、今より明らかに豊かになっている", scores: { income: 3, stability: 1 } },
        { label: "売上や拠点数が大きく伸び、事業の規模が一段上がっている", scores: { growth: 3, exit: 1 } },
        { label: "次世代や幹部に引き継げる体制が整っている", scores: { succession: 3, stability: 1 } },
        { label: "いつでも売却や資本提携を選べる状態になっている", scores: { exit: 3, growth: 1 } },
      ],
    },
    {
      id: 2,
      text: "いま最も怖いものは何ですか。",
      options: [
        { label: "資金ショート", scores: { stability: 3 } },
        { label: "税負担や手取りの少なさ", scores: { income: 3 } },
        { label: "成長の頭打ち", scores: { growth: 3 } },
        { label: "後継者不足や属人化", scores: { succession: 3, exit: 1 } },
        { label: "会社の価値が低く見積もられること", scores: { exit: 3, growth: 1 } },
      ],
    },
    {
      id: 3,
      text: "経営判断で最も重視するものは何ですか。",
      options: [
        { label: "現金が残るか", scores: { stability: 3 } },
        { label: "自分の可処分所得が増えるか", scores: { income: 3 } },
        { label: "売上やシェアが伸びるか", scores: { growth: 3 } },
        { label: "長く続く組織になるか", scores: { succession: 3 } },
        { label: "将来高く評価される会社になるか", scores: { exit: 3 } },
      ],
    },
    {
      id: 4,
      text: "毎月、つい見てしまう数字はどれに近いですか。",
      options: [
        { label: "預金残高", scores: { stability: 3 } },
        { label: "税引後の手残り", scores: { income: 3 } },
        { label: "売上・粗利・新規顧客数", scores: { growth: 3 } },
        { label: "離職率や幹部育成の進み具合", scores: { succession: 3 } },
        { label: "EBITDAや継続売上比率", scores: { exit: 3 } },
      ],
    },
    {
      id: 5,
      text: "社長であるあなたが1か月抜けたら、最も近いのはどれですか。",
      options: [
        { label: "かなり危ない", scores: { stability: 2, succession: 1 } },
        { label: "利益や資金の管理だけは気になる", scores: { income: 2, stability: 1 } },
        { label: "成長スピードが鈍る", scores: { growth: 3 } },
        { label: "それをなくしたいと思っている", scores: { succession: 3 } },
        { label: "それでも回る会社にしたい", scores: { exit: 2, succession: 1 } },
      ],
    },
    {
      id: 6,
      text: "利益が増えたとき、最も魅力的な使い道は何ですか。",
      options: [
        { label: "内部留保として貯める", scores: { stability: 3 } },
        { label: "役員報酬や配当で受け取る", scores: { income: 3 } },
        { label: "採用や広告に再投資する", scores: { growth: 3 } },
        { label: "組織整備や後継者育成に使う", scores: { succession: 3 } },
        { label: "企業価値を高める仕組み整備に使う", scores: { exit: 3 } },
      ],
    },
    {
      id: 7,
      text: "理想の会社像に最も近いものを選んでください。",
      options: [
        { label: "潰れない強い会社", scores: { stability: 3 } },
        { label: "オーナーに豊かさをもたらす会社", scores: { income: 3 } },
        { label: "成長し続ける会社", scores: { growth: 3 } },
        { label: "100年続く会社", scores: { succession: 3 } },
        { label: "高く評価される資産としての会社", scores: { exit: 3 } },
      ],
    },
    {
      id: 8,
      text: "銀行との関係について、最も近い考えはどれですか。",
      options: [
        { label: "借入余力は生命線だと思う", scores: { stability: 3 } },
        { label: "必要最低限でよい", scores: { income: 2 } },
        { label: "成長投資のために活用したい", scores: { growth: 3 } },
        { label: "安定承継のために信頼を維持したい", scores: { succession: 3 } },
        { label: "売却時評価のために綺麗にしておきたい", scores: { exit: 3 } },
      ],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const totalAnswered = Object.keys(answers).length;
  const progress = Math.round((totalAnswered / questions.length) * 100);

  const result = useMemo(() => {
    const totals = {
      stability: 0,
      income: 0,
      growth: 0,
      succession: 0,
      exit: 0,
    };

    Object.values(answers).forEach((scores) => {
      Object.entries(scores).forEach(([key, value]) => {
        totals[key] += value;
      });
    });

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const [topKey, topScore] = sorted[0];
    const [secondKey, secondScore] = sorted[1];
    const isHybrid = secondScore > 0 && topScore - secondScore <= 2;

    return {
      totals,
      top: types[topKey],
      second: types[secondKey],
      isHybrid,
    };
  }, [answers]);

  const selectOption = (qId, scores) => {
    setAnswers((prev) => ({ ...prev, [qId]: scores }));
  };

  const restart = () => {
    setAnswers({});
    setStarted(false);
    setShowResult(false);
  };

  const complete = totalAnswered === questions.length;

  return (
    <div className={`min-h-screen ${palette.bg} ${palette.text}`}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_10px_30px_rgba(28,25,23,0.04)]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 sm:p-10">
              <p className="text-xs font-semibold tracking-[0.22em] text-stone-500 uppercase">TSUKUMO ADVISORY STYLE</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-[42px] sm:leading-[1.15]">
                あなたの会社は、<br className="hidden sm:block" />何をKGIにすべきか。
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-stone-600 sm:text-base">
                8つの質問から、オーナー経営者としての重心を5つの型に整理します。
                目的は、性格を当てることではなく、追うべき数字を静かに見定めることです。
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-600">
                <span className="rounded-full border border-stone-200 px-4 py-2">所要時間 2〜3分</span>
                <span className="rounded-full border border-stone-200 px-4 py-2">全8問</span>
                <span className="rounded-full border border-stone-200 px-4 py-2">結果はその場で表示</span>
              </div>
            </div>
            <div className="border-t border-stone-200 bg-stone-900 p-7 text-white lg:border-l lg:border-t-0 sm:p-10">
              <p className="text-sm leading-7 text-stone-300">
                利益が出ていても、現金が残るとは限りません。
                成長していても、会社の価値が高まっているとは限りません。
              </p>
              <p className="mt-5 text-sm leading-7 text-stone-300">
                この診断は、経営の“正解”を決めつけるものではなく、
                いまの貴社がどの目的関数に近いのかを整理するための、小さな入口です。
              </p>
              {!started && (
                <button
                  onClick={() => setStarted(true)}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:opacity-90"
                >
                  診断をはじめる
                </button>
              )}
            </div>
          </div>
        </header>

        {!started ? (
          <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-[0_10px_30px_rgba(28,25,23,0.04)] sm:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-500">5 TYPES</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">5つの経営タイプ</h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  どれが優れているという話ではありません。何を優先しているかによって、整えるべきKPIは変わります。
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.values(types).map((type) => (
                  <div key={type.id} className="rounded-2xl border border-stone-200 p-5">
                    <h3 className="text-lg font-semibold">{type.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{type.lead}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-[0_10px_30px_rgba(28,25,23,0.04)] sm:p-8">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-500">FOR WHOM</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">こんな方に向いています</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-stone-600">
                <p>・売上や利益は見ているが、何を最終目標に置くべきかが曖昧な方</p>
                <p>・経営会議のたびに、見る数字が変わってしまう方</p>
                <p>・オーナーの本音と、会社のKPI設計がずれている気がする方</p>
              </div>
              <div className="mt-8 rounded-2xl bg-stone-50 p-5">
                <p className="text-sm leading-7 text-stone-700">
                  派手な診断ではありませんが、あとで効いてくるタイプのやつです。
                  経営の沼は静かに深いので、まず足場から整えます。
                </p>
              </div>
            </div>
          </section>
        ) : !showResult ? (
          <section className="grid gap-6 lg:grid-cols-[1.28fr_0.72fr]">
            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_rgba(28,25,23,0.04)] sm:p-8">
              <div className="mb-8 rounded-2xl bg-stone-50 p-5">
                <div className="mb-2 flex items-center justify-between text-sm text-stone-500">
                  <span>進捗</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-stone-200">
                  <div className="h-full rounded-full bg-stone-900 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div key={q.id} className="rounded-[24px] border border-stone-200 p-5 sm:p-6">
                    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500">Question {index + 1}</p>
                    <h3 className="mt-2 text-xl font-semibold leading-8">{q.text}</h3>
                    <div className="mt-5 grid gap-3">
                      {q.options.map((option, idx) => {
                        const active = answers[q.id] === option.scores;
                        return (
                          <button
                            key={idx}
                            onClick={() => selectOption(q.id, option.scores)}
                            className={`rounded-2xl border px-4 py-4 text-left text-sm leading-6 transition ${
                              active
                                ? "border-stone-900 bg-stone-900 text-white"
                                : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_rgba(28,25,23,0.04)]">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-500">STATUS</p>
                <h2 className="mt-3 text-xl font-semibold">回答状況</h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">{totalAnswered} / {questions.length} 問に回答済みです。</p>
                <button
                  disabled={!complete}
                  onClick={() => setShowResult(true)}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    complete ? "bg-stone-900 text-white hover:opacity-90" : "cursor-not-allowed bg-stone-200 text-stone-500"
                  }`}
                >
                  結果を見る
                </button>
                <button
                  onClick={restart}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
                >
                  最初からやり直す
                </button>
              </div>

              <div className="rounded-[28px] border border-stone-200 bg-stone-900 p-6 text-white shadow-[0_10px_30px_rgba(28,25,23,0.06)]">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400">NOTE</p>
                <p className="mt-3 text-sm leading-7 text-stone-300">
                  最初の診断は、完璧さより納得感が大事です。
                  実際の相談や回答データを見ながら、配点は後からいくらでも磨けます。
                </p>
              </div>
            </aside>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[1.16fr_0.84fr]">
            <div className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-[0_10px_30px_rgba(28,25,23,0.04)] sm:p-8">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-500">RESULT</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight leading-tight sm:text-[38px]">
                {result.isHybrid
                  ? `あなたは「${result.top.name} × ${result.second.name}」タイプです。`
                  : `あなたは「${result.top.name}」タイプです。`}
              </h2>
              <p className="mt-5 text-base leading-8 text-stone-700">{result.top.summary}</p>
              {result.isHybrid && (
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  ただし、{result.second.name}の要素もかなり強く出ています。単一タイプとして切るより、二つの重心を持つ経営としてKGI/KPIを設計した方が、現実に合いやすい状態です。
                </p>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-stone-50 p-5">
                  <h3 className="text-lg font-semibold">まず追うべきKPI</h3>
                  <div className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                    {result.top.kpis.map((kpi) => (
                      <p key={kpi}>・{kpi}</p>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-stone-50 p-5">
                  <h3 className="text-lg font-semibold">ハマりやすい落とし穴</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{result.top.trap}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-stone-200 p-5">
                <h3 className="text-lg font-semibold">次の一手</h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">{result.top.next}</p>
              </div>

              <div className="mt-4 rounded-2xl bg-stone-900 p-5 text-white">
                <h3 className="text-lg font-semibold">あなたにおすすめ</h3>
                <p className="mt-3 text-sm leading-7 text-stone-300">{result.top.recommendation}</p>
              </div>

              <div className="mt-8 rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-500">NEXT STEP</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  診断結果に合わせた整理ポイントを、LINEで受け取りたい方へ。
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-700">
                  この診断は、あくまで入口です。実際には、同じ「{result.top.name}」でも、
                  業種・成長段階・借入状況・オーナーの意向によって、追うべきKGI/KPIは少しずつ変わります。
                  そこで九十九アドバイザリーでは、診断結果をたたき台にしながら、
                  タイプ別に整理したポイントをLINEでお届けしています。
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-sm font-semibold text-stone-900">LINEで受け取れるもの</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      あなたのタイプに合ったKPIの見方、まず整えるべき論点、次の一手をまとめた整理ポイントです。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-sm font-semibold text-stone-900">こんな方に向いています</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      売上や利益は見ているが、現金・成長・承継・企業価値のどこに重心を置くべきか迷っている方。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-sm font-semibold text-stone-900">その後の進め方</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      必要な方には、診断結果をもとに現状を整理する無料セッションもご案内しています。
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://line.me/R/ti/p/@YOUR_LINE_ID"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    LINEで整理ポイントを受け取る
                  </a>
                  <a
                    href="https://99advisory.jp/#contact"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                  >
                    無料セッションを見る
                  </a>
                </div>

                <p className="mt-4 text-xs leading-6 text-stone-500">
                  ※ LINE公式アカウントに遷移します。LINEのURLは「@YOUR_LINE_ID」の部分を実際の友だち追加URLに差し替えてください。
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={restart}
                  className="inline-flex items-center justify-center rounded-2xl border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
                >
                  もう一度診断する
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  結果を保存する
                </button>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_rgba(28,25,23,0.04)]">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-500">SCORE</p>
                <h2 className="mt-3 text-xl font-semibold">点数の内訳</h2>
                <div className="mt-5 space-y-4">
                  {Object.entries(result.totals)
                    .sort((a, b) => b[1] - a[1])
                    .map(([key, value]) => (
                      <div key={key}>
                        <div className="mb-2 flex items-center justify-between text-sm text-stone-600">
                          <span>{types[key].name}</span>
                          <span>{value}点</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                          <div className="h-full rounded-full bg-stone-900" style={{ width: `${Math.min((value / 24) * 100, 100)}%` }} />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_rgba(28,25,23,0.04)]">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-500">CONSULTATION</p>
                <h2 className="mt-3 text-xl font-semibold">導線の置き方</h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  ここに「無料セッション」や「タイプ別KPI整理シート」の導線を置くと、サイト全体の流れと自然につながります。
                </p>
                <div className="mt-5 rounded-2xl bg-stone-50 p-4 text-sm leading-7 text-stone-700">
                  例：
                  <br />
                  ・結果をもとに、30分だけ現状を整理する
                  <br />
                  ・タイプ別のKPI設計シートを受け取る
                </div>
              </div>
            </aside>
          </section>
        )}
      </div>
    </div>
  );
}
