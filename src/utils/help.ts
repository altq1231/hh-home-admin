function getDragMoveTarget(elem: any, key: any): any {
  if (elem.classList.value.indexOf(key) >= 0) {
    return elem;
  } else {
    return getDragMoveTarget(elem.parentNode, key);
  }
}

function getElementPagePosition(element: any) {
  //计算y坐标
  let actualTop = element.offsetTop;
  //计算x坐标
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    actualTop += current.offsetTop + current.clientTop;
  }

  return { x: actualLeft, y: actualTop };
}

// 获取元素的绝对位置坐标（像对于浏览器视区左上角）
function getElementViewPosition(element: any) {
  //计算x坐标
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  let elementScrollLeft: any;
  let elementScrollTop: any;
  while (current !== null) {
    actualLeft += current.offsetLeft + current.clientLeft;
    current = current.offsetParent;
  }
  if (document.compatMode == "BackCompat") {
    elementScrollLeft = document.body.scrollLeft;
  } else {
    elementScrollLeft = document.documentElement.scrollLeft;
  }
  let left = actualLeft - elementScrollLeft; //计算y坐标
  let actualTop = element.offsetTop;
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop;
    current = current.offsetParent;
  }
  if (document.compatMode == "BackCompat") {
    elementScrollTop = document.body.scrollTop;
  } else {
    elementScrollTop = document.documentElement.scrollTop;
  }
  let right = actualTop - elementScrollTop; //返回结果
  return { x: left, y: right };
}

export { getDragMoveTarget, getElementPagePosition, getElementViewPosition };
