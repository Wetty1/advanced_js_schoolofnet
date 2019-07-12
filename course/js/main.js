var list = [
    {"desc": "rice", "amount": "1", "value": "5.40"},
    {"desc": "beer", "amount": "12", "value": "1.99"},
    {"desc": "meat", "amount": "1", "value": "15"}
]

var total = 0
  for (var i in list) {
      total += list[i].value * list[i].amount
}
console.log(total)

function setList (list) {
  var table = '<thead><tr><th scope="col">Description</th><th scope="col">Amount</th><th scope="col">Value</th><th scope="col">Action</th></tr></thead>'
  table += '<tbody>'
  for (var i in list) {
      table += `<tr>
              <td>${formatDesc(list[i].desc)}</td>
              <td>${list[i].amount}</td>
              <td>$ ${formatValue(list[i].value)}</td>
              <td><p><button class="btn btn-success" onclick="setFormUpdate(${i})">Edit</button><button class="btn btn-danger">Delete</button></p></td>
            </tr>`
  }
  table += '</tbody>'

  document.getElementById("table").innerHTML = table
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
}

function updateData() {
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


