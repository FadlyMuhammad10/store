"use client";
import Cookies from "js-cookie";
import { House, LogOut, Settings, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Sidebar() {
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <>
      <div className="  ">
        <div className="container py-4 flex flex-col gap-20">
          <div className="flex flex-col gap-3">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width="78"
              height="95"
              className="mx-auto py-4 hover:cursor-pointer  "
              onClick={() => router.push("/")}
            />

            <div className="flex flex-col gap-3">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none hover:text-primary"
                onClick={() => router.push("/dashboard")}
              >
                <div className="inline-flex gap-2">
                  <House className=" text-lg" />
                  Dashboard
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none hover:text-primary"
                onClick={() => router.push("/transaction")}
              >
                <div className="inline-flex gap-2">
                  <ShoppingBag className="text-lg" />
                  Transaction
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none hover:text-primary"
              >
                <div className="inline-flex gap-2">
                  <Settings className=" text-lg" />
                  My Account
                </div>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="px-4 text-lg font-semibold">Settings</h2>
            <Button
              variant={"ghost"}
              className="w-full text-red-500 hover:bg-red-200 justify-start rounded-none hover:text-red-500"
              onClick={onLogout}
            >
              <div className="inline-flex gap-2">
                <LogOut className="text-lg" />
                Logout
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
