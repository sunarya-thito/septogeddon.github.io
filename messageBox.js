class MessageBox {
    constructor(parent, title, message, butts, callback) {
        this.parent = parent;
        this.message = message;
        this.screen = document.createElement('div');
        this.box = document.createElement('div');
        this.header = document.createElement('h3');
        this.content = document.createElement('div');
        this.buttons = document.createElement('div');
        this.screen.style.position ='fixed';
        this.header.style.padding = '0px 35px';
        this.buttons.style.padding = '0px 18px';
        this.screen.style.zIndex = '9999999';
        this.screen.style.top = '0';
        this.screen.style.right = '0';
        this.screen.style.left = '0';
        this.screen.style.bottom = '0';
        this.screen.style.display = 'flex';
        $(this.screen).hide();
        this.screen.style.background = 'rgba(32,32,32,0.2)';
        this.content.style.marginBottom = '1em';
        this.header.style.marginBottom = '1em';
        this.content.style.transition = 'box-shadow 0.5s ease';
        let onscroll = () => {
            let top = this.content.scrollTop;
            let height = this.content.offsetHeight;
            let down = this.content.scrollHeight;
            if (top > 0) {
                if (top + height < down) {
                    this.content.style.boxShadow = '0 9px 10px 0 rgba(0, 0, 0, 0.1) inset, 0 -9px 10px rgba(0, 0, 0, 0.1) inset';
                } else {
                    this.content.style.boxShadow = '0 9px 10px 0 rgba(0, 0, 0, 0.1) inset';
                }
            } else {
                if (top + height < down) {
                    this.content.style.boxShadow = '0 -9px 10px 0 rgba(0, 0, 0, 0.1) inset';
                } else {
                    this.content.style.boxShadow = 'none';
                }
            }
        };
        this.content.onscroll = onscroll;
        this.box.classList.add('responsiveMessageBox');
        this.box.style.height = 'auto';
        this.box.style.overflow = 'hidden';
        this.content.style.overflow = 'auto';
        this.content.style.maxHeight = '50%';
        this.content.style.padding = '0px 35px 0px 35px';
        this.box.style.margin = 'auto';
        this.box.style.backgroundColor = 'white';
        this.box.style.borderRadius = '8px';
        this.box.style.padding = '25px 0px 18px 0px';
        this.box.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
        this.buttons.style.float = 'right';
        for (let i = 0; i < butts.length; i++) {
            let but = butts[i];
            let button = document.createElement('button');
            button.innerHTML = but.text;
            button.onclick = () => {
                but.onclick(this);
            };
            if (but.default) {
                button.style.backgroundColor = 'rgba(23,111,203,0.79)';
            }
            button.style.margin = '5px';
            this.buttons.appendChild(button);
        }
        this.screen.appendChild(this.box);
        this.box.appendChild(this.header);
        this.box.appendChild(this.content);
        this.box.appendChild(this.buttons);
        this.header.innerHTML = title;
        this.content.style.fontSize = '20px';
        if (typeof message == 'string') {
            this.content.innerHTML = message;
        } else {
            this.content.style.marginBottom = '2em';
            this.content.appendChild(message);
        }
        this.parent.insertBefore(this.screen, this.parent.firstChild);
        $(this.screen).fadeIn(300, ()=>{
            if (callback) callback();
            onscroll();
        });
        playAnimation(this.screen, 'blur');
    }

    destroy(callback) {
        playAnimation(this.screen,'unblur');
        $(this.screen).fadeOut(200, ()=>{
            this.parent.removeChild(this.screen);
            if (callback) callback();
        });
    }
}