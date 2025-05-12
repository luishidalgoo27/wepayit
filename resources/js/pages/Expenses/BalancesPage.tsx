import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { useGetExpenses } from "@/hooks/useGetExpenses"
import { useGetGroup } from "@/hooks/useGetGroup"

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const BalancesPage = () => {
    const { id } = useLoaderData() as { id: string }
    const { group } = useGetGroup(id)
    const { expenses } = useGetExpenses(id)

    return(
        <div className="container max-w-4xl mx-auto py-8 space-y-6 text-black">
            <div className="flex flex-col justify-center items-center">
                {    
                    group?.photo 
                    ?   <img className="w-10 h-10 rounded-full" src={group.photo} alt="Rounded avatar"></img>
                    :   <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                }
                <h1 className="text-5xl font-bold  mb-4">wepayit</h1>
            </div>

            <div>
                <div className="grid grid-cols-3 bg-gray-300 p-2 rounded-lg">
                    <Link className="flex justify-center items-center" to={`/groups/${id}/expenses`}>Gastos</Link>
                    <Link className="flex justify-center items-center border-x" to={`/groups/${id}/balances`}>Saldos</Link>
                    <Link className="flex justify-center items-center" to={`/groups/${id}/photos`}>Fotos</Link>
                </div>
            </div>

            <div>
                <div className="flex justify-around items-center">
                    <div className="flex flex-col justify-center items-center">
                        <p>Mis gastos</p>
                        <p>10 €</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>Gastos totales</p>
                        <p>20 €</p>
                    </div>
                </div>
            </div>
        </div>
    )
}