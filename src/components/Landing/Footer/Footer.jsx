import { Link } from "react-router-dom";

import "./style.css";
import "../../../App.css";

function Footer() {
    return (
        <footer className="bg-white text-gray-800 border-t border-gray-200 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-red-600">Just</span>
                            <span className="text-2xl font-bold text-gray-900">Pizza</span>
                        </div>
                        <p className="text-gray-600">
                            Najlepsza pizza w mieście, przygotowywana z pasją i świeżych składników.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                                <i className="fab fa-facebook-f text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-red-600">Szybkie linki</h3>
                        <ul className="space-y-2">
                            <li><Link to={'/Menu'}><span className="text-gray-600 hover:text-red-600 transition-colors">Menu</span></Link></li>
                            <li><span href="#" className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer">Opinie</span></li>
                            <li><Link to={'/Kontakt'}><span href="#" className="text-gray-600 hover:text-red-600 transition-colors">Kontakt</span></Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-red-600">Godziny otwarcia</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex justify-between">
                                <span>Poniedziałek - Piątek</span>
                                <span>10:00 - 22:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sobota</span>
                                <span>11:00 - 23:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Niedziela</span>
                                <span>12:00 - 21:00</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-red-600">Kontakt</h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <i className="fas fa-map-marker-alt mt-1 mr-3 text-red-600"></i>
                                <span>ul. Przykładowa 123, 00-001 Poznań</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-phone-alt mr-3 text-red-600"></i>
                                <span>+48 123 456 789</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-envelope mr-3 text-red-600"></i>
                                <span>kontakt@justpizza.pl</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} JustPizza. Wszelkie prawa zastrzeżone.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-red-600 text-sm transition-colors">Polityka prywatności</a>
                        <a href="#" className="text-gray-500 hover:text-red-600 text-sm transition-colors">Warunki korzystania</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;