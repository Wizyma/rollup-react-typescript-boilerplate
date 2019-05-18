import render from 'react-test-renderer';
import * as React from 'react';

import Dummy from '../Dummy';

describe('Component should render', () => {
  it('should match  with custom prop', () => {
    const comp = render.create(<Dummy title="Other Title" />)
    expect(comp.toJSON()).toMatchSnapshot();
  })

  it('should match  with default props', () => {
    const comp = render.create(<Dummy />)
    expect(comp.toJSON()).toMatchSnapshot();
  })
})
