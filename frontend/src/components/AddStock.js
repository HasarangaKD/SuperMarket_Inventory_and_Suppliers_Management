import React, { Component } from 'react';
import axios from 'axios';
import moment from "moment";
import swal from "sweetalert2";

const initialState = {

    StockType:"",
    SupplierID:"",
    SupplierName:"",
    DateOfReceived:"",
    stockTypeError:"",
    supplierIDError:"",
    supplierNameError:"",
    dateError:""
    



  };


export default class AddStock extends Component {

  state = initialState;

  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }

  validate = () => {
    let stockTypeError=""; 
    let supplierIDError="";
    let supplierNameError="";
    let dateError ="";

    if (!this.state.StockType) {
      stockTypeError = "* Stock Type is Required!";
    }

    if (!this.state.SupplierID) {
      supplierIDError = "* Supplier ID is Required!";
    }

    if (!this.state.SupplierName) {
      supplierNameError = "* Supplier Name is Required!";
    }

    if (!this.state.DateOfReceived) {
      dateError = "* Date of Received  is Required!";
    }


    if (stockTypeError || supplierIDError || supplierNameError || dateError ) {
      this.setState({
        stockTypeError ,
        supplierIDError,
        supplierNameError,
        dateError
        
      });

      return false;
    }
    return true;
  };

  onSubmit = (e) =>{

    e.preventDefault();

    const {StockType,SupplierID,SupplierName,DateOfReceived} = this.state;

    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      // clear form
      this.setState(initialState);
    }

    const data ={
      StockType:StockType,
      SupplierID:SupplierID,
      SupplierName:SupplierName,
      DateOfReceived:DateOfReceived,
      
    
    }

    console.log(data)

    axios.post("/stock/save",data).then((res) =>{
      if(res.data.success){
        swal.fire("Added", "Stock Details Added Successfully", "success");
        this.setState(
          {
            StockType:"",
            SupplierID:"",
            SupplierName:"",
            DateOfReceived:"",
            
        
          }
        )
      }
    })
  };
 
    render () {
 
        return (
           
          <div className= "col-md-8 mt-4 mx-auto">
            <h1 className = "h3 mb-3 font-weight-normal">Add New Stock</h1>
              <form className = "needs-validation noValidate">
                  <div className = "form-group" style = {{marginBottom: '15px'}}>
                      <label style={{marginBottom:'5px'}} >Stock Type</label>
                      <select type="text" class="form-control"name = "StockType"
                      value = {this.state.StockType}
                      onChange={this.handleInputChange}>
                        <option > Select Stock Type</option>
                        <option value="Electric">Electric</option>
                        <option value="Household">Household</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Meat related">Meat Related</option>
                        <option value="Food">Food</option>
                      </select>
                      <div style={{ fontSize: 14, color: "red" }}>
            {this.state.stockTypeError}
          </div>
                  </div>
            
                <div class="col">
                  <div className = "form-group" style = {{marginBottom: '15px'}}>
                      <label style={{marginBottom:'5px'}} >Supplier ID</label>
                      <input type="text"
                      className = "form-control"
                      name = "SupplierID"
                      placeholder="Enter Supplier ID"
                      value = {this.state.SupplierID}
                      onChange={this.handleInputChange}/>
                      <div style={{ fontSize: 14, color: "red" }}>
            {this.state.supplierIDError}
          </div>
                  </div>
                </div>
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

                <div class="col">
                  <div className = "form-group" style = {{marginBottom: '15px'}}>
                      <label style={{marginBottom:'5px'}} >Date Of Recieved</label>
                      <input type="date"
                      className = "form-control"
                      name = "DateOfReceived"
                      value = {this.state.DateOfReceived}
                      onChange={this.handleInputChange}
                      max={moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
                      />
                      <div style={{ fontSize: 14, color: "red" }}>
            {this.state.dateError}
          </div>
                  </div>
                  </div>
                   
                  <br />
                    <button className="btn btn-success" type ="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                          <i className= "far fa-check-square"></i>
                          &nbsp; Create Stock
                    </button>
                    &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                 
                <a className="btn btn-warning" style={{marginTop:'15px'}} href="/st">
                  <i className="far fa-edit"></i> &nbsp;View
                </a>
                    <br />
                    <br />
          </form>
    </div>
  
    )
  }
}
