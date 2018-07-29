import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { Bar, Pie } from 'react-chartjs-2'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

import { connect } from 'react-redux'
import { getServices } from '../../actions/services'
import { getDashboardData } from '../../actions/dashboard'


const mapStateToProps = state => {
  return { 
    services: state.services,
    dashboardData: state.dashboardData,
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
      this.props.getDashboardData()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/services/editservice/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >{row.activity_dt_formatted}</Button>
          </span>
      )
  }

  gotoAddServiceForm()
  {
        this.props.history.push("/services/addservice")  
  }

  render() {

    var serviceHoursYTD="n/a"
    var orgsWithServiceHoursYTD="n/a"
    var volunteersWithServiceHoursYTD="n/a"
    var areasWithServiceHoursYTD="n/a"
    var activitiesWithServiceHoursYTD="n/a"
    var craHoursYTD="n/a"
    var nonCraHoursYTD="n/a"

    var timePeriodArray = []
    var craHoursArray = []
    var nonCraHoursArray = []

    if (this.props.dashboardData.length > 0)
    {
      // SERVICE HOURS --------
      // pull out the total service hours from the API payload
      var len = this.props.dashboardData[0].length
      serviceHoursYTD = this.props.dashboardData[0][len-1].total_hours
      craHoursYTD = this.props.dashboardData[0][len-1].cra_hours
      nonCraHoursYTD = serviceHoursYTD - craHoursYTD

      // pull out the total organizations from the API payload
      len = this.props.dashboardData[1].length
      orgsWithServiceHoursYTD = this.props.dashboardData[1][len-1].sum_of_organizations_with_service_hours

      // pull out the total employees from the API payload
      len = this.props.dashboardData[4].length
      volunteersWithServiceHoursYTD = this.props.dashboardData[4][len-1].sum_of_volunteers_with_service_hours

      // pull out the total areas from the API payload
      len = this.props.dashboardData[3].length
      areasWithServiceHoursYTD = this.props.dashboardData[3][len-1].sum_of_areas_with_service_hours

      // pull out the total activities from the API payload
      len = this.props.dashboardData[2].length
      activitiesWithServiceHoursYTD = this.props.dashboardData[2][len-1].sum_of_activities_with_service_hours

      // determine YoY values
      for (var i=0; i<this.props.dashboardData[0].length; i++)
      {
        var totalHours = parseInt(this.props.dashboardData[0][i].total_hours, 10)
        var craHours = parseInt(this.props.dashboardData[0][i].cra_hours, 10)
        var year = this.props.dashboardData[0][i].service_year
        timePeriodArray.push(year)
        craHoursArray.push(craHours)
        nonCraHoursArray.push(totalHours - craHours)
      }
    }

    const servicePieOpts = 
    {
      title: {
        display: true,
        text: 'Hours YTD'
      }
    }
    
    const servicePieData = 
    {
      labels: [
        'CRA Eligible',
        'Not CRA Eligible',
      ],
      datasets: [
        {
          data: [craHoursYTD, nonCraHoursYTD],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
        }],
    }

    const serviceBarData = 
    {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      labels: timePeriodArray,
      datasets: [
        {
          label: 'CRA Eligible',
          backgroundColor: '#FF6384',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          //data: [65, 59, 80, 81, 56, 55, 40],
          data: craHoursArray
        },
        {
          label: 'Not CRA Eligible',
          backgroundColor: '#36A2EB',
          borderColor: 'rgba(10,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          //data: [60, 50, 90, 91, 46, 45, 30],
          data: nonCraHoursArray
        },
      ],
    }

    const serviceBarOptions = {
      title: {
        display: true,
        text: 'Service Hours YoY'
      },
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false
    }

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

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h3>Summary</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="12" xl="12">
                    <Row>
                      <Col sm="4">              
                        <div className="chart-wrapper">
                          <Pie data={servicePieData} options={servicePieOpts} />
                        </div>
                      </Col>
                      <Col sm="4" className='text-center'>
                        <div>
                          <small className="text-muted">Service Hours YTD</small>
                          <br />
                          <span className="display-2">{serviceHoursYTD}</span>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="chart-wrapper">
                          <Bar data={serviceBarData} options={serviceBarOptions} />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="3" className='text-center'>
                        <div>
                          <small className="text-muted">Organizations</small>
                          <br />
                          <strong className="h2">{orgsWithServiceHoursYTD}</strong>
                        </div>
                      </Col>
                      <Col sm="3" className='text-center'>
                        <div>
                          <small className="text-muted">Vounteering Employees</small>
                          <br />
                          <strong className="h2">{volunteersWithServiceHoursYTD}</strong>
                        </div>
                      </Col>
                      <Col sm="3" className='text-center'>
                        <div>
                          <small className="text-muted">Assessment Areas</small>
                          <br />
                          <strong className="h2">{areasWithServiceHoursYTD}</strong>
                        </div>
                      </Col>
                      <Col sm="3" className='text-center'>
                        <div>
                          <small className="text-muted">Activities</small>
                          <br />
                          <strong className="h2">{activitiesWithServiceHoursYTD}</strong>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
            <Col>
                <Card>
                    <CardHeader> <h3>Service Hours</h3> </CardHeader>
                    <CardBody>
                        <BootstrapTable data={this.props.services} version="4" striped bordered={false} hover pagination search options={this.options} >
                            <TableHeaderColumn dataField="activity_dt_formatted" dataFormat={ this.actionFormatter } dataSort>Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="organization_name" dataSort>Organization</TableHeaderColumn>
                            <TableHeaderColumn dataField="purpose_code_description" dataSort>Purpose</TableHeaderColumn>
                            <TableHeaderColumn dataField="total_hours">Service Hours</TableHeaderColumn>
                            <TableHeaderColumn dataField="cra_hours">CRA Eligible Hours</TableHeaderColumn>
                            <TableHeaderColumn isKey dataField="id" hidden > </TableHeaderColumn>
                        </BootstrapTable>
                    <p><Button outline color="success" onClick={() => this.gotoAddServiceForm() } >Add a new service</Button></p>
                    </CardBody>
                </Card>
            </Col>
        </Row>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getServices: () => dispatch(getServices()),
        getDashboardData: () => dispatch(getDashboardData()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Services)

