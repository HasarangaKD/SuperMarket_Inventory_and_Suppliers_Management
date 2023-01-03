import React, { Component } from 'react'
import axios from 'axios';


export default class SupplierDetails extends Component {

  constructor(props){
    super(props);

    this.state = {
          supplier:{}
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`/supplier/${id}`).then((res) =>{
      if(res.data.success){
        this.setState({
          supplier:res.data.suppliers
        });

        console.log(this.state.supplier);
      }
    });


  }
  render() {
    const id =this.props.match.params.id;

    const {SupplierName,SupplierCat,SupplierCompany,ContactNumber,Email} = this.state.supplier;
    return (
      /* Title */
    <div class="card bg-info text-left col-lg-7 mt-2 mb-2" >
              
    <div class="card-header">
     <h3><b>SUPPLIER DETAILS</b> </h3>
    </div>

    {/* Card */}
    <div class="card-body" >
      <h5 class="card-title"></h5>

     
            <div style={{marginTop:'20px'}}>
            
            <h4>  <i class="fas fa-angle-double-up"></i> &nbsp; {`SUP${id.substr(0,5)}`}</h4>
            <hr/>
            
            <dl className="row ">
                <dt className="col-sm-3"><i class="fas fa-circle"></i><b> &nbsp;Sup Name</b></dt>
                <dd className="col-sm-9">{SupplierName}</dd>

                <dt className="col-sm-3"><i class="fas fa-circle"></i><b> &nbsp;Sup Category</b></dt>
                <dd className="col-sm-9">{SupplierCat}</dd>

                <dt className="col-sm-3"><i class="fas fa-circle"></i><b> &nbsp;Sup Company</b></dt>
                <dd className="col-sm-9">{SupplierCompany}</dd>

                <dt className="col-sm-3"><i class="fas fa-circle"></i><b> &nbsp;Contact Num</b></dt>
                <dd className="col-sm-9">0{ContactNumber}</dd>

                <dt className="col-sm-3"><i class="fas fa-circle"></i><b> &nbsp;Email Address</b></dt>
                <dd className="col-sm-9">{Email}</dd>
            </dl>
            
        </div>
       
        
</div>

      </div>
  
  
    )
  }
}
