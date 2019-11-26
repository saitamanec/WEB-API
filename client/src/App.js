import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import Popup from 'react-popup';
import './Popup.css';
import {Button} from 'reactstrap'

class App extends Component {
  constructor() {
    super();
    this.state = {
      data:[],
      search: '',
      loading: false
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.getWords();
  }

  searchWords() {
    axios.get('/searchWord?word='+this.state.search).then(response=>{
       var len = this.state.data.length;
        this.state.data[len] = response.data
        this.setState({data:this.state.data})
    })
  }

  getWords(){
    axios.get('/getAll').then(response=>{
      this.state.data = response.data
      this.setState({data:this.state.data})
  })
    }
  handleChange (e) {
    var val = e.target.value
    this.setState({search:val})
  }
  deleteRecord(id) {
    const query = `/deleteRecord?id=${id}`;
    axios
      .get(query)
      .then(result => {
      this.getWords();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="jumbotron text-center header">
          <h1>Dictionary</h1>
          <p>Search for words</p>
        </div>
        <div className="container search">
          <div className="col-sm-12">
            <p />
            <form onSubmit={(e)=>e.preventDefault()}>
              <label>Enter your words:</label>
              <input
                type="text"
                class="form-control"
                // ref={input => (this.input = input)}
                onChange={(e) => {this.handleChange(e)}}
                />
              <p />
              <Button color="#555555" onClick={()=>this.searchWords()}>Search</Button>{' '}            
              </form>
            <p />
          </div>
          <div>
            <Popup />
          </div>
        </div>

        <div className="container">
          <div className="col-sm-12">
            <p />
            <ReactTable
              data={this.state.data.reverse()}
              columns={[
                {
                  Header: 'Delete',
                  accessor: 'title',
                  width: 100,
                  Cell: row => (
                    <a
                      onClick={() => {
                        this.deleteRecord(row.original._id);
                      }}
                    >
                      Delete
                    </a>
                  )
                },
                {
                  Header: 'Word',
                  width: 100,
                  Cell: row => {
                    return (
                      <div>
                        <p> {row.original.name}</p>
                      </div>
                    );
                  }
                },
                {
                  Header: 'Definition',
                  Cell: row => {
                    return (
                      <div>
                        <p> {row.original.def}</p>
                      </div>
                    );
                  }
                },
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
