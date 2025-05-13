import { getMessageCuñao } from "@/utils/notification"
import { useLoaderData } from "react-router-dom"

export const BalancesPage = () => {
    const { id } = useLoaderData() as { id: string }

    return (
        <>
            {/* Frase cuñao */}
            <div className="text-center">
                <p>{getMessageCuñao()}</p>
            </div>
        </>
    )
}