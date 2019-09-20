//* Packages
import React from 'react';
import styled from 'styled-components';

const Spinner = styled.i`
  font-size: 2rem;
`;

const LoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: middle;
`;

export const LoadingSpinner = () => (
  <LoadingSpinnerWrapper>
    <Spinner className='fas fa-spinner fa-spin' />
  </LoadingSpinnerWrapper>
);
