import './hexagonBackg.css'

export const HexagonBackground = () => {

    return (
          <div className="nightFondo">
                {Array.from({ length: 30 }).map((_, index) => (
                    <div
                    key={index}
                    className="hexagon"
                    style={{
                    top: `${Math.random() * 120}%`,
                    left: `${Math.random() * 90}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    }}
                    ></div>
                ))}
              </div>
    )



}