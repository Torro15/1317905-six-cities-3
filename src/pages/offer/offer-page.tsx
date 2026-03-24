import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Offer, OfferCard } from '../../types/offer.ts';
import { Review } from '../../types/review.ts';
import OfferGallery from '../../components/offer/offer-gallery.tsx';
import Map from '../../components/map/map.tsx';
import OfferNearbyPlaces from '../../components/offer/offer-nearby-places.tsx';
import OfferInfo from '../../components/offer/offer-info.tsx';

type OfferPageProps = {
  offers: Offer[];
  offerCards: OfferCard[];
  nearOffers: number;
  reviews: Review[];
}

function OfferPage({ offers, offerCards, nearOffers, reviews }: OfferPageProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [cardActive, setCardActive] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const currentOffer = offers.find((o) => o.id === id);

  const nearbyOffers = offerCards
    .filter((offer) => offer.id !== id)
    .slice(0, nearOffers);

  const handleCardHover = (offerId: string) => {
    setCardActive(offerId);
  };

  const handleCardLeave = () => {
    setCardActive(null);
  };

  if (!currentOffer) {
    return <div>Offer not found</div>;
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery images={currentOffer.images} />
        <OfferInfo
          offer={currentOffer}
          reviews={reviews}
        />
        <Map
          mapName="offer"
          offers={nearbyOffers}
          activeOfferId={cardActive}
        />
      </section>

      <OfferNearbyPlaces
        offers={nearbyOffers}
        onCardHover={handleCardHover}
        onCardLeave={handleCardLeave}
      />
    </main>
  );
}

export default OfferPage;
