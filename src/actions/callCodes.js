import request from 'superagent'

export function callCodesHasErrored(bool) {
    return {
        type: 'CALLCODES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function callCodesIsLoading(bool) {
    return {
        type: 'CALLCODES_IS_LOADING',
        isLoading: bool
    };
}

export function addCallCode(code, description) {
	return (dispatch) => {
        dispatch(callCodesIsLoading(true))

		request
            .post('http://localhost:3001/call_codes')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addCallCode() API call failed')
                    dispatch(callCodesHasErrored(true))
                }
                //console.log('addCallCode() API call succeeded')
                dispatch(callCodesIsLoading(false))
                dispatch(getCallCodes())
			})
	}
}

export function deleteCallCode(id) {
	return (dispatch) => {
        dispatch(callCodesIsLoading(true))

        request
            .delete('http://localhost:3001/call_codes/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addCallCode() API call failed')
                    dispatch(callCodesHasErrored(true))
                }
                //console.log('addCallCode() API call succeeded')
                dispatch(callCodesIsLoading(false))
                dispatch(getCallCodes())
			})
	}
}

export function updateCallCode(id, code, description) {
	return (dispatch) => {
        dispatch(callCodesIsLoading(true))

        request
            .put('http://localhost:3001/call_codes/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addCallCode() API call failed')
                    dispatch(callCodesHasErrored(true))
                }
                //console.log('addCallCode() API call succeeded')
                dispatch(callCodesIsLoading(false))
                dispatch(getCallCodes())
			})
	}
}



export function callCodesFetchDataSuccess(callCodes) {
    return {
        type: 'CALLCODES_FETCH_DATA_SUCCESS',
        callCodes
    }
}


export function getCallCodes() {
	return (dispatch) => {
        dispatch(callCodesIsLoading(true));

		request
            .get('http://localhost:3001/call_codes')
            .end((err, res) => {
                if (err) {
                    dispatch(callCodesHasErrored(true));
                }
        
                const callCodes = JSON.parse(res.text)

                dispatch(callCodesIsLoading(false))
                dispatch(callCodesFetchDataSuccess(callCodes))
			})
	}
}


export function getCallCode(id) {
	return (dispatch) => {
        dispatch(callCodesIsLoading(true));

		request
            .get('http://localhost:3001/call_codes/' + id)
            .end((err, res) => {
                if (err) {
                    dispatch(callCodesHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const callCode = JSON.parse(res.text)
                const callCodes = []
                callCodes.push(callCode)

                dispatch(callCodesIsLoading(false))
                dispatch(callCodesFetchDataSuccess(callCodes))
			})
	}
}

