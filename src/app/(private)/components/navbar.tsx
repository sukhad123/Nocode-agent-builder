"use client";
{/**Navbar for Private Pages */}
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { UserButton } from '@clerk/nextjs'
import React from "react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function PrivateNavbar({children}: {children: React.ReactNode}) {
  return (
    <>
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <Link className="font-bold text-inherit" href="/dashboard">
        <p className="font-bold text-inherit">No Code Agent Builder</p></Link> 
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
       
        <NavbarItem>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
       <UserButton  afterSignOutUrl="/" />
      </NavbarContent>
    </Navbar>
     
<main className="">
  {/* body content aligned with navbar */}
  {children}
</main>
    </>
  );
}
