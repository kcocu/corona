const canvas = document.querySelector('canvas')

const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio

const canvasWidth = innerWidth
const canvasHeight = innerHeight

canvas.style.width = canvasWidth + 'px'
canvas.style.height = canvasHeight + 'px'

canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
ctx.scale(dpr,dpr)

// ctx.fillRect(10,10,50,50) //사각형



class Particle{
  // class에 instance 객체 생성 후 초기화
  constructor(x, y, radius, vy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.vy = vy //속도 변수 초기화
    this.acc = 1.03 //1보다 크면 속도가 붙음, 1보다 작으면 마찰이 붙음
  }
  update() {
    this.vy *= this.acc //가속도는 *=으로 곱해줌
    this.y += this.vy
  }
  draw() {
    ctx.beginPath() // 라인 그리겠다는 의미
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360) //시작x,y 반지름, 0도부터 시작, 360도까지(라디안 값->각도로 쓰려면 Math.PI/180 * 360), 시계방향(defalut= False)
    ctx.fillStyle = 'orange'
    ctx.fill()
    // ctx.stroke()
    ctx.closePath()
  }
}

const x = 100
const y = 100
const radius = 50
const particle = new Particle(x, y, radius)
const TOTAL = 15
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min
}

let particles =[]

for (let i =0; i < TOTAL; i ++){
  const x = randomNumBetween(0, canvasWidth)
  const y = randomNumBetween(0, canvasWidth)
  const radius = randomNumBetween(50, 100)
  const vy = randomNumBetween(1, 5)
  const particle = new Particle(x, y, radius, vy)
  particles.push(particle)
}

// console.log(particles)

let interval = 1000 / 60 //60FPS를 타겟으로
let now, delta
let then = Date.now() // 초기화

function animate() {
  window.requestAnimationFrame(animate) // 계속 반복하기
  now = Date.now() // 실시간으로 now 가져오기
  delta = now - then //이 델타가 interval보다 작으면 return시키기

  if (delta < interval) return

  ctx.clearRect(0,0,canvasWidth,canvasHeight) //전체 화면 지우기
  // x를 1px 이동시키기

  // particle.y += 1
  // particle.draw()

  particles.forEach(particle => {
    particle.update()
    particle.draw()

    // particle의 원이 중심점에 닿을 때 사라지고 생김 이걸 완전히 사라지고 하려면 -particle.radius 해주기
    //가장 아래 있을 때가  canvas Height, 0이 제일 높을 때, 
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius
      particle.x = randomNumBetween(0, canvasWidth)
      particle.radius = randomNumBetween(50, 100)
      particle.vy = randomNumBetween(1, 5)
    }
    
  })

  then = now - (delta % interval)
}

animate()