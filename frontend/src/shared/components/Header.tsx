import { FaCoffee } from "react-icons/fa";
import { FaFrog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "./Button";

const Header = () => {
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
            <Button variant="header-btn" className="text-primary flex">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google logo"
                className="mt-1 mr-1 h-5 w-5"
                loading="lazy"
              />
              Login with Google
            </Button>
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
