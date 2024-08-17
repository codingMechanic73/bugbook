import { Outlet } from "@remix-run/react";
import MenuBar from "~/components/MenuBar";
import NavBar from "~/components/NavBar";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
        <MenuBar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
        <Outlet />
      </div>
      <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
    </div>
  );
}
