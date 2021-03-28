### How to run:

Firsty, install all the external dependencies mentioned in **requirements.txt** in the project folder. Then, you have to run 2 commands simultaneously using terminal from the project folder, they are:
* npm start 
* nodemon server/index.js

### What it does

Our project helps the user to place the things they want to lend others in their locality or you can also borrow from others.

## How we built it

#### Frameworks Used:

* React JS: Hooks, Axios
* A JavaScript library called MapboxGL
* Express JS(A node.js framework)


#### Database Used:
* MongoDB


## Challenges we ran into

* Making use of MapboxGL in react hooks due to limited tutorials
* Making sure the data is always up and running so that it doesn't just go on every refresh
* Stopping the infinite looping of fetching data from a http req when using Axios

## Accomplishments that we're proud of:

* We made a full **MERN stack application**.
* Provided an affordable easy to use solution for the world's waste management problem
* Found and used an alternative for Google Maps (as they have started charging money for using Maps)
* This uses the ‘haversine’ formula to calculate the great-circle distance between two points

## What we learned

* Use of different types of hooks in React
* Handling MapboxGL
* Using Routes
* Handling HTTP requests


## What's next for BORO Maps?

Adding more features like:

* Asking the user to verify the address with an admin user interaction
* Allowing users to add more than one items
* Making an easy-to-use dashboard
* Keeping it affordable and reaching out to the people
* Adding more map functions
* Better search algorithms
* Better user-account system

