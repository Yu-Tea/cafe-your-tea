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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { performLogout } from "../../api/auth";

export default function Header() {
  const { isLoggedIn, logout: authLogout, user } = useAuth();
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
    <div className="drawer drawer-end text-base-200 z-20">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* PC時のナビバー */}
        <div className="navbar bg-primary w-full px-0.5 py-4">
          {/* ロゴ */}
          <div className="mx-2 sm:mx-4 block flex-1">
            <Link to="/">
              <img
                src="/logo.svg"
                alt="Cafe Your Tea"
                className="max-w-[250px] hover:opacity-90 sm:max-w-[340px]"
              />
            </Link>
          </div>

          {/* ハンバーガーメニュー */}
          <div className="flex-none lg:hidden mr-3">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-outline"
            >
              <IoMdMenu size={35} />
            </label>
          </div>

          {/* PC時ナビゲーション */}
          <div className="mx-4 hidden flex-none items-center justify-center lg:flex">
            <div className="josefin-sans mr-5.5 flex space-x-5.5 text-3xl pt-0.5">
              <Link to="/about" className="hover:text-[#d9e2c0] flex">
                <FaFrog />
                <span className="ml-1 pt-0.5">About</span>
              </Link>
              <Link to="/tea-arts" className="hover:text-[#d9e2c0] flex">
                <BiSolidFoodMenu />
                <span className="ml-0.5 pt-0.5">Menu</span>
              </Link>
              {/* ログイン後のみ追加表示 */}
              {isLoggedIn && (
                <Link
                  to="/tea-arts/create"
                  className="hover:text-[#d9e2c0] flex"
                >
                  <FaCoffee />
                  <span className="ml-1 pt-0.5">Tea Art</span>
                </Link>
              )}
            </div>

            {/* ログイン後のGナビ */}
            {isLoggedIn ? (
              <div className="flex space-x-3">
                <Link to={`/users/${user?.id}`}>
                  <Button variant="header-btn" className="text-accent flex">
                    <FaFaceSmileBeam />

                    <span className="ml-1 pt-0.5">My Page</span>
                  </Button>
                </Link>
                <Button
                  variant="header-btn"
                  className="text-primary flex"
                  onClick={handleLogout}
                >
                  <FaRightFromBracket />

                  <span className="ml-1 pt-0.5">Logout</span>
                </Button>
              </div>
            ) : (
              // ログイン前のGナビ
              <div className="flex space-x-3">
                <Link to="/signup">
                  <Button variant="header-btn" className="text-accent flex">
                    <FaUserPlus />
                    <span className="ml-1 pt-0.5">Sign Up</span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="header-btn" className="text-primary flex">
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
