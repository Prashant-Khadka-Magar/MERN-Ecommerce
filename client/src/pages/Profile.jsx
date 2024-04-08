import MyOrders from "@/components/MyOrders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { logout } from "@/slices/authSlice";
import { useLogoutMutation } from "@/slices/usersApiSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const [userLogout] = useLogoutMutation();
  const navigate = useNavigate();
  
  const logoutHandler = async () => {
    dispatch(logout());
    await userLogout();
    navigate("/");
  };
  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <div className="text-center">
          <img
            src="https://variety.com/wp-content/uploads/2023/07/ana-de-armas.jpg?w=1000"
            alt="user_profile"
            className="h-32"
          />
          <h1 className="text-xl font-semibold">Ana De Armas</h1>
          <h1>ana@gmail.com</h1>
          <Dialog>
            <DialogTrigger asChild className="mt-4">
              <Button variant="outline" className="bg-white text-black">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black border-gray-500">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                    type="email"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="avatar" className="text-right">
                    Avatar
                  </Label>
                  <Input
                    id="avatar"
                    className="col-span-3"
                    type="file"
                    accept="images/*"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="oldPassowrd" className="text-right">
                    Old Password
                  </Label>
                  <Input
                    id="oldPassowrd"
                    className="col-span-3"
                    type="password"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="newPassowrd" className="text-right">
                    New Password
                  </Label>
                  <Input
                    id="newPassowrd"
                    className="col-span-3"
                    type="password"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-white text-black">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="mt-2 max-sm:px-1">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Log Out</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-black border-gray-500 ">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. And you will be logged out.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-black">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={logoutHandler}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h1 className="text-center text-xl font-semibold">MY Orders History</h1>
        <div className="mt-2 sm:px-2 px-1">
          <MyOrders />
        </div>
      </div>
    </div>
  );
}

export default Profile;
