"use server";
import HomeClient from "@/components/HomeClient";
import { GetProducts } from "../../../services/participant";

export default async function Home() {
  const products = await GetProducts();

  return <HomeClient products={products} />;
}
