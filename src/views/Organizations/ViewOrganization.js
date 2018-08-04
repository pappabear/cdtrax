import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Row, Col, Button, CardTitle, FormGroup, Label, Input} from 'reactstrap'

import { connect } from 'react-redux'
import { getOrganization } from '../../actions/organizations'

var organizationBuffer = {}

const mapStateToProps = state => {
    state.organizations.map(e =>
        {
        //organizationBuffer = e
        // handle HACK here - action returns an array of one element, to deal with Rails API
        if (e[0] != null)
            organizationBuffer = e[0]
        else
            organizationBuffer = e
        }
)

  return { 
    organization: organizationBuffer,
    hasErrored: state.organizationsHasErrored,
    isLoading: state.organizationsIsLoading
    }
}


class ViewOrganization extends Component 
{

    componentDidMount() 
    {
        this.props.getOrganization(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) 
    {
        // capture the props and data entry form state BEFORE it fires another render
        this.setState({ id: nextProps.organization.id,
                        name: nextProps.organization.name, 
                        address: nextProps.organization.address,
                        city: nextProps.organization.city,
                        state: nextProps.organization.state,
                        zip: nextProps.organization.zip,
                        phone: nextProps.organization.phone,
                        website: nextProps.organization.website,
                        mission: nextProps.organization.mission,
                        revenue: nextProps.organization.revenue,
                        number_of_employees: nextProps.organization.number_of_employees
                    })
    }

    handleEdit() 
    {
        this.props.history.push("/organizations/EditOrganization/" + this.props.match.params.id)
    }

    handleCancel() 
    {
        this.props.history.push("/organizations")
    }

    render() {

        if (this.props.hasErrored) 
        {
            return (<p>Sorry! There was an error getting the organization record requested.</p>)
        }

        if (this.props.isLoading) 
        {
            return (
                <div>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <h3>Retreiving organization...</h3>
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
                            <CardHeader><CardTitle> <b> <i> {this.props.organization.name} </i> </b> </CardTitle></CardHeader>
                                <CardBody>

                                    <Row>
                                        <Col xs="12">
                                            <p>{this.props.organization.name}</p>
                                            <p>{this.props.organization.formatted_address}</p>
                                            <p>{this.props.organization.phone}</p>
                                            <p><a href={`http://` + this.props.organization.website} target="new">{this.props.organization.website}</a></p>
                                            <p>Revenue: {this.props.organization.revenue}</p>
                                            <p>Number of employees: {this.props.organization.number_of_employees}</p>
                                        </Col>
                                    </Row>

                                    <Button outline color="success" onClick={() => this.handleEdit()}>Edit this record</Button> &nbsp;
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
        getOrganization: (id) => dispatch(getOrganization(id)),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ViewOrganization)

