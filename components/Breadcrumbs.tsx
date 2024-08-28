import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

type PropsCrumbs = {
  label: string;
  href: string;
};

export default function BreadcrumbHeader({ className }: { className?: string }) {
  const { pathname } = useRouter();
  const [crumbs, setCrumbs] = useState<PropsCrumbs[]>([]);

  // Function to generate breadcrumbs based on current pathname
  const generateBreadcrumbs = useCallback(() => {
    const pathWithoutQuery = pathname.split("?")[0]; // Remove query params if any
    const pathSegments = pathWithoutQuery.split("/").filter((segment) => segment); // Remove empty segments

    const breadcrumbs = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      return { href, label: segment };
    });

    return [{ href: "/", label: "Home" }, ...breadcrumbs];
  }, [pathname]);

  // Effect to update breadcrumbs whenever pathname changes
  useEffect(() => {
    setCrumbs(generateBreadcrumbs());
  }, [pathname, generateBreadcrumbs]);

  return (
    <Breadcrumb>
      <BreadcrumbList className={`text-xs capitalize hover:text-white ${className}`}>
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem key={index} className="flex">
            <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
            {index !== crumbs.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
