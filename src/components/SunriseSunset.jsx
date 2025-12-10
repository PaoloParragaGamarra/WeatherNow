import { useMemo } from 'react';

export default function SunriseSunset({ sunrise, sunset, timezone = 0 }) {
    const { sunPosition, formattedSunrise, formattedSunset, isDaytime, progress } = useMemo(() => {
        const now = Date.now() / 1000; // Current time in seconds
        const sunriseTime = sunrise;
        const sunsetTime = sunset;

        // Format times
        const formatTime = (unix) => {
            const date = new Date(unix * 1000);
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        };

        const formattedSunrise = formatTime(sunriseTime);
        const formattedSunset = formatTime(sunsetTime);

        // Calculate sun position (0-100)
        const dayLength = sunsetTime - sunriseTime;
        const isDaytime = now >= sunriseTime && now <= sunsetTime;

        let progress = 0;
        if (now < sunriseTime) {
            progress = 0;
        } else if (now > sunsetTime) {
            progress = 100;
        } else {
            progress = ((now - sunriseTime) / dayLength) * 100;
        }

        // Calculate sun position on arc (x, y coordinates)
        const angle = (progress / 100) * Math.PI; // 0 to PI for half circle
        const arcRadius = 45;
        const sunPosition = {
            x: 50 - Math.cos(angle) * arcRadius,
            y: 55 - Math.sin(angle) * arcRadius
        };

        return { sunPosition, formattedSunrise, formattedSunset, isDaytime, progress };
    }, [sunrise, sunset]);

    return (
        <div className="sunrise-sunset-card">
            <div className="sun-arc-container">
                <svg viewBox="0 0 100 60" className="sun-arc-svg">
                    {/* Horizon line */}
                    <line
                        x1="5"
                        y1="55"
                        x2="95"
                        y2="55"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="4,2"
                        className="horizon-line"
                    />

                    {/* Arc path (background) */}
                    <path
                        d="M 5 55 A 45 45 0 0 1 95 55"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeOpacity="0.2"
                        className="arc-bg"
                    />

                    {/* Arc path (progress) */}
                    <path
                        d="M 5 55 A 45 45 0 0 1 95 55"
                        fill="none"
                        stroke="url(#sunGradient)"
                        strokeWidth="3"
                        strokeDasharray={`${progress * 1.41} 141`}
                        strokeLinecap="round"
                        className="arc-progress"
                    />

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="50%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Sun icon */}
                    {progress > 0 && progress < 100 && (
                        <g transform={`translate(${sunPosition.x}, ${sunPosition.y})`}>
                            {/* Glow effect */}
                            <circle r="8" fill="url(#sunGlow)" opacity="0.5" />
                            {/* Sun body */}
                            <circle r="5" fill="#fbbf24" />
                            {/* Sun rays */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                                <line
                                    key={i}
                                    x1={Math.cos(angle * Math.PI / 180) * 6}
                                    y1={Math.sin(angle * Math.PI / 180) * 6}
                                    x2={Math.cos(angle * Math.PI / 180) * 8}
                                    y2={Math.sin(angle * Math.PI / 180) * 8}
                                    stroke="#fbbf24"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            ))}
                        </g>
                    )}

                    {/* Sunrise icon */}
                    <g transform="translate(5, 55)" className="sun-marker">
                        <text y="12" textAnchor="middle" fontSize="4" fill="currentColor" opacity="0.6">☀️</text>
                    </g>

                    {/* Sunset icon */}
                    <g transform="translate(95, 55)" className="sun-marker">
                        <text y="12" textAnchor="middle" fontSize="4" fill="currentColor" opacity="0.6">🌙</text>
                    </g>
                </svg>
            </div>

            <div className="sun-times">
                <div className="sun-time sunrise">
                    <span className="sun-emoji">🌅</span>
                    <div>
                        <div className="sun-label">Sunrise</div>
                        <div className="sun-value">{formattedSunrise}</div>
                    </div>
                </div>

                <div className="sun-status">
                    {isDaytime ? (
                        <>
                            <span className="status-icon">☀️</span>
                            <span className="status-text">Daytime</span>
                        </>
                    ) : (
                        <>
                            <span className="status-icon">🌙</span>
                            <span className="status-text">Nighttime</span>
                        </>
                    )}
                </div>

                <div className="sun-time sunset">
                    <span className="sun-emoji">🌇</span>
                    <div>
                        <div className="sun-label">Sunset</div>
                        <div className="sun-value">{formattedSunset}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
