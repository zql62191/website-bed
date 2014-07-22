
var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;


function registerUser() {

    var data = {
        "obj": {
                "fname": "",
                "mname": "mname",
                "lname": "",
                "email": "email@email.cim1",
                "confirmemail": "email@email.cim",
                "address1": "address1",
                "address2": "address2",
                "city": "city",
                "state": "state",
                "zip": "1111",
                "profession": "profession",
                "chk": 1
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