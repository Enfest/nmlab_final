const RPIclient = new WebSocket('ws://localhost:5000');
RPIclient.onopen = ()=> console.log('rpi socket server connected!')

export default RPIclient;