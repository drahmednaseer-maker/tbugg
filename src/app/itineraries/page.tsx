import Login from "@/features/studio/Login";
import Studio from "@/features/studio/Studio";
import { passcode, signedIn } from "@/features/studio/server";
export const dynamic = "force-dynamic";
export default async function Page() {
  if (passcode() && !(await signedIn())) return <Login />;
  return <Studio canShare={!!passcode()} bank={passcode() ? (process.env.ITINERARY_BANK ?? "").replace(/\\n/g, "\n") : ""} />;
}
