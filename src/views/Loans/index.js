import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { Bar, Pie } from 'react-chartjs-2'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

import { connect } from 'react-redux'
import { getLoans } from '../../actions/loans'
import { getDashboardData } from '../../actions/dashboard'


const mapStateToProps = state => {
  return { 
    loans: state.loans,
    dashboardData: state.dashboardData,
    hasErrored: state.loansHasErrored,
    isLoading: state.loansIsLoading
    }
}


class Loans extends Component 
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
      this.props.getLoans()
      this.props.getDashboardData()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/loans/editloan/" + row.id

      return (
          <span> 
              <Button outline color="info" href={editUrl} >{row.activity_dt_formatted}</Button>
          </span>
      )
  }

  amountFormatter(cell, row) 
  {    
      // if the value is null, we are still waiting for the call to comeback
      if ((row.amount === null) || (row.amount == null))
          return
      var v = row.amount.toString()
      v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return (
          <span> 
              {'$' + v}
          </span>
      )
  }

  gotoAddLoanForm()
  {
        this.props.history.push("/loans/addloan")  
  }

  
  render() {

    var craLoansYTD="n/a"
    var nonCraLoansYTD="n/a"
    var loansValueYTD="n/a"
    var orgsLentToYTD="n/a"
    var numberOfLoansYTD="n/a"
    var craLoansArray = []
    var nonCraLoansArray = []
    var timePeriodArray = []
    var len=0

    if (this.props.dashboardData.length > 0)
    {
        timePeriodArray = []
        for (var i=0; i<this.props.dashboardData[5].length; i++)
        {
          var totalAmount = parseInt(this.props.dashboardData[5][i].total_amount, 10)
          var craAmount = parseInt(this.props.dashboardData[5][i].cra_amount, 10)
          var year = this.props.dashboardData[5][i].loan_year
          timePeriodArray.push(year)
          craLoansArray.push(craAmount)
          nonCraLoansArray.push(totalAmount - craAmount)
        }
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
  
    const loanBarData = 
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
          data: craLoansArray
        },
        {
          label: 'Not CRA Eligible',
          backgroundColor: '#36A2EB',
          borderColor: 'rgba(10,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          //data: [60, 50, 90, 91, 46, 45, 30],
          data: nonCraLoansArray
        },
      ],
    }
  
    const loanBarOptions = 
    {
      title: {
        display: true,
        text: 'Loans YoY'
      },
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false
    }
  

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of loans</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of loans...</h3>
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
                          <Bar data={loanBarData} options={loanBarOptions} />
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

        <Card>
            <CardHeader> <h3>Loans</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.loans} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="activity_dt_formatted" dataFormat={ this.actionFormatter } dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="organization_name" dataSort>Organization</TableHeaderColumn>
                    <TableHeaderColumn dataField="amount" dataFormat={ this.amountFormatter } dataAlign='right' dataSort>Amount</TableHeaderColumn>
                    <TableHeaderColumn dataField="purpose_code_description" dataSort>Purpose</TableHeaderColumn>
                    <TableHeaderColumn isKey dataField="id" hidden > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddLoanForm() } >Add a new loan</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getLoans: () => dispatch(getLoans()),
        getDashboardData: () => dispatch(getDashboardData()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Loans)

