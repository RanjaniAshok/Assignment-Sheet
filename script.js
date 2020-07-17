var id = 1;

function addRow() {
    var insert_New_Row = $("#row")
    var new_row = '<tr id="row_' + id + '"><td width="20%"><input type="text" class="input" id="name_' + id + '"></td><td width="20%"><input type="text" class="input" id="details_' + id + '"></td><td width="15%"><input type="text" class="input" id="due_' + id + '"></td><td id="status_cell" width="15%"><select class="select input" id ="select_' + id + '" onchange=status()><option></option><option value="Not Started" class="statusOne">Not Started</option><option value="In progress" id="statusTwo">In progress</option><option value="Completed" class="statusThree">Completed</option></select></td><td width="25%"><input type="text" class="input" id="comments_' + id + '"></td><td id="checkBox"><input type="checkbox" name="row" id="checked_' + id + '" class="checked"></td></tr>'
    insert_New_Row.append(new_row)
    $("#checked_1").prop('disabled', true)
    $(`#due_${id}`).datepicker({
        changeYear: true,
    });
    id++;
}

function status() {
    var select = document.querySelectorAll("select")
    for (var i = 0; i < select.length; i++) {
        var selected = select[i].value
        if (selected == "Not Started")
            select[i].style.background = "#f08080"
        if (selected == "In progress")
            select[i].style.background = "#1e90ff"
        if (selected == "Completed")
            select[i].style.background = "#90ee90"
    }
}
$(".buttonSave").click(function () {
    remove()
    var rowCount = document.querySelectorAll("tbody tr");
    var my_table = [];
    for (var i = 1; i <= rowCount.length; i++) {

        $(`#row_${i}`).each(function () {
            var Obj = {
                Name: $(this).find(`#name_${i}`).val(),
                Details: $(this).find(`#details_${i}`).val(),
                Due: $(this).find(`#due_${i}`).val(),
                Status: $(this).find(`#select_${i}`).val(),
                comments: $(this).find(`#comments_${i}`).val()
            }
            if (Object.values(Obj).some(x => (x !== null && x !== '')))
                my_table.push(Obj)
        })
    }
    localStorage.setItem("data", JSON.stringify(my_table));
    var getData = localStorage.getItem("data")
    var convert = JSON.parse(getData)
    for (var j = 0; j < convert.length; j++) {
        var table = $("#newRow")
        var row = '<tbody id="tbody"><tr class="storageRow"><td id="Name_' + j + '" width="20%"></td><td id="Details_' + j + '" width="20%"></td><td id="Due_' + j + '" width="15%"></td><td id="Status_' + j + '"  width="15%"></td><td id="Comments_' + j + '" width="25%"></td></tr></tbody>'
        table.append(row)
        $(`#Name_${j}`).html(convert[j].Name)
        $(`#Details_${j}`).html(convert[j].Details)
        $(`#Due_${j}`).html(convert[j].Due)
        $(`#Status_${j}`).html(convert[j].Status)
        $(`#Comments_${j}`).html(convert[j].comments)
    }
})
$(".deleteRow").click(function () {
    $("input[name='row']:checked").each(function () {
        $(this).parents("tr").remove()

    });
 var rowCount = document.querySelectorAll("#row tr")
for (var i = 0; i < rowCount.length; i++) {
        rowCount[i].id = "row_" + (i + 1);
        var tableRows = document.getElementById("row_" + (i + 1))
        var dataCount = tableRows.getElementsByClassName("input")
        dataCount[0].id = "name_" + (i + 1);
        dataCount[1].id = "details_" + (i + 1);
        dataCount[2].id = "due_" + (i + 1);
        dataCount[3].id = "select_" + (i + 1);
        dataCount[4].id = "comments_" + (i + 1);
    }
    id = rowCount.length + 1;
    
});

function remove() {
    var element = document.querySelectorAll("#tbody")
    for (i = 0; i < element.length; i++)
        element[i].remove()

}
