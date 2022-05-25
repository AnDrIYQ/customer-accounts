import React from 'react';

const Subhead = ({ children, ...rootDOMAttributes}) => {
    return <h2 className="subhead" {...rootDOMAttributes}>{ children }</h2>
};

export default Subhead;