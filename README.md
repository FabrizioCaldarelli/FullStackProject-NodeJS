# Full Stack Project with NodeJS
A boilerplate for a full stack project (public frontend, admin backoffice, rest api, socket, events subscriptors, etc....) with node js using typescript.

I worked for many years using a full stack project template based on PHP (specifically Yii2), but I feel the need to use a more modern technology for my projects.

The limits I'm encountering are:

- Frontend: absolutely need for React (or Vue), because I've tried to inject Vue inside a legacy js but, although it was possible, it introduced a lot of problems when the app started to grow; my choise is to use Next.js, that 
it is based on my friend React and it is SEO friendly. The right mix!

- Backend: same reasons of frontend, but in this case the choise could also be React.js only client side; 

- Api: I was looking for the simplest way to implement api without loading all framework bootstrap steps; Express is awesome!

Finally, another important point is to have a project structure that can be easily ported to microservices.

For this scope, I thought a shared database between the future microservices to avoid any foreign key / constraint problems.

So the structure I liked is based on "isolated process (or container)" of the project:

* **/http/[api|backend|frontend]** : apps based on http channel, at least "api" to deliver rest service. Each app is indipendent, any framework can be used;
* **/socket/** : apps based on socket channel. I'll put a chat based on socket.io for purpose demonstration;
* **/console/[controllers|routes|...]** : commands started from terminal. I wanted a structure similar to http, based on controllers and routes, because I think they are easily remembered;
* **shared**:
    * **/shared/database/[models|migrations|services|...]** : here are the models, services that work with models and migrations; I took this folder at root level to easily share models/services between microservices (using git submodule).
    * **/shared/events** : here are the definitions of all events managed by the project. I took this folder at root level for the same reason of database, to have shared through all microservices (in future...);
    * **/shared/services** : services/functionalities provided by the project
* **/app/[bootstrap|event middleware]** : I need for an orchestrator folder that contains some logic. For example, in this folder I can put the code to start the middleware to receive/dispatch events between the apps in this folder or bootstrap the project.

Api, backend, frontend, socket, console, etc.. are all isolated processes but they can:

* access all to `shared` folder code. 
* communicate among them based on udp/tcp socket to deliver events, but I'll use DI so it can be replaced with redis, rabbitmq, kafka or other messagging publisher/consumer.

Also logs use a shared services, based on  `winston` to write to final target.

A `package.json` will be in `shared` folder to avoid to duplicate libraries in all client that use them (api, frontend, backend, socket, etc...).

Probably the technologies will be:

- Next.js for frontend (for the SEO);
- Express.js for api;
- Socket.io for socket (for demonstration purpose);
- TypeOrm for database;
- Socket based events (or redis);
- Winston to deliver the logs;

Now the project is deliberately monolithic because I often work alone or in small team, so the complexity and needed maintenance of microservices architecture would take too much time.

But I think that this architecture is enough ready to be split in microservices, because every root folder is an isolated container that knows nothing of each other, except code in `shared` folder.

For example, we want to develop a chat system. We could requests from api, frontend app (offline message using messagging section of website) or socket (realtime chat from web).

So when a new message arrive from any of these sources, the path is:

- a new message has received from rest api (or frontend, socket, etc..), for example POST /message
- when the api manage the request, it execute `MessageService` in shared/services folder;
- the rest api return the response;

<br />


## Create the boilerplate

From `src` folder, launch `npm start`.

When the script will be finished, I'll publish on npm so it can be called with

```
npx full-stack-project
```

## TODO

