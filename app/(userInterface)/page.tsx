"use client"
import { useRouter } from "next/dist/client/components/navigation";

import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    
    router.push('/dashboard')
  );
}
