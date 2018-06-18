import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getActivities } from '../../actions/activities'


const mapStateToProps = state => {
  return { 
    activities: state.activities,
    hasErrored: state.activitiesHasErrored,
    isLoading: state.activitiesIsLoading
    }
}


class Activities extends Component 
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
      this.props.getActivities()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/activities/editactivity/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddActivityForm()
  {
        this.props.history.push("/activities/addactivity")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of activities</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of activities...</h3>
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
            <CardHeader> <h3>Activities</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.activities} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="activity_dt_formatted" dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="activity_type_description" dataSort>Activity</TableHeaderColumn>
                    <TableHeaderColumn dataField="purpose_code_description" dataSort>Purpose</TableHeaderColumn>
                    <TableHeaderColumn dataField="entity_name" dataSort>Entity</TableHeaderColumn>
                    <TableHeaderColumn dataField="employee_name" dataSort>Employee</TableHeaderColumn>                        
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddActivityForm() } >Add a new activity</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getActivities: () => dispatch(getActivities()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Activities)

