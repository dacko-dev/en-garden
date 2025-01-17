import { CommissionApiResponse } from "@/app/api/commissions/route";
import axios from "axios";

export async function getCurrentUserCommissionsClient({
  user_id,
}: {
  user_id?: string;
}) {
  const commissions = axios.get<CommissionApiResponse>(
    `/api/commissions?user_id=${user_id}`
  );
  return commissions;
}
