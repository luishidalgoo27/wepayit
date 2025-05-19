import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { acceptInvitation } from "@/services/user";

export const InvitacionPage = () => {
    const {code} = useParams();
    const acceptUrl = code || "#";
    const navigate = useNavigate();

    const handleAcceptInvitation = async () => {
    try {
      await acceptInvitation(acceptUrl);
      toast.success("Invitacion aceptada");
      navigate("/")
    } catch (error) {
      toast.error("Error al aceptar invitacion");
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
                onTouchStart={handleAcceptInvitation}
                onClick={() => {
                    console.log("Click detectado");
                    handleAcceptInvitation();
                }}
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
                    WebkitTapHighlightColor: 'transparent'
                }}
                >
                Unirme al grupo
                </button>
            </div>
        </div>
    );
};