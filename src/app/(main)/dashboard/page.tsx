import { redirect } from "next/navigation";

export default function page() {
  // https://nextjs.org/docs/app/api-reference/functions/redirect
  return redirect("/dashboard/account");
}
