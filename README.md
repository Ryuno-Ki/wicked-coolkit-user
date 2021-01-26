# wicked-coolkit-user

A fun, nostalgic web toolkit built on Heroku and Salesforce. Check out [wickedcoolkit.com](https://wickedcoolkit.com) for instructions on how to create your own.

This repo contains the code that each individual can deploy to Heroku to manage their Wicked Coolkit.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Local Dev

This is an Express app that pulls in most of its functionality from the [`wicked-coolkit` package](http://npmjs.com/package/wicked-coolkit).

To run it, first run `npm run build` followed by `npm start`.

When running locally (and testing against a local database and Salesforce scratch org), you can create a `.env` file with the following variables:

```sh
DATABASE_URL=postgres://localhost:5432/heroku-wicked-coolkit
SALESFORCE_URL=https://test.salesforce.com
```
