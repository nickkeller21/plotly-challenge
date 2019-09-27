function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  console.log(sample);
  let url = `/metadata/${sample}`
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  let meta = d3.select("#sample-metadata");
  meta.html("");

  d3.json(url).then(data =>{
    var row = meta.append("p");
    Object.entries(data).forEach(([key, value]) => {
    var cell = row.append("p");
    cell.html(`${key}: ${value}`);
      });
  });

};

    // Use `.html("") to clear any existing metadata

  
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {
  let url = `/samples/${sample}`
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(url).then(data =>{
    console.log(data.otu_labels.slice(0,10));
    var trace1 = {
      labels: data.otu_ids.slice(0,10),
      values: data.sample_values.slice(0,10),
      hovertext: data.otu_labels.slice(0,10),
      type: 'pie'
    }
    var data1 = [trace1];
    var layout1 = {
      title: "'Bar' Chart",
    };
    Plotly.newPlot('pie', data1, layout1);



    var trace2 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: "markers",
      type: "scatter",
      hovertext: data.otu_labels,
      marker: {
        size: data.sample_values,
        color: data.otu_ids
      }
    }
    var layout2 = {
      title: "Bubble Plot",
    };
    data2 = [trace2];
    Plotly.newPlot('bubble', data2, layout2)
      });
  };

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
