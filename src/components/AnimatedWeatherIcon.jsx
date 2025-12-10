import Lottie from 'lottie-react';

// Inline Lottie animation data for weather icons
// These are simplified but still animated versions

const sunnyAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 100,
    h: 100,
    nm: "Sun",
    ddd: 0,
    assets: [],
    layers: [{
        ty: 4,
        nm: "Sun",
        sr: 1,
        ks: {
            o: { a: 0, k: 100 },
            r: { a: 1, k: [{ i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 0, s: [0] }, { t: 120, s: [360] }] },
            p: { a: 0, k: [50, 50, 0] },
            s: { a: 1, k: [{ i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] }, t: 0, s: [100, 100, 100] }, { i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] }, o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] }, t: 60, s: [110, 110, 100] }, { t: 120, s: [100, 100, 100] }] }
        },
        shapes: [
            { ty: "el", s: { a: 0, k: [40, 40] }, p: { a: 0, k: [0, 0] }, nm: "Circle" },
            { ty: "st", c: { a: 0, k: [1, 0.8, 0.2, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, nm: "Stroke" },
            { ty: "fl", c: { a: 0, k: [1, 0.85, 0.3, 1] }, o: { a: 0, k: 100 }, nm: "Fill" }
        ],
        ip: 0,
        op: 120
    }]
};

const cloudyAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 180,
    w: 100,
    h: 100,
    nm: "Cloud",
    layers: [{
        ty: 4,
        nm: "Cloud",
        ks: {
            o: { a: 0, k: 100 },
            p: { a: 1, k: [{ i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 }, t: 0, s: [50, 50, 0] }, { i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 }, t: 90, s: [55, 50, 0] }, { t: 180, s: [50, 50, 0] }] },
            s: { a: 0, k: [100, 100, 100] }
        },
        shapes: [
            { ty: "rc", d: 1, s: { a: 0, k: [60, 30] }, p: { a: 0, k: [0, 5] }, r: { a: 0, k: 15 }, nm: "Base" },
            { ty: "el", s: { a: 0, k: [35, 35] }, p: { a: 0, k: [-15, -5] }, nm: "Left" },
            { ty: "el", s: { a: 0, k: [40, 40] }, p: { a: 0, k: [10, -10] }, nm: "Top" },
            { ty: "fl", c: { a: 0, k: [0.75, 0.8, 0.85, 1] }, o: { a: 0, k: 100 }, nm: "Fill" }
        ],
        ip: 0,
        op: 180
    }]
};

const rainAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Rain",
    layers: [
        {
            ty: 4,
            nm: "Cloud",
            ks: { o: { a: 0, k: 100 }, p: { a: 0, k: [50, 35, 0] }, s: { a: 0, k: [80, 80, 100] } },
            shapes: [
                { ty: "rc", d: 1, s: { a: 0, k: [50, 25] }, p: { a: 0, k: [0, 5] }, r: { a: 0, k: 12 } },
                { ty: "el", s: { a: 0, k: [30, 30] }, p: { a: 0, k: [-12, -5] } },
                { ty: "el", s: { a: 0, k: [35, 35] }, p: { a: 0, k: [8, -8] } },
                { ty: "fl", c: { a: 0, k: [0.5, 0.55, 0.65, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 60
        },
        {
            ty: 4,
            nm: "Drop1",
            ks: {
                o: { a: 1, k: [{ t: 0, s: [100] }, { t: 30, s: [100] }, { t: 60, s: [0] }] },
                p: { a: 1, k: [{ t: 0, s: [35, 55, 0] }, { t: 60, s: [35, 85, 0] }] },
                s: { a: 0, k: [100, 100, 100] }
            },
            shapes: [
                { ty: "el", s: { a: 0, k: [4, 8] }, p: { a: 0, k: [0, 0] } },
                { ty: "fl", c: { a: 0, k: [0.4, 0.7, 1, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 60
        },
        {
            ty: 4,
            nm: "Drop2",
            ks: {
                o: { a: 1, k: [{ t: 10, s: [0] }, { t: 20, s: [100] }, { t: 50, s: [100] }, { t: 60, s: [0] }] },
                p: { a: 1, k: [{ t: 10, s: [50, 55, 0] }, { t: 60, s: [50, 80, 0] }] },
                s: { a: 0, k: [100, 100, 100] }
            },
            shapes: [
                { ty: "el", s: { a: 0, k: [4, 8] }, p: { a: 0, k: [0, 0] } },
                { ty: "fl", c: { a: 0, k: [0.4, 0.7, 1, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 60
        },
        {
            ty: 4,
            nm: "Drop3",
            ks: {
                o: { a: 1, k: [{ t: 20, s: [0] }, { t: 30, s: [100] }, { t: 55, s: [100] }, { t: 60, s: [0] }] },
                p: { a: 1, k: [{ t: 20, s: [65, 55, 0] }, { t: 60, s: [65, 80, 0] }] },
                s: { a: 0, k: [100, 100, 100] }
            },
            shapes: [
                { ty: "el", s: { a: 0, k: [4, 8] }, p: { a: 0, k: [0, 0] } },
                { ty: "fl", c: { a: 0, k: [0.4, 0.7, 1, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 60
        }
    ]
};

const snowAnimation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 100,
    h: 100,
    nm: "Snow",
    layers: [
        {
            ty: 4,
            nm: "Cloud",
            ks: { o: { a: 0, k: 100 }, p: { a: 0, k: [50, 30, 0] }, s: { a: 0, k: [70, 70, 100] } },
            shapes: [
                { ty: "rc", d: 1, s: { a: 0, k: [50, 25] }, p: { a: 0, k: [0, 5] }, r: { a: 0, k: 12 } },
                { ty: "el", s: { a: 0, k: [30, 30] }, p: { a: 0, k: [-12, -5] } },
                { ty: "el", s: { a: 0, k: [35, 35] }, p: { a: 0, k: [8, -8] } },
                { ty: "fl", c: { a: 0, k: [0.7, 0.75, 0.85, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 90
        },
        {
            ty: 4,
            nm: "Flake1",
            ks: {
                o: { a: 1, k: [{ t: 0, s: [100] }, { t: 70, s: [100] }, { t: 90, s: [0] }] },
                r: { a: 1, k: [{ t: 0, s: [0] }, { t: 90, s: [180] }] },
                p: { a: 1, k: [{ t: 0, s: [35, 50, 0] }, { t: 90, s: [30, 90, 0] }] },
                s: { a: 0, k: [100, 100, 100] }
            },
            shapes: [
                { ty: "sr", pt: { a: 0, k: 6 }, or: { a: 0, k: 5 }, ir: { a: 0, k: 2.5 }, os: { a: 0, k: 0 }, is: { a: 0, k: 0 } },
                { ty: "fl", c: { a: 0, k: [0.9, 0.95, 1, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 90
        },
        {
            ty: 4,
            nm: "Flake2",
            ks: {
                o: { a: 1, k: [{ t: 15, s: [0] }, { t: 25, s: [100] }, { t: 80, s: [100] }, { t: 90, s: [0] }] },
                r: { a: 1, k: [{ t: 15, s: [0] }, { t: 90, s: [-180] }] },
                p: { a: 1, k: [{ t: 15, s: [55, 50, 0] }, { t: 90, s: [60, 85, 0] }] },
                s: { a: 0, k: [80, 80, 100] }
            },
            shapes: [
                { ty: "sr", pt: { a: 0, k: 6 }, or: { a: 0, k: 5 }, ir: { a: 0, k: 2.5 }, os: { a: 0, k: 0 }, is: { a: 0, k: 0 } },
                { ty: "fl", c: { a: 0, k: [0.85, 0.9, 1, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 90
        },
        {
            ty: 4,
            nm: "Flake3",
            ks: {
                o: { a: 1, k: [{ t: 30, s: [0] }, { t: 40, s: [100] }, { t: 85, s: [100] }, { t: 90, s: [0] }] },
                r: { a: 1, k: [{ t: 30, s: [0] }, { t: 90, s: [120] }] },
                p: { a: 1, k: [{ t: 30, s: [70, 50, 0] }, { t: 90, s: [75, 88, 0] }] },
                s: { a: 0, k: [60, 60, 100] }
            },
            shapes: [
                { ty: "sr", pt: { a: 0, k: 6 }, or: { a: 0, k: 5 }, ir: { a: 0, k: 2.5 }, os: { a: 0, k: 0 }, is: { a: 0, k: 0 } },
                { ty: "fl", c: { a: 0, k: [0.95, 0.97, 1, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 90
        }
    ]
};

const thunderAnimation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Thunder",
    layers: [
        {
            ty: 4,
            nm: "Cloud",
            ks: { o: { a: 0, k: 100 }, p: { a: 0, k: [50, 30, 0] }, s: { a: 0, k: [75, 75, 100] } },
            shapes: [
                { ty: "rc", d: 1, s: { a: 0, k: [55, 28] }, p: { a: 0, k: [0, 5] }, r: { a: 0, k: 14 } },
                { ty: "el", s: { a: 0, k: [32, 32] }, p: { a: 0, k: [-14, -6] } },
                { ty: "el", s: { a: 0, k: [38, 38] }, p: { a: 0, k: [10, -10] } },
                { ty: "fl", c: { a: 0, k: [0.35, 0.4, 0.5, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 60
        },
        {
            ty: 4,
            nm: "Lightning",
            ks: {
                o: { a: 1, k: [{ t: 0, s: [0] }, { t: 5, s: [100] }, { t: 10, s: [0] }, { t: 15, s: [100] }, { t: 20, s: [0] }, { t: 40, s: [0] }, { t: 45, s: [100] }, { t: 50, s: [0] }] },
                p: { a: 0, k: [50, 65, 0] },
                s: { a: 0, k: [100, 100, 100] }
            },
            shapes: [
                {
                    ty: "sh",
                    ks: {
                        a: 0,
                        k: {
                            c: true,
                            v: [[-5, -20], [5, -5], [0, -5], [8, 15], [-2, 0], [-8, 0], [-5, -20]],
                            i: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                            o: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
                        }
                    }
                },
                { ty: "fl", c: { a: 0, k: [1, 0.9, 0.3, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 60
        }
    ]
};

const nightAnimation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 120,
    w: 100,
    h: 100,
    nm: "Moon",
    layers: [
        {
            ty: 4,
            nm: "Moon",
            ks: {
                o: { a: 0, k: 100 },
                p: { a: 0, k: [50, 50, 0] },
                s: { a: 1, k: [{ t: 0, s: [100, 100, 100] }, { t: 60, s: [105, 105, 100] }, { t: 120, s: [100, 100, 100] }] }
            },
            shapes: [
                { ty: "el", s: { a: 0, k: [45, 45] }, p: { a: 0, k: [0, 0] } },
                { ty: "fl", c: { a: 0, k: [0.95, 0.95, 0.85, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 120
        },
        {
            ty: 4,
            nm: "Crater",
            ks: { o: { a: 0, k: 30 }, p: { a: 0, k: [45, 45, 0] }, s: { a: 0, k: [100, 100, 100] } },
            shapes: [
                { ty: "el", s: { a: 0, k: [30, 30] }, p: { a: 0, k: [0, 0] } },
                { ty: "fl", c: { a: 0, k: [0.5, 0.5, 0.4, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 120
        },
        {
            ty: 4,
            nm: "Star1",
            ks: {
                o: { a: 1, k: [{ t: 0, s: [100] }, { t: 30, s: [30] }, { t: 60, s: [100] }, { t: 90, s: [30] }, { t: 120, s: [100] }] },
                p: { a: 0, k: [20, 25, 0] },
                s: { a: 0, k: [50, 50, 100] }
            },
            shapes: [
                { ty: "sr", pt: { a: 0, k: 4 }, or: { a: 0, k: 6 }, ir: { a: 0, k: 2 }, os: { a: 0, k: 0 }, is: { a: 0, k: 0 } },
                { ty: "fl", c: { a: 0, k: [1, 1, 0.9, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 120
        },
        {
            ty: 4,
            nm: "Star2",
            ks: {
                o: { a: 1, k: [{ t: 0, s: [50] }, { t: 40, s: [100] }, { t: 80, s: [50] }, { t: 120, s: [50] }] },
                p: { a: 0, k: [80, 30, 0] },
                s: { a: 0, k: [40, 40, 100] }
            },
            shapes: [
                { ty: "sr", pt: { a: 0, k: 4 }, or: { a: 0, k: 6 }, ir: { a: 0, k: 2 }, os: { a: 0, k: 0 }, is: { a: 0, k: 0 } },
                { ty: "fl", c: { a: 0, k: [1, 1, 0.95, 1] }, o: { a: 0, k: 100 } }
            ],
            ip: 0,
            op: 120
        }
    ]
};

// Animation map by condition
const animations = {
    Clear: sunnyAnimation,
    Clouds: cloudyAnimation,
    Rain: rainAnimation,
    Drizzle: rainAnimation,
    Snow: snowAnimation,
    Thunderstorm: thunderAnimation,
    Night: nightAnimation
};

export default function AnimatedWeatherIcon({ condition, size = 80, isNight = false }) {
    // Use night animation for clear nights
    const effectiveCondition = (condition === 'Clear' && isNight) ? 'Night' : condition;
    const animationData = animations[effectiveCondition] || animations.Clouds;

    return (
        <div className="animated-weather-icon" style={{ width: size, height: size }}>
            <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
