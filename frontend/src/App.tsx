import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./shared/contexts/AuthContext";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import HomePage from "./pages/home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import UserPage from "./pages/userPages/UserPage";
import UserEditPage from "./pages/userPages/UserEditPage";

import TeaArtsListPage from "./pages/teaArts/TeaArtsListPage";
import TeaArtDetailPage from "./pages/teaArts/TeaArtDetailPage";
import TeaArtCreatePage from "./pages/teaArts/TeaArtCreatePage";
import TeaArtEditPage from "./pages/teaArts/TeaArtEditPage";
import TeaArtsByTagPage from "./pages/teaArts/TeaArtsByTagPage";

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
            <Route path="/users/:id/edit" element={<UserEditPage />} />
            <Route path="/tea-arts" element={<TeaArtsListPage />} />
            <Route path="/tea-arts/:id" element={<TeaArtDetailPage />} />
            <Route path="/tea-arts/create" element={<TeaArtCreatePage />} />
            <Route path="/tea-arts/:id/edit" element={<TeaArtEditPage />} />
            <Route path="/tea-arts/tag/:tagName" element={<TeaArtsByTagPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
