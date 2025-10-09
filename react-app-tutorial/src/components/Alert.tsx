import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export default function Alert({ children, onClose }: Props) {
  return (
    <>
      <div className="alert alert-danger alert-dismissible" onClick={onClose}>
        {children}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
}
