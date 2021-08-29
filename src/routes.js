import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const IncomingMailsList = React.lazy(() =>
  import("./views/pages/incoming-mails/IncomingMailsList")
);
const NewIncomingMail = React.lazy(() =>
  import("./views/pages/incoming-mails/NewIncomingMail")
);
const EditIncomingMail = React.lazy(() =>
  import("./views/pages/incoming-mails/EditIncomingMail")
);
const IncomingMailDetail = React.lazy(() =>
  import("./views/pages/incoming-mails/IncomingMailDetail")
);
const OutgoingMailsList = React.lazy(() =>
  import("./views/pages/outgoing-mails/OutgoingMailsList")
);
const NewOutgoingMail = React.lazy(() =>
  import("./views/pages/outgoing-mails/NewOutgoingMail")
);
const EditOutgoingMail = React.lazy(() =>
  import("./views/pages/outgoing-mails/EditOutgoingMail")
);
const OutgoingMailDetail = React.lazy(() =>
  import("./views/pages/outgoing-mails/OutgoingMailDetail")
);
const DeskFiles = React.lazy(() =>
  import("./views/pages/file-management/DeskFiles")
);
const FileOperations = React.lazy(() =>
  import("./views/pages/file-management/FileOperations")
);

const MDAsList = React.lazy(() => import("./views/pages/mdas/MDAsList"));
const NewMDA = React.lazy(() => import("./views/pages/mdas/NewMDA"));

const EditMDA = React.lazy(() => import("./views/pages/mdas/EditMDA"));
const DepartmentsList = React.lazy(() =>
  import("./views/pages/departments/DepartmentList")
);
const NewDepartment = React.lazy(() =>
  import("./views/pages/departments/NewDepartment")
);
const EditDepartment = React.lazy(() =>
  import("./views/pages/departments/EditDepartment")
);
const GeneralFileList = React.lazy(() =>
  import("./views/pages/general-files/GeneralFileList")
);
const FileContent = React.lazy(() =>
  import("./views/pages/general-files/FileContent")
);
const NewGeneralFile = React.lazy(() =>
  import("./views/pages/general-files/NewGeneralFile")
);
const EditGeneralFile = React.lazy(() =>
  import("./views/pages/general-files/EditGeneralFile")
);
const UsersList = React.lazy(() => import("./views/pages/users/UsersList"));
const NewUser = React.lazy(() => import("./views/pages/users/NewUser"));

// const Search = React.lazy(() => import("./views/pages/search/Search"));

const routes = [
  { path: "/", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/incoming-mails",
    exact: true,
    name: "Incoming Mails List",
    component: IncomingMailsList,
  },
  {
    path: "/incoming-mails/add-new",
    name: "New Incoming Mail",
    component: NewIncomingMail,
  },
  {
    path: "/incoming-mails/edit",
    name: "Edit Incoming Mail",
    component: EditIncomingMail,
  },
  {
    path: "/incoming-mails/view",
    name: "Incoming Mail",
    component: IncomingMailDetail,
  },
  {
    path: "/outgoing-mails",
    exact: true,
    name: "Outgoing Mails List",
    component: OutgoingMailsList,
  },
  {
    path: "/outgoing-mails/add-new",
    name: "New Outgoing Mail",
    component: NewOutgoingMail,
  },
  {
    path: "/outgoing-mails/edit",
    name: "Edit Outgoing Mail",
    component: EditOutgoingMail,
  },
  {
    path: "/outgoing-mails/view",
    name: "Outgoing Mail",
    component: OutgoingMailDetail,
  },
  {
    path: "/files",
    exact: true,
    name: "Desk Files",
    component: DeskFiles,
  },
  {
    path: "/files/desk-files",
    name: "Desk Files",
    component: DeskFiles,
  },
  {
    path: "/files/file-operations",
    name: "File Operations",
    component: FileOperations,
  },
  {
    path: "/mdas",
    exact: true,
    name: "MDAs List",
    component: MDAsList,
  },
  {
    path: "/mdas/add-new",
    name: "New MDA",
    component: NewMDA,
  },
  {
    path: "/mdas/edit",
    name: "MDA",
    component: EditMDA,
  },
  {
    path: `/mdas/edit/:id`,
    name: "Edit MDA",
    component: EditMDA,
  },
  {
    path: "/departments",
    exact: true,
    name: "Departments List",
    component: DepartmentsList,
  },
  {
    path: "/departments/add-new",
    name: "New Department",
    component: NewDepartment,
  },
  {
    path: "/departments/edit",
    name: "Department",
    component: EditDepartment,
  },
  {
    path: "/departments/edit/:id",
    name: "Edit Department",
    component: EditDepartment,
  },
  {
    path: "/general-files",
    exact: true,
    name: "General File List",
    component: GeneralFileList,
  },

  {
    path: "/general-files/add-new",
    name: "New General File",
    component: NewGeneralFile,
  },
  {
    path: "/general-files/edit",
    name: "Edit General File",
    component: EditGeneralFile,
  },

  {
    path: "/general-files/detail",
    name: "File Content",
    component: FileContent,
  },

  {
    path: "/users",
    exact: true,
    name: "Users List",
    component: UsersList,
  },
  {
    path: "/users/add-new",
    name: "New User",
    component: NewUser,
  },
];

export default routes;
