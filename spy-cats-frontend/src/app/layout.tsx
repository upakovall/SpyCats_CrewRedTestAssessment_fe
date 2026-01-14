import "./globals.css";

export const metadata = {
  title: "Spy Cat Agency",
  description: "Spy Cats Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}
