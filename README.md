<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Scottish-Tech-Army/ggs-frontend">
    <img src="images/temp-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">project_title</h3>

  <p align="center">
    project_description
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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>This is a treasure hunting progressive web app for Girl Guiding Scotland.</p>
<p>The front end and back end code bases are stored in separate repositories. This is the frontend project. You can find the backend project <a href="https://github.com/Scottish-Tech-Army/ggs-backend">here</a>.</p>

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email`, `email_client`, `project_title`, `project_description`

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/en/)
- [React.js](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com)
- [Sass](https://sass-lang.com/dart-sass)
- [Mapbox](https://www.mapbox.com/) 

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
3. Enter your Mapbox environment token in an env.local file.
   ```js
   REACT_APP_MAPBOX_ACCESS_TOKEN = "your-token-here"
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

When working on this project, you will need to: 
1. Run the ggs-backend server by navigating to that directory on your machine's CLI. Checkout the appropriate branch and run `dotnet run`.
2. Run the ggs-frontend server by navigating to that directory on your machine's CLI in a new window/tab. Checkout the appropriate branch and run `npm run`. If the backend database has been updated you may need to use `npm run start`.
3. Run the compile:sass script by navigating to the ggs-frontend directory on your machine's CLI in a new window/tab. Checkout the appropriate branch and run `compile:sass`. This will allow live updates to the style sheet based on instructions written in the src/scss directory.



