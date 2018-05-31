import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getBanks, deleteBank, updateBank } from '../../../actions/banks'

var bankBuffer = {}


class AddBank extends Component 
{


    render() {

            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>addpage</h3>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        
    }
}

export default AddBank