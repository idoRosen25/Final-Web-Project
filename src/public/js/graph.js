$(() => {
  var data = [
    {
      name: "1",
      Q1: 1200,
    },
    {
      name: "2",
      Q1: 1000,
    },
    {
      name: "3",
      Q1: 500,
    },
  ];

  var options = {
    container: $("#myChart")[0],
    data,
    title: {
      text: "Orders",
    },
    subtitle: {
      text: "order subtotle",
    },
    padding: {
      top: 40,
      right: 40,
      left: 40,
      bottom: 40,
    },
    legend: {
      spacing: 40,
    },
    series: [
      {
        type: "column",
        xKey: "name",
        yKey: "Q1",
        stacked: true,
      },
    ],
  };

  agCharts.AgChart.create(options);

  console.log($("#rangeSelect"));
  $("#rangeSelect")[0].onchange = (e) => {
    console.log("change e: ", e.target.value);
    $.ajax({
      type: "POST",
      url: "/stats/range",
      data: { range: e.target.value },
      success: (data) => {
        console.log("ajax data: ", data);
      },
      error: (error) => {
        console.log("ajax error: ", error);
      },
    });
  };
});
