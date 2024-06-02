import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

import { useEffect } from "react";

export default function OTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const alert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/login");
    }
  }, []);
  const sendEmail = async (data) => {
    data.email = location?.state?.email;
    try {
      const response = await fetch("http://localhost:8080/auth/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await response.json();
      navigate("/new-password", { state: { email: location?.state?.email } });

      if (response.ok) {
        alert.success(userData.message);
      } else {
        alert.error(userData.message);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/ecommerce.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter your OTP to confirm
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit(sendEmail)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter OTP
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  {...register("otp", {
                    required: "OTP is required",
                  })}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.otp && (
                  <p className="text-red-500">{errors.otp.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
