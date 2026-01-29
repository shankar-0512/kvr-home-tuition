"use client";

import dynamic from "next/dynamic";

const EnquiryFormNoSSR = dynamic(
  () => import("./EnquiryForm").then((m) => m.EnquiryForm),
  { ssr: false }
);

export function EnquiryFormClientOnly() {
  return <EnquiryFormNoSSR />;
}
