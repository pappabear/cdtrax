import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout'

import Banks from './views/Setup/Banks'
import AddBank from './views/Setup/Banks/AddBank'
import EditBank from './views/Setup/Banks/EditBank'

import CallCodes from './views/Setup/CallCodes'
import AddCallCode from './views/Setup/CallCodes/AddCallCode'
import EditCallCode from './views/Setup/CallCodes/EditCallCode'

import CollateralCodes from './views/Setup/CollateralCodes'
import AddCollateralCode from './views/Setup/CollateralCodes/AddCollateralCode'
import EditCollateralCode from './views/Setup/CollateralCodes/EditCollateralCode'

import InvestmentTypes from './views/Setup/InvestmentTypes'
import AddInvestmentType from './views/Setup/InvestmentTypes/AddInvestmentType'
import EditInvestmentType from './views/Setup/InvestmentTypes/EditInvestmentType'

import LoanTypes from './views/Setup/LoanTypes'
import AddLoanType from './views/Setup/LoanTypes/AddLoanType'
import EditLoanType from './views/Setup/LoanTypes/EditLoanType'

import ServiceTypes from './views/Setup/ServiceTypes'
import AddServiceType from './views/Setup/ServiceTypes/AddServiceType'
import EditServiceType from './views/Setup/ServiceTypes/EditServiceType'

import PurposeCodes from './views/Setup/PurposeCodes'
import AddPurposeCode from './views/Setup/PurposeCodes/AddPurposeCode'
import EditPurposeCode from './views/Setup/PurposeCodes/EditPurposeCode'

import AssessmentAreas from './views/Setup/AssessmentAreas'
import AddAssessmentArea from './views/Setup/AssessmentAreas/AddAssessmentArea'
import EditAssessmentArea from './views/Setup/AssessmentAreas/EditAssessmentArea'

import Volunteers from './views/Volunteers'
import AddVolunteer from './views/Volunteers/AddVolunteer'
import EditVolunteer from './views/Volunteers/EditVolunteer'

import Organizations from './views/Organizations'
import AddOrganization from './views/Organizations/AddOrganization'
import EditOrganization from './views/Organizations/EditOrganization'

import Services from './views/Services'
import AddService from './views/Services/AddService'
import EditService from './views/Services/EditService'

import Loans from './views/Loans'
import AddLoan from './views/Loans/AddLoan'
import EditLoan from './views/Loans/EditLoan'

import Investments from './views/Investments'
import AddInvestment from './views/Investments/AddInvestment'
import EditInvestment from './views/Investments/EditInvestment'

import Dashboard from './views/Dashboard/Dashboard'

//function Loading() {
//  return <div>Loading...</div>;
//}

//const Dashboard = Loadable({
//  loader: () => import('./views/Dashboard'),
//  loading: Loading,
//})




// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/setup/banks', name: 'Banks', component: Banks, exact: true },
  { path: '/setup/banks/addbank', name: 'Add Bank', component: AddBank },
  { path: '/setup/banks/editbank/:id', name: 'Edit Bank', component: EditBank },
  
  { path: '/setup/callcodes', name: 'CallCodes', component: CallCodes, exact: true },
  { path: '/setup/callcodes/addcallcode', name: 'addcallcode', component: AddCallCode },
  { path: '/setup/callcodes/editcallcode/:id', name: 'editcallcode', component: EditCallCode },
  
  { path: '/setup/collateralcodes', name: 'collateralcodes', component: CollateralCodes, exact: true },
  { path: '/setup/collateralcodes/addcollateralcode', name: 'addcollateralcode', component: AddCollateralCode },
  { path: '/setup/collateralcodes/editcollateralcode/:id', name: 'editcollateralcode', component: EditCollateralCode },
  
  { path: '/setup/investmenttypes', name: 'investmenttypes', component: InvestmentTypes, exact: true },
  { path: '/setup/investmenttypes/addinvestmenttype', name: 'addinvestmenttype', component: AddInvestmentType },
  { path: '/setup/investmenttypes/editinvestmenttype/:id', name: 'editinvestmenttype', component: EditInvestmentType },

  { path: '/setup/loantypes', name: 'loantypes', component: LoanTypes, exact: true },
  { path: '/setup/loantypes/addloantype', name: 'addloantype', component: AddLoanType },
  { path: '/setup/loantypes/editloantype/:id', name: 'editloantype', component: EditLoanType },

  { path: '/setup/servicetypes', name: 'servicetypes', component: ServiceTypes, exact: true },
  { path: '/setup/servicetypes/addServiceType', name: 'addServiceType', component: AddServiceType },
  { path: '/setup/servicetypes/editServiceType/:id', name: 'editServiceType', component: EditServiceType },

  { path: '/setup/purposecodes', name: 'purposecodes', component: PurposeCodes, exact: true },
  { path: '/setup/purposecodes/addPurposeCode', name: 'addPurposeCode', component: AddPurposeCode },
  { path: '/setup/purposecodes/editPurposeCode/:id', name: 'editPurposeCode', component: EditPurposeCode },

  { path: '/setup/assessmentareas', name: 'assessmentareas', component: AssessmentAreas, exact: true },
  { path: '/setup/assessmentareas/addAssessmentArea', name: 'addAssessmentArea', component: AddAssessmentArea },
  { path: '/setup/assessmentareas/editAssessmentArea/:id', name: 'editAssessmentArea', component: EditAssessmentArea },

  { path: '/volunteers', name: 'volunteers', component: Volunteers, exact: true },
  { path: '/volunteers/addVolunteer', name: 'addVolunteer', component: AddVolunteer },
  { path: '/volunteers/editVolunteer/:id', name: 'editVolunteer', component: EditVolunteer },

  { path: '/organizations', name: 'organizations', component: Organizations, exact: true },
  { path: '/organizations/addOrganization', name: 'addOrganization', component: AddOrganization },
  { path: '/organizations/editOrganization/:id', name: 'editOrganization', component: EditOrganization },

  { path: '/loans', name: 'loans', component: Loans, exact: true },
  { path: '/loans/AddLoan', name: 'AddLoan', component: AddLoan },
  { path: '/loans/EditLoan/:id', name: 'EditLoan', component: EditLoan },

  { path: '/investments', name: 'investments', component: Investments, exact: true },
  { path: '/investments/AddInvestment', name: 'AddInvestment', component: AddInvestment },
  { path: '/investments/EditInvestment/:id', name: 'EditInvestment', component: EditInvestment },

  { path: '/services', name: 'services', component: Services, exact: true },
  { path: '/services/AddService', name: 'AddService', component: AddService },
  { path: '/services/EditService/:id', name: 'EditService', component: EditService },

];

export default routes;
