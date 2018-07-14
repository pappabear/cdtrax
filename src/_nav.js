export default {
  items: [
    
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-bar-chart-o',
    },

    {
      name: 'Loans',
      url: '/loans',
      icon: 'fa fa-handshake-o',
      badge: {
        variant: 'danger',
        text: '11',
      },
    },

    {
      name: 'Investments',
      url: '/investments',
      icon: 'fa fa-thumbs-o-up',
      badge: {
        variant: 'danger',
        text: '9',
      },
    },

    {
      name: 'Service Hours',
      url: '/services',
      icon: 'fa fa-clock-o',
      badge: {
        variant: 'danger',
        text: '21',
      },
    },

    {
      name: 'Volunteers',
      url: '/volunteers',
      icon: 'icon-people',
      badge: {
        variant: 'danger',
        text: '21',
      },
    },

    {
      name: 'Organizations',
      url: '/organizations',
      icon: 'fa fa-institution',
      badge: {
        variant: 'danger',
        text: '8',
      },
    },

    {
      name: 'Setup',
      url: '/setup',
      icon: 'icon-settings',
      children: [
        {
          name: 'Banks',
          url: '/setup/banks',
        },
        {
          name: 'Assessment Areas',
          url: '/setup/assessmentareas',
        },
        {
          name: 'Call Codes',
          url: '/setup/callcodes',
        },
        {
          name: 'Collateral Codes',
          url: '/setup/collateralcodes',
        },
        {
          name: 'Loan Types',
          url: '/setup/loantypes',
        },
        {
          name: 'Investment Types',
          url: '/setup/investmenttypes',
        },
        {
          name: 'Service Types',
          url: '/setup/servicetypes',
        },
        {
          name: 'Purpose Codes',
          url: '/setup/purposecodes',
        },
      ],
    },
  ]
};
