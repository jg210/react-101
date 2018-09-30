const RATINGS_URL = "http://api.ratings.food.gov.uk";

function fetchFromAPI(url) {
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'x-api-version': 2
        }
    });
}

export function fetchLocalAuthoritiesJson() {
    return fetchFromAPI(`${RATINGS_URL}/Authorities/basic`);
}

export function fetchEstablishmentsJson(localAuthorityId) {
    const url = `${RATINGS_URL}/Establishments?localAuthorityId=${encodeURIComponent(localAuthorityId)}&pageSize=0`;
    return fetchFromAPI(url);
}

// Return unordered Array of {name, localAuthorityId} objects.
export function extractLocalAuthorities(json) {
    return json.authorities.map(authority => ({
        name: authority.Name,
        localAuthorityId: authority.LocalAuthorityId
    }));
}

// Return ordered Array of unrounded { rating, percentage } objects.
export function ratingsPercentages(establishmentsJson) {
    const scoreCounts = new Map();
    let count = 0;
    establishmentsJson.establishments.forEach(establishment => {
        const rating = formatRating(establishment.RatingValue);
        let oldCount = scoreCounts.get(rating);
        if (oldCount === undefined) {
            oldCount = 0;
        }
        scoreCounts.set(rating, oldCount + 1);
        count++;
    });
    const ratings = Array.from(scoreCounts.keys()).sort();
    return ratings.map(rating => ({ rating: rating, percentage: 100 * scoreCounts.get(rating) / count }));
}

// Convert "RatingValue" from Establishments API to human-readable String.
export function formatRating(ratingValue) {
    if (ratingValue === "AwaitingInspection") {
        return "Awaiting Inspection";
    }
    if (ratingValue === "AwaitingPublication") {
        return "Awaiting Publication";
    }
    if (/^[0-9]+$/.test(ratingValue)) {
        return `${ratingValue}-star`;
    }
    return ratingValue;
}