import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { connect } from 'react-redux'
import { addEntity } from '../../actions/entities'

var entityBuffer = {}

const mapStateToProps = state => {
    state.entities.map(e =>
        entityBuffer = e
)

  return { 
    entity: entityBuffer,
    hasErrored: state.entitiesHasErrored,
    isLoading: state.entitiesIsLoading
    }
}


class AddEntity extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = 
        {
            name: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            website: "",
            mission: "",
            revenue: "",
            number_of_employees: "",
            nameHasErrors: null,
        }

    }

    isValid = () => {
        var v=true
        if (this.state.name === "")
        {
            this.setState({ nameHasErrors: true })
            v=false
        }
        return v
    }

    handleAddEntity() 
    {
        if (!this.isValid())
        {
            return
        }

        this.props.addEntity(this.state.name, this.state.address, this.state.city, this.state.state, this.state.zip, this.state.phone, this.state.mission, this.state.number_of_employees, this.state.revenue, this.state.website)

        // navigate back to /entities after dispatching the update
        this.props.history.push('/entities')
    }

    handleCancel() 
    {
        this.props.history.push("/entities")
    }

    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the entity record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving entity...</h3>
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
                            <CardHeader><CardTitle> <b> Adding new Entity </b> </CardTitle></CardHeader>
                                <CardBody>

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
                                                <Label htmlFor="address">Address</Label>
                                                <Input type="text" id="address" 
                                                    value={this.state.address} 
                                                    onChange={(e) => this.setState({ address: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="city">City</Label>
                                                <Input type="text" id="city" 
                                                    value={this.state.city} 
                                                    onChange={(e) => this.setState({ city: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="state">State</Label>
                                                <Input type="text" id="state" 
                                                    value={this.state.state} 
                                                    onChange={(e) => this.setState({ state: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="zip">Zip</Label>
                                                <Input type="text" id="zip" 
                                                    value={this.state.zip} 
                                                    onChange={(e) => this.setState({ zip: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input type="text" id="phone" 
                                                    value={this.state.phone} 
                                                    onChange={(e) => this.setState({ phone: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="website">Website</Label>
                                                <Input type="text" id="website" 
                                                    value={this.state.website} 
                                                    onChange={(e) => this.setState({ website: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="revenue">Revenue</Label>
                                                <Input type="text" id="revenue" 
                                                    value={this.state.revenue} 
                                                    onChange={(e) => this.setState({ revenue: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="number_of_employees">Number of employees</Label>
                                                <Input type="text" id="number_of_employees" 
                                                    value={this.state.number_of_employees} 
                                                    onChange={(e) => this.setState({ number_of_employees: e.target.value})} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Button outline color="success" onClick={() => this.handleAddEntity()}>Save changes</Button> &nbsp;
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
        addEntity: (name, address, city, state, zip, phone, mission, number_of_employees, revenue, website) => dispatch(addEntity(name, address, city, state, zip, phone, mission, number_of_employees, revenue, website)),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddEntity)

