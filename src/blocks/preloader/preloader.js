import React from 'react';
import './preloader.css';

export const Preloader = ({}) => {
    return (<div className="cssload-loader">
        <div className="cssload-inner cssload-one"></div>
        <div className="cssload-inner cssload-two"></div>
        <div className="cssload-inner cssload-three"></div>
    </div>);
}

