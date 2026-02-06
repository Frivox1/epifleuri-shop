# 🌸 epifleuri-shop

Un site e-commerce moderne et responsive pour une fleuriste, développé avec React et TailwindCSS.

## 🚀 Fonctionnalités

### Pages principales
- **Page d'accueil** : Hero section, arguments de vente, témoignages clients
- **Boutique** : Grille de produits avec filtres par catégorie et couleur
- **Page produit** : Détails complets avec composition et occasions
- **Panier** : Gestion des quantités et calcul du total
- **Paiement** : Formulaire de livraison
- **Confirmation** : Message de remerciement, étape suivante et récapitulatif
- **Admin dashboard** : Gestion des commandes

## 🛠 Technologies utilisées

- **React 18** - Framework frontend
- **React Router** - Navigation entre les pages
- **TailwindCSS** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes
- **Vite** - Build tool et dev server

## 🎨 Design

### Typographie
- **Playfair Display** - Titres et headings
- **Inter** - Texte et contenu

## 🏗 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Navbar.jsx      # Navigation principale
│   ├── Footer.jsx      # Pied de page
│   └── CardProduit.jsx # Carte produit
├── context/            # Contextes React
│   └── CartContext.jsx # Gestion du panier
├── data/               # Données statiques
│   └── bouquets.json   # Catalogue des bouquets
├── pages/              # Pages de l'application
│   ├── Home.jsx        # Page d'accueil
│   ├── Boutique.jsx    # Catalogue
│   ├── Produit.jsx     # Détail produit
│   ├── Panier.jsx      # Panier d'achat
│   ├── Paiement.jsx    # Page de paiement
│   └── Confirmation.jsx # Confirmation commande
├── App.jsx             # Composant principal
└── index.css           # Styles globaux
```

## 🛒 Fonctionnalités du panier

- Ajout/suppression de produits
- Modification des quantités
- Calcul automatique du total

## 📱 Responsive Design

Le site est entièrement responsive avec :
- **Mobile First** : Optimisé pour les petits écrans
- **Tablette** : Adaptation des grilles et navigation
- **Desktop** : Layout complet avec sidebar et filtres

## 🔧 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualise le build de production

## 📝 Données des bouquets

Les bouquets sont stockés dans `src/data/bouquets.json` avec :
- Informations de base (nom, prix, description)
- Composition détaillée
- Catégories et couleurs
- Occasions recommandées
- Disponibilité

**Epi Fleuri** - Offrez des fleurs, offrez du bonheur 🌸
