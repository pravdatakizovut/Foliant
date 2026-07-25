import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <Image
        src="/auth/bg.png"
        alt="bg"
        draggable={false}
        width={1920}
        height={1080}
        className="absolute inset-0 z-1 h-screen"
      />
      {children}
    </main>
  );
}
