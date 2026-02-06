import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-rose-fonce rounded-full flex items-center justify-center">
              <span className="text-white font-playfair font-bold text-lg">E</span>
            </div>
            <span className="font-playfair font-semibold text-xl text-gray-800">
              L'Epi Fleuri
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-rose-fonce transition-colors duration-300 font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-rose-fonce transition-colors duration-300 font-medium"
            >
              À propos
            </Link>
            <Link
              to="/boutique"
              className="text-gray-700 hover:text-rose-fonce transition-colors duration-300 font-medium"
            >
              Boutique
            </Link>
            <Link
              to="/panier"
              className="relative text-gray-700 hover:text-rose-fonce transition-colors duration-300"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-fonce text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-rose-fonce transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-rose-fonce transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/boutique"
                className="block px-3 py-2 text-gray-700 hover:text-rose-fonce transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Boutique
              </Link>
              <Link
                to="/panier"
                className="block px-3 py-2 text-gray-700 hover:text-rose-fonce transition-colors duration-300 font-medium flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Panier</span>
                {getTotalItems() > 0 && (
                  <span className="bg-rose-fonce text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 