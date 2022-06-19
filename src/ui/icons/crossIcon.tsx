import { FC, SVGProps } from 'react';

export const CrossIcon: FC<SVGProps<void>> = ({ fill = 'white', width = '24', height = '24' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18.75 18.75L5.25 5.25"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.25 18.75L18.75 5.25"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
