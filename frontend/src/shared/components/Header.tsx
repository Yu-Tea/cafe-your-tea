import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FaCoffee, FaFrog } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";
import {
  FaUserPlus,
  FaRightToBracket,
  FaFaceSmileBeam,
  FaRightFromBracket,
} from "react-icons/fa6";
import { useAuth } from "../../shared/contexts/AuthContext";
import { Button } from "./Button";
import { performLogout } from "../../api/auth";
import { toast } from "sonner";

export default function Header() {
  const { isLoggedIn, logout: authLogout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const drawerToggleRef = useRef<HTMLInputElement>(null);

  // ページ遷移時にサイドバーを閉じる
  useEffect(() => {
    if (drawerToggleRef.current) {
      drawerToggleRef.current.checked = false;
    }
  }, [location.pathname]);

  // ログアウト処理のハンドラー
  const handleLogout = async () => {
    try {
      // バックエンドにログアウトリクエスト + フロントエンド状態クリア
      const success = await performLogout();

      if (success) {
        // useAuthのlogout関数を呼び出して認証状態をクリア
        authLogout();
        // ホームページに遷移
        navigate("/");
        if (drawerToggleRef.current) {
          drawerToggleRef.current.checked = false;
        }
        toast.success("ログアウトしました");
      } else {
        // エラーが発生してもフロントエンドの状態はクリア
        authLogout();
        navigate("/");
      }
    } catch (error) {
      // エラーが発生してもフロントエンドの状態はクリア
      authLogout();
      navigate("/");
    }
  };

  return (
    <div className="drawer drawer-end text-base-200 fixed z-20">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerToggleRef}
      />
      <div className="drawer-content flex flex-col">
        {/* PC時のナビバー */}
        <div className="navbar bg-primary w-full px-0.5 pt-5 pb-4">
          {/* ロゴ */}
          <div className="mx-2 block flex-1 sm:mx-4">
            <Link to="/">
              <img
                src="/logo.png"
                alt="Cafe Your Tea"
                className="max-w-[280px] hover:opacity-85 sm:max-w-[300px] xl:max-w-[340px]"
              />
            </Link>
          </div>

          {/* ハンバーガーメニュー */}
          <div className="mr-3 flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-outline"
            >
              <IoMdMenu size={35} />
            </label>
          </div>

          {/* PC時ナビゲーション */}
          <div className="mx-3 hidden flex-none place-items-center lg:flex">
            <div className="josefin-sans mr-4 flex space-x-4 pt-1 text-3xl">
              {/* 常時表示するリンク先 */}
              <Link to="/about" className="flex hover:text-[#d9e2c0]">
                <FaFrog />
                <span className="ml-1 pt-0.5">About</span>
              </Link>
              <Link to="/tea-arts" className="flex hover:text-[#d9e2c0]">
                <BiSolidFoodMenu />
                <span className="ml-0.5 pt-0.5">Menu</span>
              </Link>

              {/* ログイン後のみTeaArtを追加表示 */}
              {isLoggedIn && (
                <Link
                  to="/tea-arts/create"
                  className="flex hover:text-[#d9e2c0]"
                >
                  <FaCoffee />
                  <span className="ml-1 pt-0.5">Tea Art</span>
                </Link>
              )}
            </div>

            {/* ログイン後のボタン */}
            {isLoggedIn ? (
              <div className="flex space-x-3">
                <Link to={`/users/${user?.id}`}>
                  <Button
                    variant="header-btn"
                    className="text-accent flex place-items-center"
                  >
                    <FaFaceSmileBeam />

                    <span className="ml-1 pt-0.5">My Page</span>
                  </Button>
                </Link>
                <Button
                  variant="header-btn"
                  className="text-primary flex place-items-center"
                  onClick={handleLogout}
                >
                  <FaRightFromBracket />

                  <span className="ml-1 pt-0.5">Logout</span>
                </Button>
              </div>
            ) : (
              // ログイン前のボタン
              <div className="flex space-x-3">
                <Link to="/signup">
                  <Button
                    variant="header-btn"
                    className="text-accent flex place-items-center"
                  >
                    <FaUserPlus />
                    <span className="ml-1 pt-0.5">Sign Up</span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="header-btn"
                    className="text-primary flex place-items-center"
                  >
                    <FaRightToBracket />
                    <span className="ml-1 pt-0.5">Login</span>
                  </Button>
                </Link>
              </div>
            )}
            {/* ログイン前後で切り替えるGナビここまで */}
          </div>
        </div>
      </div>

      {/* PC・TAB時の波部分 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280 15"
        className="hidden w-full sm:block"
      >
        <path
          d="M -40 0 Q 0 30 40 0 Q 80 30 120 0 Q 160 30 200 0 Q 240 30 280 0 Q 320 30 360 0 Q 400 30 440 0 Q 480 30 520 0 Q 560 30 600 0 Q 640 30 680 0 Q 720 30 760 0 Q 800 30 840 0 Q 880 30 920 0 Q 960 30 1000 0 Q 1040 30 1080 0 Q 1120 30 1160 0 Q 1200 30 1240 0 Q 1280 30 1320 0 L 1280 0 L 0 0 Z"
          fill="#6f9169"
        ></path>
      </svg>

      {/* SP時の波部分 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 15"
        className="w-full sm:hidden"
      >
        <path
          d="M -40 0 Q 0 30 40 0 Q 80 30 120 0 Q 160 30 200 0 Q 240 30 280 0 Q 320 30 360 0 Q 400 30 440 0 Q 480 30 520 0 Q 560 30 600 0 Q 640 30 680 0 L 640 0 L 0 0 Z"
          fill="#6f9169"
        ></path>
      </svg>

      {/* SP時のサイドバー */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-primary flex min-h-full w-60 flex-col place-content-between px-6 py-20">
          <ul className="josefin-sans space-y-4 text-5xl font-normal">
            {/* 常時表示するリンク先 */}
            <li>
              <Link to="/about" className="flex hover:text-[#d9e2c0]">
                <FaFrog />
                <span className="ml-1 pt-0.5">About</span>
              </Link>
            </li>
            <li>
              <Link to="/tea-arts" className="flex hover:text-[#d9e2c0]">
                <BiSolidFoodMenu />
                <span className="ml-0.5 pt-0.5">Menu</span>
              </Link>
            </li>

            {/* ログイン後のみTeaArtを追加表示 */}
            {isLoggedIn && (
              <li>
                <Link
                  to="/tea-arts/create"
                  className="flex hover:text-[#d9e2c0]"
                >
                  <FaCoffee />
                  <span className="ml-1 pt-0.5">Tea Art</span>
                </Link>
              </li>
            )}
          </ul>

          {/* ログイン後のボタン */}
          <div className="w-full">
            {isLoggedIn ? (
              <>
                <Link to={`/users/${user?.id}`}>
                  <Button
                    variant="header-btn"
                    className="text-accent btn-wide mb-4 flex items-center justify-center text-3xl"
                  >
                    <FaFaceSmileBeam />
                    <span className="ml-1 pt-0.5">My Page</span>
                  </Button>
                </Link>
                <Button
                  variant="header-btn"
                  className="text-primary btn-wide flex items-center justify-center text-3xl"
                  onClick={handleLogout}
                >
                  <FaRightFromBracket />
                  <span className="ml-1 pt-0.5">Logout</span>
                </Button>
              </>
            ) : (
              // ログイン前のボタン
              <>
                <Link to="/signup">
                  <Button
                    variant="header-btn"
                    className="text-accent btn-wide mb-4 flex items-center justify-center text-3xl"
                  >
                    <FaUserPlus />
                    <span className="ml-1 pt-0.5">Sign Up</span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="header-btn"
                    className="text-primary btn-wide flex items-center justify-center text-3xl"
                  >
                    <FaRightToBracket />
                    <span className="ml-1 pt-0.5">Login</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
          {/* ログイン前後で切り替えるGナビここまで */}
        </div>
      </div>
    </div>
  );
}
