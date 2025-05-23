import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
    return (
        <main className="min-h-screen bg-[var(--color-primary-light)] dark:bg-[var(--color-primary-dark)] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-[var(--color-800)] rounded-xl shadow-lg overflow-hidden p-8 text-center">
                <div className="flex justify-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-[var(--color-500)] dark:text-[var(--color-300)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-[var(--color-600)] dark:text-[var(--color-100)] mb-2">
                    404 - Página no encontrada
                </h1>
                <p className="text-lg text-[var(--color-700)] dark:text-[var(--color-200)] mb-6">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-2 bg-[var(--color-500)] dark:bg-[var(--color-600)] hover:bg-[var(--color-600)] dark:hover:bg-[var(--color-700)] text-white font-medium rounded-lg transition duration-200"
                    >
                        Ir al inicio
                    </Link>
                </div>
            </div>
        </main>
    );
};