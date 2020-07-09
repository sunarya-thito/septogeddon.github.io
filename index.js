const Time = {
    MORNING: {
        background: morningBackground,
        message: "Good Morning"
    },
    AFTERNOON: {
        background: afternoonBackground,
        message: "Good Afternoon"
    },
    EVENING: {
        background: eveningBackground,
        message: "Good Evening"
    },
    NIGHT: {
        background: nightBackground,
        message: "Good Night"
    }
}

let imageQueue = [];

function queue(queue, executor, delay) {
    queue.push({
        executor: executor,
        delay: delay
    });
    triggerQueue(queue);
}

function triggerQueue(queue) {
    if (queue.onQueue) return;
    queue.onQueue = true;
    if (queue.length >= 1) {
        let executor = queue.shift();
        executor.id = setTimeout(() => {
            executor.executor(queue);
            queue.onQueue = false;
            triggerQueue(queue);
        }, executor.delay);
        executor.cancel = () => {
            clearTimeout(executor.id);
        };
    }
}

Object.freeze(Time);

function prepareBackground(name, parent) {
    if (parent.previousBackground) {
        parent.removeChild(parent.previousBackground);
    }
    let div = document.createElement('div');
    let img = document.createElement('img');
    div.append(img);
    div.style.objectFit = 'cover';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.bottom = '0';
    div.style.right = '0';
    div.style.left = '0';
    div.style.display = 'none';
    div.style.zIndex = '0';
    img.addEventListener('load', () => {
        $(div).fadeIn(1000);
    });
    img.style.objectFit = 'cover';
    img.style.width = '100%';
    img.style.height = '100%';
    img.src = name;
    parent.previousBackground = div;
    parent.appendChild(div);
}

function morningBackground() {
    prepareBackground('morning_time.jpg', document.body);
}

function afternoonBackground() {
    prepareBackground('afternoon_time.jpg', document.body);
}

function eveningBackground() {
    prepareBackground('evening_time.jpg', document.body);
}

function nightBackground() {
    prepareBackground('night_time.jpg', document.body);
}

function getCurrentTime() {
    let hour = new Date().getHours();
    return hour < 4 ? Time.NIGHT : hour < 12 ? Time.MORNING : hour < 17 ? Time.AFTERNOON : hour < 21 ? Time.EVENING : Time.NIGHT;
}

function sendToClipboard(value) {
    let div = document.createElement('input');
    div.value = value;
    document.body.appendChild(div);
    div.select();
    document.execCommand('copy');
    document.body.removeChild(div);
}

function openDiscord() {
    let div = document.createElement('div');
    div.style.width = '100%';
    let text = document.createElement('button');
    div.style.paddingTop = '1em';
    text.classList.add('blue-button');
    text.style.borderRadius = '5px';
    text.style.width = '100%';
    text.innerHTML = 'Septogeddon#3154';
    text.readOnly = true;
    div.style.overflow = 'hidden';
    div.style.display = 'flex';
    text.style.justifyContent = 'center';
    text.style.padding = '3px 15px';
    text.style.textAlign = 'center';
    text.style.outline = '0';
    text.onclick = () => {
        if (text.copying) return;
        text.copying = true;
        sendToClipboard(text.innerHTML);
        let old = text.innerHTML;
        text.innerHTML = 'Copied!';
        setTimeout(() => {
            text.innerHTML = old;
            text.copying = false;
        }, 1300);
    };
    div.appendChild(text);
    new MessageBox(document.body, 'Discord Information', div, [
        {
            text: 'Join Discord Server',
            onclick: box => {
                box.destroy();
                window.open('https://discord.gg/SHhUK4E', '_blank');
            }
        },
        {
            text: 'Close',
            onclick: box => {
                box.destroy();
            }
        }
    ]);
}

function go(url) {
    let u = new URL(url);
    new MessageBox(document.body, 'Confirmation', 'Proceed to go to '+u.host+'?', [
        {
            text: 'New Tab',
            onclick: box => {
                window.open(url, '_blank').focus();
                box.destroy();
            }
        },
        {
            text: 'Open',
            onclick: () => {
                window.location = url;
            }
        },
        {
            text: 'Cancel',
            onclick: box => {
                box.destroy();
            }
        }
    ]);
}
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('DOMContentLoaded', () => {
    let time = getCurrentTime();
    $('#greeter').html(time.message);
    time.background();
    setTimeout(() => {
        $('#welcomeScreen').fadeIn(500, () => {
            setTimeout(()=>{
                $('#welcomeScreen').fadeOut(700, initializePage);
            }, 1500);
        });
    }, 1000);
});

function initializePage() {
    $('#profileWindow').addClass('slide-in-bottom');
    $('#profileScreen').fadeIn(300, () => {
        addOverflowShadow(document.getElementById('socialInfo'));
        setTimeout(initializeIcons, 400);
    });
}

function initializeIcons() {
    let images = document.getElementsByClassName('socialImage');
    for (let i = 0; i < images.length; i++) {
        let image = images[i];
        let listener = ()=>{
            queue(imageQueue, ()=>{
                $(image.parentNode).addClass('imageReady');
            }, 400);
        };
        if (image.complete) {
            listener();
        } else {
            image.addEventListener('load', listener);
        }
    }
}