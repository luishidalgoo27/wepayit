export const Footer = () => {
    return (
        <footer className="bg-[#0C2724] text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    <div className="flex flex-col items-center md:items-start">
                        <a href="#" className="text-2xl font-bold text-white mb-4">LOGO</a>
                        <p className="text-gray-400 text-center md:text-left">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                        </p>
                    </div>


                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Inicio</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Servicios</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Nosotros</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Contacto</a></li>
                        </ul>
                    </div>


                    <div className="flex flex-col items-center md:items-end">
                        <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition text-2xl"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-2xl"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-2xl"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-2xl"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}