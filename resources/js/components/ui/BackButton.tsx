import { useNavigate } from "react-router-dom";

export const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)} // Navega a la página anterior
            className="fixed top-4 left-4 z-50 bg-[var(--color-500)] text-white dark:bg-[var(--color-700)] dark:text-[var(--color-100)] px-5 py-2 rounded-full shadow-lg transition hover:bg-[var(--color-600)]"
        >
            ← 
        </button>
    );
};