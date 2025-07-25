"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";
import { Item } from "@radix-ui/react-dropdown-menu";

const links = [
  {
    title: 'Overview',
    href: '/admin/overview'
  },
  {
    title: 'Product',
    href: '/admin/products'
  },
  {
    title: 'Orders',
    href: '/admin/orders'
  },
  {
    title: 'Users',
    href: '/admin/users'
  },
]

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {links.map((item) => (
        <Link key={item.href} href={item.href} className={ cn('text-sm font-medium transition-colors hover:text-primary', pathname.includes(item.href) ? '' : 'text-muted-foreground')}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
