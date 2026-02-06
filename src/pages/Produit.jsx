import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import bouquetsData from '../data/bouquets.json';

const Produit = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [produit, setProduit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const foundProduit = bouquetsData.find(b => b.id === id);
    setProduit(foundProduit);
  }, [id]);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(produit);
    }
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  if (!produit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌸</div>
          <h2 className="font-playfair font-semibold text-2xl text-gray-800 mb-4">
            Produit non trouvé
          </h2>
          <Link to="/boutique" className="btn-primary">
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/boutique" 
            className="flex items-center text-gray-600 hover:text-rose-fonce transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour à la boutique
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                src={produit.image} 
                alt={produit.nom} 
                className="w-full h-full object-cover" 
              />
            </div>
            <p className="text-gray-500 text-sm italic text-center">
              * photo non contractuelle, notre fleuriste réalise toujours des bouquets uniques
            </p>
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            {/* En-tête */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-rose-pastel text-rose-fonce text-sm px-3 py-1 rounded-full">
                  {produit.categorie}
                </span>
                <span className="bg-vert-sauge/20 text-vert-sauge text-sm px-3 py-1 rounded-full">
                  {produit.couleur}
                </span>
              </div>
              <h1 className="font-playfair font-bold text-4xl text-gray-800 mb-2">
                {produit.nom}
              </h1>
            </div>

            {/* Prix */}
            <div className="text-3xl font-playfair font-bold text-rose-fonce">
              {produit.prix.toFixed(2)} €
            </div>

            {/* Description */}
            <div>
              <h3 className="font-playfair font-semibold text-lg text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {produit.description}
              </p>
            </div>

            {/* Composition */}
            <div>
              <h3 className="font-playfair font-semibold text-lg text-gray-800 mb-2">
                Composition
              </h3>
              <p className="text-gray-600">
                {produit.composition}
              </p>
            </div>

            {/* Occasions */}
            <div>
              <h3 className="font-playfair font-semibold text-lg text-gray-800 mb-2">
                Occasions parfaites
              </h3>
              <div className="flex flex-wrap gap-2">
                {produit.occasion.map((occ, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {occ}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantité et ajout au panier */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-gray-800">Quantité:</label>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-rose-fonce transition-colors duration-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-200 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-rose-fonce transition-colors duration-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>
                  {isAddingToCart ? 'Ajouté au panier !' : 'Ajouter au panier'}
                </span>
              </button>
            </div>

            {/* Garanties */}
            <div className="bg-rose-pastel rounded-lg p-4 space-y-3">
              <h3 className="font-playfair font-semibold text-lg text-gray-800">
                Nos garanties
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Truck size={20} className="text-rose-fonce" />
                  <span className="text-gray-700">Livraison rapide et soignée</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield size={20} className="text-rose-fonce" />
                  <span className="text-gray-700">Fleurs fraîches garanties</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        <div className="mt-16">
          <h2 className="font-playfair font-semibold text-2xl text-gray-800 mb-6">
            Vous aimerez aussi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bouquetsData
              .filter(b => b.id !== produit.id)
              .slice(0, 4)
              .map((bouquet) => (
                <Link 
                  key={bouquet.id} 
                  to={`/produit/${bouquet.id}`}
                  className="card group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <img 
                      src={bouquet.image} 
                      alt={bouquet.nom} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair font-semibold text-lg text-gray-800 mb-2 group-hover:text-rose-fonce transition-colors duration-300">
                      {bouquet.nom}
                    </h3>
                    <p className="text-rose-fonce font-semibold">
                      {bouquet.prix.toFixed(2)} €
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produit; 