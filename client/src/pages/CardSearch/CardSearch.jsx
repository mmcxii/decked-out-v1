//* Packages
import React, { useState } from 'react';
import styled from 'styled-components';

//* Utilities
import { Toggle, spacing } from 'utilities';

//* Elements
import { Card, CardHeader, CardBody, CardDisplay, CardImage, CardSearchForm, LoadingSpinner } from 'elements';
import SingleCardModal from './SingleCardModal';

const CardSearch = () => {
    const [searchWasSuccessful, setSearchWasSuccessful] = useState(false);
    const [dataIsLoading, setDataIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    return (
        <>
            <Card>
                <CardHeader as='h2'>Oracle Search</CardHeader>
                <CardBody>
                    <CardSearchForm
                        setDataIsLoading={setDataIsLoading}
                        setSearchResults={setSearchResults}
                        setSearchWasSuccessful={setSearchWasSuccessful}
                    />
                </CardBody>
            </Card>
            {searchWasSuccessful && (
                <ResultsCard>
                    <CardHeader>Results</CardHeader>
                    <CardBody>
                        {dataIsLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <CardDisplay>
                                    {searchResults.map(card => (
                                        <article key={card.id}>
                                            <Toggle>
                                                {({ isToggled, setToggle }) => (
                                                    <>
                                                        <CardImage
                                                            src={card.img_url}
                                                            alt={card.name}
                                                            onClick={() => setToggle(true)}
                                                        />

                                                        {isToggled && (
                                                            <SingleCardModal
                                                                isToggled={isToggled}
                                                                setToggle={setToggle}
                                                                card={card}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </Toggle>
                                        </article>
                                    ))}
                                </CardDisplay>
                            </>
                        )}
                    </CardBody>
                </ResultsCard>
            )}
        </>
    );
};

export default CardSearch;

//* Styled Components
const ResultsCard = styled(Card)`
    margin: ${spacing.lg} 0;
`;
