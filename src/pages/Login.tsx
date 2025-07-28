import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import footer_bg from "../assets/images/footer-bg.webp";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  // rediriger après login
  if (isAuthenticated) {
    navigate("/favorites");
  }

  return (
    <div className="xs relative flex min-h-screen w-full flex-col">
      <div
        style={{ backgroundImage: `url(${footer_bg})` }}
        className="h-20 w-full"
      />

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Connexion</h2>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-2 text-center text-red-600">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded border px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>

          <input
            type="password"
            className="mt-1 w-full rounded border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-custom-red hover:bg-custom-red/60 w-full cursor-pointer rounded px-4 py-2 font-semibold text-white outline-none"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};
