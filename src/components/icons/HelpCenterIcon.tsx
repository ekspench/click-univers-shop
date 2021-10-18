import React from "react";
export const HelpCenterIcon = ({
    color = "currentColor",
    width = "17px",
    height = "18px",
    ...props
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >

            <g className="cls-2">

                <path d="M12,22.71A10.71,10.71,0,1,1,22.71,12,10.73,10.73,0,0,1,12,22.71ZM12,2.79A9.21,9.21,0,1,0,21.21,12,9.22,9.22,0,0,0,12,2.79Z" fill="#fff" />
                <path d="M12,16.77A4.77,4.77,0,1,1,16.77,12,4.78,4.78,0,0,1,12,16.77Zm0-8A3.27,3.27,0,1,0,15.27,12,3.28,3.28,0,0,0,12,8.73Z" fill="#fff" />
                <path d="M12,8.73A.76.76,0,0,1,11.25,8V2a.75.75,0,1,1,1.5,0V8A.76.76,0,0,1,12,8.73Z" fill="#fff" />
                <path d="M12,22.71a.76.76,0,0,1-.75-.75V16a.75.75,0,0,1,1.5,0V22A.76.76,0,0,1,12,22.71Z" fill="#fff" />
                <path d="M8,12.75H2a.75.75,0,1,1,0-1.5H8a.75.75,0,0,1,0,1.5Z" fill="#fff" />
                <path d="M22,12.75H16a.75.75,0,0,1,0-1.5H22a.75.75,0,0,1,0,1.5Z" fill="#fff" />
            </g>
        </svg>
    );
};
