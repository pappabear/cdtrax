import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { connect } from 'react-redux'
import { getEmployee, deleteEmployee, updateEmployee } from '../../actions/employees'
import { getBanks } from '../../actions/banks'
import { getBranches } from '../../actions/branches'

var bankOptions = []
var branchOptions = []

var employeeBuffer = {}

const mapStateToProps = state => {

    state.banks.map(bank =>
        bankOptions.push({value:bank.id, label: bank.description})
    )
    state.branches.map(branch =>
        branchOptions.push({value:branch.id, label: branch.description})
    )

    state.employees.map(e =>
        employeeBuffer = e
)

  return { 
    employee: employeeBuffer,
    banks: state.banks,
    branches: state.branches,
    hasErrored: state.employeesHasErrored,
    isLoading: state.employeesIsLoading
    }
}


class Editemployee extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = 
        {
            id: "",
            code: "",
            name: "",
            title: "",
            bank: null,
            branch: null,
            codeHasErrors: null,
            nameHasErrors: null,
            titleHasErrors: null,
        }

    }

    isValid = () => {
        var v=true
        if (this.state.code === "")
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
        this.props.getEmployee(id)
        this.props.getBanks()
        this.props.getBranches()
    }

    componentWillReceiveProps(nextProps) 
    {
        // capture the props and data entry form state BEFORE it fires another render
        this.setState({ code: nextProps.employee.code, 
                        name: nextProps.employee.name,
                        title: nextProps.employee.title,
                        bank: nextProps.employee.default_bank_id,
                        branch: nextProps.employee.default_branch_id
        })
    }

    handleUpdateEmployee() 
    {
        if (!this.isValid())
        {
            return
        }

        // these values are not required so the dropdown may be null
        var bankValue = this.state.bank != null ? this.state.bank.value : null
        var branchValue = this.state.branch != null ? this.state.branch.value : null
        
        console.log(bankValue)
        console.log(branchValue)

        this.props.updateEmployee(this.props.employee.id, this.state.code, 
                                    this.state.name, this.state.title, bankValue, branchValue)

        // navigate back to /employees after dispatching the update
        this.props.history.push('/employees')
    }

    handleDeleteEmployee() 
    {
        this.props.deleteEmployee(this.props.employee.id)
        this.props.history.push("/employees")
    }

    handleCancel() 
    {
        this.props.history.push("/employees")
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
                                    <h3>Retreiving employee...</h3>
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
                            <CardHeader><CardTitle> <b> {this.props.employee.name} </b> </CardTitle></CardHeader>
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

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="bankSelect">Default Bank</Label>
                                                <Select
                                                        name="bankSelect"
                                                        value={this.state.bank}
                                                        options={bankOptions}
                                                        onChange={(value) => this.setState({ bank: value})}
                                                        />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="bankSelect">Default Branch</Label>
                                                <Select
                                                        name="branchSelect"
                                                        value={this.state.branch}
                                                        options={branchOptions}
                                                        onChange={(value) => this.setState({ branch: value})}
                                                        />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Button outline color="success" onClick={() => this.handleUpdateEmployee()}>Save changes</Button> &nbsp;
                                    <Button outline color="danger" onClick={() => this.handleDeleteEmployee()}>Delete</Button> &nbsp;
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
        getBranches: () => dispatch(getBranches()),
        getEmployee: (id) => dispatch(getEmployee(id)),
        deleteEmployee: (id) => dispatch(deleteEmployee(id)),
        updateEmployee: (id, code, description, title, bankId, branchId) => dispatch(updateEmployee(id, code, description, title, bankId, branchId))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Editemployee)

