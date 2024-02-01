import express from "express"
import morgan from "morgan"
import ViteExpress from "vite-express"

// set up express instance as teh variable 'app'

const app = express()

// set up middleware
app.use(morgan("dev")) //while in dev enviorment use morgan fro additional logging, etc.
app.use(express.urlencoded({extended: false})) // allows express to read POST request objects
app.use(express.static('public')) // pointing to folder for vite/express to understand where to look? static files only?
app.use(express.json())// lets server and front-end know that they'll b communication with JSON


  // import handlerFunctions
  import handlerFunctions from "./controller.js"

  //ROUTES
  // Before creating an endpoint, address 4 questions
  // 1. What is the purpose of my endpoint?
  // 2. Will I need any queries/params/body objects for receiving data?
  // 3. What will endpoint string look like  ('/home')?
  // 4. What do I want the response to look like when the front-end receives it?

  // First Endpoint (Get)
  //-- When the fron-end makes a reques to "/invoices," we want our server to send it an array of invoice objects
  // 1. Get a list of all invoices (TEST_DATA)
  // 2. No - generic request for all TEST_DATA
  // 3. "/invoices"
  // 4. Array of invoice objects
  app.get("/invoices", handlerFunctions.getInvoices)

  // 2nd end point (POST)
  // -- Add a new row of invoice data to our TEST_DATA IN controller.js
  // 2. Yes - req.body to contain the new invoice object
  // 3. "/invoice/add"
  // 4. Send back just the new object with a confirmation
  app.post("/invoice/add", handlerFunctions.addInvoice)

  // 3rd Endpoint (DELETE)
  // 1. Delete a specified sinvoice from TEST_DATA
  // 2. Yes -- req.params for id
  // 3. "/invoice/delete/:id"
  // 4. Send back boolean confirmation
  app.delete("/invoice/delete/:id", handlerFunctions.deleteInvoice)

  // 4th Endpoint (PUT)
  // 1. Update the rate/description/hours on a specific invoice
  // 2. yes -- id -- req.params, rate/description/hours - req.body
  // 3. "/invoice/update/:id"
  // 4. Send back the updated invoice with confirmation

  app.put("/invoice/update/:id", handlerFunctions.updateInvoice)

  //open up the door to our server
  ViteExpress.listen(app, 8675, () => console.log('its time to jam. report to http://localhost:8675'))