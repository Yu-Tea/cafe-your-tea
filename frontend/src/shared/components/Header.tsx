import { FaCoffee, FaFrog } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import {
  FaUserPlus,
  FaRightToBracket,
  FaFaceSmileBeam,
  FaRightFromBracket,
} from "react-icons/fa6";
import { useAuth } from "../../shared/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { performLogout } from "../../api/auth";

export default function Header() {
  const { isLoggedIn, logout: authLogout } = useAuth();
  const navigate = useNavigate();
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
    <div className="drawer text-base-200 z-20">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* PC時のナビバー */}
        <div className="navbar bg-primary w-full px-3 pt-4">
          {/* ハンバーガーメニュー */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="text-base-200 inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          {/* タイトル */}
          <div className="josefin-sans mx-2 block flex-1 px-2 text-4xl font-semibold sm:text-5xl">
            <Link to="/">Cafe Your Tea</Link>
          </div>
          {/* PC時ナビゲーション */}
          <div className="mr-4 hidden flex-none items-center justify-center lg:flex">
            <ul className="menu menu-horizontal josefin-sans text-3xl">
              {/* 共通ページ部分 */}
              <li>
                <Link to="#">
                  <FaFrog />
                  About
                </Link>
              </li>
              <li>
                <Link to="/menu">
                  <BiSolidFoodMenu />
                  Menu
                </Link>
              </li>
              {/* ログイン後のみ追加表示 */}
              {isLoggedIn && (
                <>
                  <li>
                    <Link to="/tea-new">
                      <FaCoffee />
                      Tea Art
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* ログイン後のGナビ */}
            {isLoggedIn ? (
              <div className="flex">
                <Link to="/mypage">
                  <Button
                    variant="header-btn"
                    className="text-accent mr-4 flex"
                  >
                    <span className="mr-2">
                      <FaFaceSmileBeam />
                    </span>
                    My Page
                  </Button>
                </Link>
                <Button
                  variant="header-btn"
                  className="text-primary flex"
                  onClick={handleLogout}
                >
                  <span className="mr-2">
                    <FaRightFromBracket />
                  </span>
                  Logout
                </Button>
              </div>
            ) : (
              // ログイン前のGナビ
              <div className="flex">
                <Link to="/signup">
                  <Button
                    variant="header-btn"
                    className="text-accent mr-4 flex"
                  >
                    <span className="mt-0.5 mr-2">
                      <FaUserPlus />
                    </span>
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="header-btn" className="text-primary flex">
                    <span className="mt-0.5 mr-2">
                      <FaRightToBracket />
                    </span>
                    Login
                  </Button>
                </Link>
              </div>
            )}
            {/* ログイン前後で切り替えるGナビここまで */}
          </div>
        </div>
      </div>

      {/* SP時のサイドバー（MVP後に正式に調整） */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-primary josefin-sans min-h-full w-80 p-4 text-3xl font-normal">
          {/* Sidebar content here */}
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Menu</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
