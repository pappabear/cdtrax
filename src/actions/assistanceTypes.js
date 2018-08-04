import request from 'superagent'

export function assistanceTypesHasErrored(bool) {
    return {
        type: 'ASSISTANCETYPES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function assistanceTypesIsLoading(bool) {
    return {
        type: 'ASSISTANCETYPES_IS_LOADING',
        isLoading: bool
    };
}

export function addAssistanceType(code, description) {
	return (dispatch) => {
        dispatch(assistanceTypesIsLoading(true))

		request
            .post('http://cdtrax-backend-api.herokuapp.com/assistance_types')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addAssistanceType() API call failed')
                    dispatch(assistanceTypesHasErrored(true))
                }
                //console.log('addAssistanceType() API call succeeded')
                dispatch(assistanceTypesIsLoading(false))
                dispatch(getAssistanceTypes())
			})
	}
}

export function deleteAssistanceType(id) {
	return (dispatch) => {
        dispatch(assistanceTypesIsLoading(true))

        request
            .delete('http://cdtrax-backend-api.herokuapp.com/assistance_types/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addAssistanceType() API call failed')
                    dispatch(assistanceTypesHasErrored(true))
                }
                //console.log('addAssistanceType() API call succeeded')
                dispatch(assistanceTypesIsLoading(false))
                dispatch(getAssistanceTypes())
			})
	}
}

export function updateAssistanceType(id, code, description) {
	return (dispatch) => {
        dispatch(assistanceTypesIsLoading(true))

        request
            .put('http://cdtrax-backend-api.herokuapp.com/assistance_types/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addAssistanceType() API call failed')
                    dispatch(assistanceTypesHasErrored(true))
                }
                //console.log('addAssistanceType() API call succeeded')
                dispatch(assistanceTypesIsLoading(false))
                dispatch(getAssistanceTypes())
			})
	}
}



export function assistanceTypesFetchDataSuccess(assistanceTypes) {
    return {
        type: 'ASSISTANCETYPES_FETCH_DATA_SUCCESS',
        assistanceTypes
    }
}


export function getAssistanceTypes() {
	return (dispatch) => {
        dispatch(assistanceTypesIsLoading(true));

		request
            .get('http://cdtrax-backend-api.herokuapp.com/assistance_types')
            .end((err, res) => {
                if (err) {
                    dispatch(assistanceTypesHasErrored(true));
                }
        
                const assistanceTypes = JSON.parse(res.text)

                dispatch(assistanceTypesIsLoading(false))
                dispatch(assistanceTypesFetchDataSuccess(assistanceTypes))
			})
	}
}


export function getAssistanceType(id) {
	return (dispatch) => {
        dispatch(assistanceTypesIsLoading(true));

		request
            .get('http://cdtrax-backend-api.herokuapp.com/assistance_types/' + id)
            .end((err, res) => {
                if (err) {
                    dispatch(assistanceTypesHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const assistanceType = JSON.parse(res.text)
                const assistanceTypes = []
                assistanceTypes.push(assistanceType)

                dispatch(assistanceTypesIsLoading(false))
                dispatch(assistanceTypesFetchDataSuccess(assistanceTypes))
			})
	}
}

