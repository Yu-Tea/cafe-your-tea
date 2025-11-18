const Info = () => {
  return (
    <div className="flex w-full items-end justify-center bg-[url(/images/order_bg.png)] bg-cover bg-right-bottom bg-repeat-x sm:bg-contain sm:bg-center">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-6 px-5 sm:h-80 sm:flex-row">
          <div className="flex-1">
            <div className="bg-base-100 border-neutral/80 rounded-xl border-2 px-2 py-6 text-center">
              <div className="zen-maru-gothic text-secondary font-bold text-lg">
                いらっしゃいませ〜！Cafe Your Teaへようこそ！
                <br />
                ボクは、このカフェの店員のケロチャだよ。
                <br />
                正式なオープン前なのに、来てくれてありがと〜。
                <br />
                早く開店できるように頑張るケロ〜！
              </div>
            </div>
          </div>
          <img
            src="../images/kero_img_01.png"
            alt="ケロチャ"
            className="relative w-[300px] sm:w-[350px] self-end object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
