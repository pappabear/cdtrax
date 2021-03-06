import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { connect } from 'react-redux'
import { addInvestment } from '../../actions/investments'
import { getPurposeCodes } from '../../actions/purposeCodes'
import { getOrganizations } from '../../actions/organizations'
import { getInvestmentTypes } from '../../actions/investmentTypes'

import {TextMask, InputAdapter, SpanAdapter} from 'react-text-mask-hoc'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
const dollarMask = createNumberMask({
    prefix: '$ ',
    suffix: '',
    thousandsSeparatorSymbol: ',',
    integerLimit: 10,
    allowDecimal: false,
    decimalSymbol: ',',
    decimalLimit: 0,
})

var investmentBuffer = {}

var purposeCodeOptions = []
var organizationOptions = []
var investmentTypeOptions = []

const mapStateToProps = state => {

    purposeCodeOptions = []
    organizationOptions = []
    investmentTypeOptions = []

    state.purposeCodes.map(purposeCode =>
        purposeCodeOptions.push({value:purposeCode.id, label: purposeCode.description})
    )

    state.organizations.map(organization =>
        organizationOptions.push({value:organization.id, label: organization.name})
    )

    state.investmentTypes.map(investmentType =>
        investmentTypeOptions.push({value:investmentType.id, label: investmentType.description})
    )

  return { 
    investment: investmentBuffer,
    hasErrored: state.investmentsHasErrored,
    isLoading: state.investmentsIsLoading
    }
}


class AddInvestment extends Component 
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
            organization_id: null,
            organization_name: "",
            investment_type_id: null,
            investment_type_description: "",
            cusip_number: "",
            maturity_dt: "",
            original_amount:0,
            book_value:0,
            unfunded_committment: "",
            percent_of_entity_funding: "",
            is_cra_qualified: false,
            activity_dt_hasErrors: null,
            original_amount_hasErrors: null,
            purpose_code_hasErrors: null,
            organization_hasErrors: null,
            investment_type_hasErrors: null,
            purpose_code_borderColor: "#e4e7ea",
            organization_borderColor: "#e4e7ea",
            investment_type_borderColor: "#e4e7ea",
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

        if ((this.state.original_amount == null) || (this.state.original_amount === null) || (this.state.original_amount == "") || (this.state.original_amount <= 0))
        {
            this.setState({ original_amount_hasErrors: true })
            v=false
        } 
        else
        {
            this.setState({ original_amount_hasErrors: null })
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

        if (this.state.organization_id == null)
        {
            this.setState({ organization_hasErrors: true, organization_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ organization_hasErrors: null, organization_borderColor: "#e4e7ea" })
        }

        if (this.state.investment_type_id == null)
        {
            this.setState({ investment_type_hasErrors: true, investment_type_borderColor: "#f86c6b" })
            v=false
        }
        else
        {
            this.setState({ investment_type_hasErrors: null, investment_type_borderColor: "#e4e7ea" })
        }

        return v
    }

    componentDidMount() 
    {
        this.props.getPurposeCodes()
        this.props.getOrganizations()
        this.props.getInvestmentTypes()
    }

    handleAddInvestment() 
    {
        if (!this.isValid())
        {
            return
        }

        var originalAmountBufferString = this.state.original_amount.toString().replace('$','').replace(' ', '').replace(',','')
        var originalAmountBuffer = parseInt(originalAmountBufferString)

        var bookValueBufferString = this.state.book_value.toString().replace('$','').replace(' ', '').replace(',','')
        var bookValueBuffer = parseInt(bookValueBufferString)

        this.props.addInvestment(this.state.activity_dt, this.state.purpose_code_id.value, this.state.organization_id.value, this.state.investment_type_id.value, this.state.cusip_number, this.state.maturity_dt, originalAmountBuffer, bookValueBuffer, this.state.unfunded_committment, this.state.percent_of_entity_funding, this.state.is_cra_qualified)

        // navigate back to /investments after dispatching the add
        this.props.history.push('/investments')
    }

    handleCancel() 
    {
        this.props.history.push("/investments")
    }

    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the investment record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving investment...</h3>
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
                            <CardHeader><CardTitle> <b> Adding new Investment </b> </CardTitle></CardHeader>
                                <CardBody>

                                    <Row>
                                        <Col xs="4">
                                            <FormGroup>
                                                <Label htmlFor="date">Date of Investment</Label>
                                                <Input  type="date" 
                                                    id="activity_dt"
                                                    name="activity_dt" 
                                                    value={this.state.activity_dt} 
                                                    className={ this.state.activity_dt_hasErrors ? "is-invalid" : "" }
                                                    onChange={(e) => this.setState({ activity_dt: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="4">
                                            <FormGroup>
                                                <Label htmlFor="investmentTypeSelect">Investment Type</Label>
                                                <Select 
                                                    name="investmentTypeSelect"
                                                    value={this.state.investment_type_id}
                                                    style={{borderColor:this.state.investment_type_borderColor}}
                                                    options={investmentTypeOptions}
                                                    onChange={(value) => this.setState({ investment_type_id: value})}
                                                    />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="4">
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
                                        <Col xs="3">
                                            <FormGroup>
                                                <Label htmlFor="cusip_number">CUSIP Number</Label>
                                                <Input  type="text" 
                                                    id="cusip_number"
                                                    name="cusip_number" 
                                                    value={this.state.cusip_number} 
                                                    onChange={(e) => this.setState({ cusip_number: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="3">
                                            <FormGroup>
                                                <Label htmlFor="maturity_dt">Maturity Date</Label>
                                                <Input  type="date" 
                                                    id="activity_dt"
                                                    name="activity_dt" 
                                                    value={this.state.maturity_dt} 
                                                    className={ this.state.activity_dt_hasErrors ? "is-invalid" : "" }
                                                    onChange={(e) => this.setState({ maturity_dt: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>


                                        <Col xs="3">
                                            <FormGroup>
                                                <Label htmlFor="book_value">Book Value</Label>
                                                <TextMask
                                                    Component={InputAdapter}
                                                    value={this.state.book_value}
                                                    mask={dollarMask}
                                                    guide
                                                    onChange={(e) => this.setState({ book_value: e.target.value})}
                                                    className={ this.state.book_value_hasErrors ? "form-control is-invalid" : "form-control" }
                                                    id="book_value"
                                                    name="book_value"     
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="3">
                                            <FormGroup>
                                                <Label htmlFor="original_amount">Original Amount</Label>
                                                <TextMask
                                                    Component={InputAdapter}
                                                    value={this.state.original_amount}
                                                    mask={dollarMask}
                                                    guide
                                                    onChange={(e) => this.setState({ original_amount: e.target.value})}
                                                    className={ this.state.original_amount_hasErrors ? "form-control is-invalid" : "form-control" }
                                                    id="original_amount"
                                                    name="original_amount"     
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>


                                    <Row>
                                        <Col xs="3">
                                            <FormGroup>
                                                <Label htmlFor="unfunded_committment">Unfunded Committment</Label>
                                                <Input  type="text" 
                                                    id="unfunded_committment"
                                                    name="unfunded_committment" 
                                                    value={this.state.unfunded_committment} 
                                                    onChange={(e) => this.setState({ unfunded_committment: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="3">
                                            <FormGroup>
                                                <Label htmlFor="percent_of_entity_funding">Percent of Equity Funding</Label>
                                                <Input  type="text" 
                                                    id="percent_of_entity_funding"
                                                    name="percent_of_entity_funding" 
                                                    value={this.state.percent_of_entity_funding} 
                                                    onChange={(e) => this.setState({ percent_of_entity_funding: e.target.value})} 
                                                    />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="3" >
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

                                    <Button outline color="success" onClick={() => this.handleAddInvestment()}>Save changes</Button> &nbsp;
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
        addInvestment: (activity_dt, purpose_code_id, organization_id, investment_type_id, cusip_number, maturity_dt, original_amount, book_value, unfunded_committment, percent_of_entity_funding, is_cra_qualified) => dispatch(addInvestment(activity_dt, purpose_code_id, organization_id, investment_type_id, cusip_number, maturity_dt, original_amount, book_value, unfunded_committment, percent_of_entity_funding, is_cra_qualified)),
        getPurposeCodes: () => dispatch(getPurposeCodes()),
        getInvestmentTypes: () => dispatch(getInvestmentTypes()),
        getOrganizations: () => dispatch(getOrganizations()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddInvestment)

