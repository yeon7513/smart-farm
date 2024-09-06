import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import koreaGeoJson from '../../lib/TL_SCCO_CTPRVN.json';

function Maps({ onRegionClick = () => {}, className }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    console.log(width);
    console.log(svgRef);

    const projection = d3.geoMercator().fitSize([width, height], koreaGeoJson);

    const path = d3.geoPath().projection(projection);

    const svg = d3.select(svgRef.current);
    // .attr('width', width)
    // .attr('height', height);

    svg
      .selectAll('path')
      .data(koreaGeoJson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('id', (d) => d.properties.CTP_ENG_NM)
      .attr('fill', '#ccc')
      .attr('stroke', '#fff')
      .on('click', (e, d) => {
        const regionName = d.properties.CTP_KOR_NM;
        onRegionClick(regionName);
      })
      .on('mouseover', function () {
        d3.select(this).attr('fill', '#669900');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', '#ccc');
      });
  }, [onRegionClick]);

  return (
    <div className={className}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Maps;
