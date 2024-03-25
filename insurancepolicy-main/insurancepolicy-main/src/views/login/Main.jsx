import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/illustration.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignInSchema } from "../../schemas";
import { helper } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/users";
function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    type: "",  //changes made "user"
  };
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignInSchema,
      onSubmit: async (values, action) => {
        console.log("values: ", values);
        // your form submission logic here(endpoint call) //// fixed
        let response = await fetch("http://localhost:8081/api/v1/auth/login", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(values),
        });
        let responseData = await response.json();
        if (response.ok) {
          console.log("success");
          localStorage.setItem("jwt", responseData.jwt);
        }
        console.log("responseData: ", responseData);
        // reset form
        action.resetForm();
        helper.fireToast("success", "Login success");
        // set current user in state
        dispatch(addUser(responseData));
        // navigate to signup on success
        navigate("/dashboard");
      },
    });
  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-6"
                  src={logoUrl}
                />
                <span className="text-white text-lg ml-3"> G & S INSURANCE </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Manage all your policies in one place
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Sign In
                </h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  A few more clicks to sign in to your account. Manage all your
                  policies in one place
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="intro-x mt-8">
                    <input
                      type="email"
                      name="email"
                      className="intro-x login__input form-control py-3 px-4 block"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-800">{errors.email}</p>
                    )}
                    <input
                      name="password"
                      type="password"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-800">{errors.password}</p>
                    )}
                    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                      <button
                        type="submit"
                        className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
                <p className="mt-5">
                  Don't have an account?{" "}
                  <a className="text-primary" href="/">
                    SignUp
                  </a>
                </p>
                {/* <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4"> */}
                {/* <div className="flex items-center mr-auto">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="form-check-input border mr-2"
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="">Forgot Password?</a>
                </div> */}
                <div className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                  By signin up, you agree to our
                  <a className="text-primary dark:text-slate-200" href="">
                    Terms and Conditions
                  </a>
                  &
                  <a className="text-primary dark:text-slate-200" href="">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
