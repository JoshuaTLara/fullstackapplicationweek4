import './InvoiceTable.css';

import TableHeader from './TableHeader';
import AddButton from './AddButton';
import TableRow from './TableRow';
import { useState } from 'react';
import axios from "axios";

let globalId = 4


function InvoiceTable({initialData}) {
    //take initialData and turn it into stae to not have to refreash it from app each time we modify it
    const [currentData, setCurrentData] = useState(initialData)


    
    //loopthrou initialData, and return a <TableRow/> componet for each invoice objcet in the array
    const rows = currentData.map((invoice) => {
        const {id, description, hours, rate} = invoice;

        return (
            <TableRow
            key={id}
            initialIsEditing={false}
            initialInvoiceData={{id, description, rate, hours}}
            deleteFunc={() => deleteRow(id)}
            />
        )
    })

    // create a function that will add a "row" to currentData
    const addRow = async () => {
        const response = await axios.post('/invoice/add', {
            description: "Enter description here"
        })

        
        setCurrentData([...currentData, response.data.newInvoice])
    }


        //delet function needs to get the rows id and then find the entry in current data and remove it( and use the setCurrent Data)
    const deleteRow = (id) => {
        //send a DELETE request to our server 
        axios.delete(`/invoice/delete/${id}`)
            .then((res) => {

                if (res.data.status) {
                    const filteredList = currentData.filter((invoice) => {
                        return invoice.id !== id

                    })
                    setCurrentData(filteredList)
                } else {
                    console.log("something didn't work right.")
                }

            })
    }
        

  return (
    <div>
      <table>
        <thead>
            <TableHeader />
        </thead>

        <tbody>
           {rows}
        </tbody>

        <tfoot>
            <AddButton addRow={addRow}/>
        </tfoot>


      </table>
    </div>
  )
}

export default InvoiceTable
