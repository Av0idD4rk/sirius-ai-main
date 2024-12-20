import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between max-w-full pr-4 text-xl text-gray-500">
            <LogoIcon/>
            <span className={"-ml-4 font-medium"}>Book AI</span>
            <UserIcon/>
        </header>
    );
};

export default Header;

const LogoIcon = () =>{
    return (
        <svg width={80} height={80} viewBox="0 0 676 676" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="10%" stopColor="#ff87c7"/>
                    <stop offset="100%" stopColor="#ffe500"/>
                </linearGradient>
            </defs>
            <path
                d="M328.252 193.164C350.736 190.506 372.678 194.493 393.807 201.67C464.509 225.328 514.352 295.504 511.914 367.541C509.747 443.034 455.84 510.286 382.43 529.159C309.019 548.298 235.337 519.589 190.912 454.995C151.362 397.579 153.8 317.567 198.497 261.213C210.957 245.53 227.482 232.505 243.193 219.48C249.424 214.163 250.507 210.974 246.444 204.328C234.796 185.455 228.836 164.987 230.461 140C247.527 163.658 258.634 190.771 291.411 196.619C291.411 186.784 291.411 178.81 291.411 166.582C310.103 199.278 335.566 217.885 366.176 230.113C376.47 234.366 387.847 236.226 397.87 240.745C411.957 246.859 413.582 254.568 404.913 266.796C404.101 267.859 402.746 268.656 402.475 269.985C396.245 292.58 380.263 295.504 359.404 292.048C350.736 290.719 341.255 295.238 332.045 297.365C329.607 280.618 325.814 278.492 309.832 284.074C275.429 296.302 252.674 326.605 252.132 361.427C251.591 398.642 271.095 427.35 307.123 441.439C338.817 453.932 378.908 444.894 401.934 418.312C425.772 390.933 425.772 359.566 414.395 327.137C411.144 317.833 407.351 309.061 404.101 299.757C400.85 289.922 402.746 281.15 410.06 272.644C424.417 255.897 419.541 241.011 398.683 232.239C380.533 224.796 362.113 217.353 344.234 209.379C337.733 206.455 332.044 201.138 325.814 197.151C327.169 195.822 327.71 194.493 328.252 193.164Z"
                fill="url(#gradient)"/>
        </svg>

    )
}


const UserIcon = () => {
    return (
        <svg width={43} height={43} xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512">
            <path fill="#313131"
                d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>

        </svg>
    )
}