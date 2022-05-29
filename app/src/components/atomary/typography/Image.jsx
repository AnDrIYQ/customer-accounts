import React, {useEffect, useState} from 'react';
import Icon from "./Icon";
import {UserCircleIcon} from "@heroicons/react/solid";

const Image = ({ src, avatar, mini }) => {
    const [srcState, setSrc] = useState('');
    useEffect(() => {
        src?.includes('undefined') || !src ? setSrc(null) : setSrc(src)
    }, [src])

    return (
        <>{srcState ?
            <img alt="Image" src={srcState}
                           className={"object-cover shadow-md " + `${mini ? 'w-48 h-48 ' : ''}` + `${avatar ? 'rounded-full': ''}`} /> :
            <Icon className="shadow-md"><UserCircleIcon /></Icon>
        }</>
    );
};

export default Image;