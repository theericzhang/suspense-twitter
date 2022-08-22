# suspense-twitter, a small Twitter clone demonstrating asynchronous loading
Using Twitter-API-v2, I aim to fetch data containing the last 5 tweets from my timeline to use to demonstrate [ React 18's suspense feature ] (https://reactjs.org/docs/react-api.html#reactsuspense). 

## Serving data using Node

Spinning up a server on server.js, I can authenticate my app to connect to Twitter-API-v2 and return datasets from 5 tweets I plan on using to hydrate tweet components with
