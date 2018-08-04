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
      //badge: {
        //variant: 'danger',
        //text: '11',
      //},
    },

    {
      name: 'Investments',
      url: '/investments',
      icon: 'fa fa-thumbs-o-up',
    },

    {
      name: 'Service Hours',
      url: '/services',
      icon: 'fa fa-clock-o',
    },

    {
      name: 'Volunteers',
      url: '/volunteers',
      icon: 'icon-people',
    },

    {
      name: 'Organizations',
      url: '/organizations',
      icon: 'fa fa-institution',
    },

    {
      name: 'Reports',
      url: '/reports',
      icon: 'fa fa-newspaper-o',
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
