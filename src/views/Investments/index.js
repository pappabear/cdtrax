import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getInvestments } from '../../actions/investments'
import { getDashboardData } from '../../actions/dashboard'

import { Bar, Pie } from 'react-chartjs-2'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

const mapStateToProps = state => {
  return { 
    investments: state.investments,
    dashboardData: state.dashboardData,
    hasErrored: state.investmentsHasErrored,
    isLoading: state.investmentsIsLoading
    }
}


class Investments extends Component 
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
      this.props.getInvestments()
      this.props.getDashboardData()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/investments/editinvestment/" + row.id

      return (
          <span> 
              <Button outline color="info" href={editUrl} >{row.activity_dt_formatted}</Button>
          </span>
      )
  }

  amountFormatter(cell, row) 
  {    
      // if the value is null, we are still waiting for the call to comeback
      if ((row.original_amount === null) || (row.original_amount == null))
          return
      var v = row.original_amount.toString()
      v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return (
          <span> 
              {'$' + v}
          </span>
      )
  }

  gotoAddInvestmentForm()
  {
        this.props.history.push("/investments/addinvestment")  
  }

  render() {

    var craInvestmentsYTD="n/a"
    var nonCraInvestmentsYTD="n/a"
    var investmentsValueYTD="n/a"
    var orgsInvestedInYTD="n/a"
    var numberOfInvestmentsYTD="n/a"
    var timePeriodArray = []
    var nonCraInvestmentsArray = []
    var craInvestmentsArray = []
    var opts = ""
    
    if (this.props.dashboardData.length > 0)
    {
        var investmentAmountsByYear = this.props.dashboardData[8]
        var len = investmentAmountsByYear.length
        craInvestmentsYTD = investmentAmountsByYear[len-1].cra_amount
        nonCraInvestmentsYTD = investmentAmountsByYear[len-1].non_cra_amount
        timePeriodArray = []
          
        for (var i=0; i<this.props.dashboardData[8].length; i++)
        {
        var nonCraAmount = parseInt(this.props.dashboardData[8][i].non_cra_amount, 10)
        var craAmount = parseInt(this.props.dashboardData[8][i].cra_amount, 10)
        var year = this.props.dashboardData[8][i].investment_year
        timePeriodArray.push(year)
        craInvestmentsArray.push(craAmount)
        nonCraInvestmentsArray.push(nonCraAmount)
        }
        var loanAmountsByYear = this.props.dashboardData[5]
        len = loanAmountsByYear.length
        craInvestmentsYTD = loanAmountsByYear[len-1].cra_amount
        nonCraInvestmentsYTD = parseInt(loanAmountsByYear[len-1].total_amount, 10) - parseInt(loanAmountsByYear[len-1].cra_amount, 10)

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

    const investmentBarOptions = {
        title: {
          display: true,
          text: 'Investments YoY'
        },
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false
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
    
      const investmentBarData = 
      {
        labels: timePeriodArray,
        datasets: [
          {
            label: 'CRA Eligible',
            backgroundColor: '#FF6384',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: craInvestmentsArray
          },
          {
            label: 'Not CRA Eligible',
            backgroundColor: '#36A2EB',
            borderColor: 'rgba(10,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: nonCraInvestmentsArray
          },
        ],
      }
  
    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of investments</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of investments...</h3>
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
            <CardHeader> <h3>Summary</h3> </CardHeader>
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
                          <Bar data={investmentBarData} options={investmentBarOptions} />
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

            <CardHeader> <h3>Investments</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.investments} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="activity_dt_formatted" dataFormat={ this.actionFormatter } dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="purpose_code_description" dataSort>Purpose</TableHeaderColumn>
                    <TableHeaderColumn dataField="organization_name" dataSort>Organization</TableHeaderColumn>
                    <TableHeaderColumn dataField="original_amount" dataFormat={ this.amountFormatter } dataAlign='right' dataSort>Amount</TableHeaderColumn>
                    <TableHeaderColumn isKey dataField="id" hidden > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddInvestmentForm() } >Add a new investment</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getInvestments: () => dispatch(getInvestments()),
        getDashboardData: () => dispatch(getDashboardData()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Investments)

