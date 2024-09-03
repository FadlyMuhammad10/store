"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function HeaderMember({ title, subTitle, user, carts }) {
  const router = useRouter();
  return (
    <>
      <div>
        <h1 className="text-[#0C0D36] font-medium text-2xl">{title}</h1>
        <p className="text-muted-foreground text-sm">{subTitle}</p>
      </div>
      <div>
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
        </div>
      </div>
    </>
  );
}
