import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const EmailVerification = () => {
  const { nm } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const [verificationError, setVerificationError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Make the API request to verify the email
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/auth/${nm}/verify${window.location.search}`
        );

        if (response.ok) {
          const data = await response.json();
          secureLocalStorage.setItem("token", data?.accessToken);
            setVerificationStatus("Email verified successfully!");
            setTimeout(() => {
              navigate("/");
            }, 3000);
        } else {
          const errorData = await response.json();
          setVerificationError(`Verification failed: ${errorData}`);
        }
      } catch (error) {
        setVerificationError("Error verifying email");
      }
    };

    verifyEmail();
  }, [nm]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Email Verification
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {verificationError ? (
          <Navigate to="/" replace={true}></Navigate>
        ) : (
          <div className="text-green-500">{verificationStatus}</div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
