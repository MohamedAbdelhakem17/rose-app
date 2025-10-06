// components/Highlight.tsx
interface HighlightProps {
  children: React.ReactNode;
  color?: string; // optional to let you reuse with different colors
}

export default function Highlight({
  children,
  color = 'text-soft-pink-500',
}: HighlightProps) {
  return <span className={`${color} px-element-sm`}>{children}</span>;
}
