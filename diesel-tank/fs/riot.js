load('api_mqtt.js');

let DEBUG = true;

let Sensors = {
    LED: "led"
};

let riotId = Cfg.get('device.id');

let riotSetId = function(id) {
    riotId = id;
    Cfg.set('device.id', riotId);
};

let riotSend = function(topic, message) {
    let res = MQTT.pub(topic, message, 1);
    if (DEBUG) print('MQTT ', res ? "OK" : "ERROR", topic, '->', message);
    return res;
};

let riotSendStatus = function() {
    return riotSend('/devices/' + riotId + '/status/uptime', Sys.uptime());
};

let riotSendSensor = function(sensorType, message, sensorId) {
    if (sensorId === undefined) sensorId = "0";
    let topic = '/devices/' + riotId + '/sensors/' + sensorType + '/' + sensorId;
    print(message);
    return riotSend(topic, JSON.stringify(message));
};