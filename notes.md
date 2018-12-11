# Notes

## General
- Express sets up a server. 
- A server is an program that runs on a remote computer.
- Job: wait for http requests from clients.
- Request is a technical term for what is happening when type in url to browser. 
- Sends back response. 

> For development, easier to run an application server on local machine.
- So you will be running a client and server on your machine.
- User a browser to test server in one window.
- See respond in another browser.
- Then later deploy to a web server for other's to access. 

## Basic Server Ready
```js
const express = require('express');

const app = express(); // returns and express application

app.listen(3000); // set up development server
```
In terminal run, node app.js. Then go to localhost:3000. You will get `'Cannot GET /'`. Means that express is running and sending a response. Error is there because you have not told express how to respond to any requests yet.
> Unless using nodemon, need to restart the express server with every change. **Make sure to change the package.json 'main'**

## Routes
Express handles requests through routes. Path a user takes to access data on the server. Also called an `endpoint`, is a command to run a specific function, which in turn sends a response back to the client.

## HTTP Verbs
- GET - return something (URL is like a noun also called the resource)
  - 2 parameters - path, callback
- POST - server receive and process
https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods  
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status  

https://expressjs.com/en/4x/api.html#res.send

## State
- HTTP is a stateless protocol
  - server does not track relationship between one request and another
  - each transaction with a server is independent and unrelated

> Clients and servers have stateless interactions. A server retains no memory of the client after sending a response. So a client has to send complete information to a server every time it makes a request. 

- Tracking state takes a lot of architecture and memory. So by avoiding it, the web has been able to grow.  
- Cookies are how things like online carts are saved.
  - a piece of data that the server stores on the client (ex: web browser). Gives it back in the response.
  - then client also sends back the cookie in the next requests
  - stored in browser by domain

- databases and sessions are another way to save state

> Do not store sensitive data in cookies, because they are stored in plain test.

## Middleware
- when you are asked a question, you think about, then answer
    - the thinking part is like middleware
- what happens in the middle of the request and response cycle
- does something to the incoming data, then hands results off
- `body parser` process the incoming form submission data
- creates a body object on the request object
```js
const bodyParser = require('body-parser'); // middleware
app.use(bodyParser.urlencoded({extend: false})); // needed for post request to be read properly
```
- cookie parser (read cookie information)
`(req, res, next) => {}`
- often passed as an anonymous function
- runs everytime a request comes to the app
- next passes control forward through the app
- can depend on the order
    - earlier middleware functions will run before older  

Can run more than one middleware function in an app.use: 
```js
app.use((req, res, next) => {
  console.log('One');
  next();
},
(req, res, next) => {
  console.log('1.5');
  next();
})

app.use((req, res, next) => {
  console.log('Two');
  next();
})
```

Only run at a certain path:
```js
app.use('/one',(req, res, next) => {
  console.log('One');
  next();
}
```

Pass from one middleware function to the next:
```js
app.use((req, res, next) => {
  req.message = 'Made it!'; // message is not a keyword
  next();
})

app.use((req, res, next) => {
  console.log(req.message);
  next();
})
```
- can modify the request  the request object
- allow us to gather and compute data and send it back to the client
- Next function
    - signals end of function 
    > NEED to call next so that the app does not stop
    - can also end a function by sending a response (including render)

### Error Middleware
`(err, req, res, next) => {}`  

- Remember: when an app gets a request, it will go from one app.use call to the next looking for match
    - If gets to the end with no match and does not find errors, expresses native handler will send a 404 back to the client

## Redirect
- After a form submission prevents duplicate submissions if a user refreshes a page
- Try to visit a protected page, redirect to login, then redirect back to that original page
- In terms of HTTP, it represents a series of specific events.
  - Server responds with a redirect that contains url
  - Then immediately send another request
    - google bought gogle.com


## Errors
`Cannot GET /....` means that you have not set up the route

## Error Handling
To tell express that an error needs to be handled you need to pass it to the next function:
```js
// Middleware
app.use((req, res, next) => {
  console.log('hello');
  const err = new Error('error!!!'); // custom error object
  next(err);
})
```

## Query strings
`/main/4?key=value&key2=value2`
contains key value pairs

## Server static assets
`express.static(root)`