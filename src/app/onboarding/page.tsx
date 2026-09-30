import { OnboardingGuard } from "@/components/providers/RouteGuards";
import { OnboardingPage } from "@/features/onboarding/pages/OnboardingPage";

export default function Page() {
  return (
    <OnboardingGuard>
      <OnboardingPage />
    </OnboardingGuard>
  );
}
