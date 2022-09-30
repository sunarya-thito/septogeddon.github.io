let greetings = [
    'Halo! Nama saya Thito!',
    '¡Hola! ¡Mi nombre es Thito!',
    'Hello! My name is Thito!',
    'Bonjour! Je m\'appelle Thito!',
    'Hallo! Mein Name ist Thito!',
    'こんにちは！ 私の名前はティトです！',
    '안녕하세요! 내 이름은 티토!',
    'Kamusta! Ang pangalan ko ay Thito!'
]
function scanCard(card) {
    let expandable = card.querySelector('.expandable');
    let content = card.querySelector('.expandable-content');
    if (expandable && content) {
        card.onclick = (e) => {
            let target = e.target;
            while (target != null) {
                if (target.classList.contains('social-hyperlink')) return;
                target = target.parentElement;
            }
            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
                content.style.maxHeight = '0';
            } else {
                card.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            card.scrollIntoView({behavior: "smooth", block: "start", inline: "end"});
        };
    }
}

window.addEventListener('DOMContentLoaded', () => {
   let index = 1;
   let primary = document.querySelector('#title-entry-primary');
   let secondary = document.querySelector('#title-entry-secondary');
   primary.onanimationend = (event) => {
       primary.innerHTML = greetings[index % greetings.length];
       secondary.innerHTML = greetings[(index + 1) % greetings.length];
       index++;
       primary.classList.remove('animated-title-entry');
       secondary.classList.remove('animated-title-entry');
       setTimeout(() => {
           primary.classList.add('animated-title-entry');
           secondary.classList.add('animated-title-entry');
       }, 1);
   }
   let background = document.querySelector('#background');
   let offset = 0;
   setInterval(() => {
       background.style.backgroundPositionX = offset + 'px';
       background.style.backgroundPositionY = offset + 'px';
       offset = (offset + 0.1) % 1666;
   }, 1);
   document.querySelectorAll('.card').forEach((card) => scanCard(card));
   document.querySelectorAll('.toggle').forEach((toggle) => {
       toggle.onclick = () => {
           if (toggle.classList.contains('active')) {
               toggle.classList.remove('active');
           } else {
               toggle.classList.add('active');
           }
           if (toggle.id === 'dark-mode-switcher') {
               switchDarkMode(toggle.classList.contains('active'));
           }
       };
   })
});

function switchDarkMode(mode) {
    if (mode) {
        document.querySelector('.overlay').classList.add('dark');
    } else {
        document.querySelector('.overlay').classList.remove('dark');
    }
}