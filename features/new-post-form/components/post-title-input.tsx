type PostTitleInputProps = {
  setTitle: (title: string) => void;
  title: string;
};

export function PostTitleInput({ setTitle, title }: PostTitleInputProps) {
  return (
    <div className="space-y-1">
      <label>Title</label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className="w-full h-8 border dark:bg-neutral-900 dark:border-neutral-700"
      />
    </div>
  );
}
