import { Link } from "react-router-dom";

const PickUpSection = () => {
  return (
    <section className="flex items-center justify-center bg-[url(/images/top_bg_all.png)] bg-right-bottom bg-no-repeat px-5 sm:bg-right-top">
      <div className="flex w-full max-w-5xl flex-col justify-center gap-x-4 sm:flex-row lg:gap-x-10">
        {/* 画像部分 */}
        <div className="relative aspect-[7/5] w-full max-w-[520px] sm:w-[380px] lg:w-[520px]">
          {/* 背景画像 */}
          <div className="bg-secondary absolute top-[10%] left-0 aspect-[3/2] w-[83%]"></div>
          <div className="absolute top-0 left-[7%] aspect-[3/2] w-[83%] bg-[url(/images/top_image_all.webp)] bg-cover p-4">
            <div className="josefin-sans text-base-200/40 font-light lg:text-3xl">
              for every season
              <br />
              enjoy tea.
            </div>
          </div>

          {/* ティーと影 */}
          <div>
            <div className="bg-secondary absolute right-[4%] bottom-[2%] aspect-square w-[65%] rounded-full opacity-50 blur-md"></div>
            <div className="absolute right-0 bottom-0 w-[73%]">
              <img
                src="images/tea_sample.png"
                className="h-auto w-full"
                alt="ティー"
              />
            </div>
          </div>
        </div>

        {/* テキスト部分 */}
        <div className="flex-1 space-y-3 sm:mt-8 lg:mt-15">
          <div className="josefin-sans">
            <p className="text-neutral text-4xl italic sm:mb-2 lg:text-6xl">
              for
            </p>
            <p className="text-secondary text-6xl italic lg:text-7xl">
              Summer Season
            </p>
          </div>

          <p className="zen-maru-gothic text-xl font-bold lg:text-2xl">
            あいうえおカキクケコ名前ティー
          </p>
          <p className="text-secondary text-sm">by ダミーテキストお名前さん</p>
          <Link to="/" className="mt-5 flex items-center justify-end space-x-2 hover:opacity-60">
            <div className="border-primary/80 w-20 border-b"></div>
            <span className="text-primary josefin-sans text-2xl font-light sm:text-3xl lg:text-4xl">
              View More
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PickUpSection;
