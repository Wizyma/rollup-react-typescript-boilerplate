import { string } from 'prop-types';
import * as React from 'react';

type DummyProps = {
  title?: string
}

const DummyComponent: React.FC<DummyProps> = ({ title }: DummyProps): JSX.Element => (
  <h1>{title}</h1>
);

DummyComponent.propTypes = {
  title: string
}
DummyComponent.defaultProps = {
  title: 'Dummy Component!'
}

export default DummyComponent;
