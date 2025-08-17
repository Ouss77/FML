import * as React from "react";

export function AlertDialog({ open, onOpenChange, children }: any) {
  const [isOpen, setIsOpen] = React.useState(open || false);
  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);
  function handleClose() {
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
  }
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-lg relative animate-fade-in">
        {React.Children.map(children, child =>
          React.isValidElement(child)
            ? React.cloneElement(child, { onClose: handleClose })
            : child
        )}
      </div>
    </div>
  ) : null;
}

export function AlertDialogTrigger({ asChild, children, onClick }: any) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: any) => {
        if (onClick) onClick(e);
        if (children.props.onClick) children.props.onClick(e);
      },
    });
  }
  return <button onClick={onClick}>{children}</button>;
}

export function AlertDialogContent({ children, onClose }: any) {
  return (
    <div>
      {children}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
        aria-label="Fermer"
      >
        ×
      </button>
    </div>
  );
}

export function AlertDialogHeader({ children }: any) {
  return <div className="mb-4">{children}</div>;
}

export function AlertDialogTitle({ children }: any) {
  return <div className="text-xl font-bold mb-2">{children}</div>;
}

export function AlertDialogDescription({ children }: any) {
  return <div className="text-gray-600 mb-4">{children}</div>;
}

export function AlertDialogFooter({ children }: any) {
  return <div className="flex gap-4 justify-end mt-6">{children}</div>;
}

export function AlertDialogCancel({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 border-0 text-gray-800 hover:bg-gray-300 rounded-full px-6 py-2 font-semibold shadow-sm transition-all duration-200"
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      className={`bg-red-600 text-white hover:bg-red-700 rounded-full px-6 py-2 font-semibold shadow-sm transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
