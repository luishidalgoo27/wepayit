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
    <nav className="flex py-3 px-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2 text-base font-medium">
        <li>
          <Link
            to="/groups"
            className="flex items-center text-500 dark:text-300 hover:text-400 dark:hover:text-400 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Grupos
          </Link>
        </li>
        {segments.map((segment, idx) => {
          accumulatedPath += `/${pathnames[0] === "groups" ? "groups/" : ""}${segments.slice(0, idx + 1).join("/")}`;
          const isLast = idx === segments.length - 1;
          return (
            <li key={idx} className="flex items-center">
              <svg className="w-4 h-4 mx-2 text-400 dark:text-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {isLast ? (
                <span className="text-700 dark:text-50 font-semibold">{getBreadcrumbName(segment)}</span>
              ) : (
                <Link
                  to={accumulatedPath}
                  className="text-500 dark:text-300 hover:text-400 dark:hover:text-400 transition-colors"
                >
                  {getBreadcrumbName(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};