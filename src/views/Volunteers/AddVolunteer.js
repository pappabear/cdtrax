import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { connect } from 'react-redux'
import { addVolunteer } from '../../actions/volunteers'

var volunteerBuffer = {}

const mapStateToProps = state => {

    state.volunteers.map(e =>
        volunteerBuffer = e
)

  return { 
    volunteer: volunteerBuffer,
    hasErrored: state.volunteersHasErrored,
    isLoading: state.volunteersIsLoading
    }
}


class AddVolunteer extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = 
        {
            employee_code: "",
            name: "",
            title: "",
            codeHasErrors: false,
            nameHasErrors: false,
        }

    }

    isValid = () => {
        var v=true
        if (this.state.employee_code === "")
        {
            this.setState({ codeHasErrors: true })
            v=false
        }
        if (this.state.name === "")
        {
            this.setState({ nameHasErrors: true })
            v=false
        }
        if (this.state.title === "")
        {
            this.setState({ titleHasErrors: true })
            v=false
        }
        return v
    }

    handleAddVolunteer() 
    {
        if (!this.isValid())
        {
            return
        }

        this.props.addVolunteer(this.state.employee_code, this.state.name, this.state.title)

        // navigate back to /volunteers after dispatching the add
        this.props.history.push("/volunteers")
    }

    handleCancel() 
    {
        this.props.history.push("/volunteers")
    }

    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the volunteer record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving volunteer...</h3>
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
                            <CardHeader><CardTitle> <b> Adding new Volunteer </b> </CardTitle></CardHeader>
                                <CardBody>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="employee_code">Employee Code</Label>
                                                <Input type="text" id="employee_code" 
                                                    //placeholder="code"
                                                    required
                                                    className={ this.state.codeHasErrors ? "is-invalid" : "" }
                                                    value={this.state.employee_code} 
                                                    onChange={(e) => this.setState({ employee_code: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Name</Label>
                                                <Input type="text" id="name" 
                                                    required
                                                    className={ this.state.nameHasErrors ? "is-invalid" : "" }
                                                    value={this.state.name} 
                                                    onChange={(e) => this.setState({ name: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Title</Label>
                                                <Input type="text" id="title" 
                                                    required
                                                    className={ this.state.titleHasErrors ? "is-invalid" : "" }
                                                    value={this.state.title} 
                                                    onChange={(e) => this.setState({ title: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Button outline color="success" onClick={() => this.handleAddVolunteer()}>Save changes</Button> &nbsp;
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
        addVolunteer: (code, description, title) => dispatch(addVolunteer(code, description, title)),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddVolunteer)

