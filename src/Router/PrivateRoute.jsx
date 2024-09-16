import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../Components/hooks/useAuth";
import LoadingAnimation from "../Shared/LoadingAnimation";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // const navigate = useNavigate();
  const location = useLocation();
  if (loading) {
    return <LoadingAnimation />;
  }

  if (user) {
    return children;
  } else {
    return <Navigate state={{ from: location }} replace to="/login"></Navigate>;
  }
};

export default PrivateRoute;
