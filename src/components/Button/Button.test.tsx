import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import {render} from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Test Button component', () => {
  test('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow(<Button onClick={mockCallBack}>Ok!</Button>);
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  test('Button component renders correctly', () => {
    const {container} = render(
        <Button>Ok</Button>
    );

    expect(container.firstChild).toBeVisible();
  })
});
