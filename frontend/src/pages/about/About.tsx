import { Link } from "react-router-dom";
import { motion, Variants } from "motion/react";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaCoffee } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { useAuth } from "../../shared/contexts/AuthContext";
import Headline from "./components/Headline.tsx";

const About = () => {
  const { isLoggedIn, user } = useAuth();
  const aboutVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="my-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="flex justify-center p-5 sm:p-10"
      >
        <div className="flex w-full max-w-4xl flex-col items-center justify-center space-y-8 gap-x-10 sm:flex-row">
          <div className="flex-1 leading-relaxed">
            <div className="mb-4 flex items-end justify-center gap-x-5 sm:justify-normal">
              <h1>About</h1>
              <div className="text-secondary pb-4.5 text-sm font-bold tracking-widest">
                このカフェについて
              </div>
            </div>

            {/* 説明文 */}
            <p>
              Cafe your Teaへようこそ。
              ここは、イラストを描いて“オリジナルのティー”に仕立てられる、カフェ風のイラスト投稿アプリです。
              <br />
              当カフェでは店員ロボットのケロチャが皆さまをお迎えします。ティー作りを楽しんだり、お気に入りの一杯を探したり、思い思いの時間をお過ごしください。
            </p>
          </div>
          <div className="max-w-[300px]">
            <img
              src="/images/about_img_01.png"
              alt="ケロチャ"
              className="h-auto w-full"
            />
          </div>
        </div>
      </motion.div>

      {/* すべての方へ */}
      <Headline title="For Everyone" subtitle="すべての方へ" bg="about_bg_01" />
      <div className="flex justify-center p-5 sm:p-10">
        <div className="w-full max-w-4xl space-y-6 sm:space-y-10">
          {/* 説明文 */}
          <motion.p
            variants={aboutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Cafe Your
            Teaはユーザー登録をしていない方でも、ふらっと立ち寄ってお楽しみいただける場となっております。
            下記のページの閲覧や機能はどなたでもご利用できます。
          </motion.p>
          <motion.div
            variants={aboutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {/* Top */}
            <div>
              <div className="divider divider-neutral">
                <Link
                  to="/"
                  className="text-accent josefin-sans flex space-x-1 text-4xl transition duration-300 hover:-translate-y-[2px] hover:opacity-80"
                >
                  <IoStorefrontSharp />
                  <span>Top</span>
                </Link>
              </div>
              <p className="text-sm">
                ケロチャがお出迎えする最初のページです。ケロチャとのお喋りやピックアップティーのコーナーをお楽しみいただけます。
              </p>
            </div>
            {/* About */}
            <div>
              <div className="divider divider-neutral">
                <Link
                  to="/about"
                  className="text-accent josefin-sans flex space-x-1 text-4xl transition duration-300 hover:-translate-y-[2px] hover:opacity-80"
                >
                  <BsFillPatchQuestionFill />
                  <span>About</span>
                </Link>
              </div>
              <p className="text-sm">
                現在表示されているページです。各ページのご案内や、ちょっとしたおまけコーナーを載せております。
              </p>
            </div>
            {/* Menu */}
            <div>
              <div className="divider divider-neutral">
                <Link
                  to="/tea-arts"
                  className="text-accent josefin-sans flex space-x-1 text-4xl transition duration-300 hover:-translate-y-[2px] hover:opacity-80"
                >
                  <BiSolidFoodMenu />
                  <span>Menu</span>
                </Link>
              </div>
              <p className="text-sm">
                当カフェで取り扱う、お客様が考案したティーの一覧です。ティーの詳細ページや、制作したユーザーのページもこちらからどうぞ。
              </p>
            </div>
          </motion.div>
          {/* その他のページ */}
          <motion.div
            variants={aboutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border-neutral/60 bg-base-100/30 flex flex-col items-center rounded-xl border px-5 py-6 sm:mt-12 lg:flex-row"
          >
            <div className="josefin-sans text-secondary pt-1 text-center text-3xl lg:pl-2">
              Other
              <br className="hidden lg:block" /> pages
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="space-y-4 text-sm sm:space-y-2">
              <p>
                <Link to="/signup" className="link link-primary">
                  Sign Up
                </Link>
                ：新規登録ページです。下記の特別な機能を使用したい方は、こちらからユーザー登録してください。
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
                ：このサービスをご利用いただく際の基本的なルールをまとめています。
              </p>
              <p>
                <Link to="/privacy" className="link link-primary">
                  プライバシーポリシー
                </Link>
                ：ユーザーの皆さまの情報をどのように扱い、守るかをまとめたページです。
              </p>
              <p>
                <Link to="/contact" className="link link-primary">
                  お問い合わせ
                </Link>
                ：当アプリについてのお問い合わせはこちらからどうぞ。
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 特別なお客様へ */}
      <Headline
        title="For Special Guests"
        subtitle="特別なお客様へ"
        bg="about_bg_02"
      />
      <div className="flex justify-center p-5 sm:p-10">
        <div className="w-full max-w-4xl space-y-10">
          {/* 説明文 */}
          <motion.p
            variants={aboutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            ユーザー登録したお客様だけがご利用いただける、特別な機能のご紹介です。より豊かなカフェタイムをお楽しみください。
          </motion.p>

          {/* Tea Art説明 */}
          <motion.div
            variants={aboutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-x-8 gap-y-6 sm:flex-row lg:gap-x-14"
          >
            <div className="max-w-[380px]">
              <img
                src="/images/about_img_02.webp"
                className="border-primary/30 h-auto w-full border"
              />
            </div>
            <div className="flex-1 lg:pt-4">
              {isLoggedIn ? (
                <Link
                  to="/tea-arts/create"
                  className="flex items-center space-x-2 transition duration-300 hover:-translate-y-[2px] hover:opacity-80"
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
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="text-accent flex space-x-2 text-4xl">
                    <FaCoffee />
                    <span className="josefin-sans">Tea Art</span>
                  </div>
                  <div className="border-secondary/50 flex-auto border-b"></div>
                  <div className="text-secondary text-sm font-bold">
                    ティーアート
                  </div>
                </div>
              )}
              <div className="py-5 text-sm">
                当カフェで提供しているティーはすべて、お客様のアイデアから生まれた特別な一杯です。
                <br />
                Tea
                Artページでは、ティーの色を調整したり、表面にイラストを描いたり、名前などの詳細を決めて、あなただけのオリジナルティーをメニューに登録できます。
                <br />
                想いを込めて描いた一杯を、ぜひ当カフェに加えてください。
              </div>
            </div>
          </motion.div>

          {/* My page説明 */}
          <motion.div
            variants={aboutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col-reverse items-center justify-center gap-x-8 gap-y-6 sm:flex-row lg:gap-x-14"
          >
            <div className="flex-1 lg:pt-4">
              {isLoggedIn ? (
                <Link
                  to={`/users/${user?.id}`}
                  className="flex items-center space-x-2 transition duration-300 hover:-translate-y-[2px] hover:opacity-80"
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
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="text-accent flex space-x-2 text-4xl">
                    <FaFaceSmileBeam />
                    <span className="josefin-sans">My Page</span>
                  </div>
                  <div className="border-secondary/50 flex-auto border-b"></div>
                  <div className="text-secondary text-sm font-bold">
                    マイページ
                  </div>
                </div>
              )}
              <div className="py-5 text-sm">
                あなたのプロフィール情報と、作成したティーの一覧が表示されます。お名前・アバター画像・自己紹介文の編集もこちらから行えます。
                <br />
                また、このページの内容は、他のユーザーからはあなたのユーザーページとして表示されます。
              </div>
            </div>
            <div className="max-w-[380px]">
              <img
                src="/images/about_img_03.webp"
                className="border-primary/30 h-auto w-full border"
              />
            </div>
          </motion.div>

          {/* その他の機能 */}
          <motion.div
            variants={aboutVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border-neutral/60 bg-base-100/30 flex flex-col items-center rounded-xl border px-5 py-6 sm:mt-12 lg:flex-row"
          >
            <div className="josefin-sans text-secondary pt-1 text-center text-3xl lg:pl-2">
              Other
              <br className="hidden lg:block" /> options
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <ul className="list-disc space-y-2 pl-4 text-sm">
              <li>
                あなたが作成したティーは情報を編集したり削除することができます。
              </li>
              <li>
                ティーの詳細ページへのコメントに、あなたのお名前と選択したアバター画像が反映されるようになります。
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* おまけ */}
      <Headline
        title="Little Extras"
        subtitle="おまけのひとさじ"
        bg="about_bg_03"
      />
      <motion.div
        variants={aboutVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center p-5 sm:p-10"
      >
        <div className="flex w-full max-w-4xl flex-col items-center justify-center space-y-8 gap-x-9 sm:flex-row">
          <div className="flex-1 leading-relaxed">
            <div className="mb-4 flex items-end justify-center gap-x-5 sm:justify-normal">
              <h1>Kerocha</h1>
              <div className="text-secondary pb-4.5 text-sm font-bold tracking-widest">
                ケロチャについて
              </div>
            </div>

            {/* 説明文 */}
            <p className="text-sm sm:text-base">
              ケロ型ロボット。フルネームはピョン・ケロォン・ケロチャ。身長最大96cm、体重最大68kg。人のお世話やおしゃべりが大好きな、好奇心旺盛な子です。
              <br />
              お茶作りに魅了され、たくさんの人をティータイムに招いておもてなしした経験から、“特別な一杯を届けるカフェを作りたい”という夢が生まれました。
              <br />
              それが、このカフェの始まりです。
            </p>
          </div>
          <div className="max-w-[280px]">
            <img
              src="/images/kero_img_01.png"
              alt="ケロチャ"
              className="h-auto w-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
