import React from "react";

export const TermsPage = () => {
  return (
    <div className="min-h-screen dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-700 px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white text-center tracking-tight">
              Términos y Condiciones de Uso
            </h1>
            <p className="mt-4 text-lg text-slate-300 text-center">
              Última actualización: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-12 prose dark:prose-invert max-w-3xl mx-auto">
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Bienvenido a <strong className="text-slate-900 dark:text-white">WePayIt</strong>. 
            Al acceder y utilizar nuestra plataforma, usted acepta cumplir con los siguientes 
            términos y condiciones. Le recomendamos leer detenidamente este documento antes 
            de utilizar nuestros servicios.
          </p>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-l-4 border-blue-600 pl-4 mb-4">
              1. Definiciones Generales
            </h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <dt className="font-medium text-blue-600">Usuario</dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-300">
                  Individuo o entidad registrada que utiliza los servicios de WePayIt
                </dd>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <dt className="font-medium text-blue-600">Grupo</dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-300">
                  Conjunto organizado de usuarios que gestionan gastos compartidos
                </dd>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <dt className="font-medium text-blue-600">Administrador</dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-300">
                  Usuario con privilegios de gestión dentro de un grupo
                </dd>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <dt className="font-medium text-blue-600">Servicio</dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-300">
                  Conjunto de funcionalidades proporcionadas por la plataforma
                </dd>
              </div>
            </dl>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-l-4 border-blue-600 pl-4 mb-4">
              2. Condiciones de Acceso
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <h3 className="font-medium mb-2">2.1 Requisitos de Registro</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dirección de correo electrónico válida</li>
                  <li>Contraseña segura (mínimo 8 caracteres con combinación alfanumérica)</li>
                  <li>Aceptación expresa de los términos y política de privacidad</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <h3 className="font-medium mb-2">2.2 Seguridad de la Cuenta</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>El usuario es responsable de mantener la confidencialidad de sus credenciales</li>
                  <li>Notificación inmediata de accesos no autorizados</li>
                  <li>Implementación de autenticación en dos factores recomendada</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-l-4 border-blue-600 pl-4 mb-4">
              3. Funcionalidades Principales
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-3">Gestión de Grupos</h3>
                <ul className="space-y-2">
                  <li>• Creación y administración de grupos</li>
                  <li>• Sistema de invitaciones por correo electrónico</li>
                  <li>• Control de permisos y roles</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-3">Gestión de Pagos</h3>
                <ul className="space-y-2">
                  <li>• Registro detallado de transacciones</li>
                  <li>• Sistema de recordatorios automáticos</li>
                  <li>• Informes financieros personalizados</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Additional Sections */}
          <section className="space-y-8">
            {[4,5,6,7,8,9].map((section) => (
              <div key={section} className="border-t border-slate-200 dark:border-slate-700 pt-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  {section === 4 && "4. Responsabilidades del Administrador"}
                  {section === 5 && "5. Protección de Datos Personales"}
                  {section === 6 && "6. Limitación de Responsabilidad"}
                  {section === 7 && "7. Modificaciones Contractuales"}
                  {section === 8 && "8. Jurisdicción Aplicable"}
                  {section === 9 && "9. Contacto y Soporte Técnico"}
                </h2>
                <div className="text-slate-600 dark:text-slate-300 space-y-4">
                  {section === 4 && (
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Supervisión y moderación de actividades del grupo</li>
                      <li>Gestión adecuada de datos sensibles</li>
                      <li>Cumplimiento de normativas de protección de datos</li>
                    </ul>
                  )}
                  
                  {section === 5 && (
                    <p>
                      De acuerdo con el RGPD (UE) 2016/679 y LOPDGDD 3/2018, garantizamos 
                      la protección de datos mediante cifrado SSL, acceso restringido y 
                      auditorías periódicas de seguridad.
                    </p>
                  )}

                  {section === 6 && (
                    <div className="space-y-2">
                      <p>
                        WePayIt no será responsable por:
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Daños indirectos, incidentales o consecuentes</li>
                        <li>Pérdidas de datos o interrupciones del servicio fuera de nuestro control</li>
                        <li>Usos inadecuados o ilícitos de la plataforma por parte de los usuarios</li>
                        <li>Conflictos entre miembros de un grupo</li>
                      </ul>
                    </div>
                  )}

                  {section === 7 && (
                    <div className="space-y-2">
                      <p>
                        Nos reservamos el derecho de modificar estos términos en cualquier momento.
                        Las actualizaciones entrarán en vigor inmediatamente después de su publicación.
                      </p>
                      <p>
                        El uso continuado de la plataforma tras modificaciones constituye aceptación 
                        de los nuevos términos. Se notificarán cambios importantes por email a los 
                        usuarios registrados.
                      </p>
                    </div>
                  )}

                  {section === 8 && (
                    <div className="space-y-2">
                      <p>
                        Estos términos se regirán por la legislación española. Para cualquier disputa:
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Ambas partes acuerdan someterse a los juzgados y tribunales de Córdoba (España)</li>
                        <li>Se aplicará el Reglamento (UE) 1215/2012 sobre competencia judicial</li>
                        <li>Los procedimientos se llevarán a cabo en idioma español</li>
                      </ul>
                    </div>
                  )}

                  {section === 9 && (
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                      <p className="font-medium">Departamento Legal:</p>
                      <p className="mt-2">Email: <a href="mailto:soporte@wepayit.com" className="text-blue-600 dark:text-blue-300">soporte@wepayit.com</a></p>
                      <p className="mt-1">Horario de atención: L-V 9:00 a 18:00 (CET)</p>
                      <p className="mt-1">Dirección postal: Calle Innovación 42, Edif. Tecnológico, 14005 Córdoba, España</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          <footer className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} WePayIt. Todos los derechos reservados.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};