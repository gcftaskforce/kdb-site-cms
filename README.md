# GCF Task Force Knowledge Database (CMS Component)

The KDB CMS is a browser-side (webpack/babel compiled) Javascript application. Users are authenticated by the KDB Website [https://github.com/gcftaskforce/kdb-site](https://github.com/gcftaskforce/kdb-site), which then enables inline CMS functionality for authorized users. Full CMS functionality is achieved by injecting buttons, forms, and modals into the the base website. Since session state is shared between the website and [API](https://github.com/gcftaskforce/kdb-api), the API is able to authorize POST requests from the CMS.

Please see [https://github.com/gcftaskforce/kdb-site/tree/master/views/partials](https://github.com/gcftaskforce/kdb-site/tree/master/views/partials) to understand what information is passed to the browser.

Note that *native language* refers to the language of the region being viewed/edited (e.g. pt for Acre, Brazil).

Note that *references* are referred to as *citations*.

## Specifications/Features

The CMS requirements evolved significantly in the years following the application's original 2013 release, resulting in a somewhat complex implementation.

### Inline

Client specified that CMS features should be embedded within the context of the live website.

### Translations

For translated fields, client must be able to edit both rich text (HTML) and plaintext in all of the supported languages.

Additionally, an *integrated Google translate* feature must be provided. The **source** language choices for this feature will include both English and the *native language* of the region being edited.

This arrangement encourages an efficient workflow and produces the best possible collection of translations. Ideally:

1. Speakers of the *native language* submit or enter content.
2. The *integrated Google translate* feature is then used to derive an English version.
3. The English version can then be edited and cleaned up by an English speaker.
4. All other supported languages can be translated using the *integrated Google translate* feature.

#### Translation Status Indicator

Translations made using the *integrated Google translate* feature are recorded and indicated as such. This alerts the client that improvements could likely be made to the content.

### Timestamps

Timestamps indicating when a field was last changed must be maintained. Timestamps for all translations must likewise be maintained.

Note that timestamps were implemented in mid 2016. All extant data was timestamped `2016-01-01 00:00` at that time.

### Citations

For data fields that are cited, client must be able to edit the citation content (HTML). Citations are not translated. Changes to citations do not affect the underlying entity's timestamp.

### Partnerships

The *Partnerships* database is a later addition to the *Knowledge Database*. In addition to the features outlined above, *insert* and *delete* capability must be provided.

## Environment

The global `CLIENT_API_ENDPOINT` specifying the base URI of the API must be available to the application, usually via webpack plugin .
