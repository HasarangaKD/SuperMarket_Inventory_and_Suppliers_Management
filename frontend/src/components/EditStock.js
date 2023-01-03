import axios from 'axios';
import React, { Component } from 'react'
import moment from "moment";
import swal from "sweetalert2";


export default class EditStock extends Component {

  constructor(props){
    super(props);
    this.state={
      StockType:"",
      SupplierID:"",
      SupplierName:"",
      DateOfReceived:"",
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

    const {StockType,SupplierID,SupplierName,DateOfReceived} = this.state;

    const data ={
      StockType:StockType,
      SupplierID:SupplierID,
      SupplierName:SupplierName,
      DateOfReceived:DateOfReceived,
      
    
    }
    console.log(data)

    axios.put(`/stock/update/${id}`,data).then((res) =>{        
      if(res.data.success){
        swal.fire("Updated", "Stock Details Updated Successfully", "success");
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
  }

  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/stock/${id}`).then((res) =>{
      if(res.data.success){
        this.setState({
          StockType:res.data.stocks.StockType,
          SupplierID:res.data.stocks.SupplierID,
          SupplierName:res.data.stocks.SupplierName,
          DateOfReceived:res.data.stocks.DateOfReceived,
          
        });

        console.log(this.state.stocks);
      }
    });
  }

  render () {   
 
    return (
       
      <div className= "col-md-8 mt-4 mx-auto">
            <h1 className = "h3 mb-3 font-weight-normal">Edit Stock</h1>
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

                  <div class="row">
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
          </div>
      
              <br />
                <button className="btn btn-success" type ="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                      <i className= "far fa-check-square"></i>
                      &nbsp; Update Stock
                </button>
                &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; 
                 &nbsp; &nbsp; 
                 
                <a className="btn btn-warning" style={{marginTop:'15px'}} href="/st">
                  <i className="far fa-edit"></i> &nbsp;View
                </a>
            
      </form>
</div>

)
}
}
