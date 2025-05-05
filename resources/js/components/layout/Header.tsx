import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Link } from "react-router-dom"


const LINKS = [
    { path: '/', name: 'Home' },
    { path: '/grupos', name: 'Grupos' },
    { path: '/editProfile', name: 'Perfil' },
]

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 shadow-lg">
            <nav className=" mx-auto px-4 py-3 flex items-center justify-between bg-black text-[#A9E6D3] dark:bg-gray-900 dark:text-gray-100">
                <div className="flex items-center">
                    <Link to='/' className="text-2xl font-bold">WePayIt</Link>
                </div>

                <div>
                    <ul className="flex place-content-center gap-4">
                        {LINKS.map((link, index) => (
                            <li key={index}>
                                <Link to={link.path}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                <button type="submit" className=" rounded-full bg-[#8FE3C2] px-4 py-2  font-semibold text-white hover:bg-[#7dd8b4] transition mr-10">Registrate</button>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}