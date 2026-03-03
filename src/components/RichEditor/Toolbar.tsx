import { type Editor } from "@tiptap/react"
import { Button, Tooltip } from "antd"
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  CodeOutlined,
  LinkOutlined,
  PictureOutlined,
  LineOutlined,
  MinusOutlined,
} from "@ant-design/icons"
import { type FC, useRef } from "react"
import fileService from "@/services/fileService"
import { message } from "antd"

interface ToolbarProps {
  editor: Editor | null
}

const Toolbar: FC<ToolbarProps> = ({ editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  const handleSetLink = () => {
    const url = window.prompt(
      "请输入链接地址",
      editor.getAttributes("link").href
    )
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const res = await fileService.uploadImage(file)
    if (res?.data?.url) {
      editor.chain().focus().setImage({ src: res.data.url }).run()
    } else {
      message.error("图片上传失败")
    }
    // 清空 input 以允许重复上传同一文件
    e.target.value = ""
  }

  const items = [
    {
      key: "bold",
      title: "粗体",
      icon: <BoldOutlined />,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      key: "italic",
      title: "斜体",
      icon: <ItalicOutlined />,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      key: "underline",
      title: "下划线",
      icon: <UnderlineOutlined />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },
    {
      key: "strike",
      title: "删除线",
      icon: <StrikethroughOutlined />,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
    },
    { key: "d1", divider: true },
    {
      key: "h1",
      title: "一级标题",
      icon: <span style={{ fontWeight: 700, fontSize: 13 }}>H1</span>,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
    },
    {
      key: "h2",
      title: "二级标题",
      icon: <span style={{ fontWeight: 700, fontSize: 13 }}>H2</span>,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      key: "h3",
      title: "三级标题",
      icon: <span style={{ fontWeight: 700, fontSize: 13 }}>H3</span>,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
    },
    { key: "d2", divider: true },
    {
      key: "bulletList",
      title: "无序列表",
      icon: <UnorderedListOutlined />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      key: "orderedList",
      title: "有序列表",
      icon: <OrderedListOutlined />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
    { key: "d3", divider: true },
    {
      key: "blockquote",
      title: "引用",
      icon: <MinusOutlined style={{ transform: "rotate(-45deg)" }} />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
    },
    {
      key: "codeBlock",
      title: "代码块",
      icon: <CodeOutlined />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
    },
    {
      key: "hr",
      title: "分割线",
      icon: <LineOutlined />,
      action: () => editor.chain().focus().setHorizontalRule().run(),
      active: false,
    },
    { key: "d4", divider: true },
    {
      key: "link",
      title: "超链接",
      icon: <LinkOutlined />,
      action: handleSetLink,
      active: editor.isActive("link"),
    },
    {
      key: "image",
      title: "插入图片",
      icon: <PictureOutlined />,
      action: () => fileInputRef.current?.click(),
      active: false,
    },
  ]

  return (
    <div className="toolbar">
      {items.map(item =>
        item.divider ? (
          <span key={item.key} className="toolbar-divider" />
        ) : (
          <Tooltip key={item.key} title={item.title}>
            <Button
              size="small"
              type="text"
              className={item.active ? "is-active" : ""}
              onClick={item.action}
              icon={item.icon}
            />
          </Tooltip>
        )
      )}
      {/* 隐藏的图片文件选择器 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  )
}

export default Toolbar
