## %mentat - An Urbit Chatbot

%mentat is an interface to a selection of AI models.  It is designed to work specifically 
with replicate models (https://replicate.com), however, with minor tweaks it can be tuned 
for OpenAI or inference/huggingface models if required.

It currently supports, queries, chat, image generation, and todo list management.  In progress
are message notifications, image generation for %turf and counter-prompted reminders.

You can find models to use at https://replicate.com/


## Quick install

Install %mentat and %mentat-ui from ...


## Urbit, Vite, and Mithril

This admin ui of Mentat is a mithril (https://mithril.js.org/) & JSX app running under Vite (https://vitejs.dev).
The back-end is an Urbit ship, which will hold conversation, context and model data.  It interacts with Groups Chat using the %gato app.


## Running on Dev

* `cd mentat-ui`
* `npm run dev` - Starts the development server at port 3000 (http://localhost:3000/apps/mentat/)
* `npm run build` - Builds the application (generates the files for a glob)
* `npm run preview` - Serves the build files locally at port 5000


## Uploading the glob

* Simply upload the entire `dist` folder through the docket globulator.


## Installation

First install the %mentat urbit app (https://gitlab.com/thuser/mentat)

Assuming you are installing from this GitLab repo, clone the repository locally and glob the dist folder to
your %mentat desk.


## Using %mentat

#### Creating a bot

%mentat works as a collection of LLM's running in child threads running under a parent threat that is managed
by %gato (https://github.com/midsum-salrux/gato).  %gato watches Groups Chats for tagged messages that are 
relevant to it and passes the message data to the %mentat parent thread.

Each parent thread is a bot.  It has a collection of models each tagged with a 'centag' (e.g. %img or %query).
Each model is an LLM running on https://replicate.com/ which requires a model-id and an api-key.

To set up a %mentat bot open the UI and click the `+` next to 'Models', this will create a new model (and
consequently a new bot - no model, no bot).

Fill in the fields on the 'Add a model' screen as follows:
* bot-id   - this is the message tag that %gato looks for in the chat.  If you have 'mentat' as your bot-id
             then %gato will read any messages that you start with `/mentat`
* centag   - this tags this particular model so that it runs with the correct child thread.  For example an
             image generation model would be tagged with `img` and a chat model with `chat`.  Currently valid
             tags are `img`, `query`, `chat`, and `todo` - more options are coming soon!
* label    - in future labels will enable further breakdown of models (e.g. separate conversation threads under
             the one bot).  For now, always set this to 'default'
* view     - `public` or `private` depending on whether you want everyone to be able to access your bot, or
             only the ship running it.
* model-id - alphanumeric model-id from replicate.com
* api-key  - your replicate access id
* timeout  - timeout in seconds, if left as zero it will be set to the default for that replicate model
* tokens   - the maximum number of tokens for the request, if left as zero it will be set to the default
             for that replicate model (note: many models default to quite a small number of tokens)

Once you have entered your model data, click confirm.  A new model/bot will be generated on your ship and
will become available in the `bot` dropdown list (this may take a few moments)

You can add multiple models - each for a different centag - to the same bot, simply repeat the process above
ensuring that you use the same bot-id each time.

#### Editing bot setup

If you need to edit the setup of your bot for any reason, simply select it in the sidebar, click its `edit`
button in the main panel and adjust your settings.

#### Starting and stopping a bot

To start or stop a bot use the `Start|Stop` option under the `bot` dropdown.  Each running bot has a simple
on/off button.

### Compendium

Your compendium is a record of all interactions with your bots, select `Compendium` in the ⋮ menu.
This will show your interactions broken down by `centag` and displayed in date order.

### Context

As yet the `context` item is non-functional.  In future this will allow limiting the context a model
sees to a particular date-time window.