import { useLocation, useNavigate } from "react-router-dom";

export const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const path = location.pathname;

        if (path.startsWith("/groups/create")) {
            navigate("/groups");
        } else if (path.match(/^\/groups\/\d+/)) {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            onClick={handleBack}
            className="fixed ml-2 mt-5 left-4 z-50 bg-[var(--color-500)] text-white dark:bg-[var(--color-700)] dark:text-[var(--color-100)] px-5 py-2 rounded-full shadow-lg transition hover:bg-[var(--color-600)]"
        >
            ← 
        </button>
    );
};