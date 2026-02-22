import Link from "next/link";

export const Disclaimer = () => {
  return (
    <div className="flex items-center bg-[rgba(255,255,255,0.5)] backdrop-blur-[3px] backdrop-brightness-[90%] justify-center text-center rounded-[0.5rem] text-[0.75rem] p-[0.5rem]">
      <p>
        <strong>spells.bar</strong> an open-source project and is not affiliated
        with{" "}
        <Link href="https://sorcerytcg.com/">
          <strong>Sorcery: Contested Realm</strong>
        </Link>{" "}
        or{" "}
        <Link href="https://sorcerytcg.com/about">
          <strong>Erik&apos;s Curiosa Limited</strong>
        </Link>
        .
        <br /> All rights to Sorcery and its content are owned by{" "}
        <strong>Erik&apos;s Curiosa Limited</strong>.
      </p>
    </div>
  );
};
