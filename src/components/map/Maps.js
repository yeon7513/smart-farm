import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
// import koreaGeoJson from '../../lib/SIDO_MAP_2022.json';
import koreaGeoJson from "../../lib/TL_SCCO_CTPRVN.json";
import styles from "./Maps.module.scss";

function Maps({ onRegionClick = () => {} }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const projection = d3.geoMercator().fitSize([width, height], koreaGeoJson);

    // projection()이 하는 일이 뭔지?
    const path = d3.geoPath().projection(projection);

    // svg 생성하는데 svgRef.current 가 왜 필요한지?
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // GeoJSON 데이터로 지도 그리기?? 어떻게 그려지는게 되는건지?
    // koreaGeoJson의 역할이 무엇인지?
    // features와 type의 하는 역할?
    svg
      .selectAll("path")
      .data(koreaGeoJson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#ccc")
      .attr("stroke", "#fff")
      .on("click", (e, d) => {
        onRegionClick(d.properties);
      })
      .on("mouseover", function () {
        d3.select(this).attr("fill", "orange");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#ccc");
      });
  }, [onRegionClick]);

  return (
    <div className={styles.maps}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Maps;
