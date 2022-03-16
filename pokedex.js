// console.log("Hola Explorers");
var pokeImg = document.getElementById("pokeImg");
var pokeType = document.getElementsByClassName("pokeType");
var pokeStats = document.getElementById("pokeStats");
var pokeAbilitiesNormal = document.getElementById("pokeAbilitiesNormal");
var pokeAbilitiesHidden = document.getElementById("pokeAbilitiesHidden");
var state;
var images;
// var pokeWeight = document.getElementById("pokeWeight");
// var pokeHeight = document.getElementById("pokeHeight");
// var pokeId = document.getElementById("pokeId");
// var pokeName = document.getElementById("pokeName");


const fetchPokemon = () =>{
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    const url=`https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res)=>{
        
       //manejo de errores
       if(res.status != "200"){
        console.log(res);
        pokeImage("https://media.comicbook.com/2017/04/pokemon-sad-moments-pikachu-crying-990351.jpg");
        }else{
            pokeType.innerHTML = "";
            pokeStats.innerHTML = "";
            return res.json();
        }
    }).then((data)=>{
        if(data){
            console.log(data);
            state = {
                female : false,
                shiny : false,
                back : false
            }
            //verificar si female o shiny son null entonces bloquear los controles
            images = {
                front: data.sprites.front_default,
                front_shiny: data.sprites.front_shiny,
                front_female: data.sprites.front_female,
                front_shiny_female: data.sprites.front_shiny_female,
                back: data.sprites.back_default,
                back_shiny: data.sprites.back_shiny,
                back_female: data.sprites.back_female,
                back_shiny_female: data.sprites.back_shiny_female
             }
            
            // llenar tipos
            for(let i=0; i<data.types.length;i++){
                pokeType[i].innerHTML =  data.types[i].type.name;
            }
            //cambiar imagen
            pokeImage(images.front);

            //cambiar estadísticas
            let stats = data.stats;
            for(let i=0;i<stats.length;i++){
                pokeStats.innerHTML += `<li>${stats[i].stat.name}: ${stats[i].base_stat}</li>`;
            }

            let abilities = data.abilities;
            for(let i=0;i<abilities.length;i++){
                if(abilities[i].is_hidden != true){
                    pokeAbilitiesNormal.innerHTML += `<li>${abilities[i].ability.name}</li>`;
                }
                else{
                    pokeAbilitiesHidden.innerHTML += `<li>${abilities[i].ability.name}</li>`;
                }
            }
            
        }
        

    });
}
const buildImage=()=>{
    const dir = state.back ? "back":"front";
    const gender = state.female ? "_female": "";
    const shiny = state.shiny ? "_shiny": "";
    
    console.log(`images.${dir}${shiny}${gender}`);
    return (eval(`images.${dir}${shiny}${gender}`));
}
const toggleShiny=()=>{
    state.shiny = !state.shiny;
    let bi = buildImage();
    if (bi){
        pokeImage(bi);
    }
}
const toggleGender=()=>{
    state.female=!state.female;
    let bi = buildImage();
    if (bi){
        pokeImage(bi);
    }
}
const toggleBack=()=>{
    state.back=!state.back;
    let bi = buildImage();
    if (bi){
        pokeImage(bi);
    }
}
const pokeImage=(url)=>{
    pokeImg.src=url;  
}


