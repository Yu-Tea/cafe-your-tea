import { Link } from "react-router-dom";
import { PickupData } from "@/pages/home/data/pickupData";

interface PickUpSectionProps {
  data: PickupData;
  layout: "normal" | "reverse";
  index: number;
}

const PickUpSection = ({ data, layout }: PickUpSectionProps) => {
  const isReverse = layout === "reverse";

  return (
    <section
      style={{
        backgroundImage: `url(${data.bgImage})`,
      }}
      className={`flex items-center justify-center bg-no-repeat ${
        isReverse
          ? "bg-left-bottom sm:bg-left-top"
          : "bg-right-bottom sm:bg-right-top"
      } px-5`}
    >
      <div
        className={`flex w-full max-w-5xl flex-col justify-center ${
          isReverse ? "sm:flex-row-reverse" : "sm:flex-row"
        }`}
      >
        {/* 画像部分 */}
        <div className="relative aspect-[7/5] w-full max-w-[520px] sm:w-[380px] lg:w-[520px]">
          {/* 背景画像 */}
          <div
            className={`${data.colors.bg} absolute top-[10%] ${
              isReverse ? "right-0" : "left-0"
            } aspect-[3/2] w-[83%]`}
          ></div>

          <div
            style={{
              backgroundImage: `url(${data.mainImage})`,
            }}
            className={`absolute top-0 ${
              isReverse ? "right-[7%]" : "left-[7%]"
            } aspect-[3/2] w-[83%] bg-cover p-4`}
          >
            <div
              className={`josefin-sans text-base-200/50 font-light lg:text-3xl ${
                isReverse ? "text-right" : "text-left"
              }`}
            >
              for every season
              <br />
              enjoy tea.
            </div>
          </div>

          {/* ティーと影 */}
          <div>
            <div
              className={`bg-secondary absolute ${
                isReverse ? "left-[4%]" : "right-[4%]"
              } bottom-[2%] aspect-square w-[65%] rounded-full opacity-50 blur-md`}
            ></div>
            <div
              className={`absolute ${
                isReverse ? "left-0" : "right-0"
              } bottom-0 w-[73%]`}
            >
              <img
                src={data.teaImage}
                className="h-auto w-full"
                alt={`${data.season}のティー`}
              />
            </div>
          </div>
        </div>

        {/* テキスト部分 */}
        <div className="flex-1 space-y-3 sm:mt-8 sm:ml-5 lg:mt-15 lg:ml-10">
          <div className="josefin-sans">
            <p className="text-neutral text-4xl italic sm:mb-2 lg:text-6xl">
              for
            </p>
            <p className={`${data.colors.text} text-6xl italic lg:text-7xl`}>
              {data.season} Season
            </p>
          </div>

          <p className="zen-maru-gothic text-xl font-bold lg:text-2xl">
            {data.description}
          </p>
          <p className="text-secondary text-sm">by {data.author}</p>

          <Link
            to={`/seasons/${data.id}`}
            className={`mt-5 flex items-center space-x-2 hover:opacity-60 ${
              isReverse ? "justify-start" : "justify-end"
            }`}
          >
            {!isReverse && (
              <div className={`border-primary/80 w-20 border-b`}></div>
            )}
            <span className="text-primary josefin-sans text-2xl font-light sm:text-3xl lg:text-4xl">
              View More
            </span>
            {isReverse && (
              <div className={`border-primary/80 w-20 border-b`}></div>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PickUpSection;
