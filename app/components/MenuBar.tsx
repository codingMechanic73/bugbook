import { Bell, Bookmark, Home, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "@remix-run/react";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <NavLink
          to="/"
          className={({ isActive }) => {
            console.log(isActive);
            return "";
          }}
        >
          <Home />
          <span className="hidden lg:inline">Home</span>
        </NavLink>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Notifications"
        asChild
      >
        <NavLink to="/notifications">
          <div className="relative">
            <Bell />
          </div>
          <span className="hidden lg:inline">Notifications</span>
        </NavLink>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Messages"
        asChild
      >
        <NavLink to="/messages">
          <div className="relative">
            <Mail />
          </div>
          <span className="hidden lg:inline">Messages</span>
        </NavLink>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <NavLink to="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bookmarks</span>
        </NavLink>
      </Button>
    </div>
  );
}
