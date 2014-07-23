
var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;


function registerUser() {

    var data = {
        "optIn": {
            "Specialty": "OPT",
            "CommunicationsOptIn": 1,
            "Email": {
                "Email": "email@email.cim",
                "ConfirmEmail": "email@email.cim"
            },
            "Address": {
                "FName": "Test",
                "MName": "T",
                "LName": "Test",
                "Address1": "address1",
                "Address2": "address2",
                "City": "city",
                "State": "OH",
                "Zip": "11111"
            }
        }

    };

    alert("CreateRegistration");

    Url = "http://localhost:63407/BEDService/SetOptInData";
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
            alert("success - " + xhr.responseText);
        },
        error: function (xhr) {
            alert(xhr.responseText);
            $('.error').text('<pre>' + xhr.responseText + '</pre>');
        } // When Service call fails
    });

}