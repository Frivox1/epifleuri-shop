import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CardProduit = ({ produit }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(produit);
  };

  return (
    <Link to={`/produit/${produit.id}`} className="group">
      <div className="card h-full flex flex-col">
        {/* Image */}
                <div className="relative overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-rose-pastel to-vert-sauge/20 flex items-center justify-center">
                    <img
                      src={produit.image}
                      alt={produit.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 bg-white text-rose-fonce p-3 rounded-full shadow-lg hover:bg-rose-fonce hover:text-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
          <button className="absolute top-3 right-3 text-gray-400 hover:text-rose-fonce transition-colors duration-300">
            <Heart size={20} />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-playfair font-semibold text-lg text-gray-800 mb-2 group-hover:text-rose-fonce transition-colors duration-300">
            {produit.nom}
          </h3>
          <p className="text-gray-600 text-sm mb-3 flex-1">
            {produit.description}
          </p>
          
          {/* Catégorie */}
          <div className="mb-3">
            <span className="inline-block bg-rose-pastel text-rose-fonce text-xs px-2 py-1 rounded-full">
              {produit.categorie}
            </span>
          </div>

          {/* Prix et CTA */}
          <div className="flex items-center justify-between">
            <span className="font-playfair font-semibold text-xl text-rose-fonce">
              {produit.prix.toFixed(2)} €
            </span>
            <button
              onClick={handleAddToCart}
              className="btn-primary text-sm px-4 py-2"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduit; 