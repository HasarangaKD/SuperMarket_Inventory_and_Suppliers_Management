import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const generatePDF = suppliers => {
  const doc = new jsPDF();
  const tableColumn = ["Supplier ID", "Supplier Name", "Supplier Category", "Supplier Company", "Contact Number", "Email Address"];
  const tableRows = [];

  suppliers.map(suppliers => {
    const supplierdata = [
      `SUP${suppliers._id.substr(0,5)}`,
      suppliers.SupplierName,
      suppliers.SupplierCat,
      suppliers.SupplierCompany,
      suppliers.ContactNumber,
      suppliers.Email
 ];
    tableRows.push(supplierdata);
  })
  doc.text("HDSC Supermarket", 70,8).setFontSize(13);
  doc.text("Suppliers Summary Report", 14, 16).setFontSize(13); 
  doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
  doc.save("SUPPLIERSUMMURY.pdf");
}
export default class SupplierHome extends Component {
  constructor(props){
    super(props);

    this.state={
      suppliers:[]
    };
  }
  componentDidMount(){
    this.retriveSuppliers();
  }
  
  retriveSuppliers(){
    axios.get("/supplier").then(res =>{
      if(res.data.success){
        this.setState({
         suppliers:res.data.existingSuppliers
        });
        console.log(this.state.suppliers)
      }
    });
  }

  onDelete = (id) =>{
    axios.delete(`/supplier/delete/${id}`).then((res) =>{
      Swal.fire('Deleted','Supplier record Deleted Successfilly','success')
      this.retriveSuppliers();
    })
  }

  filterData(suppliers,searchkey){
    const result = suppliers.filter((supplier) =>

    supplier.SupplierName.toLowerCase().includes(searchkey)||
    supplier.SupplierCat.toLowerCase().includes(searchkey)||
    supplier.SupplierCompany.toLowerCase().includes(searchkey)
  
    )
    this.setState({suppliers:result})
    
  }


  handleSearchArea=(e) =>{

    const searchkey = e.currentTarget.value;

    axios.get("/supplier").then(res =>{
      if(res.data.success){
       
        this.filterData(res.data.existingSuppliers,searchkey)
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
        <h2 className="text-info">Supplier Details</h2>
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
                  onClick={() => generatePDF(this.state.suppliers)}
                >
                  Download As PDF
                </button>
                <br />
                <br />
                
        <div class="p-3 mb-2 bg-primary text-dark rounded-3">
        <table table className="table table-hover  table table-bordered border-info table table-info table-striped" style={{marginTop:'5px'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Supplier ID</th>
              <th scope="col">Supplier Name</th>
              <th scope="col">Supplier Category</th>
              <th scope="col">Supplier Company</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Email Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.suppliers.map((suppliers,index) =>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                  <a href={`/supplier/${suppliers._id}`} style = {{textDecoration:'none'}}>
                  {/*suppliers.SupplierID*/} 
                  {`SUP${suppliers._id.substr(0,5)}`}
                  </a>
                </td>
                <td>{suppliers.SupplierName}</td>
                <td>{suppliers.SupplierCat}</td>
                <td>{suppliers.SupplierCompany}</td>
                <td>0{suppliers.ContactNumber}</td>
                <td>{suppliers.Email}</td>
                <td>
                <a className="btn btn-warning" href={`/editSup/${suppliers._id}`}>
                  <i className="far fa-edit"></i> &nbsp;Edit
                </a>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(suppliers._id)}>
                  <i className="far fa-trash-alt"></i> &nbsp;Delete
                </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
        <button className='btn btn-success'><a href="/addSup" style={{textDecoration:'none',color:'white'}}>Add a New Supplier </a></button>
            
      </div>
    
    
     )
  }
}
