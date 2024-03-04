const homePath = "/home/ubuntu/.jenkins/workspace/"
// const path = require('path');
// const fs = require('fs');


fetch("./sample.json")
  .then(function (response) {
    return response.json();
  })
  .then(async function (tests) {
    let placeholder = document.querySelector("#data-output");
    document.getElementById("curdate").innerHTML = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
    let out = "";
    let testJobs = tests.jobs;
    let successNumber = 0;
    let failNumber = 0;
    let totalNumber = 0;
    for (let [i, testJob] of testJobs.entries()) {
      console.log(homePath + testJob.name + "/microservices/webbff/test/e2e/goReportJSONFile/getProduct_output.json")
      await fetch("/data/" + testJob.name)
        .then(response => response.json()
          .then(data => {
            totalNumber += data.successNum + data.failNum;
            successNumber += data.successNum;
            failNumber += data.failNum;
          }))
        .catch(function (error) {
          console.log(error);
        });

      document.getElementById("totalNum").innerHTML = totalNumber;
      document.getElementById("successNum").innerHTML = successNumber;
      document.getElementById("failnum").innerHTML = failNumber;
      // console.log(fs.existsSync(homePath + testJob.name + "/microservices/webbff/test/e2e/goReportJSONFile/getProduct_output.json"))
      // await fetch(homePath + testJob.name + "/microservices/webbff/test/e2e/goReportJSONFile/getProduct_output.json")
      //   .then(response => response.json()
      //     .then(data => {
      //       console.log(data);
      //       successNumber += data.successNum;
      //       failNumber += data.failNum;
      //     }))
      //   .catch(function (error) {
      //     console.log(error);
      // });
      out += `<tr>
                <td>${i + 1}</th>
                <td>${testJob.name}</td>
                <td>${testJob.apiType}</td>
                <td><a href="${testJob.htmlurl}" target="_blank">click here</td>
              </tr>`;
      placeholder.innerHTML = out;
      //<h3><a href="${testJob.htmlurl}">${testJob.name}</a></h3>
    }


    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Success', 'Fail'],
        datasets: [{
          label: 'Test Results',
          data: [successNumber, failNumber],
          backgroundColor: [
            'rgba(0, 166, 102, 1)',
            'rgba(255, 50, 0, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        aspectRatio: 1.4,
        responsive: true,
        // maintainAspectRatio: false,
        cutout: "80%",
      },
      plugins: [{
        afterDraw: (chart) => {
          let ctx = chart.ctx;
          ctx.save();
          let centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          const text = (successNumber / totalNumber) * 100 + '%'
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = '32px Arial';
          ctx.fillText(text, centerX, centerY);
          ctx.restore();
        }
      }]
    });
  });
