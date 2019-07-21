# GCF Task Force Knowledge Database (CMS Component)

## Terms

- *supported languages* refers to the collected languages of all the member nations (currently **en**, **es**, **fr**, **id**, **pt**).
- *native language* refers to the language of the region being viewed/edited (e.g. **pt** for Acre, Brazil).
- *citations* are listed on the website under the *References* heading.

## Specifications/Features

The CMS requirements evolved significantly in the years following the application's original 2013 release, resulting in a somewhat complex feature set.

### Inline Requirement

- The client (CCF Task Force) specified that the CMS operate within the context of the live website rather than a separate panel or console.

### Text and Translations Requirements

- Text fields of both plaintext and rich text (HTML) must be available for display and editing.
- Text fields may be either translatable or not translatable.
- If there is no translation for the currently selected language, English will be displayed. If there is no English translation, an attempt will be made to display content from any *supported language* before defaulting to an empty string.
- For translatable text fields, the client must be able to edit content in all of the *supported languages*.
- For translatable text fields, an *Instant Google Translate* feature having the capability to "instantly" perform a Google translation must be available. The *Instant Google Translate* feature must meet the following detailed requirements.
  - *Instant Google Translate* must be able to translate **to** any *supported languages*.
  - *Instant Google Translate* must offer a choice to translate **from** either the *native language* or English.

These specifications evolved in order to utilize Google's translation services, but without requiring the client to copy/paste to/from the Google Translate website and without locking the client into raw (*unimproved*) Google translations. Additionally, the final implementation tracks whether a translation is an *unimproved* Google translation or has undergone cleanup.

The client is thus able to choose which translation serves as source (usually either English or the *native language*). The client is furthermore able to choose which translations receive the additional time/effort of direct editing to clean up the *unimproved* Google translation.

### Timestamp Requirement

- Timestamps indicating when a field was last changed must be maintained.
- Timestamps for each translation must likewise be maintained.

Note that timestamps were implemented in mid 2016. All extant data was timestamped `2016-01-01 00:00`.

### Citation Requirement

- Fields may be either cited or non cited (*contacts* and *partnerships* are not cited).
- For data fields that are cited, client must be able to edit the rich text (HTML). Citations are not translated. Changes to citations are not timestamped.

### Partnerships Requirement

The *Partnerships* database is a later addition to the *Knowledge Database*. In addition to the features outlined above, *insert* and *delete* capability must be provided.

Partnerships introduce several additional considerations. These are detailed below using annotated screenshots.

## Implementation

Implementation is accomplished by displaying a small contextual panel ![Contextual Panel](/public/images/screenshots/cms_contextual_panel.png) of buttons/badges for each *editable* field. Note that *derived* fields (e.g. *Deforestation Trend*) are not editable and do not display a contextual panel.

The button/badge panel is contextual in that its content varies slightly depending on the field's data type and whether the field is translatable and/or cited, as described above.

Additionally, hovering over a contextual panel's "edit" button reveals the field's timestamp.

<p align="center">
  <img src="https://raw.githubusercontent.com/gcftaskforce/kdb-site-cms/master/public/images/screenshots/cms_timestamp.png" alt="General Editing" width="500">
</p>

The following annotated screenshots illustrate use of the contextual panel as well as important considerations when editing KDB data/content.

### General Editing

<p align="center">
  <img src="https://raw.githubusercontent.com/gcftaskforce/kdb-site-cms/master/public/images/screenshots/cms_base.png" alt="General Editing" width="600">
</p>

Notes:

- Separate buttons for editing data/content and citations.
- The "T" inside the yellow *translation badge* indicating a translatable field. A "G" indicates a raw Google translation.

___

### Text/Translation Editing

![Text Editing](/public/images/screenshots/cms_text.png)

Notes:

- All edits apply to the currently selected language (Portuguese).
- *Instant Google Translate* feature is available for both the *native language* (Spanish for Piura, Peru) as well as English

___

### Partnerships Editing

![Partnership Overview](/public/images/screenshots/cms_partnership_overview.png)

Partnerships introduce several additional considerations.

When editing translated content for a given partnership, selecting a different language will cause the page position to be lost. The *jump to* feature (see top left red circle annotation above) allows the user to switch between languages while keeping track of a given partnership in order to work with its translations.

Additionally, note that each partnership corresponds to a **single** database record, which is cross listed for display on the KDB website. Any partnership is **always** listed under its member nation **plus** under the jurisdictions hilighted under the "Jurisdictions" heading.

Note the following:

- Edits to a partnership will appear everywhere it's cross listed.
- Deleting a partnership will delete it from everywhere it's cross listed.
- Use the button beside "Jurisdictions" to add/remove jurisdictions.

## Technical Overview

The KDB Content Management System (CMS) is a browser-side (webpack/babel compiled) Javascript application. Users are authenticated by the KDB Website [https://github.com/gcftaskforce/kdb-site](https://github.com/gcftaskforce/kdb-site), which then enables inline CMS functionality for authorized users. Full CMS functionality is achieved by injecting buttons, forms, and modals into the base website. Since session state is shared between the website and [API](https://github.com/gcftaskforce/kdb-api), the API is able to authorize POST requests from the CMS.

## Environment

The global `CLIENT_API_ENDPOINT` specifying the base URI of the API must be available to the application (via webpack plugin).
