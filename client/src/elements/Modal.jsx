import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

import { fixed, absolute, Portal } from 'utilities';
import { Card } from './Card';
import Container from './Container';

const Modal = ({ children, setToggle, isToggled }) => {
    const modalCardProps = useSpring({
        opacity: 1,
        transform: 'translate3d(0, 0px, 0)',
        from: {
            opacity: 0,
            transform: 'translate3d(0, -50px, 0)',
        },
    });

    return (
        <Portal>
            {isToggled && (
                <ModalWrapper>
                    <Container>
                        <ModalCard style={modalCardProps}>
                            {children}
                            <CloseButton onClick={() => setToggle(false)}>&times;</CloseButton>
                        </ModalCard>
                    </Container>

                    <Background onClick={() => setToggle(false)} />
                </ModalWrapper>
            )}
        </Portal>
    );
};

export default Modal;

const ModalWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${fixed({})};
`;

const ModalCard = styled(animated(Card))`
    position: relative;
    z-index: 10;
    min-width: 300px;

    @media screen and (min-width: 576px) {
        min-width: 500px;
    }
    @media screen and (min-width: 768px) {
        min-width: 650px;
    }
`;

const CloseButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 10px;
    ${absolute({ x: 'right' })};
    font-weight: bold;
    font-size: 1.5rem;
`;

const Background = styled.div`
    height: 100%;
    width: 100%;
    background: #000;
    opacity: 0.5;
    ${absolute({})};
`;
