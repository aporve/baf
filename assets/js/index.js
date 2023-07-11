let descr = []
let codes = []
let newData = []
let num = []
let str;
let card;
let TIPE_PENGAJUAN = ""
let OBJ_NOT_MP = {pinjaman:'', dp:'', tenor:'', jenisBrg:''}

var today = new Date();
var maxDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate()).toISOString().split('T')[0];
document.querySelector('#eleDetail3 input').setAttribute('max', maxDate);

window.addEventListener('message', function (eventData) {
  const parsedEventData = JSON.parse(eventData.data)
  if (parsedEventData.event_code === "custom-child-client-event") {

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

    str += `<option value="" disabled selected>Silahkan Pilih</option>`
    for (var item of newData) {
      str += `<option value=${item.code}>${item.descr}</option>`
    }
    document.getElementById("eleForm1").innerHTML = str;
    descr = []
    codes = []
    newData = []
    str = ''
    console.log('finish--->')
  }

  if (parsedEventData.event_code === "pilihMerk") {
    let data = parsedEventData.data;
    for (let i = 0; i < data.length; i++) {
      let id = data[i].Descr;
      let code = data[i].Code;

      if (id !== '') {
        newData.push({ "descr": id, "code": code });
      }
    }

    str += `<option value="" disabled selected>Silahkan Pilih</option>`
    for (var item of newData) {
      str += `<option value=${item.code}>${item.descr}</option>`
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
    let data = parsedEventData.data.result.Tenor;
    for (let i = 0; i < data.length; i++) {
      let id = data[i];

      if (id !== '') {
        num.push({ "id": id });
      }
    }

    str += `<option value="" disabled selected>Silahkan Pilih</option>`
    for (var item of num) {
      str += `<option value=${item.id}>${item.id} Bulan</option>`
    }
    
    document.getElementById("eleForm5").disabled = false;
    document.getElementById("submit_elektronik").disabled = false;
    document.getElementById("eleForm4").innerHTML = str;

    descr = []
    codes = []
    newData = []
    num = []
    str = ''

    data = parsedEventData.data.result.DP;
    for (let i = 0; i < data.length; i++) {
      let id = data[i];

      if (id !== '') {
        num.push({ "id": id });
      }
    }

    str += `<option value="" disabled selected>Silahkan Pilih</option>`
    for (var item of num) {
      str += `<option value=${item.id}>${(item.id * 100).toFixed()}%</option>`
    }
    document.getElementById("submit_elektronik").disabled = false;
    document.getElementById("eleForm5").innerHTML = str;

    descr = []
    codes = []
    newData = []
    num = []
    str = ''
  }


  if (parsedEventData.event_code === "hitungAnda-childIframe") {
    let data = parsedEventData.data
    let res = data.result.AngsuranRp
    console.log('res--->', res)
    document.getElementById("calcAmount").innerHTML = `Rp. ${Number(String(res).replace(/,/g, "").replace(/[^0-9]/g, "")).toLocaleString("en-ID")} <br />/Bulan`;
  }

  if (parsedEventData.event_code === "submitLeads-childIframe") {

    let url = window.location.href;
    console.log('-----payload-----', url)
    console.log('Added Payload code----')
    let urlParams = new URL(url);
    console.log(urlParams.searchParams.get('sender'));
    let sender = urlParams.searchParams.get('sender');

    let data = parsedEventData.data
    console.log('Data of submit leads----', data)
    let statusCode = data.statusCode
    console.log('statusCode---', statusCode)

    if (statusCode == '200') {
      let popupMsg = `Kami telah menerima pengajuan pendanaan ${card} Anda. Tim kami akan menghubungi Anda untuk proses lebih
      lanjut.`
      $("#ele_form_details").removeClass("show");
      $("#ele_form_details").addClass("hide");
      $("#success_popup").removeClass("hide");
      $("#success_popup").addClass("show");
      $("#popupmsg").text(popupMsg);

      console.log(popupMsg, "popupMsg");

      window.parent.postMessage(JSON.stringify({
        event_code: 'leadsSuccess',
        data: sender
      }), '*');

    }
  }

  if (parsedEventData.event_code == "api_failure") {
    $("#ele_form").removeClass("show");
    $("#ele_form").addClass("hide");
    $("#submit_form").removeClass("show");
    $("#submit_form").addClass("hide");
    $("#ele_form_details").removeClass("show");
    $("#ele_form_details").addClass("hide");
    $("#success_popup").removeClass("show");
    $("#success_popup").addClass("hide");

    $("#failure_popup").removeClass("hide");
    $("#failure_popup").addClass("show");

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

function calculate(name, merk, price, installment, dp = 0) {
  console.log('calculating installment', price)
  TIPE_PENGAJUAN = name

  price = parseInt(price.replace(/,/g, ""))
  let installmentCalc = 0
  if (name === 'mobil_baru' || name === 'motor_baru') {
    const downpaymentAmount = price * Number(dp)
    const installmentCode = installment.split('^')
    const installmentDuration = Number(installmentCode[0])
    const rate = Number(installmentCode[1])
    installmentCalc = Math.round(((price - downpaymentAmount) * (1 + rate)) / installmentDuration)

    OBJ_NOT_MP = {pinjaman:price, dp:downpaymentAmount, tenor:installmentDuration, jenisBrg:merk}
  } else if (name === 'dana_syariah') {
    const installmentCode = installment.split('^')
    const installmentDuration = Number(installmentCode[0])
    const rate = Number(installmentCode[1])
    installmentCalc = Math.round((price * (1 + rate)) / installmentDuration)

    OBJ_NOT_MP = {pinjaman:price, dp, tenor:installmentDuration, jenisBrg:merk}
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
    const danaMerkMotor = danaForm.querySelector("#eleForm6 select").value;
    const danaTahunBuat = danaForm.querySelector("#eleForm7 select").value;
    const danaJumlahPinjaman = danaForm.querySelector("#eleForm8").value;
    const danaJangkaWaktu = danaForm.querySelector("#eleForm9 select").value;

    switch(true) {
      case danaMerkMotor == "":
        danaForm.querySelector("#eleForm6 span").style.display = "block"
      case danaTahunBuat == "":
        danaForm.querySelector("#eleForm7 span").style.display = "block"
      case danaJumlahPinjaman == "":
        danaForm.querySelector("#validationMessage").style.display = "block"
      case danaJangkaWaktu == "":
        danaForm.querySelector("#eleForm9 span").style.display = "block"
      break;
      default:
        calculate(name, danaMerkMotor, danaJumlahPinjaman, danaJangkaWaktu);
    }
  }

  if (name == 'mobil_baru') {
    // Retrieve the data from the 'mobil_baru' form
    const mobilForm = document.getElementById("mobil_baru");
    const mobilMerkMobil = mobilForm.querySelector("#eleForm10 select").value;
    const mobilHargaMobil = mobilForm.querySelector("#eleForm11").value;
    const mobilJangkaWaktu = mobilForm.querySelector("#eleForm12 select").value;
    const mobilUangMuka = mobilForm.querySelector("#eleForm13 select").value;

    switch(true) {
      case mobilMerkMobil == "":
        mobilForm.querySelector("#eleForm10 span").style.display = "block"
      case mobilJangkaWaktu == "":
        mobilForm.querySelector("#eleForm12 span").style.display = "block"
      case mobilHargaMobil == "":
        mobilForm.querySelector("#validationMessage2").style.display = "block"
      case mobilUangMuka == "":
        mobilForm.querySelector("#eleForm13 span").style.display = "block"
      break;
      default:
        calculate(name, mobilMerkMobil, mobilHargaMobil, mobilJangkaWaktu, mobilUangMuka);
    }

  }


  if (name == 'motor_baru') {
    // Retrieve the data from the 'motor_baru' form
    const motorForm = document.getElementById("motor_baru");
    const motorTipe = motorForm.querySelector("#eleForm14 select").value;
    const motorPrice = motorForm.querySelector("#eleForm15").value;
    const motorJangkaWaktu = motorForm.querySelector("#eleForm16 select").value;
    const motorUangMuka = motorForm.querySelector("#eleForm17 select").value;

    switch(true) {
      case motorTipe == "":
        motorForm.querySelector("#eleForm14 span").style.display = "block"
      case motorJangkaWaktu == "":
        motorForm.querySelector("#eleForm16 span").style.display = "block"
      case motorPrice == "":
        motorForm.querySelector("#validationMessage3").style.display = "block"
      case motorUangMuka == "":
        motorForm.querySelector("#eleForm17 span").style.display = "block"
      break;
      default:
        calculate(name, motorTipe, motorPrice, motorJangkaWaktu, motorUangMuka);
    }
  }

  if (name == 'elektronik') {
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

    $("#ele_form").removeClass("show");
    $("#submit_form").removeClass("hide");
    $("#ele_form").addClass("hide");
    $("#submit_form").addClass("show");

    document.getElementById("myForm").reset();
    window.parent.postMessage(JSON.stringify({
      event_code: 'elektronik_submit',
      data: data
    }), '*');
  }

  if (name == 'ele_nextForm') {
    let name, email, Tanggal, Nomor, Alamat, Kota, PostalCode, Tipe, kodePromo, KodeReferensi, saya1, saya2
    let isOk = true;
    let ele_data = {}

    name = $("#eleDetail1>input").val();
    email = $("#eleDetail2>input").val();
    Tanggal = $("#eleDetail3>input").val();
    Nomor = $("#eleDetail4>input").val();
    Alamat = $("#eleDetail5>textarea").val();
    Kota = $("#eleDetail6>input").val();
    PostalCode = $("#eleDetail7>input").val();
    Tipe = $("#eleDetail8").val();
    kodePromo = $("#eleDetail9>input").val();
    KodeReferensi = $("#eleDetail10>input").val();

    saya1 = $("#eleDetail11").prop("checked")
    saya2 = $("#eleDetail12>input").prop("checked")

    var selectedDate = new Date(Tanggal);
    var currentDate = new Date();
    var yearsDiff = currentDate.getFullYear() - selectedDate.getFullYear();
    console.log(yearsDiff, "yearsDiff");
    let dob = yearsDiff < 17
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = (n) => {
      return emailRegex.test(n);
    };

    const phoneNumberRegex = /^(?:\+?62|0)[2-9]{1}\d{1,12}$/;
    const isValidPhoneNumber = (phoneNumber) => {
      return phoneNumberRegex.test(phoneNumber);
    };

    const postalCodeRegex = /^\d{5}$/;
    const isValidPostalCode = (postalCode) => {
      return postalCodeRegex.test(postalCode);
    };

    document.querySelector("#eleDetail1 span").style.display = "none"
    document.querySelector("#eleDetail2 span").style.display = "none"
    document.querySelector("#eleDetail3 span").style.display = "none"
    document.querySelector("#eleDetail4 span").style.display = "none"
    document.querySelector("#eleDetail5 span").style.display = "none"
    document.querySelector("#eleDetail6 span").style.display = "none"
    document.querySelector("#eleDetail7 span").style.display = "none"
    document.querySelector("#eleDetail12 span").style.display = "none"
    
    if(name == ""){
      document.querySelector("#eleDetail1 span").style.display = "block"
      isOk = false
    }
    if(email == "" || !isValidEmail(email)){
      document.querySelector("#eleDetail2 span").style.display = "block"
      isOk = false
    }
    if(Tanggal == "" || dob){
      document.querySelector("#eleDetail3 span").style.display = "block"
      isOk = false
    }
    if(Nomor == "" || !isValidPhoneNumber(Nomor)){
      document.querySelector("#eleDetail4 span").style.display = "block"
      isOk = false
    }
    if(Alamat == ""){
      document.querySelector("#eleDetail5 span").style.display = "block"
      isOk = false
    }
    if(Kota == ""){
      document.querySelector("#eleDetail6 span").style.display = "block"
      isOk = false
    }
    if(PostalCode == "" || !isValidPostalCode(PostalCode)){
      document.querySelector("#eleDetail7 span").style.display = "block"
      isOk = false
    }
    if(!saya2){
      document.querySelector("#eleDetail12 span").style.display = "block"
      isOk = false
    }

    if (isOk) {
      ele_data.name = name;
      ele_data.email = email;
      ele_data.Tanggal = Tanggal;
      ele_data.Nomor = Nomor;
      ele_data.Alamat = Alamat;
      ele_data.Kota = Kota;
      ele_data.Jota = PostalCode;
      ele_data.Tipe = Tipe;
      ele_data.kodePromo = kodePromo;
      ele_data.KodeReferensi = KodeReferensi;
      ele_data.saya1 = saya1;
      ele_data.saya2 = saya2;
      ele_data.dp = OBJ_NOT_MP.dp
      ele_data.pinjaman = OBJ_NOT_MP.pinjaman
      ele_data.tenor = OBJ_NOT_MP.tenor
      ele_data.jenisBrg = OBJ_NOT_MP.jenisBrg
    }

    console.log('data---> ', ele_data)
    console.log(typeof (saya1))
    if (name !== '' && email !== '' && Tanggal !== '' && Nomor !== '' && Alamat !== '' && Kota !== '' && PostalCode !== '' && Tipe !== '' && saya1 == true && saya2 == true && isOk) {
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
  if (TIPE_PENGAJUAN == 'mobil_baru') {
    card = "Mobil Baru"
  } else if (TIPE_PENGAJUAN == 'motor_baru') {
    card = "Motor Baru Yamaha"
  } else if (TIPE_PENGAJUAN == 'dana_syariah') {
    card = "Dana Syariah"
  }

  $(eleDetail8).val(card)
  $("#submit_form").removeClass("show");
  $("#submit_form").addClass("hide");

  $("#calculator").removeClass("show");
  $("#calculator").addClass("hide");

  $("#ele_form_details").removeClass("hide");
  $("#ele_form_details").addClass("show");
}


// Get the select element
var selectElement = document.querySelector("#eleForm7 select");

// Get the current year
var currentYear = new Date().getFullYear();

// Start the loop from 2010 until the current year
for (var year = currentYear; year >= 2010; year--) {
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
    selectElement1 = document.querySelector("#eleForm10 select");
    selectElement2 = document.querySelector("#eleForm12 select");
    selectElement3 = document.querySelector("#eleForm13 select");

    url = "./assets/js/new-car-data.json";
  }

  if (cardName == "motor baru") {
    selectElement1 = document.querySelector("#eleForm14 select");
    selectElement2 = document.querySelector("#eleForm17 select");
    selectElement3 = document.querySelector("#eleForm16 select");

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
