import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import AdminLayout from "./layout/AdminLayout";
import BasicLayout from './layout/BasicLayout'

// Route Views
import SchoolPage from "./pages/SchoolPage";
import UsersPage from "./pages/UsersPage";
import Calendar from './pages/Calendar'
import Todo from "./pages/Todo";
import HelpPage from './pages/HelpPage'
import CovidPage from './pages/CovidPage'
import AlertPage from "./pages/AlertPage";

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
         {
           path: '/',
           exact: true,
           component: () => <Redirect to='/admin/schools' />,
           requiresLogin: true
         },
         {
           path: '/help',
           exact: true,
           component: HelpPage,
           layout: BasicLayout
         },
         {
           path: '/about',
           exact: true,
           component: () => <Redirect to='/help' />,
           layout: BasicLayout
         },
         {
           path: '/terms',
           exact: true,
           component: () => <Redirect to='/admin/schools' />,
           layout: BasicLayout
         }
       ]
