import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case 'INITIALIZE_CART':
      return {
        ...state,
        items: action.payload,
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'SET_CART_LOADED':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: true, // Ajout de l'état de chargement
  });

  // Sauvegarder le panier dans localStorage
  useEffect(() => {
    // Ne pas sauvegarder pendant le chargement initial
    if (!state.loading) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, state.loading]);

  // Charger le panier depuis localStorage
  useEffect(() => {
    let isMounted = true;
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        if (isMounted && Array.isArray(items)) {
          dispatch({ type: 'INITIALIZE_CART', payload: items });
        }
      } catch (e) {
        console.error("Erreur lors du parsing du panier depuis localStorage", e);
      }
    }
    if (isMounted) {
      dispatch({ type: 'SET_CART_LOADED' }); // Indiquer que le chargement est terminé
    }
    return () => { isMounted = false; };
  }, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + ((item.prix || 0) * (item.quantity || 0)), 0);
  };

  const value = {
    items: state.items,
    loading: state.loading, // Exposer l'état de chargement
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 