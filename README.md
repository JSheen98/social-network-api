# Social Network API

## ✏️ Description:




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
* MongoDB / Mongoose
* MVC structure
* npm 


## ⚙️ Installation




## 📸 Assets: 

The following images represent the website's appearance:

![] ()


## Code Resources:

* Used class repo mini project to help with file structure, config, server setup, referenced for function creation
* Mongoose documentation on Model structure and specific attributes: (trim, unique, maxLength, virtuals etc)
* Stack Overflow to find email validation function for User model (https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax)
* AskBCS for help on the thoughts post request and linking it to the User who created it