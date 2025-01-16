import Logo from "@/components/Logo";
import ThemeToggler from "@/components/Theme-Toogler";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Navbar */}
      <div className="border-b bg-white dark:bg-black  sticky top-0 z-50 p-1">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
          {/* Logo */}
          <Logo />
  
          {/* Right Section */}
          <div className="flex items-center gap-2">
            <ThemeToggler />
            <Button variant={"link"}>Dashboard</Button>
            <UserButton />
          </div>
        </div>
      </div>
  
      {/* Page Content */}
      {children}
    </div>
  );
  
}
