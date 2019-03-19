# **API ASSESSMENT**

> ## Design
> ```
>                                               USER
>                                new user _______||_______user login
>                                   |                           |
>                                   |                           |
>                             create account --> JWT <-- authenticate
>                                                ||
>                                                ||
>                                             signed in
>                                                ||
>                              create player_____||______delete player
>                                   |                         |        
>                                   |_________database________|
>                                   
> 
> ```
> ---

> ## Set Up
> > 1. Install Node
> > 2. Install MongoDB
> >
>
> ## Installation
> > Run `npm install`
> > 
>
> ## Running Test
> >  ```
> > npm run local
> > npm run test
> > ```
>
> ## Notes
> > Make sure the `data` directory does not exist in root folder. This directory is created for a local database when running local. It gets deleted after you quit running local. If for some reason it is not deleted, just delete it or run 
> > ```
> > npm run postlocal
> > ``` 
> > 
> > 
> ## Directory Layout
> > ```bash
> > .
> > ├── /src/                       # Application source files
> > │   ├── /config/                # Application and database configuration                
> > │   ├── /controller/            # Manages request and responses
> > │   ├── /middleware/            # Handles the validation, authentication, and error
> > │   ├── /models/                # Collection definition
> > │   ├── /repository/            # Interface with the models and create a buffer
> > │   ├── /routes/                # Handles each routes
> > │   ├── /util                   # Functions used for validation, authentication and error handling
> > │   ├── /app.js                 # Client utility for sending transactional email
> > │   ├── /router.js              # Routes each endpoint
> > ├── /test/                      # Testing
> > ├── package.json                # Project dependencies
> > ```
