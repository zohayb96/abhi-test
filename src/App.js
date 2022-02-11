import './App.css';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import 'font-awesome/css/font-awesome.min.css';
import logo from './logo.png';
import axios from 'axios';
import profile from './profile.jpeg';

const columns = [
  { field: 'id', headerName: '#', width: 10 },
  {
    field: 'vendorId',
    headerName: 'Vendor ID',
    width: 150,
    editable: true,
  },
  {
    field: 'vendorName',
    headerName: 'Vendor Name',
    width: 150,
    editable: true,
  },
  {
    field: 'netInvoice',
    headerName: 'Net Invoice Amount',
    type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    width: 160,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'number',
    width: 150,
  },
  {
    field: 'ntn',
    headerName: 'NTN',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'bankName',
    headerName: 'Bank Name',
    width: 110,
    editable: true,
  },
  {
    field: 'account',
    headerName: 'Account',
    width: 110,
    editable: true,
  },
  {
    field: 'delete',
    headerName: '',
    width: 20,
    renderCell: () => (
      <button class="deleteBtn" type="button">
        <i class="fa fa-trash"></i>
      </button>
    ),
  },
  {
    field: 'edit',
    headerName: '',
    width: 20,
    renderCell: () => (
      <button class="menuBtn" type="button" disabled>
        <i class="fa fa-book"></i>
      </button>
    ),
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorData: [],
    };
  }

  async componentDidMount() {
    const allEntries = await axios.get(
      `https://api.airtable.com/v0/appseli41RFhscJby/abhi?api_key=keyvjiUPSVCMAHe7k`
    );
    let data = [];
    let dataInside = allEntries.data.records;
    console.log('Vendor Data', allEntries.data.records);
    for (var i = 0; i < dataInside.length; i++) {
      data.push(dataInside[i].fields);
    }
    this.setState({
      vendorData: data,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="topbar">
          <h1 className="supportTitle">
            Operations Support / Millenium Entertainment (Pvt) Ltd
          </h1>
          <div class="logo">
            <img src={profile} className="profileImage" alt="profilePic" />
          </div>
        </div>
        <div className="container">
          <nav id="sidebar">
            <div class="logo">
              <img src={logo} className="logo" alt="logoImage" />
            </div>
            <ul class="list-unstyled components">
              <div class="sideNav">
                <button class="menuBtn" type="button">
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                </button>
                <p className="menuText">Vendors</p>
              </div>
              <div class="sideNav">
                <button class="menuBtn" type="button">
                  <i class="fa fa-align-justify "></i>
                </button>
                <p className="menuText">Statement</p>
              </div>
              <div class="sideNav">
                <button class="menuBtn" type="button">
                  <i class="fa fa-book"></i>
                </button>
                <p className="menuText">Transactions</p>
              </div>
              <div class="sideNav">
                <button class="menuBtn" type="button">
                  <i class="fa fa-window-close" aria-hidden="true"></i>
                </button>
                <p className="menuText">Logout</p>
              </div>
            </ul>
          </nav>
          <div id="tableContainer">
            <div id="outer">
              <div class="inner">
                <h1 className="vendorTitle">Vendors</h1>
              </div>
              <div class="inner">
                <button class="btn success">All Vendors</button>
              </div>
              <div class="inner">
                <button class="btn success">Pending Approvals</button>
              </div>
              <div class="inner">
                <button class="btn success">Title Tech Failures</button>
              </div>
            </div>
            <div className="cardContainer">
              <div class="topnav">
                <span class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                  ></input>
                  <button class="searchBtn" type="button">
                    <i class="fa fa-search"></i>
                  </button>
                  <button class="refreshBtn" type="button">
                    <i class="fa fa-refresh"></i>
                  </button>
                </span>
                <button className="addVendor">
                  <p>ADD VENDOR</p>
                </button>
              </div>
              <div class="midnav">
                <button class="deleteBtn" type="button">
                  <i class="fa fa-trash"></i>
                </button>
                <p style={{ color: 'red' }}>Delete</p>
              </div>
              <div className="dataGrid">
                <DataGrid
                  sx={{
                    borderColor: '#1d1446;',
                    border: 0,
                    color: '#1d1446;;',
                    '&:nth-of-type(odd)': {
                      bgcolor: '1d1446',
                    },
                    '&:nth-of-type(even)': {
                      bgcolor: 'blue',
                    },
                    color: 'white',
                  }}
                  rows={this.state.vendorData}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  disableColumnFilter
                  disableColumnSelector
                  disableVirtualization
                  disableColumnMenu
                  disableDensitySelector
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
