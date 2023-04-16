# Social Network API

## ✏️ Description:

The goal for this project was first, for me to gain a better understanding of the non-relational NoSQL database. Next, was to create a flexible database API that could be easily queried and updated for a social network backend. Lastly, I wanted to add several connections to showcase that even though this uses non-relational functionality, you can still reference other documents and models.


## 📜 License:

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See LICENSE in the repo for more information.


## User Story

* AS A social media startup
* I WANT an API for my social network that uses a NoSQL database
* SO THAT my website can handle large amounts of unstructured data


## Acceptance Criteria

* GIVEN a social network API
* WHEN I enter the command to invoke the application
* THEN my server is started and the Mongoose models are synced to the MongoDB database
* WHEN I open API GET rotues in Insomnia for users and thoughts
* THEN the data for each of these routes is displayed in a formatted JSON
* WHEN I test API POST, PUT, and DELETE routes in Insomnia
* THEN I am able to successfully create, update, and delete users and thoughts in my database
* WHEN I test API POST and DELETE in Insomnia
* THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user's friends list


## 🖥️ Technologies Used

* JavaScript
* MongoDB / Mongoose ODM
* MVC structure
* npm
* Moment npm package


## ⚙️ Installation

1. Open the integrated terminal on the server.js file and run ``` npm i ```
2. Once complete, run ``` npm run start ```
3. Now you can make your requests within Postman, Insomnia, etc!


## 📸 Assets: 

The following video represents the website's functionality:

![] ()


## 📖 Code Resources:

* Used class repo mini project to help with file structure, config, server setup, referenced for function creation
* Mongoose documentation on Model structure and specific attributes: (trim, unique, maxLength, virtuals etc)
* Stack Overflow to find email validation function for User model (https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax)
* Stack Overflow to figure out best way to format dates (ended up using moment npm package) (https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js)
* Moment documentation for exact date formatting
* AskBCS for help on the thoughts post request and linking it to the User who created it
* Tutoring session to further help me with the Thoughts post request and connecting it to the user's thoughts array