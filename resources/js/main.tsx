import { createRoot } from "react-dom/client";
import { Routes as Router } from "@/Routes";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')!).render( 
    <AuthProvider>
        <Router />
    </AuthProvider>
)