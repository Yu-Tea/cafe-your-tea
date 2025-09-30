import { FaCoffee, FaFrog } from "react-icons/fa";
import {
  FaUserPlus,
  FaRightToBracket,
  FaFaceSmileBeam,
  FaRightFromBracket,
} from "react-icons/fa6";
import { useAuth } from "../../shared/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { performLogout } from "../../utils/api";

export default function Header() {
  const { user, isLoggedIn, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  // 🎯 デバッグログを追加
  console.log("🔍 Header rendering:", {
    user: user?.name || "null",
    isLoggedIn,
    timestamp: new Date().toISOString(),
  });
  // 🎯 ログアウト処理のハンドラー
  const handleLogout = async () => {
    try {
      console.log("🚀 ログアウト処理開始...");

      // バックエンドにログアウトリクエスト + フロントエンド状態クリア
      const success = await performLogout();

      if (success) {
        console.log("✅ ログアウト成功");

        // useAuthのlogout関数を呼び出して認証状態をクリア
        authLogout();

        // ホームページに遷移
        navigate("/");

        // 成功メッセージ（オプション）
        // alert('ログアウトしました');
      } else {
        console.log(
          "⚠️ ログアウトでエラーが発生しましたが、状態はクリアしました"
        );

        // エラーが発生してもフロントエンドの状態はクリア
        authLogout();
        navigate("/");
      }
    } catch (error) {
      console.error("❌ ログアウト処理でエラー:", error);

      // エラーが発生してもフロントエンドの状態はクリア
      authLogout();
      navigate("/");

      // エラーメッセージ（オプション）
      // alert('ログアウト処理でエラーが発生しましたが、ログアウトしました');
    }
  };

  return (
    <div className="drawer text-base-200 z-20">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
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
          {/* PC時ナビメニュー */}
          <div className="mr-4 hidden flex-none items-center justify-center lg:flex">
            <ul className="menu menu-horizontal josefin-sans text-3xl">
              {/* Navbar menu content here */}
              <li>
                <Link to="#">
                  <FaFrog />
                  About
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaCoffee />
                  Menu
                </Link>
              </li>
            </ul>
            {/* ログイン前後で切り替えるボタンここから */}
            {isLoggedIn ? (
              <div className="flex">
                <Link to="/signup">
                  <Button
                    variant="header-btn"
                    className="text-accent mr-4 flex"
                  >
                    <span className="mt-0.5 mr-2">
                      <FaFaceSmileBeam />
                    </span>
                    {user?.name}
                  </Button>
                </Link>
                <Button
                  variant="header-btn"
                  className="text-primary flex"
                  onClick={handleLogout} // 🎯 ログアウト処理を実行
                >
                  <span className="mt-0.5 mr-2">
                    <FaRightFromBracket />
                  </span>
                  Logout
                </Button>
              </div>
            ) : (
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
            {/* ログイン前後で切り替えるボタンここまで */}
          </div>
        </div>
      </div>
      {/* サイドバー（MVP後に正式に調整） */}
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
