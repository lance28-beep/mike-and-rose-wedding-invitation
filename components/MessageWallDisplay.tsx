type Message = {
  timestamp: string;
  name: string;
  message: string;
};

export default function MessageWallDisplay({ messages, loading }: { messages: Message[]; loading: boolean }) {
  return (
    <div className="mt-12 max-w-2xl mx-auto w-full">
      <h3 className="great-vibes-regular text-2xl text-[#B91C1C] mb-6 text-center">Guest Messages</h3>
      {loading ? (
        <div className="text-center text-[#B76E79] py-8">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-[#B76E79] py-8">No messages yet. Be the first to send your wishes!</div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md border border-[#B76E79]/20 p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="playfair-display font-semibold text-[#B91C1C] text-lg">{msg.name}</span>
                <span className="text-xs text-[#B76E79] ml-2">{msg.timestamp && new Date(msg.timestamp).toLocaleString()}</span>
              </div>
              <div className="text-[#B76E79] playfair-display text-base">{msg.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 