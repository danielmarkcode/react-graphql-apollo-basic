# GraphQL API using React and Apollo Client
This component fetches the 10 latest holiday offers using the useQuery hook from Apollo Client, and then maps over the data to render an OfferTile component for each offer.

The useMutation hook is used to handle the markVisited mutation when an offer is clicked. The handleVisit function is called with the current offer ID, and then the markVisited mutation is executed with that ID.

The component displays a loading message when the data is loading, and an error message if there was an error fetching the data.
