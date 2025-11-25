import { TalkData } from "@/types/character";
import { EXPRESSIONS } from "@/shared/components/Kerocha";

export const TALKS: TalkData[] = [
  // 未ログイン時の初期セリフ
  {
    id: "welcome",
    text: "いらっしゃいませ〜！Cafe Your Teaへようこそ！\nボクは、このカフェの店員のケロチャだよ。\n正式なオープン前なのに、来てくれてありがと〜。\n早く開店できるように頑張るケロ〜！",
    expression: EXPRESSIONS.default,
    timeRange: "all",
    duration: 0, // 初期セリフは時間制限なし
  },
  // ログイン時の初期セリフ
  {
    id: "welcome_logged_in",
    text: "いらっしゃいませ、{userName}さん〜！\n今日もお疲れさまケロ！\n美味しいお茶でも飲んでいきませんか？",
    duration: 0,
    expression: EXPRESSIONS.default,
    timeRange: "all",
  },
  // ユーザー名入り全時間ランダムセリフ
  {
    id: "personal_greeting1",
    text: "{userName}さん、いつもありがとうございます〜！\n今日のおすすめは何にしようかな？",
    duration: 3000,
    expression: EXPRESSIONS.smile2,
    timeRange: "all",
  },
  {
    id: "personal_greeting2",
    text: "{userName}さん、お疲れさまケロ〜！\nゆっくりしていってくださいね♪",
    duration: 3000,
    expression: EXPRESSIONS.smile1,
    timeRange: "all",
  },
  {
    id: "personal_time_greeting",
    text: "{userName}さん、今日も一日頑張ってるケロね〜！\n応援してるよ〜♪",
    duration: 3000,
    expression: EXPRESSIONS.smile2,
    timeRange: "all",
  },
  // 朝（5〜11時台）のセリフ
  {
    id: "morning1",
    text: "朝のセリフその1が入るケロ！\nこれはサンプルだよ〜！",
    expression: EXPRESSIONS.smile1,
    timeRange: "morning",
    duration: 3000,
  },
  {
    id: "morning2",
    text: "朝のセリフその1が入るケロ！\nこれはサンプルだよ〜！",
    expression: EXPRESSIONS.smile2,
    timeRange: "morning",
    duration: 4000,
  },

  // 昼（12〜16時台）のセリフ
  {
    id: "afternoon1",
    text: "お昼のセリフその1が入るケロ！\nこれはサンプルだよ〜！",
    expression: EXPRESSIONS.smile1,
    timeRange: "afternoon",
    duration: 3500,
  },

  {
    id: "afternoon2",
    text: "お昼のセリフその2が入るケロ！\nこれはサンプルだよ〜！",
    expression: EXPRESSIONS.smile2,
    timeRange: "afternoon",
    duration: 3500,
  },

  // 夕方〜夜（17〜21時台）のセリフ
  {
    id: "evening1",
    text: "夕方のセリフが入るケロ！\nこれはサンプルだよ〜！",
    expression: EXPRESSIONS.smile2,
    timeRange: "evening",
    duration: 3000,
  },

  // 夜〜深夜（22〜4時台）のセリフ
  {
    id: "night1",
    text: "夜のセリフが入るケロ！\nこれはサンプルだよ〜！",
    expression: EXPRESSIONS.smile2,
    timeRange: "night",
    duration: 3000,
  },
];
