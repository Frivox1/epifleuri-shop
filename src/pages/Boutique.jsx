import { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import CardProduit from '../components/CardProduit';
import bouquetsData from '../data/bouquets.json';

const Boutique = () => {
  const [bouquets, setBouquets] = useState(bouquetsData);
  const [filteredBouquets, setFilteredBouquets] = useState(bouquetsData);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedColor, setSelectedColor] = useState('Toutes');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Extraire les catégories et couleurs uniques
  const categories = ['Tous', ...new Set(bouquets.map(b => b.categorie))];
  const colors = ['Toutes', ...new Set(bouquets.map(b => b.couleur))];

  // Filtrer les bouquets
  useEffect(() => {
    let filtered = bouquets;

    // Filtre par catégorie
    if (selectedCategory !== 'Tous') {
      filtered = filtered.filter(b => b.categorie === selectedCategory);
    }

    // Filtre par couleur
    if (selectedColor !== 'Toutes') {
      filtered = filtered.filter(b => b.couleur === selectedColor);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBouquets(filtered);
  }, [selectedCategory, selectedColor, searchTerm, bouquets]);

  const clearFilters = () => {
    setSelectedCategory('Tous');
    setSelectedColor('Toutes');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair font-bold text-4xl text-gray-800 mb-4">
            Notre Collection de Bouquets
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos créations artisanales, chaque bouquet est unique et créé avec passion
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un bouquet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Bouton filtres mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-secondary flex items-center space-x-2"
            >
              <Filter size={20} />
              <span>Filtres</span>
            </button>

            {/* Filtres desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field max-w-xs"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="input-field max-w-xs"
              >
                {colors.map(color => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="text-rose-fonce hover:text-rose-fonce/80 transition-colors duration-300"
              >
                Effacer les filtres
              </button>
            </div>
          </div>

          {/* Filtres mobile */}
          {showFilters && (
            <div className="lg:hidden mt-4 space-y-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    Catégorie: {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="input-field"
              >
                {colors.map(color => (
                  <option key={color} value={color}>
                    Couleur: {color}
                  </option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="w-full text-rose-fonce hover:text-rose-fonce/80 transition-colors duration-300"
              >
                Effacer les filtres
              </button>
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredBouquets.length} bouquet{filteredBouquets.length > 1 ? 's' : ''} trouvé{filteredBouquets.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille de produits */}
        {filteredBouquets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBouquets.map((bouquet) => (
              <CardProduit key={bouquet.id} produit={bouquet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="font-playfair font-semibold text-xl text-gray-800 mb-2">
              Aucun bouquet trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Voir tous les bouquets
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Boutique; 