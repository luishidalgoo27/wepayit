export const TermsPage = () => {
    return (
        <div className="container max-w-4xl mx-auto py-8 space-y-6">
            <h1 className="text-4xl font-bold text-[var(--color-600)] dark:text-[var(--color-100)]">
                Términos y condiciones
            </h1>
            <p className="text-lg text-[var(--color-700)] dark:text-[var(--color-200)]">
                Al utilizar WePayIt, aceptas cumplir con nuestros términos y condiciones. 
                Nos comprometemos a proteger tu privacidad y garantizar la seguridad de tus datos.
            </p>
            <p className="text-lg text-[var(--color-700)] dark:text-[var(--color-200)]">
                Por favor, revisa nuestros términos regularmente, ya que pueden actualizarse para reflejar cambios en nuestras políticas o servicios.
            </p>
        </div>
    );
};