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



  });
