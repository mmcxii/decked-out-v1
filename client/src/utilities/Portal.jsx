import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.querySelector('#portal');

const Portal = props => {
    const el = document.createElement('div');

    useEffect(() => {
        if (portalRoot) {
            portalRoot.appendChild(el);
        }

        return () => {
            if (portalRoot) {
                portalRoot.removeChild(el);
            }
        };
    }, [el]);

    const { children } = props;
    return ReactDOM.createPortal(children, el);
};

export default Portal;
