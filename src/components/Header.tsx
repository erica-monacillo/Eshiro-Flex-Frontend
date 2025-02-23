import React from 'react';

interface HeaderProps {
    isVisible: boolean;
}

const HEADER_STYLE = {
    background: "linear-gradient(to right, #000000, #1a1a1a, #2d2d2d)",
};

const HEADER_CLASS = "absolute top-0 left-0 w-full h-16 z-20 flex items-center text-primary-foreground"; // No background color
const Header: React.FC<HeaderProps> = ({ isVisible }) => {
    return (
        <div
            style={HEADER_STYLE}
            className={`${HEADER_CLASS} ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        ></div>
    );
};

export default Header;
