class Mcc{
    combined_description:string
    edited_description:string
    id:number
    irs_description:string
    irs_reportable:string
    mcc:string
    usda_description:string
    category:string

    fromObj(obj){
        for (var prop in obj){
            this[prop] = obj[prop]
        }
    }
}

class Main {
    mccs : Mcc[] = [];

    constructor(){
        let r = this.httpGetAsync('https://raw.githubusercontent.com/clearhaus/mcc-codes/master/mcc_codes.small.json');
        this.composeMccs(JSON.parse(r))
    }   

    httpGetAsync(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    composeMccs(objs){
        for(let obj of objs){
                let mcc = new Mcc()
                mcc.fromObj(obj)
                this.mccs.push(mcc)
            }
        console.log(this.mccs)
    }

    insertElements(el : HTMLElement){
        el.innerHTML += `<thead>
                            <tr>
                                <th>category</th>
                                <th>mcc</th>
                                <th>description</th>
                            </tr>
                        </thead>`
        let string = `<tbody>`
        for(let obj of this.mccs){
            string += `<tr>
                                <td><input  type="text" 
                                            placeholder="category" 
                                            id="mccInput` + obj.mcc + `"
                                            onkeyup="updateMcc('` + obj.mcc + `')"></td>
                                <td>` +  obj.mcc + `</td>
                                <td>` + obj.edited_description + `</td>
                            </tr>`
        }
        string += `</tbody>`
        
        el.innerHTML += string;
    }

    buildCSV(el:HTMLElement){
        el.innerHTML = `category;mcc;edited_description\n`
        let string = '';
        for(let obj of this.mccs){
            string += obj.category + `;` + obj.mcc + `;` +  obj.edited_description + `\n`
        }
        
        el.innerHTML += string;
    }

    findMcc(mccCode){
        for (var index = 0; index < this.mccs.length; index++) {
            var element = this.mccs[index];
            if(element.mcc == mccCode){
                return element
            }
        }
    }

}
let main = new Main()
let tableDisplayed = true;
main.insertElements(document.getElementById('table'))
main.buildCSV(document.getElementById('csv'))
function hideTable(){
    if(tableDisplayed == true){
        document.getElementById('table').setAttribute("style", "display:none;")
    }else {
        document.getElementById('table').setAttribute("style", "display:table;")
    }
    tableDisplayed = !tableDisplayed;
}
function updateMcc(mccCode){
    let el : HTMLElement = document.getElementById('mccInput' + mccCode)
    let mcc = main.findMcc(mccCode);
    
    mcc.category = el.value

    console.log(mcc)
}

function updateCSV(){
    main.buildCSV(document.getElementById('csv'))
}

window.onbeforeunload = function() {
    return "Dude, are you sure you want to leave? Think of the kittens!";
}