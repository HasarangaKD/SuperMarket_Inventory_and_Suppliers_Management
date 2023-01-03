import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



const generatePDF = stocks => {
  const doc = new jsPDF();
  const tableColumn = ["Stock ID", "Stock Type", "Supplier ID","Supplier Name", "Date"];
  const tableRows = [];

  stocks.map(stocks => {
    const stockdata = [
      `STO${stocks._id.substr(0,5)}`,
      stocks.StockType,
      stocks.SupplierID,
      stocks.SupplierName,
      stocks.DateOfReceived,
      
 ];
    tableRows.push(stockdata);
  })
  doc.text("HDSC Supermarket", 70,8).setFontSize(13);
  doc.text("Inventory Summary Report", 14, 16).setFontSize(13); 
  doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
  doc.save("INVENTORYSUMMARY.pdf");
}
export default class StockHome extends Component {
  constructor(props){
    super(props);

    this.state={
      stocks:[]
    };
  }
  componentDidMount(){
    this.retriveStocks();
  }
  
  retriveStocks(){
    axios.get("/stock").then(res =>{
      if(res.data.success){
        this.setState({
         stocks:res.data.existingStocks
        });
        console.log(this.state.stocks)
      }
    });
  }

  onDelete = (id) =>{
    axios.delete(`/stock/delete/${id}`).then((res) =>{
      Swal.fire('Deleted','Stock record Deleted Successfilly','success')
      this.retriveStocks();
    })
  }

  filterData(stocks,searchkey){
    const result = stocks.filter((stock)=>

    stock.StockType.toLowerCase().includes(searchkey)||
    stock.SupplierID.toLowerCase().includes(searchkey)||
    stock.SupplierName.toLowerCase().includes(searchkey)||
    stock.DateOfReceived.toLowerCase().includes(searchkey)
  
    )
    this.setState({stocks:result})
    
  }


  handleSearchArea=(e) =>{

    const searchkey = e.currentTarget.value;

    axios.get("/stock").then(res =>{
      if(res.data.success){
       
        this.filterData(res.data.existingStocks,searchkey)
      }
    });
  }


  render() {
    return (
      <div className="container">
        <br />
        <br />
        <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
        <h2 className="text-info">Stock Details</h2>
      </div>
      <div className ="col-lg-3 mt-2 mb-2">
  <input
    className= "form-control"
    type ="search"
    placeholder ="Search" 
    name= "searchQuery"
    onChange={this.handleSearchArea}>
</input>
 
      </div>
       </div>
        <br />
        <br />

              <button
                  type="button"
                  style={{ backgroundColor: "#00000", padding: "7px" }}
                  class="btn btn-secondary btn-sm"
                  onClick={() => generatePDF(this.state.stocks)}
                >
                  Download As PDF
                </button>
                <br /><br />
        <div class="p-3 mb-2 bg-primary text-dark rounded-3">
        <table table className="table table-hover  table table-bordered border-info table table-info table-striped" style={{marginTop:'5px'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Stock ID</th>
              <th scope="col">Stock Type</th>
              <th scope="col">Supplier ID</th>
              <th scope="col">Supplier Name</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.stocks.map((stocks,index) =>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                  <a href={`/stock/${stocks._id}`} style = {{textDecoration:'none'}}>
                  {/*stocks.StockID*/} 
                  {`STO${stocks._id.substr(0,5)}`}
                  </a>
                </td>
                <td>{stocks.StockType}</td>
                <td>{stocks.SupplierID}</td>
                <td>{stocks.SupplierName}</td>
                <td>{stocks.DateOfReceived}</td>
                <td>
                <a className="btn btn-warning" href={`/edit/${stocks._id}`}>
                  <i className="far fa-edit"></i> &nbsp;Edit
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a className="btn btn-danger"  onClick={() =>this.onDelete(stocks._id)}>
                  <i className="far fa-trash-alt"></i> &nbsp;Delete
                </a>
              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <button className='btn btn-success'><a href="/add" style={{textDecoration:'none',color:'white'}}>Add New Stock</a></button>
      </div>
    )
  }
}
