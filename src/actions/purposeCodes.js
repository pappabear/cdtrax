import request from 'superagent'

export function purposeCodesHasErrored(bool) {
    return {
        type: 'PURPOSECODES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function purposeCodesIsLoading(bool) {
    return {
        type: 'PURPOSECODES_IS_LOADING',
        isLoading: bool
    };
}

export function addPurposeCode(code, description) {
	return (dispatch) => {
        dispatch(purposeCodesIsLoading(true))

		request
            .post('http://localhost:3001/purpose_codes')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addPurposeCode() API purpose failed')
                    dispatch(purposeCodesHasErrored(true))
                }
                //console.log('addPurposeCode() API purpose succeeded')
                dispatch(purposeCodesIsLoading(false))
                dispatch(getPurposeCodes())
			})
	}
}

export function deletePurposeCode(id) {
	return (dispatch) => {
        dispatch(purposeCodesIsLoading(true))

        request
            .delete('http://localhost:3001/purpose_codes/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addPurposeCode() API purpose failed')
                    dispatch(purposeCodesHasErrored(true))
                }
                //console.log('addPurposeCode() API purpose succeeded')
                dispatch(purposeCodesIsLoading(false))
                dispatch(getPurposeCodes())
			})
	}
}

export function updatePurposeCode(id, code, description) {
	return (dispatch) => {
        dispatch(purposeCodesIsLoading(true))

        request
            .put('http://localhost:3001/purpose_codes/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addPurposeCode() API purpose failed')
                    dispatch(purposeCodesHasErrored(true))
                }
                //console.log('addPurposeCode() API purpose succeeded')
                dispatch(purposeCodesIsLoading(false))
                dispatch(getPurposeCodes())
			})
	}
}



export function purposeCodesFetchDataSuccess(purposeCodes) {
    return {
        type: 'PURPOSECODES_FETCH_DATA_SUCCESS',
        purposeCodes
    }
}


export function getPurposeCodes() {
	return (dispatch) => {
        dispatch(purposeCodesIsLoading(true));

		request
            .get('http://localhost:3001/purpose_codes')
            .end((err, res) => {
                if (err) {
                    dispatch(purposeCodesHasErrored(true));
                }
        
                const purposeCodes = JSON.parse(res.text)

                dispatch(purposeCodesIsLoading(false))
                dispatch(purposeCodesFetchDataSuccess(purposeCodes))
			})
	}
}



