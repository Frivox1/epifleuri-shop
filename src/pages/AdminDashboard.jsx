import { useState, useEffect } from 'react';
import { Shield, RefreshCw, CheckCircle, Clock, Trash2, LogOut } from 'lucide-react';
import { db } from '@/firebase.js';
import { collection, getDocs, orderBy, query, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert('Une erreur est survenue lors de la déconnexion.');
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ordersCollection = collection(db, 'orders');
      const q = query(ordersCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.orderId && order.orderId.includes(searchQuery)
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  const handleUpdateStatus = async (orderId, currentStatus) => {
    const newStatus = currentStatus === 'en-attente-de-paiement' ? 'payee' : 'en-attente-de-paiement';
    try {
      const orderDoc = doc(db, 'orders', orderId);
      await updateDoc(orderDoc, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err.message);
      alert('Impossible de mettre à jour le statut de la commande. Veuillez réessayer.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ? Cette action est irréversible.')) {
      try {
        await deleteDoc(doc(db, 'orders', orderId));
        fetchOrders();
      } catch (err) {
        console.error('Erreur lors de la suppression:', err.message);
        alert('Impossible de supprimer la commande. Veuillez réessayer.');
      }
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'en-attente-de-paiement':
        return (
          <span className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <Clock size={12} />
            <span>En attente de paiement</span>
          </span>
        );
      case 'payee':
        return (
          <span className="flex items-center space-x-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <CheckCircle size={12} />
            <span>Payée</span>
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {status || 'N/A'}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-playfair text-3xl font-bold text-gray-800">
            Tableau de bord administrateur
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher par ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={fetchOrders}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-rose-fonce text-white rounded-lg shadow-sm hover:bg-rose-700 transition-colors disabled:bg-gray-400"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              <span>{isLoading ? 'Chargement...' : 'Rafraîchir'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
            >
              <LogOut size={16} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
        
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">ID Commande</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Client</th>
                  <th scope="col" className="px-6 py-3">Contact</th>
                  <th scope="col" className="px-6 py-3">Détails</th>
                  <th scope="col" className="px-6 py-3">Adresse</th>
                  <th scope="col" className="px-6 py-3">Total</th>
                  <th scope="col" className="px-6 py-3">Statut</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.createdAt?.toDate().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) || 'N/A'}
                    </td>
                    <td className="px-6 py-4">{order.clientInfo.firstName} {order.clientInfo.lastName}</td>
                    <td className="px-6 py-4">
                      <div>{order.clientInfo.email}</div>
                      <div>{order.clientInfo.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      {order.orderItems.map(item => (
                        <div key={item.id}>
                          {item.nom} x {item.quantity}
                          {item.message && <p className="text-xs text-gray-500 italic">Message: "{item.message}"</p>}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {order.deliveryMethod === 'livraison' ? (
                        <>
                          <div>{order.clientInfo.address}</div>
                          <div>{order.clientInfo.postalCode} {order.clientInfo.city}</div>
                        </>
                      ) : (
                        <span>Retrait en magasin</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-rose-fonce">{order.total.toFixed(2)} €</td>
                    <td className="px-6 py-4">{getStatusChip(order.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleUpdateStatus(order.id, order.status)}
                          className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-xs"
                        >
                          <RefreshCw size={14} />
                          <span>Changer</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
                          title="Supprimer la commande"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && !isLoading && (
              <p className="text-center py-8 text-gray-500">Aucune commande pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
