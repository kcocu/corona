export const enterdata = document.querySelector('.input_corona')
// function DData(width,height,globalScale){
//   this.width = width,
//   this.height = height,
//   this.globalScale = globalScale
// }
export function entData(){
  let ddddata
  enterdata.addEventListener('keypress', (e)=>{
    
    if(e.key === 'Enter'){
      switch (enterdata.value) {
        case 'KOR':{
          // korData = new DData(-6300,2600,4)
          ddddata = 'KOR'
        }
        case 'USA':
          break;
        default:

          break;
      }
    }
  })
  return ddddata
}