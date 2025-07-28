import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        style: {
          background: "#fff",
          color: "#333",
          border: "1px solid #ddd",
          padding: "12px 16px",
          fontSize: "14px",
        },
      }}
    />
  );
};
