"use client"
import React, { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from 'next-auth/react';
import { toast } from "../ui/use-toast";

export const SignInForm = () => {

    const [email, setEmail] = useState<null | string >(null);

    async function SignInWithEmail() {
        const signInResult = await signIn('email', {
            email: email,
            callbackUrl: `${window.location.origin}`,
            redirect: false,
        });

        if(signInResult && !signInResult.ok){
            return toast({
                title: "Well this did not work",
                description: "Something went wrong, please try again",
                variant: "destructive",
            })
        }

        return toast({
            title: "Check your email",
            description: "a magic link has been sent to you !",
        }) 

    }

    return (
        <form action={SignInWithEmail}>
            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input 
                    name="email" 
                    type="email" 
                    placeholder="name@exemple.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <Button type="submit" className="mt-4 w-full">Login with Email</Button>
        </form>
    );
};
