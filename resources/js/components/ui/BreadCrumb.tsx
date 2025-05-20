import { useLocation } from "react-router-dom";

const PATH_NAMES: Record<string, string> = {
  groups: "Grupos",
  "create-group": "Crear grupo",
  expenses: "Gastos",
  balances: "Deudas",
  games: "Juegos",
  management: "Usuarios",
  "create-expense": "Nuevo gasto",
  "edit-expense": "Editar gasto",
  "edit-group": "Editar grupo",
  "edit-profile": "Editar perfil",
};

function getBreadcrumbName(segment: string) {
  return PATH_NAMES[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
}

export const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  // No mostrar en la home
  if (pathnames.length === 0) return null;

  // Si el primer segmento es "groups", no lo repitas en el breadcrumb
  const segments = pathnames[0] === "groups" ? pathnames.slice(1) : pathnames;

  return (
    <nav className="flex py-2 px-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2 text-base font-medium">
        <li className="flex items-center">
          <span className="flex items-center text-500 dark:text-300">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Grupos
          </span>
        </li>
        {segments.map((segment, idx) => (
          <li key={idx} className="flex items-center">
            <svg className="w-4 h-4 mx-2 text-400 dark:text-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className={`text-700 dark:text-50 font-semibold`}>
              {getBreadcrumbName(segment)}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};