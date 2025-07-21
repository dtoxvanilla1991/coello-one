Repository Overview 🗺️
This repository is a monorepo containing two separate applications: a ***Next.js*** frontend and a ***Flask*** backend. All frontend-related commands use ***Bun*** as the package manager.

***Important:*** Always `cd` into the correct directory before running any commands specific to an application.

**Agent: coello-one (Next.js Frontend)** 🎨

This agent manages the Next.js application located in the `coello-one/` directory.

Location
`coello-one/`

Interaction Protocol
To work with this application, you must first change into its directory:
`cd coello-one`

Common Commands
 - Install dependencies: `bun install`

 - Run development server: `bun dev`

 - Build for production: `bun run build`

 - Run tests: `bun run test`

**Agent: `flask-server` (Flask Backend) ⚙️**

This agent manages the Flask API server located in the `flask-server/` directory.

***Location***
`flask-server/`

***Interaction Protocol***
To work with this application, you must first change into its directory:
`cd flask-server`

***Common Commands***
 - ***Install dependencies:*** pip install -r requirements.txt

 - ***Run the server:*** python app.py or flask run