import request from 'superagent'

export function banksHasErrored(bool) {
    return {
        type: 'BANKS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function banksIsLoading(bool) {
    return {
        type: 'BANKS_IS_LOADING',
        isLoading: bool
    };
}

export function addBank(code, description) {
	return (dispatch) => {
        dispatch(banksIsLoading(true))

		request
            .post('https://cdtrax-backend-api.herokuapp.com/banks')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addBank() API call failed')
                    dispatch(banksHasErrored(true))
                }
                //console.log('addBank() API call succeeded')
                dispatch(banksIsLoading(false))
                dispatch(getBanks())
			})
	}
}

export function deleteBank(id) {
	return (dispatch) => {
        dispatch(banksIsLoading(true))

        request
            .delete('https://cdtrax-backend-api.herokuapp.com/banks/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addBank() API call failed')
                    dispatch(banksHasErrored(true))
                }
                //console.log('addBank() API call succeeded')
                dispatch(banksIsLoading(false))
                dispatch(getBanks())
			})
	}
}

export function updateBank(id, code, description) {
	return (dispatch) => {
        dispatch(banksIsLoading(true))

        request
            .put('https://cdtrax-backend-api.herokuapp.com/banks/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addBank() API call failed')
                    dispatch(banksHasErrored(true))
                }
                //console.log('addBank() API call succeeded')
                dispatch(banksIsLoading(false))
                dispatch(getBanks())
			})
	}
}



export function banksFetchDataSuccess(banks) {
    return {
        type: 'BANKS_FETCH_DATA_SUCCESS',
        banks
    }
}


export function getBanks() {
	return (dispatch) => {
        dispatch(banksIsLoading(true));

		request
            .get('https://cdtrax-backend-api.herokuapp.com/banks')
            .end((err, res) => {
                if (err) {
                    dispatch(banksHasErrored(true));
                }
        
                const banks = JSON.parse(res.text)

                dispatch(banksIsLoading(false))
                dispatch(banksFetchDataSuccess(banks))
			})
	}
}

export function getBank(id) {
	return (dispatch) => {
        dispatch(banksIsLoading(true));

		request
            .get('https://cdtrax-backend-api.herokuapp.com/banks/' + id)
            .end((err, res) => {
                if (err) {
                    dispatch(banksHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const bank = JSON.parse(res.text)
                const banks = []
                banks.push(bank)

                dispatch(banksIsLoading(false))
                dispatch(banksFetchDataSuccess(banks))
			})
	}
}


