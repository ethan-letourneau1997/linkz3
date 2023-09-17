import { Input } from "@/components/ui/input";

type PostTitleInputProps = {
  setTitle: (title: string) => void;
  title: string;
};

export function PostTitleInput({ setTitle, title }: PostTitleInputProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-end justify-between pr-1">
        <label className="text-sm">Title</label>
        <span className="text-xs text-neutral-500">
          {title.length}&nbsp;/&nbsp;100
        </span>
      </div>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className="w-full h-9 dark:bg-dark-800"
      />
    </div>
  );
}
