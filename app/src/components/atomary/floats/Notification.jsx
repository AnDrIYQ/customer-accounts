import React from 'react';

const Notification = ({ content, link, icon, ...rootAttributes }) => {
    return (
        <div className="card shadow-md bg-white p-4 rounded-md" {...rootAttributes}>
            {icon} > {content} > {link}
        </div>
    );
};

export default Notification;