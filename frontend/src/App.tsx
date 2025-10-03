import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./shared/contexts/AuthContext";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import HomePage from "./pages/home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import UserPage from "./pages/userPages/UserPage";
import UserEditPage from "./pages/userPages/UserEditPage";

import Menu from "./pages/menu/Menu";

import TeaArtNew from "./pages/teaArts/New";
import TeaArtEdit from "./pages/teaArts/Edit";
import TeaArtDetail from "./pages/teaArts/TeaArtDetail";
import NotFoundPage from "./pages/errors/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/users/edit" element={<UserEditPage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/tea-arts/:id" element={<TeaArtDetail />} />
            <Route path="/tea-arts/new" element={<TeaArtNew />} />
            <Route path="/tea-arts/edit" element={<TeaArtEdit />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
