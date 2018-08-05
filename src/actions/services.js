import request from 'superagent'


export function servicesHasErrored(bool) 
{
    return {
        type: 'SERVICES_HAS_ERRORED',
        hasErrored: bool
    }
}


export function servicesIsLoading(bool) 
{
    return {
        type: 'SERVICES_IS_LOADING',
        isLoading: bool
    }
}


export function addService(activity_dt, purpose_code_id, volunteer_id, organization_id, service_type_id, assessment_area_id, total_hours, cra_hours) 
{
	return (dispatch) => {
        dispatch(servicesIsLoading(true))

		request
            .post('https://cdtrax-backend-api.herokuapp.com/services')
            .send({ activity_dt:activity_dt, purpose_code_id:purpose_code_id, volunteer_id:volunteer_id, organization_id:organization_id, service_type_id:service_type_id, assessment_area_id:assessment_area_id, total_hours:total_hours, cra_hours:cra_hours })
            .end((err, res) => {
                if (err) {
                    console.log('addService() API call failed')
                    console.log(err)
                    dispatch(servicesHasErrored(true))
                }
                //console.log('addService() API call succeeded')
                dispatch(servicesIsLoading(false))
                dispatch(getServices())
			})
	}
}


export function deleteService(id) 
{
	return (dispatch) => {
        dispatch(servicesIsLoading(true))

        request
            .delete('https://cdtrax-backend-api.herokuapp.com/services/' + id)
            .end((err, res) => {
                if (err) {
                    console.log('deleteService() API call failed')
                    console.log(err)
                    dispatch(servicesHasErrored(true))
                }
                //console.log('addService() API call succeeded')
                dispatch(servicesIsLoading(false))
                dispatch(getServices())
			})
	}
}


export function updateService(id, activity_dt, purpose_code_id, volunteer_id, organization_id, service_type_id, assessment_area_id, total_hours, cra_hours) 
{
	return (dispatch) => {
        dispatch(servicesIsLoading(true))

        request
            .put('https://cdtrax-backend-api.herokuapp.com/services/' + id)
            .send({id: id, activity_dt:activity_dt, purpose_code_id:purpose_code_id, volunteer_id:volunteer_id, organization_id:organization_id, service_type_id:service_type_id, assessment_area_id:assessment_area_id, total_hours:total_hours, cra_hours:cra_hours })
            .end((err, res) => {
                if (err) {
                    console.log('updateService() API call failed')
                    console.log(err)
                    dispatch(servicesHasErrored(true))
                }
                //console.log('addService() API call succeeded')
                dispatch(servicesIsLoading(false))
                dispatch(getServices())
			})
	}
}



export function servicesFetchDataSuccess(services) 
{
    return {
        type: 'SERVICES_FETCH_DATA_SUCCESS',
        services
    }
}


export function getServices() 
{
	return (dispatch) => {
        dispatch(servicesIsLoading(true));

		request
            .get('https://cdtrax-backend-api.herokuapp.com/services')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(servicesHasErrored(true));
                }
        
                const services = JSON.parse(res.text)

                dispatch(servicesIsLoading(false))
                dispatch(servicesFetchDataSuccess(services))
			})
	}
}


export function getService(id) 
{
	return (dispatch) => {
        dispatch(servicesIsLoading(true));

		request
            .get('https://cdtrax-backend-api.herokuapp.com/services/' + id)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(servicesHasErrored(true));
                }
        
                // HACK: Rails API is returning from a SQL statement, not a bound entity call
                const service = JSON.parse(res.text)
                const services = []
                services.push(service)

                dispatch(servicesIsLoading(false))
                dispatch(servicesFetchDataSuccess(services))
			})
	}
}


