import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCuriosaDeck } from "@/utils/api/curiosa/useCuriosa";

export default function Home() {
  const { data } = useCuriosaDeck("cm0uo52xy00gkl5rard9ja2w8");

  return (
    <div>
      <p>test api</p>

      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
