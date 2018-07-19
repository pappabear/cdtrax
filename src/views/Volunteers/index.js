import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getVolunteers } from '../../actions/volunteers'


const mapStateToProps = state => {
  return { 
    volunteers: state.volunteers,
    hasErrored: state.volunteersHasErrored,
    isLoading: state.volunteersIsLoading
    }
}


class Volunteers extends Component 
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
      this.props.getVolunteers()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/volunteers/editvolunteer/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >{row.employee_code}</Button>
          </span>
      )
  }

  totalHoursFormatter(cell, row) 
  {    
    return (
        <span> 
            {row.total_hours.toLocaleString()}
        </span>
    )
}

  craHoursFormatter(cell, row) 
  {    
      return (
          <span> 
              {row.cra_hours.toLocaleString()}
          </span>
      )
  }

  gotoAddVolunteerForm()
  {
        this.props.history.push("/volunteers/addvolunteer")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of volunteers</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of volunteers...</h3>
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
            <CardHeader> <h3>Volunteers</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.volunteers} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } dataSort>Employee Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" dataSort>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="total_hours" dataFormat={ this.totalHoursFormatter } dataAlign='right' dataSort>Total Hours</TableHeaderColumn>
                    <TableHeaderColumn dataField="cra_hours" dataFormat={ this.craHoursFormatter } dataAlign='right' dataSort>CRA Hours</TableHeaderColumn>                        
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddVolunteerForm() } >Add a new volunteer</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getVolunteers: () => dispatch(getVolunteers()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Volunteers)

