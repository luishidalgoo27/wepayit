import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const BalancesPage = () => {
    const { id } = useLoaderData() as { id: string }

    return (
        <>
        </>
    )
}