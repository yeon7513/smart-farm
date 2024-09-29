import * as d3 from 'd3';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import koreaGeoJson from '../../lib/TL_SCCO_CTPRVN.json';

// 한반도 벡터 지도
const Maps = forwardRef(
  ({ onRegionClick = () => {}, className, userLocation }, ref) => {
    const svgRef = useRef();
    const [selectedRegion, setSelectedRegion] = useState(null);

    useEffect(() => {
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;

      const projection = d3
        .geoMercator()
        .fitSize([width, height], koreaGeoJson);
      const path = d3.geoPath().projection(projection);
      const svg = d3.select(svgRef.current);
      // const tooltip = d3
      //   .select('#root')
      //   .append('div')
      //   .attr('class', 'map-tooltip')
      //   .style('opacity', 0)
      //   .style('position', 'absolute')
      //   .style('z-index', 1000)
      //   .style('background-color', '#fff')
      //   .style('border', '1px solid #ccc')
      //   .style('padding', '5px')
      //   .style('border-radius', '4px');

      svg
        .selectAll('path')
        .data(koreaGeoJson.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('id', (d) => d.properties.CTP_ENG_NM)
        .attr('fill', '#8adab2')
        .attr('stroke', '#fff')
        .attr('transition', 'fill 0.3s linear')
        .on('click', (e, d) => {
          const regionName = d.properties.CTP_KOR_NM;
          setSelectedRegion(regionName);
          svg.selectAll('path').attr('fill', '#8adab2');
          d3.select(e.target).attr('fill', '#00a76b');
          onRegionClick(regionName);
        })
        .on('mouseover', function (e, d) {
          // tooltip.transition().duration(200).style('opacity', 0.9);
          // tooltip
          //   .html(d.properties.CTP_KOR_NM)
          //   .style('left', `${e.pageX + 5}px`)
          //   .style('top', `${e.pageY - 28}px`);

          d3.select(this).transition().duration(300).attr('fill', '#4b9f9e');
        })
        .on('mouseout', function () {
          // tooltip.transition().duration(200).style('opacity', 0);
          d3.select(this).transition().duration(300).attr('fill', '#8adab2');
        });

      // 사용자 위치 강조 처리
      if (userLocation) {
        const [longitude, latitude] = [
          userLocation.longitude,
          userLocation.latitude,
        ];

        // 사용자 위치에 가장 가까운 지역 찾기
        const closestRegion = koreaGeoJson.features.find((feature) => {
          return d3.geoContains(feature, [longitude, latitude]);
        });

        if (closestRegion) {
          svg
            .select(`#${closestRegion.properties.CTP_ENG_NM}`)
            .attr('fill', '#4b9f9e'); // 사용자 위치 강조
          setSelectedRegion(closestRegion.properties.CTP_KOR_NM);
          onRegionClick(closestRegion.properties.CTP_KOR_NM); // 자동 클릭 처리
        }
      }

      return () => {
        d3.select('body').selectAll('.map-tooltip').remove();
      };
    }, [onRegionClick, selectedRegion, userLocation]);

    useImperativeHandle(ref, () => ({
      resetMap: () => {
        const svg = d3.select(svgRef.current);
        svg
          .selectAll('path')
          .transition()
          .duration(300)
          .attr('fill', '#8adab2');
      },
    }));

    return (
      <div className={className}>
        <svg ref={svgRef}></svg>
      </div>
    );
  }
);

export default Maps;
