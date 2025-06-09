import { useRef, useState } from 'react';

export default function RSVPForm() {
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
    const email = formData.get('email') as string;
    const guests = formData.get('guests') as string;
    const message = formData.get('message') as string;

    const googleFormData = new FormData();
    googleFormData.append('entry.405401269', name);
    googleFormData.append('entry.1755234596', email);
    googleFormData.append('entry.1335956832', guests);
    googleFormData.append('entry.893740636', message);

    fetch('https://docs.google.com/forms/d/e/1FAIpQLSeOoZmAgWy0fa3fGxhCgLv2qVkrB09cwKMMKriCUs68ds04JQ/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: googleFormData,
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        formRef.current?.reset();
        
        // Dispatch event to update Book of Guests
        window.dispatchEvent(new Event('rsvpUpdated'));
        
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
      className="space-y-4 sm:space-y-8"
    >
      <div>
        <label className="block text-xs sm:text-sm font-medium text-rose-700 mb-2 sm:mb-3 playfair-display">Full Name</label>
        <input
          name="name"
          required
          className="w-full p-3 sm:p-4 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none text-base sm:text-lg"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-rose-700 mb-2 sm:mb-3 playfair-display">Email Address</label>
        <input
          type="email"
          name="email"
          required
          className="w-full p-3 sm:p-4 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none text-base sm:text-lg"
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-rose-700 mb-2 sm:mb-3 playfair-display">
          Number of Guests
        </label>
        <select
          name="guests"
          required
          className="w-full p-3 sm:p-4 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none text-base sm:text-lg"
        >
          <option value="">Select number of guests</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-rose-700 mb-2 sm:mb-3 playfair-display">
          Message (Optional)
        </label>
        <textarea
          name="message"
          className="w-full p-3 sm:p-4 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none text-base sm:text-lg min-h-[100px] sm:min-h-[120px]"
          placeholder="Any special requests or dietary restrictions?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 sm:py-4 text-base sm:text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl playfair-display rounded-md"
      >
        {isSubmitting ? 'Sending...' : 'Submit RSVP'}
      </button>

      {isSubmitted && (
        <p className="text-green-600 text-center mt-3 sm:mt-4 playfair-display text-sm sm:text-lg">
          Thank you for your RSVP! We look forward to celebrating with you.
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center mt-3 sm:mt-4 playfair-display text-sm sm:text-lg">
          {error}
        </p>
      )}
    </form>
  );
} 