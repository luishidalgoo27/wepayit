import { useSearchParams } from "react-router-dom";

export const InvitacionPage = () => {
    const [searchParams] = useSearchParams();
    const acceptUrl = searchParams.get("acceptUrl") || "#";

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#F2FBF8]">
            <h1 className="text-2xl font-extrabold text-[#257C6A] mb-10 text-center">
                ¡Te han invitado a un grupo!
            </h1>
            <a
                href={acceptUrl}
                className="bg-[#57BCA3] hover:bg-[#319B83] text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition"
            >
                Unirme al grupo
            </a>
        </div>
    );
};