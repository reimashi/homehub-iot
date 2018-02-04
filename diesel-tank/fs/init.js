load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');
load('riot.js');

let led = Cfg.get('pins.led');
let button = Cfg.get('pins.button');

print('LED GPIO:', led, 'button GPIO:', button);

// Blink built-in LED every second
GPIO.set_mode(led, GPIO.MODE_OUTPUT);

Timer.set(1000, Timer.REPEAT, function() {
  let value = GPIO.toggle(led);
  riotSendSensor(Sensors.LED, value);
}, null);

Timer.set(10000, Timer.REPEAT, function() {
  riotSendStatus();
}, null);

// Monitor network connectivity.
Event.addGroupHandler(Net.EVENT_GRP, function(ev, evdata, arg) {
  let evs = '???';
  if (ev === Net.STATUS_DISCONNECTED) {
    evs = 'DISCONNECTED';
  } else if (ev === Net.STATUS_CONNECTING) {
    evs = 'CONNECTING';
  } else if (ev === Net.STATUS_CONNECTED) {
    evs = 'CONNECTED';
  } else if (ev === Net.STATUS_GOT_IP) {
    evs = 'GOT_IP';
  }
  if (DEBUG) print('[DEBUG] Net event:', ev, evs);
}, null);
