import React, { Component } from 'react';
import axios from 'axios';
import swal from "sweetalert2";

const initialState = {

  SupplierName:"",
  SupplierCat:"",
  SupplierCompany:"",
  ContactNumber:"",
  Email:"",
  supplierNameError:"",
  supplierCatError:"",
  supplierCompanyError:"",
  contactNumberError:"",
  EmailError:""

  };


export default class AddSupplier extends Component {

  state = initialState;

  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }

  validate = () => {
    let supplierNameError=""; 
    let supplierCatError="";
    let supplierCompanyError ="";
    let contactNumberError="";
    let EmailError="";
  

    if (!this.state.SupplierName) {
      supplierNameError = "* Supplier Name is Required!";
    }

    if (!this.state.SupplierCat) {
      supplierCatError = "* Supplier Category is Required!";
    }

    if (!this.state.SupplierCompany) {
      supplierCompanyError = "* Supplier company  is Required!";
    }

    if (!this.state.ContactNumber) {
      contactNumberError = "* Contact Number  is Required!";
    }else if (
      !this.state.ContactNumber.toString().match(/^[0-9]{10}$/)) {
      contactNumberError = "*Please Enter valid number (Ex:- 0123456789)!";
    }

    if (!this.state.Email) {
      EmailError = "* Email Address  is Required!";
    }else if (
      !this.state.Email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
      EmailError = "*Please Enter valid Email!(Ex:- abc@gmail.com)";
    }

    if (supplierNameError || supplierCatError || supplierCompanyError || contactNumberError || EmailError) {
      this.setState({
        supplierNameError ,
        supplierCatError,
        supplierCompanyError,
        contactNumberError,
        EmailError
      });

      return false;
    }
    return true;
  };

  onSubmit = (e) =>{

    e.preventDefault();

    const {SupplierName,SupplierCat,SupplierCompany,ContactNumber,Email} = this.state;

    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      // clear form
      this.setState(initialState);
    }

    const data ={
      SupplierName:SupplierName,
      SupplierCat:SupplierCat,
      SupplierCompany:SupplierCompany,
      ContactNumber:ContactNumber,
      Email:Email
    
    }

    console.log(data)

    axios.post("/supplier/save",data).then((res) =>{
      if(res.data.success){
        swal.fire("Added", "Supplier Details Added Successfully", "success");
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
  };
 
    render () {
 
        return (
           
          <div className= "col-md-8 mt-4 mx-auto">
            <h1 className = "h3 mb-3 font-weight-normal">Add a New Supplier</h1>
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
                          &nbsp; Add Supplier
                    </button>
                    <br />
                    <br />
          </form>
    </div>
  
    )
  }}
