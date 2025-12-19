import Portal from "./Portal";

export default function EncryptionProofModal({ onClose }) {
  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div
          className="
            bg-[#121212] text-white
            rounded-xl p-5
            w-[420px]
            border border-white/10
            shadow-xl
          "
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔐</span>
            <h2 className="text-base font-semibold">Encryption Proof</h2>
          </div>

          <ul className="space-y-2 text-sm">
            <li className="text-green-400">✔ Encrypted in your browser</li>
            <li className="text-green-400">✔ Password never sent</li>
            <li className="text-green-400">✔ Server cannot decrypt</li>
            <li className="text-green-400">✔ AES-256-GCM</li>
          </ul>

          <button
            onClick={onClose}
            className="mt-5 w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </Portal>
  );
}
