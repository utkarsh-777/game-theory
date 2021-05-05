const public_vapid_key = "BJfiHyy_qFOmXwlk4ntA7BYLWFSWYDC-5Yv6lD6Di7TwmNwpIcJbtWlyIRwIHIRDgtRtXdh2jtrMEgxaCzVUP9c";

//check for service worker

if('serviceWorker' in navigator){
    send().catch(err => console.log('hii here is the error',err));
}

async function send() {
    const register = await navigator.serviceWorker.register('push-notification-listener.js',{
        scope: 'https://sacdnfiles.s3.ap-south-1.amazonaws.com/push-notification/'
    });

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(public_vapid_key)
    });

    console.log('Push Registered...')
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
