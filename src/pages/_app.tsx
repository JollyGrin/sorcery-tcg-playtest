import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

import { MedievalSharp, Caudex, Cinzel_Decorative } from "next/font/google";

const fontBody = Caudex({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const fontHeader = Caudex({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Style />
      <QueryClientProvider client={queryClient}>
        <Script
          src="https://cdn.counter.dev/script.js"
          data-id="74aa2526-c0ed-4d9b-8547-a5cfedcb301a"
          data-utcoffset="1"
        />
        <Component {...pageProps} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
const Style = () => (
  <style jsx global>
    {`
      :root {
        --header: ${fontHeader.style.fontFamily};
        --body: ${fontBody.style.fontFamily};
      }
    `}
  </style>
);
