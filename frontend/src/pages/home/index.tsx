export default function HomePage() {
  return (
    <div className="w-full">
      <section className="relative m-0 h-96 w-full px-15 pt-10 sm:overflow-hidden">
        {/* 背景画像用の疑似要素的div */}
        <div
          className="absolute inset-0 w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('images/top_bg_01.png')",
            backgroundPosition: "center center",
            height: "85%",
            top: 0,
          }}
        />

        {/* 前面の画像 */}
        <div className="flex w-full flex-col justify-center sm:flex-row">
          <div className="flex gap-x-20">
            <div className="relative z-10 hidden sm:block sm:w-3/4">
              <div className="bg-base-100 mb-4 rounded-xl px-10 py-8">
                いらっしゃいませ〜！Cafe Your Teaへようこそ！
                <br />
                ボク、はこのカフェの店員のケロチャだよ。
                <br />
                ここではお客様が提案してくれた素敵なティーを飲めるよ。
                <br />
                ほっと一息、ティータイムを楽しんでケロ〜！
              </div>
            </div>
            <img
              src="images/top_img_01.png"
              alt="ケロチャ"
              className="relative w-[430px] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="flex flex-col items-center gap-x-20 gap-y-10 p-10 sm:flex-row">
          <img src="images/top_img_02.png" alt="Welcome" />

          <div>
            <h1 className="mb-6">Welcome to Our Cafe</h1>
            <div>
              ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
              <br />
              ミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
              <br />
              ミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
              <br />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
