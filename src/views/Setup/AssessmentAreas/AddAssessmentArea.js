import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { connect } from 'react-redux'
import { addAssessmentArea } from '../../../actions/assessmentAreas'
import { getBanks } from '../../../actions/banks'

var selectOptions = []

var assessmentAreaBuffer = {}

const mapStateToProps = state => {

    state.banks.map(bank =>
        selectOptions.push({value:bank.id, label: bank.description})
    )

    state.assessmentAreas.map(e =>
        assessmentAreaBuffer = e
)

  return { 
    assessmentArea: assessmentAreaBuffer,
    banks: state.banks,
    hasErrored: state.assessmentAreasHasErrored,
    isLoading: state.assessmentAreasIsLoading
    }
}


class AddAssessmentArea extends Component 
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
            bankHasErrors: false,
            bank: null
        }

    }

    componentDidMount() 
    {
        this.props.getBanks()
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
        if (this.state.bank === null)
        {
            this.setState({ bankHasErrors: true })
            v=false
        }

        return v
    }

    handleAddAssessmentArea() 
    {
        if (!this.isValid())
        {
            return
        }

        console.log(this.state.code)
        console.log(this.state.description)
        console.log(this.state.bank.value)

        this.props.addAssessmentArea(this.state.code, this.state.description, this.state.bank.value)
        this.props.history.push("/setup/assessmentAreas")
    }

    handleCancel() 
    {
        this.props.history.push("/setup/assessmentAreas")
    }

    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the assessment area record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving assessment area...</h3>
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
                            <CardHeader><CardTitle> <b> Adding new Assessment Area </b> </CardTitle></CardHeader>
                                <CardBody>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="bankSelect">Bank</Label>
                                                <Select
                                                        name="bankSelect"
                                                        value={this.state.bank}
                                                        options={selectOptions}
                                                        onChange={(value) => this.setState({ bank: value})}
                                                        />
                                            </FormGroup>
                                        </Col>
                                    </Row>

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

                                    <Button outline color="success" onClick={() => this.handleAddAssessmentArea()}>Save changes</Button> &nbsp;
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
        addAssessmentArea: (code, description, bankId) => dispatch(addAssessmentArea(code, description, bankId)),
        getBanks: () => dispatch(getBanks())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddAssessmentArea)

