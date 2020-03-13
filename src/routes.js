import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import CSBCDashboard from "./views/CSBCDashboard";
import BellSchedule from './views/BellSchedule'

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
    path: "/user-profile-lite",
    exact: true,
    layout: DefaultLayout,
    component: UserProfileLite
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
  }
]
