import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getServices } from '../../actions/services'


const mapStateToProps = state => {
  return { 
    services: state.services,
    hasErrored: state.servicesHasErrored,
    isLoading: state.servicesIsLoading
    }
}


class Services extends Component 
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
      this.props.getServices()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/services/editservice/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddServiceForm()
  {
        this.props.history.push("/services/addservice")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of services</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of services...</h3>
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
            <CardHeader> <h3>Service Hours</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.services} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="activity_dt_formatted" dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="purpose_code_description" dataSort>Purpose</TableHeaderColumn>
                    <TableHeaderColumn dataField="organization_name" dataSort>Organization</TableHeaderColumn>
                    <TableHeaderColumn dataField="total_hours">Service Hours</TableHeaderColumn>
                    <TableHeaderColumn dataField="cra_hours">CRA Eligible Hours</TableHeaderColumn>
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddServiceForm() } >Add a new service</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getServices: () => dispatch(getServices()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Services)

