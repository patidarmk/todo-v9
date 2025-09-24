import React from "react";
import Header from "@/components/Header";
import { MadeWithApplaa } from "@/components/made-with-applaa";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-neutral-950 dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3a2d5c,transparent)]"></div></div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <MadeWithApplaa />
    </div>
  );
};

export default Layout;