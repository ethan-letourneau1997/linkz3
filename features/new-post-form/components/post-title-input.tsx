import { Input } from "@/components/ui/input";

type PostTitleInputProps = {
  setTitle: (title: string) => void;
  title: string;
};

export function PostTitleInput({ setTitle, title }: PostTitleInputProps) {
  return (
    <div className="space-y-1">
      <label>Title</label>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className="w-full h-8 dark:bg-dark-900"
      />
    </div>
  );
}
