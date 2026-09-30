import { SignupPage } from "@/features/auth/pages/SignupPage";
import { GuestOnly } from "@/components/providers/RouteGuards";

export default function Page() {
  return (
    <GuestOnly>
      <SignupPage />
    </GuestOnly>
  );
}
