import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CardDisplay, Modal, CardImage } from 'elements';
import { useForm, useCheckbox } from 'hooks';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CheckboxInput,
    Form,
    FormInput,
    FormLabel,
    StyledCheckbox,
    CardSearchForm,
} from 'elements';
import { Toggle, spacing } from 'utilities';

const CardSearch = () => {
    const [searchWasSuccessful, setSearchWasSuccessful] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    return (
        <>
            <Card>
                <CardHeader as='h2'>Oracle Search</CardHeader>
                <CardBody>
                    <CardSearchForm
                        setSearchResults={setSearchResults}
                        setSearchWasSuccessful={setSearchWasSuccessful}
                    />
                </CardBody>
            </Card>

            {searchWasSuccessful && (
                <ResultsCard>
                    {console.log(searchResults)}
                    <CardHeader>Results</CardHeader>
                    <CardBody>
                        <CardDisplay>
                            {searchResults.map(card => (
                                <article key={card.id}>
                                    <Toggle>
                                        {({ isToggled, setToggle }) => (
                                            <>
                                                <CardImage
                                                    src={card.img_url.normal}
                                                    onClick={() => setToggle(true)}
                                                />

                                                {isToggled && (
                                                    <Modal isToggled={isToggled} setToggle={setToggle}>
                                                        <CardHeader>{card.name}</CardHeader>
                                                        <CardBody>
                                                            <img src={card.img_url.normal} alt={card.name} />
                                                        </CardBody>
                                                    </Modal>
                                                )}
                                            </>
                                        )}
                                    </Toggle>
                                </article>
                            ))}
                        </CardDisplay>
                    </CardBody>
                </ResultsCard>
            )}
        </>
    );
};

export default CardSearch;

const ResultsCard = styled(Card)`
    margin: ${spacing.lg} 0;
`;
