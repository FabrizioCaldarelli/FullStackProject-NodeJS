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
* **/database/[models|migrations|services|...]** : here are the models, services that work with models and migrations; I took this folder at root level to easily share models/services between microservices (using git submodule).
* **/events** : here are the definitions of all events managed by the project. I took this folder at root level for the same reason of database, to have shared through all microservices (in future...);
* **/app/[components|helpers|services|...]** : I need for an orchestrator folder that contains some logic. For example, in this folder I can put the code to start the middleware to receive/dispatch events between the apps in this folder.

Api, backend, frontend, socket, console, etc.. are all isolated processes that emit/receive event from the "master" process (in the app folder). The communication is based on udp/tcp socket, but I'll use DI so it can be replaced with redis, rabbitmq, kafka or other messagging publisher/consumer.

Also the logs are centralized, passing the chunk data to "master" process and using `winston` to write to final target.

Probably the technologies will be:

- Next.js for frontend (for the SEO);
- Express.js for api;
- Socket.io for socket (for demonstration purpose);
- TypeOrm for database;
- Socket based events (or redis);
- Winston to deliver the logs;

Now the project is deliberately monolithic because I often work alone or in small team, so the complexity and needed maintenance of microservices architecture would take too much time.

But I think that this architecture is ready to be split in microservices, because every root folder is an isolated container that knows nothing of each other. The only shared data are in "database" folder, to keep the database architecture simple and consistent.

For example, we want to develop a chat system. We could requests from api, frontend app (offline message using messagging section of website) or socket (realtime chat from web).

So when a new message arrive from any of these sources, the path is:

- a new message will be sent to rest api (or frontend, socket, etc..), for example POST /message
- when the api manage the request, it will send an event to master process and wait for the response;
- the master process receive the event, execute the request and send the callback;
- the rest api return the response;

<br />


## How isolated app emits event to master

Inside the client: 

```javascript
import { Event, EventMessageService } from 'events/services'
import { Message } from 'database/modes'

class MessageController
{
    var eventCallbacks = [];

    function postMessage(newMessageData : Message)
    {
        const eventMessageService = Container.get(EventMessageService);
        const eventFromMessageData : Event = eventMessageService.eventWithMessageData(newMessageData);
        const response = await EventManager.sendEvent(eventFromMessageData);
        return respone;
    }
}

class EventManager
{
    var eventsCallback = [];

    function constructor()
    {
        clientsocket = ... // create connection
        clientsocket.on('data', ({ request, response }) => {
            const evIndex = this.eventsCallback.findIndex(f => f.uuid === request.uuid);
            if(evIndex >= 0)
            {
                this.eventsCallback[evIndex].promise.resolve(response);
                // remove eventCallback from array
                this.eventsCallback.splice(evIndex, 1);
            }
        });
    }

    function sendEvent(newMessageData)
    {
        var uuid = 'd761af8e-0603-11ec-9a03-0242ac130003'; // random

        return new Promise((resolve, reject) => {
            this.eventsCallback.push({
                uuid,
                promise: { resolve, reject }
            })

            clientsocket.write({ 
                uuid,
                data: newMessageData
            });

        });
    }

}
```

## Create the boilerplate

From `src` folder, launch `npm start`.

When the script will be finished, I'll publish on npm so it can be called with

```
npx full-stack-project
```

## TODO

1) EventManager class in isolated app can be ported in a package;






