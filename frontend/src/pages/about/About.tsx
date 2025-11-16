import { Link } from "react-router-dom";
import { FaCoffee, FaFrog } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaFaceSmileBeam } from "react-icons/fa6";

import Headline from "./components/Headline.tsx";

const About = () => {
  return (
    <div className="my-10">
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
        <div className="w-full max-w-4xl space-y-6 sm:space-y-10">
          {/* 説明文 */}
          <p>
            ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
            ダミーテキストです。ダミーテキストです。ダミーテキストです。
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Top */}
            <div>
              <div className="divider divider-neutral">
                <Link
                  to="/"
                  className="text-accent josefin-sans flex space-x-2 text-4xl transition duration-300 hover:-translate-y-[2px] hover:text-[#b87780]"
                >
                  Top
                </Link>
              </div>
              <p className="text-sm">
                ダミーテキストです。ダミーテキストです。ダミーテキストです。
              </p>
            </div>
            {/* About */}
            <div>
              <div className="divider divider-neutral">
                <Link
                  to="/about"
                  className="text-accent josefin-sans flex space-x-2 text-4xl transition duration-300 hover:-translate-y-[2px] hover:text-[#b87780]"
                >
                  <FaFrog />
                  <span>About</span>
                </Link>
              </div>
              <p className="text-sm">
                ダミーテキストです。ダミーテキストです。ダミーテキストです。
              </p>
            </div>
            {/* Menu */}
            <div>
              <div className="divider divider-neutral">
                <Link
                  to="/tea-arts"
                  className="text-accent josefin-sans flex space-x-2 text-4xl transition duration-300 hover:-translate-y-[2px] hover:text-[#b87780]"
                >
                  <BiSolidFoodMenu />
                  <span>Menu</span>
                </Link>
              </div>
              <p className="text-sm">
                ダミーテキストです。ダミーテキストです。ダミーテキストです。
              </p>
            </div>
          </div>
          {/* その他のページ */}
          <div className="border-neutral/60 bg-base-100/30 sm:mt-12 flex flex-col items-center rounded-xl border px-5 py-6 lg:flex-row">
            <div className="josefin-sans text-secondary pt-1 text-3xl lg:pl-2">
              Other
              <br className="hidden lg:block" /> pages
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="space-y-4 text-sm sm:space-y-2">
              <p>
                <Link to="/signup" className="link link-primary">
                  Sign Up
                </Link>
                ：新規登録ページです。下記の特別な機能を使用したい方はこちらからユーザー登録してください。
              </p>
              <p>
                <Link to="/login" className="link link-primary">
                  Login
                </Link>
                ：ログインページです。すでに登録済みの方で再ログインする場合はこちらからどうぞ。
              </p>
              <p>
                <Link to="/teams" className="link link-primary">
                  利用規約
                </Link>
                ：ダミーテキスト
              </p>
              <p>
                <Link to="/privacy" className="link link-primary">
                  プライバシーポリシー
                </Link>
                ：ダミーテキスト
              </p>
              <p>
                <Link to="/contact" className="link link-primary">
                  お問い合わせ
                </Link>
                ：当アプリについてのお問い合わせはこちらからどうぞ。
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

          {/* Tea Art説明 */}
          <div className="flex flex-col items-center justify-center gap-x-15 gap-y-6 sm:flex-row">
            <div className="max-w-[350px]">
              <img src="/images/top_image_all.webp" className="h-auto w-full" />
            </div>
            <div className="flex-1">
              <Link
                to="/tea-arts"
                className="flex items-center space-x-2 transition duration-300 hover:-translate-y-[2px] hover:text-[#b87780]"
              >
                <div className="text-accent flex space-x-2 text-4xl">
                  <FaCoffee />
                  <span className="josefin-sans">Tea Art</span>
                </div>
                <div className="border-secondary/50 flex-auto border-b"></div>
                <div className="text-secondary text-sm font-bold">
                  ティーアート
                </div>
              </Link>
              <div className="py-5 text-sm">
                ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
                ダミーテキストです。ダミーテキストです。ダミーテキストです。
              </div>
            </div>
          </div>

          {/* Tea Art説明 */}
          <div className="flex flex-col-reverse items-center justify-center gap-x-15 gap-y-6 sm:flex-row">
            <div className="flex-1">
              <Link
                to="/tea-arts"
                className="flex items-center space-x-2 transition duration-300 hover:-translate-y-[2px] hover:text-[#b87780]"
              >
                <div className="text-accent flex space-x-2 text-4xl">
                  <FaFaceSmileBeam />
                  <span className="josefin-sans">My Page</span>
                </div>
                <div className="border-secondary/50 flex-auto border-b"></div>
                <div className="text-secondary text-sm font-bold">
                  マイページ
                </div>
              </Link>
              <div className="py-5 text-sm">
                ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
                ダミーテキストです。ダミーテキストです。ダミーテキストです。
              </div>
            </div>
            <div className="max-w-[350px]">
              <img src="/images/top_image_all.webp" className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* おまけ */}
      <Headline title="For Everyone" subtitle="すべての方へ" bg="top_bg_01" />
    </div>
  );
};

export default About;
