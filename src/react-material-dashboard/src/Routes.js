import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
     
      <RouteWithLayout
        component={DashboardView}
        
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        
        layout={MinimalLayout}
        path="/not-found"
      />

    </Switch>
  );
};

export default Routes;
