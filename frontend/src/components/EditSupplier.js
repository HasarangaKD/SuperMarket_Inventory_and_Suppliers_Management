import axios from 'axios';
import React, { Component } from 'react'
import swal from "sweetalert2";

export default class EditSupplier extends Component {

  constructor(props){
    super(props);
    this.state={
      SupplierName:"",
      SupplierCat:"",
      SupplierCompany:"",
      ContactNumber:"",
      Email:"",
    }
  }
  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }

  onSubmit = (e) =>{

    e.preventDefault();

    const id = this.props.match.params.id;

    const {SupplierName,SupplierCat,SupplierCompany,ContactNumber,Email} = this.state;

    const data ={
      SupplierName:SupplierName,
      SupplierCat:SupplierCat,
      SupplierCompany:SupplierCompany,
      ContactNumber:ContactNumber,
      Email:Email
    }

    console.log(data)

    axios.put(`/supplier/update/${id}`,data).then((res) =>{        
      if(res.data.success){
        swal.fire("Updated", "Supplier Details Updated Successfully", "success");
        this.setState(
          {
            SupplierName:"",
            SupplierCat:"",
            SupplierCompany:"",
            ContactNumber:"",
            Email:"",
          }
        )
      }
    })
  }

  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/supplier/${id}`).then((res) =>{
      if(res.data.success){
        this.setState({
          SupplierName:res.data.suppliers.SupplierName,
          SupplierCat:res.data.suppliers.SupplierCat,
          SupplierCompany:res.data.suppliers.SupplierCompany,
          ContactNumber:res.data.suppliers.ContactNumber,
          Email:res.data.suppliers.Email,
          
        });

        console.log(this.state.suppliers);
      }
    });
  }
  render() {
    return (
       
      <div className= "col-md-8 mt-4 mx-auto">
            <h1 className = "h3 mb-3 font-weight-normal">Edit Supplier Details</h1>
              <form className = "needs-validation noValidate">

              <div class="col">
                  <div className = "form-group" style = {{marginBottom: '15px'}}>
                      <label style={{marginBottom:'5px'}} >Supplier Name</label>
                      <input type="text"
                      className = "form-control"
                      name = "SupplierName"
                      placeholder="Enter Supplier Name"
                      value = {this.state.SupplierName}
                      onChange={this.handleInputChange}/>
                      <div style={{ fontSize: 14, color: "red" }}>
            {this.state.supplierNameError}
          </div>
                  </div>
                </div>  
                  <div className = "form-group" style = {{marginBottom: '15px'}}>
                      <label style={{marginBottom:'5px'}} >Supplier Category</label>
                      <select type="text" class="form-control"name = "SupplierCat"
                      value = {this.state.SupplierCat}
                      onChange={this.handleInputChange}>
                        <option > Select Supplier Category</option>
                        <option value="Electric">Electric Items</option>
                        <option value="Household">Household Items</option>
                        <option value="Grocery">Grocery Items</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Meat related">Meat Related Items</option>
                        <option value="Food">Food</option>
                      </select>
                      <div style={{ fontSize: 14, color: "red" }}>
            {this.state.supplierCatError}
          </div>
                  </div>        

                  <div className = "form-group" style = {{marginBottom: '15px'}}>
                      <label style={{marginBottom:'5px'}} >Supplier Company</label>
                      <select type="text" class="form-control"name = "SupplierCompany"
                      value = {this.state.SupplierCompany}
                      onChange={this.handleInputChange}>
                        <option > Select Supplier Company</option>
                        {/*Fresh Fruits*/}
                        <option value=" Mangifera Pvt. Ltd"> Mangifera Pvt. Ltd</option>
                        {/*Food Items*/}
                        <option value="Transfood Lanka Pvt. Ltd"> Transfood Lanka Pvt. Ltd</option>
                        {/* Fresh Vegetables */}
                        <option value="Galuku Lanka Exports Pvt. Ltd"> Galuku Lanka Exports Pvt. Ltd</option>
                        {/*Fresh Meat,fish,other*/}
                        <option value="Sumadi Holdings Pvt. Ltd">Sumadi Holdings Pvt. Ltd</option>
                        {/*Grocery related items*/}
                        <option value="FONTERRA BRANDS LANKA Pvt. Ltd">FONTERRA BRANDS LANKA Pvt. Ltd</option>
                        {/*electric-home-appliances*/}
                        <option value="Ktronics Pvt. Ltd"> Ktronics Pvt. Ltd</option>
                        {/*HOUSEHOLD PRODUCTS*/}
                        <option value="Phoenix Pvt. Ltd">Phoenix Pvt. Ltd </option>
                        {/*Supplier Of Beverages*/}
                        <option value="Sapumal International Pvt. Ltd">Sapumal International Pvt. Ltd</option>
                      </select>
                      <div style={{ fontSize: 14, color: "red" }}>
            {this.state.supplierCompanyError}
          </div>
                  </div>
        <div class="row">
            <div class="col">
                  <div className = "form-group" style = {{marginBottom: '15px'}}>
                      <label style={{marginBottom:'5px'}} >Contact Number</label>
                      <input type="number" 
                      className = "form-control"
                      name = "ContactNumber"
                      placeholder="Enter Contact number"
                      value = {this.state.ContactNumber}
                      onChange={this.handleInputChange}/>
                      <div style={{ fontSize: 14, color: "red" }}>
            {this.state.contactNumberError}
          </div>
                  </div>
              </div>    
              <div class="col">
                  <div className = "form-group" style = {{marginBottom: '15px'}}>
                      <label style={{marginBottom:'5px'}} >Email Address</label>
                      <input type="email"
                      className = "form-control"
                      name = "Email"
                      placeholder="Enter Valid Email (Ex:- abc@gmail.com)"
                      value = {this.state.Email}
                      onChange={this.handleInputChange}/>
                      <div style={{ fontSize: 14, color: "red" }}>
            {this.state.EmailError}
          </div>
                  </div>       
                </div>
          </div>      
                  <br />
                    <button className="btn btn-success" type ="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                          <i className= "far fa-check-square"></i>
                          &nbsp; Update Supplier
                    </button>
                    <br />
                    <br />
          </form>
    </div>
  
    )
  }
}
