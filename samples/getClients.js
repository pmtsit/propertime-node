const ProperTimeClient = require('../lib/').default;

const properTimeClient = new ProperTimeClient('uris', '4830750d-6baf-a73e-923d-b8050ba1d28d');

properTimeClient.clients.list().then((clients) => console.log(JSON.stringify(clients)));
