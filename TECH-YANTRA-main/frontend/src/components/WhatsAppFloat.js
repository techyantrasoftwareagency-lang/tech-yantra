import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const number = "918607492753";
  const text = encodeURIComponent("Hi Tech Yantra, I'd like to discuss a project.");
  return (
    <a href={`https://wa.me/${number}?text=${text}`} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 group" data-testid="whatsapp-float" aria-label="Chat on WhatsApp">
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping" />
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] grid place-items-center shadow-2xl group-hover:scale-110 transition">
          <MessageCircle size={24} className="text-white" />
        </div>
      </div>
    </a>
  );
}
