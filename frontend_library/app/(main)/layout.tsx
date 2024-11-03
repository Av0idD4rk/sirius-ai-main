export default function BookLayout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-full min-h-screen">
            <div className="flex-grow flex justify-center h-full items-start">
                {children}
            </div>
        </div>
    );
}