import {coronaNow} from './now2.js'
// import {globalYesterday} from './now4.js'
// import {enterdata,entData} from './now3.js'


// function DData(width,height,globalScale){
//   this.width = width,
//   this.height = height,
//   this.globalScale = globalScale
// }

let geojson = {};

let projections = [
  {type: 'Mercator', scale: 70},
];
let width, height, globalScale, fillStyle;
width = -6300, height = 2600, globalScale = 4.5,fillStyle = '#FFF';


function updateCanvas(d) {
  
  let context = this.getContext('2d');
  let projection = d3['geo' + d.type]()
    .scale(globalScale * 5 * d.scale) // 크기 정함
    .center([0, 0]) //중앙
    .rotate([0.1, 0, 0]) //위치
    .translate([0.5 * width, 0.5 * height]);  //위치


  let geoGenerator = d3.geoPath()
    .projection(projection)
    .context(context);

  context.lineWidth = 0.5;

  // // Graticule
  // context.strokeStyle = '#ccc';
  // context.fillStyle = 'none';
  // context.setLineDash([1,1]);
  // context.beginPath();
  // geoGenerator(geoGraticule());
  // context.stroke();


  // World
  context.fillStyle = fillStyle;
  context.setLineDash([]);
  context.beginPath();
  geoGenerator({type: 'FeatureCollection', features: geojson.features})
  context.fill();
  context.stroke();

  // // Circles
  // context.strokeStyle = '#888';
  // context.fillStyle = 'none';
  // circles.forEach(function(center) {
  //   geoCircle.center(center);
  //   context.beginPath();
  //   geoGenerator(geoCircle());
  //   context.stroke();
  // });

  // Projection label
  context.fillStyle = '#333';
  context.font = '14px sans-serif';
  context.fillText('geo' + d.type, 6, 17);

}


function update() {
  // console.log(width,height,globalScale)
  let u = d3.select('#world_map')
    .selectAll('canvas')
    .data(projections);

  u.enter()
    .append('canvas')
    .attr('width', width + 'px')
    .attr('height', height + 'px')
    .merge(u)
    .each(updateCanvas);
  u.exit().remove();
  
  
}
// // // load data and display the map on the canvas with country geometries
// d3.json("/static/main/json/NNLL.json")
//   .then(function (json) {
//     geojson = json;
//     update();
//     console.log(geojson)
//   });
d3.json('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json')
	.then(function(json) {
		geojson = json;
		update();
	});

coronaNow() 

//coronaNow()로 json 불러오기
export async function globalYesterday() {
  const globalY = '../static/main/json/global.json';
  const response = await fetch(globalY);
  const data = await response.json();
  return data;
};
// json 데이터 정리


const enterdata = document.querySelector('.input_corona')
let showCase = document.querySelector("#showCase");
function entData(){
  
  geojson = {};
  
  // update()
  let Countrys


  
  enterdata.addEventListener('keypress', (e)=>{
    
    if(e.key == 'Enter'){

      switch (enterdata.value) {
        case 'clear':{
          width = 1320, height = 1600, globalScale = 10;
          fillStyle ='#000000';
          break         
        }
        case 'KOR':{
          // korData = new DData(-6300,2600,4)
          fillStyle='#FFF'
          width = -6300, height = 2600, globalScale = 4.5;
          Countrys = 'KOR'
          
          break
        }
        case 'USA':{
          fillStyle='#FFF'
          width = 2500, height = 1200, globalScale = 1.6;
          Countrys = 'USA'
          alert('미국은 자료가 없습니다.')
          break
        }
        case 'JPN':{
          fillStyle='#FFF'
          width = -7000, height = 2700, globalScale = 4.5;
          Countrys = 'JPN'
          break
        }
        case 'CHN':{
          fillStyle='#FFF'
          width = -5500, height = 2200, globalScale = 4.5;
          Countrys = 'CHN'
          break
        }
        case 'RUS':{
          fillStyle='#FFF'
          width = 0, height = 1500, globalScale = 1.6;
          Countrys = 'RUS'
          break
        }
        case 'FRA':{
          fillStyle='#FFF'
          width = 800, height = 2400, globalScale = 3.6;
          Countrys = 'FRA'
          break
        }
        case 'GBR':{
          fillStyle='#FFF'
          width = 800, height = 3150, globalScale = 3.6;
          Country = 'GBR'
          break
        }
        default:
          fillStyle ='#000000';
          alert('아직 등록되지 않은 나라입니다.')
          break
      }
      
    }
    globalYesterday().then(data => {
      let newDictCountry = {'Japan':'JPN','Republic of Korea':'KOR','China':'CHN','Russian Federation':'RUS','France':'FRA','The United Kingdom':'GBR'}
      let New_cases
      let New_deaths
      for (let i in data){
        let Country = data[i].Country
        
        if (newDictCountry[Country]){
          New_cases = data[i].New_cases
          New_deaths = data[i].New_deaths
          // console.log(New_cases,New_deaths,newDictCountry[Country])
          if (Countrys == newDictCountry[Country]){
            // console.log('aa')
            showCase.innerText =`나라명 : ${Country} // 새 확진자 수 : ${New_cases} // 새 사망자 수 : ${New_deaths}`
          }
        }
      }
    })
    update();
    
  })
}
entData()
