const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-playfair text-3xl font-bold text-gray-800 mb-8">
          Politique de Confidentialité
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <p className="text-sm text-gray-500">
            Dernière mise à jour : [Date de la dernière mise à jour]
          </p>

          <p className="text-gray-700">
            Epi Fleuri, soucieux des droits des individus, notamment au regard des traitements automatisés et dans une volonté de transparence avec ses clients, a mis en place une politique reprenant l’ensemble de ces traitements, des finalités poursuivies par ces derniers ainsi que des moyens d’actions à la disposition des individus afin qu’ils puissent au mieux exercer leurs droits.
          </p>
          
          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              Article 1 - Le responsable du traitement
            </h2>
            <p className="text-gray-700">
              Le responsable du traitement de vos données personnelles est :<br />
              <strong>Epi Fleuri</strong><br />
              [Adresse complète du siège social]<br />
              Email : epifleurimagasin@outlook.com<br />
              Téléphone : 081 87 95 55
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              Article 2 - Collecte des données personnelles
            </h2>
            <p className="text-gray-700">
              Les données à caractère personnel qui sont collectées sur ce site sont les suivantes :<br/>
              - Prénom et nom<br/>
              - Adresse postale<br/>
              - Adresse mail<br/>
              - Numéro de téléphone<br/>
              - Données de commande (produits, messages, etc.)<br/>
              Ces données sont collectées lorsque vous effectuez une commande sur le site.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              Article 3 - Finalité de la collecte des données
            </h2>
            <p className="text-gray-700">
              La collecte et le traitement des données répondent aux finalités suivantes :<br/>
              - Gestion des commandes et de la livraison.<br/>
              - Gestion de la relation client et du service après-vente.<br/>
              - Amélioration de notre site et de nos services.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              Article 4 - Partage des données personnelles
            </h2>
            <p className="text-gray-700">
              Les données personnelles peuvent être partagées avec des sociétés tierces, exclusivement dans l’Union européenne, dans les cas suivants :<br/>
              - Lorsque vous utilisez les services de paiement, pour la mise en œuvre de ces services, le site est en relation avec des sociétés bancaires et financières tierces avec lesquelles il a passé des contrats.<br/>
              - [Lister ici d'autres partages si applicables, par exemple avec des transporteurs].
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              Article 5 - Durée de conservation des données
            </h2>
            <p className="text-gray-700">
              Vos informations personnelles sont conservées aussi longtemps que nécessaire pour le traitement de votre commande et pour la durée légale de conservation des documents comptables et fiscaux.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              Article 6 - Vos droits
            </h2>
            <p className="text-gray-700">
              En application de la réglementation applicable aux données à caractère personnel (RGPD), vous disposez des droits suivants :<br/>
              - Le droit d’accès, de rectification, de mise à jour, de complétude de vos données.<br/>
              - Le droit à l’effacement de vos données.<br/>
              - Le droit de retirer à tout moment votre consentement.<br/>
              - Le droit à la limitation du traitement de vos données.<br/>
              - Le droit d’opposition au traitement de vos données.<br/>
              - Le droit à la portabilité de vos données.<br/>
              Vous pouvez exercer ces droits en nous contactant à l'adresse email : epifleurimagasin@outlook.com, ou par courrier à l'adresse [Adresse complète du siège social].
            </p>
          </section>
          
          <section>
            <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
              Article 7 - Cookies
            </h2>
            <p className="text-gray-700">
             Le site peut collecter automatiquement des informations standards. Toutes les informations collectées indirectement ne seront utilisées que pour suivre le volume, le type et la configuration du trafic utilisant ce site, pour en développer la conception et l'agencement et à d'autres fins administratives et de planification et plus généralement pour améliorer le service que nous vous offrons.
            </p>
          </section>
          
          <div className="pt-6 border-t mt-6">
              <p className="text-xs text-gray-500">
                <strong>Avertissement :</strong> Cette politique de confidentialité est un modèle et ne saurait engager notre responsabilité. Elle doit être vérifiée et adaptée par un professionnel du droit pour correspondre à votre situation spécifique.
              </p>
           </div>

        </div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;
