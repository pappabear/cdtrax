import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { connect } from 'react-redux'
import { updateLoan, getLoan, deleteLoan } from '../../actions/loans'
import { getPurposeCodes } from '../../actions/purposeCodes'
import { getOrganizations } from '../../actions/organizations'
import { getLoanTypes } from '../../actions/loanTypes'
import { getCallCodes } from '../../actions/callCodes'
import { getCollateralCodes } from '../../actions/collateralCodes'

var loanBuffer = {}

var purposeCodeOptions = []
var organizationOptions = []
var loanTypeOptions = []
var callCodeOptions = []
var collateralCodeOptions = []

const mapStateToProps = state => {

    purposeCodeOptions = []
    organizationOptions = []
    loanTypeOptions = []
    callCodeOptions = []
    collateralCodeOptions = []

    state.callCodes.map(callCode =>
        callCodeOptions.push({value:callCode.id, label: callCode.description})
    )

    state.collateralCodes.map(collateralCode =>
        collateralCodeOptions.push({value:collateralCode.id, label: collateralCode.description})
    )

    state.purposeCodes.map(purposeCode =>
        purposeCodeOptions.push({value:purposeCode.id, label: purposeCode.description})
    )

    state.organizations.map(organization =>
        organizationOptions.push({value:organization.id, label: organization.name})
    )

    state.loanTypes.map(loanType =>
        loanTypeOptions.push({value:loanType.id, label: loanType.description})
    )

    state.loans.map(e =>
        {
            // handle HACK here - action returns an array of one element, to deal with Rails API
            if (e[0] != null)
                loanBuffer = e[0]
            else
                loanBuffer = e
        })

  return { 
    loan: loanBuffer,
    hasErrored: state.loansHasErrored,
    isLoading: state.loansIsLoading
    }
}


class EditLoan extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = 
        {
            id: "",
            activity_dt: "",
            term: "",
            amount: 0,
            purpose_code_id: null,
            purpose_code_description: "",
            call_code_id: null,
            call_code_description: "",
            collateral_code_id: null,
            collateral_code_description: "",
            organization_id: null,
            organization_name: "",
            loan_type_id: null,
            is_3rd_party: false,
            is_affiliate: false,
            is_cra_qualified: false,
            activity_dt_hasErrors: null,
            purpose_code_hasErrors: null,
            organization_hasErrors: null,
            loan_type_hasErrors: null,
            call_code_hasErrors: null,
            collateral_codehasErrors: null,
            purpose_code_borderColor: "#e4e7ea",
            organization_borderColor: "#e4e7ea",
            loan_type_borderColor: "#e4e7ea",
            call_code_borderColor: "#e4e7ea",
            collateral_code_borderColor: "#e4e7ea",
            account_number: "", 
            loan_number: "", 
            lien_address: "", 
            lien_city: "", 
            lien_state: "", 
            lien_zip: "", 
            state_code: "", 
            county_code: "", 
            tract: "", 
            msa: ""
        }

    }

    isValid = () => {
        var v=true
        if ((this.state.activity_dt == null) || (this.state.activity_dt === null) || (this.state.activity_dt == ""))
        {
            this.setState({ activity_dt_hasErrors: true })
            v=false
        } 
        else
        {
            this.setState({ activity_dt_hasErrors: null })
        }

        if ((this.state.amount == null) || (this.state.amount === null) || (this.state.amount == "") || (this.state.amount <= 0))
        {
            this.setState({ amount_hasErrors: true })
            v=false
        } 
        else
        {
            this.setState({ amount_hasErrors: null })
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

        if (this.state.call_code_id == null)
        {
            this.setState({ call_code_hasErrors: true, call_code_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ call_code_hasErrors: null, call_code_borderColor: "#e4e7ea" })
        }

        if (this.state.collateral_code_id == null)
        {
            this.setState({ collateral_code_hasErrors: true, collateral_code_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ collateral_code_hasErrors: null, collateral_code_borderColor: "#e4e7ea" })
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

        if (this.state.loan_type_id == null)
        {
            this.setState({ loan_type_hasErrors: true, loan_type_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ loan_type_hasErrors: null, loan_type_borderColor: "#e4e7ea" })
        }

        return v
    }

    componentDidMount() 
    {
        this.props.getPurposeCodes()
        this.props.getOrganizations()
        this.props.getLoanTypes()
        this.props.getCallCodes()
        this.props.getCollateralCodes()
        this.props.getLoan(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) 
    {

        console.log(nextProps)

        if (nextProps.loan != null)
        {   
            // capture the props and data entry form state BEFORE it fires another render
            this.setState({ id: nextProps.loan.id,
                            activity_dt: nextProps.loan.activity_dt,
                            purpose_code_id: nextProps.loan.purpose_code_id,
                            call_code_id: nextProps.loan.call_code_id,
                            collateral_code_id: nextProps.loan.collateral_code_id,
                            organization_id: nextProps.loan.organization_id,
                            loan_type_id: nextProps.loan.loan_type_id,
                            term: nextProps.loan.term,
                            amount: nextProps.loan.amount,
                            is_3rd_party: nextProps.loan.is_3rd_party,
                            is_affiliate: nextProps.loan.is_affiliate,
                            is_cra_qualified: nextProps.loan.is_cra_qualified,
                            account_number: nextProps.loan.account_number, 
                            loan_number: nextProps.loan.loan_number, 
                            lien_address: nextProps.loan.lien_address, 
                            lien_city: nextProps.loan.lien_city, 
                            lien_state: nextProps.loan.lien_state, 
                            lien_zip: nextProps.loan.lien_zip, 
                            state_code: nextProps.loan.state_code, 
                            county_code: nextProps.loan.county_code, 
                            tract: nextProps.loan.tract, 
                            msa: nextProps.loan.msa
                
            })
        }
    }

    handleUpdateLoan() 
    {
        if (!this.isValid())
        {
            return
        }

        this.props.updateLoan(this.props.loan.id, this.state.activity_dt, this.state.purpose_code_id.value, this.state.organization_id.value, this.state.account_number, this.state.loan_number, this.state.loan_type_id.value, this.state.call_code_id.value, this.state.collateral_code_id.value, this.state.lien_address, this.state.lien_city, this.state.lien_state, this.state.lien_zip, this.state.amount, this.state.term, this.state.is_cra_qualified, this.state.is_3rd_party, this.state.is_affiliate, this.state.state_code, this.state.county_code, this.state.tract, this.state.msa)

        // navigate back to /loans after dispatching the add
        this.props.history.push('/loans')
    }

    handleDeleteLoan() 
    {        
        // perform the delete action
        this.props.deleteLoan(this.props.loan.id)

        // navigate back to /loans after dispatching the update
        this.props.history.push('/loans')
    }

    handleCancel() 
    {
        this.props.history.push("/loans")
    }

    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the loan record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving loan...</h3>
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
                            <CardHeader><CardTitle> <b> Editing Loan on {this.props.loan.activity_dt_formatted}  (ID={this.props.match.params.id}) </b> </CardTitle></CardHeader>
                                <CardBody>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="date">Date of Loan</Label>
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
                                                <Label htmlFor="loanTypeSelect">Loan Type</Label>
                                                <Select 
                                                    name="loanTypeSelect"
                                                    value={this.state.loan_type_id}
                                                    style={{borderColor:this.state.loan_type_borderColor}}
                                                    options={loanTypeOptions}
                                                    onChange={(value) => this.setState({ loan_type_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="purposeCodeSelect">Purpose</Label>
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
                                                <Label htmlFor="callCodeSelect">Call Code</Label>
                                                <Select
                                                    name="callCodeSelect"
                                                    value={this.state.call_code_id}
                                                    style={{borderColor:this.state.call_code_borderColor}}
                                                    options={callCodeOptions}
                                                    onChange={(value) => this.setState({ call_code_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="collateralCodeSelect">Collateral Code</Label>
                                                <Select
                                                    name="collateralCodeSelect"
                                                    value={this.state.collateral_code_id}
                                                    style={{borderColor:this.state.collateral_code_borderColor}}
                                                    options={collateralCodeOptions}
                                                    onChange={(value) => this.setState({ collateral_code_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="organizationSelect">Organization</Label>
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
                                                <Label htmlFor="account_number">Account Number</Label>
                                                <Input  type="text" 
                                                    id="account_number"
                                                    name="account_number" 
                                                    value={this.state.account_number} 
                                                    className={ this.state.account_number_hasErrors ? "is-invalid" : "" }
                                                    onChange={(e) => this.setState({ account_number: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="loan_number">Loan Number</Label>
                                                <Input  type="text" 
                                                    id="loan_number"
                                                    name="loan_number" 
                                                    value={this.state.loan_number} 
                                                    className={ this.state.loan_number_hasErrors ? "is-invalid" : "" }
                                                    onChange={(e) => this.setState({ loan_number: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="amount">Amount</Label>
                                                <Input  type="text" 
                                                    id="amount"
                                                    name="amount" 
                                                    value={this.state.amount} 
                                                    className={ this.state.amount_hasErrors ? "is-invalid" : "" }
                                                    onChange={(e) => this.setState({ amount: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                                    <Row>
                                                        <Label sm={2}>Lien Address</Label>
                                                        <Col xs={12} sm={7}>
                                                            <FormGroup >
                                                                <Input  type="text" 
                                                                        id="address"
                                                                        name="address" 
                                                                        value={this.state.lien_address}
                                                                        onChange={(e) => this.setState({ lien_address: e.target.value})}    
                                                                    />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Label sm={2}></Label>
                                                        <Col xs={12} sm={5}>
                                                            <FormGroup >
                                                                <Input  type="text" 
                                                                        id="city"
                                                                        name="city" 
                                                                        value={this.state.lien_city}
                                                                        onChange={(e) => this.setState({ lien_city: e.target.value})}    
                                                                    />
                                                            </FormGroup>
                                                        </Col>

                                                        <Col xs={12} sm={2}>
                                                            <FormGroup >
                                                                <Input  type="text" 
                                                                        id="state"
                                                                        name="state" 
                                                                        value={this.state.lien_state}
                                                                        onChange={(e) => this.setState({ lien_state: e.target.value})}    
                                                                    />
                                                            </FormGroup>
                                                        </Col>

                                                        <Col xs={12} sm={2}>
                                                            <FormGroup >
                                                                <Input  type="text" 
                                                                        id="zip"
                                                                        name="zip" 
                                                                        value={this.state.lien_zip}
                                                                        onChange={(e) => this.setState({ lien_zip: e.target.value})}    
                                                                    />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Label sm={2}>Term</Label>
                                                        <Col xs={12} sm={2}>
                                                            <FormGroup >
                                                                <Input  type="text" 
                                                                        id="term"
                                                                        name="term" 
                                                                        value={this.state.term}
                                                                        onChange={(e) => this.setState({ term: e.target.value})}    
                                                                    />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Label sm={2}>
                                                            &nbsp;
                                                        </Label>
                                                        <Col xs={12} sm={10} >
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input type="checkbox" 
                                                                        checked={this.state.is_cra_qualified} 
                                                                        name="is_cra_qualified"
                                                                        onChange={() => this.setState({ is_cra_qualified: !this.state.is_cra_qualified})} />
                                                                    <span className="form-check-sign"></span>
                                                                    CRA Qualified
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Label sm={2}>
                                                            &nbsp;
                                                        </Label>
                                                        <Col xs={12} sm={10} >
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input type="checkbox" 
                                                                        checked={this.state.is_3rd_party} 
                                                                        name="is_3rd_party"
                                                                        onChange={() => this.setState({ is_3rd_party: !this.state.is_3rd_party})} />
                                                                    <span className="form-check-sign"></span>
                                                                    3rd Party
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Label sm={2}>
                                                            &nbsp;
                                                        </Label>
                                                        <Col xs={12} sm={10} >
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input type="checkbox" 
                                                                        checked={this.state.is_affiliate}                                                                    
                                                                        name="is_affiliate"
                                                                        onChange={() => this.setState({ is_affiliate: !this.state.is_affiliate})} />
                                                                    <span className="form-check-sign"></span>
                                                                    Affiliate
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <h5>Geocoding</h5>
                                                    <hr />

                                                    <Row>
                                                        <Label sm={2}>State Code</Label>
                                                        <Col xs={12} sm={2}>
                                                            <FormGroup >
                                                                <Input  type="text" 
                                                                        id="state_code"
                                                                        name="state_code" 
                                                                        value={this.state.state_code}
                                                                        onChange={(e) => this.setState({ state_code: e.target.value})}    
                                                                    />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Label sm={2}>County Code</Label>
                                                        <Col xs={12} sm={2}>
                                                            <FormGroup >
                                                                <Input  type="text" 
                                                                        id="county_code"
                                                                        name="county_code" 
                                                                        value={this.state.county_code}
                                                                        onChange={(e) => this.setState({ county_code: e.target.value})}    
                                                                    />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Label sm={2}>Tract</Label>
                                                        <Col xs={12} sm={2}>
                                                            <FormGroup >
                                                                <Input  type="text" 
                                                                        id="tract"
                                                                        name="tract" 
                                                                        value={this.state.tract}
                                                                        onChange={(e) => this.setState({ tract: e.target.value})}    
                                                                    />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Label sm={2}>MSA</Label>
                                                        <Col xs={12} sm={2}>
                                                            <FormGroup >
                                                                <Input  type="text" 
                                                                        id="msa"
                                                                        name="msa" 
                                                                        value={this.state.msa}
                                                                        onChange={(e) => this.setState({ msa: e.target.value})}    
                                                                    />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                    <Button outline color="success" onClick={() => this.handleUpdateLoan()}>Save changes</Button> &nbsp;
                                    <Button outline color="danger" onClick={() => this.handleDeleteLoan()}>Delete</Button> &nbsp;
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
        getLoan: (id) => dispatch(getLoan(id)),
        updateLoan: (id, activity_dt, purpose_code_id, organization_id, account_number, loan_number, loan_type_id, call_code_id, collateral_code_id, lien_address, lien_city, lien_state, lien_zip, amount, term, is_cra_qualified, is_3rd_party, is_affiliate, state_code, county_code, tract, msa) => dispatch(updateLoan(id, activity_dt, purpose_code_id, organization_id, account_number, loan_number, loan_type_id, call_code_id, collateral_code_id, lien_address, lien_city, lien_state, lien_zip, amount, term, is_cra_qualified, is_3rd_party, is_affiliate, state_code, county_code, tract, msa)),
        deleteLoan: (id) => dispatch(deleteLoan(id)),
        getPurposeCodes: () => dispatch(getPurposeCodes()),
        getCallCodes: () => dispatch(getCallCodes()),
        getCollateralCodes: () => dispatch(getCollateralCodes()),
        getLoanTypes: () => dispatch(getLoanTypes()),
        getOrganizations: () => dispatch(getOrganizations()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditLoan)

