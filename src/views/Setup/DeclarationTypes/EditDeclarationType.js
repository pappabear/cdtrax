import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'

import { connect } from 'react-redux'
import { getDeclarationType, deleteDeclarationType, updateDeclarationType } from '../../../actions/declarationTypes'

var declarationTypeBuffer = {}

const mapStateToProps = state => {

    state.declarationTypes.map(e =>
        declarationTypeBuffer = e
)

  return { 
    declarationType: declarationTypeBuffer,
    hasErrored: state.declarationTypesHasErrored,
    isLoading: state.declarationTypesIsLoading
    }
}


class EditdeclarationType extends Component 
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
        this.props.getDeclarationType(id)
    }

    componentWillReceiveProps(nextProps) 
    {
        // capture the props and data entry form state BEFORE it fires another render
        this.setState({ code: nextProps.declarationType.code, 
                        description: nextProps.declarationType.description,
        })
    }

    handleUpdatedeclarationType() 
    {
        if (!this.isValid())
        {
            return
        }

        this.props.updateDeclarationType(this.props.declarationType.id, this.state.code, this.state.description)
        this.props.history.push("/setup/declarationTypes")
    }

    handleDeletedeclarationType() 
    {
        this.props.deleteDeclarationType(this.props.declarationType.id)
        this.props.history.push("/setup/declarationTypes")
    }

    handleCancel() 
    {
        this.props.history.push("/setup/declarationTypes")
    }

    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the declaration type record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving declaration type...</h3>
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
                            <CardHeader><CardTitle> <b> {this.props.declarationType.description} </b> </CardTitle></CardHeader>
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

                                    <Button outline color="success" onClick={() => this.handleUpdatedeclarationType()}>Save changes</Button> &nbsp;
                                    <Button outline color="danger" onClick={() => this.handleDeletedeclarationType()}>Delete</Button> &nbsp;
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
        getDeclarationType: (id) => dispatch(getDeclarationType(id)),
        deleteDeclarationType: (id) => dispatch(deleteDeclarationType(id)),
        updateDeclarationType: (id, code, description) => dispatch(updateDeclarationType(id, code, description))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditdeclarationType)

