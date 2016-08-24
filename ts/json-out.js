var Mcc = (function () {
    function Mcc() {
    }
    Mcc.prototype.fromObj = function (obj) {
        for (var prop in obj) {
            this[prop] = obj[prop];
        }
    };
    return Mcc;
}());
var Main = (function () {
    function Main() {
        this.mccs = [];
        var r = this.httpGetAsync('https://raw.githubusercontent.com/clearhaus/mcc-codes/master/mcc_codes.small.json');
        this.composeMccs(JSON.parse(r));
    }
    Main.prototype.httpGetAsync = function (theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    };
    Main.prototype.composeMccs = function (objs) {
        for (var _i = 0, objs_1 = objs; _i < objs_1.length; _i++) {
            var obj = objs_1[_i];
            var mcc = new Mcc();
            mcc.fromObj(obj);
            this.mccs.push(mcc);
        }
        console.log(this.mccs);
    };
    Main.prototype.insertElements = function (el) {
        el.innerHTML += "<thead>\n                            <tr>\n                                <th>category</th>\n                                <th>mcc</th>\n                                <th>description</th>\n                            </tr>\n                        </thead>";
        var string = "<tbody>";
        for (var _i = 0, _a = this.mccs; _i < _a.length; _i++) {
            var obj = _a[_i];
            string += "<tr>\n                                <td><input  type=\"text\" \n                                            placeholder=\"category\" \n                                            id=\"mccInput" + obj.mcc + "\"\n                                            onkeyup=\"updateMcc('" + obj.mcc + "')\"></td>\n                                <td>" + obj.mcc + "</td>\n                                <td>" + obj.edited_description + "</td>\n                            </tr>";
        }
        string += "</tbody>";
        el.innerHTML += string;
    };
    Main.prototype.buildCSV = function (el) {
        el.innerHTML = "category;mcc;edited_description\n";
        var string = '';
        for (var _i = 0, _a = this.mccs; _i < _a.length; _i++) {
            var obj = _a[_i];
            string += obj.category + ";" + obj.mcc + ";" + obj.edited_description + "\n";
        }
        el.innerHTML += string;
    };
    Main.prototype.findMcc = function (mccCode) {
        for (var index = 0; index < this.mccs.length; index++) {
            var element = this.mccs[index];
            if (element.mcc == mccCode) {
                return element;
            }
        }
    };
    return Main;
}());
var main = new Main();
var tableDisplayed = true;
main.insertElements(document.getElementById('table'));
main.buildCSV(document.getElementById('csv'));
function hideTable() {
    if (tableDisplayed == true) {
        document.getElementById('table').setAttribute("style", "display:none;");
    }
    else {
        document.getElementById('table').setAttribute("style", "display:table;");
    }
    tableDisplayed = !tableDisplayed;
}
function updateMcc(mccCode) {
    var el = document.getElementById('mccInput' + mccCode);
    var mcc = main.findMcc(mccCode);
    mcc.category = el.value;
    console.log(mcc);
}
function updateCSV() {
    main.buildCSV(document.getElementById('csv'));
}
window.onbeforeunload = function () {
    return "Dude, are you sure you want to leave? Think of the kittens!";
};
//# sourceMappingURL=json-out.js.map