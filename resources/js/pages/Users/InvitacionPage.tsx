import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { acceptInvitation } from "@/services/user";

export const InvitacionPage = () => {
    const {code} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleAcceptInvitation = async (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        
        if (isLoading) return;
        
        setIsLoading(true);
        
        try {
            console.log("Intentando aceptar invitación con código:", code);
            await acceptInvitation(code || '');
            toast.success("¡Invitación aceptada con éxito!");
            navigate("/");
        } catch (error) {
            console.error("Error al aceptar la invitación:", error);
            toast.error("Error al aceptar la invitación. Por favor, inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }; 
    
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
                
                <button
                    type="button"
                    onTouchEnd={handleAcceptInvitation}
                    onClick={handleAcceptInvitation}
                    disabled={isLoading}
                    style={{
                        background: "linear-gradient(to bottom, #2F274E, #03061C)",
                        color: "#E6E3FF",
                        padding: "1rem 2.5rem",
                        borderRadius: "9999px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        width: "100%",
                        fontWeight: "bold",
                        fontSize: "1.125rem",
                        touchAction: 'manipulation',
                        WebkitTapHighlightColor: 'transparent',
                        opacity: isLoading ? 0.7 : 1,
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        border: 'none',
                    }}
                >
                    {isLoading ? 'Procesando...' : 'Unirme al grupo'}
                </button>
                
                {isLoading && (
                    <p className="mt-4 text-sm text-gray-500">
                        Por favor, espera mientras procesamos tu solicitud...
                    </p>
                )}
            </div>
        </div>
    );
};