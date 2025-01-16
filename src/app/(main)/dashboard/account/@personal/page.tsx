"use server";

import UserInfoForm from "@/components/forms/UserInfoForm/UserInfoForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUserProfile } from "@/data-access/users";

export default async function DashboardAccountPersonalSlot() {
  // userProfileSchema
  const userProfile = await getCurrentUserProfile();

  console.log("userProfile", userProfile);
  if (!userProfile) {
    return (
      <Card className="flex items-center justify-center">
        No user profile found
      </Card>
    );
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Personal</CardTitle>
        <CardDescription>
          Review and update your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserInfoForm userProfile={userProfile} />
      </CardContent>
    </Card>
  );
}
