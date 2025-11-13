export interface PickupData {
  id: string;
  season: string;
  description: string;
  author: string;
  mainImage: string;
  teaImage: string;
  bgImage: string;
  colors: {
    text: string;
    bg: string;
  };
}

export const pickupSections: PickupData[] = [
  {
    id: "all",
    season: "All",
    description: "あいうえおかきくけこ名前ティー",
    author: "ダミーテキストお名前さん",
    mainImage: "/images/top_image_all.webp",
    teaImage: "/images/tea_sample.png",
    bgImage: "/images/top_bg_all.png",
    colors: {
      text: "text-secondary",
      bg: "bg-secondary",
    },
  },
  {
    id: "spring",
    season: "Spring",
    description: "あいうえおかきくけこ名前ティー",
    author: "スプリングティーマスター",
    mainImage: "/images/top_image_spring.webp",
    teaImage: "/images/tea_sample.png",
    bgImage: "/images/top_bg_spring.png",
    colors: {
      text: "text-accent",
      bg: "bg-accent",
    },
  },
  {
    id: "summer",
    season: "Summer",
    description: "あいうえおかきくけこ名前ティー",
    author: "サマーティーエキスパート",
    mainImage: "/images/top_image_summer.webp",
    teaImage: "/images/tea_sample.png",
    bgImage: "/images/top_bg_all.png",
    colors: {
      text: "text-success",
      bg: "bg-success",
    },
  },
  {
    id: "autumn",
    season: "Autumn",
    description: "あいうえおかきくけこ名前ティー",
    author: "オータムティーソムリエ",
    mainImage: "/images/top_image_autumn.webp",
    teaImage: "/images/tea_sample.png",
    bgImage: "/images/top_bg_all.png",
    colors: {
      text: "text-warning",
      bg: "bg-warning",
    },
  },
  {
    id: "winter",
    season: "Winter",
    description: "あいうえおかきくけこ名前ティー",
    author: "ウィンターティーマイスター",
    mainImage: "/images/top_image_winter.webp",
    teaImage: "/images/tea_sample.png",
    bgImage: "/images/top_bg_all.png",
    colors: {
      text: "text-info",
      bg: "bg-info",
    },
  },
];
