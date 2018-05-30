import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getBanks } from '../../../actions/banks'


const mapStateToProps = state => {
  return { 
    banks: state.banks,
    hasErrored: state.banksHasErrored,
    isLoading: state.banksIsLoading
    }
}


class Banks extends Component 
{

  constructor(props) {
    super(props)

    this.options = {
      sortIndicator: true,
      hideSizePerPage: false,
      paginationSize: 3,
      hidePageListOnlyOnePage: false,
      clearSearch: true,
      alwaysShowAllBtns: true,
      withFirstAndLast: false,
      //onRowClick: this.onRowClick
    }
  }

  componentDidMount() 
  {
      this.props.getBanks()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/setup/banks?id=" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  onRowClick(row, columnIndex)
  {
        console.log("THIS IS NOT WORKING!")
        console.log("Cannot access 'this' in callback from datatable....")
        console.log('onRowClick() row.id = ' + row.id)
        console.log('onRowClick() columnIndex = ' + columnIndex)
        console.log(this.props.history)
      //this.props.history.push("/views/banks/editbank?id=" + row.id)  //-- desired functionality
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of banks</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of banks...</h3>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

    return (

      <div className="animated fadeIn">

        <Card>
            <CardHeader> <h3>Banks</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.banks} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="code" dataSort>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort>Name</TableHeaderColumn>                        
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                    <TableHeaderColumn dataField="id" dataFormat={ this.actionFormatter } > click me </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" href="#/setup/banks?id=new" >Add a new bank</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getBanks: () => dispatch(getBanks()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Banks)

