import React from 'react';

const Route = ({path, component, props = {}}) => {
    const pathname = window.location.pathname;
    if (pathname.match(path)) {
        return React.createElement(component, props);
    } else {
        return null // Page not found
    }
};

export default Route;
