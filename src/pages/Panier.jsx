import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Panier = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="font-playfair font-bold text-3xl text-gray-800 mb-4">
              Votre panier est vide
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Découvrez nos magnifiques bouquets et commencez à remplir votre panier
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/boutique" className="btn-primary">
                Découvrir nos bouquets
              </Link>
              <Link to="/" className="btn-secondary">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const total = getTotalPrice();
  const finalTotal = total;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/boutique" 
            className="flex items-center text-gray-600 hover:text-rose-fonce transition-colors duration-300 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continuer mes achats
          </Link>
          <h1 className="font-playfair font-bold text-3xl text-gray-800">
            Mon Panier
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="font-playfair font-semibold text-xl text-gray-800">
                  Produits ({items.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.nom} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Informations produit */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-playfair font-semibold text-lg text-gray-800 mb-1">
                          {item.nom || 'Produit inconnu'}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.categorie} • {item.couleur}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-rose-fonce">
                              {(item.prix || 0).toFixed(2)} €
                            </span>
                            <span className="text-gray-500">×</span>
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600 hover:text-rose-fonce transition-colors duration-300"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 border-x border-gray-200 min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600 hover:text-rose-fonce transition-colors duration-300"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={clearCart}
                  className="text-gray-600 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="font-playfair font-semibold text-xl text-gray-800 mb-6">
                Résumé de commande
              </h2>

              <div className="space-y-4 mb-6">


                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-playfair font-semibold text-lg">Total</span>
                    <span className="font-playfair font-bold text-xl text-rose-fonce">
                      {finalTotal.toFixed(2)} €
                                    </span>
                                  </div>
                                </div>
                              </div>
                    
                              <div className="text-center my-4">
                                <p className="text-xs text-gray-500">
                                  Attention: nos livraisons sont limitées à certaines zones.
                                  <br />
                                  Vérifiez votre éligibilité à l'étape suivante.
                                </p>
                              </div>
                    
                              <Link
                                to="/paiement"
                                className="w-full btn-primary flex items-center justify-center space-x-2"
                              >                <ShoppingBag size={20} />
                <span>Confirmer la commande</span>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier; 