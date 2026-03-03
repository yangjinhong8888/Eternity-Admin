import Image from "@tiptap/extension-image"
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react"
import type { NodeViewProps } from "@tiptap/react"
import { useRef, useEffect, useCallback, useState, type FC } from "react"
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons"

type Align = "left" | "center" | "right"

interface ImageAttrs {
  src: string
  alt: string
  title: string | null
  width: number | null
  align: Align
}

const ImageNodeView: FC<NodeViewProps> = ({ node, updateAttributes, selected, deleteNode }) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)
  const [hovered, setHovered] = useState(false)

  const { src, alt, title, width, align = "center" } = node.attrs as ImageAttrs

  // ── 拖拽调整宽度 ──────────────────────────────────────
  const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isResizing.current = true
    startX.current = e.clientX
    startWidth.current = imgRef.current?.offsetWidth ?? 300
  }, [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return
      const newWidth = Math.max(80, startWidth.current + (e.clientX - startX.current))
      updateAttributes({ width: newWidth })
    }
    const onMouseUp = () => {
      isResizing.current = false
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [updateAttributes])

  // ── 下载图片 ──────────────────────────────────────────
  const handleDownload = useCallback(async () => {
    try {
      const res = await fetch(src)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = alt || "image"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      window.open(src, "_blank", "noopener,noreferrer")
    }
  }, [src, alt])

  const showToolbar = selected || hovered

  return (
    <NodeViewWrapper>
      <div
        className="image-node-wrapper"
        data-align={align}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={alt || "图片"}
      >
        <div className={`image-node-inner${selected ? " is-selected" : ""}`}>
          {/* 浮动工具栏（悬停或选中时可见） */}
          <div
            className={`image-node-toolbar${showToolbar ? " is-visible" : ""}`}
            contentEditable={false}
          >
            <button
              type="button"
              className={`image-toolbar-btn${align === "left" ? " is-active" : ""}`}
              title="左对齐"
              aria-label="左对齐"
              onClick={() => updateAttributes({ align: "left" })}
            >
              <AlignLeftOutlined />
            </button>
            <button
              type="button"
              className={`image-toolbar-btn${align === "center" ? " is-active" : ""}`}
              title="居中"
              aria-label="居中"
              onClick={() => updateAttributes({ align: "center" })}
            >
              <AlignCenterOutlined />
            </button>
            <button
              type="button"
              className={`image-toolbar-btn${align === "right" ? " is-active" : ""}`}
              title="右对齐"
              aria-label="右对齐"
              onClick={() => updateAttributes({ align: "right" })}
            >
              <AlignRightOutlined />
            </button>
            <span className="image-toolbar-divider" />
            <button
              type="button"
              className="image-toolbar-btn"
              title="下载图片"
              aria-label="下载图片"
              onClick={handleDownload}
            >
              <DownloadOutlined />
            </button>
            <button
              type="button"
              className="image-toolbar-btn image-toolbar-btn--danger"
              title="删除图片"
              aria-label="删除图片"
              onClick={() => deleteNode()}
            >
              <DeleteOutlined />
            </button>
          </div>

          {/* 图片本体 */}
          <img
            ref={imgRef}
            src={src}
            alt={alt ?? ""}
            title={title ?? undefined}
            style={{ width: width ? `${width}px` : "auto" }}
            draggable={false}
          />

          {/* 右下角调整大小手柄（选中时显示） */}
          {selected && (
            <div
              className="image-resize-handle"
              onMouseDown={onResizeMouseDown}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </NodeViewWrapper>
  )
}

const ImageNode = Image.extend({
  inline: false,
  group: "block",

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: el => {
          const w = el.getAttribute("width")
          return w ? Number(w) : null
        },
        renderHTML: ({ width }) => {
          if (!width) return {}
          return { width: String(width as number) }
        },
      },
      align: {
        default: "center",
        parseHTML: el => (el.getAttribute("data-align") as Align) || "center",
        renderHTML: ({ align }) => ({
          // 始终写入 data-align，确保 view 页面能读取对齐信息
          "data-align": String(align || "center"),
        }),
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView)
  },
})

export default ImageNode
