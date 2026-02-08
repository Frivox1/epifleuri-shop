const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-playfair text-3xl font-bold text-gray-800 mb-8">
          Mentions Légales
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <p className="text-sm text-gray-500">
            Conformément aux dispositions de la loi belge, nous vous informons que :
          </p>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              1. Éditeur du site
            </h2>
            <p className="text-gray-700">
              <strong>Dénomination sociale :</strong> Epi Fleuri<br />
              <strong>Forme juridique :</strong> [Forme juridique de l'entreprise, ex: SPRL, SA, Entreprise individuelle]<br />
              <strong>Adresse du siège social :</strong> [Adresse complète du siège social]<br />
              <strong>Téléphone :</strong> 081 87 95 55<br />
              <strong>Email :</strong> epifleurimagasin@outlook.com<br />
              <strong>Numéro d'entreprise (TVA) :</strong> [Numéro de TVA, ex: TVA BE 0123.456.789]<br />
              <strong>Tribunal de l'entreprise compétent :</strong> [ex: RPM Bruxelles]
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              2. Directeur de la publication
            </h2>
            <p className="text-gray-700">
              Le directeur de la publication du site est <strong>[Nom du directeur de la publication]</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              3. Hébergement
            </h2>
            <p className="text-gray-700">
              Le site est hébergé par :<br />
              <strong>Nom de l'hébergeur :</strong> [Nom de l'hébergeur, ex: Vercel, Netlify, OVH]<br />
              <strong>Adresse de l'hébergeur :</strong> [Adresse complète de l'hébergeur]<br />
              <strong>Téléphone de l'hébergeur :</strong> [Numéro de téléphone de l'hébergeur]
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              4. Propriété intellectuelle
            </h2>
            <p className="text-gray-700">
              L'ensemble de ce site relève de la législation belge et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              5. Conditions générales de vente (CGV)
            </h2>
            <p className="text-gray-700">
              Les conditions générales de vente sont accessibles sur notre site et doivent être consultées avant tout achat.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
