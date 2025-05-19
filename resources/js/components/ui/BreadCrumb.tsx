import { Link, useLocation } from "react-router-dom";

const PATH_NAMES: Record<string, string> = {
  groups: "Grupos",
  "create-group": "Crear grupo",
  expenses: "Gastos",
  balances: "Balances",
  games: "Juegos",
  management: "Gestión",
  "create-expense": "Nuevo gasto",
  "edit-expense": "Editar gasto",
  "edit-group": "Editar grupo",
  "edit-profile": "Editar perfil",
};

function getBreadcrumbName(segment: string) {
  if (PATH_NAMES[segment]) return PATH_NAMES[segment];
  if (/^\d+$/.test(segment)) return "Detalle"; // para ids numéricos
  if (segment.length === 36) return "Código"; // para UUIDs
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  // No mostrar en la home
  if (pathnames.length === 0) return null;

  let accumulatedPath = "";

  // Si el primer segmento es "groups", no lo repitas en el breadcrumb
  const segments = pathnames[0] === "groups" ? pathnames.slice(1) : pathnames;

  return (
    <nav className="flex py-2 px-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to="/groups"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg className="w-3 h-3 me-2.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Grupos
          </Link>
        </li>
        {segments.map((segment, idx) => {
          accumulatedPath += `/${pathnames[0] === "groups" ? "groups/" : ""}${segments.slice(0, idx + 1).join("/")}`;
          const isLast = idx === segments.length - 1;
          return (
            <li key={idx} aria-current={isLast ? "page" : undefined}>
              <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                {isLast ? (
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    {getBreadcrumbName(segment)}
                  </span>
                ) : (
                  <Link
                    to={accumulatedPath}
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {getBreadcrumbName(segment)}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};