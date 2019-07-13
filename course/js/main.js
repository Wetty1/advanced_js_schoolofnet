var list = [
    {"desc": "rice", "amount": "1", "value": "5.40"},
    {"desc": "beer", "amount": "12", "value": "1.99"},
    {"desc": "meat", "amount": "1", "value": "15"}
]

function getTotal(){
  var total = 0
  for (var i in list) {
      total += list[i].value * list[i].amount
  }

  document.getElementById("totalValue").innerHTML = '$ '+formatValue(total)
  return total
}

function setList (list) {
  var table = '<thead><tr><th scope="col">Description</th><th scope="col">Amount</th><th scope="col">Value</th><th scope="col">Action</th></tr></thead>'
  table += '<tbody>'
  for (var i in list) {
      table += `<tr>
              <td>${formatDesc(list[i].desc)}</td>
              <td>${list[i].amount}</td>
              <td>$ ${formatValue(list[i].value)}</td>
              <td><button class="btn btn-success" onclick="setFormUpdate(${i})">Edit</button> 
              <button class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
            </tr>`
  }
  table += '</tbody>'

  document.getElementById("table").innerHTML = table
  getTotal()
  saveListStorage(list)
}

setList(list)

function formatDesc (desc) {
  var str = desc
  str = str.charAt(0).toUpperCase() + str.slice(1)
  return str
}

function formatValue (value){
  var str = value
  str = Number.parseFloat(str).toFixed(2) + ""
  str = str.replace(".", ",")
  return str
}

function setAdd(){
  if(!validation()) {
    return;
  }
  var desc = document.getElementById("desc").value
  var amount = document.getElementById("amount").value
  var value = document.getElementById("value").value

  var obj = {
    "desc": desc, "amount": amount, "value": value
  }

  list.unshift(obj)
  setList(list)
}

function setFormUpdate(index) {
  document.getElementById("desc").value = list[index].desc
  document.getElementById("amount").value = list[index].amount
  document.getElementById("value").value = list[index].value
  document.getElementById("spanIDUpdate").innerHTML = `<input type="hidden" id="IDobj" value="${index}">`
  document.getElementById("btnUpdate").style.display = "inline-block"
  document.getElementById("btnAdd").style.display = "none"
}

function setFormCancel () {
  document.getElementById("desc").value = ''
  document.getElementById("amount").value = ''
  document.getElementById("value").value = ''
  document.getElementById("spanIDUpdate").innerHTML = ''
  document.getElementById("btnUpdate").style.display = "none"
  document.getElementById("btnAdd").style.display = "inline-block"
  document.getElementById("errors").style.display = "none"
}

function updateData() {
  if(!validation()) {
    return;
  }
  var id = document.getElementById("IDobj").value
  var desc = document.getElementById("desc").value
  var amount = document.getElementById("amount").value
  var value = document.getElementById("value").value

  list[id] = {
    "desc": desc, "amount": amount, "value": value
  }
  setList(list)
  setFormCancel()
}

function deleteData(id) {
  if(!confirm("Delete this item?")){
    return;
  }
  if(id == 0) {
    list.shift()
  } else if (id == list.length - 1){
    list.pop()
  } else {
    var listIni = list.slice(0, id)
    var listEnd = list.splice(id + 1)
    list = listIni.concat(listEnd)
  }  
  setList(list)
}

function validation () {
  document.getElementById("errors").style.display = "none"
  var desc = document.getElementById("desc").value
  var amount = document.getElementById("amount").value
  var value = document.getElementById("value").value
  var errors = ""

  if (desc === "") {
    errors += `<p>Fill out description</p>`
  } 

  if (amount === "") {
    errors += `<p>Fill out amount</p>`
  } else if (amount != parseInt(amount)) {
    errors += `<p>Fill out a valid amount</p>`
  } 

  if (value === "") {
    errors += `<p>Fill out value</p>`
  } else if (value != parseInt(value)){
    errors += `<p>Fill out a valid value</p>`
  }

  if (errors != "") {
    document.getElementById("errors").style.display = "block"
    document.getElementById("errors").style.backgroundColor = "rgba(85, 85 ,85, 0.3)"
    document.getElementById("errors").style.color = "white"
    document.getElementById("errors").style.padding = "10px"
    document.getElementById("errors").style.borderRadius = "3px"
    document.getElementById("errors").style.margin = "10px"
    document.getElementById("errors").innerHTML = `<h3>Errors</h3>` + errors
    return 0
  } else {
    return 1
  }
}

function deleteList() {
  if(confirm("Delete this list?"))
  list = [];
  setList(list)
}

function saveListStorage(list) {
  var jsonStr = JSON.stringify(list)
  localStorage.setItem("list", jsonStr)
}

function initListStorage () {
  var testList = localStorage.getItem("list")
  if(testList) {
    list = JSON.parse(testList)
  }
  setList(list)
}
initListStorage()
