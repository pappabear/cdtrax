import request from 'superagent'

export function organizationsHasErrored(bool) {
    return {
        type: 'ORGANIZATIONS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function organizationsIsLoading(bool) {
    return {
        type: 'ORGANIZATIONS_IS_LOADING',
        isLoading: bool
    };
}

export function addOrganization(name, address, city, state, zip, phone, mission, number_of_employees, revenue, website) {
	return (dispatch) => {
        dispatch(organizationsIsLoading(true))

		request
            .post('http://cdtrax-backend-api.herokuapp.com/organizations')
            .send({ name:name, address:address, city:city, state:state, zip:zip, phone:phone, mission:mission, number_of_employees:number_of_employees, revenue:revenue, website:website })
            .end((err, res) => {
                if (err) {
                    console.log('addOrganization() API call failed')
                    console.log(err)
                    dispatch(organizationsHasErrored(true))
                }
                //console.log('addOrganization() API call succeeded')
                dispatch(organizationsIsLoading(false))
                dispatch(getOrganizations())
			})
	}
}

export function deleteOrganization(id) {
	return (dispatch) => {
        dispatch(organizationsIsLoading(true))

        request
            .delete('http://cdtrax-backend-api.herokuapp.com/organizations/' + id)
            .end((err, res) => {
                if (err) {
                    console.log('deleteOrganization() API call failed')
                    console.log(err)
                    dispatch(organizationsHasErrored(true))
                }
                //console.log('addOrganization() API call succeeded')
                dispatch(organizationsIsLoading(false))
                dispatch(getOrganizations())
			})
	}
}

export function updateOrganization(id, name, address, city, state, zip, phone, mission, number_of_employees, revenue, website) {
	return (dispatch) => {
        dispatch(organizationsIsLoading(true))

        request
            .put('http://cdtrax-backend-api.herokuapp.com/organizations/' + id)
            .send({ id: id, name:name, address:address, city:city, state:state, zip:zip, phone:phone, mission:mission, number_of_employees:number_of_employees, revenue:revenue, website:website })
            .end((err, res) => {
                if (err) {
                    console.log('updateOrganization() API call failed')
                    console.log(err)
                    dispatch(organizationsHasErrored(true))
                }
                //console.log('addOrganization() API call succeeded')
                dispatch(organizationsIsLoading(false))
                dispatch(getOrganizations())
			})
	}
}



export function organizationsFetchDataSuccess(organizations) {
    return {
        type: 'ORGANIZATIONS_FETCH_DATA_SUCCESS',
        organizations
    }
}


export function getOrganizations() {
	return (dispatch) => {
        dispatch(organizationsIsLoading(true));

		request
            .get('http://cdtrax-backend-api.herokuapp.com/organizations')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(organizationsHasErrored(true));
                }
        
                const organizations = JSON.parse(res.text)

                dispatch(organizationsIsLoading(false))
                dispatch(organizationsFetchDataSuccess(organizations))
			})
	}
}

export function getOrganization(id) {
	return (dispatch) => {
        dispatch(organizationsIsLoading(true));

		request
            .get('http://cdtrax-backend-api.herokuapp.com/organizations/' + id)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(organizationsHasErrored(true));
                }
        
                const organization = JSON.parse(res.text)
                const organizations = []
                organizations.push(organization)

                dispatch(organizationsIsLoading(false))
                dispatch(organizationsFetchDataSuccess(organizations))
			})
	}
}



