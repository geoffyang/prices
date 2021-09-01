## Welcome to Hospital Prices
https://hospital-prices.herokuapp.com

New federal regulations enacted in 2021 mandate that hospitals publicly publish price information for their services and procedures. Hospital Prices is a full stack web application that allows users to view and interact with this rich data set. Users can estimate the total cost of a complex procedure and compare pricing across local hospitals. Users can also discuss pricing via a comments section available on each individual healthcare service. The hope for this data tool is to promote transparency in medical pricing and allowing people to make informed decisions about their healthcare.

## Technologies Used

1. Front-end (JavaScript)
    * React - Speedy rendering and re-rendering of browser page elements
    * Redux - Consolidated state management with thunks connecting to API endpoints 
2. Back-end (Python)
    * Flask - Server framework with libraries for session management, form validation, and more.
    * SQLAlchemy - Class-oriented interface for relational mapping
    * PostgreSQL - A battle-tested and proven RDBMS 
3. Other 
    * Docker - Container software providing consistent deployment environments
    * Heroku - Hosting service capable of deploying Docker containers

## Application Features

### Services View

Users are able to view details on any hospital procedure or service. Details include
1. Billing codes and other classification codes to identify a service.
2. List price for the service.
3. Discounted prices recently paid by real patients.

![](https://github.com/geoffyang/prices/blob/main/react-app/public/service-demo.png?raw=true)

### Comments

There is a comments section for each service to discuss quality of care and allow for crowdsourced Q&A.

### Service Collections

Users can save individual hospital services within collections to view aggregate price information. There are no limits to the number of collections a user can create.

## Database Schema
![](https://github.com/geoffyang/prices/blob/main/react-app/public/hospital-prices-db.png?raw=true)

## Code Highlight - Best practice Redux use

This application leans heavily on centralized Redux stores for its rendering logic and fast performance. This design decision allows for the bare minimum of useEffect hooks to be used, minimizing the sprawl of logic being managed in disparate components.

```js
const initialState = {
    currentServiceObj: {
        comments: {}
    },
    serviceLoaded: null,
    commentsLoaded: null,
    showErrors: false,
    showEditErrors: false,
}

export default function reducer(state = initialState, { service, type, comment, id }) {
    switch (type) {
        case LOAD_SERVICE:
            if (Object.keys(service.comments).length > 0) {
                return {
                    currentServiceObj: {
                        ...service,
                        comments: {
                            ...service.comments
                        }
                    },
                    serviceLoaded: true,
                    commentsLoaded: true,
                    showEditErrors: state.showEditErrors,
                }
            }
            return {
                currentServiceObj: {
                    ...service,
                    comments: null
                },
                serviceLoaded: true,
                commentsLoaded: null
            }
        case UNLOAD_SERVICE:
            return {
                ...initialState,
                currentServiceObj: {
                    comments: null
                }
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: {
                        ...state.currentServiceObj.comments,
                        [comment.id]: comment
                    }
                },
                commentsLoaded: true
            }
        case REMOVE_COMMENT:
            delete state.currentServiceObj.comments[id]
            if (Object.keys(state.currentServiceObj.comments).length > 0) {
                return {
                    ...state,
                    currentServiceObj: {
                        ...state.currentServiceObj,
                        comments: { ...state.currentServiceObj.comments }
                    },
                    commentsLoaded: true
                }
            }
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: {}
                },
                commentsLoaded: null
            }
        case SHOW_ERROR_BOX:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: { ...state.currentServiceObj.comments }
                },
                showErrors: true,
            }
        case REMOVE_ERROR_BOX:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: { ...state.currentServiceObj.comments }
                },
                showErrors: false,
            }
        case SHOW_EDIT_ERROR_BOX:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: { ...state.currentServiceObj.comments }
                },
                showEditErrors: true,
            }
        case REMOVE_EDIT_ERROR_BOX:
            return {
                ...state,
                currentServiceObj: {
                    ...state.currentServiceObj,
                    comments: { ...state.currentServiceObj.comments }
                },
                showEditErrors: false,
            }
        default:
            return state;
    }
}
```

## Installation Instructions

1. Clone the repository and install python dependencies in the root folder. 
   * pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
2. Create a database and place db credentials in a .env file that mirrors the included .env.example template
3. Migrate, seed and run the database
   * pipenv shell
   * flask db upgrade
   * flask seed all
   * flask run
4. Install dependencies and start the front end
   * Navigate to the React-App folder
   * npm install
   * npm start

## Conclusion and Future Features

I created this project to demonstrate what I could build in a two-week sprint, and also to create the basis of a data asset with real value for consumers. To flesh out the application, the next steps in the development plan are a search feature to aid discoverability of hospital services, as well as the ability to add these services to one's collections.

However, the largest forseen effort is the acquisition of data. Since each hospital currently publishes its information in a non-standardized format, I will need to build data pipelines to extract information from each of the hundreds of hospitals in the US. Please reach out if you are interested in contributing to this project.
