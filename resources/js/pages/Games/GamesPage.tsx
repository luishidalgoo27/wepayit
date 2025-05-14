import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useGroupContext } from "@/context/GroupContext";
import { Link, LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { getUsersByGroup } from "@/services/user";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ id: string }> {
    const id = params.id!;
    return { id };
}

export const GamesPage = () => {
  const { id } = useLoaderData() as { id: string }; 
  const { userExpense } = useGroupContext(); 

  const [funStats, setFunStats] = useState({
    coffeeEquivalent: 0,
    beerEquivalent: 0,
    kebabEquivalent: 0,
    movieTicketEquivalent: 0,
    daysToRecover: 0,
    gptEquivalent: 0,
  });

  const [excuse, setExcuse] = useState<string | null>(null);
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    // Calcular estadísticas divertidas
    const coffeeEquivalent = parseFloat((userExpense / 1.25).toFixed(1));
    const beerEquivalent = parseFloat((userExpense / 3).toFixed(1)); 
    const kebabEquivalent = parseFloat((userExpense / 4).toFixed(1)); 
    const movieTicketEquivalent = parseFloat((userExpense / 10).toFixed(1)); 
    const daysToRecover = parseFloat((userExpense / 5).toFixed(1)); 
    const gptEquivalent = parseFloat((userExpense / 20).toFixed(1)); 

    setFunStats({
      coffeeEquivalent,
      beerEquivalent,
      kebabEquivalent,
      movieTicketEquivalent,
      daysToRecover,
      gptEquivalent,
    });
  }, [userExpense]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUsers = await getUsersByGroup(id); // Llamar a la función con el id del grupo
        setUsers(fetchedUsers); // Guardar los usuarios en el estado
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(); // Ejecutar la función al cargar el componente
  }, [id]);

  const generateRandomExcuse = () => {
    const excuses = [
      "Me acabo de dar cuenta de que dejé mi cartera en casa.",
      "Mi cuenta bancaria ha sido hackeada esta mañana.",
      "Estoy ahorrando para comprar un unicornio.",
      "Mi gato necesita una operación muy cara.",
      "Acabo de donar todo mi dinero a una ONG de pingüinos.",
      "Mi horóscopo dice que hoy no debo gastar dinero.",
      "Estoy en una relación complicada con mi cuenta bancaria.",
      "Prometí a mi abuela que no gastaría dinero esta semana.",
      "Estoy practicando el minimalismo financiero.",
      "Mi app de banco dice que estoy en modo supervivencia.",
      "Estoy guardando para comprar Bitcoin cuando baje a 1€.",
      "Mi terapeuta me recomendó no pagar cuentas como ejercicio de autocontrol.",
      "Estoy en una huelga personal contra el capitalismo.",
      "Mi economista personal me prohibió gastar hasta el próximo mes.",
      "Acabo de recordar que tengo que pagar el alquiler... de los próximos 6 meses.",
      "Estoy canalizando mi dinero hacia dimensiones alternativas.",
      "Mi cuenta está en cuarentena por sospecha de gastos excesivos.",
      "Juré por Snoopy que no gastaría dinero hoy.",
      "Estoy participando en un experimento científico de abstinencia financiera.",
      "Mi aplicación de presupuesto me ha bloqueado por exceder el límite mensual.",
    ];

    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    setExcuse(randomExcuse);
  };

  const copyExcuseToClipboard = () => {
    if (excuse) {
      navigator.clipboard.writeText(excuse).then(() => {
        alert("Excusa copiada al portapapeles");
      });
    }
  };

  const handleGetUsersByGroup = async () => {
    try {
      await getUsersByGroup(id);

    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      toast.error("Hubo un error al guardar los cambios");
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Usuarios del grupo</h1>

      {loading && <p className="text-center text-lg">Cargando usuarios...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="text-center text-lg">No hay usuarios en este grupo.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <ul className="list-disc list-inside">
          {users.map((user: any) => (
            <li key={user.id} className="text-lg">
              {user.name}
            </li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="box statistics">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mr-4">
            ☕
          </div>
          <div>
            <h4 className="text-lg font-semibold">Equivalente en café</h4>
            <p className="dark:text-400 text-500">
              Has pagado el equivalente a{" "}
              <strong className="dark:text-50 text-700">{funStats.coffeeEquivalent} cafés</strong>
            </p>
          </div>
        </div>
        <div className="box statistics">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mr-4">
            🍻
          </div>
          <div>
            <h4 className="text-lg font-semibold">Equivalente en cervezas</h4>
            <p className="dark:text-400 text-500">
              Has pagado el equivalente a{" "}
              <strong className="dark:text-50 text-700">{funStats.beerEquivalent} cervezas</strong>
            </p>
          </div>
        </div>
        <div className="box statistics">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mr-4">
            🥙
          </div>
          <div>
            <h4 className="text-lg font-semibold">Equivalente en kebabs</h4>
            <p className="dark:text-400 text-500">
              Has pagado el equivalente a{" "}
              <strong className="dark:text-50 text-700">{funStats.kebabEquivalent} kebabs</strong>
            </p>
          </div>
        </div>
        <div className="box statistics">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mr-4">
            🎥
          </div>
          <div>
            <h4 className="text-lg font-semibold">Equivalente en cine</h4>
            <p className="dark:text-400 text-500">
              Has pagado el equivalente a{" "}
              <strong className="dark:text-50 text-700">{funStats.movieTicketEquivalent} entradas de cine</strong>
            </p>
          </div>
        </div>
        <div className="box statistics">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mr-4">
            🤖
          </div>
          <div>
            <h4 className="text-lg font-semibold">Equivalente en ChatGPT Plus</h4>
            <p className="dark:text-400 text-500">
              Has pagado el equivalente a{" "}
              <strong className="dark:text-50 text-700">{funStats.gptEquivalent} meses de ChatGPT Plus</strong>
            </p>
          </div>
        </div>
        <div className="box statistics">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mr-4">
            💰
          </div>
          <div>
            <h4 className="text-lg font-semibold">Tiempo de recuperación</h4>
            <p className="dark:text-400 text-500">
              Necesitarías{" "}
              <strong className="dark:text-50 text-700">{funStats.daysToRecover} días</strong> ahorrando 5€ diarios
            </p>
          </div>
        </div>
      </div>

      {/* Generador de excusas */}
      <div className="tab-content mt-10" id="excuses">
        <h2 className="text-xl font-bold">Generador de Excusas</h2>
        <p>¿No quieres pagar? Genera una excusa creativa para evitar pagar la cuenta.</p>

        <div id="excuse-generator" className="excuse-generator mt-4">
          <button
            id="generate-excuse"
            className="clickButton px-4 btn-lg"
            onClick={generateRandomExcuse}
          >
            Generar excusa
          </button>

          {excuse && (
            <div className="excuse-card bg-white rounded-lg p-6 shadow-md my-8 text-center">
              <h3 className="text-lg font-semibold">Tu excusa para hoy:</h3>
              <p className="excuse-text text-gray-700 italic text-xl mt-6 p-4 bg-gray-100 rounded-md relative">
                "{excuse}"
                <span className="absolute top-[-10px] left-2 text-primary text-2xl font-serif">“</span>
                <span className="absolute bottom-[-10px] right-2 text-primary text-2xl font-serif">”</span>
              </p>
              <div className="excuse-actions flex flex-wrap justify-center gap-2 mt-6">
                <button
                  className="clickButton px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  onClick={copyExcuseToClipboard}
                >
                  Copiar excusa
                </button>
                <button
                  className="clickButton px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                  onClick={generateRandomExcuse}
                >
                  Nueva excusa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
