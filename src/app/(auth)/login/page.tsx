import { LoginPage } from "@/features/auth/pages/LoginPage";
import { GuestOnly } from "@/components/providers/RouteGuards";

export default function Page() {
  return (
    <GuestOnly>
      <LoginPage />
    </GuestOnly>
  );
}
