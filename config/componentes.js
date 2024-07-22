const vy = new Date()
let vigencia_contol={
    "fuentes":{},
    "datos":{
        "administrador":"Nombre de Administrador",
        "vigencia":vy.getFullYear(),
        "area":"Nombre de área"
    },
    "proyectos":{},
}

const byId=(nombre)=>{
const control = document.getElementById(nombre)
return control
}