import request from 'superagent'


export function investmentsHasErrored(bool) 
{
    return {
        type: 'INVESTMENTS_HAS_ERRORED',
        hasErrored: bool
    }
}


export function investmentsIsLoading(bool) 
{
    return {
        type: 'INVESTMENTS_IS_LOADING',
        isLoading: bool
    }
}


export function addInvestment(activity_dt, purpose_code_id, organization_id, investment_type_id, cusip_number, maturity_dt, original_amount, book_value, unfunded_committment, percent_of_entity_funding, is_cra_qualified) 
{
	return (dispatch) => {
        dispatch(investmentsIsLoading(true))

		request
            .post('https://cdtrax-backend-api.herokuapp.com/investments')
            .send({ activity_dt:activity_dt, purpose_code_id:purpose_code_id, organization_id:organization_id, investment_type_id:investment_type_id, cusip_number:cusip_number, maturity_dt:maturity_dt, original_amount:original_amount, book_value:book_value, unfunded_committment:unfunded_committment, percent_of_entity_funding:percent_of_entity_funding, is_cra_qualified:is_cra_qualified })
            .end((err, res) => {
                if (err) {
                    console.log('addInvestment() API call failed')
                    console.log(err)
                    dispatch(investmentsHasErrored(true))
                }
                //console.log('addInvestment() API call succeeded')
                dispatch(investmentsIsLoading(false))
                dispatch(getInvestments())
			})
	}
}


export function deleteInvestment(id) 
{
	return (dispatch) => {
        dispatch(investmentsIsLoading(true))

        request
            .delete('https://cdtrax-backend-api.herokuapp.com/investments/' + id)
            .end((err, res) => {
                if (err) {
                    console.log('deleteInvestment() API call failed')
                    console.log(err)
                    dispatch(investmentsHasErrored(true))
                }
                //console.log('addInvestment() API call succeeded')
                dispatch(investmentsIsLoading(false))
                dispatch(getInvestments())
			})
	}
}


export function updateInvestment(id, activity_dt, purpose_code_id, organization_id, investment_type_id, cusip_number, maturity_dt, original_amount, book_value, unfunded_committment, percent_of_entity_funding, is_cra_qualified) 
{
	return (dispatch) => {
        dispatch(investmentsIsLoading(true))

        request
            .put('https://cdtrax-backend-api.herokuapp.com/investments/' + id)
            .send({id: id, activity_dt:activity_dt, purpose_code_id:purpose_code_id, organization_id:organization_id, investment_type_id:investment_type_id, cusip_number:cusip_number, maturity_dt:maturity_dt, original_amount:original_amount, book_value:book_value, unfunded_committment:unfunded_committment, percent_of_entity_funding:percent_of_entity_funding, is_cra_qualified:is_cra_qualified })
            .end((err, res) => {
                if (err) {
                    console.log('updateInvestment() API call failed')
                    console.log(err)
                    dispatch(investmentsHasErrored(true))
                }
                //console.log('addInvestment() API call succeeded')
                dispatch(investmentsIsLoading(false))
                dispatch(getInvestments())
			})
	}
}



export function investmentsFetchDataSuccess(investments) 
{
    return {
        type: 'INVESTMENTS_FETCH_DATA_SUCCESS',
        investments
    }
}


export function getInvestments() 
{
	return (dispatch) => {
        dispatch(investmentsIsLoading(true));

		request
            .get('https://cdtrax-backend-api.herokuapp.com/investments')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(investmentsHasErrored(true));
                }
        
                const investments = JSON.parse(res.text)

                dispatch(investmentsIsLoading(false))
                dispatch(investmentsFetchDataSuccess(investments))
			})
	}
}


export function getInvestment(id) 
{
	return (dispatch) => {
        dispatch(investmentsIsLoading(true));

		request
            .get('https://cdtrax-backend-api.herokuapp.com/investments/' + id)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(investmentsHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const investment = JSON.parse(res.text)
                const investments = []
                investments.push(investment)

                dispatch(investmentsIsLoading(false))
                dispatch(investmentsFetchDataSuccess(investments))
			})
	}
}
