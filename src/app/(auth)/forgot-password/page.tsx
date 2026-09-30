import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { GuestOnly } from "@/components/providers/RouteGuards";

export default function Page() {
  return (
    <GuestOnly>
      <ForgotPasswordPage />
    </GuestOnly>
  );
}
