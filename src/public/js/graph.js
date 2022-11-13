var defaultChartOptions = {
  data: [],
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
      yKey: "orderCount",
      stacked: true,
    },
  ],
};

function loadGraph(container, rangeOptions) {
  var options = {
    container,
    ...rangeOptions,
  };

  agCharts.AgChart.create(options);
}

function loadTopCategories() {
  $.ajax({
    type: "GET",
    url: "/stats/top-category",
    success: (data) => {
      if ($("#categoryChart")[0].children.length) {
        $("#categoryChart")[0].children[0].remove();
      }
      if (data.code === 200) {
        loadGraph($("#categoryChart")[0], {
          ...defaultChartOptions,
          ...data.stats,
        });
      } else {
        $("#categoryChart")[0].append("<h4>No Data For Graph</h4>");
      }
    },
    error: (error) => {
      console.log("ajax error: ", error);
    },
  });
}

function loadToUsers() {
  $.ajax({
    type: "GET",
    url: "/stats/top-users",
    success: (data) => {
      if ($("#usersChart")[0]?.children.length) {
        $("#usersChart")[0]?.children[0].remove();
      }
      if (data.code === 200) {
        loadGraph($("#usersChart")[0], {
          ...defaultChartOptions,
          ...data.stats,
        });
      } else {
        $("#usersChart")[0].append("<h4>No Data For Graph</h4>");
      }
    },
    error: (error) => {
      console.log("ajax error: ", error);
    },
  });
}

$(() => {
  var rangeContainer = $("#rangeChart")[0];

  loadGraph(rangeContainer, {
    ...defaultChartOptions,
    title: { text: "Orders by range" },
  });

  loadTopCategories();
  loadToUsers();

  $("#rangeSelect")[0].onchange = (e) => {
    if (e.target.value == "reset") {
      rangeContainer.children[0].remove();
    }
    $.ajax({
      type: "GET",
      url: "/stats/range/" + e.target.value,
      success: (data) => {
        if (rangeContainer.children.length) {
          rangeContainer.children[0].remove();
        }
        loadGraph(rangeContainer, {
          ...defaultChartOptions,
          ...data.rangeOptions,
        });
      },
      error: (error) => {
        console.log("ajax error: ", error);
      },
    });
  };

  $("#categoryChartBtn").onclick = () => loadTopCategories;

  $("#usersChartBtn").onclick = () => loadToUsers;
});
