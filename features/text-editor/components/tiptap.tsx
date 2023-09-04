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
import StarterKit from "@tiptap/starter-kit";
import { TbBlockquote } from "react-icons/tb";
import { useCallback } from "react";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  editor?.on("update", () => {
    const updatedHTML = editor?.getHTML();
    console.log(updatedHTML);
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
      <div className="text-lg border dark:border-neutral-700 dark:bg-neutral-900 ">
        <div
          id="TiptapMenu"
          className="flex py-1 divide-x-2 divide-neutral-700 dark:bg-neutral-800"
        >
          <div className="px-1 pr-3">
            <EditorTooltip text="Bold">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={
                  editor.isActive("bold") ? "is-active" : "is-inactive"
                }
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
          </div>

          <div className="px-3 ">
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
                <TbBlockquote className="text-xl" />
              </button>
            </EditorTooltip>
          </div>

          <div className="px-3 ">
            <EditorTooltip text="Link">
              <button
                onClick={setLink}
                className={
                  editor.isActive("link") ? "is-active" : "is-inactive"
                }
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
          </div>

          <div className="px-3 ">
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
        </div>
        <div className="w-full px-3 prose max-w-none dark:bg-neutral-900 dark:text-neutral-200 ">
          <EditorContent editor={editor} />
        </div>
      </div>
    );
};

export default Tiptap;
