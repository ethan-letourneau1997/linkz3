import { Input } from "@/components/ui/input";

type PostTitleInputProps = {
  setLink: (title: string) => void;
  link: string;
};

export function PostLinkInput({ setLink, link }: PostTitleInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm">Url</label>
      <Input
        onChange={(e) => setLink(e.target.value)}
        value={link}
        type="text"
        className="w-full border h-9 dark:bg-dark-800 "
      />
    </div>
  );
}
