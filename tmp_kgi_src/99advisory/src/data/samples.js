import { COLORS } from "../constants";

var samples = [
  {
    num: "01",
    name: "財務健康診断レポート",
    purpose: "利益と現金のズレを整理したい",
    pages: "8-12P",
    who: "年商3億〜10億前後 / サービス業・製造業など",
    color: COLORS.green,
  },
  {
    num: "02",
    name: "月次 経営管理レポート",
    purpose: "毎月の数字で判断したい",
    pages: "10-14P",
    who: "年商1億〜15億前後 / BtoB・小売・店舗など",
    color: "#2a6cb8",
  },
  {
    num: "03",
    name: "広告 採算整理シート",
    purpose: "広告費が利益につながっているか見たい",
    pages: "6-10P",
    who: "広告運用あり / D2C・教育・士業など",
    color: "#7c5cbf",
  },
  {
    num: "04",
    name: "事業計画サマリー",
    purpose: "銀行説明・資金調達に備えたい",
    pages: "8-12P",
    who: "借入・投資フェーズの会社",
    color: COLORS.gold,
  },
];

export default samples;
