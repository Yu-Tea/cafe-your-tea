import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./shared/contexts/AuthContext";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import HomePage from "./pages/home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import MyPage from "./pages/mypages/MyPage";
import MyPageForm from "./pages/mypages/MyPageForm";
import Menu from "./pages/menu/Menu";
import TeaArtNew from "./pages/teaArts/New";
import TeaArtEdit from "./pages/teaArts/Edit";

function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage_form" element={<MyPageForm />} />
            <Route path="/tea_new" element={<TeaArtNew />} />
            <Route path="/tea_edit" element={<TeaArtEdit />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
