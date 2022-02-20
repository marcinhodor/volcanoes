import { useState, useMemo } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const BubbleMap = ({ worldAtlas, data, openDetails, cilckedItem }) => {
  const { land, interiors } = worldAtlas;

  const [hoveredItem, setHoveredItem] = useState(null);

  const hoveredClass = (i) => (i === hoveredItem ? "hovered" : "");
  const clickedClass = (i) => (i === cilckedItem ? "clicked" : "");

  return (
    <g className="marks">
      {useMemo(
        () => (
          <>
            <path className="sphere" d={path({ type: "Sphere" })} />
            <path className="graticules" d={path(graticule())} />
            {land.features.map((feature) => (
              <path className="land" d={path(feature)} key={feature} />
            ))}
            <path className="interiors" d={path(interiors)} />
          </>
        ),
        [land, interiors] //path, graticule,
      )}
      {data.map((d, i) => {
        const [x, y] = projection(d.coords);
        return (
          <polygon
            className={`${hoveredClass(i)} ${clickedClass(i)}`}
            points={`${x},${y - 5} ${x - 5},${y + 5} ${x + 5},${y + 5}`}
            key={i}
            onMouseEnter={() => setHoveredItem(i)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => openDetails(d, i)}
          >
            <title>{d.Volcano_Name + ", " + d.Country}</title>
          </polygon>
        );
      })}
    </g>
  );
};
