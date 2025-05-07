import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 shadow-lg bg-[#0C2724] text-white">
            <nav className="container mx-auto py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to='/' className="text-2xl font-bold">WePayIt</Link>
                </div>

                <div className="flex place-content-center gap-2">
                    <ThemeToggle />
                    
                    <Link 
                        to='/register' 
                        className="rounded-full bg-[#8FE3C2] px-4 py-2  font-semibold text-white hover:bg-[#7dd8b4] transition"
                    >
                        Try-It
                    </Link>
                </div>
            </nav>
        </header>
    )
}