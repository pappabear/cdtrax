import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getBanks, deleteBank, updateBank } from '../../../actions/banks'

var bankBuffer = {}

const mapStateToProps = state => {

    state.banks.map(e =>
        bankBuffer = e
)

  return { 
    bank: bankBuffer,
    hasErrored: state.banksHasErrored,
    isLoading: state.banksIsLoading
    }
}


class EditBank extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = 
        {
            id: "",
            code: "",
            description: "",
            codeHasErrors: false,
            descriptionHasErrors: false,
        }

    }

    isValid = () => {
        var v=true
        if (this.state.code === "")
        {
            this.setState({ codeHasErrors: true })
            v=false
        }
        if (this.state.description === "")
        {
            this.setState({ descriptionHasErrors: true })
            v=false
        }
        return v
    }

    componentDidMount() 
    {
        this.props.getBanks()
    }

    handleChange(event) 
    {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleUpdateBank() 
    {
        if (!this.isValid())
        {
            return
        }

        this.props.updateBank(this.props.bank.id, this.state.code, this.state.description)
        this.setState({ code: "", 
                        description: "", 
                        codeHasErrors: false,
                        descriptionHasErrors: false
             })
        this.props.history.push("#/setup/banks")
    }

    handleDeleteBank() 
    {
        this.props.deleteBank(this.props.bank.id)
        this.props.history.push("/setup/banks")
    }

    handleCancel() 
    {
        this.props.history.push("/setup/banks")
    }

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
                                    <h3>Retreiving bank...</h3>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }

        return (

            <div className="animated fadeIn">

                <Row>
                    <Col xs={12} >
                        <form >
                        <Card>
                            <CardHeader><CardTitle> <b> {this.props.bank.description} </b> </CardTitle></CardHeader>
                                <CardBody>
                                    <FormGroup row className="my-0">
                                    <Col xs="4">
                                            <FormGroup>
                                            <Label htmlFor="code">Code</Label>
                                            <Input type="text" id="code" placeholder="code"                                                         
                                                    value={this.state.code} 
                                                    onChange={this.handleChange} />
                                            </FormGroup>
                                    </Col>
                                    <Col xs="8">
                                            <FormGroup>
                                            <Label htmlFor="description">Description</Label>
                                            <Input type="text" id="description" placeholder="description" 
                                                    value={this.state.code} 
                                                    onChange={this.handleChange} />
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>

                                    <Button outline color="success" onClick={() => this.handleUpdateBank()}>Save changes</Button> &nbsp;
                                    <Button outline color="danger" onClick={() => this.handleDeleteBank()}>Delete</Button> &nbsp;
                                    <Button outline color="info" onClick={() => this.handleCancel()}>Back to list</Button>     

                                </CardBody>
                            </Card>
                        </form>
                    </Col>
                </Row>

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getBanks: () => dispatch(getBanks()),
        deleteBank: (id) => dispatch(deleteBank(id)),
        updateBank: (id, code, description) => dispatch(updateBank(id, code, description))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditBank)

