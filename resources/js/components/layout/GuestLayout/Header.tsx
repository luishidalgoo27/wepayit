import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-200 dark:bg-header-dark shadow-md pl-7 pr-7 ">
            <nav className="container mx-auto py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to='/' className="text-2xl font-bold"><img src="/public/wepayitlightlogo.png" className="w-15 h-auto" alt="" /></Link>
                </div>

                <div className="flex place-content-center gap-2">
                    <ThemeToggle />
                    
                    <Link 
                        to='/register' 
                        className="clickButton rounded-full px-4 py-2 "
                    >
                        Registrate
                    </Link>
                </div>
            </nav>
        </header>
    )
}