/* eslint-env jest */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native'; // Linking 모듈을 가져옵니다.
import CallButton from '../CustomButton'; // CallButton 컴포넌트를 가져옵니다.

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('CallButton', () => {
  it('렌더링 성공', () => {
    const { getByText } = render(<CallButton />);
    expect(getByText('매장 주문')).toBeTruthy();
  });

  it('매장 번호로 연결 성공', () => {
    const { getByText } = render(<CallButton />);
    const button = getByText('매장 주문');

    fireEvent.press(button);
    expect(Linking.openURL).toHaveBeenCalledWith('tel:010-4040-1669');
  });
});
