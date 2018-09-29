## Build Instructions

Install nodenv and node-build (or use any other way to put correct
version of node on PATH):

https://github.com/nodenv/nodenv#installation
https://github.com/nodenv/node-build#installation

```
nodenv install $(cat .node-version)
npm install
npm start
```

View the application using:

http://localhost:3000/

## Development Environment

Same as Build Instructions, but also need to:

* Install Visual Studio Code (VSC).

* Install Google Chrome (for debugging with VSC).

* Accept "workspace recommendations" in VSC to install required plugins.

* Restart VSC after installing plugins, otherwise chrome debugger doesn't work.
