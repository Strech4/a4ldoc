"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';

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
