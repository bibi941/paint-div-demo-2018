var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var painting = false
var lastPoint = { x: 'null', y: 'null' }

//按下鼠标
canvas.onmousedown = function(circle) {
  painting = true
  var x = circle.clientX
  var y = circle.clientY
  lastPoint = { x: x, y: y }
  drawCircle(x, y, 1)
}
//移动鼠标
canvas.onmousemove = function(circle) {
  if (painting) {
    var x = circle.clientX
    var y = circle.clientY
    var newPoint = { x: x, y: y }
    drawCircle(x, y, 1)
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
    lastPoint=newPoint
  }
}
//松开鼠标
canvas.onmouseup = function(circle) {
  painting = false
}

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
  context.lineWidth = 1
  context.lineTo(x2, y2)
  context.stroke()
}

