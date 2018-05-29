import request from 'superagent'

export function serviceTypesHasErrored(bool) {
    return {
        type: 'SERVICETYPES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function serviceTypesIsLoading(bool) {
    return {
        type: 'SERVICETYPES_IS_LOADING',
        isLoading: bool
    };
}

export function addServiceType(code, description) {
	return (dispatch) => {
        dispatch(serviceTypesIsLoading(true))

		request
            .post('http://localhost:3001/service_types')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addServiceType() API call failed')
                    dispatch(serviceTypesHasErrored(true))
                }
                //console.log('addServiceType() API call succeeded')
                dispatch(serviceTypesIsLoading(false))
                dispatch(getServiceTypes())
			})
	}
}

export function deleteServiceType(id) {
	return (dispatch) => {
        dispatch(serviceTypesIsLoading(true))

        request
            .delete('http://localhost:3001/service_types/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addServiceType() API call failed')
                    dispatch(serviceTypesHasErrored(true))
                }
                //console.log('addServiceType() API call succeeded')
                dispatch(serviceTypesIsLoading(false))
                dispatch(getServiceTypes())
			})
	}
}

export function updateServiceType(id, code, description) {
	return (dispatch) => {
        dispatch(serviceTypesIsLoading(true))

        request
            .put('http://localhost:3001/service_types/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addServiceType() API call failed')
                    dispatch(serviceTypesHasErrored(true))
                }
                //console.log('addServiceType() API call succeeded')
                dispatch(serviceTypesIsLoading(false))
                dispatch(getServiceTypes())
			})
	}
}



export function serviceTypesFetchDataSuccess(serviceTypes) {
    return {
        type: 'SERVICETYPES_FETCH_DATA_SUCCESS',
        serviceTypes
    }
}


export function getServiceTypes() {
	return (dispatch) => {
        dispatch(serviceTypesIsLoading(true));

		request
            .get('http://localhost:3001/service_types')
            .end((err, res) => {
                if (err) {
                    dispatch(serviceTypesHasErrored(true));
                }
        
                const serviceTypes = JSON.parse(res.text)

                dispatch(serviceTypesIsLoading(false))
                dispatch(serviceTypesFetchDataSuccess(serviceTypes))
			})
	}
}


