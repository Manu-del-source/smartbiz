import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const FAQS = [
  {
    question: 'How long does a website take?',
    answer: 'It depends on the size of the project \u2014 a landing page moves faster than a full business system. We\u2019ll give you a clear timeline before work starts.',
  },
  {
    question: 'What does the price include?',
    answer: 'Each package covers a complete build for its scope: design, development and launch. Changes after launch are covered by maintenance or hourly work.',
  },
  {
    question: 'Do you provide hosting?',
    answer: 'Yes \u2014 we can set up hosting and a domain for you, or work with hosting you already have.',
  },
  {
    question: 'Can you integrate M-Pesa?',
    answer: 'Yes. M-Pesa (Daraja) integration is available for e-commerce sites and any other project that needs it.',
  },
  {
    question: 'Can you maintain the website after launch?',
    answer: 'Yes \u2014 ongoing maintenance is available as a monthly package, or billed hourly for occasional work.',
  },
  {
    question: 'Can you build custom business systems?',
    answer: 'Yes \u2014 from internal management tools to full SaaS products, scoped around how your business actually works.',
  },
  {
    question: 'Can you redesign an existing website?',
    answer: 'Yes \u2014 we can redesign an existing site or rebuild it from scratch, depending on what it needs.',
  },
  {
    question: 'How do I start a project?',
    answer: 'Reach out on WhatsApp or through the contact form below, and we\u2019ll take it from there.',
  },
];

const FAQSlide: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
      <SectionHeading title="Questions, answered." tone="light" />

      <div className="max-w-3xl">
        {FAQS.map((faq, i) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="border-b border-paper-line"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full py-5 text-left flex justify-between items-center gap-4"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium text-paper-ink">{faq.question}</span>
              <span className="flex-shrink-0 text-paper-ink">
                {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-sm md:text-base text-slate leading-relaxed pb-5 pr-8">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSlide;
