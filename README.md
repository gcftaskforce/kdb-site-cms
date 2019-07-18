# GCF Task Force Knowledge Database (CMS Component)

The KDB Content Management System (CMS) is a browser-side (webpack/babel compiled) Javascript application. Users are authenticated by the KDB Website [https://github.com/gcftaskforce/kdb-site](https://github.com/gcftaskforce/kdb-site), which then enables inline CMS functionality for authorized users. Full CMS functionality is achieved by injecting buttons, forms, and modals into the base website. Since session state is shared between the website and [API](https://github.com/gcftaskforce/kdb-api), the API is able to authorize POST requests from the CMS.

## Terms

- *supported languages* refers to the collected languages of all the member nations (currently en, es, fr, id, pt).
- *native language* refers to the language of the region being viewed/edited (e.g. pt for Acre, Brazil).
- *citations* are listed on the website under the *References* heading.

## Specifications/Features

The CMS requirements evolved significantly in the years following the application's original 2013 release, resulting in a somewhat complex feature set.

### Inline

- The Client (CCF Task Force) specified that the CMS operate within the context of the live website rather than a separate panel or console.

### Text and Translations

- Text fields of both plaintext and rich text (HTML) must be available for display and editing.
- Text fields may be either translatable or not translatable.
- For translatable text fields, the client must be able to edit content in all of the *supported languages*.
- For translatable text fields, the capability to "instantly" perform a Google translation must be available and meet the following requirements.
  - *Instant Google Translate* must be able to translate **to** any *supported languages*.
  - *Instant Google Translate* must offer a choice to translate **from** either the *native language* or English.

These specification evolved in order to access the obvious benefits of Google's translation services, but with the following additional benefits:

1. the elimination of the necessity to copy/paste to/from the Google Translate website
2. the ability to clean up raw Google Translate results.

### Timestamps

- Timestamps indicating when a field was last changed must be maintained.
- Timestamps for each translation must likewise be maintained.

Note that timestamps were implemented in mid 2016. All extant data was timestamped `2016-01-01 00:00`.

### Citations

- Fields may be either cited or non cited (*contacts* and *partnerships* are not cited).
- For data fields that are cited, client must be able to edit the rich text (HTML). Citations are not translated. Changes to citations are not timestamped.

### Partnerships

The *Partnerships* database is a later addition to the *Knowledge Database*. In addition to the features outlined above, *insert* and *delete* capability must be provided.

## Implementation

Implementation is accomplished by displaying a small contextual panel of buttons/badges for each *editable* field. Note that *derived* fields (e.g. *Deforestation Trend*) are not editable and do not display a contextual panel.

The button/badge panel is contextual in that its content varies slightly depending on the field's data type and whether the field is translatable and/or cited, as described above.

The following screenshots illustrate the basic contextual panel.

<!-- Furthermore, using the

1. Speakers of the *native language* submit or enter content.
2. The *Instant Google Translate* feature is then used to derive an English version.
3. The English version can then be edited and cleaned up by an English speaker.
4. All other supported languages can be translated using the *integrated Google translate* feature. -->



#### Translation Status Indicator

Translations made using the *integrated Google translate* feature are recorded and indicated as such. This alerts the client that improvements could likely be made to the content.




## Environment

The global `CLIENT_API_ENDPOINT` specifying the base URI of the API must be available to the application (via webpack plugin).
