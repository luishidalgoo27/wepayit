import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Link } from "react-router-dom"


const LINKS = [
    { path: '/', name: 'Home' },
    { path: '/grupos', name: 'Grupos' },
    { path: '/gastos', name: 'Gastos' },
]

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 shadow-md">
            <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to='/' className="text-2xl font-bold">WePayIt</Link>
                </div>

                <div>
                    <ul className="flex place-content-center gap-4">
                        {
                            LINKS.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}