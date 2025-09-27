export default function HomePage() {
  return (
    <>
      <section className="relative h-96 w-full px-15 pt-10 sm:overflow-hidden">
        {/* 背景画像用の疑似要素的div */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('images/top_bg_01.png')",
            backgroundPosition: "center center",
            height: "85%",
            top: 0,
          }}
        />

        {/* 前面の画像 */}
        <div className="flex flex-col sm:flex-row">
          <div className="relative z-10 hidden p-4  sm:block sm:w-3/4">
            <div className="bg-base-100 mb-4 rounded-lg p-6">
              最新のコメントを入れる
            </div>
            <div className="bg-base-100 mb-4 rounded-lg p-6">
              最新のコメントを入れる
            </div>
            <div className="bg-base-100 mb-4 rounded-lg p-6">
              最新のコメントを入れる
            </div>
          </div>
          <img
            src="images/top_img_01.png"
            alt="ケロチャ"
            className="relative w-[430px] object-contain"
          />
        </div>
      </section>

      <section className="container mx-auto">
        <div className="flex flex-col gap-x-20 gap-y-10 p-10 sm:flex-row">
          <img src="images/top_img_02.png" alt="Welcome" />

          <div>
            <h1>Welcome to Our Cafe</h1>
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
    </>
  );
}
