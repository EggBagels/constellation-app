import { useState } from "react";
import { createNote, ingestNote } from "@/services/notes";

export default function Capture() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<
    "idle" | "saving" | "processing" | "done" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const isBusy = status === "saving" || status === "processing";

  const onAdd = async () => {
    if (!text.trim()) return;
    try {
      setStatus("saving");
      setMessage("Creating note…");
      const note = await createNote(text, title || undefined);

      setStatus("processing");
      setMessage("Ingesting with AI (summary, tags, links) …");
      await ingestNote(note.id);

      setStatus("done");
      setMessage("Done! Open the Graph to explore.");
      setTitle("");
      setText("");
    } catch (e: any) {
      console.error(e);
      setStatus("error");
      setMessage(e.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-2">Add to Brain</h1>

      <input
        className="neural-input"
        placeholder="Optional title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="neural-input min-h-[200px]"
        placeholder="Paste a thought, paragraph, or note…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex items-center gap-3">
        <button
          className="btn-cosmic"
          onClick={onAdd}
          disabled={isBusy}
        >
          {status === "saving"
            ? "Saving…"
            : status === "processing"
            ? "Processing…"
            : "Add to Brain"}
        </button>

        <span className="text-sm opacity-80">{message}</span>
      </div>
    </div>
  );
}

