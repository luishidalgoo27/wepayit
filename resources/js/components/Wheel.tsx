import { useRef, useState } from "react";

type WheelProps = {
    users: { id: number; name: string }[];
};

export function Wheel({ users }: WheelProps) {
    const wheelRef = useRef<HTMLDivElement>(null);
    const [spinning, setSpinning] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [rotation, setRotation] = useState(0);

    const colors = [
        "#34d399", "#60a5fa", "#f472b6", "#facc15",
        "#a78bfa", "#fb923c", "#4ade80", "#f87171"
    ];

    const spinWheel = () => {
        if (spinning || users.length < 2) return;

        const anglePerSlice = 360 / users.length;
        const randomAngle = Math.random() * 360;
        const extraSpins = (4 + Math.floor(Math.random() * 5)) * 360;
        const newRotation = rotation + extraSpins + (360 - randomAngle);

        setSpinning(true);

        if (wheelRef.current) {
            wheelRef.current.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
            wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
            wheelRef.current.classList.add("glow-spin");
        }

        setTimeout(() => {
            const correctedAngle = (360 - (newRotation % 360)) % 360;
            const winnerIndex = Math.floor(correctedAngle / anglePerSlice) % users.length;

            setSelectedUser(users[winnerIndex].name);
            setSpinning(false);
            setRotation(newRotation);

            if (wheelRef.current) {
                wheelRef.current.classList.remove("glow-spin");
            }
        }, 4000);
    };


    const buildConicGradient = () => {
        const angle = 360 / users.length;
        let currentAngle = 0;
        return users
            .map((user, i) => {
                const color = colors[i % colors.length];
                const start = currentAngle;
                const end = currentAngle + angle;
                currentAngle += angle;
                return `${color} ${start}deg ${end}deg`;
            })
            .join(", ");
    };

    return (
        <div className="flex flex-col items-center mt-10">
            {/* Indicador */}
            <div className="relative w-80 h-80">
                <div className="absolute top-[-38px] left-1/2 transform -translate-x-1/2 z-20">
                    <div className="w-0 h-0 border-l-[22px] border-r-[22px] border-b-[44px] border-l-transparent border-r-transparent border-b-yellow-400 shadow-lg" />
                </div>

                {/* Rueda */}
                <div
                    ref={wheelRef}
                    className="w-full h-full rounded-full shadow-2xl border-8 border-white flex items-center justify-center relative transition-shadow duration-500"
                    style={{
                        background: `conic-gradient(${buildConicGradient()})`,
                        boxShadow: spinning
                            ? "0 0 60px 20px #facc15, 0 0 0 8px #fff inset"
                            : "0 4px 32px #0004",
                    }}
                >
                    {/* Etiquetas de los usuarios */}
                    {users.map((user, i) => {
                        const angle = (360 / users.length) * i + (360 / users.length) / 2;
                        const labelRadius = 130;
                        return (
                            <div
                                key={user.id}
                                className="absolute text-xs font-bold text-white text-center w-24 pointer-events-none"
                                style={{
                                    transform: `rotate(${angle}deg) translateY(-${labelRadius}px) rotate(-${angle}deg)`,
                                    background: "rgba(0,0,0,0.45)",
                                    borderRadius: "8px",
                                    padding: "2px 6px",
                                    left: "50%",
                                    top: "50%",
                                    translate: "-50% -50%",
                                    boxShadow: "0 2px 8px #0006",
                                }}
                            >
                                {user.name}
                            </div>
                        );
                    })}

                </div>
            </div>

            {/* Botón */}
            <button
                onClick={spinWheel}
                disabled={spinning}
                className={`mt-6 px-8 py-3 text-white font-bold rounded-2xl text-lg transition-all duration-300 shadow-lg ${spinning
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-400 to-yellow-400 hover:from-green-500 hover:to-yellow-500"
                    }`}
            >
                {spinning ? "Girando..." : "Girar ruleta"}
            </button>

            {/* Resultado */}
            {selectedUser && !spinning && (
                <div className="mt-6 text-center text-2xl font-extrabold text-yellow-600 animate-pulse drop-shadow-lg">
                    🎉 ¡{selectedUser} ha sido elegido!
                </div>
            )}

            {/* Animación de resplandor */}
            <style>
                {`
          .glow-spin {
            box-shadow: 0 0 80px 30px #facc15, 0 0 0 8px #fff inset !important;
          }
        `}
            </style>
        </div>
    );
}