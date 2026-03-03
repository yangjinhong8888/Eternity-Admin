import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import ImageNode from "./ImageNodeExtension"
import Link from "@tiptap/extension-link"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import { common, createLowlight } from "lowlight"
import Toolbar from "./Toolbar"
import "./editor.less"
import { type FC, useEffect } from "react"

const lowlight = createLowlight(common)

interface RichEditorProps {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
}

const RichEditor: FC<RichEditorProps> = ({
  value,
  onChange,
  placeholder = "请输入文章内容...",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // 禁用内置 CodeBlock，使用带高亮的版本
        codeBlock: false,
      }),
      Underline,
      ImageNode,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "editor-content",
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  // 外部 value 变化时同步内容（如编辑已有文章）
  useEffect(() => {
    if (!editor) return
    if (value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [value, editor])

  return (
    <div className="rich-editor">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichEditor
