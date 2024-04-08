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
import { useRegisterMutation } from "@/slices/usersApiSlice";
import { ToastAction } from "@radix-ui/react-toast";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const { toast } = useToast();

  const [register, { isLoading, isError }] = useRegisterMutation();
  const navigate = useNavigate();
  const registerHandler = async (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      username.trim() === "" ||
      !avatar
    ) {
      toast({
        variant: "destructive",
        title: "Please enter all the fields",
        description: "You must fill up correct imfo in the form",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    const userData = new FormData();

    userData.append("username", username);
    userData.append("email", email);
    userData.append("avatar", avatar);
    userData.append("password", password);

    try {
      const res = await register(userData).unwrap();
      toast({
        className: " text-white bg-green-400 border-gray-500",
        description: "You have been registered successfully",
      });
      navigate(`/verify-otp/${res._id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return (
    <div className="min-h-[85vh] flex justify-center items-center sm:my-4">
      <Card className="mx-auto max-w-sm max-sm:mx-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Enter the asked credentials to create a new account to start
            shopping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={registerHandler}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Jon Doe"
                  required
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile</Label>
                <Input
                  id="avatar"
                  required
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
              {!isLoading ? (
                <Button className="w-full" type="submit">
                  Register
                </Button>
              ) : (
                <Button className="w-full" disabled>
                  <Loader />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-sm">
          <span>Have Account?</span>
          <Link to="/login" className="ml-2 underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
