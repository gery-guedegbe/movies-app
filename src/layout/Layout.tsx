import { Navbar } from "../components/Navbar/Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Contenu principal */}
      <main className="container mx-auto">{children}</main>
    </div>
  );
};
