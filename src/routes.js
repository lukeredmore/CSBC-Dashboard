import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import AdminLayout from "./layout/AdminLayout";

// Route Views
import SchoolPage from "./pages/SchoolPage";
import BellSchedule from "./pages/BellSchedule";
import PassesOverview from "./pages/PassesOverview";
import UsersPage from "./pages/UsersPage";
import Calendar from './pages/Calendar'
import Todo from "./pages/Todo";
import HelpPage from './pages/HelpPage'
import CovidPage from './pages/CovidPage'
import AlertPage from "./pages/AlertPage";

// import TogglePage from './pages/TogglePage'
import BasicLayout from "./layout/BasicLayout"

export const adminRoutes = [
         {
           path: "/",
           exact: true,
           layout: AdminLayout,
           component: () => <Redirect to="/admin/schools" />
         },
         {
           path: "/schools",
           exact: true,
           layout: AdminLayout,
           component: SchoolPage
         },
         {
           path: "/calendar",
           exact: true,
           layout: AdminLayout,
           component: Calendar
         },
         {
           path: "/schedule",
           exact: true,
           layout: AdminLayout,
           component: BellSchedule,
           unused: true
         },
         {
           path: "/passes",
           exact: true,
           layout: AdminLayout,
           component: PassesOverview,
           unused: true
         },
         {
           path: "/users",
           exact: true,
           layout: AdminLayout,
           component: UsersPage
         },
         {
           path: "/covid-19",
           exact: true,
           layout: AdminLayout,
           component: CovidPage
         },
         {
           path: "/alerts",
           exact: true,
           layout: AdminLayout,
           component: AlertPage
         },
         {
           path: "/todo",
           exact: true,
           layout: AdminLayout,
           component: Todo
         }
       ];

export const routes = [
         //  {
         //    path: "/",
         //    exact: true,
         //    component: TogglePage,
         //    requiresLogin: true
         //  },
         {
           path: "/",
           exact: true,
           component: () => <Redirect to='/admin/schools' />,
           requiresLogin: true
         },
         {
           path: "/help",
           exact: true,
           component: HelpPage,
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
