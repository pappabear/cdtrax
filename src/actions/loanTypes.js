import request from 'superagent'

export function loanTypesHasErrored(bool) {
    return {
        type: 'LOANTYPES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function loanTypesIsLoading(bool) {
    return {
        type: 'LOANTYPES_IS_LOADING',
        isLoading: bool
    };
}

export function addLoanType(code, description) {
	return (dispatch) => {
        dispatch(loanTypesIsLoading(true))

		request
            .post('http://localhost:3001/loan_types')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addLoanType() API call failed')
                    dispatch(loanTypesHasErrored(true))
                }
                //console.log('addLoanType() API call succeeded')
                dispatch(loanTypesIsLoading(false))
                dispatch(getLoanTypes())
			})
	}
}

export function deleteLoanType(id) {
	return (dispatch) => {
        dispatch(loanTypesIsLoading(true))

        request
            .delete('http://localhost:3001/loan_types/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addLoanType() API call failed')
                    dispatch(loanTypesHasErrored(true))
                }
                //console.log('addLoanType() API call succeeded')
                dispatch(loanTypesIsLoading(false))
                dispatch(getLoanTypes())
			})
	}
}

export function updateLoanType(id, code, description) {
	return (dispatch) => {
        dispatch(loanTypesIsLoading(true))

        request
            .put('http://localhost:3001/loan_types/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addLoanType() API call failed')
                    dispatch(loanTypesHasErrored(true))
                }
                //console.log('addLoanType() API call succeeded')
                dispatch(loanTypesIsLoading(false))
                dispatch(getLoanTypes())
			})
	}
}



export function loanTypesFetchDataSuccess(loanTypes) {
    return {
        type: 'LOANTYPES_FETCH_DATA_SUCCESS',
        loanTypes
    }
}


export function getLoanTypes() {
	return (dispatch) => {
        dispatch(loanTypesIsLoading(true));

		request
            .get('http://localhost:3001/loan_types')
            .end((err, res) => {
                if (err) {
                    dispatch(loanTypesHasErrored(true));
                }
        
                const loanTypes = JSON.parse(res.text)

                dispatch(loanTypesIsLoading(false))
                dispatch(loanTypesFetchDataSuccess(loanTypes))
			})
	}
}

export function getLoanType(id) {
	return (dispatch) => {
        dispatch(loanTypesIsLoading(true));

		request
            .get('http://localhost:3001/loan_types/' + id)
            .end((err, res) => {
                if (err) {
                    dispatch(loanTypesHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const loanType = JSON.parse(res.text)
                const loanTypes = []
                loanTypes.push(loanType)

                dispatch(loanTypesIsLoading(false))
                dispatch(loanTypesFetchDataSuccess(loanTypes))
			})
	}
}

