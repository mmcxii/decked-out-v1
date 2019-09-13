export const absolute = ({ x = 'left', y = 'top' }) => `
    position: absolute;
    ${x}: 0;
    ${y}: 0;
`;

export const fixed = ({ x = 'left', y = 'top' }) => `
    position: fixed;
    ${x}: 0;
    ${y}: 0;
`;

export default { absolute, fixed };
