<div id="top"></div>
<div align="right">

[![LinkedIn][linkedin-shield]][linkedin-url]

</div>
<br />
<div align="center">

  <h1 align="center">COELLO ONE</h1>

  <p align="center">
    <br />
    <a href="https://github.com/dtoxvanilla1991/coello-one"><strong>Explore the docs »</strong></a>
  </p> -->
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-app">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The App

Empowering you to showcase your story—one sleeve at a time. Coello One combines bold design with active performance, celebrating individuality, artistry, and the confidence to stand out.
This is a full-stack AI-features integrated and AI-powered application utilizing Next.js for the frontend and Flask for the backend.

<p align="right">(<a href="#top">back to top</a>)</p>

## Screenshots of the app

Below are some screenshots illustrating key parts of the application.

![Home Page](https://github.com/user-attachments/assets/c7add38d-8c5d-4fd4-941c-e28a0654aea9)

App is still in development. Once MVP is completed, more core screenshots will be added and the app will be deployed to Vercel.

## Built With

Frameworks/libraries/languages used:

- [Next.js v15](https://nextjs.org/)
- [Next.js' Turbopack for Dev](https://nextjs.org/docs/app/api-reference/turbopack)
- [Ant Design](https://ant.design/)
- [Node.js](https://nodejs.org/en/)
- [Bun](https://bun.sh/)
- [Flask v3](https://flask.palletsprojects.com/en/stable/)
- [Tailwind v4](https://tailwindcss.com/)
- [Typescript v5](https://www.typescriptlang.org/)
- [Atomic Jotai](https://jotai.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Prettier](https://prettier.io/)
- [Eslint v9](https://eslint.org/)


<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

To get a local copy up and running follow these simple steps after downloading the files from the Github.

## Prerequisites

### Backend (Flask)
1. **Install dependencies:**
   ```bash
   python -m venv venv
   source venv/bin/activate        # On macOS/Linux
   pip install -r requirements.txt
   ```
2. **Run the Flask server**  
   ```python app.py```

3. The backend runs by default at http://localhost:3500.

### Frontend (Next.js)

#### Bun
This project uses Bun package manager. If you do not have it, run this in your terminal using Homebrew to install Bun globally:

```
brew tap oven-sh/bun
brew install bun
```
OR using an official script:
```
curl -fsSL https://bun.sh/install | bash
```

1. **Install dependencies**  
   ```bun install```

2. **Start the Next.js development server**  
     - 🔥 `bun start` - run development server
     - 🔧 `bun run dev` - run development server
     - 🔧 `bun run build` - build web app for production
 

3. Open your browser at http://localhost:3000.

## Implemented Features

- Semantic Search
- SSR for SEO and bundle js size optimizations
- Internationalization for US, GB and ES
- Easy and slick user purchase journey
- Data Storage
- A11y features (semantic HTML structure, ARIA attributes, ATL tags etc.)
- Various optimizations (lazy loading, code splitting, tree shaking, etc.)

## Ideas for Future Features

- Add Storybook for more effective building and maintenance of the custom UI components and pages in isolation (since the app mainly uses Ant Design component);
- CI/CD using Github Actions;
- Add unit tests using Jest, including edge cases;
- Add e2e tests using Cypress and Argos Screenshots;
- Add more graceful and "smart" error handling, providing the user with more information about the error and the development team with more information about the error;
- Move assets to Cloudinary (that hosts with on AWS and optimizes them for all devices) for maximum performance;
- Using dependency injection for better code scalability & testability;
- Logging & monitoring using FullStory;
- Crash/Error reports using Sentry;

## Contact

Project Link: [Coello One App](https://github.com/dtoxvanilla1991/coello-one)

<p align="right">(<a href="#top">back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/yuri-avdijevski

