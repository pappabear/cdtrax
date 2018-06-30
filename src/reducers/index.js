import { combineReducers } from 'redux'
import { banks, banksHasErrored, banksIsLoading } from './banks'
import { callCodes, callCodesHasErrored, callCodesIsLoading } from './callCodes'
import { collateralCodes, collateralCodesHasErrored, collateralCodesIsLoading } from './collateralCodes'
import { investmentTypes, investmentTypesHasErrored, investmentTypesIsLoading } from './investmentTypes'
import { loanTypes, loanTypesHasErrored, loanTypesIsLoading } from './loanTypes'
import { serviceTypes, serviceTypesHasErrored, serviceTypesIsLoading } from './serviceTypes'
import { purposeCodes, purposeCodesHasErrored, purposeCodesIsLoading } from './purposeCodes'
//import { disasterTypes, disasterTypesHasErrored, disasterTypesIsLoading } from './disasterTypes'
//import { declarationTypes, declarationTypesHasErrored, declarationTypesIsLoading } from './declarationTypes'
//import { assistanceTypes, assistanceTypesHasErrored, assistanceTypesIsLoading } from './assistanceTypes'
//import { branches, branchesHasErrored, branchesIsLoading } from './branches'
import { assessmentAreas, assessmentAreasHasErrored, assessmentAreasIsLoading } from './assessmentAreas'
import { volunteers, volunteersHasErrored, volunteersIsLoading } from './volunteers'
import { loans, loansHasErrored, loansIsLoading } from './loans'
import { investments, investmentsHasErrored, investmentsIsLoading } from './investments'
import { organizations, organizationsHasErrored, organizationsIsLoading } from './organizations'
//import { activities, activitiesHasErrored, activitiesIsLoading } from './activities'
//import { activityTypes, activityTypesHasErrored, activityTypesIsLoading } from './activityTypes'
import { dashboardData, dashboardHasErrored, dashboardIsLoading } from './dashboard'

const rootReducer = combineReducers({
  banks, banksHasErrored, banksIsLoading,
  callCodes, callCodesHasErrored, callCodesIsLoading,
  collateralCodes, collateralCodesHasErrored, collateralCodesIsLoading,
  investmentTypes, investmentTypesHasErrored, investmentTypesIsLoading,
  loanTypes, loanTypesHasErrored, loanTypesIsLoading,
  serviceTypes, serviceTypesHasErrored, serviceTypesIsLoading,
  purposeCodes, purposeCodesHasErrored, purposeCodesIsLoading,
  assessmentAreas, assessmentAreasHasErrored, assessmentAreasIsLoading,
  volunteers, volunteersHasErrored, volunteersIsLoading,
  loans, loansHasErrored, loansIsLoading,
  investments, investmentsHasErrored, investmentsIsLoading,
  organizations, organizationsHasErrored, organizationsIsLoading,
  dashboardData, dashboardHasErrored, dashboardIsLoading
})

export default rootReducer

