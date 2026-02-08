import { Link } from 'react-router-dom';
import { Truck, Flower, Shield, Star, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback } from 'react';

const Home = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const testimonials = [
    {
      id: 1,
      name: "Marie L.",
      text: "Les bouquets de Fleur de Lys sont magnifiques ! Livraison rapide et fleurs fraîches.",
      rating: 5
    },
    {
      id: 2,
      name: "Pierre D.",
      text: "Service exceptionnel, ma femme a adoré le bouquet d'anniversaire. Je recommande !",
      rating: 5
    },
    {
      id: 3,
      name: "Sophie M.",
      text: "Fleurs de qualité, composition artistique. Parfait pour toutes les occasions.",
      rating: 5
    },
    {
      id: 4,
      name: "Julien B.",
      text: "Un service client à l'écoute et des créations florales qui sortent de l'ordinaire.",
      rating: 5
    },
    {
      id: 5,
      name: "Élodie F.",
      text: "J'ai commandé pour mon mariage, tout était parfait. Les fleurs étaient sublimes.",
      rating: 5
    },
    {
      id: 6,
      name: "Thomas R.",
      text: "Le meilleur fleuriste de la ville. Je ne vais plus que chez eux.",
      rating: 5
    },
    {
      id: 7,
      name: "Camille G.",
      text: "Bouquet reçu pour la Saint-Valentin, il était encore plus beau en vrai. Top !",
      rating: 5
    },
    {
      id: 8,
      name: "Lucas P.",
      text: "Fleurs très fraîches qui durent longtemps. Le rapport qualité-prix est excellent.",
      rating: 5
    },
    {
      id: 9,
      name: "Chloé V.",
      text: "Un choix incroyable et des conseils avisés. Je recommande les yeux fermés.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Truck size={24} />,
      title: "Livraison Rapide",
      description: "Livraison dans les 2 jours ouvrables dans toutes nos zones"
    },
    {
      icon: <Flower size={24} />,
      title: "Artisan Fleuriste",
      description: "Bouquets créés à la main par nos artisans passionnés"
    },
    {
      icon: <Shield size={24} />,
      title: "Qualité Garantie",
      description: "Fleurs fraîches et compositions durables"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-rose-pastel via-white to-rose-pastel py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
          <h1 className="font-playfair font-bold text-4xl md:text-6xl text-gray-800 mb-6">
            Offrez des fleurs,<br />
            <span className="text-rose-fonce">offrez du bonheur</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez nos bouquets artisanaux créés avec amour pour toutes vos occasions spéciales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/boutique" className="btn-primary text-lg px-8 py-4">
              Découvrir nos bouquets
            </Link>
            <Link to="https://www.epifleuri.be" className="text-lg px-8 py-4 border-2 border-rose-fonce bg-transparent text-rose-fonce rounded-lg hover:bg-rose-fonce/10 transition-colors duration-300">
              À propos de nous
            </Link>
          </div>
            </div>
          </div>
          
          {/* Éléments décoratifs */}
        <div className="absolute top-10 left-10 text-rose-fonce/20">
          <Sparkles size={40} />
        </div>
        <div className="absolute bottom-10 right-10 text-vert-sauge/20">
          <Heart size={40} />
        </div>
      </section>

      {/* Arguments de vente */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-semibold text-3xl text-gray-800 mb-4">
              Pourquoi choisir L'Epi Fleuri ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre expertise et notre passion au service de vos moments les plus précieux
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gris-doux hover:bg-rose-pastel transition-all duration-300">
                <div className="w-16 h-16 bg-rose-fonce rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="font-playfair font-semibold text-xl text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-rose-pastel">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-semibold text-3xl text-gray-800 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-gray-600">
              La satisfaction de nos clients est notre plus belle récompense
            </p>
          </div>
          
          <div className="embla relative">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="embla__slide">
                    <div className="bg-white p-6 rounded-xl shadow-md h-full">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <p className="font-semibold text-gray-800">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="embla__prev absolute top-1/2 -translate-y-1/2 left-[-1rem] bg-white p-2 rounded-full shadow-md" onClick={scrollPrev}>
              <ChevronLeft className="text-rose-fonce" />
            </button>
            <button className="embla__next absolute top-1/2 -translate-y-1/2 right-[-1rem] bg-white p-2 rounded-full shadow-md" onClick={scrollNext}>
              <ChevronRight className="text-rose-fonce" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-fonce to-rose-fonce/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair font-semibold text-3xl text-white mb-4">
            Prêt à offrir du bonheur ?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Découvrez notre collection de bouquets et trouvez le parfait pour vos proches
          </p>
          <Link to="/boutique" className="bg-white text-rose-fonce px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
            Voir la boutique
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
 