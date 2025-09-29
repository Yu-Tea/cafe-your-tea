import { FaCoffee, FaFrog } from "react-icons/fa";
import { FaUserPlus, FaRightToBracket } from "react-icons/fa6";
import { useUser } from "../contexts/UserContext";
import { FaUser } from "react-icons/fa6";
import { FaRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useUser();

  // デバッグ用（後で削除）
  console.log("Header - user:", user);
  console.log("Header - loading:", loading);

  // ログアウト処理
  const handleLogout = async () => {
    await logout();
    navigate("/", {
      state: { message: "ログアウトしました" },
    });
  };

  // ローディング中の表示
  if (loading) {
    return (
      <div className="drawer text-base-200 z-20">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-primary w-full px-3 pt-4">
            <div className="josefin-sans mx-2 block flex-1 px-2 text-4xl font-semibold sm:text-5xl">
              <Link to="/">Cafe Your Tea</Link>
            </div>
            <div className="mr-4 hidden flex-none items-center justify-center lg:flex">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {user ? (
              // ログイン後の表示
              <div className="flex items-center gap-4">
                <span className="text-base-200 text-lg">
                  こんにちは、{user.name}さん
                </span>
                <Link to="/mypage">
                  <Button
                    variant="header-btn"
                    className="text-accent mr-2 flex"
                  >
                    <span className="mt-0.5 mr-2">
                      <FaUser />
                    </span>
                    マイページ
                  </Button>
                </Link>
                <Button
                  variant="header-btn"
                  className="text-primary flex"
                  onClick={handleLogout}
                >
                  <span className="mt-0.5 mr-2">
                    <FaRightFromBracket />
                  </span>
                  ログアウト
                </Button>
              </div>
            ) : (
              // ログイン前の表示
              <>
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
              </>
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
};

export default Header;
