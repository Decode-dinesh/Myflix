import { useContext, createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ id: "" });
  const history = useHistory();

  useEffect(() => {
    const autoLogin = async () => {
      let token = localStorage.getItem("token");
      if (token) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
        let { data } = await axios.post("https://my-flix-backend.herokuapp.com/signinWithID", config);

        if (data.message === "jwt expired") {
          localStorage.clear();
          history.push("/auth");
        } else {
          setCurrentUser(data);
        }
      }
    };
    autoLogin();
  }, [history]);

  const signin = async (email, password) => {
    let res = await axios.post("https://my-flix-backend.herokuapp.com/signin", {
      email,
      password,
    });
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } else {
      alert(res.data.message);
    }
  };

  const signup = async (email, password) => {
    let { data } = await axios.post("https://my-flix-backend.herokuapp.com/signup", {
      email,
      password,
    });
    return data;
  };

  const signout = () => {
    localStorage.clear();
    setCurrentUser({ id: "" });
    window.location.reload();
  };

  const value = {
    currentUser,
    setCurrentUser,
    signin,
    signup,
    signout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
