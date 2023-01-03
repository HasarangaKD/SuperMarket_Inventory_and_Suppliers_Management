import React, {Component} from 'react';
import axios from 'axios';
import ReactTooltip from "react-tooltip";

export default class UpdateList extends Component {
    constructor(props) {
        super(props);

        this.onChangeStockID = this.onChangeStockID.bind(this);
        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeItemType = this.onChangeItemType.bind(this);
        this.onChangeItemQuantity = this.onChangeItemQuantity.bind(this);
        this.onChangeUnitPrice = this.onChangeUnitPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            inventory: [],
            newStockID: '', 
            newItemName: '',
            newItemType: '',
            newItemQuantity: '',
            newItemUnitPrice: '',
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

    // Function to change state value
    onChangeStockID(e) {
        this.setState({
            newStockID: e.target.value
        });
    }

    // Function to change state value
    onChangeItemName(e) {
        this.setState({
            newItemName: e.target.value
        });
    }

    // Function to change state value
    onChangeItemType(e) {
        this.setState({
            newItemType: e.target.value
        });
    }

     // Function to change state value
   onChangeItemQuantity(e) {
       this.setState({
           newItemQuantity: e.target.value
       });
   }

    // Function to change state value
    onChangeUnitPrice(e) {
        this.setState({
            newItemUnitPrice: e.target.value
        })
    }

    // Helper function to change state value, since is array must create copy and modify copy
    onChangeItem(id) {
        // Creating copy of current inventory state and concatenating new object
        const holderArray = this.state.inventory.concat({_id: id, StockID: this.state.newStockID,ItemName: this.state.newItemName,ItemType: this.state.newItemType,quantity: this.state.newItemQuantity,UnitPrice: this.state.newItemUnitPrice})

        // Setting new state
        this.setState({
            inventory: holderArray
        })
    }

    // Function called when button is pressed
    async onSubmit(e) {
        e.preventDefault()

        const newItem = {
            StockID: this.state.newStockID,
            ItemName: this.state.newItemName,
            ItemType: this.state.newItemType,
            quantity: this.state.newItemQuantity,
            UnitPrice: this.state.newItemUnitPrice
        }
        
        await axios.post('/inv/', newItem)
        .then(res => {
            console.log(res.data.message);
            this.onChangeItem(res.data.id);
        })

        this.setState({
            newStockID: '',
            newItemName: '',
            newItemType: '',
            newItemQuantity: '',
            newItemUnitPrice: ''
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
            <div className= "col-md-8 mt-4 mx-auto">
                <h3>Create Items</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"style = {{marginBottom: '15px'}}>
                        <label style={{marginBottom:'5px'}} >Stock ID: </label>
                        <input type="text"
                        className="form-control"
                        placeholder="Input Stock ID "
                        required
                        value={this.state.newStockID}
                        onChange={this.onChangeStockID}/>
                    </div>
                    <div className="form-group"style = {{marginBottom: '15px'}}>
                        <label style={{marginBottom:'5px'}} >Item Name: </label>
                        <input type="text"
                        className="form-control"
                        placeholder="Input Item Name"
                        required
                        value={this.state.newItemName}
                        onChange={this.onChangeItemName}/>
                    </div>
                    <div className="form-group"style = {{marginBottom: '15px'}}>
                        <label style={{marginBottom:'5px'}} >Item Type: </label>
                    <select type="text" class="form-control"name = "ItemType" required
                      value = {this.state.newItemType}
                      onChange={this.onChangeItemType}>
                        <option > Select Item Type</option>
                        <option value="Sound Audio">Sound Audio</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Car Care">Car Care</option>
                        <option value="Cleaners">Cleaners</option>
                        <option value="Hair Care">Hair Care</option>
                        <option value="Pet Care">Pet Care</option>
                        <option value="Malt Drink">Malt Drink</option>
                        <option value="Milk">Milk</option>
                        <option value="Juices ">Juices </option>
                        <option value="Fresh Meat ">Fresh Meat </option>
                        <option value="Sea Food ">Sea Food </option>
                        <option value="Sausage">Sausages</option>
                      </select>
                    </div>
                    <div className="form-group"style = {{marginBottom: '15px'}}>
                        <label style={{marginBottom:'5px'}} >Quantity: </label>
                        <input type="number"
                        className="form-control"
                        placeholder="Enter Item Quantity"
                        required
                        value={this.state.newItemQuantity}
                        onChange={this.onChangeItemQuantity}/>
                    </div>
                    <div className="form-group"style = {{marginBottom: '15px'}}>
                        <label style={{marginBottom:'5px'}} >Unit Price: </label>
                        <input type="number"
                        className="form-control"
                        placeholder="Input Unit Price"
                        required
                        value={this.state.newItemUnitPrice}
                        onChange={this.onChangeUnitPrice}/>
                    </div>
                   <br />
                    <div className="form-group">
                        <input data-tip data-for="registerTip" type="submit" value="Create Item" className="btn btn-success"/>
                        <ReactTooltip id="registerTip" place="top" effect="solid">
                            Create a new Inventory Item
                        </ReactTooltip>
                    </div>
                </form>
                <br />
                <h4>Current Inventory</h4>
                <table className="table table-hover  table table-bordered border-info table table-info table-striped" style={{marginTop:20}}>
                    <thead>
                        <tr>
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
            
                <footer style={{marginTop:"70px"}}>
                </footer>
                </div>
            
        )}
}