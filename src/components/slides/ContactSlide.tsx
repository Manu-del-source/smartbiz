import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';

const PROJECT_TYPES = ['Business Website', 'E-commerce', 'Web Application', 'Business System', 'SaaS Product', 'Not sure yet'];

const ContactSlide: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', business: '', email: '', phone: '', projectType: '', message: '' });
  const [status, setStatus] = useState<'' | 'success' | 'error'>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setStatus('success');
      setTimeout(() => {
        setStatus('');
        setFormData({ name: '', business: '', email: '', phone: '', projectType: '', message: '' });
      }, 3000);
    } else {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder:text-mist/60 focus:outline-none focus:border-ember/60 transition-colors';

  return (
    <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
      <div className="max-w-2xl mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-white mb-5"
        >
          Ready to build something better?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-mist leading-relaxed"
        >
          Tell us what you're building and we'll help you turn the idea into a practical digital solution.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        <div className="space-y-4">
          <a
            href="https://wa.me/254726090372"
            className="card-dark p-6 flex items-center gap-5 hover:border-white/25"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
              <MessageCircle size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-0.5">Chat on WhatsApp</h3>
              <span className="text-sm text-mist">+254 726 090372</span>
            </div>
          </a>

          <a href="mailto:kiptooe142@gmail.com" className="card-dark p-6 flex items-center gap-5 hover:border-white/25">
            <div className="w-12 h-12 rounded-xl bg-ember/10 text-ember flex items-center justify-center flex-shrink-0">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-0.5">Email</h3>
              <span className="text-sm text-mist">kiptooe142@gmail.com</span>
            </div>
          </a>
        </div>

        <div className="card-dark p-6 md:p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Business (optional)"
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
              />
            </div>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className={`${inputClass} text-mist`}
            >
              <option value="">Project type (optional)</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-navy text-white">
                  {t}
                </option>
              ))}
            </select>
            <textarea
              rows={4}
              placeholder="Tell us about your project..."
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClass} resize-none`}
            />
            <button type="submit" className="btn-primary w-full">
              {status === 'success' ? 'Message Sent!' : 'Start a Project'}
            </button>
            {status === 'error' && <p className="text-red-400 text-xs text-center">Please fill in your name, email and message.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSlide;
