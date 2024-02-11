"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgePlus,
  GalleryVertical,
  Home,
  LayoutDashboard,
  MenuIcon,
  ShoppingBasket,
} from "lucide-react";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={() => setIsOpen(true)}>
        <MenuIcon className="block lg:hidden" />
      </DropdownMenuTrigger>
      {isOpen && (
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsOpen(false)}>
            <Link href="/admin" className="flex items-center gap-2 w-full">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(false)}>
            <Link
              href="/admin/products"
              className="flex items-center gap-2 w-full"
            >
              <GalleryVertical className="w-5 h-5" />
              <span>Products</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(false)}>
            <Link
              href="/admin/orders"
              className="flex items-center gap-2 w-full"
            >
              <ShoppingBasket className="h-5 w-5" />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(false)}>
            <Link
              href="/admin/new-product"
              className="flex items-center gap-2 w-full"
            >
              <BadgePlus className="h-5 w-5" />
              <span>New Product</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(false)}>
            <Link href="/" className="flex items-center gap-2 w-full">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default MobileMenu;
