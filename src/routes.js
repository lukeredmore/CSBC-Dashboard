import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import DefaultLayout from "./layout/DefaultLayout";

// Route Views
import BlogOverview from "./pages/BlogOverview";
import AddNewPost from "./pages/AddNewPost";
import ComponentsOverview from "./pages/ComponentsOverview";
import Tables from "./pages/Tables";
import BlogPosts from "./pages/BlogPosts";
import CSBCDashboard from "./pages/CSBCDashboard";
import BellSchedule from "./pages/BellSchedule";
import PassesOverview from "./pages/PassesOverview";
import UsersPage from "./pages/UsersPage";
import Todo from "./pages/Todo";


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
  },
  {
    path: "/todo",
    exact: true,
    layout: DefaultLayout,
    component: Todo
  }
];
