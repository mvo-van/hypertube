import React from "react";
import styleGen from "./GenericPage.module.css"

function GenericPage({ children, className, style }) {
    return (
        <div className={`${className} ${styleGen.generic}`} style={style} >
            {children}
        </div>
    );
}

export default GenericPage;