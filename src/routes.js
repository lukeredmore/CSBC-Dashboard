import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import AdminLayout from "./layout/AdminLayout";

// Route Views
import AddNewPost from "./pages/AddNewPost";
import ComponentsOverview from "./pages/ComponentsOverview";
import SchoolPage from "./pages/SchoolPage";
import BellSchedule from "./pages/BellSchedule";
import PassesOverview from "./pages/PassesOverview";
import UsersPage from "./pages/UsersPage";
import Todo from "./pages/Todo";

import TogglePage from './pages/TogglePage'
import BasicLayout from "./layout/BasicLayout"

export const adminRoutes = [
  {
    path: "/",
    exact: true,
    layout: AdminLayout,
    component: () => <Redirect to="/admin/schools" />
  },
  {
    path: "/add-new-post",
    exact: true,
    layout: AdminLayout,
    component: AddNewPost
  },
  {
    path: "/components-overview",
    exact: true,
    layout: AdminLayout,
    component: ComponentsOverview
  },
  {
    path: "/schools",
    exact: true,
    layout: AdminLayout,
    component: SchoolPage
  },
  {
    path: "/schedule",
    exact: true,
    layout: AdminLayout,
    component: BellSchedule
  },
  {
    path: "/passes",
    exact: true,
    layout: AdminLayout,
    component: PassesOverview
  },
  {
    path: "/users",
    exact: true,
    layout: AdminLayout,
    component: UsersPage
  },
  {
    path: "/todo",
    exact: true,
    layout: AdminLayout,
    component: Todo
  }
];

export const routes = [
         {
           path: "/",
           exact: true,
           component: TogglePage,
           requiresLogin: true
         },
         {
           path: "/help",
           exact: true,
           component: Todo,
           layout: BasicLayout
         },
         {
           path: "/about",
           exact: true,
           component: Todo,
           layout: BasicLayout
         },
         {
           path: "/terms",
           exact: true,
           component: Todo,
           layout: BasicLayout
         }
       ];
