import React from 'react';
import {AnimationTypes, ComponentTransition, ComponentTransitionList, Presets} from "react-component-transition";

const Anime = ({ children }) => {
    return (
        <ComponentTransitionList enterAnimation={AnimationTypes.slideUp.enter} exitAnimation={AnimationTypes.slideUp.exit}>
            { children && React.Children.toArray(children).map((child, index) => <Presets.TransitionSlideUp key={index}>
                { child }
                </Presets.TransitionSlideUp>) }
        </ComponentTransitionList>
    );
};

export default Anime;