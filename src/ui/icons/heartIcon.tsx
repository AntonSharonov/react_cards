import { FC, SVGProps } from 'react';

export const HeartIcon: FC<SVGProps<void>> = ({
                                                  fill = 'white',
                                                  width = '24',
                                                  height = '24',
                                              }) => {

    return (
        <svg
            width={ width }
            height={ height }
            viewBox="0 0 130 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill={ fill }
                  d="M 65,29 C 59,19 49,12 37,12 20,12 7,25 7,42 7,75 25,80 65,118 105,80 123,75 123,42 123,25 110,12 93,12 81,12 71,19 65,29 z"/>
        </svg>
    );
};
