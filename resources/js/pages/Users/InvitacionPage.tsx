import { useSearchParams } from "react-router-dom";

export const InvitacionPage = () => {
    const [searchParams] = useSearchParams();
    const acceptUrl = searchParams.get("acceptUrl") || "#";

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br px-4">
            <div className="bg-50 rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center max-w-2xl w-full">
                <div className="mb-6 flex flex-col items-center">
                    <h1 className="text-3xl font-extrabold text-600 text-center mb-5">
                        ¡Te han invitado a un grupo!
                    </h1>
                    <p className="text-500 text-lg text-center">
                        Únete y empieza a compartir gastos fácilmente con tus amigos.
                    </p>
                </div>
                <a
                    href={acceptUrl}
                    className="clickButton font-bold text-lg px-10 py-4 rounded-full shadow-lg w-full text-center mb-4"
                >
                    Unirme al grupo
                </a>
            </div>
        </div>
    );
};