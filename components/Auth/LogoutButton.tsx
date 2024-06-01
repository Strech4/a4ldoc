"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';

export const LogoutButton = () => {
  return (
    <>
      <Button
        variant="outline"
        className='py-1 px-3'
        onClick={() => signOut({ callbackUrl: `${window.location.origin}/auth` })}
      >
        <LogOut className='size-4 ' />
      </Button>
    </>
  )
}

export const LogoutDropDown = () => {
  return (
    <DropdownMenuItem
      className='hover:cursor-pointer'
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/auth` })}
    >
      <LogOut className='size-4 mr-2' />
      Déconnexion
    </DropdownMenuItem>
  )
}