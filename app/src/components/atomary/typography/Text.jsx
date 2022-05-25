import React from 'react';

const Text = ({ children, ...rootDOMAttributes}) => {
    return <p className="text" {...rootDOMAttributes}>{ children }</p>
};

export default Text;