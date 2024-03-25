import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/illustration.svg";
import { useEffect } from "react";
import { useFormik } from "formik";
import { SignUpSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { helper } from "../../utils/helper";
function Main() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    dateOfBirth: "",
    aadhaarNumber: "",
    panNumber: "",
  };
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: async (values, action) => {
        console.log("values: ", values);
        // your form submission logic here(endpoint call)
        let response = await fetch(
          "http://localhost:8081/api/v1/auth/register",
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(values),
          }
        );
        let responseData = await response.json();
        if (response.ok) {
          console.log("success");
        }
        console.log("responseData: ", responseData);
        // reset form
        action.resetForm();
        helper.fireToast("success", "Registered Successfully");
        // set current user in state
        dispatch(addUser(values));
        // navigate to signup on success
        navigate("/signin");
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
            {/* BEGIN: Register Info */}
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
                  sign up to your account.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Manage all your data in one place
                </div>
              </div>
            </div>
            {/* END: Register Info */}
            {/* BEGIN: Register Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Sign Up
                </h2>
                <div className="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center">
                  Manage all your policies in one place
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="intro-x mt-8">
                    <input
                      type="text"
                      name="name"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-800">{errors.name}</p>
                    )}
                    <input
                      type="text"
                      name="address"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="123 Main street"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address && (
                      <p className="text-red-800">{errors.address}</p>
                    )}
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      // placeholder=""
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.dateOfBirth && touched.dateOfBirth && (
                      <p className="text-red-800">{errors.dateOfBirth}</p>
                    )}
                    <input
                      type="text"
                      name="aadhaarNumber"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="Aadhaar number"
                      value={values.aadhaarNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.aadhaarNumber && touched.aadhaarNumber && (
                      <p className="text-red-800">{errors.aadhaarNumber}</p>
                    )}
                    <input
                      type="text"
                      name="panNumber"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="Pan"
                      value={values.panNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.panNumber && touched.panNumber && (
                      <p className="text-red-800">{errors.panNumber}</p>
                    )}
                    <input
                      type="text"
                      name="email"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-800">{errors.email}</p>
                    )}
                    <input
                      type="password"
                      name="password"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-800">{errors.password}</p>
                    )}{" "}
                    <input
                      type="password"
                      name="confirm_password"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      placeholder="Password Confirmation"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirm_password && touched.confirm_password && (
                      <p className="text-red-800">{errors.confirm_password}</p>
                    )}
                    <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                      <button className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
                        Register
                      </button>
                    </div>
                  </div>
                </form>
                {/* <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">
                    Sign in
                  </button> */}
                <p className="pt-5">
                  Already have an account?{" "}
                  <a href="/signin" className="text-blue">
                    SignIn
                  </a>
                </p>
              </div>
            </div>
            {/* END: Register Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
