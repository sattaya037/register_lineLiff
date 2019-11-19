
window.onload = function (e) {
    let myLiffId = "1553436015-g2jwRx3G";

    liff.init({
        liffId: myLiffId
    })
    .then(() => {
        // start to use LIFF's api
        initializeApp();
    })
    .catch((err) => {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffInitErrorMessage").classList.remove('hidden');
    });
};

function initializeApp() {
    liff.getProfile()
    .then(profile => {
      document.getElementById('displaynamefield').innerHTML=profile.displayName;
      document.getElementById("image").src=profile.pictureUrl; 
    })
    .catch((err) => {
      console.log('error', err);
    });
    // document.getElementById("useridfield").innerHTML = data.context.userId;
    // document.getElementById('languagefield').textContent = data.language;
    // document.getElementById('viewtypefield').textContent = data.context.viewType;
    // // document.getElementById('useridfield').textContent = data.context.userId;
    // document.getElementById('utouidfield').textContent = data.context.utouId;
    // document.getElementById('roomidfield').textContent = data.context.roomId;
    // document.getElementById('groupidfield').textContent = data.context.groupId;
 
    toggleAccessToken();
    // openWindow call
    document.getElementById('openwindowbutton').addEventListener('click', function () {
        liff.openWindow({
            url: 'https://line.me'
        });
    });

    // closeWindow call
    document.getElementById('closewindowbutton').addEventListener('click', function () {
        liff.closeWindow();
    });

    // sendMessages call
    document.getElementById('sendmessagebutton').addEventListener('click', function () {
        liff.sendMessages([{
            type: 'text',
            text: "You've successfully sent a message! Hooray!"
        }, {
            type: 'sticker',
            packageId: '2',
            stickerId: '144'
        }]).then(function () {
            window.alert("Message sent");
        }).catch(function (error) {
            window.alert("Error sending message: " + error);
        });
    });

    // get access token
    document.getElementById('getaccesstoken').addEventListener('click', function () {
        const accessToken = liff.getAccessToken();
        document.getElementById('accesstokenfield').textContent = accessToken;
        toggleAccessToken();
    }); 
}

function toggleAccessToken() {
    toggleElement('accesstokendata');
}

function toggleProfileData() {
    toggleElement('profileinfo');
}

function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = "none";
    } else {
        elem.style.display = "block";
    }
}