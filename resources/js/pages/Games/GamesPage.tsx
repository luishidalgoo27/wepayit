import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// Mock User type and service for standalone functionality if original imports are not available
interface User {
  id: string;
  name: string;
}

// Mock service call
const getUsersByGroup = async (groupId: string): Promise<User[]> => {
  console.log(`Fetching users for group ${groupId}`);
  // Example: return different users based on groupId for testing
  if (groupId === "group1") {
    return [
      { id: "u1", name: "Alice" },
      { id: "u2", name: "Bob" },
    ];
  }
  if (groupId === "group2") {
    return [
      { id: "u1", name: "Carlos" },
      { id: "u2", name: "Diana" },
      { id: "u3", name: "Eve" },
    ];
  }
  return [
    { id: "user1", name: "Test User 1" },
    { id: "user2", name: "Test User 2" },
    { id: "user3", name: "Test User 3" },
    { id: "user4", name: "Test User 4" },
  ];
};

export const GamesPage = () => {
  const { id: groupIdFromParams } = useParams<{ id: string }>();
  const groupId = groupIdFromParams || "defaultTestGroup"; // Use a default for testing if no param

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<User | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [currentRotation, setCurrentRotation] = useState(0); // Stores the accumulated rotation

  const fetchUsers = async () => {
    if (!groupId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getUsersByGroup(groupId);
      setUsers(data);
      // Reset wheel when users change
      setCurrentRotation(0);
      if (wheelRef.current) {
        wheelRef.current.style.transition = "none";
        wheelRef.current.style.transform = "rotate(0deg)";
      }
    } catch (error) {
      console.error("Error al obtener los usuarios del grupo:", error);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [groupId]);

  const spinWheel = () => {
    if (isSpinning || users.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    const numUsers = users.length;
    const sectorAngleDegrees = 360 / numUsers;
    const randomIndex = Math.floor(Math.random() * numUsers);

    // Calculate the target angle for the middle of the winning sector (relative to a 0-360 cycle)
    // This is the angle on the wheel that should align with the pointer.
    const targetAngleInCycle = (randomIndex * sectorAngleDegrees) + (sectorAngleDegrees / 2);

    // Get the current visual position of the wheel (0-359 degrees)
    const currentAngleInCycle = (currentRotation % 360 + 360) % 360;

    // Calculate the difference to reach the target angle in the current cycle, ensuring forward spin.
    let rotationDifferenceToTarget = targetAngleInCycle - currentAngleInCycle;
    if (rotationDifferenceToTarget <= 0) {
      // If target is "behind" or same as current, add 360 to ensure it spins forward at least one full turn to reach it.
      rotationDifferenceToTarget += 360;
    }

    // Add multiple full spins for visual effect, plus the calculated difference.
    const spinsForEffect = 5 * 360;
    const newTotalRotation = currentRotation + spinsForEffect + rotationDifferenceToTarget;

    if (wheelRef.current) {
      // 1. Remove existing transition to prepare for an instant change (if any, or to set starting point).
      wheelRef.current.style.transition = "none";
      // 2. Set the rotation to its current *accumulated* value. This ensures the animation starts from where it actually is.
      wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
      
      // 3. Force a reflow. Crucial for the browser to apply the style change above *before* re-adding the transition.
      wheelRef.current.offsetHeight; 

      // 4. Re-add the transition for the spin animation.
      wheelRef.current.style.transition = "transform 4s ease-out";
      // 5. Set the new target rotation. This will be a large, accumulating number.
      wheelRef.current.style.transform = `rotate(${newTotalRotation}deg)`;
    }
    
    setCurrentRotation(newTotalRotation); // Update the state for the next spin's calculation

    setTimeout(() => {
      setIsSpinning(false);
      setWinner(users[randomIndex]);
    }, 4000); // Duration should match CSS transition
  };

  if (loading) {
    return (
      <p className="text-center text-lg text-[var(--color-700)] dark:text-[var(--color-200)]">
        Cargando usuarios...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-lg text-red-500 dark:text-red-400">{error}</p>
    );
  }

  if (users.length === 0) {
    return (
      <p className="text-center text-lg text-[var(--color-700)] dark:text-[var(--color-200)]">
        No hay usuarios en este grupo.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold text-green-600 text-center">¿Quién paga hoy?</h1>

      <div className="relative w-64 h-64 border-2 border-gray-300 rounded-full">
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{ transform: `rotate(${currentRotation}deg)` }} // Initial rotation set via state for consistency if needed, though spinWheel handles it.
        >
          {users.map((user, index) => {
            const numUsers = users.length;
            const sectorAngleDegrees = numUsers > 0 ? 360 / numUsers : 0;
            
            let dynamicClipPath;
            if (numUsers <= 0) { 
              dynamicClipPath = "none"; 
            } else if (numUsers === 1) {
              dynamicClipPath = "circle(50% at 50% 50%)"; // Full circle for one user
            } else {
              const sectorAngleRadians = sectorAngleDegrees * Math.PI / 180;
              // Points for polygon: Center, Point on circumference (0 deg), Point on circumference (sectorAngleDeg)
              // Assuming CSS coordinates (y positive down), and angle positive CCW from positive x-axis (3 o'clock)
              const p2x = 100; // % (50% radius from center, at 0 degrees on x-axis)
              const p2y = 50;  // %
              const p3x = 50 + 50 * Math.cos(sectorAngleRadians);
              const p3y = 50 + 50 * Math.sin(sectorAngleRadians); // Positive sin moves y downwards
              dynamicClipPath = `polygon(50% 50%, ${p2x}% ${p2y}%, ${p3x}% ${p3y}%)`;
            }

            const rotateForLayout = sectorAngleDegrees * index; // Rotates each pre-defined sector
            const backgroundColor = `hsl(${ (360 / (numUsers || 1)) * index }, 70%, 70%)`;
            
            return (
              <div
                key={user.id}
                className="absolute w-full h-full origin-center"
                style={{
                  transform: `rotate(${rotateForLayout}deg)`,
                  clipPath: dynamicClipPath,
                  backgroundColor,
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-start"
                  style={{
                    // Rotate text container to align text radially
                    // Text itself should be pushed towards the edge of the sector
                    transform: `rotate(${sectorAngleDegrees / 2}deg)`,
                    paddingLeft: numUsers > 1 ? "55%" : "0", // Push text towards outer edge, adjust as needed
                    boxSizing: "border-box",
                  }}
                >
                  <span 
                    className="text-xs font-bold text-black text-center block"
                    style={{ 
                        transform: "translateY(-50%)", // Vertically center if pushed by padding
                        // Ensure text is readable, might need to adjust rotation if names are long
                        // For very small sectors, text might be hard to read or overlap.
                        // Consider making text smaller or changing orientation for many users.
                        maxWidth: "40%", // Prevent text from overflowing too much
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                  >
                    {user.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Indicador (Pointer) */}
        <div 
            className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: "12px solid red", // Made pointer a bit larger
            }}
        ></div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning || loading}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? "Girando..." : "Girar ruleta"}
      </button>

      {winner && (
        <div className="text-center mt-4 text-xl font-semibold text-green-700">
          🎉 ¡{winner.name} paga esta vez!
        </div>
      )}
    </div>
  );
};
