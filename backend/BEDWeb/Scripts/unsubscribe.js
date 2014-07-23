
var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;


function registerUser() {

    var data = {
        "FormEmail": {
            "Email": "email@email.cim"
        },
        "FormAddress": {
            "FName": "Test",
            "MName": "T",
            "LName": "Test",
            "Address1": "address1",
            "Address2": "address2",
            "City": "city",
            "State": "OH",
            "Zip": "11111"
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