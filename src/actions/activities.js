import request from 'superagent'

export function activitiesHasErrored(bool) {
    return {
        type: 'ACTIVITIES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function activitiesIsLoading(bool) {
    return {
        type: 'ACTIVITIES_IS_LOADING',
        isLoading: bool
    };
}

export function addActivity(activity_dt, activity_type_id, purpose_code_id,
                            employee_id, entity_id, 
                            contact_name, assessment_area_id, disaster_number, 
                            disaster_start_dt, disaster_end_dt, 
                            disaster_type_id, declaration_type_id, assistance_type_id, 
                            related_service_flag, related_investment_flag, 
                            related_loan_flag, lmi_percentage, is_benefit_statewide, 
                            is_benefit_investment, is_benefit_empowerment, is_benefit_distressed, 
                            is_benefit_underserved, is_benefit_disaster, notes, 
                            service_type_id, hours, cra_hours, is_financial_expertise, 
                            investment_type_id, cusip_number, 
                            maturity_dt, original_amount, book_value, unfunded_committment, 
                            percent_of_entity_funding, account_number, 
                            loan_number, loan_type_id, call_code_id, collateral_code_id, 
                            address, city, state, zip, term, 
                            is_cra_qualified, is_3rd_party, is_affiliate, state_code, county_code, 
                            tract, msa
                        ) 
{
    return (dispatch) => {
        dispatch(activitiesIsLoading(true))

        var activityJSON = {activity_dt:activity_dt, activity_type_id:activity_type_id, 
                            purpose_code_id:purpose_code_id, 
                            employee_id:employee_id, 
                            entity_id:entity_id, 
                            contact_name:contact_name, 
                            assessment_area_id:assessment_area_id, 
                            disaster_number:disaster_number, 
                            disaster_start_dt:disaster_start_dt, 
                            disaster_end_dt:disaster_end_dt, 
                            disaster_type_id:disaster_type_id, 
                            declaration_type_id:declaration_type_id, 
                            assistance_type_id:assistance_type_id, 
                            related_service_flag:related_service_flag, 
                            related_investment_flag:related_investment_flag, 
                            related_loan_flag:related_loan_flag, 
                            lmi_percentage:lmi_percentage, 
                            is_benefit_statewide:is_benefit_statewide, 
                            is_benefit_investment:is_benefit_investment, 
                            is_benefit_empowerment:is_benefit_empowerment, 
                            is_benefit_distressed:is_benefit_distressed, 
                            is_benefit_underserved:is_benefit_underserved, 
                            is_benefit_disaster:is_benefit_disaster, 
                            notes:notes, 
                            service_type_id:service_type_id, 
                            hours:hours, 
                            cra_hours:cra_hours, 
                            is_financial_expertise:is_financial_expertise, 
                            investment_type_id:investment_type_id, 
                            cusip_number:cusip_number, 
                            maturity_dt:maturity_dt, 
                            original_amount:original_amount, book_value:book_value, 
                            unfunded_committment:unfunded_committment, 
                            percent_of_entity_funding:percent_of_entity_funding, 
                            account_number:account_number, 
                            loan_number:loan_number, 
                            loan_type_id:loan_type_id, 
                            call_code_id:call_code_id, 
                            collateral_code_id:collateral_code_id, 
                            address:address, city:city, state:state, zip:zip, 
                            term:term, 
                            is_cra_qualified:is_cra_qualified, is_3rd_party:is_3rd_party, is_affiliate:is_affiliate, 
                            state_code:state_code, county_code:county_code, 
                            tract:tract, msa:msa
                            }

        console.log(activityJSON)
        
        request
            .post('http://localhost:3001/activities')
            .send( activityJSON )
            .end((err, res) => {
            if (err) {
                console.log('addActivity() API call failed')
                dispatch(activitiesHasErrored(true))
            }
            console.log('addActivity() API call succeeded')
            dispatch(activitiesIsLoading(false))
            dispatch(getActivities())
            })
        }
}

export function deleteActivity(id) {
	return (dispatch) => {
        dispatch(activitiesIsLoading(true))

        request
            .delete('http://localhost:3001/activities/' + id)
            .end((err, res) => {
                if (err) {
                    console.log('deleteActivity() API call failed')
                    dispatch(activitiesHasErrored(true))
                }
                console.log('deleteActivity() API call succeeded')
                dispatch(activitiesIsLoading(false))
                dispatch(getActivities())
			})
	}
}

export function updateActivity(id, activity_dt, activity_type_id, purpose_code_id,
                                employee_id, entity_id, 
                                contact_name, assessment_area_id, disaster_number, 
                                disaster_start_dt, disaster_end_dt, 
                                disaster_type_id, declaration_type_id, assistance_type_id, 
                                related_service_flag, related_investment_flag, 
                                related_loan_flag, lmi_percentage, is_benefit_statewide, 
                                is_benefit_investment, is_benefit_empowerment, is_benefit_distressed, 
                                is_benefit_underserved, is_benefit_disaster, notes, 
                                service_type_id, hours, cra_hours, is_financial_expertise, 
                                investment_type_id, cusip_number, 
                                maturity_dt, original_amount, book_value, unfunded_committment, 
                                percent_of_entity_funding, account_number, 
                                loan_number, loan_type_id, call_code_id, collateral_code_id, 
                                address, city, state, zip, term, 
                                is_cra_qualified, is_3rd_party, is_affiliate, state_code, county_code, 
                                tract, msa, income_id, minority_id
                            ) 
{
	return (dispatch) => {
        dispatch(activitiesIsLoading(true))

        var activityJSON = {activity_dt:activity_dt, activity_type_id:activity_type_id, 
            purpose_code_id:purpose_code_id, 
            employee_id:employee_id, 
            entity_id:entity_id, 
            contact_name:contact_name, 
            assessment_area_id:assessment_area_id, 
            disaster_number:disaster_number, 
            disaster_start_dt:disaster_start_dt, 
            disaster_end_dt:disaster_end_dt, 
            disaster_type_id:disaster_type_id, 
            declaration_type_id:declaration_type_id, 
            assistance_type_id:assistance_type_id, 
            related_service_flag:related_service_flag, 
            related_investment_flag:related_investment_flag, 
            related_loan_flag:related_loan_flag, 
            lmi_percentage:lmi_percentage, 
            is_benefit_statewide:is_benefit_statewide, 
            is_benefit_investment:is_benefit_investment, 
            is_benefit_empowerment:is_benefit_empowerment, 
            is_benefit_distressed:is_benefit_distressed, 
            is_benefit_underserved:is_benefit_underserved, 
            is_benefit_disaster:is_benefit_disaster, 
            notes:notes, 
            service_type_id:service_type_id, 
            hours:hours, 
            cra_hours:cra_hours, 
            is_financial_expertise:is_financial_expertise, 
            investment_type_id:investment_type_id, 
            cusip_number:cusip_number, 
            maturity_dt:maturity_dt, 
            original_amount:original_amount, book_value:book_value, 
            unfunded_committment:unfunded_committment, 
            percent_of_entity_funding:percent_of_entity_funding, 
            account_number:account_number, 
            loan_number:loan_number, 
            loan_type_id:loan_type_id, 
            call_code_id:call_code_id, 
            collateral_code_id:collateral_code_id, 
            address:address, city:city, state:state, zip:zip, 
            term:term, 
            is_cra_qualified:is_cra_qualified, is_3rd_party:is_3rd_party, is_affiliate:is_affiliate, 
            state_code:state_code, county_code:county_code, 
            tract:tract, msa:msa 
            }

        request
            .put('http://localhost:3001/activities/' + id)
            .send( activityJSON )
            .end((err, res) => {
                if (err) {
                    console.log('updateActivity() API call failed')
                    dispatch(activitiesHasErrored(true))
                }
                console.log('updateActivity() API call succeeded')
                dispatch(activitiesIsLoading(false))
                dispatch(getActivities())
			})
	}
}



export function activitiesFetchDataSuccess(activities) {
    return {
        type: 'ACTIVITIES_FETCH_DATA_SUCCESS',
        activities
    }
}


export function getActivities() {
	return (dispatch) => {
        dispatch(activitiesIsLoading(true));

		request
            .get('http://localhost:3001/activities')
            .end((err, res) => {
                if (err) {
                    dispatch(activitiesHasErrored(true));
                }
        
                const activities = JSON.parse(res.text)

                dispatch(activitiesIsLoading(false))
                dispatch(activitiesFetchDataSuccess(activities))
			})
	}
}

export function getActivity(id) {
	return (dispatch) => {
        dispatch(activitiesIsLoading(true));

		request
            .get('http://localhost:3001/activities/' + id)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(activitiesHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const activityArray = JSON.parse(res.text)
                //console.log(activity)
                const activities = []
                activities.push(activityArray[0])

                dispatch(activitiesIsLoading(false))
                dispatch(activitiesFetchDataSuccess(activities))
			})
	}
}



