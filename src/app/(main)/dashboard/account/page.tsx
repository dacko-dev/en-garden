"use client";

import NewAddressDialog from "@/components/NewAddressDialog/NewAddressDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

import { Trash } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function DashboardAccountPage() {
  const infoForm = useForm();
  const user = useKindeAuth();
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Account</h1>
        <p>View and edit your account details</p>
      </div>
      <div className="mt-8 flex flex-col lg:grid lg:grid-cols-2 gap-8">
        <Card className="">
          <CardHeader>
            <CardTitle>Personal</CardTitle>
            {/* <CardDescription>
              Deploy your new project in one-click.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Form {...infoForm}>
              <FormField
                control={infoForm.control}
                name="firstName"
                render={() => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={infoForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormItem className="col-span-full">
                <FormLabel>Phone</FormLabel>
                <FormControl className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">🇺🇸</span>
                    </div>
                    <Input {...infoForm.register("phoneNumber")} />
                    <Button variant={"secondary"}>Verify</Button>
                  </div>
                </FormControl>
              </FormItem>

              <div className="mt-4 flex items-center justify-end col-span-full">
                <Button>Save</Button>
              </div>
            </Form>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            {/* <CardDescription>
              Deploy your new project in one-click.
            </CardDescription> */}
          </CardHeader>
          <CardContent></CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Addresses
              <NewAddressDialog />
            </CardTitle>

            {/* <CardDescription>
              Deploy your new project in one-click.
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="border border-dashed flex items-center flex-col justify-center rounded-md p-10 py-16">
              <p className="font-light opacity-70">No addresses</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Button variant={"secondary"}>
              <span>Change Password</span>
            </Button>

            <Button variant={"secondary"}>Suspend Account</Button>

            <Button variant={"destructive"}>
              <span>Delete Account</span>
              <Trash />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
