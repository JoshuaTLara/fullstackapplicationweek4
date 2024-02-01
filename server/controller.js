// set up a global varible to simulate the DB
let TEST_DATA = [
    { id: 0, description: 'Content plan', rate: 50, hours: 4 },
    { id: 1, description: 'Copy writing', rate: 50, hours: 2 },
    { id: 2, description: 'Website design', rate: 50, hours: 5 },
    { id: 3, description: 'Website development', rate: 100, hours: 5 },
  ];

  let globalId = 4

// const REAL_DATA = [
//     { id: 4, description: 'Website development', rate: 100, hours: 5 },
// ]

  const handlerFunctions = {

    getInvoices: (req, res) => {
        res.send({
            message: "all invoices from TEST_DATA",
            invoices: TEST_DATA,
            // realData: REAL_DATA
        })
      },
    
    addInvoice: (req, res) => {
        // Get the description from req.body
        const {description} = req.body
        // Create a new invoice object
        const newInvoice ={
            id: globalId,
            description: description,
            rate: 0,
            hours: 0,
        }
        // push that new object into TEST_DATA
        TEST_DATA.push(newInvoice)
        // increment globalId
        globalId++
        // send back the new object to the front-end
        res.send({
            message: "new invoice added to TEST_DATA",
            newInvoice: newInvoice,
        })
    },
    
    deleteInvoice: (req, res) => {
        //grab id from prams
        const {id} = req.params
        //delete the elemetn from TEST_DATA that matches the id send in this request
        TEST_DATA = TEST_DATA.filter((invoice) => {
            return invoice.id !== +id
        })
        res.send({
            message: "I tried to delete this invoice",
            status: true,
        })
    },

    updateInvoice: (req, res) => {
        // grab the id from params
        const {id} = req.params
        // grab rate/hours description from body
        const {rate, hours, description} = req.body
        // find the corresponding invoice to update- find teh index?
        const index = TEST_DATA.findIndex((invoice) => {
            return invoice.id === +id
        })
        // with the index, I can mark that invoice
        const invoiceToUpdate = TEST_DATA[index]
        // now just update teh attributes of invoiceToUpdate
        invoiceToUpdate.description = description
        invoiceToUpdate.rate = +rate
        invoiceToUpdate.hours = +hours
    
        //send back invoiceTo Update
        res.send({
            message: "Invoice update",
            updatedInvoice: invoiceToUpdate,
        })
    }

  }


  export default handlerFunctions