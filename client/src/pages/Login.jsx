import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { setCredentials } from "@/slices/authSlice";
import { useLoginMutation } from "@/slices/usersApiSlice";
import { ToastAction } from "@radix-ui/react-toast";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const loginHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const res = await login(loginData);

      if (res.error) {
        toast({
          variant: "destructive",
          title: res.error.data.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        console.log("Error::", res.error);
      } else {
        dispatch(setCredentials(res.data));
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.log("Error::", error);
    }
  };

  return (
    <div className="h-[85vh] flex justify-center items-center sm:my-4">
      <Card className="mx-auto max-w-sm max-sm:mx-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLoading ? (
              <Button className="w-full" type="submit" onClick={loginHandler}>
                Login
              </Button>
            ) : (
              <Button className="w-full" disabled>
                <Loader />
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-sm">
          <span>No Account?</span>
          <Link to="/register" className="ml-2 underline">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
