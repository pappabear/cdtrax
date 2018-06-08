import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getDisasterTypes } from '../../../actions/disasterTypes'


const mapStateToProps = state => {
  return { 
    disasterTypes: state.disasterTypes,
    hasErrored: state.disasterTypesHasErrored,
    isLoading: state.disasterTypesIsLoading
    }
}


class DisasterTypes extends Component 
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
      this.props.getDisasterTypes()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/setup/disasterTypes/editdisasterType/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddDisasterTypeForm()
  {
        this.props.history.push("/setup/disasterTypes/adddisasterType")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of disaster types</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of disaster types...</h3>
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
            <CardHeader> <h3>Disaster Types</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.disasterTypes} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="code" dataSort>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort>Name</TableHeaderColumn>                        
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddDisasterTypeForm() } >Add a new disaster type</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getDisasterTypes: () => dispatch(getDisasterTypes()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DisasterTypes)

