import request from 'superagent'

export function assistanceTypesHasErrored(bool) {
    return {
        type: 'ASSITANCETYPES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function assistanceTypesIsLoading(bool) {
    return {
        type: 'ASSITANCETYPES_IS_LOADING',
        isLoading: bool
    };
}

export function addAssistanceType(code, description) {
	return (dispatch) => {
        dispatch(assistanceTypesIsLoading(true))

		request
            .post('http://localhost:3001/assistance_types')
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
            .delete('http://localhost:3001/assistance_types/' + id)
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
            .put('http://localhost:3001/assistance_types/' + id)
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
        type: 'ASSITANCETYPES_FETCH_DATA_SUCCESS',
        assistanceTypes
    }
}


export function getAssistanceTypes() {
	return (dispatch) => {
        dispatch(assistanceTypesIsLoading(true));

		request
            .get('http://localhost:3001/assistance_types')
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



