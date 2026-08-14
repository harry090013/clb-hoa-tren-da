import React from "react";

interface RichTextRendererProps {
  content: string;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null;

  // Split by double newline to identify paragraph/structure blocks
  const blocks = content.split(/\n\n+/);

  // Helper to parse inline bold/italic
  const parseInlineStyles = (text: string) => {
    // Regex for bold **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-extrabold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Regex for italic *text*
      const italicParts = part.split(/(\*[^*]+\*)/g);
      return italicParts.map((subpart, subIndex) => {
        if (subpart.startsWith("*") && subpart.endsWith("*")) {
          return (
            <em key={`${index}-${subIndex}`} className="italic text-gray-800">
              {subpart.slice(1, -1)}
            </em>
          );
        }
        return subpart;
      });
    });
  };

  return (
    <div className="space-y-6 text-gray-700 leading-relaxed font-sans text-base sm:text-lg">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Horizontal Rule
        if (trimmed === "---") {
          return <hr key={index} className="my-8 border-gray-100" />;
        }

        // 2. Headings (###)
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl sm:text-2xl font-black text-primary tracking-tight mt-8 mb-2">
              {parseInlineStyles(trimmed.slice(4))}
            </h3>
          );
        }

        // 3. Headings (##)
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl sm:text-3xl font-black text-primary tracking-tight mt-10 mb-3">
              {parseInlineStyles(trimmed.slice(3))}
            </h2>
          );
        }

        // 4. Image Embed: ![alt](url)
        const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imageMatch) {
          const alt = imageMatch[1];
          const src = imageMatch[2];
          return (
            <div key={index} className="my-8 space-y-2">
              <div className="rounded-3xl overflow-hidden shadow-md border border-gray-100 bg-gray-50 aspect-video relative">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              {alt && (
                <p className="text-xs text-center font-bold text-gray-400 italic">
                  {alt}
                </p>
              )}
            </div>
          );
        }

        // 5. Bullet Lists (starts with * or -)
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          const items = trimmed.split(/\n[*+-]\s+/);
          return (
            <ul key={index} className="list-disc pl-6 space-y-2.5 my-4">
              {items.map((item, itemIdx) => {
                // remove leading symbol if first item
                const cleanItem = itemIdx === 0 ? item.replace(/^[*+-]\s+/, "") : item;
                return (
                  <li key={itemIdx} className="font-medium text-gray-700">
                    {parseInlineStyles(cleanItem)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // 6. Ordered Lists (starts with 1. or 1 )
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed.split(/\n\d+\.\s+/);
          return (
            <ol key={index} className="list-decimal pl-6 space-y-2.5 my-4">
              {items.map((item, itemIdx) => {
                const cleanItem = itemIdx === 0 ? item.replace(/^\d+\.\s+/, "") : item;
                return (
                  <li key={itemIdx} className="font-semibold text-gray-700">
                    {parseInlineStyles(cleanItem)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // 7. Standard Paragraph
        // Support line breaks within a paragraph block
        const lines = trimmed.split("\n");
        return (
          <p key={index} className="font-medium">
            {lines.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {lineIdx > 0 && <br />}
                {parseInlineStyles(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
