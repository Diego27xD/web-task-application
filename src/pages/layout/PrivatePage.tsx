import { Navigate } from "react-router-dom";
import { Loader } from "rsuite";
import { useAuthStore } from "../../presentation/store/useAuthStore";
import { useEffect, type JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authStore = useAuthStore();
  const { status } = authStore;

  useEffect(() => {
    authStore.checkStatus();
  }, []);

  if (status == "checking") {
    return <Loader center content="Verificando sesión..." />;
  }

  if (status == "unauthenticated") {
    return <Navigate to="/" replace />;
  }
  return children;
};
