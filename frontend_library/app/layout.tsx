import "./globals.css";
import '../build.css'

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body>
        {children}
        </body>
        </html>
    );
}
