"use client"

import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {AuthActions} from '@/lib/auth/utils';
const authActions = AuthActions();

/**
 * Higher-order component to enforce authentication.
 * @param {React.ComponentType} WrappedComponent - The component to be wrapped and protected.
 * @returns {React.FC} A component wrapped with authentication logic.
 */
const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);


        useEffect(() => {
            // Helper function to check authentication
            const checkAuth = async () => {
                try {
                    const accessToken = authActions.getToken("access");
                    accessToken.then((value: string | null)=>{
                        if (!value) {

                            // No access or refresh token, redirect to login
                            router.push("/login");
                            return;

                        }

                        // Access token is valid, render the component
                        setLoading(false);
                    })

                } catch (error) {
                    console.error("Authentication error:", error);
                    router.push("/login");
                }
            };

            checkAuth();
        }, [router]);

        if (loading) {
            return <p>Loading...</p>; // or a loading spinner
        }

        // User is authenticated, render the wrapped component
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
