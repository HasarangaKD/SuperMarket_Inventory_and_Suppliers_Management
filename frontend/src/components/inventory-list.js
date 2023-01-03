import React, {Component} from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



const generatePDF = inventory => {
  const doc = new jsPDF();
  const tableColumn = ["Inventory ID" ,"Stock ID", "Item Name", "Item Type","Quantity", "Unit Price","Total"];
  const tableRows = [];

  inventory.map(inventory => {
    const inventorydata = [
        `ITM${inventory._id.substr(0,5)}`,
        inventory.StockID, 
        inventory.ItemName,
        inventory.ItemType,
        inventory.quantity,
        inventory.UnitPrice,
        inventory.UnitPrice*inventory.quantity,
      
 ];
    tableRows.push(inventorydata);
  })
  doc.text("HDSC Supermarket", 70,8).setFontSize(13);
  doc.text("Inventory Items Summary Report", 14, 16).setFontSize(13); 
  doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
  doc.save("INVENTORY_ITEM_SUMMARY.pdf");
}

export default class InventoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inventory: [],
            currentPage: 1 ,
            paginationCount: 5,
        }
    }




   // Starting lifecycle and calling for data from database
   componentDidMount() {
    axios.get('/inv/')
    .then(response => {
        this.setState({inventory: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })
}
    
      

    // Function call for previous page button
    previousPage = () => {
        if (this.state.currentPage !==1){
            this.setState({
                currentPage: this.state.currentPage - 1})
        }
    }

    // Function call for next page button
    nextPage = () => {
        if (this.state.currentPage + 1 <= Math.ceil(this.state.inventory.length/this.state.paginationCount)){
            this.setState((prevState) => ({currentPage: (prevState.currentPage + 1)}))
        }           
    }

    // Mapping out GET data
    inventoryList() {
        // Slicing data for table pagination
        return this.state.inventory.slice(
            (this.state.paginationCount * (this.state.currentPage - 1)), 
            (this.state.paginationCount * (this.state.currentPage))).map((inventory) =>{
            return(
                <tr key={inventory._id}>
                    <td>{`ITM${inventory._id.substr(0,5)}`}</td>
                    <td>{inventory.StockID}</td>
                    <td>{inventory.ItemName}</td>
                    <td>{inventory.ItemType}</td>
                    <td>{inventory.quantity}</td>
                    <td>Rs.{inventory.UnitPrice}</td>
                    <td>Rs.{inventory.Total=(inventory.UnitPrice*inventory.quantity)}</td>
                </tr> 
            );
        })
    }

    render() {
        // Conditional setup for rendering previous/next page buttons
        let previousEligible = false
        if (this.state.currentPage<=1){
            previousEligible = false
        }
        else{
            previousEligible = true
        }

        let nextEligible = true
        if(this.state.currentPage + 1 > Math.ceil(this.state.inventory.length/this.state.paginationCount)){
            nextEligible = false
        }
        else{
            nextEligible = true
        }

        return (
            <div div className="container">
                <div className="col-lg-9 mt-2 mb-2">
        <h2 className="text-info">Inventory Item Overview</h2>
      </div>

      <br />

      <button
                  type="button"
                  style={{ backgroundColor: "#00000", padding: "7px" }}
                  class="btn btn-secondary btn-sm"
                  onClick={() => generatePDF(this.state.inventory)}
                >
                  Download As PDF
                </button>
                <br /><br />
      <div class="p-3 mb-2 bg-primary text-dark rounded-3">
                <table className="table table-hover  table table-bordered border-info table table-info table-striped" style={{marginTop:'5px'}}>
                    <thead>
                        <tr style={{fontSize:'20px'}}> 
                            <th>Item Code</th>
                            <th>Stock ID</th>
                            <th>Item Name</th>
                            <th>Item Type</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.inventoryList()}
                    </tbody>
                </table>
                    {previousEligible && <button className="btn btn-info" onClick={this.previousPage}>Previous Page</button>}
                    {nextEligible && <button className="btn btn-info" onClick={this.nextPage} style={{float: 'right'}}>Next Page</button>}
           </div> 
           </div>
        )
    }
}