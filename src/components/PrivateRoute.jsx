import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      component={
        currentUser.id.length > 0 ? Component : () => <Redirect to="/auth" />
      }
    />
  );
};

export default PrivateRoute;
