//Difine funtion to display metadata on selection
function createGaugeChart (subject) {
  d3.json("static/data/samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(samplesObj => samplesObj.id== subject);
    var result = resultArray [0];
    var wfreq = result.wfreq;
    console.log(wfreq);


    //Bonus - Create Gauge Chart 
 
    var gaugeData = [{
		domain: { x: [0, 1], y: [0, 1] },
		value: wfreq,
    title: { text: "Belly Button Washing Frequency"},
		type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 5 },
    gauge: {axis: { range: [null, 10] },
    steps: [
      { range: [0,1], color: "white" },
      { range: [1,2], color: "white" },
      { range: [3,4], color: "lightyellow" },
      { range: [4,5], color: "lightyellow" },
      { range: [5,6], color: "yellow" },
      { range: [6,7], color: "yellow" },
      { range: [7,8], color: "lightgreen" }, 
      { range: [8,10], color: "lightgreen" }]
    } 
    }];
    var layout = { width: 460, height: 450, margin: { t: 10, b: 0 }, 
    paper_bgcolor: "lavender",
    font: { color: "black", family: "Arial" }
    };

    Plotly.newPlot('gauge', gaugeData, layout);
  })   
}




