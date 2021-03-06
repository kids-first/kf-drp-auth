import React from 'react';
import { Route } from 'react-router';
import { storiesOf } from '@storybook/react';
import Pagination from './Pagination';
import ResourceRoute from 'components/ResourceRoute';
import RESOURCE_MAP from 'common/RESOURCE_MAP';

class PaginationTest extends React.Component {
  state = {
    offset: 0,
    limit: 10,
    total: 100,
  };
  render() {
    return (
      <Pagination
        onChange={page => {
          this.setState({ offset: this.state.limit * page });
        }}
        {...this.state}
      />
    );
  }
}
storiesOf('Screens', module)
  .add('Users', () => (
    <Route
      path="/:any?/:id?"
      component={props => <ResourceRoute resource={RESOURCE_MAP.users} {...props} />}
    />
  ))
  .add('Groups', () => (
    <Route
      path="/:any?/:id?"
      component={props => <ResourceRoute resource={RESOURCE_MAP.groups} {...props} />}
    />
  ));

storiesOf('Widgets', module).add('Pagination', () => <PaginationTest />);
