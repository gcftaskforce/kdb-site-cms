# GCF Task Force Knowledge Database (CMS Component)

The KDB CMS is a client-site (webpack/babel) Javascript application. Users are authenticated by the KDB Website [https://github.com/gcftaskforce/kdb-site](https://github.com/gcftaskforce/kdb-site), which then enables inline CMS functionality for authorized users. Full CMS functionality is achieved by injecting buttons, forms, and modals into the the base website. Since session state is shared between the website and [API](https://github.com/gcftaskforce/kdb-api), the API is able to authorize POST requests from the CMS.

Please see [https://github.com/gcftaskforce/kdb-site/tree/master/views/partials](https://github.com/gcftaskforce/kdb-site/tree/master/views/partials) to understand what information is passed to the client.

## Environment

The global ```CLIENT_API_ENDPOINT``` specifying the base URI of the API must be available (usually via webpack plugin) to the application.

## Evolution of the CMS


