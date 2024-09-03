"use client";

import HeaderMember from "@/components/layouts/HeaderMember";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { GetCarts } from "../../../../services/participant";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [carts, setCarts] = useState();

  const router = useRouter();

  const showCarts = useCallback(async () => {
    const result = await GetCarts();
    setCarts(result);
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = token;
      const payload = jwtDecode(jwtToken);
      setUser(payload);

      showCarts();
    } else {
      router.push("/signin");
    }
  }, []);
  return (
    <div className="flex flex-row justify-between items-start">
      <HeaderMember
        title={"Dashboard"}
        subTitle={"Look what you have made today!"}
        user={user}
        carts={carts}
      />
    </div>
  );
}
