import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input, Nav, NavItem, NavLink,TabContent, TabPane} from 'reactstrap'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import classnames from 'classnames'

import { connect } from 'react-redux'
import { addActivity } from '../../actions/activities'
import { getPurposeCodes } from '../../actions/purposeCodes'
import { getEmployees } from '../../actions/employees'
import { getEntities } from '../../actions/entities'
import { getAssessmentAreas } from '../../actions/assessmentAreas'
import { getDisasterTypes } from '../../actions/disasterTypes'
import { getDeclarationTypes } from '../../actions/declarationTypes'
import { getAssistanceTypes } from '../../actions/assistanceTypes'
import { getServiceTypes } from '../../actions/serviceTypes'
import { getInvestmentTypes } from '../../actions/investmentTypes'
import { getLoanTypes } from '../../actions/loanTypes'
import { getCallCodes } from '../../actions/callCodes'
import { getCollateralCodes } from '../../actions/collateralCodes'
import { getActivityTypes } from '../../actions/activityTypes'

import request from 'superagent'

var purposeCodeOptions = []
var employeeOptions = []
var entityOptions = []
var assessmentAreaOptions = []
var disasterTypeOptions = []
var declarationTypeOptions = []
var assistanceTypeOptions = []
var serviceTypeOptions = []
var investmentTypeOptions = []
var loanTypeOptions = []
var callCodeOptions = []
var collateralCodeOptions = []
var activityTypeOptions = []

var activityBuffer = {}

const mapStateToProps = state => {

    purposeCodeOptions = []
    activityTypeOptions = []
    employeeOptions = []
    entityOptions = []
    assessmentAreaOptions = []
    disasterTypeOptions = []
    declarationTypeOptions = []
    assistanceTypeOptions = []
    serviceTypeOptions = []
    investmentTypeOptions = []
    loanTypeOptions = []
    callCodeOptions = []
    collateralCodeOptions = []

    state.activityTypes.map(activityType =>
        activityTypeOptions.push({value:activityType.id, label: activityType.description})
    )

    state.purposeCodes.map(purposeCode =>
        purposeCodeOptions.push({value:purposeCode.id, label: purposeCode.description})
    )

    state.employees.map(employee =>
        employeeOptions.push({value:employee.id, label: employee.name})
    )

    state.entities.map(entity =>
        entityOptions.push({value:entity.id, label: entity.name})
    )

    state.assessmentAreas.map(assessmentArea =>
        assessmentAreaOptions.push({value:assessmentArea.id, label: assessmentArea.description})
    )

    state.disasterTypes.map(disasterType =>
        disasterTypeOptions.push({value:disasterType.id, label: disasterType.description})
    )

    state.declarationTypes.map(declarationType =>
        declarationTypeOptions.push({value:declarationType.id, label: declarationType.description})
    )

    state.assistanceTypes.map(assistanceType =>
        assistanceTypeOptions.push({value:assistanceType.id, label: assistanceType.description})
    )

    state.assistanceTypes.map(assistanceType =>
        assistanceTypeOptions.push({value:assistanceType.id, label: assistanceType.description})
    )

    state.serviceTypes.map(serviceType =>
        serviceTypeOptions.push({value:serviceType.id, label: serviceType.description})
    )

    state.investmentTypes.map(investmentType =>
        investmentTypeOptions.push({value:investmentType.id, label: investmentType.description})
    )

    state.loanTypes.map(loanType =>
        loanTypeOptions.push({value:loanType.id, label: loanType.description})
    )

    state.callCodes.map(callCode =>
        callCodeOptions.push({value:callCode.id, label: callCode.description})
    )

    state.collateralCodes.map(collateralCode =>
        collateralCodeOptions.push({value:collateralCode.id, label: collateralCode.description})
    )

    state.activities.map(e =>
        activityBuffer = e
)

  return { 
    activity: activityBuffer,
    hasErrored: state.activitiesHasErrored,
    isLoading: state.activitiesIsLoading
    }
}


class AddActivity extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = 
        {
            id: "",
            activity_dt: "",
            activity_type_id: null,
            activity_type_description: "",
            purpose_code_id: null,
            employee_id: null,
            employee_title: "",
            entity_name: "",
            entity_id: null,
            entity_address: "",
            entity_city: "",
            entity_state: "",
            entity_zip: "",
            contact_name: "",
            assessment_area_id: null,
            disaster_number: "",
            disaster_start_dt: null,
            disaster_end_dt: null,
            disaster_type_id: null,
            declaration_type_id: null,
            assistance_type_id: null,
            related_service_flag: false,
            related_investment_flag: false,
            related_loan_flag: false,
            lmi_percentage: null,
            is_benefit_statewide: false,
            is_benefit_investment: false,
            is_benefit_empowerment: false,
            is_benefit_distressed: false,
            is_benefit_underserved: false,
            is_benefit_disaster: false,
            notes: "",
            service_type_id: null,
            hours: null,
            cra_hours: null,
            is_financial_expertise: false,
            investment_type_id: null,
            cusip_number: "",
            maturity_dt: null,
            original_amount: null,
            book_value: null,
            unfunded_committment: null,
            percent_of_entity_funding: null,
            account_number: "",
            loan_number: "",
            loan_type_id: null,
            call_code_id: null,
            collateral_code_id: null,
            address: "",
            city: "",
            state: "",
            zip: "",
            term: null,
            is_cra_qualified: false,
            is_3rd_party: false,
            is_affiliate: false,
            state_code: "",
            county_code: "",
            tract: "",
            msa: "",
            activity_typeHasErrors: null,
            activity_dtHasErrors: null,
            contact_nameHasErrors: null,
            entity_nameHasErrors: null,
            activeTab: '1',
            }

            this.handleEmployeeChange = this.handleEmployeeChange.bind(this)
            this.handleEntityChange = this.handleEntityChange.bind(this)
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }
    
    isValid = () => {
        var v=true
        if (this.state.activity_type === "")
        {
            this.setState({ activity_typeHasErrors: true })
            v=false
        }
        if (this.state.activity_dt === "")
        {
            this.setState({ activity_dtHasErrors: true })
            v=false
        }
        if (this.state.contact_name === "")
        {
            this.setState({ contact_nameHasErrors: true })
            v=false
        }
        if (this.state.entity_id === null)
        {
            this.setState({ entity_nameHasErrors: true })
            v=false
        }
        return v
    }

    componentDidMount() 
    {
        this.props.getPurposeCodes()
        this.props.getActivityTypes()
        this.props.getEmployees()
        this.props.getEntities()
        this.props.getAssessmentAreas()
        this.props.getDisasterTypes()
        this.props.getDeclarationTypes()
        this.props.getAssistanceTypes()
        this.props.getServiceTypes()
        this.props.getInvestmentTypes()
        this.props.getLoanTypes()
        this.props.getCallCodes()
        this.props.getCollateralCodes()
    }

    componentWillReceiveProps(nextProps) 
    {
        // capture the props and data entry form state BEFORE it fires another render
        this.setState({ id: nextProps.activity.id,
                        activity_type_id: nextProps.activity.activity_type_id, 
                        activity_type_description: nextProps.activity.activity_type_description, 
                        activity_dt: nextProps.activity.activity_dt_formatted,
                        purpose_code_id: nextProps.activity.purpose_code_id,
                        employee_id: nextProps.activity.employee_id,
                        employee_title: nextProps.activity.employee_title,
                        entity_id: nextProps.activity.entity_id,
                        contact_name: nextProps.activity.contact_name,
                        entity_name: nextProps.activity.entity_name,
                        entity_address: nextProps.activity.entity_address,
                        entity_city: nextProps.activity.entity_city,
                        entity_state: nextProps.activity.entity_state,
                        entity_zip: nextProps.activity.entity_zip,
                        assessment_area_id: nextProps.activity.assessment_area_id,
                        disaster_number: nextProps.activity.disaster_number,
                        disaster_start_dt: nextProps.activity.disaster_start_dt_formatted,
                        disaster_end_dt: nextProps.activity.disaster_end_dt_formatted,
                        disaster_type_id: nextProps.activity.disaster_type_id,
                        declaration_type_id: nextProps.activity.declaration_type_id,
                        assistance_type_id: nextProps.activity.assistance_type_id,
                        related_service_flag: nextProps.activity.related_service_flag,
                        related_investment_flag: nextProps.activity.related_investment_flag,
                        related_loan_flag: nextProps.activity.related_loan_flag,
                        lmi_percentage: nextProps.activity.lmi_percentage,
                        is_benefit_statewide: nextProps.activity.is_benefit_statewide,
                        is_benefit_investment: nextProps.activity.is_benefit_investment,
                        is_benefit_empowerment: nextProps.activity.is_benefit_empowerment,
                        is_benefit_distressed: nextProps.activity.is_benefit_distressed,
                        is_benefit_underserved: nextProps.activity.is_benefit_underserved,
                        is_benefit_disaster: nextProps.activity.is_benefit_disaster,
                        notes: nextProps.activity.notes,
                        service_type_id: nextProps.activity.service_type_id,
                        hours: nextProps.activity.hours,
                        cra_hours: nextProps.activity.cra_hours,
                        is_financial_expertise: nextProps.activity.is_financial_expertise,
                        investment_type_id: nextProps.activity.investment_type_id,
                        cusip_number: nextProps.activity.cusip_number,
                        maturity_dt: nextProps.activity.maturity_dt_formatted,
                        original_amount: nextProps.activity.original_amount,
                        book_value: nextProps.activity.book_value,
                        unfunded_committment: nextProps.activity.unfunded_committment,
                        percent_of_entity_funding: nextProps.activity.percent_of_entity_funding,
                        account_number: nextProps.activity.account_number,
                        loan_number: nextProps.activity.loan_number,
                        loan_type_id: nextProps.activity.loan_type_id,
                        call_code_id: nextProps.activity.call_code_id,
                        collateral_code_id: nextProps.activity.collateral_code_id,
                        address: nextProps.activity.address,
                        city: nextProps.activity.city,
                        state: nextProps.activity.state,
                        zip: nextProps.activity.zip,
                        term: nextProps.activity.term,
                        is_cra_qualified: nextProps.activity.is_cra_qualified,
                        is_3rd_party: nextProps.activity.is_3rd_party,
                        is_affiliate: nextProps.activity.is_affiliate,
                        state_code: nextProps.activity.state_code,
                        county_code: nextProps.activity.county_code,
                        tract: nextProps.activity.tract,
                        msa: nextProps.activity.msa
            
        })
    }

    handleChange(event) 
    {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleAddActivity() 
    {

        if (!this.isValid())
        {
            return
        }
    
        // these values are not required so the dropdown may be null
        var purposeCodeValue = this.state.purpose_code_id != null ? this.state.purpose_code_id.value : null
        var employeeValue = this.state.employee_id != null ? this.state.employee_id.value : null
        var entityValue = this.state.entity_id != null ? this.state.entity_id.value : null
        var assessmentAreaValue = this.state.assessment_area_id != null ? this.state.assessment_area_id.value : null
        var disasterTypeValue = this.state.disaster_type_id != null ? this.state.disaster_type_id.value : null
        var activityTypeValue = this.state.activity_type_id != null ? this.state.activity_type_id.value : null
        var declarationTypeValue = this.state.declaration_type_id != null ? this.state.declaration_type_id.value : null
        var assistanceTypeValue = this.state.assistance_type_id != null ? this.state.assistance_type_id.value : null
        var serviceTypeValue = this.state.service_type_id != null ? this.state.service_type_id.value : null
        var investmentTypeValue = this.state.investment_type_id != null ? this.state.investment_type_id.value : null
        var loanTypeValue = this.state.loan_type_id != null ? this.state.loan_type_id.value : null
        var callCodeValue = this.state.call_code_id != null ? this.state.call_code_id.value : null
        var collateralCodeValue = this.state.collateral_code_id != null ? this.state.collateral_code_id.value : null                
        
        this.props.addActivity(this.state.activity_dt, //activityDateValue,
                                activityTypeValue,
                                purposeCodeValue,
                                employeeValue,
                                entityValue,
                                this.state.contact_name,
                                assessmentAreaValue,
                                this.state.disaster_number,
                                this.state.disaster_start_dt,
                                this.state.disaster_end_dt, //disasterEndDateValue,
                                disasterTypeValue,
                                declarationTypeValue,
                                assistanceTypeValue,
                                this.state.related_service_flag,
                                this.state.related_investment_flag,
                                this.state.related_loan_flag,
                                this.state.lmi_percentage,
                                this.state.is_benefit_statewide,
                                this.state.is_benefit_investment,
                                this.state.is_benefit_empowerment,
                                this.state.is_benefit_distressed,
                                this.state.is_benefit_underserved,
                                this.state.is_benefit_disaster,
                                this.state.notes,
                                serviceTypeValue,
                                this.state.hours,
                                this.state.cra_hours,
                                this.state.is_financial_expertise,
                                investmentTypeValue,
                                this.state.cusip_number,
                                this.state.maturity_dt, //maturityDateValue,
                                this.state.original_amount,
                                this.state.book_value,
                                this.state.unfunded_committment,
                                this.state.percent_of_entity_funding,
                                this.state.account_number,
                                this.state.loan_number,
                                loanTypeValue,
                                callCodeValue,
                                collateralCodeValue,
                                this.state.address,
                                this.state.city,
                                this.state.state,
                                this.state.zip,
                                this.state.term,
                                this.state.is_cra_qualified,
                                this.state.is_3rd_party,
                                this.state.is_affiliate,
                                this.state.state_code,
                                this.state.county_code,
                                this.state.tract,
                                this.state.msa
                                )    

        // navigate back to /activities after dispatching the update
        this.props.history.push('/activities')
        }

    handleCancel() 
    {
        this.props.history.push("/activities")
    }

    /*
    reformatDate(mmddyyyy)
    {
        if (mmddyyyy == null)
            return null
        
        var s = mmddyyyy.split("/")
        var o = s[2] + "-" + s[0] + "-" + s[1]
        return o
    }
    */

    handleEmployeeChange(event)
    {
        this.setState({ employee_id: event.value })

        // hack? ajax call to the API to get additional display info
		request
            .get('http://localhost:3001/employees/' + event.value)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
        
                const employee = JSON.parse(res.text)
                this.setState({ employee_title: employee.title })
            })
    }

    handleEntityChange(event)
    {
        this.setState({ entity_id: event.value })

        // hack? ajax call to the API to get additional display info
		request
            .get('http://localhost:3001/entities/' + event.value)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
        
                const entity = JSON.parse(res.text)
                console.log(entity)
                this.setState({ entity_address: entity.address,
                                entity_city: entity.city,
                                entity_state: entity.state,
                                entity_zip: entity.zip,
                })
            })
    }


    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the activity record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving activity...</h3>
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
                            <CardHeader><CardTitle> <b> Adding new Activity </b> </CardTitle></CardHeader>
                                <CardBody>

                                    <Row>
                                        
                                        <Col xs={12} md={3}>
                                            <Label sm={12}>Date</Label>
                                            <FormGroup>
                                                <Input  type="date" 
                                                    id="activity_dt"
                                                    name="activity_dt" 
                                                    value={this.state.activity_dt} 
                                                    className={ this.state.activity_dtHasErrors ? "is-invalid" : "" }
                                                    onChange={(e) => this.setState({ activity_dt: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>

                                        <Col xs={12} md={3}>
                                            <Label sm={12}>Type</Label>
                                            <FormGroup >
                                                <Select
                                                    className="primary"
                                                    name="activityTypeSelect"
                                                    value={this.state.activity_type_id}
                                                    options={activityTypeOptions}
                                                    onChange={(value) => this.setState({ activity_type_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>

                                        <Col xs={12} md={4}>
                                            <Label sm={12}>Purpose</Label>
                                            <FormGroup >
                                                <Select
                                                    className="primary"
                                                    name="purposeCodeSelect"
                                                    value={this.state.purpose_code_id}
                                                    options={purposeCodeOptions}
                                                    onChange={(value) => this.setState({ purpose_code_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <hr />


                                    <Row>
                                        <Col>

                                            <Nav tabs>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '1' })}
                                                    onClick={() => { this.toggle('1'); }} >
                                                    Responsibility
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '2' })}
                                                    onClick={() => { this.toggle('2'); }}>
                                                    Organization
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '3' })}
                                                    onClick={() => { this.toggle('3'); }}>
                                                    Impact
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '4' })}
                                                    onClick={() => { this.toggle('4'); }}>
                                                    Service
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '5' })}
                                                    onClick={() => { this.toggle('5'); }}>
                                                    Investment
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === '6' })}
                                                    onClick={() => { this.toggle('6'); }}>
                                                    Loan
                                                </NavLink>
                                            </NavItem>
                                            </Nav>

                                            <TabContent activeTab={this.state.activeTab}>
                                                <TabPane tabId="1">
                                                    <Row>
                                                        <Label sm={2}>Employee</Label>
                                                        <Col xs={12} md={6}>
                                                            <FormGroup >
                                                                <Select
                                                                    name="employeeSelect"
                                                                    value={this.state.employee_id}
                                                                    options={employeeOptions}
                                                                    //onChange={(value) => this.setState({ employee_id: value})}
                                                                    onChange={this.handleEmployeeChange}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Label sm={2}>Title</Label>
                                                        <Col xs={12} md={6}>
                                                            <p className="form-control-static">{this.state.employee_title}</p>
                                                        </Col>                                                    
                                                    </Row>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <Row>
                                                        <Label sm={2}>Entity</Label>
                                                        <Col xs={12} md={6}>
                                                            <FormGroup >
                                                                <Select
                                                                    name="entitySelect"
                                                                    value={this.state.entity_id}
                                                                    options={entityOptions}
                                                                    className={ this.state.entity_nameHasErrors ? "is-invalid" : "" }
                                                                    //onChange={(value) => this.setState({ entity_id: value})}
                                                                    onChange={this.handleEntityChange}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Label sm={2}>Address</Label>
                                                        <Col xs={12} md={6}>
                                                            <p className="form-control-static">{this.state.entity_address} {this.state.entity_city} {this.state.entity_state} {this.state.entity_zip}</p>
                                                        </Col>                                                    
                                                    </Row>
                                                    <Row>
                                                        <Label sm={2}>Contact</Label>
                                                        <Col xs={12} md={6}>
                                                            <FormGroup>
                                                                <Input  type="text" 
                                                                    id="contact_name"
                                                                    name="contact_name" 
                                                                    value={this.state.contact_name} 
                                                                    className={ this.state.contact_nameHasErrors ? "is-invalid" : "" }
                                                                    onChange={(e) => this.setState({ contact_name: e.target.value})} 
                                                                    />
                                                            </FormGroup>
                                                        </Col>                                                    
                                                    </Row>
                                                </TabPane>

                                                <TabPane tabId="3">
                                                    Impact
                                                </TabPane>
                                                <TabPane tabId="4">
                                                    Service
                                                </TabPane>
                                                <TabPane tabId="5">
                                                    Investment
                                                </TabPane>
                                                <TabPane tabId="6">
                                                    Loan
                                                </TabPane>
                                            </TabContent>

                                        </Col>
                                    </Row>

                                    <p>&nbsp;</p>

                                    <Button outline color="success" onClick={() => this.handleAddActivity()}>Save changes</Button> &nbsp;
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

        addActivity: (activity_dt, activity_type_id, purpose_code_id,
                        employee_id, entity_id, 
                        contact_name, assessment_area_id, disaster_number, 
                        disaster_start_dt, disaster_end_dt, 
                        disaster_type_id, declaration_type_id, assistance_type_id, 
                        related_service_flag, related_investment_flag, 
                        related_loan_flag, lmi_percentage, is_benefit_statewide, 
                        is_benefit_investment, is_benefit_empowerment, is_benefit_distressed, 
                        is_benefit_underserved, is_benefit_disaster, notes, 
                        service_type_id, hours, cra_hours, is_financial_expertise, 
                        investment_type_id, cusip_number, 
                        maturity_dt, original_amount, book_value, unfunded_committment, 
                        percent_of_entity_funding, account_number, 
                        loan_number, loan_type_id, call_code_id, collateral_code_id, 
                        address, city, state, zip, term, 
                        is_cra_qualified, is_3rd_party, is_affiliate, state_code, county_code, 
                        tract, msa
            ) => dispatch(addActivity( activity_dt, activity_type_id, purpose_code_id,
                        employee_id, entity_id, 
                        contact_name, assessment_area_id, disaster_number, 
                        disaster_start_dt, disaster_end_dt, 
                        disaster_type_id, declaration_type_id, assistance_type_id, 
                        related_service_flag, related_investment_flag, 
                        related_loan_flag, lmi_percentage, is_benefit_statewide, 
                        is_benefit_investment, is_benefit_empowerment, is_benefit_distressed, 
                        is_benefit_underserved, is_benefit_disaster, notes, 
                        service_type_id, hours, cra_hours, is_financial_expertise, 
                        investment_type_id, cusip_number, 
                        maturity_dt, original_amount, book_value, unfunded_committment, 
                        percent_of_entity_funding, account_number, 
                        loan_number, loan_type_id, call_code_id, collateral_code_id, 
                        address, city, state, zip, term, 
                        is_cra_qualified, is_3rd_party, is_affiliate, state_code, county_code, 
                        tract, msa)),

        getPurposeCodes: () => dispatch(getPurposeCodes()),
        getActivityTypes: () => dispatch(getActivityTypes()),
        getEmployees: () => dispatch(getEmployees()),
        getEntities: () => dispatch(getEntities()),
        getAssessmentAreas: () => dispatch(getAssessmentAreas()),
        getDisasterTypes: () => dispatch(getDisasterTypes()),
        getDeclarationTypes: () => dispatch(getDeclarationTypes()),
        getAssistanceTypes: () => dispatch(getAssistanceTypes()),
        getServiceTypes: () => dispatch(getServiceTypes()),
        getInvestmentTypes: () => dispatch(getInvestmentTypes()),
        getLoanTypes: () => dispatch(getLoanTypes()),
        getCallCodes: () => dispatch(getCallCodes()),
        getCollateralCodes: () => dispatch(getCollateralCodes()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddActivity)

