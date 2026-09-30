import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { GuestOnly } from "@/components/providers/RouteGuards";

export default function Page() {
  return (
    <GuestOnly>
      <ResetPasswordPage />
    </GuestOnly>
  );
}
