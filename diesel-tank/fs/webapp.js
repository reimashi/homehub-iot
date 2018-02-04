let rpcUrl = "http://10.0.0.6/rpc/";

$(document).ready(function() {
    $.getJSON(rpcUrl + "Wifi.Scan", function(data) {
        console.log(data.results);
    });
});