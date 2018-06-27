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

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this)

    this.state = 
    {
      dropdownOpen: false,
      radioSelected: 2,
    }
  }

  toggle() 
  {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  onRadioBtnClick(radioSelected) 
  {
    this.setState({
      radioSelected: radioSelected,
    })
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
    var employeesWithServiceHoursYTD="n/a"
    var areasWithServiceHoursYTD="n/a"
    var activitiesWithServiceHoursYTD="n/a"
    var ytd=0

    console.log("props??")
    console.log(this.props.dashboardData)
    if (this.props.dashboardData.length > 0)
    {
      // pull out the total service hours from the API payload
      var len = this.props.dashboardData[1].length
      serviceHoursYTD = this.props.dashboardData[1][len-1].cra_hours + this.props.dashboardData[1][len-1].hours
      // pull out the total organizations from the API payload
      var len = this.props.dashboardData[3].length
      orgsWithServiceHoursYTD = this.props.dashboardData[3][len-1].sum_of_entities_with_service_hours
      // pull out the total employees from the API payload
      var len = this.props.dashboardData[9].length
      employeesWithServiceHoursYTD = this.props.dashboardData[9][len-1].sum_of_employees_with_service_hours
      // pull out the total areas from the API payload
      var len = this.props.dashboardData[7].length
      areasWithServiceHoursYTD = this.props.dashboardData[7][len-1].sum_of_areas_with_service_hours
      // pull out the total activities from the API payload
      var len = this.props.dashboardData[5].length
      activitiesWithServiceHoursYTD = this.props.dashboardData[5][len-1].sum_of_activities_with_service_hours
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
          data: [3, 15],
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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'My 2nd dataset',
          backgroundColor: 'rgba(0,99,132,0.2)',
          borderColor: 'rgba(10,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [60, 50, 90, 91, 46, 45, 30],
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
                          <small className="text-muted">Employees</small>
                          <br />
                          <strong className="h2">{employeesWithServiceHoursYTD}</strong>
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

//export default Dashboard

const mapDispatchToProps = (dispatch) => {
  return {
      getDashboardData: () => dispatch(getDashboardData()),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

