import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { rootState } from "../redux/store";

interface WithoutAuthProps {
  component: React.ComponentType;
}

const WithoutAuth: React.FC<WithoutAuthProps> = ({ component: Component }) => {
  const userInfo = useSelector((state: rootState) => state.user.userData);

  return userInfo ? <Navigate to="/" /> : <Component />;
};

export default WithoutAuth;
