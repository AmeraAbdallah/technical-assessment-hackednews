# HackedNews

## Copyright

&copy; 2018 Hack Reactor.  This material is copyrighted by Hack Reactor and may not be distributed to the public

## Prompt

You will be creating a full-stack application to display analytics about [HackerNews](https://news.ycombinator.com/) and its users. In order to do this you will be interacting with the [HackerNews API](https://github.com/HackerNews/API) using a worker process, and storing data from your calls to the API in MongoDB, using the [Mongoose ODM](http://mongoosejs.com/). Your front end will display views created from data in the database. You will have the choice of using either [AngularJS](https://angularjs.org/) or [ReactJS](https://facebook.github.io/react/), and will serve your application with a [NodeJS](https://nodejs.org/) web server, using [ExpressJS](https://expressjs.com/).

NAME WHICH FRONT END FRAMEWORK YOU WILL BE USING FOR THE ASSESSMENT HERE:
* *[ReactJS]*:

HOW TO START THIS APP
* *[Modify this section to tell graders how to start your app]*

By design, this assessment contains more work than you will be able to complete in a day, so don't be concerned about not completing all of the features below. Rather, please work on the following features **in order**, moving on to the next feature only after the one you are working on is complete. **Please commit WORKING code early and often**. In addition, after each step, please follow the guidelines for a commit message.

### Part 1 - Top Ten Stories

1. **As a user**, I want to be able to view the Top Ten Stories on Hacker News (for now, this will be accomplished with the dummy data provided, not live data from the Hacker News API).

*Please see mockup below - remember, you do NOT need to match the styling, just the content structure.*

![top-ten-stories](top-ten-stories.png)

To implement this user story, you should:

* Serve your application from the provided ExpressJS web server.
* If using Angular:
  * Use the existing code in the `angular-client` directory and the dummy data to build the `topTenList` view in `angular-client/templates/topTenList.html`.
  * Start your application with the command `npm start`.
* If using React:
  * Use the existing code in the `react-client` directory and the dummy data to build the `topTen` view in `react-client/src/components/topTen.jsx`. You may also need to modify `react-client/src/index.jsx`.
  * Start your application with two commands `npm start` and `npm run dev-react` in two separate terminal tabs. For more information about webpack, read the comments in `webpack.config.js` or take a look at [the Webpack Docs](https://webpack.github.io/docs/).
* Write a script that would add the dummy data to your database when `npm run seed-database` is run from the command line. Check out the `package.json` file to see what this command does. When you have this working, run the command so that your database is populated.
* Complete the route `/api/stories` in `server/routers/story.js` so that requests to this route are responded to with the data for the top ten stories, retrieved from the database.
* Once you have your front end views working with the dummy data, refactor your front end to retrieve  seed data from the server rather than using the dummy data in the client side files.
* **WHEN COMPLETE AND WORKING, make a commit that says `Part 1 Complete`**

### Part 2 - Authors of Top Stories

1. **As a user**, I want to be able to view the authors of the top ten stories, sorted by their karma (for now, this will be accomplished with the seed data retrieved from the server, not live data from the Hacker News API).
1. **As a user**, I want to be able to switch between the top ten stories view and the top ten authors view.

*Please see mockup below - remember, you do NOT need to match the styling, just the content structure.*

![top-ten-authors](top-ten-story-authors.png)

To implement this user story, you should:
* Create any new components or directives as necessary
* Create any new server side routes as necessary
* Create or update any database schemas and models as necessary
* Modify the seed.js file to also add author information to the mongo database (if needed, look up how to drop your existing stories collection)

* **WHEN COMPLETE AND WORKING, make a commit that says `Part 2 Complete`**



### Part 3 - Worker

1. **As a user**, I want up to date information about the top ten stories, not just seed data.
1. **As a developer**, I want an easy way to add up to date information about the top ten stories to the database.

To implement this user and developer story, you should:

* Build out `worker.js` to store the top stories and top authors it gets from the [HackerNews API](https://github.com/HackerNews/API) in MongoDB, using `db/models/story.js`. You will have to use the ids from your initial request to the API, in order to make additional API requests for stories, as well as use the author username to make additional API requests for author information. (*NOTE: A story's score is not directly related to its rank. You may confirm the current top 10 stories by going to [Hacker News](https://news.ycombinator.com/)*).
* Add an additional npm script to the `package.json` so that a developer could run the worker.js file to populate the database instead of the seed.js script

* **WHEN COMPLETE AND WORKING, make a commit that says `Part 3 Complete`**


### Part 4 - Author Search

1. **As a user**, I want to be able to see a list of stories by a certain author.
1. **As a user**, I want to be able to switch between the top ten stories view, the top ten authors view, and the author search view.
1. **As a developer**, I want to be able to save the story information retrieved from the HackerNews API in the database so that I don't have to fetch it from the API every time.


*Please see mockups below - remember, you do NOT need to match the styling, just the content structure.*

![author-search-a](author-search-a.png)
![author-search-b](author-search-b.png)

To implement this user and developer story, you should:
* Create any new components or directives as necessary
* Create any new server side routes as necessary
* Create or update any database schemas and models as necessary

* **WHEN COMPLETE AND WORKING, make a commit that says `Part 4 Complete`**

### Part 5 - Story Recommendations

1. **As a user**, when I click on a story in the top ten view, I want to be able to see 10 other stories _similar_ to this story.
1. **As a user**, I want to be able to switch between the top ten stories view, the top ten authors view, the author search view, and the recommended story view.

*Please see mockup below - remember, you do NOT need to match the styling, just the content structure.*

![recommended-stories.png](recommended-stories.png)

To implement this user story, you should:
* Find ten similar stories using the following specification:
  * Recommend stories based on number of shared commenters it has with the story you clicked on. For example, if the story you clicked on has, 4 commenters, *CommenterA*, *CommenterB*, *CommenterC*, and *CommenterD*, a highly recommended story would be another story that all 4 of these same commenters have commented on. A less recommended story would be one that only 3 of the 4 commenters commented on. You would never recommend a story that none of the 4 commenters have commented on. These recommended stories do not have to, and will most likely not, be in the top ten current stories.
  * If the story has the same number of shared commenters, sort the story with the highest score first.

* **WHEN COMPLETE AND WORKING, make a commit that says `Part 5 Complete`**


### Part 6 - Live Update

1. **As a developer**, I want the top ten stories in the database to refresh every minute.

To implement this developer story, you should:
* Refactor your application so that `worker.js` runs every minute.
* Refactor you application so that your views automatically refresh when `worker.js` provides it with new data that would affect the view.

* **WHEN COMPLETE AND WORKING, make a commit that says `Part 6 Complete`**


## Available Resources

* [Stack Overflow](http://stackoverflow.com/)
* [MDN](https://developer.mozilla.org/)
* [ExpressJS Docs](https://expressjs.com/)
* [Body Parser Middleware Docs](https://github.com/expressjs/body-parser)
* [Mongo Docs](https://www.mongodb.com/)
* [Mongoose ODM Docs](http://mongoosejs.com/)
* [HackerNews API](https://github.com/HackerNews/API)
* [AngularJS Docs](https://angularjs.org/)
* [ReactJS Docs](https://facebook.github.io/react/)
* [React Router Docs](https://github.com/ReactTraining/react-router/tree/master/docs)
* [Webpack Docs](https://webpack.github.io/docs/)
* [Babel Docs](https://babeljs.io/docs/setup/)
* [NodeJS Docs](https://nodejs.org/)
* [ExpressJS Docs](https://expressjs.com/)
* [jQuery Docs](https://jquery.com/)
* [Postman](https://www.getpostman.com/)
* [BluebirdJS Docs](http://bluebirdjs.com/)
* Docs for any npm packages you might use
* [Google Search](https://google.com) to search for the correct page on any of the documentation above
