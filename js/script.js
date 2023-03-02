
/* ----------------------------------------------------------Task 1 and 2.3 Update------------------------*/

var count = 0   //  For Row Id of Input Table and for array delete index
// Array Declaration

var inputArrPercentage = [];
var inputArr = [
    {
        name: "",
        subject: "",
        marks: "",
        select: "",  // 1 for selected and 0 for not selected
    },
    {
        name: "",
        subject: "",
        marks: "",
        select: "", // 1 for selected and 0 for not selected
    },
    {
        name: "",
        subject: "",
        marks: "",
        select: "", // 1 for selected and 0 for not selected
    },
    {
        name: "",
        subject: "",
        marks: "",
        select: "", // 1 for selected and 0 for not selected
    },
    {
        name: "",
        subject: "",
        marks: "",
        select: "", // 1 for selected and 0 for not selected
    }
]

//---- Cloning of Array and refrencing to original inputArr when refresh btn click logic-----
var intialArr = JSON.parse(JSON.stringify(inputArr));
var intialArrPercentage = JSON.parse(JSON.stringify(inputArrPercentage));

// Dynamic Update of Row Id on Delete
function updateRowId() {
    $("#inputTableGenerate tr").each((i, ele) => {
        ele.setAttribute('id', `rowid${i}`)
    })
}

// Main Table Representation after refresh btn click 

function intialRow() {
    for (i = 0; i < 5; i++) {
        $("#inputTableGenerate").append(`<tr id="rowid${count++}">  
             <td></td>
           <td><input type="text" class="form-control studentName" oninput="updateArray(this)"></td>
           <td><input type="text" class="form-control subject" oninput="updateArray(this)"></td>
           <td><input type="text" class="form-control studentMarks" oninput="updateArray(this)"></td>
           <td class="button-style"><span><button  onclick="btnFunction(this)"  class="btn btn-outline-success mt-1 btn-block">Accepted</button></span><span class="btn-style"><button  onclick="btnFunction2(this)"  class="btn btn-outline-danger  btn-block mt-1">Reject</button></span></td>
      </tr>`)
    }
    emptyArr();


}


$(document).ready(() => {

    //Generating the table for 5 static data
    inputArr.forEach(_element => {
        $("#inputTableGenerate").append(`<tr id="rowid${count++}">  
             <td></td>
           <td><input type="text" class="form-control studentName" oninput="updateArray(this)"></td>
           <td><input type="text" class="form-control subject" oninput="updateArray(this)"></td>
           <td><input type="text" class="form-control studentMarks" oninput="updateArray(this)"></td>
           <td class="button-style"><span><button  onclick="btnFunction(this)"  class="btn btn-outline-success mt-1 btn-block">Accepted</button></span><span class="btn-style"><button  onclick="btnFunction2(this)"  class="btn btn-outline-danger  btn-block mt-1">Reject</button></span></td>
      </tr>`)

    })

    /* <----------------------------------Counter Logic------------------------------------------------>*/
    addevents();
    counter();
    function counter() {
        var width = 100,
            height = 100,
            timePassed = 0,  //Upto time limit
            timeLimit = 150;  // Limit in second for counter or timer

        var fields = [{
            value: timeLimit,
            size: timeLimit,
            update: function () {
                return timePassed = timePassed + 1;
            }
        }];

        var nilArc = d3.svg.arc()
            .innerRadius(50)
            .outerRadius(70)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        var arc = d3.svg.arc()
            .innerRadius(30)
            .outerRadius(40)
            .startAngle(0)
            .endAngle(function (d) {
                return ((d.value / d.size) * 2 * Math.PI);
            });

        var svg = d3.select("#counter").html(``).append("svg")
            .attr("width", width)
            .attr("height", height);

        var field = svg.selectAll(".field")
            .data(fields)
            .enter().append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .attr("class", "field");

        var back = field.append("path")
            .attr("class", "path path--background")
            .attr("d", arc);

        var path = field.append("path")
            .attr("class", "path path--foreground");

        var label = field.append("text")
            .attr("class", "label")
            .attr("dy", ".40em");

        (function update() {

            field
                .each(function (d) {
                    d.previous = d.value, d.value = d.update(timePassed);
                });

            path.transition()
                .ease("elastic")
                .duration(500)
                .attrTween("d", arcTween);
            // Logic for showing swal box when timer is over
            if ((timeLimit - timePassed) == -1) {
                Swal.fire({
                    title: 'Your Free Trial Is Over You Can Log In To Use WithOut Time Limit',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Use WIth Time Limit',
                    denyButtonText: `Log In`
                }).then((result) => {

                    if (result.isConfirmed) {
                        counter();
                    } else if (result.isDenied) {
                        window.location.href = 'LoginPage.html'
                    }
                    else {
                        counter();
                    }
                })
                //  logic end
            }
            if ((timeLimit - timePassed) <= 10) { pulseText(); }
            else
                label
                    .text(function (d) {
                        return d.size - d.value;
                    });

            if (timePassed <= timeLimit)
                setTimeout(update, 1000 - (timePassed % 1000));
            else
                destroyTimer();

        })();

        function pulseText() {
            back.classed("pulse", true);
            label.classed("pulse", true);

            if ((timeLimit - timePassed) >= 0) {
                label.style("font-size", "40px")
                    .attr("transform", "translate(0," + +4 + ")")
                    .text(function (d) {
                        return d.size - d.value;
                    });
            }

            label.transition()
                .ease("elastic")
                .duration(900)
                .style("font-size", "25px")
                .attr("transform", "translate(0," + -10 + ")");
        }

        function destroyTimer() {
            label.transition()
                .ease("back")
                .duration(700)
                .style("opacity", "0")
                .style("font-size", "5")
                .attr("transform", "translate(0," + -40 + ")")
                .each("end", function () {
                    field.selectAll("text").remove()
                });

            path.transition()
                .ease("back")
                .duration(700)
                .attr("d", nilArc);

            back.transition()
                .ease("back")
                .duration(700)
                .attr("d", nilArc)
                .each("end", function () {
                    field.selectAll("path").remove()
                });
        }

        function arcTween(b) {
            var i = d3.interpolate({
                value: b.previous
            }, b);
            return function (t) {
                return arc(i(t));
            };
        }


    }

    /* <----------------------------------Counter Logic end------------------------------------------------>*/

    // Add empty  object to and calling addRow Html to generate row in web

    $("#addRow").on("click", function addRow() {

        var newStudentData = {
            name: "",
            subject: "",
            marks: "",
            select: "",  //1 for selected and 0 for not selected
        }
        inputArr.push(newStudentData)
        addRowHtml()
    });



});

//  addRow Html to generate row in web 

function addRowHtml() {
    $("#inputTableGenerate").append(`<tr id="rowid${count++}">
        <td></td>
        <td><input type="text" class="form-control studentName" oninput="updateArray(this)"></td>
        <td><input type="text" class="form-control subject" oninput="updateArray(this)"></td>
        <td><input type="text" class="form-control studentMarks" oninput="updateArray(this)"></td>
        <td class="button-style"><span><button  onclick="btnFunction(this)"  class="btn btn-outline-success mt-1 btn-block">Accepted</button></span><span class="btn-style"><button  onclick="btnFunction2(this)"  class="btn btn-outline-danger  btn-block mt-1">Reject</button></span><button class="btn  btn-danger btn-block button-style" onclick="common(this.parentElement.parentElement,this.parentElement.parentElement.id)" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></button></td>
        </tr>`)
    addevents();
}

// common  function call on delete btn click and update all the array and dom
function common(element, id) {
    // if (confirm("Really want to delete the record !!") == true) {
    //     element.remove();
    //     removeArr(id);
    //     updateRowId();
    //     outputTableGenerate();
    //     count--;
    // } else {
    //     alert("Record is not deleted");
    // }
    // Using swal
    Swal.fire({
        title: 'Are you sure to delete the Row?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Row has been deleted.',
                'success',
            )

            element.remove();
            removeArr(id);
            updateRowId();
            outputTableGenerate();
            count--;
        }
    })

}


//Dynamic Update of array  on user input 

function updateArray(e) {
    var id = parseInt($(e).parents('tr').attr('id').split('rowid')[1]);
    var keys = Object.keys(inputArr[id]);
    $(e).parents('tr').find('input').each((i, e) => {
        inputArr[id][keys[i]] = e.value;
    })
}

// Delete array when user click on delete btn

function removeArr(arrIndex) {
    var id = parseInt((arrIndex).split('rowid')[1]);
    inputArr.splice(id, 1);
}

// funvtion on save btn click
$("#saveData").on("click", function () {
    inputArrPercentage = [];
    $("#outputTableGenerate").html("");
    let check = false
    inputArr.forEach(element => {
        // Validation on Save Button   
        check = (element.name != "" && element.subject != "" && element.marks != "" && isNaN(element.name) && isNaN(element.subject) && !isNaN(element.marks) && !(element.marks > 100) && !(element.marks < 0))
    })
    if (check) {
        inputArr.forEach(element => {
            if (element.select == 1) {
                let mark = parseInt(element.marks)
                
                let decision1 = mark < 33 ?`<tr class="fail">
               <td></td>
               <td>${element.name}</td>
               <td>${element.subject}</td>
               <td>${element.marks}</td>          
          </tr>`: `<tr class="pass">
          <td></td>
          <td>${element.name}</td>
          <td>${element.subject}</td>
          <td>${element.marks}</td>          
     </tr>`
                $("#outputTableGenerate").append(decision1)
            }
        })
        Unique()
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'All Row Field Are Mandatory Or Enter Valid Input On Red Color Field',
        })
        $("#outputPercentageTableGenerate").html("");

    }
});

// Unique function check for duplicate name and for creating inputArrayPercentage array

function Unique() {
    var studentNames = [];
    var studentMarkSum = [];
    var totalOcc = [];
    $("#outputPercentageTableGenerate").html("")
    var k = 0;
    for (i = 0; i < inputArr.length; i++) {
        if (inputArr[i].select == 1) {
            if (!(studentNames.includes(inputArr[i].name))) {
                studentNames[k] = inputArr[i].name;
                studentMarkSum[k] = parseInt(inputArr[i].marks);
                totalOcc[k] = 1;
            }
            else {
                continue;
            }
        }
        for (j = i; j < inputArr.length - 1; j++) {
            if (inputArr[i].select == 1) {
                if (inputArr[i].name == inputArr[j + 1].name) {
                    studentMarkSum[k] = studentMarkSum[k] + parseInt(inputArr[j + 1].marks);
                    totalOcc[k]++
                }
            }


        }
        k++;
    }
    studentNames.forEach((element, index) => {
        inputArrPercentage.push({
            name: element,
            totalMarks: studentMarkSum[index],
            Occurence: totalOcc[index]
        })
    })
    $("#outputPercentageTableGenerate").html("");
    inputArrPercentage.forEach(element => {
        if (element.name != "" && element.name != null && element.totalMarks != "" && element.totalMarks != null && !isNaN(element.totalMarks)) {
            let percentage = parseInt((element.totalMarks) / (element.Occurence))
            let decision = percentage < 33 ? `<tr class = "fail">
            <td></td>
            <td>${element.name}</td>
            <td>${parseInt((element.totalMarks))}</td>
            <td>${percentage}</td>          
       </tr>`: `<tr class="pass">
       <td></td>
       <td>${element.name}</td>
       <td>${parseInt((element.totalMarks))}</td>
       <td>${percentage}</td>          
  </tr>`
            $("#outputPercentageTableGenerate").append(decision)
        }
    })
}

// FUNCTION CALLING WHEN DELETE BTN IS CLICKED SO DYNAMIC UPDATE ON GENERATED REPORT

function outputTableGenerate() {
    $("#outputTableGenerate").html("")
    inputArr.forEach(element => {
        if (element.name != "" && element.subject != "" && element.marks != "" && isNaN(element.name) && isNaN(element.subject) && !isNaN(element.marks) && !(element.marks > 100) && !(element.marks < 0)) {
            let mark = parseInt(element.marks)
       
            let decision1 = mark < 33 ?`<tr class="fail">
           <td></td>
           <td>${element.name}</td>
           <td>${element.subject}</td>
           <td>${element.marks}</td>          
      </tr>`: `<tr class="pass">
      <td></td>
      <td>${element.name}</td>
      <td>${element.subject}</td>
      <td>${element.marks}</td>          
 </tr>`
            $("#outputTableGenerate").append(decision1)
        }
    })
}
/*<------------------ Trying Dyanmic Logic--->*/
// function outputPercentageTableGenerate() {
//     $("#outputPercentageTableGenerate").html("")
//     inputArr.forEach(element => {
//         if (element.name != "" && element.subject != "" && element.marks!=""  && isNaN(element.name)  && isNaN(element.subject) && !isNaN(element.marks) && !(element.marks>100)  && !(element.marks<0)) {
//             $("#outputPercentageTableGenerate").append(`<tr>
//                 <td></td>
//                 <td>${element.name}</td>
//                 <td></td>
//                 <td>${element.marks}</td>          
//            </tr>`)
//         }
//     })
// }
// function outputPercentageTableGenerate() {
//    inputArrPercentage = [];
//     Unique();
//     $("outputPercentageTableGenerate").html("")
//     inputArrPercentage.forEach(element => {
//         if (element.name != "" && element.name != null && element.totalMarks != "" &&  element.totalMarks != null && !isNaN(element.totalMarks) ) {
//             $("#outputPercentageTableGenerate").append(`<tr>
//                 <td></td>
//                 <td>${element.name}</td>
//                 <td>${parseInt((element.totalMarks)+'/'+(element.Occurence))}</td>
//                 <td>${parseInt((element.totalMarks)/(element.Occurence))}</td>          
//            </tr>`)
//         }
//     })
// }

// function call on refresh btn to set all array to its initial state used the concept of cloning

function emptyArr() {
    inputArr = JSON.parse(JSON.stringify(intialArr));
    inputArrPercentage = JSON.parse(JSON.stringify(intialArrPercentage));
}

//  Refresh Button function
$("#refresh").on("click", function refresh() {
    $("#inputTableGenerate").html("");
    $("#outputTableGenerate").html("");
    $("#outputPercentageTableGenerate").html("");
    $("#apiDataTable").html("");
    $("#generateMatrix").html("");
    $("#generalTaskDataTable").html("")

    count = 0;
    intialRow();
    addevents();

})


// Event adding for validation

function addevents() {
    $('.studentName').each((index, element) => {
        element.addEventListener('input', validname);
    });

    $('.subject').each((index, element) => {
        element.addEventListener('input', validsubject);
    });

    $('.studentMarks').each((index, element) => {
        element.addEventListener('input', validmarks);
    });
}
//for name
function validname(e) {

    var ele = e.target;
    var value = $(ele).val();

    if (value == '' || value == null || !isNaN(value)) {
        alert('Invalid name given. OR Field Is Manadatory OR Your are Typing Number ');
        ele.style.backgroundColor = 'red';
        ele.style.color = 'white';

    }
    else {
        ele.style.backgroundColor = 'white';
        ele.style.color = 'black';
    }

}

//For subject

function validsubject(e) {
    var ele = e.target;
    var value = $(ele).val();

    if (value == '' || value == null || !isNaN(value)) {
        alert('Enter Valid Subject Name')
        ele.style.backgroundColor = 'red';
        ele.style.color = 'white';
    }
    else {
        ele.style.backgroundColor = 'white';
        ele.style.color = 'black';
    }
}


//For Marks

function validmarks(e) {
    var ele = e.target;
    var value = $(ele).val();

    if (value == null || isNaN(value) || value < 0 || value > 100 || value == '') {
        alert('Only Number Are Accepted OR Number between 0 to 100 Or Mandatory Field');
        ele.style.backgroundColor = 'red';
        ele.style.color = 'white';
    }
    else {
        ele.style.backgroundColor = 'white';
        ele.style.color = 'black';
    }
}

//  Searching 
function search() {
    $("#inputSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#outputTableGenerate tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
};

// //   Getting Option for Sorting
function gettingList() {

    var selectItem = $('#sortingList').val();
    sortTable(selectItem);
}

// Sort Table
function sortTable(select) {
    var choice = select;
    if (choice == 1) {
        
        inputArr.sort((a, b) => (a.name > b.name) ? 1 : -1);
        sortedTable();
    }
    if (choice == 2) {
        
        inputArr.sort((a, b) => (a.subject > b.subject) ? 1 : -1);
        sortedTable();
    }
    if (choice == 3) {
       
        inputArr.sort((a, b) => a.marks - b.marks);
        sortedTable();
    }
}

// 
function sortedTable() {
   
    $("#outputTableGenerate").html("");
    inputArr.forEach(element => {
        if (element.select == 1) {
            let mark = parseInt(element.marks)
            
            let decision1 = mark < 33 ?`<tr class="fail">
           <td></td>
           <td>${element.name}</td>
           <td>${element.subject}</td>
           <td>${element.marks}</td>          
      </tr>`: `<tr class="pass">
      <td></td>
      <td>${element.name}</td>
      <td>${element.subject}</td>
      <td>${element.marks}</td>          
 </tr>`
            $("#outputTableGenerate").append(decision1)
        }
    })
}

// Btn Update


function btnFunction(id) {
    var index = $(id).parents('tr').index();
    inputArr[index].select = 1;
 
    id.parentElement.nextElementSibling.firstElementChild.classList.add("btn");
    id.parentElement.nextElementSibling.firstElementChild.classList.add("mt-1");
    id.parentElement.nextElementSibling.firstElementChild.classList.add("btn-block");
    id.parentElement.nextElementSibling.firstElementChild.classList.remove("btn-danger");
    id.parentElement.nextElementSibling.firstElementChild.classList.add("btn-outline-danger");
    id.parentElement.parentElement.parentElement.classList.add("Accepted");
    id.setAttribute("class", "btn-success");
}

function btnFunction2(id) {
    var index = $(id).parents('tr').index();
    inputArr[index].select = 0;
   
    id.parentElement.previousElementSibling.firstElementChild.classList.add("btn");
    id.parentElement.previousElementSibling.firstElementChild.classList.add("mt-1");
    id.parentElement.previousElementSibling.firstElementChild.classList.add("btn-block");
    id.parentElement.previousElementSibling.firstElementChild.classList.remove("btn-success");
    id.parentElement.previousElementSibling.firstElementChild.classList.add("btn-outline-success");
    id.parentElement.parentElement.parentElement.classList.remove("Accepted");
    id.setAttribute("class", "btn-danger");

}


/*<-----------------------------------------------Task 1 and 2.3 complete------------------------------------------->*/

/*<-------------------------------------------Task 1.1 Matrix Create Logic----------------------------------------->*/
// Function For Creating Matrix

$("#matrix").on("click", function () {

    do {
        var rowNo = parseInt(prompt("How many rows would you like?"));
        if (isNaN(rowNo)) {
            alert("Enter a Valid Input")
            rowNo = ""
        }
    } while (isNaN(rowNo) || rowNo == '');

    do {
        var colNo = parseInt(prompt("How many columns would you like?"));
        if (isNaN(colNo)) {
            alert("Enter a Valid Input")
            colNo = ""
        }

    } while (isNaN(colNo) || colNo == '');

    var matrixTable = "";
    var cellNum = 0, row = rowNo, col = colNo;
    for (var r = 0; r < row; r++) {
        matrixTable += "<tr>";
        for (var c = 0; c < col; c++) {
            matrixTable += "<td>" + (++cellNum) + "</td>";
        }
        matrixTable += "</tr>";

    }
    $("#generateMatrix").html("<table border=5>" + matrixTable + "</table>");
})

/*<-------------------------------------------Task 1.1 Matrix Create Logic End----------------------------------------->*/


/*<-----------------------------------------Task 3 Start logic start--------------------------------------------------->*/
// Ajax Call
$("#generateTableBtn").on("click", function () {
    var endPoint = $("#apiInput").val();
    $.ajax({
        type: "GET",
        url: endPoint,
        success: function (data) {
            var entriesData = data.entries;
            gettingData(entriesData);
   

        }
    })
    function gettingData(entriesData) {
        entriesData.forEach(element => {
            $("#apiDataTable").append(`<tr><td>${element.API}</td><td>${element.Description}</td><td>${element.Auth}</td><td>${element.Cors}</td><td>${element.Link}</td><td>${element.Category}</td><td>${element.HTTPS}</td></tr>`)
        });
    }
})

/*<-----------------------------------------Task 3 Start logic End--------------------------------------------------->*/

/*<-----------------------------------------General Start logic Start--------------------------------------------------->*/

//General Task Logic

textGet = () => {
    $("#generalTaskDataTable").html("")
    var ele = document.querySelectorAll("input[type='text']");
    var inputVal = []
    ele.forEach((element) => {
        inputVal.push(element.value);
    })
    for (let i = 0; i < inputVal.length; i++) {
        if (inputVal[i] != "") {
            $("#generalTaskDataTable").append(`<tr>  
        <td>${inputVal[i]}</td>
      </tr>`)
        }

    }

}
/*<-----------------------------------------General Start logic End--------------------------------------------------->*/

