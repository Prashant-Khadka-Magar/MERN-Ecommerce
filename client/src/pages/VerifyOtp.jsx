import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyMutation } from "@/slices/usersApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Loader from "@/components/Loader";

function VerifyOtp() {
  const { id } = useParams();
  const [otpInput, setOtpInput] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [verify, { isLoading, isError }] = useVerifyMutation();

  const verifyHandler = async () => {
    if (otpInput.trim() === "") {
      toast({
        variant: "destructive",
        title: "PLEASE ENTER OTP",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    try {
      const res = await verify({ id, data: { otp: otpInput } });
      if (res.error) {
        console.log(res.error);
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  useEffect(() => {}, [id]);

  return (
    <div className="overflow-x-hidden h-[75vh] flex flex-col gap-y-4 justify-center items-center text-center">
      <h1 className="text-2xl font-semibold">OTP Verification</h1>
      <p>
        One Time Password(OTP) has been sent via Email to{" "}
        <span className="block font-semibold text-emerald-500">
          prashant@gmail.com
        </span>
      </p>
      <p className="text-red-400">Check spam if not found in inbox</p>
      {/* <InputOTP
        maxLength={6}
        render={({ slots }) => (
          <>
            <InputOTPGroup>
              {slots.slice(0, 3).map((slot, index) => (
                <InputOTPSlot key={index} {...slot} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {slots.slice(3).map((slot, index) => (
                <InputOTPSlot key={index + 3} {...slot} />
              ))}
            </InputOTPGroup>
          </>
        )}
      /> */}
      <input
        type="text"
        value={otpInput}
        onChange={(e) => setOtpInput(e.target.value)}
        className="text-black"
      />
      <div className="text-end text-xs ">
        <span>Resend Otp in 00:59</span>
      </div>
      {!isLoading ? (
        <Button onClick={verifyHandler}>Verify OTP</Button>
      ) : (
        <Button disabled>
          <Loader />
        </Button>
      )}
    </div>
  );
}

export default VerifyOtp;
