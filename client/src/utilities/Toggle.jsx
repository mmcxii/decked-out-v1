import React, { useState } from 'react';

const Toggle = ({ children }) => {
    const [isToggled, setToggle] = useState(false);

    return <>{children({ isToggled, setToggle })}</>;
};

export default Toggle;
