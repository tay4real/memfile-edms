export const navigation = [
  {
    _component: "NavGroup",
    anchor: "Incoming Mails",
    to: "/incoming-mails",

    icon_right: "fas fa-angle-left right",
    items: [
      {
        _component: "NavItem",
        anchor: "List Incoming Mails",
        to: "/incoming-mails",
        icon: "far fa-circle nav-icon",
      },
      {
        _component: "NavItem",
        anchor: "Add New Incoming Mail",
        to: "/incoming-mails/add-new",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  {
    _component: "NavGroup",
    anchor: "Outgoing Mails",
    to: "/outgoing-mails",

    items: [
      {
        _component: "NavItem",
        anchor: "List Outgoing Mails",
        to: "/outgoing-mails",
        icon: "far fa-circle nav-icon ",
      },
      {
        _component: "NavItem",
        anchor: "Add New Outgoing Mail",
        to: "/outgoing-mails/add-new",
        icon: "far fa-circle nav-icon ",
      },
    ],
  },
  {
    _component: "NavGroup",
    anchor: "File Management",
    to: "/files",

    items: [
      {
        _component: "NavItem",
        anchor: "Files at Desk",
        to: "/files/desk-files",
        icon: "far fa-circle nav-icon ",
      },
      {
        _component: "NavItem",
        anchor: "File Operations",
        to: "/files/file-operations",
        icon: "far fa-circle nav-icon ",
      },
    ],
  },
];

export const admin_nav = [
  {
    _component: "NavGroup",
    anchor: "MDAs",
    to: "/mdas",
    //  icon: "fas fa-angle-left right",
    items: [
      {
        _component: "NavItem",
        anchor: "List MDAs",
        to: "/mdas",
        icon: "far fa-circle nav-icon",
      },
      {
        _component: "NavItem",
        anchor: "Add New MDA",
        to: "/mdas/add-new",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  {
    _component: "NavGroup",
    anchor: "Departments",
    to: "/departments",
    // icon: "fas fa-angle-left right",
    items: [
      {
        _component: "NavItem",
        anchor: "List Departments",
        to: "/departments",
        icon: "far fa-circle nav-icon",
      },
      {
        _component: "NavItem",
        anchor: "Add New Department",
        to: "/departments/add-new",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  {
    _component: "NavGroup",
    anchor: "General Files",
    to: "/general-files",
    icon: "fas fa-angle-left right",
    items: [
      {
        _component: "NavItem",
        anchor: "General Files",
        to: "/general-files",
        icon: "far fa-circle nav-icon",
      },
      {
        _component: "NavItem",
        anchor: "Add New File",
        to: "/general-files/add-new",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  // {
  //   _component: "NavGroup",
  //   anchor: "Personal Files",
  //   to: "/personal-files",
  //   icon: "fas fa-angle-left right",
  //   items: [
  //     {
  //       _component: "NavItem",
  //       anchor: "Personal Files List",
  //       to: "/personal-files",
  //       icon: "far fa-circle nav-icon",
  //     },
  //     {
  //       _component: "NavItem",
  //       anchor: "Add New File",
  //       to: "/personal-files/add-new",
  //       icon: "far fa-circle nav-icon",
  //     },
  //   ],
  // },
  {
    _component: "NavGroup",
    anchor: "User Management",
    to: "/users",
    icon: "fas fa-angle-left right",
    items: [
      {
        _component: "NavItem",
        anchor: "List Users",
        to: "/users",
        icon: "far fa-circle nav-icon",
      },
      {
        _component: "NavItem",
        anchor: "Add New User",
        to: "/users/add-new",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
];
