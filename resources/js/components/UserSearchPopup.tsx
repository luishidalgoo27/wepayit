import React, { useState } from "react";
import axios from "axios";

export const UserSearchPopup = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar el popup
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios encontrados
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/search-users", { username: searchTerm });
      setUsers(response.data); // Guardar los usuarios encontrados
    } catch (err) {
      setError("Error al buscar usuarios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Botón para abrir el popup */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Buscar Usuarios
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Buscar Usuarios</h2>

            {/* Input de búsqueda */}
            <input
              type="text"
              placeholder="Escribe un username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            {/* Botón de búsqueda */}
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
            >
              Buscar
            </button>

            {/* Mostrar resultados */}
            {loading && <p className="text-center mt-4">Cargando...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            <ul className="mt-4">
              {users.map((user: any) => (
                <li key={user.id} className="p-2 border-b">
                  {user.username}
                </li>
              ))}
            </ul>

            {/* Botón para cerrar el popup */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};