const a = document.querySelector(".cta-btn");
const bg = document.querySelector(".bg");
// window.addEventListener('mousemove', e => {
//     cursor.style.left = `${e.pageX - cursor.clientWidth / 2}px`;
//     cursor.style.top = `${e.pageY - cursor.clientHeight / 2}px`;
//     cursor.animate({
//         left: `${e.pageX - cursor.clientWidth / 2}px`,
//         top: `${e.pageY - cursor.clientHeight / 2}px`,
//     }, 250)
// });

a.addEventListener('mousemove', e => {
    const offset = a.getBoundingClientRect();
    bg.style.left = `${e.offsetX - bg.clientWidth / 2}px`;
    bg.style.top = `${e.offsetY - bg.clientHeight / 2}px`;
});