// let screen=document.querySelector("input");
// let buttons=document.querySelectorAll("button");

// Array.from(buttons).forEach(btn=>{btn.addEventListener("click",(e)=>{
//     console.log('oyy');
//     let text=e.target.innerText;
//     console.log(text);

//     if(text=='C')
//     {
//         screen.value="";
//     }
//     else if(text=="") {
//         screen.value=screen.value.substr(0,screen.value.length-1);
//     }
//     else if(text=='=') screen.value=eval(screen.value);
//     else screen.value+=text;

// })})
console.log('heya man');
const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const locationElement=document.querySelector('.location')
const describeElement=document.querySelector('.describe')

locationElement.innerHTML='<font color="#888">Your results will appear here...</font>'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    locationElement.innerHTML='<font color="#888">Loading...</font>'
    describeElement.innerHTML="";


    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                locationElement.textContent=data.error;
                return console.log(`Error: ${data.error}`);
            }
            console.log(data);
            locationElement.innerHTML=data.location;
            describeElement.innerHTML=data.describe+`. It's ${data.temperature} degrees out and feels like ${data.feelslike} degree.`
        })
    })
    weatherForm.reset();
}) 
