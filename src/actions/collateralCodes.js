import request from 'superagent'

export function collateralCodesHasErrored(bool) {
    return {
        type: 'COLLATERALCODES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function collateralCodesIsLoading(bool) {
    return {
        type: 'COLLATERALCODES_IS_LOADING',
        isLoading: bool
    };
}

export function addCollateralCode(code, description) {
	return (dispatch) => {
        dispatch(collateralCodesIsLoading(true))

		request
            .post('http://cdtrax-backend-api.herokuapp.com/collateral_codes')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addCollateralCode() API call failed')
                    dispatch(collateralCodesHasErrored(true))
                }
                //console.log('addCollateralCode() API call succeeded')
                dispatch(collateralCodesIsLoading(false))
                dispatch(getCollateralCodes())
			})
	}
}

export function deleteCollateralCode(id) {
	return (dispatch) => {
        dispatch(collateralCodesIsLoading(true))

        request
            .delete('http://cdtrax-backend-api.herokuapp.com/collateral_codes/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addCollateralCode() API call failed')
                    dispatch(collateralCodesHasErrored(true))
                }
                //console.log('addCollateralCode() API call succeeded')
                dispatch(collateralCodesIsLoading(false))
                dispatch(getCollateralCodes())
			})
	}
}

export function updateCollateralCode(id, code, description) {
	return (dispatch) => {
        dispatch(collateralCodesIsLoading(true))

        request
            .put('http://cdtrax-backend-api.herokuapp.com/collateral_codes/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addCollateralCode() API call failed')
                    dispatch(collateralCodesHasErrored(true))
                }
                //console.log('addCollateralCode() API call succeeded')
                dispatch(collateralCodesIsLoading(false))
                dispatch(getCollateralCodes())
			})
	}
}



export function collateralCodesFetchDataSuccess(collateralCodes) {
    return {
        type: 'COLLATERALCODES_FETCH_DATA_SUCCESS',
        collateralCodes
    }
}


export function getCollateralCodes() {
	return (dispatch) => {
        dispatch(collateralCodesIsLoading(true));

		request
            .get('http://cdtrax-backend-api.herokuapp.com/collateral_codes')
            .end((err, res) => {
                if (err) {
                    dispatch(collateralCodesHasErrored(true));
                }
        
                const collateralCodes = JSON.parse(res.text)

                dispatch(collateralCodesIsLoading(false))
                dispatch(collateralCodesFetchDataSuccess(collateralCodes))
			})
	}
}


export function getCollateralCode(id) {
	return (dispatch) => {
        dispatch(collateralCodesIsLoading(true));

		request
            .get('http://cdtrax-backend-api.herokuapp.com/collateral_codes/' + id)
            .end((err, res) => {
                if (err) {
                    dispatch(collateralCodesHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const collateralCode = JSON.parse(res.text)
                const collateralCodes = []
                collateralCodes.push(collateralCode)

                dispatch(collateralCodesIsLoading(false))
                dispatch(collateralCodesFetchDataSuccess(collateralCodes))
			})
	}
}


