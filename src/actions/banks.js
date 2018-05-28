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
            .post('http://localhost:3001/banks')
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
            .delete('http://localhost:3001/banks/' + id)
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
            .put('http://localhost:3001/banks/' + id)
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
            .get('http://localhost:3001/banks')
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



