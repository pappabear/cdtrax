import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getCollateralCodes } from '../../../actions/collateralCodes'


const mapStateToProps = state => {
  return { 
    collateralCodes: state.collateralCodes,
    hasErrored: state.collateralCodesHasErrored,
    isLoading: state.collateralCodesIsLoading
    }
}


class CollateralCodes extends Component 
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
      this.props.getCollateralCodes()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/setup/collateralCodes/editcollateralCode/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddCollateralCodeForm()
  {
        this.props.history.push("/setup/collateralCodes/addcollateralCode")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of collateral codes</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of collateral codes...</h3>
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
            <CardHeader> <h3>Collateral Codes</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.collateralCodes} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="code" dataSort>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort>Name</TableHeaderColumn>                        
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddCollateralCodeForm() } >Add a new collateral code</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getCollateralCodes: () => dispatch(getCollateralCodes()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CollateralCodes)

