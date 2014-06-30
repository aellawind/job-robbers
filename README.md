# Project Management Accelerated, Automated
Produced at <a href='http://hackreactor.com'>Hack Reactor </a> by <a href='http://github.com/aellawind'>Amira Anuar</a>, <a href='http://github.com/elcinerkin'>Elçin Erkin</a> <a href="http://github.com/jimmytsao">Jimmy Tsao</a> & <a href='http://github.com/mamarildon'>Don Mamaril </a>

Our client was a technical project manager at Hack Reactor who was tracking dozens of individual projects using Asana as a CRM, and they approached us to build a tool to automate a lot of work and increase the productivity of their team members. 

Project managers can access a dashboard which provides a bird’s-eye view of all the projects in the portfolio and displays each project’s current status based on the algorithm calculations. The algorithm also suggests potential next steps to improve outcomes. This allows the project manager to quickly identify projects that require assistance and quickly take action.

Individual team members can use the application to view their specific project. Previously team members encountered significant friction and UX challenges in using Asana’s native interface as a project management tool. 

The app focuses the entire user experience on the parts of Asana related to Hack Reactor’s process, significantly streamlining user workflow and radically reducing erroneous use of the system.

## Tech Stack
<img src='http://i.imgur.com/jQdYbOC.jpg'>

## Challenges
* Lack of web hooks in the Asana API meant designing a periodic polling system.
* Literally translated a human brain process into computer code (an algorithm) -- a rudimentary AI problem we had to handle
* Had to design a user interface from scratch (the client provided no wireframes or designs) that improved on the speed and productivity of native Asana
* The lack of documentation for advanced querying through  the API also meant writing more complex calls to the API and extra parsing and curation of data. 
* Making the end-to-end tests as thorough as possible


## Diving In
```
$ git clone https://github.com/aellawind/job-robbers.git
$ cd job-robbers
$ npm install
$ bower install
$ node server.js
```
