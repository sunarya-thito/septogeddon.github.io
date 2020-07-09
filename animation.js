function playAnimation(element, animationName, callback) {
    stopAnimation(element);
    $(element).show();
    $(element).addClass('animation-'+animationName);
    if (callback) {
        let el = $(element);
        for (let i = 0; i < el.length; i++) {
            el[i].onanimationend = () => {
                $(element).removeClass('animation-'+animationName);
                if (callback) callback();
            };
        }
    }
}

function stopAnimation(element) {
    let list = $(element)[0].classList;
    for (let i = 0; i < list.length; i++) {
        let cl = list[i];
        if (cl.startsWith('animation-')) {
            $(element).removeClass(cl);
        }
    }
}