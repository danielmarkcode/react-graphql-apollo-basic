import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import OfferTile from './OfferTile';

const GET_OFFERS = gql`
  query GetOffers($limit: Int!, $sort: Sort!) {
    offers(limit: $limit, sort: $sort) {
      id
      name
      imageUrl
      dateAdded
      description
      value
      currency
      visitedCount
    }
  }
`;

const MARK_VISITED = gql`
  mutation MarkVisited($offerId: String!) {
    markVisited(offerId: $offerId) {
      id
      visitedCount
    }
  }
`;

const OfferListing = () => {
  const { loading, error, data } = useQuery(GET_OFFERS, {
    variables: { limit: 10, sort: { by: "DATE_ADDED", order: "DESC" } },
    fetchPolicy: "cache-and-network",
  });

  const [markVisited] = useMutation(MARK_VISITED);

  const handleVisit = (offerId) => {
    markVisited({ variables: { offerId } });
  }

  if (loading) {
    return <div>Loading offers...</div>;
  }

  if (error || !data) {
    return <div>Failed to load offers</div>;
  }

  return (
    <div>
      {data.offers.map((offer) => (
        <OfferTile
          key={offer.id}
          name={offer.name}
          visitedCount={offer.visitedCount}
          price={`${offer.value} ${offer.currency}`}
          imageUrl={offer.imageUrl}
          description={offer.description || ''}
          clickHandler={() => handleVisit(offer.id)}
        />
      ))}
    </div>
  );
};

export default OfferListing;
