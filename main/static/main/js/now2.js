//coronaNow()로 json 불러오기
export async function coronaNow() {
  const newCorona = '../static/main/json/newCorona.json';
  const response = await fetch(newCorona);
  const data = await response.json();
  return data;
};
// json 데이터 정리
coronaNow().then(data => {

  //초기화
  let new_loc_list = []
  let new_up_list = []
  let new_all_list = []


  for (let i in data){
    let loc = data[i].지역
    let all_people = data[i].총인원
    let up_people = data[i].증가값

    // chart 가져올때 숫자화
    let all_people_num = all_people.replace(/,/g,'')
    all_people_num = all_people_num *1
    up_people = up_people.replace(/[\(\)]/g,'')
    let up_people_num = up_people.replace(/[\+]/g,'')
    up_people_num = up_people_num * 1

    // chart data가 배열형태로 넣어야함
    new_loc_list.push(loc)
    new_up_list.push(up_people_num)
    new_all_list.push(all_people_num)

    // 나중에 시간나면 테이블 만들기
    // let tr = document.createElement('tr');
    // let th = document.createElement('th');
    // let td = document.createElement('td');

  }
  // console.log(Object.keys(data).length)

  //index 0 총합은 따로 빼서 다른 곳에서 사용하기
  new_loc_list.shift();
  const up_total = new_up_list.shift();
  new_all_list.shift();

  // div 밑에 p tag 넣어서 매번 자동으로 바뀌게 해주기
  const my_total_div = document.querySelector('#my_total');
  let p = document.createElement('p');
  p.innerHTML=(
    `국내 코로나 총 확진자 수 는 ${data[0].총인원}명 입니다. <br/>
    국내 지난 하루 확진자 증가 수는 ${up_total}명 입니다.`
    );
  p.style.fontSize = 'x-large'
  my_total_div.appendChild(p)
  
  // 16진법으로 #00ff00 이런식으로 랜덤으로 뽑기
  let color_list = []
  function backRandom1() {
    let colorCode = '#' + Math.round(Math.random() * 0xffffff).toString(16);
    color_list.push(colorCode)
  }

  // Object.keys(data).length -> 데이터가 object 타입으로 나옴, 이때는 이렇게 해주면 길이 찍힘
  // 랜덤 색 뽑기
  for (let i=0; i<Object.keys(data).length; i++){
    backRandom1();
  }

  //그래프 선택시 수정하도록 설정
  const data_choice = document.querySelector('#data_choice');
  const graph_choice = document.querySelector('#graph_choice');

  //selectData() 함수
  function selectData() {

    let select_value = data_choice.value;
    let graph_choice_value = graph_choice.value;

    // 각 데이터 고를 때 선택하도록
    const graphset_choice = ( graph_choice_value === 'bar' ? 'bar' : 'pie' )
    const dataset_choice = (select_value === 'now' ?
                            {
                              label: '한국 코로나 하루 증가량',
                              backgroundColor: color_list,
                              borderColor: 'rgb(255, 255, 255)',
                              data: new_up_list,
                              pointHoverBorderColor : 'rgb(0,255,255)',
                              pointHoverBorderWidth : 30,
                            }:
                            {
                              label: '한국 코로나 총 수치',
                              backgroundColor: color_list,
                              borderColor: 'rgb(255, 255, 255)',
                              data: new_all_list,
                              pointHoverBorderColor : 'rgb(0,255,255)',
                              pointHoverBorderWidth : 30,
                            })
      // data 입력
  const datas1 = {
    labels : new_loc_list,
    datasets: [
      dataset_choice
    ]
  }
  const ctx1 = document.getElementById('myChart1').getContext('2d');
  const chart1 = new Chart(ctx1, {
      // 만들기 원하는 차트의 유형
      type: graphset_choice,

      // 데이터 집합을 위한 데이터
      data: datas1,
      
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
  // 선택하게 해서 결정시키기
  data_choice.addEventListener('change', () =>{
    selectData()
  })
  graph_choice.addEventListener('change', () =>{
    selectData()
  })

  // 초기에 실행
  selectData()

})
