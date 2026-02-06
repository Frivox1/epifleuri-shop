# 🌸 epifleuri-shop

Un site e-commerce moderne et responsive pour une fleuriste, développé avec React, TailwindCSS et une intégration Stripe.

## 🚀 Fonctionnalités

### Pages principales
- **Page d'accueil** : Hero section, arguments de vente, témoignages clients
- **Boutique** : Grille de produits avec filtres par catégorie et couleur
- **Page produit** : Détails complets avec composition et occasions
- **Panier** : Gestion des quantités et calcul du total
- **Paiement** : Formulaire de livraison et intégration Stripe
- **Confirmation** : Message de remerciement et numéro de commande

### Fonctionnalités techniques
- ✅ Navigation responsive avec menu mobile
- ✅ Système de panier avec localStorage
- ✅ Filtres de recherche par catégorie et couleur
- ✅ Design moderne avec palette de couleurs florales
- ✅ Animations et transitions fluides
- ✅ Intégration Stripe (simulation)
- ✅ Livraison offerte dès 50€ d'achat

## 🛠 Technologies utilisées

- **React 18** - Framework frontend
- **React Router** - Navigation entre les pages
- **TailwindCSS** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes
- **Stripe** - Système de paiement (simulation)
- **Vite** - Build tool et dev server

## 🎨 Design

### Palette de couleurs
- **Rose pastel** : `#FDF2F8` - Arrière-plans doux
- **Rose foncé** : `#E91E63` - Accents et CTA
- **Vert sauge** : `#9CAF88` - Éléments secondaires
- **Blanc cassé** : `#FEFEFE` - Fond principal
- **Gris doux** : `#F8F9FA` - Sections neutres

### Typographie
- **Playfair Display** - Titres et headings
- **Inter** - Texte et contenu

## 📦 Installation et démarrage

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd epifleuri-shop
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

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
- Livraison offerte dès 50€
- Persistance dans localStorage
- Redirection automatique si panier vide

## 💳 Intégration Stripe

Le projet inclut une simulation de l'intégration Stripe :
- Formulaire de paiement complet
- Validation des champs
- Simulation du traitement
- Gestion des états de chargement

Pour une vraie intégration Stripe :
1. Installer `@stripe/stripe-js` et `@stripe/react-stripe-js`
2. Configurer les clés Stripe
3. Remplacer la simulation par de vrais appels API

## 📱 Responsive Design

Le site est entièrement responsive avec :
- **Mobile First** : Optimisé pour les petits écrans
- **Tablette** : Adaptation des grilles et navigation
- **Desktop** : Layout complet avec sidebar et filtres

## 🚀 Déploiement

### Vercel (recommandé)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload du dossier dist/
```

### Autres plateformes
Le projet utilise Vite, compatible avec toutes les plateformes de déploiement modernes.

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

## 🎯 Fonctionnalités bonus

- ✅ Bannière promo (livraison offerte)
- ✅ Filtres par occasion
- ✅ Design responsive complet
- ✅ Animations et micro-interactions
- ✅ SEO-friendly structure
- ✅ Accessibilité de base

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : contact@fleurdelys.fr
- Téléphone : 081 87 95 55

---

**Fleur de Lys** - Offrez des fleurs, offrez du bonheur 🌸
