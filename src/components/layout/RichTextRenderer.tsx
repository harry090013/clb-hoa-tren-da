import React from "react";

interface RichTextRendererProps {
  content: string;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null;

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
      // Ensure we match *text* where the text doesn't contain spaces immediately next to asterisks
      const italicParts = part.split(/(\*(?!\s)[^*]+(?<!\s)\*)/g);
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

  // Split content by lines
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let currentParagraph: string[] = [];

  const flushParagraph = (key: number) => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join("\n");
      currentParagraph = [];
      
      // Check if it is a horizontal rule
      if (text.trim() === "---") {
        elements.push(<hr key={`hr-${key}`} className="my-8 border-gray-100" />);
        return;
      }

      // Check if it is an image embed: ![alt](url)
      const imageMatch = text.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        const alt = imageMatch[1];
        const src = imageMatch[2];
        elements.push(
          <div key={`img-${key}`} className="my-8 space-y-2">
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
        return;
      }

      // Render standard paragraph with line breaks
      elements.push(
        <p key={`p-${key}`} className="font-medium text-gray-700">
          {text.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <br />}
              {parseInlineStyles(line)}
            </React.Fragment>
          ))}
        </p>
      );
    }
  };

  const flushList = (key: number) => {
    if (currentList) {
      const { type, items } = currentList;
      currentList = null;
      if (type === "ul") {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc pl-6 space-y-2.5 my-4">
            {items.map((item, idx) => (
              <li key={idx} className="font-medium text-gray-700">
                {parseInlineStyles(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${key}`} className="list-decimal pl-6 space-y-2.5 my-4">
            {items.map((item, idx) => (
              <li key={idx} className="font-semibold text-gray-700">
                {parseInlineStyles(item)}
              </li>
            ))}
          </ol>
        );
      }
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line: flush active paragraph or list
    if (trimmed === "") {
      flushParagraph(i);
      flushList(i);
      continue;
    }

    // Horizontal rule
    if (trimmed === "---") {
      flushParagraph(i);
      flushList(i);
      elements.push(<hr key={`hr-${i}`} className="my-8 border-gray-100" />);
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      flushParagraph(i);
      flushList(i);
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl sm:text-2xl font-black text-primary tracking-tight mt-8 mb-2">
          {parseInlineStyles(trimmed.slice(4))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph(i);
      flushList(i);
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl sm:text-3xl font-black text-primary tracking-tight mt-10 mb-3">
          {parseInlineStyles(trimmed.slice(3))}
        </h2>
      );
      continue;
    }

    // Bullet list items
    const bulletMatch = line.match(/^\s*[*+-]\s+(.*)/);
    if (bulletMatch) {
      flushParagraph(i);
      const contentText = bulletMatch[1];
      if (currentList && currentList.type === "ul") {
        currentList.items.push(contentText);
      } else {
        flushList(i);
        currentList = { type: "ul", items: [contentText] };
      }
      continue;
    }

    // Ordered list items
    const orderedMatch = line.match(/^\s*(\d+)\.\s+(.*)/);
    if (orderedMatch) {
      flushParagraph(i);
      const contentText = orderedMatch[2];
      if (currentList && currentList.type === "ol") {
        currentList.items.push(contentText);
      } else {
        flushList(i);
        currentList = { type: "ol", items: [contentText] };
      }
      continue;
    }

    // Standard line: append to current paragraph, close list if any
    flushList(i);
    currentParagraph.push(line);
  }

  // Flush remaining items
  flushParagraph(lines.length);
  flushList(lines.length);

  return (
    <div className="space-y-6 text-gray-700 leading-relaxed font-sans text-base sm:text-lg">
      {elements}
    </div>
  );
}
