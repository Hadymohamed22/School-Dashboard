const printStudentInfo = (button) => {
  let row = button.closest(".student-row");
  let printWindow = window.open("", "", "width: 400px,height: 400px");

  let visibleCells = [];

  if (window.location.pathname === "/") {
    visibleCells = [0, 1, 2, 3];
  } else if (window.location.pathname === "/students") {
    visibleCells = [0, 1, 2, 3, 4, 6];
  } else if (window.location.pathname === "/finance") {
    visibleCells = [0, 1, 2];
  }

  const tableHeadRow = () => {
    if (window.location.pathname === "/") {
      return `<th style="text-align: start">Student Name</th>
              <th>ID</th>
              <th>Amount</th>
              <th>Grade</th>
              `;
    } else if (window.location.pathname === "/students") {
      return `<th style="text-align: start">Name</th>
              <th>ID</th>
              <th>Date</th>
              <th>Parent Name</th>
              <th>City</th>
              <th>Grade</th>`;
    } else if (window.location.pathname === "/finance") {
      return `<th style="text-align: start">Student Name</th>
              <th>ID</th>
              <th>Amount</th>
              `;
    }
  };

  const tableRowHTML = () => {
    return visibleCells
      .map((index) => `<td>${row.children[index].innerHTML}</td>`)
      .join("");
  };

  printWindow.document.write(`
    <html>
      <head>
        <title>Print Student Amount Window</title>
        <style>
          @media print{
            table{
            width: 100%;
          }
          table td{
            color: #303972;
            padding: 10px;
          }
            table thead{
              background-color: #303972;
            }
            table th{
              padding: 10px;
              color: white;
            }
          table td img{
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
            table td:first-child div{
              display: flex;
              align-items: center;
              gap: 20px;
            }
            .students-data td:nth-child(6){
                display: none
            }
            table td .class{
                background-color: transparent !important;
                color: black !important;
            }
          }
        </style>
      </head>
      <body>
        <table border="1">
        <thead>
        <tr>
            ${tableHeadRow()}
            </tr>
        </thead>
          <tbody>
          ${tableRowHTML()}
          </tbody>
        </table>
      </body>
      <script>
        window.onload = function () {
          window.print();
          window.close();
        };
      </script>
    </html>
    `);
  printWindow.document.close();
};

export default printStudentInfo;
