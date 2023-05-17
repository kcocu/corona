

// const xCal = document.querySelector('#xCal');
// console.log(xCal.textContent)

const people_form = document.querySelector('#people_data');
const btn_xhtml = document.querySelector('#btn_xhtml');
const change_div_display = document.querySelector('#change_div_display');
const change_div_display2 = document.querySelector('#change_div_display2');

//xhtml 자리에 div 하나 부모로 생성
// let div_plus = document.createElement('div');
// div_plus.appendChild(btn_xhtml)


//클릭시 display == none으로 none에서는 block으로
btn_xhtml.addEventListener('click', () => {
  change_div_display.style.display === 'none' ?
  change_div_display.style.display = 'block' :
  change_div_display.style.display = 'none'
})
//submit 눌렀을 때
people_form.addEventListener('submit', (t) =>{

  change_div_display2.style.display === 'none' ?
  change_div_display2.style.display = 'block' :
  change_div_display2.style.display = 'none'

  // 앞의 form 때문에 자꾸 view로 넘어가짐, 그거 막아줌
  t.preventDefault()

  // xCal 안의 text 가져오기
  const people_name = document.querySelector('#xCal').textContent;
  let x_index = document.querySelector('#x_index').textContent;
  let y_mean = document.querySelector('#y_mean').textContent;
  let people_title = document.querySelector('#people_title').value;
  let people_title2 = document.querySelector('#people_title2').value;

  // x_index, y_mean를 정규식을 통해 배열바꾸기 밑작업함
  x_index = x_index.replace(/[\['\] ]/g,"")
  // data의 x축에 들어갈 x_index를 string-> array로 바꿔줌
  x_index = x_index.split(',')
  y_mean = y_mean.replace(/[\['\] ]/g,"")
  y_mean = y_mean.split(',')
  // y_mean의 요소를 string -> number 로 바꾸기
  let y_mean2 = y_mean.map((e) => {
    return e *= 1;
  });
  // console.log(typeof(y_mean2[0]))
  console.log(y_mean2)
  
  // string -> html 으로 바꾸기
  let domparser = new DOMParser()
  let people_name_dom = domparser.parseFromString(people_name,"text/html")

  // console.log(people_name_dom)

  // subgroup과 value값 찾기 ->nodeList를 map에 쓰기 위한 arr 형태로 바꾸기
  const by_x = [...people_name_dom.querySelectorAll(`tbody > tr > td:nth-child(2)`)]
  const by_value = [...people_name_dom.querySelectorAll(`tbody > tr > td:nth-child(4)`)]

  // console.log(by_x[0].innerText)
  // console.log(by_x)
  // console.log(by_value)


  // reduce로 chart.js 에 맞는 데이터로 바꾸기
  // data 형태 -> {'x':~,'y':~}
  let data_key = ['x','y']

  // map으로 innerText 뽑아옴
  const new_by_x = by_x.map((v)=>{
    return v.innerText
  })
  const new_by_value = by_value.map((v)=>{
    return v.innerText
  })
  // console.log(new_by_x)
  // console.log(new_by_value)

  const people_x = new_by_x.reduce((acc, v) => {
    return {...acc, ['x']:v};
  }, new Object);
  // console.log(people_x)

  
  const backColor = [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)',
                      'rgba(255, 153, 143, 0.2)'
                    ]
  
  const bdColor = [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 153, 143)',
                  ]



  const datas = {
    labels: x_index,
    datasets: [{
      label: `${people_title}과 ${people_title2}의 상관관계`,
      data: y_mean2,
      backgroundColor: [...backColor],
      borderColor: [...bdColor],
      borderWidth: 3,
    }]
  };
  const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        // 만들기 원하는 차트의 유형
        type: 'bar',

        // 데이터 집합을 위한 데이터
        data: datas,
        // 설정은 여기서 하세요
        options: {
          legend: {
            labels: {
              fontColor : 'white',
              fontSize : 18
            }
          },
          scales: {
            xAxes :[{
              ticks: {
                fontColor : "rgba(251, 203, 9, 1)",
                fontSize : 30,
            },
            }],
  
            yAxes: [{
              ticks: {
                  beginAtZero: true,
                  // stepSize : 1,
                  fontColor : "rgba(251, 203, 9, 1)",
                  fontSize : 30,
              },
              gridLines:{
                color: 'rgba(166, 201, 226, 1)',
                lineWidth:3
              }
            }]
          },
        // plugins: [plugin],
      }
  });
  


})
// const image = new Image();
// image.src = 'https://www.chartjs.org/img/chartjs-logo.svg';

// const plugin = {
//   id: 'customCanvasBackgroundImage',
//   beforeDraw: (chart) => {
//     if (image.complete) {
//       const ctx = chart.ctx;
//       const {top, left, width, height} = chart.chartArea;
//       const x = left + width / 2 - image.width / 2;
//       const y = top + height / 2 - image.height / 2;
//       ctx.drawImage(image, x, y);
//     } else {
//       image.onload = () => chart.draw();
//     }
//   }
// };