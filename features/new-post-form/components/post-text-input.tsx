import { TextEditor } from "@/features/text-editor";

type PostTitleInputProps = {
  setEditorContent: (title: string) => void;
  editorContent: string;
};

export function PostTextInput({
  editorContent,
  setEditorContent,
}: PostTitleInputProps) {
  return (
    <div className="pt-0.5 ">
      <TextEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
    </div>
  );
}
