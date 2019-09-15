import React,{useState, useEffect} from 'react';





const Cardsearch = () =>{
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [whiteCheckbox, setWhiteCheckbox] = useState(false);
    const [blueCheckbox, setBlueCheckbox] = useState(false);
    const [redCheckbox, setRedCheckbox] = useState(false);
    const [greenCheckbox, setGreenCheckbox] = useState(false);
    const [blackCheckbox, setBlackCheckbox] = useState(false);
    const [colorlessCheckbox, setColorlessCheckbox] = useState(false);

    const [cmc0Checkbox, setCmc0Checkbox] = useState(false);
    const [cmc1Checkbox, setCmc1Checkbox] = useState(false);
    const [cmc2Checkbox, setCmc2Checkbox] = useState(false);
    const [cmc3Checkbox, setCmc3Checkbox] = useState(false);
    const [cmc4Checkbox, setCmc4Checkbox] = useState(false);
    const [cmc5Checkbox, setCmc5Checkbox] = useState(false);
    const [cmc6Checkbox, setCmc6Checkbox] = useState(false);
    const [cmc7Checkbox, setCmc7Checkbox] = useState(false);
    const [cmc8Checkbox, setCmc8Checkbox] = useState(false);
    const [cmc9Checkbox, setCmc9Checkbox] = useState(false);
    const [cmc10Checkbox, setCmc10Checkbox] = useState(false);

    

    useEffect(()=> {
        const buildSearchQuery = () => {
            //declare vairable
            let white = whiteCheckbox ? 'w': '';
            let blue = blueCheckbox ? 'u': '';
            let red = redCheckbox ? 'r': '';
            let green = greenCheckbox ? 'g': '';
            let black = blackCheckbox ? 'b': '';
            let colorless = colorlessCheckbox ? 'c': '';

            let cmc0 = '0';
            let cmc1 = '1';
            let cmc2 = '2';
            let cmc3 = '3';
            let cmc4 = '4';
            let cmc5 = '5';
            let cmc6 = '6';
            let cmc7 = '7';
            let cmc8 = '8';
            let cmc9 = '9';
            let cmc10 = '10';



        
            let query;
            let search;
            let color = [];
            let CMC = ['cmc!=0+', 'cmc!=1+','cmc!=2+','cmc!=3+','cmc!=4+','cmc!=5+','cmc!=6+','cmc!=7+','cmc!=8+','cmc!=9+','cmc!=10+'];

            colorType(white);
            colorType(blue);
            colorType(red);
            colorType(green);
            colorType(black);
            colorType(colorless);

            cmcFilter(cmc0, cmc0Checkbox);
            cmcFilter(cmc1, cmc1Checkbox);
            cmcFilter(cmc2, cmc2Checkbox);
            cmcFilter(cmc3, cmc3Checkbox);
            cmcFilter(cmc4, cmc4Checkbox);
            cmcFilter(cmc5, cmc5Checkbox);
            cmcFilter(cmc6, cmc6Checkbox);
            cmcFilter(cmc7, cmc7Checkbox);
            cmcFilter(cmc8, cmc8Checkbox);
            cmcFilter(cmc9, cmc9Checkbox);
            cmcFilter(cmc10, cmc10Checkbox);

            function colorType(type){
                for(let i = 0; i < color.length; i++){
                    if(color[i] === type && type != ''){
                        return;
                    }
                }
                if(type != ''){
                    color.push(type);
                }else{
                    for (let i = 0; i < color.length; i++) {
                        if(color[i] === type){
                            color.splice(i, 1);
                        }
                    }
                }
            
            }


//function that you pass the CMC value through and adds it to the query.
function cmcFilter(num, checked){
    if(CMC.indexOf(`cmc!=${num}+`) != -1 && !checked){
        return;
    }
        if(checked){
           let index = CMC.indexOf(`cmc!=${num}+`);
           if(index === -1){
               return;
           }
            CMC.splice(index, 1);
        }
    }
    
    //split deletes the delimeter, so this function works around that by adding in a place to seperate.
    function makeArray(){
        for(let i = 0; i < CMC.length; i++){
            if(CMC[i] === '+'){
            CMC = CMC.slice(0 , i+1) + ',' + CMC.slice(i+1);
            i++;
            }
        }
        CMC = CMC.split(',');
    }
    
    function queryText(){
        color = color.join('');
        CMC = CMC.join('');
        if(color != '' && CMC.length != 78){
            query = `color:${color}+${CMC}${search}`
        }
        else if(CMC.length != 78){
            query = `${CMC}${search}`
        }else if(color != ''){
            query = `color:${color}+${search}`;
        }//add in if search is empty
        else{
            query = `${search}`
        }
        console.log(query);
    }
    queryText();
    makeArray();
        }

        if (formSubmitted) {
            buildSearchQuery();
        }
        
    }, [formSubmitted])

    return(
        <div>
            <p>
            <input type='checkbox' value={whiteCheckbox} onChange={() => setWhiteCheckbox(!whiteCheckbox)} /> white
            <input type='checkbox' value={blueCheckbox} onChange={() => setBlueCheckbox(!blueCheckbox)} /> blue
            <input type='checkbox' value={redCheckbox} onChange={() => setRedCheckbox(!redCheckbox)} /> red
            <input type='checkbox' value={greenCheckbox} onChange={() => setGreenCheckbox(!greenCheckbox)} />green
            <input type='checkbox' value={blackCheckbox} onChange={() => setBlackCheckbox(!blackCheckbox)} />black
            <input type='checkbox' value={colorlessCheckbox} onChange={() => setColorlessCheckbox(!colorlessCheckbox)} />Colorless
            </p>

            <p>
                <input type='checkbox' value={cmc0Checkbox} onChange={() => setCmc0Checkbox(!cmc0Checkbox)}/>0
                <input type='checkbox' value={cmc1Checkbox} onChange={() => setCmc1Checkbox(!cmc1Checkbox)}/>1
                <input type='checkbox' value={cmc2Checkbox} onChange={() => setCmc2Checkbox(!cmc2Checkbox)}/>2
                <input type='checkbox' value={cmc3Checkbox} onChange={() => setCmc3Checkbox(!cmc3Checkbox)}/>3
                <input type='checkbox' value={cmc4Checkbox} onChange={() => setCmc4Checkbox(!cmc4Checkbox)}/>4
                <input type='checkbox' value={cmc5Checkbox} onChange={() => setCmc5Checkbox(!cmc5Checkbox)}/>5
                <input type='checkbox' value={cmc6Checkbox} onChange={() => setCmc6Checkbox(!cmc6Checkbox)}/>6
                <input type='checkbox' value={cmc7Checkbox} onChange={() => setCmc7Checkbox(!cmc7Checkbox)}/>7
                <input type='checkbox' value={cmc8Checkbox} onChange={() => setCmc8Checkbox(!cmc8Checkbox)}/>8
                <input type='checkbox' value={cmc9Checkbox} onChange={() => setCmc9Checkbox(!cmc9Checkbox)}/>9
                <input type='checkbox' value={cmc10Checkbox} onChange={() => setCmc10Checkbox(!cmc10Checkbox)}/>10

            </p>

            <input type='checkbox' value={formSubmitted} onChange={() => setFormSubmitted(!formSubmitted)}/><p>Check</p>

        </div>
    )
};

export default Cardsearch;
