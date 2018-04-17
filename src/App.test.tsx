import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { RouteType } from "../src/types/RouteConfigType.d";

const testRoutes:RouteType[] = []

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App routes={testRoutes}/>, div);
});
