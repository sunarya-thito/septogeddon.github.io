function addOverflowShadow(element) {
    let onscroll = () => {
        let top = element.scrollTop;
        let height = element.offsetHeight;
        let down = element.scrollHeight;
        if (top > 0) {
            if (top + height < down) {
                element.style.boxShadow = '0 9px 10px 0 rgba(0, 0, 0, 0.1) inset, 0 -9px 10px rgba(0, 0, 0, 0.1) inset';
            } else {
                element.style.boxShadow = '0 9px 10px 0 rgba(0, 0, 0, 0.1) inset';
            }
        } else {
            if (top + height < down) {
                element.style.boxShadow = '0 -9px 10px 0 rgba(0, 0, 0, 0.1) inset';
            } else {
                element.style.boxShadow = 'none';
            }
        }
    };
    element.style.transition = 'box-shadow 0.5s ease';
    element.onscroll = onscroll;
    onscroll();
}