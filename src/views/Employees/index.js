import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getEmployees } from '../../actions/employees'


const mapStateToProps = state => {
  return { 
    employees: state.employees,
    hasErrored: state.employeesHasErrored,
    isLoading: state.employeesIsLoading
    }
}


class Employees extends Component 
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
      this.props.getEmployees()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/employees/editemployee/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddEmployeeForm()
  {
        this.props.history.push("/employees/addemployee")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of employees</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of employees...</h3>
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
            <CardHeader> <h3>Employees</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.employees} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="code" dataSort>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" dataSort>Title</TableHeaderColumn>                        
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddEmployeeForm() } >Add a new employee</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getEmployees: () => dispatch(getEmployees()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Employees)

