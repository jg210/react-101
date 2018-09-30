import { extractLocalAuthorities, ratingsPercentages } from './FSA.js'
import _ from 'lodash';

const AUTHORITIES_JSON = require('../example_json/authorities.json');
const ESTABLISHMENTS_JSON = require('../example_json/establishments_23.json');

it('extracts local authorities from json', () => {
    const localAuthorities = extractLocalAuthorities(AUTHORITIES_JSON);
    expect(localAuthorities.length).toEqual(392);
    expect(localAuthorities[7]).toEqual({
        "localAuthorityId": 132,
        "name": "Antrim and Newtownabbey"
    });
});

it('extracts unique local authority ids from json', () => {
    const localAuthorities = extractLocalAuthorities(AUTHORITIES_JSON);
    let localAuthorityIds = localAuthorities.map(localAuthority => localAuthority.localAuthorityId);
    localAuthorityIds = new Set(localAuthorityIds);
    expect(localAuthorityIds.size).toEqual(localAuthorities.length);
});

function checkRatingPercentages(ratingPercentages, ratingsExpected, percentagesExpected) {
    expect(ratingsExpected.length).toEqual(percentagesExpected.length);
    const ratings = ratingPercentages.map(rating_percentage => rating_percentage.rating);
    expect(ratings).toEqual(ratingsExpected);
    const percentages = ratingPercentages.map(rating_percentage => rating_percentage.percentage);
    _.zip(percentages, percentagesExpected).forEach(pair => {
        let [percentage, percentageExpected] = pair;
        expect(percentage).toBeCloseTo(percentageExpected, /*numDigits*/3);
    });
    expect(percentages.length).toEqual(percentagesExpected.length);
}

// TODO No establishments.
// TODO One establishment.
// TODO A few establishments.

it('calculates expected percentages for local authority id 23', () => {
    const ratingPercentages = ratingsPercentages(ESTABLISHMENTS_JSON);
    expect(ratingPercentages.length).toEqual(8);
    checkRatingPercentages(ratingPercentages,
        [
            "0-star",
            "1-star",
            "2-star",
            "3-star",
            "4-star",
            "5-star",
            "Awaiting Inspection",
            "Exempt"
        ],
        [
            0.220,
            1.317,
            1.976,
            8.233,
            17.563,
            63.337,
            0.659,
            6.696
        ]);
});
