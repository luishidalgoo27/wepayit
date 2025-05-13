import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const PhotosPage = () => {
    const { id } = useLoaderData() as { id: string }

    return (
        <>
            {/* Boton añadir foto */}
            <Link
                to={`/groups/${id}/expenses/create-expense`}
                className="hover:translate-y-0.5 block w-full text-center bg-gradient-to-b from-500 to-600 dark:bg-gradient-to-b dark:from-700 dark:to-950 hover:bg-500 text-100 dark:text-200 font-semibold py-3 rounded-xl transition shadow-md"
            >
                + Añadir foto
            </Link>
        </>
    )
}