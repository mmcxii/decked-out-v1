//* Packages
import React from 'react';
import styled from 'styled-components';

//* Elements
import { CardBody, CardHeader, CardImage, Modal } from 'elements';
import { spacing } from 'utilities';

const SingleCardModal = ({ isToggled, setToggle, card }) => {
    const formattedOracleText = card.oracle_text.split('\n');

    return (
        <Modal isToggled={isToggled} setToggle={setToggle}>
            <CardHeader>{card.name}</CardHeader>
            <Backsplash src={card.card_art} />

            <CardInfo>
                <CardImage src={card.img_url} alt={card.name} />
                <OracleText>
                    {formattedOracleText.map((block, index) => (
                        <p key={index}>{block}</p>
                    ))}
                </OracleText>
            </CardInfo>
        </Modal>
    );
};

export default SingleCardModal;

const CardInfo = styled(CardBody)`
    display: grid;
    grid-template-rows: max-content 1fr;
    grid-template-areas: 'card' 'oracle';

    @media screen and (min-width: 768px) {
        grid-template-columns: max-content 1fr;
        grid-template-areas: 'card oracle';
    }

    > img {
        grid-area: card;
        position: relative;
        top: -5rem;
    }
`;

const Backsplash = styled.img`
    position: relative;
    top: -15px;
    z-index: -1;
    object-fit: cover;
    object-position: 0 0;
    width: 100%;
    max-height: 300px;
`;

const OracleText = styled.section`
    grid-area: oracle;

    > p {
        font-weight: bolder;
        margin: ${spacing.xs} 0;
    }
`;
