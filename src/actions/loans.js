import request from 'superagent'


export function loansHasErrored(bool) 
{
    return {
        type: 'LOANS_HAS_ERRORED',
        hasErrored: bool
    }
}


export function loansIsLoading(bool) 
{
    return {
        type: 'LOANS_IS_LOADING',
        isLoading: bool
    }
}


export function addLoan(activity_dt, purpose_code_id, organization_id, account_number, loan_number, loan_type_id, call_code_id, collateral_code_id, lien_address, lien_city, lien_state, lien_zip, term, is_cra_qualified, is_3rd_party, is_affiliate, state_code, county_code, tract, msa) 
{
	return (dispatch) => {
        dispatch(loansIsLoading(true))

		request
            .post('http://localhost:3001/loans')
            .send({ activity_dt:activity_dt, purpose_code_id:purpose_code_id, organization_id:organization_id, account_number:account_number, loan_number:loan_number, loan_type_id:loan_type_id, call_code_id:call_code_id, collateral_code_id:collateral_code_id, lien_address:lien_address, lien_city:lien_city, lien_state:lien_state, lien_zip:lien_zip, term:term, is_cra_qualified:is_cra_qualified, is_3rd_party:is_3rd_party, is_affiliate:is_affiliate, state_code:state_code, county_code:county_code, tract:tract, msa:msa })
            .end((err, res) => {
                if (err) {
                    console.log('addLoan() API call failed')
                    console.log(err)
                    dispatch(loansHasErrored(true))
                }
                //console.log('addLoan() API call succeeded')
                dispatch(loansIsLoading(false))
                dispatch(getLoans())
			})
	}
}


export function deleteLoan(id) 
{
	return (dispatch) => {
        dispatch(loansIsLoading(true))

        request
            .delete('http://localhost:3001/loans/' + id)
            .end((err, res) => {
                if (err) {
                    console.log('deleteLoan() API call failed')
                    console.log(err)
                    dispatch(loansHasErrored(true))
                }
                //console.log('addLoan() API call succeeded')
                dispatch(loansIsLoading(false))
                dispatch(getLoans())
			})
	}
}


export function updateLoan(id, activity_dt, purpose_code_id, organization_id, account_number, loan_number, loan_type_id, call_code_id, collateral_code_id, lien_address, lien_city, lien_state, lien_zip, term, is_cra_qualified, is_3rd_party, is_affiliate, state_code, county_code, tract, msa) 
{
	return (dispatch) => {
        dispatch(loansIsLoading(true))

        request
            .put('http://localhost:3001/loans/' + id)
            .send({id: id, activity_dt:activity_dt, purpose_code_id:purpose_code_id, organization_id:organization_id, account_number:account_number, loan_number:loan_number, loan_type_id:loan_type_id, call_code_id:call_code_id, collateral_code_id:collateral_code_id, lien_address:lien_address, lien_city:lien_city, lien_state:lien_state, lien_zip:lien_zip, term:term, is_cra_qualified:is_cra_qualified, is_3rd_party:is_3rd_party, is_affiliate:is_affiliate, state_code:state_code, county_code:county_code, tract:tract, msa:msa })
            .end((err, res) => {
                if (err) {
                    console.log('updateLoan() API call failed')
                    console.log(err)
                    dispatch(loansHasErrored(true))
                }
                //console.log('addLoan() API call succeeded')
                dispatch(loansIsLoading(false))
                dispatch(getLoans())
			})
	}
}



export function loansFetchDataSuccess(loans) 
{
    return {
        type: 'LOANS_FETCH_DATA_SUCCESS',
        loans
    }
}


export function getLoans() 
{
	return (dispatch) => {
        dispatch(loansIsLoading(true));

		request
            .get('http://localhost:3001/loans')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(loansHasErrored(true));
                }
        
                const loans = JSON.parse(res.text)

                dispatch(loansIsLoading(false))
                dispatch(loansFetchDataSuccess(loans))
			})
	}
}


export function getLoan(id) 
{
	return (dispatch) => {
        dispatch(loansIsLoading(true));

		request
            .get('http://localhost:3001/loans/' + id)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(loansHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const loan = JSON.parse(res.text)
                const loans = []
                loans.push(loan)

                dispatch(loansIsLoading(false))
                dispatch(loansFetchDataSuccess(loans))
			})
	}
}


