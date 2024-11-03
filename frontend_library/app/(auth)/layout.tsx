import Background from "@/components/Background";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Background/>
            {children}
        </div>
    );
}