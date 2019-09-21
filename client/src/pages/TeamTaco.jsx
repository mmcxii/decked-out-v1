//* Packages
import React from 'react';
import styled from 'styled-components';

//* Utilities
import { spacing } from 'utilities';

//* Elements
import { CardColor, CardBody, CardHeader } from 'elements';

const TeamTaco = () => {
    const teamTaco = [
        {
            name: 'John Remeto',
            github: 'Remet0',
            githubLink: 'https://github.com/Remet0',
            position: 'Back End',
            color: 'Blue',
        },
        {
            name: 'Austin Robbins',
            github: 'Jirafaro',
            githubLink: 'https://github.com/Jirafaro',
            position: 'Front End',
            color: 'Red',
        },
        {
            name: 'Zach Murphy',
            github: 'Munch-Z',
            githubLink: 'https://github.com/Munch-Z',
            position: 'Back End',
            color: 'Green',
        },
        {
            name: 'Nich Secord',
            github: 'mmcxii',
            githubLink: 'https://github.com/mmcxii',
            position: 'Front End',
            color: 'Black',
        },
    ];
    return (
        <>
            <h2>Meet Team Taco</h2>
            <Wrapper>
                {teamTaco.map(member => (
                    <CardColor color={member.color} as='article' key={member.name}>
                        <CardHeader>
                            {member.name} <Position>{member.position}</Position>
                        </CardHeader>
                        <CardBody>
                            <a href={member.githubLink} target='blank'>
                                <GitHubIcon className='fab fa-github' />
                                {member.github}
                            </a>
                        </CardBody>
                    </CardColor>
                ))}
            </Wrapper>
        </>
    );
};

export default TeamTaco;

//* Styled Components
const Wrapper = styled.section`
    display: grid;
    grid-gap: ${spacing.sm};
    padding: ${spacing.md} 0;

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Position = styled.small`
    margin-left: ${spacing.sm};
`;

const GitHubIcon = styled.i`
    font-size: 1.5rem;
    margin-right: ${spacing.sm};
`;
