var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var using = false
var userEraser = false
var lastPoint = { x: 'null', y: 'null' }
eraser.onclick = function() {
  userEraser = true
  actions.className = 'actions x'
}
brush.onclick = function() {
  userEraser = false
  actions.className = 'actions '
}

autoSetCanvas(canvas)

listenTo_Mouse(canvas)

//--------------------------------------------------------------------工具函数------------------------------------------------------------------//
//画圆
function drawCircle(x, y, radiuse) {
  context.beginPath()
  context.arc(x, y, radiuse, 0, Math.PI * 2)
  context.fill()
}

//连线
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 5
  context.lineTo(x2, y2)
  context.stroke()
}

//自动设置Canvas宽高
function autoSetCanvas(canvas) {
  setCanvas_Width_Height()
  //监听用户缩放窗口
  window.onresize = setCanvas_Width_Height()
  //获取以及设置用户窗口宽高
  function setCanvas_Width_Height() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

//监听鼠标
function listenTo_Mouse(canvas) {
  //按下鼠标
  canvas.onmousedown = function(circle) {
    var x = circle.clientX
    var y = circle.clientY
    using = true
    if (userEraser) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      lastPoint = { x: x, y: y }
      drawCircle(x, y, 2.5)
    }
  }
  //移动鼠标
  canvas.onmousemove = function(circle) {
    var x = circle.clientX
    var y = circle.clientY
    if (using) {
      if (userEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    } else {
    }
  }
  //松开鼠标
  canvas.onmouseup = function(circle) {
    using = false
  }
}
