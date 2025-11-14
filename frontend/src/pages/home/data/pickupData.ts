export interface PickupData {
  category: string;
  season: string;
  title: string;
  name: string;
  description:string;
  teaImage: string;
  colors: {
    text: string;
    bg: string;
  };
}

export const pickupSections: PickupData[] = [
  {
    category: "all",
    season: "All",
    title: "あいうえおかきくけこ名前ティー",
    name: "ダミーテキストお名前さん",
    description:"A little comfort\nany time.",
    teaImage: "/images/tea_sample.png",
    colors: {
      text: "text-secondary",
      bg: "bg-secondary",
    },
  },
  {
    category: "spring",
    season: "Spring",
    title: "あいうえおかきくけこ名前ティー",
    name: "スプリングティーマスター",
    description:"A gentle breeze\nfor your day.",
    teaImage: "/images/tea_sample.png",
    colors: {
      text: "text-accent",
      bg: "bg-accent",
    },
  },
  {
    category: "summer",
    season: "Summer",
    title: "あいうえおかきくけこ名前ティー",
    name: "サマーティーエキスパート",
    description:"A bright pause\nto refresh.",
    teaImage: "/images/tea_sample.png",
    colors: {
      text: "text-success",
      bg: "bg-success",
    },
  },
  {
    category: "autumn",
    season: "Autumn",
    title: "あいうえおかきくけこ名前ティー",
    name: "オータムティーソムリエ",
    description:"A warm moment\nto unwind.",
    teaImage: "/images/tea_sample.png",
    colors: {
      text: "text-warning",
      bg: "bg-warning",
    },
  },
  {
    category: "winter",
    season: "Winter",
    title: "あいうえおかきくけこ名前ティー",
    name: "ウィンターティーマイスター",
    description:"A calm warmth\nin the cold.",
    teaImage: "/images/tea_sample.png",
    colors: {
      text: "text-info",
      bg: "bg-info",
    },
  },
];
