import {
  UserCheck,
  UserRoundX,
} from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, registerUser, toggleUser } from "@/services/auth.services";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "./ui/dialog";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface ListItem {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  link: string;
}

interface List2Props {
  heading?: string;
  items?: ListItem[];
  className?: string;
}

const UserList = ({
  heading = "User List",
  className,
}: List2Props) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
  })
  const users = data?.data?.data;

  const { mutate: userUpdate } = useMutation({
    mutationKey: ["toggle-user"],
    mutationFn: (userId) => toggleUser(userId),
    onSuccess: () => {
      refetch();
      toast("updated user successfully");
    },
    onError: (error) => {
      toast("Error while updating the user");
      console.log("error while udating user", error);
    }
  })

  const { mutate: register } = useMutation({
    mutationKey: ["user-registration"],
    mutationFn: () => registerUser(formData),
    onSuccess: (data) =>{
      try {
        console.log(data);
        toast("Registered successfully!");
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log(error);
      toast("Error while registration, Please try again later!");
    }
  })

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    register()
  }

  const handleActiveDeactive = (userId: any) => {
    console.log("ARe you getting cliecked!")
    userUpdate(userId);
  }
  return (
    <section className={cn("py-32", className)}>
      <div className="container px-0 md:px-8">
        <div className="flex justify-between">
          <h1 className="mb-10 px-4 text-3xl font-semibold md:mb-14 md:text-4xl">
            {heading}
          </h1>
          <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Create User</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
              <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
              </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col">
          <Separator />
          {isLoading ? 
            <h1>Loading...</h1>
          : users ? users?.map((user: any) => (
            <React.Fragment key={user?._id}>
              <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-4">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div>
                  <Button onClick={() => handleActiveDeactive(user?._id)}>
                    { user?.isActive ? 
                      <UserCheck className="text-green-500" /> 
                      : <UserRoundX className="text-red-500" />
                    }
                  </Button>
                </div>
              </div>
              <Separator />
            </React.Fragment>
          )) : <h1>No Users</h1>}
        </div>
      </div>
    </section>
  );
};

export { UserList };
