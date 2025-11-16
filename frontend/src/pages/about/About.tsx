import { FaCoffee, FaFrog } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";

import Headline from "./components/Headline.tsx";

const About = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-center p-5 sm:p-10">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center space-y-8 sm:flex-row">
          <div className="flex-1">
            <div className="mb-4 flex items-end gap-x-5">
              <h1>About</h1>
              <div className="text-secondary pb-4.5 text-sm font-bold tracking-widest">
                このカフェについて
              </div>
            </div>

            {/* 説明文 */}
            <p>
              Cafe your Teaへようこそ！
              <br />
              当店は、特別な技術でイラストを載せたティーを取り扱うカフェです。
              <br />
              ダミーテキストです。ダミーテキストです。ダミーテキストです。
            </p>
          </div>
          <img
            src="../images/kero_img_01.png"
            alt="ケロチャ"
            className="relative w-[280px] self-end object-contain sm:w-[300px]"
          />
        </div>
      </div>

      {/* すべての方へ */}
      <Headline title="For Everyone" subtitle="すべての方へ" bg="top_bg_01" />
      <div className="flex justify-center p-5 sm:p-10">
        <div className="w-full max-w-4xl space-y-10">
          {/* 説明文 */}
          <p>
            ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
            ダミーテキストです。ダミーテキストです。ダミーテキストです。
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Top */}
            <div>
              <div className="divider josefin-sans text-accent divider-neutral text-4xl">
                Top
              </div>
              <p className="text-sm">
                ダミーテキストです。ダミーテキストです。ダミーテキストです。
              </p>
            </div>
            {/* About */}
            <div>
              <div className="divider divider-neutral">
                <div className="text-accent josefin-sans flex space-x-2 text-4xl">
                  <FaFrog />
                  <span>About</span>
                </div>
              </div>
              <p className="text-sm">
                ダミーテキストです。ダミーテキストです。ダミーテキストです。
              </p>
            </div>
            {/* Menu */}
            <div>
              <div className="divider divider-neutral">
                <div className="text-accent josefin-sans flex space-x-2 text-4xl">
                  <BiSolidFoodMenu />
                  <span>Menu</span>
                </div>
              </div>
              <p className="text-sm">
                ダミーテキストです。ダミーテキストです。ダミーテキストです。
              </p>
            </div>
          </div>
          {/* その他のページ */}
          <div className="border-neutral/60 mt-12 flex flex-col items-center rounded-xl border px-5 py-6 lg:flex-row">
            <div className="josefin-sans text-secondary pt-1 text-3xl lg:pl-2">
              Other
              <br className="hidden lg:block" /> pages
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="space-y-2 text-sm">
              <p>
                Sign
                Up：新規登録ページです。下記の特別な機能を使用したい方はこちらからユーザー登録してください。
              </p>
              <p>
                Login：ログインページです。すでに登録済みの方で再ログインする場合はこちらからどうぞ。
              </p>
              <p>利用規約：</p>
              <p>プライバシーポリシー：</p>
              <p>
                お問い合わせ：当アプリについてのお問い合わせはこちらからどうぞ。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 特別なお客様へ */}
      <Headline
        title="For Special Guests"
        subtitle="特別なお客様へ"
        bg="top_bg_01"
      />
      <div className="flex justify-center p-5 sm:p-10">
        <div className="w-full max-w-4xl space-y-10">
          {/* 説明文 */}
          <p>
            ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
            ダミーテキストです。ダミーテキストです。ダミーテキストです。
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
