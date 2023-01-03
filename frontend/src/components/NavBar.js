import React, { Component } from 'react'

export default class NavBar extends Component {

  

  render() {
    return (
      
      

      /*
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/dash">Home Dashboard</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/">Inventory <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/s">Suppliers</a>
          </li>
        </ul>
      </div>
    </nav> 
    */
/*
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" >
  <div class="container-fluid">

  <a class="navbar-brand" >
  <img src="../Logo.jpg" width="200" height="75" alt=""/>
  </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <a class="navbar-brand" href="/">Stock Home</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <a class="navbar-brand" href="/s">Supplier</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/dash">Home Dashboard</a>
        </li>
      </ul>
    </div>
   
  </div>
</nav>
 */
/*
<nav class="navbar navbar-expand-lg navbar-dark bg-primary  rounded-3">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/dash">Home Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/"> &#62; Inventory  <span class="sr-only">(current)</span> </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/s"> &#62; Suppliers  <span class="sr-only">(current)</span> </a>
      </li>
   
    </ul>
  </div>
</nav> 
*/

<nav class="navbar navbar-expand-sm navbar-dark bg-primary rounded-3"style={{marginBottom: "20px",marginTop:"20px"}}>
  <a class="navbar-brand"><h3 style={{color: "yellow"}}>&nbsp; HDSC Supermarket</h3></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav mr-auto">

    <li class="nav-item active">
        <a class="nav-link" href="/"style={{fontSize: "20px"}}>Home Dashboard <span class="sr-only">(current)</span></a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/st"style={{fontSize: "20px"}}> &#62; Stock Details</a>
      </li>


      <li class="nav-item dropdown " >
                        <a href="/list" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"style={{fontSize: "20px"}}>&#62; Inventory Items</a>
                        <div class="dropdown-menu bg-primary">
                            <a href="/list" class="dropdown-item">Inventory Overview</a>
                            <a href="/create" class="dropdown-item">Add New Items</a>
                            <a href="/update" class="dropdown-item">Restock/Use</a>
                            <a href="/remove"class="dropdown-item">Remove Items</a>
                        </div>
                    </li>
                    
      
      <li class="nav-item">
        <a class="nav-link" href="/s"style={{fontSize: "20px"}}> &#62; Suppliers</a>
      </li>
    </ul>
  </div>
</nav>

    )
  }
}
