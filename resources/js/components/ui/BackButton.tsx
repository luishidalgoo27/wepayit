import { useLocation, useNavigate } from "react-router-dom";

export const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const path = location.pathname;

        if (path.startsWith("/groups/create")) {
            navigate("/groups");
        } else if (path.match(/^\/groups\/\d+\/create-expense/)) {
            navigate(-1);
        } else if (path.match(/^\/groups\/\d+/)) {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            onClick={handleBack}
            aria-label="Volver atrás"
            title="Volver atrás"
            className="fixed z-50 bg-[var(--color-500)] dark:bg-[var(--color-700)] text-white dark:text-[var(--color-100)] p-3 rounded-full shadow-xl transition-all duration-200 hover:bg-[var(--color-600)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-400)]"
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                />
            </svg>
        </button>
    );
};