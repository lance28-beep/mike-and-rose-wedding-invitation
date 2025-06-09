type Message = {
  timestamp: string;
  name: string;
  message: string;
};

export default function MessageWallDisplay({ messages, loading }: { messages: Message[]; loading: boolean }) {
  return (
    <div className="mt-12 max-w-2xl mx-auto w-full px-4 sm:px-6">
      <h3 className="great-vibes-regular text-3xl sm:text-4xl text-[#B91C1C] mb-8 text-center">Guest Messages</h3>
      {loading ? (
        <div className="text-center text-[#B76E79] py-8">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-[#B76E79] py-8">No messages yet. Be the first to send your wishes!</div>
      ) : (
        <div className="flex flex-col space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-[#B76E79]/20 p-6 hover:shadow-xl transition-shadow duration-300 w-full max-w-full overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <span className="playfair-display font-semibold text-[#B91C1C] text-lg">{msg.name}</span>
                <span className="text-xs text-[#B76E79]">
                  {msg.timestamp && new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="text-[#B76E79] playfair-display text-base whitespace-pre-wrap break-words">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 