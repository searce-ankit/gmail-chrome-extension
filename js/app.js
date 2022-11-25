


const subEvent = (e) =>{
    console.log(e);
}


const supEvent = (e) =>{
    console.log(e);
}

const initEvents = () =>{

    $('body').on('click','.sub-btn',subEvent);
    $('body').on('click','.sup-btn',supEvent);
}

const initStyling = (elem)=>{
    var childElem = elem.children('td.a8X.gU');

    if(!$('div.sub-btn') || $('div.sub-btn').length==0){
        childElem.prepend('<div class="wG J-Z-I sub-btn">sub</div>');
    }

    if(!$('div.sup-btn') || $('div.sup-btn').length==0){
        childElem.prepend('<div class="wG J-Z-I sup-btn">sup</div>');
    }
}

const initializeControls = () =>{

    initEvents();
    $('div[jscontroller="eIu7Db"]').on('click',function(){

        setTimeout(function(){
            var elem = $('tr.btC');
            initStyling(elem);
            
        },1000);
    });
    

}

const initStylingOnLoad = () =>{
    var elem=$('tr.btC');
    if(elem){
        initStyling(elem);
    }
}




  const init = async () =>{
    setTimeout(initStylingOnLoad,10000);
    setTimeout(initializeControls,200);
  }
  
  export const app = async () => {
    await init();
}