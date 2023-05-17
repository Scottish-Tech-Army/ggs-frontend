<div id="top"></div>
<!--
*** This README is adapted from the Best-README-Template by othneildrew.
*** @ https://github.com/othneildrew/Best-README-Template
-->

<!-- PROJECT SHIELDS -->
<!--
*** Note from the original template author:
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Scottish-Tech-Army/ggs-frontend">
    <img src="src/assets/images/gg-logo.png" alt="Logo" width="auto" height="80">
  </a>

<h3 align="center">Girl Guiding Scotland Treasure Hunt</h3>

  <p align="center">
    Web application developed for mobile providing a treasure hunt of Scottish landmarks, where girl guides can interact and compete with units across the organisation. This application can be extended for different events.
    <br />
    <a href="https://github.com/Scottish-Tech-Army/ggs-frontend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Scottish-Tech-Army/ggs-frontend">View Demo</a>
    ·
    <a href="https://github.com/Scottish-Tech-Army/ggs-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Scottish-Tech-Army/ggs-frontend/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>
<br>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>This is a treasure hunting progressive web app for Girl Guiding Scotland.</p>
<p>The front end and back end code bases are stored in separate repositories. This is the frontend project. You can find the backend project <a href="https://github.com/Scottish-Tech-Army/ggs-backend">here</a>.</p>

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email`, `email_client`, `project_title`, `project_description` -->

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/en/)
- [React.js](https://reactjs.org/) 
The original coder created this app by using NodeJS module create-react-app.
create-react-app uses bundler webpack under the hood (ie in a way that is 
not configurable by the coder). create-react-app also transpiles sass files
automatically into CSS, so this app requires the coder simply to write (CSS) 
classes for React components in a Sass file called style.scss then to import 
style.scss into React components. Do not create a CSS file and import that 
into React components. Put your CSS directly in the Sass files (style.scss
and the file that it imports, _custom.scss)
- [Bootstrap](https://getbootstrap.com)
Bootstrap provides a lot of ready-made scss classes.
- [React-Bootstrap](https://getbootstrap.com)
React-Bootstrap provides ready-made React components that have already have
classes for styling applied to them. This app uses only React-Bootstrap's 
<Modal> component (for modal windows).
- [Sass](https://sass-lang.com/dart-sass)
Sass is a CSS preprocessor. The coder must write (CSS) classes in the 
style.scss file. There is no style.css file. When the app compiles, 
the under-the-hood webpack transpiles the style.scss file into CSS, a 
process to which the coder is oblivious. 
- [Mapbox](https://www.mapbox.com/)
- [React Map GL](https://visgl.github.io/react-map-gl/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may set up your project locally.
To get a local copy up and running follow these steps.

### Prerequisites

- Node
  Visit [Node.js](https://nodejs.org/en/download/) and select the appropriate download for your system.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Scottish-Tech-Army/ggs-frontend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your Mapbox environment token in an env.local file. This will sit in the same level as the package.json. If this environment variable is unset, the app will use OpenStreetMap tiles - recommended for development only.

   ```js
   REACT_APP_MAPBOX_ACCESS_TOKEN = "your-token-here";
   ```

4. Enter your API Gateway GGS backend URL in the env.local file. This will sit in the same level as the package.json.
   ```js
   REACT_APP_AWS_CLIENT_API_ENDPOINT = "API URL";
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Working on the Project

When working on this project, you will need to:

1. Run the ggs-backend server by navigating to that directory on your machine's CLI. Checkout the appropriate branch and run `dotnet run`.
2. Run the ggs-frontend server by navigating to that directory on your machine's CLI in a new window/tab. Checkout the appropriate branch and run `npm run`. If the backend database has been updated you may need to use `npm run start`.
3. **** [BY MUKUND, MARCH 2023: DON'T DO THIS! THIS IS WRONG!] Run the compile:sass script by navigating to the ggs-frontend directory on your machine's CLI in a new window/tab. Checkout the appropriate branch and run `compile:sass`. This will allow live updates to the style sheet based on instructions written in the src/scss directory. [BY MUKUND, MARCH 2023 DON'T DO THIS! THIS IS WRONG!] ****

To view the working application, complete steps 1 and 2. [BY MUKUND, MARCH 2023: DO ONLy STEPS 1 AND 2. IGNORE STEP 3; IT'S WRONG!]
You will be presented with a web application which can request your location information and display landmarks marked on a map. Touching or clicking on the markers will bring up a modal giving information about the landmarks and a button to add that location to a collection of visited places.

### Using and Testing the Application

To access the location data, the application requires a team name. On submission of this name, the application will retrieve the data from the backend server to display the location map markers.
