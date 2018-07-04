import React, { Component } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

import { connect } from 'react-redux'
import { getDashboardData } from '../../actions/dashboard'

const mapStateToProps = state => {
  return { 
    dashboardData: state.dashboardData,
    hasErrored: state.dashboardHasErrored,
    isLoading: state.dashboardIsLoading
    }
}


class Dashboard extends Component 
{

  constructor(props) 
  {
    super(props)
  }

  componentDidMount() 
  {
      this.props.getDashboardData()
  }

  
  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the dashboard</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Building dashboard...</h3>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

    var serviceHoursYTD="n/a"
    var orgsWithServiceHoursYTD="n/a"
    var volunteersWithServiceHoursYTD="n/a"
    var areasWithServiceHoursYTD="n/a"
    var activitiesWithServiceHoursYTD="n/a"
    var craHoursYTD="n/a"
    var nonCraHoursYTD="n/a"

    if (this.props.dashboardData.length > 0)
    {
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
      var timePeriodArray = []
      var craHoursArray = []
      var nonCraHoursArray = []
      for (var i=0; i<this.props.dashboardData[0].length; i++)
      {
        var totalHours = parseInt(this.props.dashboardData[0][i].total_hours)
        var craHours = parseInt(this.props.dashboardData[0][i].cra_hours)
        var year = this.props.dashboardData[0][i].service_year
        timePeriodArray.push(year)
        craHoursArray.push(craHours)
        nonCraHoursArray.push(totalHours - craHours)
      }
    }

    const pieOpts = 
    {
      title: {
        display: true,
        text: 'Hours YTD'
      }
    }
    
    const pieData = 
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
    
    const barData = 
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
    
    const barOptions = {
      title: {
        display: true,
        text: 'Hours YoY'
      },
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false
    }
    
    return (

      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                Community Development Service Hours
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="12" xl="12">
                    <Row>
                      <Col sm="4">              
                        <div className="chart-wrapper">
                          <Pie data={pieData} options={pieOpts} />
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
                          <Bar data={barData} options={barOptions} />
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

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
      getDashboardData: () => dispatch(getDashboardData()),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

