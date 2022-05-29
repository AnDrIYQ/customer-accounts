import React, {useEffect, useState} from 'react';

const Grid = ({children, VA, HA, COL, FULL, HALF, WRAP, GAP, HFULL, HSCREEN ,NOGROW, MG, PD, customClasses, ...rootDOMAttributes}) => {
    const getAdditionalClasses = () => {
        let newClasses = [];
        if (COL) newClasses.push('flex-col'); else newClasses.push('flex-row');
        if (FULL) newClasses.push('w-full');
        if (HFULL) newClasses.push('h-full');
        if (HALF) newClasses.push('w-2/4');
        if (HSCREEN) newClasses.push('h-screen')
        if (WRAP && typeof WRAP !== 'string') {
            newClasses.push('flex-wrap');
        } else {
            if (WRAP === 'wrap') newClasses.push('flex-wrap');
            if (WRAP === 'reverse') newClasses.push('flex-wrap-reverse');
            if (WRAP === 'no') newClasses.push('flex-nowrap');
        }
        if (GAP) {
            if (typeof GAP !== 'string') {
                newClasses.push('gap-8')
            } else {
                newClasses.push(GAP);
            }
        }
        if (MG) {
            if (typeof MG !== 'string') {
                newClasses.push('m-8')
            } else {
                newClasses.push(MG);
            }
        }
        if (PD) {
            if (typeof PD !== 'string') {
                newClasses.push('p-8')
            } else {
                newClasses.push(PD);
            }
        }
        if (NOGROW) {
            newClasses.push('grow-0')
        }
        return newClasses;
    }

    let classes = [
        'grid-component flex',
        VA === 'center' && 'items-center',
        VA === 'start' && 'items-start',
        VA === 'end' && 'items-end',
        HA === 'space' && 'justify-between',
        HA === 'around' && 'justify-around',
        HA === 'center' && 'justify-center',
        HA === 'start' && 'justify-start',
        HA === 'end' && '!justify-end',
        ...getAdditionalClasses()
    ];

    return (
        <div className={classes.join(' ').replaceAll('false', '').replace(/ +(?= )/g,'').trim() + ' ' + `${!!customClasses ? customClasses : ''}`}
             {...rootDOMAttributes}
        >
            { children }
        </div>
    );
};

export default Grid;