import { Input } from "@/components/ui/input";

type PostTitleInputProps = {
  setLink: (title: string) => void;
  link: string;
};

export function PostLinkInput({ setLink, link }: PostTitleInputProps) {
  return (
    <div className="space-y-1">
      <label>Url</label>
      <Input
        onChange={(e) => setLink(e.target.value)}
        value={link}
        type="text"
        className="w-full h-8 border dark:bg-dark-900 "
      />
    </div>
  );
}
