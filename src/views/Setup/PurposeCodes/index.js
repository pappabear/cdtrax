import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getPurposeCodes } from '../../../actions/purposeCodes'


const mapStateToProps = state => {
  return { 
    purposeCodes: state.purposeCodes,
    hasErrored: state.purposeCodesHasErrored,
    isLoading: state.purposeCodesIsLoading
    }
}


class PurposeCodes extends Component 
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
      this.props.getPurposeCodes()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/setup/purposeCodes/editpurposeCode/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddPurposeCodeForm()
  {
        this.props.history.push("/setup/purposeCodes/addpurposeCode")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of purpose codes</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of purpose codes...</h3>
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
            <CardHeader> <h3>Purpose Codes</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.purposeCodes} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="code" dataSort>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort>Name</TableHeaderColumn>                        
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddPurposeCodeForm() } >Add a new loan type</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getPurposeCodes: () => dispatch(getPurposeCodes()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PurposeCodes)

