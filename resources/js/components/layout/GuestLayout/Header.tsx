import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 shadow-lg bg-[#0C2724] text-white">
            <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to='/' className="text-2xl font-bold">WePayIt</Link>
                </div>

                <div className="flex place-content-center">
                    <ThemeToggle />
                    
                    <button 
                        type="submit" 
                        className="rounded-full bg-[#8FE3C2] px-4 py-2  font-semibold text-white hover:bg-[#7dd8b4] transition mr-10"
                    >
                        Registrate
                    </button>
                </div>
            </nav>
        </header>
    )
}