
//!continent buttons
const korper=document.querySelector('body');
const continentsButtons=document.querySelector("#continents-btns");
const africa=document.querySelector("#Africa");
const americas=document.querySelector("#Americas");
const asia=document.querySelector("#Asia");
const europe=document.querySelector("#Europe");
const oceania=document.querySelector("#Oceania");
const countries=document.querySelector("#countries");

//!important variables
const chart=document.querySelector("#mychart");
//!data variables:
let countriesArr=[];
let countriesISO3=[];
let byCountryArray=[];
let populationByCountryArr=[];
let allCountriesPopulation=0;
let countriesNumber=0;
let chartCountries=[];
let chartPopulation=[];
const countryAvgPopulaton=()=>parseInt(allCountriesPopulation/countriesNumber);
//!eventlistener function for all the continents:
  continentsButtons.addEventListener("click",clickContinent);

//!addevntlstnr function:
  async function clickContinent(e){
   //RESET DATA values
   countriesArr=[];
   countriesISO3=[];
   byCountryArray=[];
   populationByCountryArr=[];
   allCountriesPopulation=0;
   countriesNumber=0;
   chartCountries=[];
   chartPopulation=[];
   countries.innerHTML=""
   
   await fetchCountries(e.target.innerText);
   countriesArr[0].sort();
   // countriesISO3[0].sort();
   countriesBtns(countriesArr[0]);
   
   await countryPopulation(countriesISO3[0])
   qualifiedCountry()
   
    graph()
   //orng) console.log(countryAvgPopulaton())
   //console.log(e.target.innerText,countriesArr[0],'______________________________')
   //console.log(allCountriesPopulation)
   console.log(populationByCountryArr)
   console.log(byCountryArray)
  
  }

//! fetch all the countries  of the clicked continent:
async function fetchCountries(continent){
   try{
      let response=await fetch(`https:restcountries.com/v3.1/region/${continent}`)
      if(!response.ok){
			throw ('something went wrong');
		}
      let data=await response.json();
      //!console.log(data);
       countriesArr.push(collectCountries(data))
       countriesISO3.push(collectISO3(data))
   }
   catch (error) {
   korper.innerText= error;
}
}

//!collect countries names
const collectCountries=(data)=> data.map((country)=>country.name.common);
//!collect countries (cca3) aka ISO3
const collectISO3=(data)=> data.map((country)=>country.cca3);

//when pressed //! FUNCTION =>show all the countries as buttons on the page 
//orng) function==> puts each country name as a button:
function countriesBtns(countriesArr){
   countriesArr.forEach((country)=>{
      let countryButton=document.createElement('button');
      countryButton.className="country-btn";
      countryButton.setAttribute('type','button')
      countryButton.innerText=country;
      countries.appendChild(countryButton);
   } )
   ;
}

//!ADDEVTLSTNR & function that takes the pressed country   and fetch it's cities: 
//countries.addEventListener('click',fetchCities)
//async function fetchCities(country){//*(country=e.target.innertext)
//   try{
//     let response=await fetch('')
//   }
//}

//!function=> return the population for each country
async function countryPopulation(countriesISO3){
   try{
      let response=await fetch('https://countriesnow.space/api/v0.1/countries/population');
      if(!response.ok){
			throw ('something went wrong');
		}
      let data= await response.json();
      for (let country of countriesISO3){

       data.data.forEach((land)=>{
         if(land.iso3==country && land.populationCounts.length===59){
            allCountriesPopulation+=land.populationCounts[58].value;
            countriesNumber+=1
            populationByCountryArr.push(land.populationCounts[58].value)
            byCountryArray.push(land.country);
         }
         // else if(land.iso3!=country){
         //    console.log('problem',country)
         // }
      })
   }
      

   }
   catch (error) {
      console.log(error);
   }
   
}

//^ function to create the chart:
function graph(){
   var xValues = chartCountries;
var yValues = chartPopulation
new Chart(chart, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
    options: {
      legend: {display: false},
   //   scales: {
   //     yAxes: [{ticks: {min: 6, max:16}}],
   //   }
    }
});
}

//^ function=> returns which country to view in the chart
 function qualifiedCountry(){
    for(let x=0;x<byCountryArray.length;x++){
      if(countryAvgPopulaton()<=populationByCountryArr[x]){
         
         chartCountries.push(byCountryArray[x]);
         chartPopulation.push(populationByCountryArr[x]);
      }
    }
 }



// when pressed//!FUNCTION =>put the info in chart






































//^ COUNTRIES FLAGS as (SVG URL)
//^ async function fetchCountryFlag(country){
//^    try{
//^       let response=await fetch(`https://countriesnow.space/api/v0.1/countries/flag/images`)
//^       if(!response.ok){
//^ 			throw ('something went wrong');
//^ 		}
//^       let data=await response.json();
//^       for(let theCountry of data){
//^          if(theCountry.name==country){
//^             return theCountry.name.flag;
//^          }
//^       }
      
//^    }
//^    catch (error) {
//^    korper.innerText= error;
//^ }
//^ }































//_ let continents=["Africa","Americas" , "Asia", "Europe","Oceania" ]
//_ let obj=document.querySelector("#data")
//_ let subregionsArr=[]
//_ async function continentsName(){
//_    try{
//_       for(let continent of continents){
//_       let response=await fetch(`https://_restcountries.com/v3.1/region/${continent}`)
   
//_       if(!response.ok){
//_          throw "something went wrong"
//_       }
//_       let data=await response.json();
//_       const subregion=data.reduce((accumulator,current)=>{
//_          if(!accumulator[current.subregion]) accumulator[current.subregion]=1
         
//_          return accumulator
//_        },[])
//_        subregionsArr.push(Object.keys(subregion))
//_        console.log(Object.keys(subregion));
//_       for(let x=0;x<data.length;x++){
         
//_       obj.textContent+=`| ${data[x].subregion} `
//_    }
 
//_       //console.log(data)
//_    }
//_     console.log(subregionsArr.flat());
//_    }
//_    catch(error){
//_       console.log(error)
//_    }
//_ }
//_ continentsName()


