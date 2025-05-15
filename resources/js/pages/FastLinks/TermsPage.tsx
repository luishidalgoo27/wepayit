import React from "react";

export const TermsPage = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-50 dark:bg-900 rounded-2xl shadow-xl overflow-hidden border border-100 dark:border-500">
        {/* Header */}
        <div className="bg-700 text-50 dark:bg-700 px-8 py-10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">
              Términos y Condiciones de Uso
            </h1>
            <p className="mt-3 text-base sm:text-lg text-100 text-center">
              Última actualización: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-10 py-10 space-y-10">
          <div className="text-lg text-slate-600 dark:text-slate-300 mb-4 text-center">
            Bienvenido a{" "}
            <strong className="text-600 dark:text-white">WePayIt</strong>. Al
            acceder y utilizar nuestra plataforma, usted acepta cumplir con los
            siguientes términos y condiciones. Le recomendamos leer detenidamente
            este documento antes de utilizar nuestros servicios.
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="borderTerm">
              1. Definiciones Generales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="boxTerm">
                <div className="textTerm">Usuario</div>
                <div className="textTerm2">
                  Individuo o entidad registrada que utiliza los servicios de
                  WePayIt
                </div>
              </div>
              <div className="boxTerm">
                <div className="textTerm">Grupo</div>
                <div className="textTerm2">
                  Conjunto organizado de usuarios que gestionan gastos compartidos
                </div>
              </div>
              <div className="boxTerm">
                <div className="textTerm">Administrador</div>
                <div className="textTerm2">
                  Usuario con privilegios de gestión dentro de un grupo
                </div>
              </div>
              <div className="boxTerm">
                <div className="textTerm">Servicio</div>
                <div className="textTerm2">
                  Conjunto de funcionalidades proporcionadas por la plataforma
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="borderTerm">
              2. Condiciones de Acceso
            </h2>
            <div className="space-y-4">
              <div className="boxTerm">
                <div className="font-medium mb-2">2.1 Requisitos de Registro</div>
                <ul className="list-disc pl-6 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Dirección de correo electrónico válida</li>
                  <li>
                    Contraseña segura (mínimo 8 caracteres con combinación
                    alfanumérica)
                  </li>
                  <li>Aceptación expresa de los términos y política de privacidad</li>
                </ul>
              </div>
              <div className="boxTerm">
                <div className="font-medium mb-2">2.2 Seguridad de la Cuenta</div>
                <ul className="list-disc pl-6 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>
                    El usuario es responsable de mantener la confidencialidad de sus
                    credenciales
                  </li>
                  <li>Notificación inmediata de accesos no autorizados</li>
                  <li>
                    Implementación de autenticación en dos factores recomendada
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="borderTerm">
              3. Funcionalidades Principales
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="boxTerm">
                <div className="textTerm text-lg mb-2">
                  Gestión de Grupos
                </div>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Creación y administración de grupos</li>
                  <li>Sistema de invitaciones por correo electrónico</li>
                  <li>Control de permisos y roles</li>
                </ul>
              </div>
              <div className="boxTerm">
                <div className="textTerm text-lg mb-2">
                  Gestión de Pagos
                </div>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Registro detallado de transacciones</li>
                  <li>Sistema de recordatorios automáticos</li>
                  <li>Informes financieros personalizados</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Additional Sections */}
          <section className="space-y-8">
            {[4, 5, 6, 7, 8, 9].map((section) => (
              <div
                key={section}
                className="border-t border-slate-200 dark:border-slate-700 pt-8"
              >
                <h2 className="text-lg font-semibold text-950 dark:text-50 mb-4">
                  {section === 4 && "4. Responsabilidades del Administrador"}
                  {section === 5 && "5. Protección de Datos Personales"}
                  {section === 6 && "6. Limitación de Responsabilidad"}
                  {section === 7 && "7. Modificaciones Contractuales"}
                  {section === 8 && "8. Jurisdicción Aplicable"}
                  {section === 9 && "9. Contacto y Soporte Técnico"}
                </h2>
                <div className="text-slate-600 dark:text-slate-300 space-y-3">
                  {section === 4 && (
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Supervisión y moderación de actividades del grupo</li>
                      <li>Gestión adecuada de datos sensibles</li>
                      <li>Cumplimiento de normativas de protección de datos</li>
                    </ul>
                  )}
                  {section === 5 && (
                    <p>
                      De acuerdo con el RGPD (UE) 2016/679 y LOPDGDD 3/2018,
                      garantizamos la protección de datos mediante cifrado SSL,
                      acceso restringido y auditorías periódicas de seguridad.
                    </p>
                  )}
                  {section === 6 && (
                    <div className="space-y-1">
                      <p>WePayIt no será responsable por:</p>
                      <ul className="list-disc pl-6">
                        <li>Daños indirectos, incidentales o consecuentes</li>
                        <li>
                          Pérdidas de datos o interrupciones del servicio fuera de
                          nuestro control
                        </li>
                        <li>
                          Usos inadecuados o ilícitos de la plataforma por parte de
                          los usuarios
                        </li>
                        <li>Conflictos entre miembros de un grupo</li>
                      </ul>
                    </div>
                  )}
                  {section === 7 && (
                    <div className="space-y-1">
                      <p>
                        Nos reservamos el derecho de modificar estos términos en
                        cualquier momento. Las actualizaciones entrarán en vigor
                        inmediatamente después de su publicación.
                      </p>
                      <p>
                        El uso continuado de la plataforma tras modificaciones
                        constituye aceptación de los nuevos términos. Se notificarán
                        cambios importantes por email a los usuarios registrados.
                      </p>
                    </div>
                  )}
                  {section === 8 && (
                    <div className="space-y-1">
                      <p>
                        Estos términos se regirán por la legislación española. Para
                        cualquier disputa:
                      </p>
                      <ul className="list-disc pl-6">
                        <li>
                          Ambas partes acuerdan someterse a los juzgados y tribunales
                          de Córdoba (España)
                        </li>
                        <li>
                          Se aplicará el Reglamento (UE) 1215/2012 sobre competencia
                          judicial
                        </li>
                        <li>Los procedimientos se llevarán a cabo en idioma español</li>
                      </ul>
                    </div>
                  )}
                  {section === 9 && (
                    <div className="boxTerm">
                      <div className="font-medium">Departamento Legal:</div>
                      <div className="mt-2">
                        Email:{" "}
                        <a
                          href="mailto:soporte@wepayit.com"
                          className="textTerm"
                        >
                          soporte@wepayit.com
                        </a>
                      </div>
                      <div className="mt-1">
                        Horario de atención: L-V 9:00 a 18:00 (CET)
                      </div>
                      <div className="mt-1">
                        Dirección postal: Calle Innovación 42, Edif. Tecnológico,
                        14005 Córdoba, España
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          <footer className="mt-12 border-t border-950 dark:border-950 pt-8 text-center">
            <p className="text-sm text-950 dark:text-100">
              © {new Date().getFullYear()} WePayIt. Todos los derechos reservados.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};