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
          <div className="mx-2 block flex-1 sm:mx-4">
            <Link to="/">
              <img
                src="/logo.png"
                alt="Cafe Your Tea"
                className="max-w-[280px] hover:opacity-85 sm:max-w-[340px]"
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
          <div className="mx-4 hidden flex-none place-items-center lg:flex">
            <div className="josefin-sans mr-5.5 flex space-x-5.5 pt-1 text-3xl">
              <Link to="/about" className="flex hover:text-[#d9e2c0]">
                <FaFrog />
                <span className="ml-1 pt-0.5">About</span>
              </Link>
              <Link to="/tea-arts" className="flex hover:text-[#d9e2c0]">
                <BiSolidFoodMenu />
                <span className="ml-0.5 pt-0.5">Menu</span>
              </Link>
              {/* ログイン後のみ追加表示 */}
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

      {/* SP時のサイドバー */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-primary flex min-h-full w-60 flex-col place-content-between px-6 py-20">
          <ul className="josefin-sans space-y-4 text-5xl font-normal">
            {/* Sidebar content here */}
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
            {/* ログイン後のみ追加表示 */}
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
