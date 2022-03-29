import React from 'react';
import renderer from 'react-test-renderer';
import UserFavoriteList from '../components/dataDisplay/UserFavoriteList';

it('renders correctly', () => {
  const tree = renderer
    .create(<UserFavoriteList />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});