

document.addEventListener('DOMContentLoaded', (e)=> {
    let dogBar = document.querySelector('#dog-bar')
    let dogInfo = document.querySelector('#dog-info')

    fetch('http://localhost:3000/pups')
    .then(res=> res.json())
    .then(data => {
            //Add Pups to Dog Bar
            data.forEach(pup => {
                dogBar.innerHTML += `<span>${pup.name}</span>`
            })
            //Show more info about each pup
            dogBar.addEventListener('click', (e)=> {
                    let dogObject = data
                    for(let element in dogObject){
                        let dog = dogObject[element]
                        if(e.target.tagName === 'SPAN'){
                            if(dog.name === e.target.textContent){
                                let temperment;
                                if(dog.isGoodDog){
                                    temperment = 'Good Dog!'
                                }else{temperment = 'Bad Dog!'}

                                dogInfo.innerHTML += `<div><img src="${dog.image}" alt=""><h2>${dog.name}</h2><button>${temperment}</button></div>`
                            }
                    }
                   }
            })
            // Toggle Good Dog
            dogInfo.addEventListener('click', (e)=> {
                let isGood;
                let dogId;
                if(e.target.tagName === 'BUTTON'){
                
                    if(e.target.textContent === "Good Dog!"){
                        e.target.textContent = "Bad Dog!"
                    isGood = false}
                    else{e.target.textContent = "Good Dog!"
                    isGood = true}}
                
                let dogObject = data
                
                for(let element in dogObject){
                    let dog = dogObject[element]
                    if(e.target.parentNode.querySelector('h2').textContent === dog.name){
                        dogId = dog.id
                    }
                }
                fetch(`http://localhost:3000/pups/${dogId}`, {
                    method: 'PATCH',
                    headers:{
                                'Content-type':'application/json',
                                Accept: 'application/json'
                            },
                    body: JSON.stringify({
                        isGoodDog: isGood
                    })
                })
            })
            //Filter Good Dogs
            document.querySelector('#good-dog-filter').addEventListener('click', (e)=>{
                let dogObject = data
                dogBar.innerHTML = ""
                if(e.target.textContent === "Filter good dogs: OFF"){
                    e.target.textContent = "Filter good dogs: ON"
                    
                    for(let element in dogObject){
                    let dog = dogObject[element]
                    
                    if(dog.isGoodDog){
                        dogBar.innerHTML += `<span>${dog.name}</span>`
                    }
                    }
                }else{
                    dogBar.innerHTML = ""
                    e.target.textContent = "Filter good dogs: OFF"
                    for(let element in dogObject){
                        let dog = dogObject[element]
                        dogBar.innerHTML += `<span>${dog.name}</span>`
                }
            }
        
        })   
    })
})