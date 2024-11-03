"use client"

import LoginForm from "@/components/auth/LoginForm";
import Background from "@/components/Background";

export default function Home() {
    return (
        <main>
            <Background />
            <LoginForm />
        </main>
    );
}