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
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-extrabold text-600 mb-10 text-center">
                ¡Te han invitado a un grupo!
            </h1>
            <button
                onClick={handleAcceptInvitation}
                className="clickButton font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition"
            >
                Unirme al grupo
            </button>
        </div>
    );
};