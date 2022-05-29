import React from 'react';
import Grid from "../containers/Grid";

const Panel = ({ children, rounded }) => {
    return (
        <div className={`theme_color shadow-md ${rounded ? 'rounded' : ''} w-full`}>
            <Grid VA="center" HA="space" PD="mx-16 my-8" GAP FULL>
                { children }
            </Grid>
        </div>
    );
};

export default Panel;