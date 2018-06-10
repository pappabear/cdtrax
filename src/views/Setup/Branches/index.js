import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getBranches } from '../../../actions/branches'


const mapStateToProps = state => {
  return { 
    branches: state.branches,
    hasErrored: state.branchesHasErrored,
    isLoading: state.branchesIsLoading
    }
}


class Branchs extends Component 
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
      this.props.getBranches()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/setup/branches/editbranch/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddBranchForm()
  {
        this.props.history.push("/setup/branches/addbranch")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of branches</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of branches...</h3>
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
            <CardHeader> <h3>Branches</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.branches} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="bank_description" dataSort>Bank</TableHeaderColumn>
                    <TableHeaderColumn dataField="code" dataSort>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort>Name</TableHeaderColumn>                        
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddBranchForm() } >Add a new branch</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getBranches: () => dispatch(getBranches()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Branchs)

