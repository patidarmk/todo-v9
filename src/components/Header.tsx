import { Link } from "@tanstack/react-router";
import { ListTodo, Settings, LayoutDashboard } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <ListTodo className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
              TodoApp
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </div>
            </Link>
            <Link
              to="/"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              <div className="flex items-center gap-2">
                <ListTodo className="h-4 w-4" />
                All Tasks
              </div>
            </Link>
            <Link
              to="/"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;