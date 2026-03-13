import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'owner-kgi-diagnosis-v2'

const types = {
  stability: {
    id: 'stability',
    name: '生存・安定型',
    summary:
      'まず優先すべきなのは、会社を潰さないことです。利益の見栄えよりも、資金繰り・固定費耐性・返済余力を整えることが、このタイプの経営では重要になります。',
    kpis: ['現預金残高', '営業CF', '損益分岐点売上', '借入返済余力'],
    trap:
      '試算表の黒字に安心して、現金の動きや返済負担の重さを見落とすと危険です。',
    next:
      '資金繰り表と固定費の見える化から始めるのが有効です。',
    ctaLabel: '現金が残る経営の整理ポイントをLINEで受け取る',
    ctaNote: '資金繰り、固定費耐性、返済余力の見方を整理したい方向けです。',
  },
  income: {
    id: 'income',
    name: '所得最大化型',
    summary:
      '会社そのものの見栄えより、オーナー個人の豊かさに重心があります。役員報酬、配当、内部留保のバランスを、税後でどう設計するかが重要になります。',
    kpis: ['税後キャッシュ', '役員報酬', '配当可能利益', '実効税率'],
    trap:
      '節税に寄りすぎると、銀行評価や将来の企業価値まで削ってしまうことがあります。',
    next:
      '会社に残すお金と個人に移すお金のバランス整理から始めるのが有効です。',
    ctaLabel: '会社と個人のお金の配分整理をLINEで受け取る',
    ctaNote: '税後キャッシュ、報酬、内部留保のバランスを整理したい方向けです。',
  },
  growth: {
    id: 'growth',
    name: '成長・拡大型',
    summary:
      '守りよりも、事業の拡大と成長余地に価値を置くタイプです。売上だけでなく、粗利と回収を伴う成長になっているかが重要になります。',
    kpis: ['売上成長率', '粗利成長率', 'LTV/CAC', '投資回収期間'],
    trap:
      '売上だけが伸びて粗利が増えない、採用が追いつかない、営業CFが苦しくなる。この三重苦に注意です。',
    next:
      '売上ではなく、粗利と回収を伴う成長になっているかの整理から始めるのが有効です。',
    ctaLabel: '成長投資の優先順位をLINEで受け取る',
    ctaNote: '売上ではなく、粗利と回収を伴う成長にしたい方向けです。',
  },
  succession: {
    id: 'succession',
    name: '承継・長寿型',
    summary:
      '一代で終わらず、次世代へ渡せる会社を目指すタイプです。利益だけでなく、社長依存の低下や組織の再現性が重要になります。',
    kpis: ['社長依存売上比率', '権限委譲率', '自己資本比率', '継続黒字'],
    trap:
      '社長が優秀すぎる会社は、今は強く見えても承継局面で急に脆くなることがあります。',
    next:
      '社長依存の棚卸しと、権限移譲できる業務の切り分けから始めるのが有効です。',
    ctaLabel: '社長依存を減らす論点整理をLINEで受け取る',
    ctaNote: '承継や長期継続に向けて、組織の再現性を高めたい方向けです。',
  },
  exit: {
    id: 'exit',
    name: '売却・資本政策型',
    summary:
      '会社を高く評価される資産として育てたいタイプです。収益力に加え、再現性や管理体制まで整っているかが重要になります。',
    kpis: ['EBITDA', '継続売上比率', '顧客集中度', '月次決算早期化'],
    trap:
      '利益だけを磨いても、属人性や管理の粗さが残ると評価は伸びません。',
    next:
      '正常収益力と管理体制の整理から始めるのが有効です。',
    ctaLabel: '企業価値を高める論点整理をLINEで受け取る',
    ctaNote: '収益力だけでなく、再現性や管理体制も整えたい方向けです。',
  },
}

const questions = [
  {
    id: 1,
    text: 'いま最も避けたいものは何ですか。',
    options: [
      {
        title: '資金ショート',
        body: 'まず避けたいのは、現金が尽きて会社が不安定になること',
        scores: { stability: 3 },
      },
      {
        title: '手取りの伸び悩み',
        body: '会社に利益が残っても、個人の豊かさにつながらないこと',
        scores: { income: 3 },
      },
      {
        title: '成長の頭打ち',
        body: '売上や事業規模が伸びず、次の打ち手が鈍ること',
        scores: { growth: 3 },
      },
      {
        title: '社長依存の固定化',
        body: '自分がいないと回らない状態が続くこと',
        scores: { succession: 3, exit: 1 },
      },
      {
        title: '会社価値が上がらないこと',
        body: '利益は出ても、将来高く評価される会社にならないこと',
        scores: { exit: 3, growth: 1 },
      },
    ],
  },
  {
    id: 2,
    text: '3年後に一番うれしい状態はどれですか。',
    options: [
      {
        title: '安定して黒字で回ること',
        body: '資金繰りの不安なく、落ち着いて経営できている',
        scores: { stability: 3, succession: 1 },
      },
      {
        title: '個人の豊かさが増えること',
        body: '自分や家族の生活が、今より明らかに良くなっている',
        scores: { income: 3, stability: 1 },
      },
      {
        title: '事業規模が一段上がること',
        body: '売上や拠点数が伸び、成長を実感できている',
        scores: { growth: 3, exit: 1 },
      },
      {
        title: '次世代に渡せること',
        body: '幹部や後継者に引き継げる体制が整っている',
        scores: { succession: 3, stability: 1 },
      },
      {
        title: '売却も選べる状態になること',
        body: '資本提携やM&Aも含めて、選択肢が持てている',
        scores: { exit: 3, growth: 1 },
      },
    ],
  },
  {
    id: 3,
    text: '経営判断で最も重視するものは何ですか。',
    options: [
      {
        title: '現金が残ること',
        body: '利益よりも、まず手元資金が厚くなるかを重視する',
        scores: { stability: 3 },
      },
      {
        title: '可処分所得が増えること',
        body: '会社全体より、自分の税後キャッシュを重視する',
        scores: { income: 3 },
      },
      {
        title: '売上やシェアが伸びること',
        body: 'まずは拡大し、将来の規模を取りにいきたい',
        scores: { growth: 3 },
      },
      {
        title: '長く続く組織になること',
        body: '一代で終わらず、継続できる会社を作りたい',
        scores: { succession: 3 },
      },
      {
        title: '高く評価される会社になること',
        body: '将来の企業価値や資本政策まで見据えたい',
        scores: { exit: 3 },
      },
    ],
  },
  {
    id: 4,
    text: '毎月、つい見てしまう数字はどれに近いですか。',
    options: [
      {
        title: '預金残高',
        body: '口座にいくら残っているかが一番気になる',
        scores: { stability: 3 },
      },
      {
        title: '税後の手残り',
        body: '利益よりも、最終的にいくら残るかを見てしまう',
        scores: { income: 3 },
      },
      {
        title: '売上・粗利・新規顧客数',
        body: '成長の勢いや伸びを示す数字に目がいく',
        scores: { growth: 3 },
      },
      {
        title: '離職率や幹部育成',
        body: '組織が回るか、引き継げるかが気になる',
        scores: { succession: 3 },
      },
      {
        title: 'EBITDAや継続売上',
        body: '収益力や企業価値に近い数字を見てしまう',
        scores: { exit: 3 },
      },
    ],
  },
  {
    id: 5,
    text: '社長であるあなたが1か月抜けたら、最も近いのはどれですか。',
    options: [
      {
        title: 'かなり危ない',
        body: '資金繰りや意思決定が止まり、大きく不安が残る',
        scores: { stability: 2, succession: 1 },
      },
      {
        title: 'お金の管理が気になる',
        body: '利益や資金の流れだけは心配になる',
        scores: { income: 2, stability: 1 },
      },
      {
        title: '成長が鈍る',
        body: '売上拡大や新しい打ち手のスピードが落ちそうだ',
        scores: { growth: 3 },
      },
      {
        title: 'その状態を変えたい',
        body: 'いま依存が強いが、そこを減らしたいと思っている',
        scores: { succession: 3 },
      },
      {
        title: 'それでも回る会社にしたい',
        body: '社長不在でも成立する状態を本気で目指したい',
        scores: { exit: 2, succession: 1 },
      },
    ],
  },
  {
    id: 6,
    text: '利益が増えたとき、最も魅力的な使い道は何ですか。',
    options: [
      {
        title: '内部留保を厚くする',
        body: 'まずは会社にお金を残し、守りを強くしたい',
        scores: { stability: 3 },
      },
      {
        title: '役員報酬や配当で受け取る',
        body: '個人に移して使える形にしたい',
        scores: { income: 3 },
      },
      {
        title: '採用や広告に再投資する',
        body: '成長のために、攻めの投資へ回したい',
        scores: { growth: 3 },
      },
      {
        title: '組織整備に使う',
        body: '後継者育成や権限移譲を進めたい',
        scores: { succession: 3 },
      },
      {
        title: '企業価値を高める整備に使う',
        body: '再現性や管理体制を強くしたい',
        scores: { exit: 3 },
      },
    ],
  },
  {
    id: 7,
    text: '理想の会社像に最も近いものを選んでください。',
    options: [
      {
        title: '潰れない強い会社',
        body: '景気や環境変化にも耐えられる会社',
        scores: { stability: 3 },
      },
      {
        title: 'オーナーを豊かにする会社',
        body: '会社が個人と家族の豊かさにつながる会社',
        scores: { income: 3 },
      },
      {
        title: '成長し続ける会社',
        body: '規模を広げ、前に進み続ける会社',
        scores: { growth: 3 },
      },
      {
        title: '100年続く会社',
        body: '代を超えて残る会社',
        scores: { succession: 3 },
      },
      {
        title: '高く評価される資産としての会社',
        body: '市場や買い手から価値を認められる会社',
        scores: { exit: 3 },
      },
    ],
  },
  {
    id: 8,
    text: '銀行との関係について、最も近い考えはどれですか。',
    options: [
      {
        title: '借入余力は生命線',
        body: '必要なときに借りられる状態を重視している',
        scores: { stability: 3 },
      },
      {
        title: '必要最低限でよい',
        body: '大きく借りるより、個人と会社の手残りを重視する',
        scores: { income: 2 },
      },
      {
        title: '成長投資のために活用したい',
        body: '借入も使って事業を伸ばしたい',
        scores: { growth: 3 },
      },
      {
        title: '承継のために信頼を維持したい',
        body: '次世代へつなぐために、安定的な関係が大事だ',
        scores: { succession: 3 },
      },
      {
        title: '評価のために整えておきたい',
        body: '将来の売却や資本政策も見据えて管理したい',
        scores: { exit: 3 },
      },
    ],
  },
]

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // noop
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // noop
  }
}

export default function App() {
  const [stage, setStage] = useState('intro') // intro | question | loading | result
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedAnimating, setSelectedAnimating] = useState(null)
  const [restorePrompt, setRestorePrompt] = useState(false)
  const [loadingText, setLoadingText] = useState('回答データを整理しています…')

  useEffect(() => {
    const saved = loadState()
    if (saved && saved.stage && saved.stage !== 'result' && Object.keys(saved.answers || {}).length > 0) {
      setRestorePrompt(true)
    }
  }, [])

  useEffect(() => {
    if (stage === 'question') {
      saveState({ stage, currentIndex, answers })
    }
  }, [stage, currentIndex, answers])

  useEffect(() => {
    if (stage !== 'loading') return

    setLoadingText('回答データを整理しています…')
    const t1 = setTimeout(() => {
      setLoadingText('経営の重心とKGIタイプを判定しています…')
    }, 700)

    const t2 = setTimeout(() => {
      setStage('result')
      clearState()
    }, 1400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [stage])

  const result = useMemo(() => {
    const totals = {
      stability: 0,
      income: 0,
      growth: 0,
      succession: 0,
      exit: 0,
    }

    Object.values(answers).forEach((scores) => {
      Object.entries(scores).forEach(([key, value]) => {
        totals[key] += value
      })
    })

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1])
    const [topKey, topScore] = sorted[0] || ['stability', 0]
    const [secondKey, secondScore] = sorted[1] || ['income', 0]
    const isHybrid = secondScore > 0 && topScore - secondScore <= 2

    return {
      totals,
      top: types[topKey],
      second: types[secondKey],
      isHybrid,
    }
  }, [answers])

  const startDiagnosis = () => {
    setStage('question')
    setCurrentIndex(0)
  }

  const resumeDiagnosis = () => {
    const saved = loadState()
    if (!saved) {
      setRestorePrompt(false)
      return
    }
    setAnswers(saved.answers || {})
    setCurrentIndex(saved.currentIndex || 0)
    setStage(saved.stage || 'question')
    setRestorePrompt(false)
  }

  const restartDiagnosis = () => {
    clearState()
    setAnswers({})
    setCurrentIndex(0)
    setSelectedAnimating(null)
    setStage('intro')
    setRestorePrompt(false)
  }

  const restartFromResult = () => {
    clearState()
    setAnswers({})
    setCurrentIndex(0)
    setSelectedAnimating(null)
    setStage('intro')
  }

  const currentQuestion = questions[currentIndex]
  const answeredCount = Object.keys(answers).length
  const progress = stage === 'result' ? 100 : Math.round(((currentIndex + (stage === 'question' ? 1 : 0)) / questions.length) * 100)
  const remaining = Math.max(questions.length - (currentIndex + 1), 0)

  const handleSelect = (questionId, optionIndex, scores) => {
    setSelectedAnimating(optionIndex)

    const nextAnswers = { ...answers, [questionId]: scores }
    setAnswers(nextAnswers)

    const isLast = currentIndex === questions.length - 1

    setTimeout(() => {
      setSelectedAnimating(null)

      if (isLast) {
        saveState({ stage: 'loading', currentIndex, answers: nextAnswers })
        setStage('loading')
      } else {
        const nextIndex = currentIndex + 1
        setCurrentIndex(nextIndex)
        saveState({ stage: 'question', currentIndex: nextIndex, answers: nextAnswers })
      }
    }, 260)
  }

  const goBack = () => {
    if (currentIndex === 0) return
    const nextIndex = currentIndex - 1
    setCurrentIndex(nextIndex)
    saveState({ stage: 'question', currentIndex: nextIndex, answers })
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {restorePrompt && (
          <div className="mb-6 rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_10px_30px_rgba(28,25,23,0.04)]">
            <p className="text-sm font-semibold text-stone-900">前回の続きが見つかりました。</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              途中の質問から再開できます。最初からやり直すこともできます。
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={resumeDiagnosis}
                className="inline-flex items-center justify-center rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                続きから再開する
              </button>
              <button
                onClick={restartDiagnosis}
                className="inline-flex items-center justify-center rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                最初からやり直す
              </button>
            </div>
          </div>
        )}

        {stage === 'intro' && (
          <section className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_10px_30px_rgba(28,25,23,0.04)]">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              <div className="p-7 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  TSUKUMO ADVISORY STYLE
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-[42px] sm:leading-[1.18]">
                  あなたの会社は、
                  <br className="hidden sm:block" />
                  何をKGIにすべきか。
                </h1>
                <p className="mt-5 text-base leading-8 text-stone-700">
                  8つの質問から、オーナー経営者としての重心を5つの型に整理します。
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  目的は、性格を当てることではなく、追うべき数字を静かに見定めることです。
                </p>
                <p className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-700">
                  財務と事業を見てきた専門家の知見から抽出した診断です。
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-600">
                  <span className="rounded-full border border-stone-200 px-4 py-2">所要時間 2〜3分</span>
                  <span className="rounded-full border border-stone-200 px-4 py-2">全8問</span>
                  <span className="rounded-full border border-stone-200 px-4 py-2">結果はその場で表示</span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={startDiagnosis}
                    className="inline-flex items-center justify-center rounded-2xl bg-stone-900 px-6 py-4 text-base font-semibold text-white transition hover:opacity-90"
                  >
                    診断をはじめる
                  </button>
                  <a
                    href="https://99advisory.jp/#contact"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-stone-200 bg-white px-6 py-4 text-base font-semibold text-stone-700 transition hover:bg-stone-100"
                  >
                    無料セッションを見る
                  </a>
                </div>
              </div>

              <div className="border-t border-stone-200 bg-stone-900 p-7 text-white lg:border-l lg:border-t-0 sm:p-10">
                <p className="text-sm leading-7 text-stone-300">
                  利益が出ていても、現金が残るとは限りません。
                </p>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  成長していても、会社の価値が高まっているとは限りません。
                </p>
                <p className="mt-6 text-sm leading-7 text-stone-300">
                  いまの貴社がどの目的関数に近いのかを整理するための、小さな入口です。
                </p>
              </div>
            </div>
          </section>
        )}

        {stage === 'question' && currentQuestion && (
          <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_rgba(28,25,23,0.04)] sm:p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  経営KGI診断
                </p>
                <p className="text-sm font-medium text-stone-600">
                  Q{currentIndex + 1} / {questions.length}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <button
                  onClick={goBack}
                  disabled={currentIndex === 0}
                  className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${
                    currentIndex === 0
                      ? 'cursor-not-allowed text-stone-300'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  ← 前の質問へ
                </button>
                <p className="text-sm text-stone-500">
                  あと{remaining}問
                </p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full bg-stone-900 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-semibold leading-9 text-stone-900 sm:text-[30px]">
                {currentQuestion.text}
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                近いものを、直感でひとつ選んでください。
              </p>

              <div className="mt-8 grid gap-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnimating === index
                  return (
                    <button
                      key={`${currentQuestion.id}-${index}`}
                      onClick={() => handleSelect(currentQuestion.id, index, option.scores)}
                      className={`w-full rounded-2xl border p-5 text-left shadow-[0_6px_16px_rgba(28,25,23,0.04)] transition ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-300 bg-white text-stone-900 hover:border-stone-500 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className={`text-base font-semibold leading-7 ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                            {option.title}
                          </div>
                          <div className={`mt-1 text-sm leading-6 ${isSelected ? 'text-stone-200' : 'text-stone-600'}`}>
                            {option.body}
                          </div>
                        </div>
                        <div
                          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                            isSelected
                              ? 'border-white/40 bg-white/10 text-white'
                              : 'border-stone-300 text-stone-400'
                          }`}
                        >
                          {isSelected ? '✓' : ''}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {stage === 'loading' && (
          <section className="rounded-[32px] border border-stone-200 bg-white p-10 text-center shadow-[0_10px_30px_rgba(28,25,23,0.04)] sm:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
              ANALYZING
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-stone-900 sm:text-3xl">
              {loadingText}
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              まもなく結果が表示されます。
            </p>
            <div className="mx-auto mt-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-stone-200">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-stone-900" />
            </div>
          </section>
        )}

        {stage === 'result' && (
          <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[32px] border border-stone-200 bg-white p-7 shadow-[0_10px_30px_rgba(28,25,23,0.04)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                診断結果
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-stone-900 sm:text-[38px]">
                {result.isHybrid
                  ? `あなたは「${result.top.name} × ${result.second.name}」タイプです。`
                  : `あなたは「${result.top.name}」タイプです。`}
              </h2>

              <p className="mt-5 text-base leading-8 text-stone-700">
                {result.top.summary}
              </p>

              {result.isHybrid && (
                <p className="mt-4 text-sm leading-7 text-stone-600">
                  ただし、{result.second.name}の要素もかなり強く出ています。単一タイプとして切るより、
                  二つの重心を持つ経営として設計した方が、現実に合いやすい状態です。
                </p>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-stone-50 p-5">
                  <h3 className="text-lg font-semibold text-stone-900">まず追うべきKPI</h3>
                  <div className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                    {result.top.kpis.map((kpi) => (
                      <p key={kpi}>・{kpi}</p>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-stone-50 p-5">
                  <h3 className="text-lg font-semibold text-stone-900">ハマりやすい落とし穴</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">
                    {result.top.trap}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-stone-200 p-5">
                <h3 className="text-lg font-semibold text-stone-900">次の一手</h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  {result.top.next}
                </p>
              </div>

              <div className="mt-8 rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  NEXT STEP
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
                  診断結果に合わせた整理ポイントを、LINEで受け取りたい方へ。
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-700">
                  この診断は、あくまで入口です。実際には、同じタイプでも、業種・成長段階・借入状況・オーナーの意向によって、見るべき論点は少しずつ変わります。
                  九十九アドバイザリーでは、診断結果をたたき台にしながら、タイプ別に整理したポイントをLINEでお届けしています。
                </p>

                <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4">
                  <p className="text-sm font-semibold text-stone-900">今回の結果に合わせたご案内</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {result.top.ctaNote}
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-sm font-semibold text-stone-900">LINEで受け取れるもの</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      タイプ別のKPIの見方、まず整えるべき論点、次の一手をまとめた整理ポイントです。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-sm font-semibold text-stone-900">役割の違い</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      この画面では方向性まで、具体的な見方や進め方はLINE側でお届けします。
                    </p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-sm font-semibold text-stone-900">必要な方へ</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      診断結果をもとに、現状を整理する無料セッションもご案内しています。
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
                    {result.top.ctaLabel}
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
                  ※ LINE公式アカウントに遷移します。URLは実際の友だち追加URLに差し替えてください。
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={restartFromResult}
                  className="inline-flex items-center justify-center rounded-2xl border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                >
                  もう一度診断する
                </button>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_rgba(28,25,23,0.04)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  SCORE
                </p>
                <h3 className="mt-3 text-xl font-semibold text-stone-900">点数の内訳</h3>
                <div className="mt-5 space-y-4">
                  {Object.entries(result.totals)
                    .sort((a, b) => b[1] - a[1])
                    .map(([key, value]) => (
                      <div key={key}>
                        <div className="mb-2 flex items-center justify-between text-sm text-stone-600">
                          <span>{types[key].name}</span>
                          <span>{value}点</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-stone-200">
                          <div
                            className="h-full rounded-full bg-stone-900"
                            style={{ width: `${Math.min((value / 24) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_rgba(28,25,23,0.04)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  ABOUT THIS DIAGNOSIS
                </p>
                <h3 className="mt-3 text-xl font-semibold text-stone-900">この診断でわかること</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  いまの貴社が、現金・成長・承継・企業価値のどこに重心を置くべきかを、5つの型から整理します。
                </p>
              </div>
            </aside>
          </section>
        )}
      </div>
    </div>
  )
}
