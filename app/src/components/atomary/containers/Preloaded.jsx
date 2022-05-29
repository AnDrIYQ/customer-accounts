import React from 'react';

const Preloaded = ({ children, loading }) => {
    return children && React.Children.map(children, child => (
        React.cloneElement(child, {
            className: loading ? 'loading ' : 'loading finished '
        })
    ))
};

export default Preloaded;