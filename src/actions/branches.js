import request from 'superagent'

export function branchesHasErrored(bool) {
    return {
        type: 'BRANCHES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function branchesIsLoading(bool) {
    return {
        type: 'BRANCHES_IS_LOADING',
        isLoading: bool
    };
}

export function addBranch(code, description, bankId) {
	return (dispatch) => {

        dispatch(branchesIsLoading(true))

		request
            .post('http://localhost:3001/branches')
            .send({code:code, description:description, bank_id:bankId})
            .end((err, res) => {
                if (err) {
                    console.log('addBranch() API call failed')
                    console.log(err)
                    dispatch(branchesHasErrored(true))
                }
                //console.log('addBranch() API call succeeded')
                dispatch(branchesIsLoading(false))
                dispatch(getBranches())
			})
	}
}

export function deleteBranch(id) {
	return (dispatch) => {

        dispatch(branchesIsLoading(true))

        request
            .delete('http://localhost:3001/branches/' + id)
            .end((err, res) => {
                if (err) {
                    console.log('deleteBranch() API call failed')
                    console.log(err)
                    dispatch(branchesHasErrored(true))
                }
                //console.log('deleteBranch() API call succeeded')
                dispatch(branchesIsLoading(false))
                dispatch(getBranches())
			})
	}
}

export function updateBranch(id, code, description, bankId) {
	return (dispatch) => {

        dispatch(branchesIsLoading(true))

        request
            .put('http://localhost:3001/branches/' + id)
            .send({id: id, code: code, description: description, bank_id:bankId })
            .end((err, res) => {
                if (err) {
                    console.log('updateBranch() API call failed')
                    console.log(err)
                    dispatch(branchesHasErrored(true))
                }
                //console.log('updateBranch() API call succeeded')
                dispatch(branchesIsLoading(false))
                dispatch(getBranches())
			})
	}
}



export function branchesFetchDataSuccess(branches) {
    return {
        type: 'BRANCHES_FETCH_DATA_SUCCESS',
        branches
    }
}


export function getBranches() {
	return (dispatch) => {

        dispatch(branchesIsLoading(true));

		request
            .get('http://localhost:3001/branches')
            .end((err, res) => {
                if (err) {
                    console.log('getBranches() API call failed')
                    console.log(err)
                    dispatch(branchesHasErrored(true));
                }
        
                const branches = JSON.parse(res.text)
                //console.log(branches)

                dispatch(branchesIsLoading(false))
                dispatch(branchesFetchDataSuccess(branches))
			})
	}
}


export function getBranch(id) {
	return (dispatch) => {
        dispatch(branchesIsLoading(true));

		request
            .get('http://localhost:3001/branches/' + id)
            .end((err, res) => {
                if (err) {
                    dispatch(branchesHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const branch = JSON.parse(res.text)
                const branches = []
                branches.push(branch)

                dispatch(branchesIsLoading(false))
                dispatch(branchesFetchDataSuccess(branches))
			})
	}
}
