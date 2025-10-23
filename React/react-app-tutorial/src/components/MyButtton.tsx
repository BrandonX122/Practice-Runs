import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: "primary" | "secondary" | "danger";
  onClick: () => void;
}

export default function MyButton({ children, color, onClick }: Props) {
  return (
    <>
      <button type="button" onClick={onClick} className={"btn btn-" + color}>
        {children}
      </button>
    </>
  );
}
