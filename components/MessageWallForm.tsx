import { useRef, useState } from 'react';

export default function MessageWallForm({ onSuccess }: { onSuccess?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    const googleFormData = new FormData();
    googleFormData.append('entry.405401269', name);
    googleFormData.append('entry.893740636', message);

    fetch('https://docs.google.com/forms/d/e/1FAIpQLSdtpdGLad7iozM2ppxh28YqpdpetsBZMCEEBSCWomp9gN_WiA/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: googleFormData,
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        formRef.current?.reset();
        if (onSuccess) onSuccess();
        setTimeout(() => setIsSubmitted(false), 3000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setError('Something went wrong. Please try again.');
      });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-[#B76E79]/20 shadow-xl max-w-xl mx-auto flex flex-col gap-4"
    >
      <input
        name="name"
        required
        placeholder="Your Name"
        className="w-full p-3 bg-white/60 border border-[#B76E79]/20 rounded-lg text-[#B91C1C] placeholder:text-[#B76E79]/60 focus:outline-none focus:ring-2 focus:ring-[#B76E79]/40 transition"
      />
      <textarea
        name="message"
        required
        placeholder="Your message for the couple…"
        className="w-full p-3 min-h-[100px] bg-white/60 border border-[#B76E79]/20 rounded-lg text-[#B91C1C] placeholder:text-[#B76E79]/60 focus:outline-none focus:ring-2 focus:ring-[#B76E79]/40 transition"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B76E79] to-[#B91C1C] text-white font-bold text-lg shadow-lg hover:from-[#B91C1C] hover:to-[#B76E79] transition-all duration-200"
      >
        {isSubmitting ? 'Sending...' : 'Post Message'}
      </button>
      {isSubmitted && <p className="text-green-600 text-center mt-2">Message sent! Thank you for your wishes 💌</p>}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  );
} 