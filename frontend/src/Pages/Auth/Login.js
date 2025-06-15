import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import Lottie from "lottie-react";
import phoneAnimation from "../../assets/images/PhoneAnimation.json";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/features/login/authAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, token, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.error("Email, Username or Enrollment is required", {
        position: "bottom-right",
        className: "foo-bar",
      });
    } else if (!password) {
      toast.error("Password is required", {
        position: "bottom-right",
        className: "foo-bar",
      });
    } else {
      dispatch(loginUser({ email, password }));
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/feed");
    }
    if (error) {
      console.log(error);
      toast.error(error, {
        position: "bottom-right",
        className: "foo-bar",
      });
    }
  }, [token, error, navigate]);

  return (
    <div className="h-screen w-full 2xl:px-24 flex items-center bg-white">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:h-4/5  w-full px-10 flex md:flex-row md:gap-0 gap-2 flex-col-reverse">
          <div className="md:w-1/2 h-full flex flex-col justify-center items-center">
            <div className="w-[80%] mx-auto">
              <Lottie animationData={phoneAnimation} />
            </div>
            <h1 className="text-4xl font-bold">Campus Link</h1>
            <p className="font-extrabold text-xl text-slate-900">
              Join Us Today
            </p>
          </div>
          <div className="h-full w-1/2 border-l-[1px] border-zinc-200 flex flex-col justify-center items-center gap-3">
            <form
              onSubmit={handleSubmit}
              className="h-4/5 w-1/2 rounded-sm border-zinc-200 border-[1px] flex flex-col items-center justify-center gap-5"
            >
              <input
                type="text"
                className="bg-zinc-100 border-zinc-400 border-[1px] outline-none w-4/5 h-8 rounded-md md:text-sm text-xs text-gray-800 pl-2 font-sans"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="bg-zinc-100 border-zinc-400 border-[1px] outline-none w-4/5 h-8 rounded-md text-sm text-gray-800 pl-2  font-sans"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-4/5 h-8 rounded-md text-sm bg-slate-800 text-white hover:bg-slate-700 active:scale-95"
              >
                Log in
              </button>
              <div className="w-4/5 flex items-center justify-center">
                <div className="bg-zinc-300 h-[1px] w-[43%]"></div>
                <p className="p-3 font-sans text-zinc-400 text-xs">OR</p>
                <div className="bg-zinc-300 h-[1px] w-[43%]"></div>
              </div>
              <a
                href="/reset-password"
                className="text-sky-600 font-serif text-xs"
              >
                Forgot Password?
              </a>
            </form>
            <div className="w-1/2 h-[10%] border-[1px] border-zinc-300 rounded-sm flex items-center justify-center">
              <p className="font-sans text-sm">
                Don't have an account?{" "}
                <a href="/register" className="text-sky-600">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
