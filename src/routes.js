import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import DefaultLayout from "./layout/DefaultLayout";

// Route Views
import BlogOverview from "./views/BlogOverview";
import AddNewPost from "./views/AddNewPost";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import CSBCDashboard from "./views/CSBCDashboard";
import BellSchedule from './views/BellSchedule'
import PassesOverview from './views/PassesOverview'
import UsersPage from "./views/UsersPage"


export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/blog-overview",
    exact: true,
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/add-new-post",
    exact: true,
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/components-overview",
    exact: true,
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    exact: true,
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    exact: true,
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/dashboard",
    exact: true,
    layout: DefaultLayout,
    component: CSBCDashboard
  },
  {
    path: "/schedule",
    exact: true,
    layout: DefaultLayout,
    component: BellSchedule
  },
  {
    path: "/passes",
    exact: true,
    layout: DefaultLayout,
    component: PassesOverview
  },
  {
    path: "/users",
    exact: true,
    layout: DefaultLayout,
    component: UsersPage
  }
];
