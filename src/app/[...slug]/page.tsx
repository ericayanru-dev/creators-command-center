'use client';

import { useParams } from 'next/navigation';
import {
  AboutPage,
  ContactPage,
  CookiesPage,
  FaqPage,
  FeaturesPage,
  PricingPage,
  PrivacyPage,
  RefundsPage,
  TermsPage,
} from '@/public';
import { UnknownRouteRedirect } from '@/components/providers/UnknownRouteRedirect';

const publicPages = {
  about: AboutPage,
  contact: ContactPage,
  cookies: CookiesPage,
  faq: FaqPage,
  features: FeaturesPage,
  pricing: PricingPage,
  privacy: PrivacyPage,
  refunds: RefundsPage,
  terms: TermsPage,
};

export default function PublicOrUnknownPage() {
  const params = useParams<{ slug: string[] }>();
  const slug = params.slug?.length === 1 ? params.slug[0] : undefined;
  const Page = slug && Object.hasOwn(publicPages, slug)
    ? publicPages[slug as keyof typeof publicPages]
    : undefined;

  return Page ? <Page /> : <UnknownRouteRedirect />;
}
