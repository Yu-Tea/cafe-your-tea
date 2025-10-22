import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { useScrollToTop } from "./shared/hooks/useScrollToTop";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import HomePage from "./pages/home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

import About from "./pages/about/About";
import Teams from "./pages/teams/Teams";
import Privacy from "./pages/privacy/Privacy";
import Contact from "./pages/contact/Contact";

import UserPage from "./pages/userPages/UserPage";
import UserEditPage from "./pages/userPages/UserEditPage";

import TeaArtsListPage from "./pages/teaArts/TeaArtsListPage";
import TeaArtDetailPage from "./pages/teaArts/TeaArtDetailPage";
import TeaArtCreatePage from "./pages/teaArts/TeaArtCreatePage";
import TeaArtEditPage from "./pages/teaArts/TeaArtEditPage";
import TeaArtsByTagPage from "./pages/teaArts/TeaArtsByTagPage";

import NotFoundPage from "./pages/errors/NotFoundPage";

function App() {
  useScrollToTop();
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="mt-18 flex flex-1 flex-col">
          <Routes>
            {/* 公開ルート */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tea-arts" element={<TeaArtsListPage />} />
            <Route path="/tea-arts/:id" element={<TeaArtDetailPage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route
              path="/tea-arts/tag/:tagName"
              element={<TeaArtsByTagPage />}
            />

            {/* ログイン必須ルート */}
            <Route
              path="/users/:id/edit"
              element={
                <ProtectedRoute>
                  <UserEditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tea-arts/create"
              element={
                <ProtectedRoute>
                  <TeaArtCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tea-arts/:id/edit"
              element={
                <ProtectedRoute>
                  <TeaArtEditPage />
                </ProtectedRoute>
              }
            />

            {/* 404ページ */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
