"use client";

import NextLink from "next/link";
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import type { ComponentProps, MouseEventHandler, ReactNode } from "react";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  to: string;
};

export function Link({ to, ...props }: LinkProps) {
  return <NextLink href={to} {...props} />;
}

type NavLinkProps = Omit<LinkProps, "className" | "children"> & {
  end?: boolean;
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
  children?: ReactNode | ((props: { isActive: boolean; isPending: boolean }) => ReactNode);
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function NavLink({ to, end = false, className, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
  const linkClassName =
    typeof className === "function" ? className({ isActive, isPending: false }) : className;
  const content =
    typeof children === "function" ? children({ isActive, isPending: false }) : children;

  return (
    <NextLink href={to} className={linkClassName} {...props}>
      {content}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (to: string, options: { replace?: boolean; state?: unknown } = {}) => {
    if (options.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function useLocation() {
  const pathname = usePathname();
  const searchParams = useNextSearchParams();
  const query = searchParams.toString();

  return {
    pathname,
    search: query ? `?${query}` : "",
    hash: "",
    key: pathname,
  };
}

export function useParams<T extends Record<string, string> = Record<string, string>>() {
  return useNextParams() as T;
}

export function useSearchParams(): [
  URLSearchParams,
  (next: URLSearchParams | Record<string, string> | string, replace?: boolean) => void,
] {
  const router = useRouter();
  const pathname = usePathname();
  const currentParams = useNextSearchParams();
  const currentQuery = currentParams.toString();

  const setSearchParams = (
    next: URLSearchParams | Record<string, string> | string,
    replace = false,
  ) => {
    const params = new URLSearchParams(currentQuery);
    if (typeof next === "string" || next instanceof URLSearchParams) {
      const query = next.toString().replace(/^\?/, "");
      const url = `${pathname}${query ? `?${query}` : ""}`;
      if (replace) router.replace(url);
      else router.push(url);
      return;
    }

    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    const query = params.toString();
    const url = `${pathname}${query ? `?${query}` : ""}`;
    if (replace) router.replace(url);
    else router.push(url);
  };

  return [new URLSearchParams(currentQuery), setSearchParams];
}
