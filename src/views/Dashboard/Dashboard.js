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

    var craLoansYTD="n/a"
    var nonCraLoansYTD="n/a"
    var loansValueYTD="n/a"
    var orgsLentToYTD="n/a"
    var numberOfLoansYTD="n/a"

    var craInvestmentsYTD="n/a"
    var nonCraInvestmentsYTD="n/a"
    var investmentsValueYTD="n/a"
    var orgsInvestedInYTD="n/a"
    var numberOfInvestmentsYTD="n/a"


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
        text: 'Hours YoY'
      },
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false
    }


    if (this.props.dashboardData.length > 0)
    {

      var loanAmountsByYear = this.props.dashboardData[5]
      len = loanAmountsByYear.length
      craLoansYTD = loanAmountsByYear[len-1].cra_amount
      nonCraLoansYTD = parseInt(loanAmountsByYear[len-1].total_amount, 10) - parseInt(loanAmountsByYear[len-1].cra_amount, 10)
      
      var opts=''
      loansValueYTD = parseInt(loanAmountsByYear[len-1].total_amount, 10)
      if (loansValueYTD < 1000)
      {
        opts = '{style: "decimal", currency: "USD", minimumFractionDigits: 0}'
        loansValueYTD = "$" + loansValueYTD.toLocaleString("en-US", opts)
      }
      else
      {
        opts = '{style: "decimal", currency: "USD", minimumFractionDigits: 0}'
        loansValueYTD = parseInt(loansValueYTD / 1000, 10)
        loansValueYTD = "$" + loansValueYTD.toLocaleString("en-US", opts) + "k"

      }

      orgsLentToYTD = this.props.dashboardData[6][len-1].count_of_organizations_with_loan_by_year
      numberOfLoansYTD = this.props.dashboardData[7][len-1].count_of_loans_by_year
  }

    const loanPieOpts = 
    {
      title: {
        display: true,
        text: 'Loans YTD'
      }
    }
    
    const loanPieData = 
    {
      labels: [
        'CRA Eligible',
        'Not CRA Eligible',
      ],
      datasets: [
        {
          data: [craLoansYTD, nonCraLoansYTD],
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
    
    
    if (this.props.dashboardData.length > 0)
    {

      var investmentAmountsByYear = this.props.dashboardData[8]
      len = investmentAmountsByYear.length
      craInvestmentsYTD = investmentAmountsByYear[len-1].cra_amount
      nonCraInvestmentsYTD = investmentAmountsByYear[len-1].non_cra_amount
      
      investmentsValueYTD = parseInt(investmentAmountsByYear[len-1].cra_amount, 10) + parseInt(investmentAmountsByYear[len-1].non_cra_amount, 10)
      if (investmentsValueYTD < 1000)
      {
        opts = '{style: "decimal", currency: "USD", minimumFractionDigits: 0}'
        investmentsValueYTD = "$" + investmentsValueYTD.toLocaleString("en-US", opts)
      }
      else
      {
        opts = '{style: "decimal", currency: "USD", minimumFractionDigits: 0}'
        investmentsValueYTD = parseInt(investmentsValueYTD / 1000, 10)
        investmentsValueYTD = "$" + investmentsValueYTD.toLocaleString("en-US", opts) + "k"

      }

      orgsInvestedInYTD = this.props.dashboardData[9][len-1].count_of_organizations_with_investment_by_year
      numberOfInvestmentsYTD = this.props.dashboardData[10][len-1].count_of_investments_by_year
  }

    const investmentPieOpts = 
    {
      title: {
        display: true,
        text: 'Investments YTD'
      }
    }
    
    const investmentPieData = 
    {
      labels: [
        'CRA Eligible',
        'Not CRA Eligible',
      ],
      datasets: [
        {
          data: [craInvestmentsYTD, nonCraInvestmentsYTD],
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
              <CardHeader>
                Community Development Loans
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="12" xl="12">
                    <Row>
                      <Col sm="4">              
                        <div className="chart-wrapper">
                          <Pie data={loanPieData} options={loanPieOpts} />
                        </div>
                      </Col>
                      <Col sm="4" className='text-center'>
                        <div>
                          <small className="text-muted">Loans Value YTD</small>
                          <br />
                          <span className="display-2">{loansValueYTD}</span>
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
                          <small className="text-muted">Number of Organizations Lent To YTD</small>
                          <br />
                          <strong className="h2">{orgsLentToYTD}</strong>
                        </div>
                      </Col>
                      <Col sm="3" className='text-center'>
                        <div>
                          <small className="text-muted">Number of Loans YTD</small>
                          <br />
                          <strong className="h2">{numberOfLoansYTD}</strong>
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
              <CardHeader>
                Community Development Investments
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="12" xl="12">
                    <Row>
                      <Col sm="4">              
                        <div className="chart-wrapper">
                          <Pie data={investmentPieData} options={investmentPieOpts} />
                        </div>
                      </Col>
                      <Col sm="4" className='text-center'>
                        <div>
                          <small className="text-muted">Investments Value YTD</small>
                          <br />
                          <span className="display-2">{investmentsValueYTD}</span>
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
                          <small className="text-muted">Number of Organizations Invested in YTD</small>
                          <br />
                          <strong className="h2">{orgsInvestedInYTD}</strong>
                        </div>
                      </Col>
                      <Col sm="3" className='text-center'>
                        <div>
                          <small className="text-muted">Number of Investments YTD</small>
                          <br />
                          <strong className="h2">{numberOfInvestmentsYTD}</strong>
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

