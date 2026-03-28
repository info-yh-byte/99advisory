import { COLORS } from "../constants";

var services = [
  {
    badge: "まずはこれ",
    bc: COLORS.green,
    icon: "\uD83D\uDD0D",
    name: "財務健康診断レポート",
    desc: "決算書から会社の稼ぐ力・安全性・お金の回りを読み解き、いまの論点を整理してお渡しします。",
    price: "55,000",
    unit: "円〜（税込）",
    note: "スポット",
    points: [
      "利益と現金のズレが見える",
      "返済余力が分かる",
      "改善の優先順位が整理される",
    ],
  },
  {
    badge: "人気",
    bc: COLORS.orange,
    icon: "\uD83D\uDCC8",
    name: "CFO型 伴走支援",
    desc: "毎月の数字を一緒に確認しながら、予実管理・着地見込み・投資判断を感覚だけにしない形へ。",
    price: "165,000",
    unit: "円〜（税込）/ 月",
    note: "原則6ヶ月〜",
    points: [
      "月次ミーティング",
      "予実整理・着地見込み",
      "投資判断の論点整理",
    ],
  },
  {
    badge: null,
    bc: null,
    icon: "\uD83C\uDFAF",
    name: "投資判断レビュー",
    desc: "M&Aや大型投資の前に、見落としがちな論点を冷静に確認。決断の前の整理役です。",
    price: "220,000",
    unit: "円〜（税込）",
    note: "範囲によりお見積もり",
    points: [
      "論点の洗い出し",
      "リスクの確認",
      "意思決定前の材料づくり",
    ],
  },
  {
    badge: null,
    bc: null,
    icon: "\uD83D\uDCC4",
    name: "事業計画策定・資金調達",
    desc: "社長の頭の中にある構想を、銀行や社内に伝わる計画へ翻訳します。",
    price: "110,000",
    unit: "円〜（税込）着手金",
    note: "+ 成功報酬",
    points: [
      "事業計画の骨子整理",
      "資金繰りの見通し設計",
      "金融機関への説明整理",
    ],
  },
];

export var routes = [
  { emoji: "\uD83D\uDD0D", label: "まず現状を整理したい", arrow: "財務健康診断", c: COLORS.green },
  { emoji: "\uD83D\uDCC8", label: "毎月の数字で判断したい", arrow: "CFO型 伴走支援", c: "#2a6cb8" },
  { emoji: "\uD83C\uDFAF", label: "大きな投資前に確認したい", arrow: "投資判断レビュー", c: "#7c5cbf" },
  { emoji: "\uD83D\uDCC4", label: "銀行に伝わる計画を作りたい", arrow: "事業計画策定", c: COLORS.gold },
];

export default services;
