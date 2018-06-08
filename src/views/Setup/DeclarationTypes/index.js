import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getDeclarationTypes } from '../../../actions/declarationTypes'


const mapStateToProps = state => {
  return { 
    declarationTypes: state.declarationTypes,
    hasErrored: state.declarationTypesHasErrored,
    isLoading: state.declarationTypesIsLoading
    }
}


class DeclarationTypes extends Component 
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
      this.props.getDeclarationTypes()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/setup/declarationTypes/editdeclarationType/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddDeclarationTypeForm()
  {
        this.props.history.push("/setup/declarationTypes/adddeclarationType")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of declaration types</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of declaration types...</h3>
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
            <CardHeader> <h3>Declaration Types</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.declarationTypes} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="code" dataSort>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort>Name</TableHeaderColumn>                        
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddDeclarationTypeForm() } >Add a new declaration type</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getDeclarationTypes: () => dispatch(getDeclarationTypes()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeclarationTypes)

