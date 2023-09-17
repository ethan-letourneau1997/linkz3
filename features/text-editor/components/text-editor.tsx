"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaRedoAlt,
  FaRemoveFormat,
  FaStrikethrough,
  FaUndoAlt,
  FaUnlink,
} from "react-icons/fa";

import { EditorTooltip } from "./editor-tooltip";
import Link from "@tiptap/extension-link";
import { ScrollArea } from "@/components/ui/scroll-area";
import StarterKit from "@tiptap/starter-kit";
import { TbBlockquote } from "react-icons/tb";
import { useCallback } from "react";

type TextEditorProps = {
  editorContent: string;
  setEditorContent: (content: string) => void;
  replyButton?: JSX.Element;
};

export function TextEditor({
  editorContent,
  setEditorContent,
  replyButton,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: editorContent,
  });

  editor?.on("update", () => {
    const updatedHTML = editor?.getHTML();
    setEditorContent(updatedHTML);
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  if (editor)
    return (
      <div className="max-h-full pb-3 overflow-scroll text-base border rounded dark:bg-dark-800 dark:border-neutral-800">
        <div
          id="TiptapMenu"
          className="hidden py-1 dark:bg-neutral-900 sm:block"
        >
          <EditorTooltip text="Bold">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : "is-inactive"}
            >
              <FaBold />
            </button>
          </EditorTooltip>

          <EditorTooltip text="Italic">
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={
                editor.isActive("italic") ? "is-active" : "is-inactive"
              }
            >
              <FaItalic />
            </button>
          </EditorTooltip>

          <EditorTooltip text="Strikethrough">
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={
                editor.isActive("strike") ? "is-active" : "is-inactive"
              }
            >
              <FaStrikethrough />
            </button>
          </EditorTooltip>

          <EditorTooltip text="Remove Format">
            <button
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
              className="no-activity"
            >
              <FaRemoveFormat />
            </button>
          </EditorTooltip>

          <EditorTooltip text="Heading">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 })
                  ? "is-active"
                  : "is-inactive"
              }
            >
              <FaHeading />
            </button>
          </EditorTooltip>

          <div
            className="inline-block  min-h-[1em] w-[1px] mx-3  self-stretch bg-neutral-100 opacity-100 
          dark:opacity-50"
          />

          <EditorTooltip text="Bullet List">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={
                editor.isActive("bulletList") ? "is-active" : "is-inactive"
              }
            >
              <FaListUl />
            </button>
          </EditorTooltip>

          <EditorTooltip text="Ordered List">
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={
                editor.isActive("orderedList") ? "is-active" : "is-inactive"
              }
            >
              <FaListOl />
            </button>
          </EditorTooltip>

          <EditorTooltip text="Code Block">
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={
                editor.isActive("codeBlock") ? "is-active" : "is-inactive"
              }
            >
              <FaCode />
            </button>
          </EditorTooltip>

          <EditorTooltip text="Blockquote">
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={
                editor.isActive("blockquote") ? "is-active" : "is-inactive"
              }
            >
              <TbBlockquote className="text-lg" />
            </button>
          </EditorTooltip>
          <div
            className="inline-block  min-h-[1em] w-[1px] mx-3  self-stretch bg-neutral-100 opacity-100 
          dark:opacity-50"
          />
          <EditorTooltip text="Link">
            <button
              onClick={setLink}
              className={editor.isActive("link") ? "is-active" : "is-inactive"}
            >
              <FaLink />
            </button>
          </EditorTooltip>

          <EditorTooltip text="Unlink">
            <button
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive("link")}
              className="no-activity hover:cursor-pointer"
            >
              <FaUnlink />
            </button>
          </EditorTooltip>
          <div
            className="inline-block  min-h-[1em] w-[1px] mx-3  self-stretch bg-neutral-100 opacity-100 
          dark:opacity-50"
          />
          <EditorTooltip text="Undo">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              className="no-activity hover:cursor-pointer"
            >
              <FaUndoAlt />
            </button>
          </EditorTooltip>

          <EditorTooltip text="Redo">
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              className="no-activity hover:cursor-pointer"
            >
              <FaRedoAlt />
            </button>
          </EditorTooltip>
        </div>
        <div className="w-full px-3 space-y-3 prose max-w-none dark:prose-invert">
          <ScrollArea className="max-h-full ">
            <EditorContent editor={editor} />
          </ScrollArea>

          <div className="flex justify-end pr-1 ">{replyButton}</div>
        </div>
      </div>
    );
}
