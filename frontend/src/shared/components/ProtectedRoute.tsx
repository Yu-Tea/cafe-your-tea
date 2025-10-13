import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StatusDisplay from "./StatusDisplay";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  showLoading?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAuth = true,

  showLoading = true,
}: ProtectedRouteProps) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  // ローディング中の表示
  if (loading && showLoading) {
    return <StatusDisplay type="loading" />;
  }

  // ゲストがログイン必要なページに直接アクセスした場合はログインページに飛ばす
  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
