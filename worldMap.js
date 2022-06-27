import {
  select,
  geoPath,
  geoNaturalEarth1,
  zoom,
  event,
  scaleOrdinal,
  schemeRdYlGn,
} from 'd3';
import { loadAndProcessData } from './loadAndProcessData';

export const worldMap = (year, option) => {
	console.log("World Map:", year, option);
  const svg = select('svg');
  

  const projection = geoNaturalEarth1();
  const pathGenerator = geoPath().projection(projection);
  
	svg.selectAll("*").remove();
  const g = svg.append('g');
  

  g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({ type: 'Sphere' }));

  svg.call(
    zoom().on('zoom', () => {
      g.attr('transform', event.transform);
    })
  );
  
  // const option = "Refugees under UNHCR's mandate";

  const colorScale = scaleOrdinal();
  const colorValue = (d) => {
    if (d['properties'][option] == null)
      d['properties'][option] = 0;
    return +d['properties'][option];
  };

  loadAndProcessData(year).then((countries) => {
    // console.log(countries.features);
    // console.log(schemeRdYlGn[colorScale.domain().length]);
    if (colorScale.domain(colorScale.domain()).length != 0) {
      
    }
    // if (colorScale.domain() != 0) {
    //   colorScale
    //   .domain(countries.features.map(colorValue))
    //   .domain(colorScale.domain())
    //   .range(schemeRdYlGn[colorScale.domain().length]);
    // }
		
    colorScale
      .domain(countries.features.map(colorValue))
      .domain(colorScale.domain())
    console.log(schemeRdYlGn[colorScale.domain().length])
    
    if (schemeRdYlGn[colorScale.domain().length] != null) {
      colorScale.range(schemeRdYlGn[colorScale.domain().length]);
    } else {
      colorScale.range(schemeRdYlGn[6]);
    }
    
    // colorScale.range(schemeRdYlGn[colorScale.domain().length]);
    
    
    

    // console.log(countries.features.map(colorValue));

    const showInfo = (d) => {
      if (d['properties']['Year'] != null) {
        return (
          '\n' + option + ': ' + d['properties'][option]
        );
      }
      return '\nNo data';
    };

    g.selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', pathGenerator)
      .attr('fill', function (d) {
        if (
          d['properties']['Year'] != null &&
          +d['properties'][option] > 0
        ) {
          return colorScale(colorValue(d));
        }
        return '#dbdbdb';
      })
      .append('title')
      .text((d) => d.properties.name + showInfo(d));
  });
  
  return svg; 
};
