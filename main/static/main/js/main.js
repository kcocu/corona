
//스타일 초기화
// Chart.platform.disableCSSInjection = true;

// const send = document.querySelector('#new_contry_send');  

//주소 선택하기
const new_contry_form = document.querySelector('#new_contry_form');


//submit 눌렀을 때
new_contry_form.addEventListener('submit', () =>{
  
  // select에서 가져오기
  const select_contry_name = document.querySelector('select[name="new_contry"]');
  // console.log(select_contry_name.value)
  
  //fetch 주소 가져오기
  async function AusnewData() {
    const AusUrl = '../static/main/json/' + select_contry_name.value + '.json';
    // console.log(AusUrl)
    const response = await fetch(AusUrl);
    const data = await response.json();
    // console.log(data)
    // console.log(data[0])
    return data;
  };
  //배열 형식으로 데이터 저장
  AusnewData().then(data => {
    const new_years=[]
    const new_datas=[]
    for (let key in data){
      const AusYear = data[key].TIME;
      const AusValue = data[key].Value;
      // console.log(AusYear);
      // console.log(AusValue);
      new_years.push(AusYear);
      new_datas.push(AusValue);

    }
    // console.log(new_years);
    // console.log(new_datas);
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        // 만들기 원하는 차트의 유형
        type: 'line',

        // 데이터 집합을 위한 데이터
        data: {
            labels: new_years,
            datasets: [{
                label: '1,000 명당 의사 수의 변화',
                backgroundColor: 'rgb(173,255,47)',
                borderColor: 'rgb(255, 255, 255)',
                data: new_datas,
                pointHoverBorderColor : 'rgb(0,255,255)',
                pointHoverBorderWidth : 30,
            }]
        },

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
                fontSize : 15,
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
    });
    //한글 이름 가져오기
    async function newContryKorean() {
      const new_korean_url = '../static/main/json/newKorean.json';
      const response = await fetch(new_korean_url);
      const data = await response.json();
      return data;
    };
    newContryKorean().then(data => {
      for (let key in data){
        if (data[key].NEW_COUNTRY === select_contry_name.value){
          const korean_name = data[key].KOREAN_NAME
          document.querySelector('#Korean_contry_name').innerHTML = korean_name
        }
      }
    })

    //피어슨 json 가져오기
    async function newContryData() {
      const new_country_url = '../static/main/json/newList.json';
      console.log(new_country_url)
      const response = await fetch(new_country_url);
      const data = await response.json();
      return data;
    };
    //피어슨 계수 구하기
    newContryData().then(data => {
      for (let key in data){
        if (data[key].LOCATION === select_contry_name.value){
          const PRResult = data[key].PearsonRResult;
          // console.log(data[key].LOCATION);
          // console.log(PRResult);
          // console.log(PRResult[0]);
          // console.log(PRResult[1]);
          if (PRResult[0]>=0.6 || PRResult[0]<=-0.6){
            document.querySelector('#PearsonP').innerHTML = PRResult[0] + '이며 <br> 이 값은 |0.6| 보다 크므로 유의미한 상관관계를 갖습니다.'
          }else if (PRResult[0]>=0.4 || PRResult[0]<=-0.4){
            document.querySelector('#PearsonP').innerHTML = PRResult[0] + '이며 <br> 이 값은 |0.4| 과 |0.6| 사이이므로 약한 상관관계를 갖습니다.'
          }else {
            document.querySelector('#PearsonP').innerHTML = PRResult[0] + '이며 <br> 이 값은 |0.4| 보다 작으므로 관계가 적다고 할 수 있습니다.'
          }
          // document.querySelector('#country_name_now').innerHTML = select_contry_name.value
          if (PRResult[1]<=0.05){
            document.querySelector('#PearsonP_Pvalue').innerHTML = PRResult[1] + '이며 <br> 이 값은 0.05보다 작으므로 우연히 일어날 가능성은 작다고 할 수 있습니다.'
          }else {
            document.querySelector('#PearsonP_Pvalue').innerHTML = PRResult[1] + '이며 <br> 이 값은 0.05보다 크므로 데이터로 사용하기 부적절합니다.'
          }
        }
      }
    })
  });

})
// 시작시 한국으로 설정
async function AusnewData() {
  const AusUrl = '../static/main/json/NEW_KOR.json';
  console.log(AusUrl)
  const response = await fetch(AusUrl);
  const data = await response.json();
  // console.log(data)
  // console.log(data[0])
  return data;
};
AusnewData().then(data => {
  const new_years=[]
  const new_datas=[]
  for (let key in data){
    const AusYear = data[key].TIME;
    const AusValue = data[key].Value;
    // console.log(AusYear);
    // console.log(AusValue);
    new_years.push(AusYear);
    new_datas.push(AusValue);

  }
  // console.log(new_years);
  // console.log(new_datas);
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
      // 만들기 원하는 차트의 유형
      type: 'line',

      // 데이터 집합을 위한 데이터
      data: {
          labels: new_years,
          datasets: [{
              label: '1,000 명당 의사 수의 변화',
              backgroundColor: 'rgb(173,255,47)',
              borderColor: 'rgb(255, 255, 255)',
              data: new_datas,
              pointHoverBorderColor : 'rgb(0,255,255)',
              pointHoverBorderWidth : 30,

          }]
      },

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
  });
});

