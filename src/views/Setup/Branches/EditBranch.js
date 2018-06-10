import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { connect } from 'react-redux'
import { getBranch, deleteBranch, updateBranch } from '../../../actions/branches'
import { getBanks } from '../../../actions/banks'

var selectOptions = []

var branchBuffer = {}

const mapStateToProps = state => {

    state.banks.map(bank =>
        selectOptions.push({value:bank.id, label: bank.description})
    )

    state.branches.map(e =>
        branchBuffer = e
)

  return { 
    branch: branchBuffer,
    banks: state.banks,
    hasErrored: state.branchesHasErrored,
    isLoading: state.branchesIsLoading
    }
}


class Editbranch extends Component 
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
        this.props.getBranch(id)
        this.props.getBanks()
    }

    componentWillReceiveProps(nextProps) 
    {
        // capture the props and data entry form state BEFORE it fires another render
        this.setState({ code: nextProps.branch.code, 
                        description: nextProps.branch.description,
                        bank: nextProps.branch.bank_id
        })
    }

    handleUpdatebranch() 
    {
        if (!this.isValid())
        {
            return
        }

        this.props.updateBranch(this.props.branch.id, this.state.code, this.state.description)
        this.props.history.push("/setup/branches")
    }

    handleDeletebranch() 
    {
        this.props.deleteBranch(this.props.branch.id)
        this.props.history.push("/setup/branches")
    }

    handleCancel() 
    {
        this.props.history.push("/setup/branches")
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
                            <CardHeader><CardTitle> <b> {this.props.branch.description} </b> </CardTitle></CardHeader>
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

                                    <Button outline color="success" onClick={() => this.handleUpdatebranch()}>Save changes</Button> &nbsp;
                                    <Button outline color="danger" onClick={() => this.handleDeletebranch()}>Delete</Button> &nbsp;
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
        getBranch: (id) => dispatch(getBranch(id)),
        deleteBranch: (id) => dispatch(deleteBranch(id)),
        updateBranch: (id, code, description, bankId) => dispatch(updateBranch(id, code, description, bankId))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Editbranch)

