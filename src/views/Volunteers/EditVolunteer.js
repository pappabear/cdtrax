import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { connect } from 'react-redux'
import { getVolunteer, deleteVolunteer, updateVolunteer } from '../../actions/volunteers'

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


class EditVolunteer extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = 
        {
            id: "",
            employee_code: "",
            name: "",
            title: "",
            codeHasErrors: null,
            nameHasErrors: null,
            titleHasErrors: null,
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

    componentDidMount() 
    {
        var b = this.props.location.pathname.split("/")
        var id = 0
        for (var i=0; i<b.length; i++)
            id = b[i]
        this.props.getVolunteer(id)
    }

    componentWillReceiveProps(nextProps) 
    {
        // capture the props and data entry form state BEFORE it fires another render
        this.setState({ employee_code: nextProps.volunteer.employee_code, 
                        name: nextProps.volunteer.name,
                        title: nextProps.volunteer.title,
        })
    }

    handleUpdateVolunteer() 
    {
        if (!this.isValid())
        {
            return
        }

        this.props.updateVolunteer(this.props.volunteer.id, this.state.employee_code, this.state.name)

        // navigate back to /volunteers after dispatching the update
        this.props.history.push('/volunteers')
    }

    handleDeleteVolunteer() 
    {
        this.props.deleteVolunteer(this.props.volunteer.id)
        this.props.history.push("/volunteer")
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
                            <CardHeader><CardTitle> <b> {this.props.volunteer.name} </b> </CardTitle></CardHeader>
                                <CardBody>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="employee_code">Volunteer Code</Label>
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

                                    <Button outline color="success" onClick={() => this.handleUpdateVolunteer()}>Save changes</Button> &nbsp;
                                    <Button outline color="danger" onClick={() => this.handleDeleteVolunteer()}>Delete</Button> &nbsp;
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
        getVolunteer: (id) => dispatch(getVolunteer(id)),
        deleteVolunteer: (id) => dispatch(deleteVolunteer(id)),
        updateVolunteer: (id, employee_code, description, title) => dispatch(updateVolunteer(id, employee_code, description, title))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditVolunteer)

