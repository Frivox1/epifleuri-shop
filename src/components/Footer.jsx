import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-rose-fonce rounded-full flex items-center justify-center">
                <span className="text-white font-playfair font-bold text-lg">F</span>
              </div>
              <span className="font-playfair font-semibold text-xl text-gray-800">
                Epi Fleuri
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Offrez des fleurs, offrez du bonheur. Notre artisan fleuriste crée des bouquets 
              uniques pour toutes vos occasions spéciales.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-fonce transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-fonce transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-fonce transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair font-semibold text-lg text-gray-800 mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-rose-fonce" />
                <span className="text-gray-600">081 87 95 55</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-rose-fonce" />
                <span className="text-gray-600">epifleurimagasin@outlook.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-rose-fonce mt-1" />
                <span className="text-gray-600">
                  Chaussée de Namur 74<br />
                  1367 Ramillies
                </span>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-playfair font-semibold text-lg text-gray-800 mb-4">
              Horaires
            </h3>
            <div className="space-y-2 text-gray-600">
              <div>
                <span className="font-medium">Lundi - Mardi:</span><br />
                9h00 - 18h00
              </div>
              <div>
                <span className="font-medium">Mercredi:</span><br />
                Fermé
              </div>
              <div>
                <span className="font-medium">Jeudi - Samedi:</span><br />
                9h00 - 18h00
              </div>
              <div>
                <span className="font-medium">Dimanche:</span><br />
                9h00 - 13h00
              </div>
            </div>
          </div>
        </div>

        {/* Bannière promo */}
        <div className="mt-8 p-4 bg-rose-pastel rounded-lg border border-rose-fonce/20">
          <div className="text-center">
            <p className="text-rose-fonce font-semibold">
              🌸 Livraison fixe de 10€ ! 🌸
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Epi Fleuri. Tous droits réservés. | 
            <a href="/mentions-legales" className="hover:text-rose-fonce transition-colors duration-300 ml-1">
              Mentions légales
            </a> | 
            <a href="/politique-confidentialite" className="hover:text-rose-fonce transition-colors duration-300 ml-1">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 