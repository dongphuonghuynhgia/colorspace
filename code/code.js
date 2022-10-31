const page_load = () => {
    var cls = document.getElementsByClassName('colVal');
    for(i=0;i<cls.length;i++) {
        cls[i].disabled = true;
    }
    document.getElementById('cl_selector').disabled = false;
    info = document.getElementById('get-info');
}
var info;
var radioIndex = 0;
const radio_change = () => {
    var cls = document.getElementsByClassName('colVal');
    for(i=0;i<cls.length;i++) {
        cls[i].disabled = true;
    }
    var rds = document.getElementsByClassName('rd_space');
    var rdCheck = -1;
    for(i=0;i<rds.length;i++) {
        if(rds[i].checked) { rdCheck = i; radioIndex = i; break; }
    }
    if(rdCheck == 0) {
        document.getElementById('cl_selector').disabled = false;
    }
    else if(rdCheck == 1) {
        document.getElementById('tx_hexcode').disabled = false;
    }
    else {
        var txts = document.getElementsByClassName('nb_' + rdCheck.toString());
        for(i=0;i<txts.length;i++) {
            txts[i].disabled = false;
        }
    }
}
const roundTo = (number, digit) => {
    return (isNaN(new Number(number)))?NaN:(Math.round(number * Math.pow(10, digit)) / Math.pow(10, digit));
}
const selector_change = () => {
    if(radioIndex == 0) {
        var selValue = document.getElementById('cl_selector').value;
        selValue = selValue.toString().substring(1,7);
        document.getElementById('tx_hexcode').value = selValue;
        var hexCode = new Hexcode(selValue);
        for(i=2;i<7;i++) {
            var ctrls = document.getElementsByClassName('nb_' + i.toString());
            var ctrlCode;
            if(i==2) ctrlCode = hexCode.toRGB();
            else if(i==3) ctrlCode = hexCode.toHSL();
            else if(i==4) ctrlCode = hexCode.toHSV();
            else if(i==5) ctrlCode = hexCode.toHSI();
            else  ctrlCode = hexCode.toCMYK();
            for(j=0;j<ctrls.length;j++) {
                ctrls[j].value = roundTo(ctrlCode.item(j), 3);
            }
        }
    }
}
var hexcode_def = '';
const hexcode_focus = () => {
    hexcode_def = document.getElementById('tx_hexcode').value;
}
const hexcode_blur = () => {
    var hexCode = document.getElementById('tx_hexcode').value;
    if(hexCode == '') {
        document.getElementById('tx_hexcode').value = hexcode_def;
        hexCode = hexcode_def;
    }
    loadFromHex(hexCode);
}
const hexcode_keyup = () => {
    var hexCode = document.getElementById('tx_hexcode').value;
    var tHex = trueHexcode(hexCode);
    loadFromHex(tHex);
}
const trueHexcode = str => {
    var hexStr = '';
    for(i=0;i<str.length;i++) {
        if(!isNaN(parseInt(str[i],16))) hexStr += str[i];
    }
    return hexStr;
}
const loadFromHex = _hex => {
    if(radioIndex == 1) {
        var hexCode = new Hexcode(_hex);
        document.getElementById('cl_selector').value = '#' + hexCode.toString();
        for(i=2;i<7;i++) {
            var ctrls = document.getElementsByClassName('nb_' + i.toString());
            var ctrlCode;
            if(i==2) ctrlCode = hexCode.toRGB();
            else if(i==3) ctrlCode = hexCode.toHSL();
            else if(i==4) ctrlCode = hexCode.toHSV();
            else if(i==5) ctrlCode = hexCode.toHSI();
            else  ctrlCode = hexCode.toCMYK();
            for(j=0;j<ctrls.length;j++) {
                ctrls[j].value = roundTo(ctrlCode.item(j), 3);
            }
        }
    }
}