"use client";
import HeaderMember from "@/components/layouts/HeaderMember";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ORDERS_COLUMNS } from "@/constants";
import useCarts from "@/hooks/useCarts";
import useOrders from "@/hooks/useOrders";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionPage() {
  const [user, setUser] = useState({});

  const { carts } = useCarts();

  const { orders, loading, error } = useOrders();

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = token;
      const payload = jwtDecode(jwtToken);
      setUser(payload);
    } else {
      router.push("/signin");
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <div className="flex flex-row mb-5 justify-between items-start">
        <HeaderMember
          title={"Transaction"}
          subTitle={"Big result start from the small one"}
          user={user}
          carts={carts}
        />
      </div>
      <div className="relative my-5 min-h-screen overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {ORDERS_COLUMNS.map((item, i) => (
                <TableHead key={i}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((item, i) => (
              <>
                <TableRow key={item.id}>
                  <TableCell className="font-medium inline-flex items-center">
                    <Image
                      src={item?.cart?.product?.images[0]?.image_url}
                      alt={item?.cart?.product?.images[0]?.image_url}
                      width={160}
                      height={85}
                      className="rounded-sm"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item?.cart?.product?.name}
                  </TableCell>
                  <TableCell className="font-medium text-[#FF7158]">
                    {item?.date}
                  </TableCell>
                  <TableCell className="font-medium">{item?.status}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
