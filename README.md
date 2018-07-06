Check out the app here: https://journaler.herokuapp.com


## Overview

Journaler is a front-end React application to give people a simple way to keep a journal. Past journals are accessible and searchable (by date, keywords, and, soon, themes). Users can set a daily word count goal, and quickly identify how often they write a journal, and hit their goals.

## Technology

Journaler uses the create-react-app pack for the React skeleton. It's a
single-page application that simulates routes using React Router. The backend
JSON API is built in Ruby on Rails: https://github.com/buckethead1986/journaler-api.
The database is Postgres and is responsible for keeping all of the data
pertaining to sessions, users, challenges, and comments. The user authentication
is built using a session controller in Rails and a JWT token to authenticate the
user via the Rails backend and in the user's local browser storage.

## Functionality

Journaler is for getting your thoughts down.  Every page has a journal area linked to state,
meant for quick access to start writing.  Any text entered before logging in or signing up is
retained through the login process.

After logging in, your journals become available. The past 30 days show in a scrollbar at the
top of the page, with identifiers depending on the presence of journals, and if you hit your
word count goal. Clicking on a day will bring up all journals from that day, each with delete,
edit, or (if large enough) expand buttons.

Clicking 'edit' on a journal loads that journal in the text area to the right, and 'new journal'
clears the text area.

'Help' brings up an explanation of symbols, allows some website personalization, and lets you
alter your word count goal (I like 750 words/day, but change it to whatever you'd like).

(Soon):
Journals will also have a 'stats' button, replacing the journal text area with metrics
for that journal.  Word count, theme, tags, etc.
Journals will have a favorite button, allowing you to keep a separate list of journals you want to
quickly access.
Date picker functionality, allowing you to check journal status by date, or in month view.

## Layout / Design

I used Googles Material UI for the design (with some select inline CSS). This
component-based styling allows for easy integration of components and an overall
cohesion of style. I mainly used Paper components, for all explanation text, past journals, and new
Journal text areas. The Appbar has Tab components for quick access to the last 30 days.

The design is meant to be near barebones, as my goal is for more behind the scenes algorithms, with the
front-end focus being ease of journaling.

## Design Patterns

I stuck with a container model for all components, and refactored methods into helper files when I could.
I tried to keep the code as DRY as possible, using conditional statements throughout to modify the same components
depending on the presence of absence of props. (TabCreator is a good example of this)
