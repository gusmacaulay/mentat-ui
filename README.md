# Mentat

Mentat is a collection of LLM interfaces, bringing a helpful life admin assistant to Urbit.

## Urbit, Vite, and Mithril

This admin ui of Mentat is a mithril (https://mithril.js.org/) & JSX app running under Vite (https://vitejs.dev).
The back-end is an Urbit ship, which will hold conversation, context and model data.  It interacts with Groups Chat using the %gato app.

## Running on Dev

* `cd mentat-ui`
* `npm run dev` - Starts the development server at port 3000 (http://localhost:3000/apps/mentat/)
* `npm run build` - Builds the application
* `npm run preview` - Serves the build files locally at port 5000

## Uploading the glob

* Simply upload the entire `dist` folder through the docket globulator.

## Outstanding Development

* many, many things...
