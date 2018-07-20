import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getLoans } from '../../actions/loans'


const mapStateToProps = state => {
  return { 
    loans: state.loans,
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Loans)

