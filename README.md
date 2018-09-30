## Build Instructions

Install nodenv and node-build (or use any other way to put correct
version of node on PATH):

* https://github.com/nodenv/nodenv#installation
* https://github.com/nodenv/node-build#installation

```
nodenv install $(cat .node-version)
npm install
npm start
```

View the application using:

http://localhost:3000/

## Development Environment

Same as Build Instructions, but also need to:

* Install Visual Studio Code (VSC).

* Accept "workspace recommendations" in VSC to install required plugins.

* Restart VSC after installing plugins, otherwise chrome debugger doesn't work.

* Install Google Chrome (for debugging with VSC).

* Install React Developer Tools in Chrome.

## Analysis of API

All HTTP requests are slow.

This gives a list of Authorities:

```
$ curl http://api.ratings.food.gov.uk/Authorities/basic -H "x-api-version: 2" -H "accept: text/json" > authorities.json
```

There are currently 392 authorities:

```
$ cat authorities.json | jq '.authorities[].Name' | wc -l
```

This lists Establishments for a single localAuthorityId:

```
$ curl 'http://api.ratings.food.gov.uk/Establishments?localAuthorityId=23&pageSize=0' -H "x-api-version: 2" -H "accept: text/json" > establishments_23.json
```

The localAuthorityId in the URL is the LocalAuthorityId not the LocalAuthorityIdCode in Authorities json.

These sound like they should be hygiene scores but are from 0-20:

```
$ cat establishments_23.json | jq '.establishments[].scores.Hygiene' | sort | uniq --count | sort -k2 -n
    121 0
     97 null
    577 5
     96 10
     19 15
      1 20
```

These look more plausible, but there are 6 not 5 levels:

```
$ cat establishments_23.json | jq '.establishments[].RatingKey' | sort | uniq --count | sort -k2 -n
     12 "fhrs_1_en-gb"
    160 "fhrs_4_en-gb"
     18 "fhrs_2_en-gb"
      2 "fhrs_0_en-gb"
    577 "fhrs_5_en-gb"
     61 "fhrs_exempt_en-gb"
      6 "fhrs_awaitinginspection_en-gb"
     75 "fhrs_3_en-gb"
```

This API gives mapping from ratingKey (like fhrs_1_en-gb) to ratingName (e.g. 1):

```
$ curl 'http://api.ratings.food.gov.uk/Ratings' -H "x-api-version: 2" -H "accept: text/json" > ratings.json
$ cat ratings.json | jq .ratings[].ratingName
"5"
"4"
"3"
"2"
"1"
"0"
"Pass"
"Improvement Required"
"Awaiting Publication"
"Awaiting Inspection"
"Exempt"
$ cat ratings.json | jq .ratings[].ratingKey
"fhrs_5_en-gb"
"fhrs_4_en-gb"
"fhrs_3_en-gb"
"fhrs_2_en-gb"
"fhrs_1_en-gb"
"fhrs_0_en-gb"
"fhis_pass_en-gb"
"fhis_improvement_required_en-gb"
"fhis_awaiting_publication_en-gb"
"fhis_awaiting_inspection_en-gb"
"fhis_exempt_en-gb"
```

## Same Origin Policy and CORS

The React app makes API requests from the browser. It is able to do this since the ratings server sets the "Access-Control-Allow-Origin: *" CORS header.

Relying on this might not be a good idea. It would be better to implement a proxy in the server hosting the React application. An easy way to do this for development only would be:

https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually

```
$ curl 'http://api.ratings.food.gov.uk/Ratings' -H "x-api-version: 2" -H "accept: text/json" --verbose > /dev/null 
> User-Agent: curl/7.35.0
> Host: api.ratings.food.gov.uk
> x-api-version: 2
> accept: text/json
> 
< HTTP/1.1 200 OK
< Cache-Control: public, max-age=600
< Content-Type: text/json; charset=utf-8
* Server Microsoft-IIS/8.5 is not blacklisted
< Server: Microsoft-IIS/8.5
< X-Version: v2.0
< X-Provider: Food Standards Agency
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET, POST
< Access-Control-Allow-Headers: Authorization, ApiKey, X-Api-Version
< Set-Cookie: ApplicationGatewayAffinity=c436113542c9b22bfefbedeae95a339e13778ca898918f178726c359d131e0a1;Path=/;Domain=api.ratings.food.gov.uk
< Date: Sun, 30 Sep 2018 10:00:09 GMT
< Content-Length: 2333
```