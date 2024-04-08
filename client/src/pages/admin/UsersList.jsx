import { Button } from "@/components/ui/button";
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

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function UsersList() {
  return (
    <div className="mx-2 mt-2">
      <div className="flex justify-between w-full items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users (10)</h2>
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <Input placeholder="search users..." />
        <Table className="border rounded-md my-2">
          <TableHeader>
            <TableRow className="text-lg">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>isAdmin</TableHead>
              <TableHead>Update</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="mt-2">
              <TableCell>Prashant Magar</TableCell>
              <TableCell>prashant@gmail.com</TableCell>
              <TableCell>✔</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-black border-gray-500 ">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will change the status of the user
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-black">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              <TableCell>❌</TableCell>
            </TableRow>
            <TableRow className="mt-2">
              <TableCell>Prashant Magar</TableCell>
              <TableCell>prashant@gmail.com</TableCell>
              <TableCell>❌</TableCell>
              <TableCell>
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </TableCell>
              <TableCell>✔</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-end gap-x-2 mr-2 mt-2">
          <Button variant="outline">Prev</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
