import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getInvestments } from '../../actions/investments'


const mapStateToProps = state => {
  return { 
    investments: state.investments,
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
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/investments/editinvestment/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddInvestmentForm()
  {
        this.props.history.push("/investments/addinvestment")  
  }

  render() {

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
            <CardHeader> <h3>Investments</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.investments} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="activity_dt_formatted" dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="purpose_code_description" dataSort>Purpose</TableHeaderColumn>
                    <TableHeaderColumn dataField="organization_name" dataSort>Organization</TableHeaderColumn>
                    <TableHeaderColumn dataField="original_amount" dataSort>Amount</TableHeaderColumn>
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Investments)

