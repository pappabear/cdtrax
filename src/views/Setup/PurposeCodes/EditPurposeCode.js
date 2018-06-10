import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getPurposeCode, deletePurposeCode, updatePurposeCode } from '../../../actions/purposeCodes'

var purposeCodeBuffer = {}

const mapStateToProps = state => {

    state.purposeCodes.map(e =>
        purposeCodeBuffer = e
)

  return { 
    purposeCode: purposeCodeBuffer,
    hasErrored: state.purposeCodesHasErrored,
    isLoading: state.purposeCodesIsLoading
    }
}


class EditpurposeCode extends Component 
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
        var b = this.props.location.pathname.split("/")
        var id = 0
        for (var i=0; i<b.length; i++)
            id = b[i]
        this.props.getPurposeCode(id)
    }

    componentWillReceiveProps(nextProps) 
    {
        // capture the props and data entry form state BEFORE it fires another render
        this.setState({ code: nextProps.purposeCode.code, 
                        description: nextProps.purposeCode.description,
        })
    }

    handleUpdatepurposeCode() 
    {
        if (!this.isValid())
        {
            return
        }

        this.props.updatePurposeCode(this.props.purposeCode.id, this.state.code, this.state.description)
        this.props.history.push("/setup/purposeCodes")
    }

    handleDeletepurposeCode() 
    {
        this.props.deletePurposeCode(this.props.purposeCode.id)
        this.props.history.push("/setup/purposeCodes")
    }

    handleCancel() 
    {
        this.props.history.push("/setup/purposeCodes")
    }

    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the loan type record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving loan type...</h3>
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
                            <CardHeader><CardTitle> <b> {this.props.purposeCode.description} </b> </CardTitle></CardHeader>
                                <CardBody>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Code</Label>
                                                <Input type="text" id="code" 
                                                    //placeholder="code"
                                                    required
                                                    className={ this.state.codeHasErrors ? "is-invalid" : "" }
                                                    value={this.state.code} 
                                                    onChange={(e) => this.setState({ code: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="description">Description</Label>
                                                <Input type="text" id="description" 
                                                    //placeholder="description" 
                                                    required
                                                    className={ this.state.descriptionHasErrors ? "is-invalid" : "" }
                                                    value={this.state.description} 
                                                    onChange={(e) => this.setState({ description: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Button outline color="success" onClick={() => this.handleUpdatepurposeCode()}>Save changes</Button> &nbsp;
                                    <Button outline color="danger" onClick={() => this.handleDeletepurposeCode()}>Delete</Button> &nbsp;
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
        getPurposeCode: (id) => dispatch(getPurposeCode(id)),
        deletePurposeCode: (id) => dispatch(deletePurposeCode(id)),
        updatePurposeCode: (id, code, description) => dispatch(updatePurposeCode(id, code, description))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditpurposeCode)

