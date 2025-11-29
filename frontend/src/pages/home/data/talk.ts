import { TalkData } from "@/types/character";
import { EXPRESSIONS } from "@/shared/components/Kerocha";

export const TALKS: TalkData[] = [
  // 未ログイン時の初期セリフ
  {
    id: "welcome",
    text: "いらっしゃいませ〜！Cafe Your Teaへようこそ！\nボクは、このカフェの店員のケロチャだよ。\nここではお客様が描いたティーを取り扱っているんだ。\n ほっと一息、ティータイムを楽しんでケロ〜！",
    expression: EXPRESSIONS.default,
    timeRange: "all",
    duration: 0, // 初期セリフは時間制限なし
  },
  // ログイン時の初期セリフ
  {
    id: "welcome_logged_in",
    text: "いらっしゃいませ、{userName}さん！\nご来店ありがとう〜！\nほっと一息、ティータイムを楽しんでケロ〜！",
    duration: 0,
    expression: EXPRESSIONS.default,
    timeRange: "all",
  },
  // 全時間セリフ
  {
    id: "all1",
    text: "ケロチャがこのカフェの店員としてティーをお作りするよ！\n気になるティーがあったら、ぜひ注文してね〜。",
    duration: 2500,
    expression: EXPRESSIONS.smileOpenUp,
    timeRange: "all",
  },
  {
    id: "all2",
    text: "ボクは絵をマネするのは得意だけど、ゼロから考えて描くことは難しいの〜。\nだから、みんながティーを考えてメニューを増やしてくれるの、すごく嬉しいんだ〜！",
    duration: 3500,
    expression: EXPRESSIONS.smileMunyaTouch,
    timeRange: "all",
  },

  // 朝（5〜11時台）のセリフ
  {
    id: "morning1",
    text: "おはようケロ〜！\n朝ご飯はもう食べたの？",
    expression: EXPRESSIONS.normalOpenHai,
    timeRange: "morning",
    duration: 2500,
  },
  {
    id: "morning2",
    text: "今日も一日頑張ろうね〜！\n朝の一杯、飲んでいく？それとも作るケロ？",
    expression: EXPRESSIONS.smileNormalDown,
    timeRange: "morning",
    duration: 2500,
  },

  // 昼（12〜16時台）のセリフ
  {
    id: "afternoon1",
    text: "アフタヌーンティーって、なんだかオシャレな響きケロ〜。\nお茶と一緒に、何を食べたい〜？",
    expression: EXPRESSIONS.ItomeNormalDown,
    timeRange: "afternoon",
    duration: 2500,
  },
  {
    id: "afternoon2",
    text: "お昼からも頑張るケロ〜！\nお客さん、いっぱい来るといいなぁ〜。",
    expression: EXPRESSIONS.smileOpenHai,
    timeRange: "afternoon",
    duration: 2500,
  },

  // 夕方〜夜（17〜21時台）のセリフ
  {
    id: "evening1",
    text: "おつかれさまケロ〜。\n今日の晩ご飯はなぁに？",
    expression: EXPRESSIONS.normalOpenHai,
    timeRange: "evening",
    duration: 2500,
  },
    {
    id: "evening2",
    text: "もうこんな時間なんだねぇ。\nちょっと休憩していくケロ？",
    expression: EXPRESSIONS.ItomeNormalDown,
    timeRange: "evening",
    duration: 2500,
  },

  // 夜〜深夜（22〜4時台）のセリフ
  {
    id: "night1",
    text: "そろそろ寝る時間かな？\nお休み前のティーもいいよねぇ。",
    expression: EXPRESSIONS.smileNormalDown,
    timeRange: "night",
    duration: 2500,
  },
    {
    id: "night2",
    text: "夜ふかしに気をつけてねぇ〜。\nボク？ボクはロボットだから寝なくても平気なんだよ〜。",
    expression: EXPRESSIONS.ItomeOpenHai,
    timeRange: "night",
    duration: 2500,
  },
];
