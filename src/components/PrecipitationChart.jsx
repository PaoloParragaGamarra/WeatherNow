export default function PrecipitationChart({ hourlyData }) {
    if (!hourlyData || hourlyData.length === 0) return null;

    const maxRain = Math.max(...hourlyData.map(h => h.rain), 1);

    return (
        <div className="precipitation-chart">
            <div className="precip-header">
                <h4>💧 Precipitation Probability</h4>
                <span className="precip-subtitle">Next 48 hours</span>
            </div>

            <div className="precip-graph">
                {/* Y-axis labels */}
                <div className="precip-y-axis">
                    <span>100%</span>
                    <span>50%</span>
                    <span>0%</span>
                </div>

                {/* Bars */}
                <div className="precip-bars">
                    {hourlyData.map((hour, idx) => {
                        const height = (hour.rain / 100) * 100;
                        const isRainy = hour.rain > 50;
                        const isHigh = hour.rain > 70;

                        return (
                            <div key={idx} className="precip-bar-container">
                                <div
                                    className={`precip-bar ${isHigh ? 'high' : isRainy ? 'medium' : 'low'}`}
                                    style={{ height: `${Math.max(height, 2)}%` }}
                                >
                                    <span className="precip-tooltip">{hour.rain}%</span>
                                </div>
                                {idx % 4 === 0 && (
                                    <span className="precip-time">{hour.time}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="precip-legend">
                <div className="legend-item">
                    <span className="legend-bar low"></span>
                    <span>Low (&lt;50%)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-bar medium"></span>
                    <span>Medium (50-70%)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-bar high"></span>
                    <span>High (&gt;70%)</span>
                </div>
            </div>
        </div>
    );
}
