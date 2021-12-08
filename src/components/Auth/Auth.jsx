import { useState } from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { currentUser, signin, signup } = useAuth();

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    if (validateEmail(email)) {
      if (password.trim().length > 0) {
        if (isSignup) {
          if (
            confirmPass.trim().length > 0 &&
            confirmPass.trim() === password.trim()
          ) {
            let res = await signup(email, password);
            if (res.success) {
              alert(res.message);
              setIsSignup(false);
            } else {
              alert(res.message);
            }
          } else {
            alert("Enter valid confirm password");
          }
        } else {
          signin(email, password);
        }
      } else {
        alert("Enter valid password");
      }
    } else {
      alert("Enter valid email");
    }
  };

  return (
    <>
      {currentUser?.id.length > 0 && <Redirect to="/" />}
      {currentUser?.id.length === 0 && (
        <div className="w-full md:w-1/2 py-24 md:py-32 flex flex-col items-center justify-center bg-secondary rounded-xl">
          <h1 className="text-xl font-semibold mb-8">
            {isSignup ? "Sign up" : "Sign in"}
          </h1>
          <input
            className="my-2 p-2 w-80 rounded text-black outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="my-2 p-2 w-80 rounded text-black outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup && (
            <input
              className="my-2 p-2 w-80 rounded text-black outline-none"
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          )}
          <button
            className="my-2 py-2 px-4 bg-red-600 rounded text-sm"
            onClick={handleSubmit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </button>
          {isSignup ? (
            <p className="my-2">
              Already registered?{" "}
              <span
                className="cursor-pointer text-red-500"
                onClick={() => setIsSignup(false)}
              >
                Sign in
              </span>
            </p>
          ) : (
            <p className="my-2">
              Not registered yet?{" "}
              <span
                className="cursor-pointer text-red-500"
                onClick={() => setIsSignup(true)}
              >
                Signup
              </span>
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Auth;
