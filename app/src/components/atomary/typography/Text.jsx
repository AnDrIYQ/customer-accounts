import React from 'react';

const Text = ({ children, ...rootDOMAttributes}) => {
    return <p className="text" {...rootDOMAttributes} dangerouslySetInnerHTML={{__html: children}} />
};

export default Text;