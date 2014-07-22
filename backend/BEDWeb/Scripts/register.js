
var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;


function registerUser() {

    var data = {
        "obj": {
            "FName": "",
            "MName": "mname",
            "LName": "",
            "Email": "email@email.cim1",
            "ConfirmEmail": "email@email.cim",
            "Address1": "address1",
            "Address2": "address2",
            "City": "city",
            "State": "state",
            "Zip": "1111",
            "Profession": "profession",
            "CommunicationsOptIn": 1
            }
    };

    alert("CreateRegistration");

    Url = "http://localhost:63407/BEDService/TestOptInData";
    ProcessData = true;
    Data = JSON.stringify(data);
    TestService();
}


function TestService() {
    $.ajax({
        type: "POST",
        url: Url,
        crossDomain: true,
        cache: false,
        async: false,
        data: Data,
        contentType: "application/json",
        dataType: "json",
        success: function (xhr) { //On Successfull service call
            alert("success - " + xhr);
        },
        error: function (xhr) {
            alert(xhr.responseText);
        } // When Service call fails
    });

}