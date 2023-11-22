import { useState } from "react";
import { useFetcher } from "react-router-dom";
import PropTypes from "prop-types";

export default function Favorite({ contact }) {
  const fetcher = useFetcher();

  // Initialize state based on contact.favorite
  const [favorite, setFavorite] = useState(contact.favorite);

  // Update state based on fetcher.formData
  if (fetcher.formData) {
    setFavorite(fetcher.formData.get("favorite") === "true");
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={!favorite ? "true" : "false"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}

// Define prop types
Favorite.propTypes = {
  contact: PropTypes.shape({
    favorite: PropTypes.bool,
  }).isRequired,
};
