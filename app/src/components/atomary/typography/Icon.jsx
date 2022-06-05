import React, {useContext} from 'react';
import {Context} from "../../../index";

const Icon = ({ children, color, mini, avatar, customClasses, click }) => {
    const { appStore } = useContext(Context)

    const getColor = () => ({
        color: `${color !== 'theme' ? color : appStore.themeColor}`
    })

    return (
        <div onClick={click} className={"icon" + `${mini ? '--mini ' : ''}` + `${avatar ? '--avatar ' : ' '}` + customClasses} style={getColor()}>
            { children }
        </div>
    );
};

export default Icon;