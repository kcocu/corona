//선택지를 모두 가져온다
const stations = document.querySelectorAll(".station");

//Ajax -json 하나 받아오기
async function AllList() {
  const allList = '../static/main/json/allList.json';
  const response = await fetch(allList);
  const data = await response.json();
  // console.log(data)
  return data;
};
// chart.js 에 넣을 데이터
function DoitData(x,y, data=data,label=label){
  const x_axis=[];
  const y_axis=[];

  //예외처리
  if (!data[0][x] || !data[0][y]){
    alert('dataset을 확인해주세요')
  }else{
    for (let key in data){
      const X_new = data[key][x];
      const Y_new = data[key][y];
      x_axis.push(X_new);
      y_axis.push(Y_new);
    }
    
    
    xx_axis = [...x_axis];
    yy_axis = [...y_axis];
  
    new_label = label
    data_in_chart(xx_axis,yy_axis)
    document.querySelector('#station_name').innerHTML = label
    document.querySelector('#x_axis_hypothesis').setAttribute('value',x)
    document.querySelector('#y_axis_hypothesis').setAttribute('value',y)
  }
}
// data 파일을 object 형식에 맞게 변경
function data_in_chart(x,y){
  let new_dict = {}
  let new_list = []
  // console.log(x)
  for (let i=0; i < x.length; i++){
    new_dict['x'] = x[i];
    new_dict['y'] = y[i];
    new_list.push({...new_dict})
  }
  new_new_list = [...new_list]
}
// 초기화
let new_label = ''
let new_new_list = []
let xx_axis = []
let yy_axis = []
//배열로 저장되기 때문에 forEach로 하나씩 이벤트를 등록해준다.
stations.forEach((station, i)=>{
  station.addEventListener('click',()=>{
    if (i===0){
      AllList().then(data => {
        const label = '1000명당 의사 수와 코로나 사망률의 상관 관계'; 
        DoitData('Value','total_deaths_per_million',data,label)
        
      })
    }else if(i===1){
      AllList().then(data => {
        const label = '1000명당 의사 수와 GDP의 상관 관계'; 
        DoitData('Value','gdp_per_capita',data,label)
      })
      
    }else if(i===2){
      AllList().then(data => {
        const label = '1000명당 병상 수와 코로나 사망률의 상관 관계'
        DoitData('hospital_beds_per_thousand','total_deaths_per_million',data,label)
      })
    }else if(i===3){
      AllList().then(data => {
        const label = '극빈층의 비율과 코로나 사망률의 상관 관계'
        DoitData('extreme_poverty','total_deaths_per_million',data,label)
      })
    }else if(i===4){
      AllList().then(data => {
        const label = '극빈층의 비율과 코로나 검사율의 상관 관계'
        DoitData('extreme_poverty','total_tests',data,label)
      })
    }else if(i===5){
      AllList().then(data => {
        const label = '극빈층의 비율과 코로나 백신접종의 상관 관계'
        DoitData('extreme_poverty','people_fully_vaccinated_per_hundred',data,label)
      })
    }else if(i===6){
      AllList().then(data => {
        const label = 'GDP와 1000명당 병상수의 상관 관계'
        DoitData('hospital_beds_per_thousand','gdp_per_capita',data,label)
      })
    }else if(i===7){
      AllList().then(data => {
        const label = '1000명당 의사 수와 코로와 생활 수준의 상관 관계'
        DoitData('Value','human_development_index',data,label)
      })
    }else if(i===8){
      AllList().then(data => {
        const label = '코로나 환자 비율과 코로나 사망률의 상관 관계'
        DoitData('total_deaths_per_million','total_cases_per_million',data,label)
      })
    }else if(i===9){
      AllList().then(data => {
        const label = '극빈층 비율과 웰빙지수의 상관 관계'
        DoitData('extreme_poverty','human_development_index',data,label)
      })
    }else{
        alert('data가 없습니다.')
    }
    const datas = {
      datasets: [
        {
          label: new_label,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 255, 255)',
          data: new_new_list,
          pointHoverBorderColor : 'rgb(0,255,255)',
          pointHoverBorderWidth : 30,
        },

      ]
    }
    const ctx = document.getElementById('myChart').getContext('2d');
      const chart = new Chart(ctx, {
          // 만들기 원하는 차트의 유형
          type: 'bubble',

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
            aspectRatio: 1,
            scales: {
              xAxes: [{
                ticks:{
                  fontColor : "rgba(251, 203, 9, 1)",
                  fontSize : 20,
                },
                gridLines:{
                  color: "rgba(87, 152, 23, 1)",
                  lineWidth: 1
                }
              }],
              x: {
                type: 'linear',
                position: 'bottom'
              },
  
              yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // stepSize : 1,
                    fontColor : "rgba(251, 203, 9, 1)",
                    fontSize : 20,
                },
                gridLines:{
                  color: 'rgba(166, 201, 226, 1)',
                  lineWidth:3
                }
              }]
            }
          }
      })
  })
})
const enterdata = document.querySelector('.input_corona')

enterdata.addEventListener('keypress', (e)=>{
  let trim_enterdata = enterdata.value.replace(/ /g,'');
  let enter_list = trim_enterdata.split(',')
  // console.log(enter_list)
  if(e.key === 'Enter'){
    if (enter_list.length !== 2){
      alert('data를 확인 후, 메뉴얼에 맞게 입력해주세요.')
    }
    else{
      AllList().then(data => {
        const new_label = `${enter_list[0]}와/과 ${enter_list[1]}의 상관 관계`
        DoitData(enter_list[0],enter_list[1],data,new_label)
      })
      const datas = {
        datasets: [
          {
            label: new_label,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 255, 255)',
            data: new_new_list,
            pointHoverBorderColor : 'rgb(0,255,255)',
            pointHoverBorderWidth : 30,
          },
  
        ]
      }
      const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
            // 만들기 원하는 차트의 유형
            type: 'bubble',
  
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
              aspectRatio: 1,
              scales: {
                xAxes: [{
                  ticks:{
                    fontColor : "rgba(251, 203, 9, 1)",
                    fontSize : 20,
                  },
                  gridLines:{
                    color: "rgba(87, 152, 23, 1)",
                    lineWidth: 1
                  }
                }],
                x: {
                  type: 'linear',
                  position: 'bottom'
                },
    
                yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      // stepSize : 1,
                      fontColor : "rgba(251, 203, 9, 1)",
                      fontSize : 20,
                  },
                  gridLines:{
                    color: 'rgba(166, 201, 226, 1)',
                    lineWidth:3
                  }
                }]
              }
            }
        })
    }
  }
})
