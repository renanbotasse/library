# HOME LIBRARY - MVP

## Description
This project is about creating a home library for personal use. The idea is to help you to register and organize all your books. 
The first version (MVP) is focused on making the CRUD operations, creating, reading, updating and deleting books. 
You need to register and log in. After that, you can see all the books in "YOUR LIBRARY", and find a specific book with "FIND A BOOK" or "ADD A NEW BOOK". You also can EDIT or DELETE a book in the "YOUR LIBRARY" section.

<img width="1157" alt="home library" src="https://github.com/renanbotasse/library/assets/101360239/2e4fd562-4f9d-4661-8e13-dcab657214b7">

## Next Features 
In the future we will add some features like:
- Organize the list of books by attributes;
- Dont add the same book more than one time;
- Add attribute about borrowed books, with the name, data and phone of the person who borrowed;
- Add a picture of the book;
- Mark as read and give grade for the book;
- Check the e-mail of registration with an e-mail. 

## Technologies Used

- **bcryptjs**: [bcryptjs](https://www.npmjs.com/package/bcryptjs) is a library used for securely hashing and salting passwords. It ensures that user passwords are stored safely.

- **connect-flash**: [connect-flash](https://www.npmjs.com/package/connect-flash) is a middleware used to display flash messages to users. It's used for notifying users about the success or failure of certain actions, such as registration or login.

- **dotenv**: [dotenv](https://www.npmjs.com/package/dotenv) loads environment variables from a `.env` file. It's a best practice for managing sensitive information like API keys or database credentials, keeping them separate from the codebase.

- **ejs**: [ejs](https://www.npmjs.com/package/ejs) is an Embedded JavaScript templating engine used to render views in the application. It allows for embedding JavaScript code within HTML templates for dynamic content.

- **express**: [express](https://expressjs.com/) is a web application framework for Node.js. It's used to create and manage routes, handle HTTP requests, and structure the web application in an organized way.

- **express-ejs-layouts**: [express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts) provides layout support for EJS templates. It allows for defining a common layout (header, footer, etc.) for web pages, promoting code reusability and maintaining a consistent look and feel.

- **mongoose**: [mongoose](https://mongoosejs.com/) is an Object Data Modeling (ODM) library for MongoDB. It simplifies interactions with MongoDB by providing a structured schema and methods for creating, querying, and manipulating data. It was used to define the database schema and interact with MongoDB.

- **passport**: [passport](http://www.passportjs.org/) is a widely-used authentication middleware for Node.js. It offers a flexible and modular approach to authentication, making it easier to implement user authentication strategies, such as local authentication (username and password). It was used to enhance the security of the application's authentication process.

## Design Pattern - MVC (Model-View-Controller)

The MVC (M design pattern is a widely used architectural pattern in software development. It is employed to structure and organize the codebase of an application, promoting a clear separation of concerns and maintainability.

### Model

The **Model** component represents the data and the business logic of the application. It defines how data is stored, accessed, and manipulated. In the context of web applications, the Model often interacts with databases to manage data entities. Models define the structure of data objects and their relationships.

### View

The **View** component is responsible for rendering the user interface (UI) and presenting data to users. It encompasses the templates and layouts used to display information in an appealing and user-friendly manner.

### Controller

The **Controller** is the logical part of the application that handles user requests and provides appropriate responses. It acts as an intermediary between the Model and the View, coordinating interactions between them. 

## Contact
Feel free to contact me (renanbotasse@gmail.com), open an issue or ask  :D

## Version
1.0.0 - 11/09/2023 - MVP Home Library
![register page](https://github.com/renanbotasse/library/assets/101360239/b86d261d-fabf-4b18-a4f1-4d92229eeaa3)
