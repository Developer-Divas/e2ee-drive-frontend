'use client';

export default function UploadFileModal({ onUpload, onClose }) {

    function handleSelect(e) {
        console.log("FILE SELECT EVENT FIRED");  // ← debug
        const file = e.target.files[0];
        console.log("FILE PICKED:", file);       // ← debug
        if (!file) return;
        onUpload(file);
    }


    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-[#1f1f1f] text-white p-6 rounded-xl w-80 shadow-xl border border-white/10">

                <h2 className="text-lg font-semibold mb-4">Upload File</h2>

                <label className="block cursor-pointer text-center py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition">
                    <span>Select a file</span>
                    <input type="file" onChange={handleSelect} className="hidden" />
                </label>

                <button
                    onClick={onClose}
                    className="mt-5 w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition"
                >
                    Cancel
                </button>

            </div>

        </div>
    );
}
