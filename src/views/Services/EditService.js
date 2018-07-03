import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { connect } from 'react-redux'
import { getService, updateService, deleteService } from '../../actions/services'
import { getPurposeCodes } from '../../actions/purposeCodes'
import { getVolunteers } from '../../actions/volunteers'
import { getOrganizations } from '../../actions/organizations'
import { getAssessmentAreas } from '../../actions/assessmentAreas'
import { getServiceTypes } from '../../actions/serviceTypes'

var serviceBuffer = {}

var purposeCodeOptions = []
var volunteerOptions = []
var organizationOptions = []
var assessmentAreaOptions = []
var serviceTypeOptions = []

const mapStateToProps = state => {

    purposeCodeOptions = []
    volunteerOptions = []
    organizationOptions = []
    assessmentAreaOptions = []
    serviceTypeOptions = []

    state.purposeCodes.map(purposeCode =>
        purposeCodeOptions.push({value:purposeCode.id, label: purposeCode.description})
    )

    state.volunteers.map(volunteer =>
        volunteerOptions.push({value:volunteer.id, label: volunteer.name})
    )

    state.organizations.map(organization =>
        organizationOptions.push({value:organization.id, label: organization.name})
    )

    state.assessmentAreas.map(assessmentArea =>
        assessmentAreaOptions.push({value:assessmentArea.id, label: assessmentArea.description})
    )

    state.serviceTypes.map(serviceType =>
        serviceTypeOptions.push({value:serviceType.id, label: serviceType.description})
    )

    state.services.map(e =>
        {
            // handle HACK here - action returns an array of one element, to deal with Rails API
            if (e[0] != null)
                serviceBuffer = e[0]
            else
                serviceBuffer = e
        }
)

  return { 
    service: serviceBuffer,
    hasErrored: state.servicesHasErrored,
    isLoading: state.servicesIsLoading
    }
}


class EditService extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = 
        {
            id: "",
            activity_dt: "",
            purpose_code_id: null,
            purpose_code_description: "",
            assessment_area_id: null,
            assessment_area_description: "",
            organization_id: null,
            organization_name: "",
            volunteer_id: null,
            volunteer_name: "",
            volunteer_title: "",
            service_type_id: null,
            total_hours: 0,
            cra_hours: 0,
            activity_dt_hasErrors: null,
            total_hours_hasErrors: null,
            purpose_code_hasErrors: null,
            volunteer_hasErrors: null,
            assessment_area_hasErrors: null,
            organization_hasErrors: null,
            service_type_hasErrors: null,
            purpose_code_borderColor: "#e4e7ea",
            volunteer_borderColor: "#e4e7ea",
            assessment_area_borderColor: "#e4e7ea",
            organization_borderColor: "#e4e7ea",
            service_type_borderColor: "#e4e7ea",
        }

    }

    isValid = () => {
        var v=true
        if (this.state.activity_dt == null)
        {
            this.setState({ activity_dt_hasErrors: true })
            v=false
        } 
        else
        {
            this.setState({ activity_dt_hasErrors: null })
        }

        if (this.state.total_hours <= 0)
        {
            this.setState({ total_hours_hasErrors: true })
            v=false
        }
        else
        {
            this.setState({ total_hours_hasErrors: null })
        }

        if (this.state.purpose_code_id == null)
        {
            this.setState({ purpose_code_hasErrors: true, purpose_code_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ purpose_code_hasErrors: null, purpose_code_borderColor: "#e4e7ea" })
        }

        if (this.state.volunteer_id == null)
        {
            this.setState({ volunteer_hasErrors: true, volunteer_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ volunteer_hasErrors: null, volunteer_borderColor: "#e4e7ea" })
        }

        if (this.state.assessment_area_id == null)
        {
            this.setState({ assessment_area_hasErrors: true, assessment_area_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ assessment_area_hasErrors: null, assessment_area_borderColor: "#e4e7ea" })
        }

        if (this.state.organization_id == null)
        {
            this.setState({ organization_hasErrors: true, organization_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ organization_hasErrors: null, organization_borderColor: "#e4e7ea" })
        }

        if (this.state.service_type_id == null)
        {
            this.setState({ service_type_hasErrors: true, service_type_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ service_type_hasErrors: null, service_type_borderColor: "#e4e7ea" })
        }

        return v
    }

    componentDidMount() 
    {
        this.props.getPurposeCodes()
        this.props.getVolunteers()
        this.props.getOrganizations()
        this.props.getAssessmentAreas()
        this.props.getServiceTypes()
        this.props.getService(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) 
    {
        if (nextProps.service != null)
        {   
            // capture the props and data entry form state BEFORE it fires another render
            this.setState({ id: nextProps.service.id,
                            activity_dt: nextProps.service.activity_dt,
                            purpose_code_id: nextProps.service.purpose_code_id,
                            volunteer_id: nextProps.service.volunteer_id,
                            organization_id: nextProps.service.organization_id,
                            assessment_area_id: nextProps.service.assessment_area_id,
                            service_type_id: nextProps.service.service_type_id,
                            total_hours: nextProps.service.total_hours,
                            cra_hours: nextProps.service.cra_hours,            
            })
        }
    }

    handleUpdateService() 
    {
        if (!this.isValid())
        {
            return
        }

        this.props.updateService(this.props.service.id, this.state.activity_dt, this.state.purpose_code_id.value, this.state.volunteer_id.value, this.state.organization_id.value, this.state.service_type_id.value, this.state.assessment_area_id.value, this.state.total_hours, this.state.cra_hours)

        // navigate back to /services after dispatching the add
        this.props.history.push('/services')
    }

    handleDeleteService() 
    {        
        // perform the delete action
        this.props.deleteService(this.props.service.id)

        // navigate back to /services after dispatching the update
        this.props.history.push('/services')
    }

    handleCancel() 
    {
        this.props.history.push("/services")
    }

    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the service record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving service...</h3>
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
                            <CardHeader><CardTitle> <b> Ediing some Service </b> </CardTitle></CardHeader>
                                <CardBody>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Date of Service</Label>
                                                <Input  type="date" 
                                                    id="activity_dt"
                                                    name="activity_dt" 
                                                    value={this.state.activity_dt} 
                                                    className={ this.state.activity_dt_hasErrors ? "is-invalid" : "" }
                                                    onChange={(e) => this.setState({ activity_dt: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Service Type</Label>
                                                <Select 
                                                    name="serviceTypeSelect"
                                                    value={this.state.service_type_id}
                                                    style={{borderColor:this.state.service_type_borderColor}}
                                                    options={serviceTypeOptions}
                                                    onChange={(value) => this.setState({ service_type_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Purpose</Label>
                                                <Select
                                                    name="purposeCodeSelect"
                                                    value={this.state.purpose_code_id}
                                                    style={{borderColor:this.state.purpose_code_borderColor}}
                                                    options={purposeCodeOptions}
                                                    onChange={(value) => this.setState({ purpose_code_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Assessment Area</Label>
                                                <Select
                                                    name="assessmentAreaSelect"
                                                    value={this.state.assessment_area_id}
                                                    style={{borderColor:this.state.assessment_area_borderColor}}
                                                    options={assessmentAreaOptions}
                                                    onChange={(value) => this.setState({ assessment_area_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Volunteer / Employee</Label>
                                                <Select
                                                    name="volunteerSelect"
                                                    value={this.state.volunteer_id}
                                                    style={{borderColor:this.state.volunteer_borderColor}}
                                                    options={volunteerOptions}
                                                    onChange={(value) => this.setState({ volunteer_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Organization</Label>
                                                <Select
                                                    name="organizationSelect"
                                                    value={this.state.organization_id}
                                                    style={{borderColor:this.state.organization_borderColor}}
                                                    options={organizationOptions}
                                                    onChange={(value) => this.setState({ organization_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">Total Hours</Label>
                                                <Input  type="text" 
                                                    id="total_hours"
                                                    name="total_hours" 
                                                    value={this.state.total_hours} 
                                                    className={ this.state.total_hours_hasErrors ? "is-invalid" : "" }
                                                    onChange={(e) => this.setState({ total_hours: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="name">CRA Eligible Hours</Label>
                                                <Input  type="text" 
                                                    id="cra_hours"
                                                    name="cra_hours" 
                                                    value={this.state.cra_hours} 
                                                    onChange={(e) => this.setState({ cra_hours: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Button outline color="success" onClick={() => this.handleUpdateService()}>Save changes</Button> &nbsp;
                                    <Button outline color="danger" onClick={() => this.handleDeleteService()}>Delete</Button> &nbsp;
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
        getService: (id) => dispatch(getService(id)),
        updateService: (id, activity_dt, purpose_code_id, volunteer_id, organization_id, service_type_id, assessment_area_id, total_hours, cra_hours) => dispatch(updateService(id, activity_dt, purpose_code_id, volunteer_id, organization_id, service_type_id, assessment_area_id, total_hours, cra_hours)),
        deleteService: (id) => dispatch(deleteService(id)),
        getPurposeCodes: () => dispatch(getPurposeCodes()),
        getVolunteers: () => dispatch(getVolunteers()),
        getOrganizations: () => dispatch(getOrganizations()),
        getAssessmentAreas: () => dispatch(getAssessmentAreas()),
        getServiceTypes: () => dispatch(getServiceTypes()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditService)

