import { SeasonTeaArt, SeasonKey, PickupSectionData } from "@/types/teaArt";
import { TeaArtsPickupResponse } from "@/types/teaArt";

// 季節ごとの固定データ（装飾用英文・色情報）
const seasonStaticData: Record<
  SeasonKey,
  {
    description: string;
    colors: { bg: string; text: string };
  }
> = {
  all: {
    description: "A little comfort\nany time.",
    colors: {
      text: "text-secondary",
      bg: "bg-secondary",
    },
  },
  spring: {
    description:
      "A gentle breeze\nfor your day.",
    colors: {
      text: "text-accent",
      bg: "bg-accent",
    },
  },
  summer: {
    description:
      "A bright pause\nto refresh.",
    colors: {
      text: "text-success",
      bg: "bg-success",
    },
  },
  autumn: {
    description:
      "A warm moment\nto unwind.",
    colors: {
      text: "text-warning",
      bg: "bg-warning",
    },
  },
  winter: {
    description:
      "A calm warmth\nin the cold.",
    colors: {
      text: "text-info",
      bg: "bg-info",
    },
  },
};

// 季節名の頭文字大文字変換用マッピング
const seasonJapaneseNames: Record<SeasonKey, string> = {
  all: "All",
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
  
};

// APIデータを PickUpSection用データに変換
export const convertToPickupSectionData = (
  seasonData: SeasonTeaArt,
  seasonKey: SeasonKey
): PickupSectionData | null => {
  // データが存在しない場合はnullを返す
  if (!seasonData.exists || !seasonData.data) {
    return null;
  }

  const staticData = seasonStaticData[seasonKey];

  return {
    id: seasonData.data.id,
    category: seasonKey,
    season: seasonJapaneseNames[seasonKey],
    title: seasonData.data.title,
    name: seasonData.data.user.name,
    description: staticData.description,
    teaImage: seasonData.data.image_url,
    colors: staticData.colors,
  };
};

// 全季節のデータを変換してフィルタリング
export const convertAllPickupData = (
  pickupResponse: TeaArtsPickupResponse
): PickupSectionData[] => {
  const seasons: SeasonKey[] = [
    "all",
    "spring",
    "summer",
    "autumn",
    "winter",
  ];

  return seasons
    .map((seasonKey) =>
      convertToPickupSectionData(pickupResponse.data[seasonKey], seasonKey)
    )
    .filter((data): data is PickupSectionData => data !== null); // null除外
};
