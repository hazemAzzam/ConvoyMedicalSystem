"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PathBreadcrumb() {
  const pathname = usePathname();

  // Split pathname and filter out empty parts
  const pathnameParts = pathname.split("/").filter((part) => part !== "");

  // Build breadcrumb items with proper hrefs
  const breadcrumbItems = pathnameParts.map((part, index) => {
    // Create href by joining all parts up to current index
    const href = "/" + pathnameParts.slice(0, index + 1).join("/");
    return {
      label: part.charAt(0).toUpperCase() + part.slice(1),
      href: href,
      key: `${href}-${index}`, // Use both href and index for unique key
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.map((item) => (
          <React.Fragment key={item.key}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
