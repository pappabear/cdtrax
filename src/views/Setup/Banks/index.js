import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getBanks } from '../../../actions/banks'

const mapStateToProps = state => {
  return { 
    banks: state.banks,
    hasErrored: state.banksHasErrored,
    isLoading: state.banksIsLoading
    }
}


class Banks extends Component 
{

  constructor(props) {
    super(props)

    //this.table = this.props.banks
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }

  }

  componentDidMount() 
  {
      this.props.getBanks()
  }

  gotoAddForm()
  {
      this.props.history.push("/views/banks/addbank")
  }

  gotoEditForm(id)
  {
      this.props.history.push("/views/banks/editbank?id=" + id)
  }

  actionFormatter(cell, row) 
  {  
      return (
          <span> 'add' button here
          </span>
      )
  }

  //rowEvents = {
  //    onClick: (e, row, rowIndex) => {
  //        this.props.history.push("/views/banks/editactivity?id=" + row.id)
  //    }
  //}

  render() {

    if (this.props.hasErrored) 
    {
        return (<p>Sorry! There was an error loading the list of banks</p>)
    }

    if (this.props.isLoading) 
    {
        return (
            <div>

                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <h3>Retreiving list of banks...</h3>
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
            <CardHeader> <h3>Banks</h3> </CardHeader>
                <CardBody>
                    <BootstrapTable data={this.props.banks} version="4" striped hover pagination search options={this.options}>
                        <TableHeaderColumn isKey dataField="id">ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="code" dataSort>Code</TableHeaderColumn>
                        <TableHeaderColumn dataField="description" dataSort>Name</TableHeaderColumn>
                        
                    </BootstrapTable>
                </CardBody>
        </Card>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBanks: () => dispatch(getBanks()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Banks)

