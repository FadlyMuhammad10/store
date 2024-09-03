"use client";
import { useAuth } from "@/hooks/useAuth";
import useCarts from "@/hooks/useCarts";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

export default function Navbar() {
  const { isLogin, user, logout } = useAuth();

  const { carts } = isLogin
    ? useCarts()
    : { carts: [], loading: false, error: null };

  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  const onLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <header className="container flex items-center justify-between py-10 text-[#0C0D36]">
        <Image src="/images/logo.svg" alt="logo" width="41" height="51" />
        <div className="flex space-x-5 items-center">
          <Link href="/">
            <div className="hover:text-[#FF7158]">Home</div>
          </Link>
          <Link href="/">
            <div className="hover:text-[#FF7158]">Categories</div>
          </Link>
          <Link href="/">
            <div className="hover:text-[#FF7158]">Rewards</div>
          </Link>
          {isAuthPage ? (
            ""
          ) : (
            <>
              {isLogin ? (
                <>
                  <Separator orientation="vertical" className="h-[33px]" />

                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border-none outline-none">
                        <div className="inline-flex items-center gap-4">
                          {user?.avatar ? (
                            <>
                              <Image
                                src={user?.avatar}
                                alt={user?.avatar}
                                width="45"
                                height="45"
                                className="max-h-[45px] max-w-[45px] rounded-full"
                              />
                            </>
                          ) : (
                            <Image
                              src="/images/default-avatar.svg"
                              alt="avatar"
                              width="45"
                              height="45"
                              className="max-h-[45px] max-w-[45px] rounded-full"
                            />
                          )}

                          <div>Hi, {user?.name}</div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => router.push("/dashboard")}
                        >
                          Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onLogout}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div
                    className="relative cursor-pointer"
                    onClick={() => router.push("/carts")}
                  >
                    <Image
                      src="/images/ic-shop.svg"
                      alt="avatar"
                      width="24"
                      height="24"
                      className="max-h-[24px] max-w-[24px] rounded-full"
                    />
                    <div className="absolute translate-x-[13px] translate-y-[-20px] w-[16px] h-[16px] px-2 py-2 bg-[#29A867] rounded-full text-sm text-white flex items-center justify-center ">
                      {carts?.length}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/signup">
                    <div className="hover:text-[#FF7158]">Sign Up</div>
                  </Link>
                  <Button
                    variant="default"
                    className=" bg-[#29A867] hover:bg-green-500 font-normal "
                    onClick={() => router.push("/signin")}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </header>
    </>
  );
}
