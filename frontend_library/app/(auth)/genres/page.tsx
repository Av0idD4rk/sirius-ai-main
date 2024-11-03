"use client";


import {redirect} from "next/navigation";
import Button from "@/components/auth/form/Button";

export default function Home() {
    const handleClick = () =>{
        console.log("clicked");
        redirect('/')
    }
    return (
        <main>
            Lol
            <Button variant={"secondary"}>LOL</Button>
        </main>
    );
}