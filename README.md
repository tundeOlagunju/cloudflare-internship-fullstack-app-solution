## Router Application
 A Faas serverless application built and deployed with Cloudflare Workers API. This project is a solution to the cloudflare internship application tasks. This project teaches me how to write applications with the Cloudflare Workers API, manage and develop them using the command-line tool Wrangler, and deploy them to the free workers.dev deployment playground.


### Description
The application randomly sends users to one of two webpages. And there is a roughly 50/50 chance of being sent to either of the two web pages. If a user visits the site and receives one of the two URLs, the URL chosen is persisted in a cookie so that they always see the same variant when they return to the application.
#### HTML Rewriter
HTML Rewriter of Cloudworkers API is used to modify the web pages as desired


### Running The Project

You can use [wrangler](https://github.com/cloudflare/wrangler) to generate a new Cloudflare Workers project based on this template by running the following command from your terminal:

```
wrangler generate myapp https://github.com/cloudflare/worker-template-router
```

Before publishing your code you need to edit `wrangler.toml` file and add your Cloudflare `account_id` - more information about publishing your code can be found [in the documentation](https://workers.cloudflare.com/docs/quickstart/configuring-and-publishing/).

Once you are ready, you can publish your code by running the following command:

```
wrangler publish
```


