import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Store, User, CheckCircle, RefreshCw, AlertTriangle, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import deliveryZones from '../data/zones.json';

import { db } from '../firebase.js';
import { collection, addDoc } from "firebase/firestore"; 

const Paiement = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart, loading } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('livraison'); // 'livraison' or 'retrait'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [postalCode, setPostalCode] = useState('');
  const [deliveryZoneStatus, setDeliveryZoneStatus] = useState('unchecked'); // 'unchecked', 'valid', 'invalid'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [itemMessages, setItemMessages] = useState({}); // New state for messages

  const total = getTotalPrice();
  const shippingCost = deliveryMethod === 'livraison' ? 10 : 0;
  const finalTotal = total + shippingCost;

  useEffect(() => {
    if (!loading && items.length === 0 && !isSubmitting && !formSubmitted) {
      navigate('/panier');
    }
  }, [loading, items, navigate, isSubmitting, formSubmitted]);

  // Initialize itemMessages when cart items change
  useEffect(() => {
    const initialMessages = {};
    items.forEach(item => {
      initialMessages[item.id] = '';
    });
    setItemMessages(initialMessages);
  }, [items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
    setDeliveryZoneStatus('unchecked');
  };

  const handleMessageChange = (itemId, message) => {
    setItemMessages(prev => ({
      ...prev,
      [itemId]: message,
    }));
  };

  const checkDeliveryZone = () => {
    if (deliveryZones[postalCode]) {
      setDeliveryZoneStatus('valid');
    } else {
      setDeliveryZoneStatus('invalid');
    }
  };

  const validateForm = () => {
    const requiredForEveryone = ['firstName', 'lastName', 'email', 'phone'];
    const requiredForDelivery = ['address', 'city'];

    if (requiredForEveryone.some(field => formData[field].trim() === '')) return false;
    if (deliveryMethod === 'livraison') {
      if (requiredForDelivery.some(field => formData[field].trim() === '')) return false;
      if (deliveryZoneStatus !== 'valid') return false;
    }
    return true;
  };

  const generateOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Veuillez remplir tous les champs obligatoires et vérifier votre code postal.');
      return;
    }

    setIsSubmitting(true);
    setFormSubmitted(true);

    const orderItemsWithMessages = items.map(item => ({
      ...item,
      message: itemMessages[item.id] || '', // Add message to each item
    }));

    const orderData = {
      orderId: generateOrderId(),
      clientInfo: { ...formData, postalCode },
      orderItems: orderItemsWithMessages,
      deliveryMethod,
      total: finalTotal,
      createdAt: new Date(),
      status: 'en-attente-de-paiement'
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      navigate('/confirmation', { state: { order: { ...orderData, id: docRef.id } } });
      clearCart();
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande:", error);
      alert("Une erreur est survenue lors de l'enregistrement de votre commande.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="w-12 h-12 text-rose-fonce animate-spin" />
          <p className="text-gray-600">Chargement du panier...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button onClick={() => navigate('/panier')} className="flex items-center text-gray-600 hover:text-rose-fonce transition-colors duration-300 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Retour au panier
          </button>
          <h1 className="font-playfair font-bold text-3xl text-gray-800">Finaliser votre commande</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <User size={20} className="text-rose-fonce" />
                  <h2 className="font-playfair font-semibold text-xl text-gray-800">Vos informations</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="input-field" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="input-field" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="input-field" placeholder="Pour le suivi WhatsApp"/>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                 <div className="flex items-center space-x-2 mb-4">
                   <Home size={20} className="text-rose-fonce" />
                   <h2 className="font-playfair font-semibold text-xl text-gray-800">Mode de livraison</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => setDeliveryMethod('livraison')} className={`flex items-center justify-center p-4 rounded-lg border text-center transition-all ${deliveryMethod === 'livraison' ? 'border-rose-300 bg-rose-50' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <Home size={20} className="mr-2"/>
                        Livraison
                    </button>
                    <button type="button" onClick={() => setDeliveryMethod('retrait')} className={`flex items-center justify-center p-4 rounded-lg border text-center transition-all ${deliveryMethod === 'retrait' ? 'border-rose-300 bg-rose-50' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <Store size={20} className="mr-2"/>
                        Retrait en magasin
                    </button>
                </div>
              </div>

              {deliveryMethod === 'livraison' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="font-playfair font-semibold text-xl text-gray-800 mb-4">Adresse de livraison</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                        <div className="flex items-center gap-2">
                          <input type="text" value={postalCode} onChange={handlePostalCodeChange} required className="input-field flex-grow" placeholder="Ex: 5310" />
                          <button type="button" onClick={checkDeliveryZone} className="btn-secondary px-4">
                            <Search size={20}/>
                          </button>
                        </div>
                      </div>

                      {deliveryZoneStatus === 'valid' && (
                        <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
                          <div className="flex">
                            <div className="flex-shrink-0"><CheckCircle className="h-5 w-5 text-green-400" /></div>
                            <div className="ml-3">
                              <p className="text-sm text-green-700">Bonne nouvelle ! Nous livrons à <span className="font-bold">{postalCode}</span>.</p>
                               <p className="text-sm text-green-700">Communes desservies : {deliveryZones[postalCode].join(', ')}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {deliveryZoneStatus === 'invalid' && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                          <div className="flex">
                            <div className="flex-shrink-0"><AlertTriangle className="h-5 w-5 text-red-400" /></div>
                            <div className="ml-3">
                              <p className="text-sm text-red-700">Désolé, nous ne livrons pas encore à <span className="font-bold">{postalCode}</span>.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {deliveryZoneStatus === 'valid' && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                              <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="input-field" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Ville / Commune *</label>
                              <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="input-field" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <button type="submit" disabled={isSubmitting || (deliveryMethod === 'livraison' && deliveryZoneStatus !== 'valid')} className="w-full btn-primary flex items-center justify-center space-x-2 disabled:bg-gray-300">
                {isSubmitting ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div><span>Validation...</span></> : <><CheckCircle size={20} /><span>Valider ma commande</span></>}
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="font-playfair font-semibold text-xl text-gray-800 mb-6">Résumé de commande</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.nom} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.nom}</h3>
                      <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-rose-fonce">{(item.prix * item.quantity).toFixed(2)} €</span>
                    <div className="w-full mt-2">
                      <label htmlFor={`message-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Message pour le bouquet (optionnel) :
                      </label>
                      <textarea
                        id={`message-${item.id}`}
                        rows="2"
                        className="input-field w-full"
                        placeholder="Ex: Joyeux anniversaire !"
                        value={itemMessages[item.id]}
                        onChange={(e) => handleMessageChange(item.id, e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-semibold" : "font-semibold"}>
                    {deliveryMethod === 'retrait' ? '0.00 €' : `${shippingCost.toFixed(2)} €`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-playfair font-semibold text-lg">Total</span>
                    <span className="font-playfair font-bold text-xl text-rose-fonce">{finalTotal.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paiement; 