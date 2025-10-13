import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-secondary mx-4 sm:mx-10 mt-5 flex flex-col-reverse items-center justify-between gap-y-4 border-t-1 border-secondary/30 px-0 sm:px-2 py-8 sm:mt-8 sm:flex-row ">
      <div className="text-sm">© 2025 Cafe Your Tea. All rights reserved.</div>
      <div className="flex gap-x-5 text-sm">
        <Link to="/teams" className="hover:text-secondary/70">
          利用規約
        </Link>
        <Link to="/privacy" className="hover:text-secondary/70">
          プライバシーポリシー
        </Link>
        <Link to="/contact" className="hover:text-secondary/70">
          お問い合わせ
        </Link>
      </div>
    </div>
  );
};

export default Footer;
