import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useGetExpenses } from "@/hooks/useGetExpenses";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const ExpensesPage = () => {
    const { id } = useLoaderData() as { id: string }
    const { expenses } = useGetExpenses(id)

    return (  
        <div className="container max-w-4xl mx-auto py-8 space-y-6 text-black">
            <div className="flex flex-col justify-center items-center">
                {/* {    
                    group.photo 
                    ?   <img className="w-10 h-10 rounded-full" src={group.photo} alt="Rounded avatar"></img>
                    :   <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                } */}
                <img src="" alt="Imagen de grupo" />
                <h1 className="text-5xl font-bold  mb-4">wepayit</h1>
            </div>

            <div>
                <div className="grid grid-cols-3 bg-gray-300 p-2 rounded-lg">
                    <Link className="flex justify-center items-center" to="">Gastos</Link>
                    <Link className="flex justify-center items-center border-x" to="">Saldos</Link>
                    <Link className="flex justify-center items-center" to="">Fotos</Link>
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

            {
                expenses.map((expense, index) => (
                    <div key={index} className="flex items-center bg-[#D5F3EA] rounded-xl p-4 shadow-md">
                        <div>
                            <p className="font-semibold">{expense.title}</p>
                            <p className="text-sm">{expense.amount}</p>
                        </div>
                    </div>
                ))
            }
            <Link 
                to={`/groups/${id}/expenses/create-expense`}
                className="block w-full text-center bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950 hover:bg-500 text-100 dark:text-200 font-semibold py-3 rounded-xl transition shadow-md">
                + Añadir gasto
            </Link>
        </div>  
    );
};
