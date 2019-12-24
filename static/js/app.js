//Difine funtion to display charts
function createCharts(subject) {
  d3.json("static/data/samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(samplesObj => samplesObj.id == subject);
    var result = resultArray[0];
    console.log(result);
    var otu_ids    = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;  

    //create bar chart
    var yticks= otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse()
    console.log(yticks);
    var barData= [{
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar", 
      orientation: "h",
      
    }]
    var barLayout = {
      title: "Top 10 Bacteria Culture Found", 
      paper_bgcolor: "lavender",
      plot_bgcolor:"lavender",
      font: { color: "black", family: "Arial" },
      margin: {
        t:50, 
        l:150}
    }

    Plotly.newPlot("bar", barData, barLayout);
    //create bubble chart
    var bubbleLayout = {
      title: "Bacteria Cultures Per Subject",
      margin: {
        t:0
      },
      hovermode: "closest",
      paper_bgcolor: "lavender",
      xaxis: {
        title: "OTU ID"
      },
      margin: {
        t:30
      },
      plot_bgcolor:"lavender"
    };
    var bubbleData = 
    [{
      x: otu_ids, 
      y: sample_values, 
      text: otu_labels,
      mode: "markers",
      marker: 
      {
        size: sample_values, 
        color: otu_ids, 
        colorscale: "Jet"
      }
    }];
  
  Plotly.newPlot("bubble",bubbleData, bubbleLayout);  
  }
)}

//Difine funtion to display metadata on selection
function createMetada (subject) {
  d3.json("static/data/samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(samplesObj => samplesObj.id == subject);
    var result = resultArray [0];
    console.log(result);

    var panel = d3.select("#sample-metadata");

    //clear metadata
    panel.html("");
    
    Object.entries(result).forEach(([key,value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  })   
}


//Define optionChange to like to html file
function optionChanged(subject)
{
  console.log("dropdown selection", subject);
  createCharts(subject);
  createMetada(subject);
  createGaugeChart(subject);
}

//Initialize Page
function displayPage()
{
  console.log("Load Page")
  //Dropdown select subject 
  var selector = d3.select("#selDataset");

  //Populate the dropdown list
  d3.json("static/data/samples.json").then((data)=> {
    var subjectNames = data.names;

    subjectNames.forEach(subject => {
      selector.append("option").text(subject).property("value", subject);
    });
    
    var firstsubject = subjectNames[0];
    createCharts(firstsubject);
    createMetada(firstsubject);
    createGaugeChart(firstsubject);
  });

}

//Display page when page loads
displayPage();