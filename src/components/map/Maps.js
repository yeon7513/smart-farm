import * as d3 from 'd3';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import koreaGeoJson from '../../lib/TL_SCCO_CTPRVN.json';

const Maps = forwardRef(({ onRegionClick = () => {}, className }, ref) => {
  const svgRef = useRef();
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const projection = d3.geoMercator().fitSize([width, height], koreaGeoJson);

    const path = d3.geoPath().projection(projection);

    const svg = d3.select(svgRef.current);

    const tooltipStyle = {
      position: 'absolute',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      padding: '5px',
      borderRadius: '4px',
    };

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'map-tooltip')
      .style('opacity', 0)
      .style(tooltipStyle);

    svg
      .selectAll('path')
      .data(koreaGeoJson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('id', (d) => d.properties.CTP_ENG_NM)
      .attr('fill', '#E9EFEC')
      .attr('stroke', '#fff')
      .attr('transition', 'fill 0.3s linear')
      .on('click', (e, d) => {
        const regionName = d.properties.CTP_KOR_NM;
        onRegionClick(regionName);
        setSelectedRegion(regionName);
        svg.selectAll('path').attr('fill', '#E9EFEC');
        d3.select(e.target).attr('fill', '#a2ca71');
      })
      .on('mouseover', function (e, d) {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(d.properties.CTP_KOR_NM)
          .style('left', e.pageX + 5 + 'px')
          .style('top', e.pageY - 28 + 'px');

        d3.select(this).transition().duration(300).attr('fill', '#669900');
      })
      .on('mouseout', function () {
        tooltip.transition().duration(200).style('opacity', 0);
        d3.select(this).transition().duration(300).attr('fill', '#E9EFEC');
      });
  }, [onRegionClick, selectedRegion]);

  useImperativeHandle(ref, () => ({
    resetMap: () => {
      const svg = d3.select(svgRef.current);
      svg.selectAll('path').transition().duration(300).attr('fill', '#E9EFEC');
    },
  }));

  return (
    <div className={className}>
      <svg ref={svgRef}></svg>
    </div>
  );
});

export default Maps;
