import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../lib/contact';

const WhatsAppButton: React.FC = () => (
  <a
    href={CONTACT.whatsappUrl}
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 md:right-8 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,.35)] hover:scale-105 active:scale-95 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={26} className="text-white" fill="white" strokeWidth={0} />
  </a>
);

export default WhatsAppButton;
