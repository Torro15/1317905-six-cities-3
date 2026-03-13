
import PlaceCard from './place-card';
import { Offer } from '../types/offer';

type PlaceCardListProps = {
  cardsCount: number;
  offers: Offer[];
}

function PlaceCardList(props: PlaceCardListProps) : JSX.Element {

  const {offers, cardsCount} = props;

  const displayedOffers = offers.slice(0, cardsCount || offers.length);

  return (
    <div className="cities__places-list places__list tabs__content">
      {displayedOffers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>

  );
}

export default PlaceCardList;
