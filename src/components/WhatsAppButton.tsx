import { WhatsAppIcon } from "./icons";

export function WhatsAppButton() {
  const phone = "918668194510";
  const message = encodeURIComponent("Hi! I want to enquire about tuition.");
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        animate-whatsapp-pulse
        fixed right-5 z-50
        bottom-20 md:bottom-5
        flex h-14 w-14 items-center justify-center
        rounded-full bg-[#25D366]
        shadow-lg transition hover:brightness-95
      "
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
