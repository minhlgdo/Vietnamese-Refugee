import {
  select,
  geoPath,
  geoNaturalEarth1,
  zoom,
  event,
  scaleOrdinal,
  schemeRdYlGn,
} from 'd3';
import { worldMap } from './worldMap';

var options = ["Refugees under UNHCR's mandate", "Returned refugees", "Resettlement arrivals"];

var years = [];
for (var i = 1975; i <= 1995; i++) {
    years.push(i);
}

d3.select("#year_menu") // adding year values in year filter
		.selectAll('myOptions')
		.data(years)
		.enter()
		.append('option')
		.text(function (d) { return d; }) 
		.attr("value", function (d) { return d; });

d3.select("#view_menu") // adding categorical  values in view filter
		.selectAll('myOptions')
		.data(options)
		.enter()
		.append('option')
		.text(function (d) { return d; }) 
		.attr("value", function (d) { return d; });

worldMap(1975, "Refugees under UNHCR's mandate");

// on categorical values in view filter
d3.select("#view_menu")
		.on("change", function(d){
			const selectedViewOption = d3.select(this).property("value");
  		console.log(selectedViewOption);
      const selectedYearOption = d3.select("#year_menu").property("value");
  		console.log(selectedYearOption);
			worldMap(parseInt(selectedYearOption), selectedViewOption);
		});

d3.select("#year_menu")
		.on("change", function(d){
			const selectedViewOption = d3.select("#view_menu").property("value");
  		console.log(selectedViewOption);
      const selectedYearOption = d3.select(this).property("value");
  		console.log(selectedYearOption);
			worldMap(parseInt(selectedYearOption), selectedViewOption);
		});

