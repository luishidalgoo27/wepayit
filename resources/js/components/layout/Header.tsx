import { ThemeToggle } from "@/components/ui/ThemeToggle"


const LINKS = [
    { path: '/', name: 'Home' },
    { path: '/', name: 'Home' },
]

export const Header = () => {
    return(
        <header>
            <nav>
                <ThemeToggle />
            </nav>
        </header>
    )
}