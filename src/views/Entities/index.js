import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getEntities } from '../../actions/entities'


const mapStateToProps = state => {
  return { 
    entities: state.entities,
    hasErrored: state.entitiesHasErrored,
    isLoading: state.entitiesIsLoading
    }
}


class Entities extends Component 
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
      this.props.getEntities()
  }

  actionFormatter(cell, row) 
  {  
      var editUrl = "#/entities/editentity/" + row.id
  
      return (
          <span> 
              <Button outline color="info" href={editUrl} >Edit</Button>
          </span>
      )
  }

  gotoAddEntityForm()
  {
        this.props.history.push("/entities/addentity")  
  }

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of entities</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of entities...</h3>
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
            <CardHeader> <h3>Entities</h3> </CardHeader>
            <CardBody>
                <BootstrapTable data={this.props.entities} version="4" striped bordered={false} hover pagination search options={this.options} >
                    <TableHeaderColumn dataField="name" dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="city" dataSort>City</TableHeaderColumn>
                    <TableHeaderColumn dataField="state" dataSort>State</TableHeaderColumn>
                    <TableHeaderColumn dataField="zip" dataSort>Zip</TableHeaderColumn>                        
                    <TableHeaderColumn isKey dataField="id" dataFormat={ this.actionFormatter } > </TableHeaderColumn>
                </BootstrapTable>
            <p><Button outline color="success" onClick={() => this.gotoAddEntityForm() } >Add a new entity</Button></p>
            </CardBody>
        </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getEntities: () => dispatch(getEntities()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Entities)

