type PostTitleInputProps = {
  setLink: (title: string) => void;
  link: string;
};

export function PostLinkInput({ setLink, link }: PostTitleInputProps) {
  return (
    <div className="space-y-1">
      <label>Url</label>
      <input
        onChange={(e) => setLink(e.target.value)}
        value={link}
        type="text"
        className="w-full h-8 border bg-neutral-900 border-neutral-700"
      />
    </div>
  );
}
