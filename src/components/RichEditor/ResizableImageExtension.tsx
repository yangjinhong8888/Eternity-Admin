import Image from "@tiptap/extension-image"
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react"
import type { NodeViewProps } from "@tiptap/react"
import { useRef, useEffect, useCallback, type FC } from "react"

const ResizableImageView: FC<NodeViewProps> = ({
  node,
  updateAttributes,
  selected,
}) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const onMouseDownHandle = useCallback((e: React.MouseEvent) => {
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

  const { src, alt, width } = node.attrs

  return (
    <NodeViewWrapper>
      <div className={`resizable-image-wrapper${selected ? " is-selected" : ""}`}>
        <img
          ref={imgRef}
          src={src as string}
          alt={(alt as string) ?? ""}
          style={{ width: width ? `${width as number}px` : "auto" }}
          draggable={false}
        />
        {selected && (
          <div className="resize-handle" onMouseDown={onMouseDownHandle} />
        )}
      </div>
    </NodeViewWrapper>
  )
}

const ResizableImage = Image.extend({
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
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView)
  },
})

export default ResizableImage
