import request from 'superagent'

export function disasterTypesHasErrored(bool) {
    return {
        type: 'DISASTERTYPES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function disasterTypesIsLoading(bool) {
    return {
        type: 'DISASTERTYPES_IS_LOADING',
        isLoading: bool
    };
}

export function addDisasterType(code, description) {
	return (dispatch) => {
        dispatch(disasterTypesIsLoading(true))

		request
            .post('http://localhost:3001/disaster_types')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addDisasterType() API call failed')
                    dispatch(disasterTypesHasErrored(true))
                }
                //console.log('addDisasterType() API call succeeded')
                dispatch(disasterTypesIsLoading(false))
                dispatch(getDisasterTypes())
			})
	}
}

export function deleteDisasterType(id) {
	return (dispatch) => {
        dispatch(disasterTypesIsLoading(true))

        request
            .delete('http://localhost:3001/disaster_types/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addDisasterType() API call failed')
                    dispatch(disasterTypesHasErrored(true))
                }
                //console.log('addDisasterType() API call succeeded')
                dispatch(disasterTypesIsLoading(false))
                dispatch(getDisasterTypes())
			})
	}
}

export function updateDisasterType(id, code, description) {
	return (dispatch) => {
        dispatch(disasterTypesIsLoading(true))

        request
            .put('http://localhost:3001/disaster_types/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addDisasterType() API call failed')
                    dispatch(disasterTypesHasErrored(true))
                }
                //console.log('addDisasterType() API call succeeded')
                dispatch(disasterTypesIsLoading(false))
                dispatch(getDisasterTypes())
			})
	}
}



export function disasterTypesFetchDataSuccess(disasterTypes) {
    return {
        type: 'DISASTERTYPES_FETCH_DATA_SUCCESS',
        disasterTypes
    }
}


export function getDisasterTypes() {
	return (dispatch) => {
        dispatch(disasterTypesIsLoading(true));

		request
            .get('http://localhost:3001/disaster_types')
            .end((err, res) => {
                if (err) {
                    dispatch(disasterTypesHasErrored(true));
                }
        
                const disasterTypes = JSON.parse(res.text)

                dispatch(disasterTypesIsLoading(false))
                dispatch(disasterTypesFetchDataSuccess(disasterTypes))
			})
	}
}


export function getDisasterType(id) {
	return (dispatch) => {
        dispatch(disasterTypesIsLoading(true));

		request
            .get('http://localhost:3001/disaster_types/' + id)
            .end((err, res) => {
                if (err) {
                    dispatch(disasterTypesHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const disasterType = JSON.parse(res.text)
                const disasterTypes = []
                disasterTypes.push(disasterType)

                dispatch(disasterTypesIsLoading(false))
                dispatch(disasterTypesFetchDataSuccess(disasterTypes))
			})
	}
}

