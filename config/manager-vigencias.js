let data_vigencia;
let active_data;

function load_vigencias() {
    data_vigencia = GLOBAL.state.vigencias
    ver_vigencias()
}
async function ver_vigencias() {
        document.getElementById("mn-vigencias").innerHTML=""
    //Identifica las propiedades de la capa
    for (const vigenciaid in data_vigencia) {
        const li = document.createElement("li")
        const a = document.createElement("a")
        a.className="dropdown-item"
        a.href="#"
        a.textContent=data_vigencia[vigenciaid]["datos"]["vigencia"]
        a.onclick=()=>{
            mostrar_panel_vigencias(data_vigencia[vigenciaid])
        }
        li.appendChild(a)
        document.getElementById("mn-vigencias").appendChild(li)        
    }
}

function crear_vigencia() {
try {
    const data = GLOBAL.firestore.addVigencia(vigencia_contol)

    //mostrar_panel_vigencias(data.id)
   
} catch (error) {
    mensajes("Aún cargando datos")
}


}

function mostrar_panel_vigencias(data){
    //mensajes(data_vigencia[id]["datos"]["vigencia"],"orange")
    byId("panel-escritorio").hidden=false
    active_data=data


    const intManager = byId("intManager")
    intManager.value=data.datos.administrador
    intManager.onchange=()=>{
        data.datos.administrador=intManager.value
        Guardar()
    }

    const intArea = byId("intArea")
    intArea.value=data.datos.area
    intArea.onchange=()=>{
        data.datos.area=intArea.value
        Guardar()
    }

    const intVigencia = byId("intVigencia")
    intVigencia.value=data.datos.vigencia
    intVigencia.onchange=()=>{
        data.datos.vigencia=intVigencia.value
        Guardar()
    }

}   
async function Guardar() {
    const id = GLOBAL.firestore.updateVigencia(active_data)
}
function remove_vigencia(){
    GLOBAL.firestore.borrarVigencia(active_data.id)
    ver_vigencias()
    byId("panel-escritorio").hidden=true


}