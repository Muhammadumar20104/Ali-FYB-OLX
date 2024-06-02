import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { selectData } from "../authSlice";
import { useEffect } from "react";

export default function ForgotPassword() {
  const user = useSelector(selectData);
  const navigate = useNavigate();
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendEmail = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/auth/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await response.json();
      if (response.ok) {
        alert.success(userData.message);
        navigate("/otp", { state: { email: data?.email } });
        // You can add logic here to redirect the user or show a success message.
      } else {
        alert.error(userData.message);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  useEffect(() => {
    if (user.email) {
      verifyEmail();
    }
  }, []);

  const verifyEmail = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: user.email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/auth/verifyemail", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 200) {
          alert.success(result.message);
        } else {
          alert.error(result.message);
        }
      })
      .catch((error) => console.log("error", error));
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
            {user?.email ? "Confirm email" : "Enter email to reset password"}
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
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Invalid email",
                    },
                  })}
                  value={user?.email}
                  disabled={user?.email}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {!user.email && errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              {user?.email ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    verifyEmail();
                  }}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Email
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Email
                </button>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
