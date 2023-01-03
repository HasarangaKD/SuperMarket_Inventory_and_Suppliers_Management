import axios from 'axios';
import React, { Component } from 'react'

export default class StockDetails extends Component {

  constructor(props){
    super(props);

    this.state = {
          stock:{}
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`/stock/${id}`).then((res) =>{
      if(res.data.success){
        this.setState({
          stock:res.data.stocks
        });

        console.log(this.state.stock);
      }
    });


  }
  render() {
    const id =this.props.match.params.id;

    const {StockType,SupplierID,SupplierName,DateOfReceived} = this.state.stock;
    return (

      /* Title */
      <div class="card bg-info text-left col-lg-7 mt-2 mb-2" >
                
      <div class="card-header">
       <h2><b>STOCK CARD</b> </h2>
      </div>

      {/* Card */}
      <div class="card-body" >
        <h5 class="card-title"></h5>

       
              <div style={{marginTop:'20px'}}>
              
              <h4>  <i class="fas fa-angle-double-up"></i> &nbsp; {`STO${id.substr(0,5)}`}</h4>
              <hr/>
              
              <dl className="row ">
                  <dt className="col-sm-3"><i class="fas fa-circle"></i><b> &nbsp;Stock Type</b></dt>
                  <dd className="col-sm-9">{StockType}</dd>

                  <dt className="col-sm-3"><i class="fas fa-circle"></i><b> &nbsp;Supplier ID</b></dt>
                  <dd className="col-sm-9">{SupplierID}</dd>

                  <dt className="col-sm-3"><i class="fas fa-circle"></i><b> &nbsp;Supplier Name</b></dt>
                  <dd className="col-sm-9">{SupplierName}</dd>

                  <dt className="col-sm-3"><i class="fas fa-circle"></i><b> &nbsp;Arrival Date</b></dt>
                  <dd className="col-sm-9">{DateOfReceived}</dd>

                  
              </dl>
              
          </div>
         
          
  </div>
  
        </div>
    
      
     /*
     <div style={{marginTop:'20px'}}>
        <h4>{StockID}</h4>
        <hr />
      <dl className="row">
  <dt className="col-sm-3">Stock Type</dt>
  <dd className="col-sm-9">{StockType}</dd>

  <dt className="col-sm-3">Supplier ID</dt>
  <dd className="col-sm-9">{SupplierID}</dd>

  <dt className="col-sm-3">Date Of Received</dt>
  <dd className="col-sm-9">{DateOfReceived}</dd>

  
    </dl>
    </div> 
    */ 
    )
  }
}
