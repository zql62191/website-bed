
var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;


function registerUser() {

    var data = {
        "email": {
            "Email": "email@email.cim",
            "ConfirmEmail":"email@email.cim"
        }
    };

    alert("Unsubscribe");

    Url = "http://localhost:63407/BEDService/SetUnsubscribeDataEmail";
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