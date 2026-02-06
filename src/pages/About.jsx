import { Flower, Shield, Leaf, Sparkles, Heart, MapPin, Clock, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const commitments = [
    {
      icon: <Flower size={24} />,
      title: "Fleurs d'Exception",
      description: "Nous sélectionnons méticuleusement chaque fleur pour sa fraîcheur et sa beauté, en privilégiant les producteurs locaux."
    },
    {
      icon: <Leaf size={24} />,
      title: "Créativité Sans Limite",
      description: "Chaque bouquet est une œuvre d'art unique, composée avec passion et créativité par nos artisans fleuristes."
    },
    {
      icon: <Shield size={24} />,
      title: "Satisfaction Garantie",
      description: "Votre bonheur est notre priorité. Nous nous engageons à vous offrir une expérience et des produits irréprochables."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-pastel via-white to-rose-pastel py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-playfair font-bold text-4xl md:text-6xl text-gray-800 mb-6">
              Notre histoire, <br />
              <span className="text-rose-fonce">notre passion</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              L'Epi Fleuri est né d'un amour familial pour l'art floral, transmis de génération en génération.
            </p>
          </div>
        </div>
        <div className="absolute top-10 right-10 text-rose-fonce/20">
          <Sparkles size={40} />
        </div>
        <div className="absolute bottom-10 left-10 text-vert-sauge/20">
          <Heart size={40} />
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg text-gray-600">
              <h2 className="font-playfair font-semibold text-3xl text-gray-800 mb-4">
                De la graine à la fleur
              </h2>
              <p>
                Fondée il y a plus de 20 ans, L'Epi Fleuri est une histoire de famille. C'est dans notre petit atelier que nous avons cultivé notre savoir-faire, inspirés par la beauté simple et pure de la nature.
              </p>
              <p>
                Aujourd'hui, nous continuons de créer des bouquets qui racontent une histoire, la vôtre. Chaque composition est le fruit d'une écoute attentive de vos désirs et d'une recherche constante d'harmonie et d'élégance.
              </p>
              <p>
                Notre mission est simple : apporter une touche de poésie et de bonheur dans votre quotidien grâce au langage universel des fleurs.
              </p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1567699152345-a7a5a3a70612?q=80&w=2574&auto=format&fit=crop" alt="Artisan fleuriste composant un bouquet" className="rounded-xl shadow-lg w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Engagements */}
      <section className="py-16 bg-gris-doux">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-semibold text-3xl text-gray-800 mb-4">
              Nos Engagements Qualité
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Plus qu'un métier, une promesse de qualité et de créativité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-rose-fonce rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {commitment.icon}
                </div>
                <h3 className="font-playfair font-semibold text-xl text-gray-800 mb-2">
                  {commitment.title}
                </h3>
                <p className="text-gray-600">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-semibold text-3xl text-gray-800 mb-4">
              Nous Rendre Visite
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Venez découvrir notre univers floral et rencontrer nos artisans.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Informations */}
            <div className="space-y-8">
                <div className="flex items-start">
                    <MapPin size={24} className="text-rose-fonce mr-4 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-playfair text-xl font-semibold text-gray-800 mt-0 mb-1">Adresse</h3>
                        <p className="mt-0 text-gray-600">Chaussée de Namur 74<br/>1367 Ramillies</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Clock size={24} className="text-rose-fonce mr-4 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-playfair text-xl font-semibold text-gray-800 mt-0 mb-1">Horaires d'ouverture</h3>
                        <p className="mt-0 text-gray-600">
                            <strong>Lundi - Mardi :</strong> 9h00 - 18h00<br/>
                            <strong>Mercredi :</strong> Fermé<br/>
                            <strong>Jeudi - Samedi :</strong> 9h00 - 18h00<br/>
                            <strong>Dimanche :</strong> 9h00 - 13h00
                        </p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Phone size={24} className="text-rose-fonce mr-4 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-playfair text-xl font-semibold text-gray-800 mt-0 mb-1">Contact</h3>
                        <p className="mt-0 text-gray-600">
                            <strong>Téléphone :</strong> 081 87 95 55<br/>
                            <strong>Email :</strong> epifleurimagasin@outlook.com
                        </p>
                    </div>
                </div>
            </div>
            {/* Carte */}
            <div className="rounded-xl shadow-lg overflow-hidden h-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2524.364210674681!2d4.86454707662492!3d50.6300002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTAuNjMwMDAwMiwgNC44NjcxMTcx!5e0!3m2!1sen!2sus!4v1705128000000" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Adresse de L'Epi Fleuri"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* New inner div for the rounded background CTA */}
          <div className="bg-gradient-to-r from-rose-fonce to-rose-fonce/80 rounded-xl p-8 text-center mx-auto max-w-3xl">
            <h2 className="font-playfair font-semibold text-3xl text-white mb-4">
              Envie de découvrir notre univers ?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Parcourez notre collection et laissez-vous charmer par la beauté de nos créations.
            </p>
            <Link to="/boutique" className="bg-white text-rose-fonce px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Explorer nos bouquets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
