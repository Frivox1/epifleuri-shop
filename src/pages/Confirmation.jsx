import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Heart, Mail } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null; // or a loading spinner
  }

  const { clientInfo, orderItems, total, createdAt, id, orderId } = order;
  const dateObject = createdAt && createdAt.seconds ? new Date(createdAt.seconds * 1000) : new Date(createdAt);
  const orderDate = dateObject.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>

          <h1 className="font-playfair font-bold text-4xl text-gray-800 mb-4">
            Merci {clientInfo.firstName} !
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Votre commande a bien été reçue, il ne vous reste plus qu'à envoyer la preuve de paiement.
          </p>
        </div>

        {/* Next Steps & Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="font-playfair font-semibold text-2xl text-gray-800 mb-6">
            Prochaines étapes
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-rose-pastel text-rose-fonce rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">Envoyez la preuve de paiement</h3>
                <p className="text-gray-600">
                  Veuillez envoyer la preuve de votre paiement à ce numéro de compte <span className="font-semibold text-rose-fonce">BE94 0682 4154 8114</span> avec comme communication <span className="font-semibold text-rose-fonce">{orderId}</span> via Whatsapp au <span className="font-semibold text-rose-fonce">081 87 95 55</span>.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-rose-pastel text-rose-fonce rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">Message de la fleuriste</h3>
                <p className="text-gray-600">
                  Notre fleuriste vous contactera au plus vite pour convenir d'un rendez-vous pour le retrait ou la livraison de votre bouquet.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-rose-pastel text-rose-fonce rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">Préparation du bouquet</h3>
                <p className="text-gray-600">
                  Notre artisan fleuriste prépare votre bouquet avec le plus grand soin.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-rose-pastel text-rose-fonce rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">4</div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {order.deliveryMethod === 'livraison' ? 'Livraison' : 'Prêt pour le retrait'}
                </h3>
                <p className="text-gray-600">
                  {order.deliveryMethod === 'livraison' 
                    ? 'Votre bouquet sera livré à l’adresse indiquée à la date convenue avec notre fleuriste.'
                    : 'Vous pouvez venir retirer votre commande en magasin à l’heure convenue avec notre fleuriste.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="font-playfair font-semibold text-2xl text-gray-800 mb-6 border-b pb-4">
            Récapitulatif de la commande
          </h2>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-4">
                <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.nom} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">{item.nom}</h3>
                  <p className="text-sm text-gray-600">Quantité : {item.quantity}</p>
                  {item.message && (
                    <p className="text-sm text-gray-500 mt-1 italic">
                      Message : "{item.message}"
                    </p>
                  )}
                </div>
                <span className="font-semibold text-lg text-rose-fonce">
                  {(item.prix * item.quantity).toFixed(2)} €
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-3 border-t-2 border-dashed pt-6 mt-6">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Sous-total</span>
              <span className="font-semibold">{(total - (order.deliveryMethod === 'livraison' ? 10 : 0)).toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Livraison</span>
              <span className="font-semibold">
                {order.deliveryMethod === 'livraison' ? '10.00 €' : 'Gratuit'}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-baseline">
                <span className="font-playfair font-bold text-2xl">Total</span>
                <span className="font-playfair font-bold text-3xl text-rose-fonce">
                  {total.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="font-playfair font-semibold text-2xl text-gray-800 mb-6 border-b pb-4">
            Détails de la commande
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Numéro de commande</span>
              <span className="font-mono text-rose-fonce font-bold">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Date de commande</span>
              <span className="font-medium text-gray-800">{orderDate}</span>
            </div>
            {order.deliveryMethod === 'livraison' ? (
              <div className="text-left pt-4 border-t mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Adresse de livraison</h3>
                <p className="text-gray-700">
                  {clientInfo.firstName} {clientInfo.lastName}<br />
                  {clientInfo.address}<br />
                  {clientInfo.postalCode} {clientInfo.city}
                </p>
              </div>
            ) : (
              <div className="text-left pt-4 border-t mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Retrait en magasin</h3>
                <p className="text-gray-700">
                  Notre fleuriste vous contacte au plus vite pour convenir d'un rendez-vous pour le retrait de votre commande.
                </p>
              </div>
            )}
            <div className="text-left pt-4 border-t mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
              <p className="text-gray-700">{clientInfo.email}</p>
              <p className="text-gray-700">{clientInfo.phone}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/boutique" className="btn-primary">
            Continuer mes achats
          </Link>
          <Link to="/" className="btn-secondary">
            Retour à l'accueil
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-16 p-6 bg-gray-100 rounded-xl text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Mail size={16} className="text-gray-600" />
              <span className="text-sm text-gray-600">Une question ?</span>
            </div>
            <p className="text-sm text-gray-600">
              Contactez-nous à <a href="mailto:epifleurimagasin@outlook.com" className="text-rose-fonce hover:underline">epifleurimagasin@outlook.com</a> ou au <span className="text-rose-fonce">081 87 95 55</span>.
            </p>
          </div>
      </div>
    </div>
  );
};

export default Confirmation;
