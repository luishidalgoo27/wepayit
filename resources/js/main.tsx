import { createRoot } from "react-dom/client";
import { Routes as Router } from "@/Routes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

createRoot(document.getElementById('root')!).render( 
    <Provider store={store}>
        <Router />
    </Provider>
)