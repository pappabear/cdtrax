import request from 'superagent'

export function investmentTypesHasErrored(bool) {
    return {
        type: 'INVESTMENTTYPES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function investmentTypesIsLoading(bool) {
    return {
        type: 'INVESTMENTTYPES_IS_LOADING',
        isLoading: bool
    };
}

export function addInvestmentType(code, description) {
	return (dispatch) => {
        dispatch(investmentTypesIsLoading(true))

		request
            .post('http://localhost:3001/investment_types')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addInvestmentType() API call failed')
                    dispatch(investmentTypesHasErrored(true))
                }
                //console.log('addInvestmentType() API call succeeded')
                dispatch(investmentTypesIsLoading(false))
                dispatch(getInvestmentTypes())
			})
	}
}

export function deleteInvestmentType(id) {
	return (dispatch) => {
        dispatch(investmentTypesIsLoading(true))

        request
            .delete('http://localhost:3001/investment_types/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addInvestmentType() API call failed')
                    dispatch(investmentTypesHasErrored(true))
                }
                //console.log('addInvestmentType() API call succeeded')
                dispatch(investmentTypesIsLoading(false))
                dispatch(getInvestmentTypes())
			})
	}
}

export function updateInvestmentType(id, code, description) {
	return (dispatch) => {
        dispatch(investmentTypesIsLoading(true))

        request
            .put('http://localhost:3001/investment_types/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addInvestmentType() API call failed')
                    dispatch(investmentTypesHasErrored(true))
                }
                //console.log('addInvestmentType() API call succeeded')
                dispatch(investmentTypesIsLoading(false))
                dispatch(getInvestmentTypes())
			})
	}
}



export function investmentTypesFetchDataSuccess(investmentTypes) {
    return {
        type: 'INVESTMENTTYPES_FETCH_DATA_SUCCESS',
        investmentTypes
    }
}


export function getInvestmentTypes() {
	return (dispatch) => {
        dispatch(investmentTypesIsLoading(true));

		request
            .get('http://localhost:3001/investment_types')
            .end((err, res) => {
                if (err) {
                    dispatch(investmentTypesHasErrored(true));
                }
        
                const investmentTypes = JSON.parse(res.text)

                dispatch(investmentTypesIsLoading(false))
                dispatch(investmentTypesFetchDataSuccess(investmentTypes))
			})
	}
}



