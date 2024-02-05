function moveX (event) {
  let horizontal = document.querySelector('.horizontal');
  let vertical = document.querySelector('.vertical');

  horizontal.style.left = `${(event.clientX)}px`;
  vertical.style.top = `${event.clientXY}px`;
  
}

document.addEventListener('click', moveX);