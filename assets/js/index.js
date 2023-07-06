let descr = []
let codes = []
let newData = []
let num = []
let str;
let card;

window.addEventListener('message', function (eventData) {
  // console.log('In INDEX.HTML')
  const parsedEventData = JSON.parse(eventData.data)
  // console.log(parsedEventData, "parsedEventData");
  if (parsedEventData.event_code === "custom-child-client-event") {
    console.log('Hard Log')

    // let data = parsedEventData.data.data;
    let data = parsedEventData.data;
    console.log('data---->>>>>', data)

    for (let i = 0; i < data.length; i++) {
      let id = data[i].Descr;
      let code = data[i].Code;
      console.log('id--->', id)
      console.log('code-->', code)

      if (id !== '') {
        newData.push({ "descr": id, "code": code });
        descr.push(id);
        codes.push(code);
      }
    }

    for (var item of newData) {
      // console.log('Items->', item)
      // console.log('Data from array of objects-->', item.descr)
      str += `<option value=${item.code}>${item.descr}</option>`
      // str += "<option>" + item + "</option>"
    }
    document.getElementById("eleForm1").innerHTML = str;
    descr = []
    codes = []
    newData = []
    str = ''
    console.log('finish--->')
  }

  if (parsedEventData.event_code === "pilihMerk") {
    // console.log('Hard Log')
    // console.log("\n\n\n\n\n\n\n <---- Html ---> \n\n\n\n\n\n\n\n", parsedEventData);
    // console.log("\n\n\n\n\n\n\n <---- pilihMerk Data ---> \n\n\n\n\n\n\n\n", parsedEventData.data);
    let data = parsedEventData.data;
    for (let i = 0; i < data.length; i++) {
      let id = data[i].Descr;
      let code = data[i].Code;
      // console.log('id--->', id)
      // console.log('code-->', code)

      if (id !== '') {
        newData.push({ "descr": id, "code": code });
        // descr.push(id);
        // codes.push(code);
      }
    }

    for (var item of newData) {
      // console.log('Items->', item)
      // console.log('Data from array of objects-->', item.descr)
      str += `<option value=${item.code}>${item.descr}</option>`
      // str += "<option>" + item + "</option>"
    }
    document.getElementById("eleForm2").disabled = false;
    document.getElementById("eleForm3").disabled = false;
    document.getElementById("eleForm2").innerHTML = str;

    descr = []
    codes = []
    newData = []
    str = ''
  }


  if (parsedEventData.event_code === "jangkaWaktu-childIframe") {
    // console.log('jangkaWaktu')
    // console.log("\n\n\n\n\n\n\n <---- Html ---> \n\n\n\n\n\n\n\n", parsedEventData);
    // console.log("\n\n\n\n\n\n\n <---- jangkaWaktu Data ---> \n\n\n\n\n\n\n\n", parsedEventData.data);
    let data = parsedEventData.data.result.Tenor;
    // console.log('data------>', data);
    for (let i = 0; i < data.length; i++) {
      let id = data[i];
      // let code = data[i].Code;
      // console.log('id--->', id)
      // console.log('code-->', code)

      if (id !== '') {
        num.push({ "id": id });
      }
      // console.log('num--->', num);
    }

    for (var item of num) {
      // console.log('Items->', item)
      str += `<option value=${item.id}>${item.id}</option>`
    }
    // console.log('---here---')
    document.getElementById("eleForm5").disabled = false;
    document.getElementById("submit_elektronik").disabled = false;
    document.getElementById("eleForm4").innerHTML = str;

    descr = []
    codes = []
    newData = []
    num = []
    str = ''

    data = parsedEventData.data.result.DP;
    // console.log('data------>', data);
    for (let i = 0; i < data.length; i++) {
      let id = data[i];
      // let code = data[i].Code;
      // console.log('id--->', id)
      // console.log('code-->', code)

      if (id !== '') {
        num.push({ "id": id });
      }
      // console.log('num--->', num);
    }

    for (var item of num) {
      // console.log('Items->', item)
      str += `<option value=${item.id}>${item.id}</option>`
    }
    // console.log('---here---')
    document.getElementById("submit_elektronik").disabled = false;
    document.getElementById("eleForm5").innerHTML = str;

    descr = []
    codes = []
    newData = []
    num = []
    str = ''
    // document.getElementById("eleForm6").disabled = false;
  }


  if (parsedEventData.event_code === "hitungAnda-childIframe") {
    console.log('hitungAnda-childIframe')
    console.log("\n\n\n\n\n\n\n <---- Html ---> \n\n\n\n\n\n\n\n", parsedEventData);
    console.log("\n\n\n\n\n\n\n <---- hitungAnda-childIframe Data ---> \n\n\n\n\n\n\n\n", parsedEventData.data);
    let data = parsedEventData.data
    let res = data.result.AngsuranRp
    console.log('res--->', res)
    document.getElementById("calcAmount").innerHTML = res;
    // calcAmount
  }

  if (parsedEventData.event_code === "submitLeads-childIframe") {

    // let payload = window.location.href;
    // console.log('-----payload-----', payload)
    // console.log('Added Payload code----')

    console.log('submitLeads-childIframe')
    console.log("\n\n\n\n\n\n\n <---- Html ---> \n\n\n\n\n\n\n\n", parsedEventData);
    console.log("\n\n\n\n\n\n\n <---- submitLeads-childIframe Data ---> \n\n\n\n\n\n\n\n", parsedEventData.data);
    let data = parsedEventData.data
    console.log('Data of submit leads----', data)

    let payload = JSON.parse(data.payload);
    console.log('payload 1-2---', payload);
    let statusCode = data.statusCode
    console.log('statusCode---', statusCode)

    if (statusCode == '200') {
      $("#ele_form_details").removeClass("show");
      $("#ele_form_details").addClass("hide");
      $("#success_popup").removeClass("hide");
      $("#success_popup").addClass("show");

      window.parent.postMessage(JSON.stringify({
        event_code: 'leadsSuccess',
        data: payload
      }), '*');

    }



  }

});

function formatter(keyId, validationMsg) {
  var el = document.getElementById(keyId);
  var vMsg = document.getElementById(validationMsg);

  console.log("el: ", el);
  console.log("vMsg: ", vMsg);


  el.addEventListener("keyup", function () {
    formatNumber(this);
    validateInput(this);
  });

  el.addEventListener("change", function () {
    validateInput(this);
  });

  function formatNumber(input) {
    var value = input.value.replace(/,/g, "").replace(/[^0-9]/g, "");
    var formattedValue = Number(value).toLocaleString("en-ID");
    input.value = formattedValue;
  }

  function validateInput(input) {
    var value = input.value.replace(/,/g, "").replace(/[^0-9]/g, "");
    var parsedValue = parseInt(value);

    if (parsedValue < 1000000) {
      vMsg.style.display = "block";
    } else {
      vMsg.style.display = "none";
    }
  }
}

function nextStep1(data) {
  card = data
  console.log('nextStep')
  $("#cards").addClass("hide");
  $("#ele_form").addClass("show");
  window.parent.postMessage(JSON.stringify({
    event_code: 'custom-recent-order-event',
    data: ''
  }), '*');
}

function nextStep2() {
  console.log('dana syariah step')
  $("#cards").addClass("hide");
  $(".main-container").addClass("hide");
  $("#dana_syariah").addClass("show");
}

function nextStep3() {
  console.log('mobil baru step')
  $("#cards").addClass("hide");
  $(".main-container").addClass("hide");
  $("#mobil_baru").addClass("show");
  generateOption("mobil baru")
}

function nextStep4() {
  console.log('motor baru step')
  $("#cards").addClass("hide");
  $(".main-container").addClass("hide");
  $("#motor_baru").addClass("show");
  generateOption("motor baru")
}

function calculate(name, price, installment, dp = 0) {
  console.log('calculating installment')

  price = parseInt(price.replace(/,/g, ""))
  let installmentCalc = 0
  if (name === 'mobil_baru' || name === 'motor_baru') {
    const downpaymentAmount = price * Number(dp)
    const installmentCode = installment.split('^')
    const installmentDuration = Number(installmentCode[0])
    const rate = Number(installmentCode[1])
    installmentCalc = Math.round(((price - downpaymentAmount) * (1 + rate)) / installmentDuration)
  } else if (name === 'dana_syariah') {
    const installmentCode = installment.split('^')
    const installmentDuration = Number(installmentCode[0])
    const rate = Number(installmentCode[1])
    installmentCalc = Math.round((price * (1 + rate)) / installmentDuration)
  }

  console.log(installmentCalc, "installmentCalc")
  const content = '<p>Rp. ' + Number(String(installmentCalc).replace(/,/g, "").replace(/[^0-9]/g, "")).toLocaleString("en-ID") + '<br />/Bulan</p>';

  $('.calculationAmount').html(content);

  var form = document.getElementById(name);
  form.classList.remove("show");
  $("#calculator").addClass("show");
}

function myFunction(name) {
  event.preventDefault();
  console.log('submit')

  if (name == 'dana_syariah') {
    // Retrieve the data from the 'dana_syariah' form
    const danaForm = document.getElementById("dana_syariah");
    const danaJumlahPinjaman = danaForm.querySelector("#eleForm8").value;
    const danaJangkaWaktu = danaForm.querySelector("#eleForm9").value;

    calculate(name, danaJumlahPinjaman, danaJangkaWaktu);
  }

  if (name == 'mobil_baru') {
    // Retrieve the data from the 'mobil_baru' form
    const mobilForm = document.getElementById("mobil_baru");
    const mobilHargaMobil = mobilForm.querySelector("#eleForm11").value;
    const mobilJangkaWaktu = mobilForm.querySelector("#eleForm12").value;
    const mobilUangMuka = mobilForm.querySelector("#eleForm13").value;

    calculate(name, mobilHargaMobil, mobilJangkaWaktu, mobilUangMuka);
  }


  if (name == 'motor_baru') {
    // Retrieve the data from the 'motor_baru' form
    const motorForm = document.getElementById("motor_baru");
    const motorPrice = motorForm.querySelector("#eleForm15").value;
    const motorJangkaWaktu = motorForm.querySelector("#eleForm16").value;
    const motorUangMuka = motorForm.querySelector("#eleForm17").value;

    calculate(name, motorPrice, motorJangkaWaktu, motorUangMuka);
  }

  if (name == 'elektronik') {
    // console.log('elektronik---')
    let data = {}
    let data1, data2, data3, data4, data5;

    data1 = document.getElementById("eleForm1").value;
    data2 = document.getElementById("eleForm2").value;
    data3 = document.getElementById("eleForm3").value;
    data4 = document.getElementById("eleForm4").value;
    data5 = document.getElementById("eleForm5").value;

    data.data1 = data1;
    data.data2 = data2;
    data.data3 = data3;
    data.data4 = data4;
    data.data5 = data5;

    // console.log(data, 'Data---->')
    // $("#ele_form").classList.remove("show");
    // $("#submit_form").classList.remove("hide");
    $("#ele_form").removeClass("show");
    $("#submit_form").removeClass("hide");
    $("#ele_form").addClass("hide");
    $("#submit_form").addClass("show");
    // console.log('---------')
    document.getElementById("myForm").reset();
    window.parent.postMessage(JSON.stringify({
      event_code: 'elektronik_submit',
      data: data
    }), '*');
  }

  if (name == 'ele_nextForm') {


    // console.log('--here--')
    let name, email, Tanggal, Nomor, Alamat, Kota, Jota, Tipe, kodePromo, KodeReferensi, saya1, saya2;
    let ele_data = {}

    name = $("#eleDetail1").val();
    email = $("#eleDetail2").val();
    Tanggal = $("#eleDetail3").val();
    Nomor = $("#eleDetail4").val();
    Alamat = $("#eleDetail5").val();
    // Alamat = document.getElementById("eleDetail5").value
    Kota = $("#eleDetail6").val();
    Jota = $("#eleDetail7").val();
    Tipe = $("#eleDetail8").val();
    kodePromo = $("#eleDetail9").val();
    KodeReferensi = $("#eleDetail10").val();

    // console.log(`  ${name} ${email} ${Tanggal} ${Nomor} ${Alamat} ${Kota} ${Jota} ${Tipe} ${kodePromo} ${KodeReferensi}   `)
    // console.log($("#eleDetail11").prop("checked"), 'Checkbox-->')
    saya1 = $("#eleDetail11").prop("checked")
    saya2 = $("#eleDetail12").prop("checked")

    ele_data.name = name;
    ele_data.email = email;
    ele_data.Tanggal = Tanggal;
    ele_data.Nomor = Nomor;
    ele_data.Alamat = Alamat;
    ele_data.Kota = Kota;
    ele_data.Jota = Jota;
    ele_data.Tipe = Tipe;
    ele_data.kodePromo = kodePromo;
    ele_data.KodeReferensi = KodeReferensi;
    ele_data.saya1 = saya1;
    ele_data.saya2 = saya2;

    console.log('data---> ', ele_data)
    console.log(typeof (saya1))
    if (name !== '' && email !== '' && Tanggal !== '' && Nomor !== '' && Alamat !== '' && Kota !== '' && Jota !== '' && Tipe !== '' && saya1 == true && saya2 == true) {
      console.log('In Validator Data---', ele_data);
      window.parent.postMessage(JSON.stringify({
        event_code: 'ele_nextForm',
        data: ele_data
      }), '*');
    }

  }

}

function optionSelection() {
  let x = document.getElementById("eleForm1").value;
  console.log('x-->', x);
  window.parent.postMessage(JSON.stringify({
    event_code: 'custom-select-option-1',
    data: x
  }), '*');
}

function hargaFn() {
  let inputData = document.getElementById('eleForm3').value;

  if (inputData !== '' || inputData !== null) {
    console.log('Data is there');
    document.getElementById("eleForm4").disabled = false;
    window.parent.postMessage(JSON.stringify({
      event_code: 'harga',
      data: inputData
    }), '*');
  }
}

function showDetailForm() {
  $(eleDetail8).val(card)
  $("#submit_form").removeClass("show");
  $("#submit_form").addClass("hide");

  $("#calculator").removeClass("show");
  $("#calculator").addClass("hide");

  $("#ele_form_details").removeClass("hide");
  $("#ele_form_details").addClass("show");
}


// Get the select element
var selectElement = document.getElementById("eleForm7");

// Get the current year
var currentYear = new Date().getFullYear();

// Start the loop from 2010 until the current year
for (var year = 2010; year <= currentYear; year++) {
  // Create a new option element
  var option = document.createElement("option");

  // Set the text and value of the option
  option.text = year;
  option.value = year;

  // Append the option to the select element
  selectElement.appendChild(option);
}

function generateOption(cardName) {
  // Get the select element
  var selectElement1, selectElement2, selectElement3, url;

  if (cardName == "mobil baru") {
    selectElement1 = document.getElementById("eleForm10");
    selectElement2 = document.getElementById("eleForm12");
    selectElement3 = document.getElementById("eleForm13");

    url = "./assets/js/new-car-data.json";
  }

  if (cardName == "motor baru") {
    selectElement1 = document.getElementById("eleForm14");
    selectElement2 = document.getElementById("eleForm17");
    selectElement3 = document.getElementById("eleForm16");

    url = "./assets/js/new-motorcycle-data.json";
  }

  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Make a GET request to load the JSON data
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Parse the JSON data
      var jsonData = JSON.parse(xhr.responseText);

      // Loop through the JSON data and create Merk Mobil options dynamically
      for (var i = 0; i < jsonData.type.length; i++) {
        var option = document.createElement("option");
        option.value = jsonData.type[i].Code;
        option.text = jsonData.type[i].Descr;
        selectElement1.appendChild(option);
      }

      // Loop through the JSON data and create Jangka Waktu options dynamically
      for (var i = 0; i < jsonData.downpayment.length; i++) {
        var option = document.createElement("option");
        option.value = jsonData.downpayment[i].Code;
        option.text = jsonData.downpayment[i].Descr;
        selectElement2.appendChild(option);
      }

      // Loop through the JSON data and create Uang Muka options dynamically
      for (var i = 0; i < jsonData.installment.length; i++) {
        var option = document.createElement("option");
        option.value = jsonData.installment[i].Code;
        option.text = jsonData.installment[i].Descr;
        selectElement3.appendChild(option);
      }
    }
  };
  xhr.send();
}
