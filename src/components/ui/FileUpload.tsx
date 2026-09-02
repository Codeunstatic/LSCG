"use client";

import { useRef } from "react";
import { UploadCloud, X, Paperclip } from "lucide-react";

export function FileUpload({
  fileNames,
  onChange,
}: {
  fileNames: string[];
  onChange: (names: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const names = Array.from(files).map((f) => f.name);
    onChange([...fileNames, ...names]);
  }

  function removeFile(name: string) {
    onChange(fileNames.filter((f) => f !== name));
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center gap-2 rounded-md border-2 border-dashed border-border bg-white px-6 py-8 text-center transition-colors hover:border-lagos-blue/50"
      >
        <UploadCloud size={26} className="text-lagos-blue" />
        <span className="text-small font-medium text-deep-navy">
          Add photo or video
        </span>
        <span className="text-caption text-text-secondary">
          Photos can help us understand the issue.
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </button>

      {fileNames.length > 0 && (
        <ul className="mt-3 space-y-2">
          {fileNames.map((name) => (
            <li
              key={name}
              className="flex items-center justify-between rounded-sm border border-border bg-white px-3 py-2 text-small text-deep-navy"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Paperclip size={14} className="shrink-0 text-text-secondary" />
                <span className="truncate">{name}</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(name)}
                aria-label={`Remove ${name}`}
                className="text-text-secondary hover:text-error"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
