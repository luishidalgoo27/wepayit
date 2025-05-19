import { useState } from "react";

type WheelProps = {
  users: { id: number; name: string }[];
};

export function Wheel({ users }: WheelProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinWheel = () => {
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * users.length);
    const winner = users[randomIndex].name;

    // Simula la "animación"
    setTimeout(() => {
      setSelectedUser(winner);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">¿Quién va a pagar?</h2>
      <button
        onClick={spinWheel}
        className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
        disabled={isSpinning}
      >
        {isSpinning ? "Girando..." : "Girar ruleta"}
      </button>

      {selectedUser && (
        <div className="mt-6 text-2xl font-semibold text-green-700">
          🎉 {selectedUser} paga esta ronda
        </div>
      )}
    </div>
  );
}
