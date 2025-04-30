export const UseLoader = () => {
    const hexPath = (cx: number, cy: number, size: number) => {
      const angle_deg = 60;
      const angle_rad = (Math.PI / 180) * angle_deg;
      const points = Array.from({ length: 6 }).map((_, i) => {
        const x = cx + size * Math.cos(angle_rad * i);
        const y = cy + size * Math.sin(angle_rad * i);
        return `${x},${y}`;
      });
      return points.join(" ");
    };
  
    const size = 15;
    const positions = [
        { cx: 76.5, cy: 46 },   // top
        { cx: 58.5, cy: 76.5 }, // left
        { cx: 94.5, cy: 76.5 }, // right
        { cx: 76.5, cy: 100 },  // bottom
      ];
  
    return (
      <div className="borderCircular">
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          {positions.map((pos, idx) => (
            <polygon
              key={idx}
              points={hexPath(pos.cx, pos.cy, size)}
              stroke="#0C2A4C"
              strokeWidth="1"
              fill="none"
              className={`glow-polygon-${idx}`}
            />
          ))}
        </svg>
      </div>
    );
  };
  