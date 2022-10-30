class RGB {
    constructor(_red, _green, _blue) {
        var tr, tg, tb;
        tr = parseInt(_red);
        tg = parseInt(_green);
        tb = parseInt(_blue);
        if(isNaN(tr) || isNaN(tg) || isNaN(tb)) {
            this.Red = NaN; this.Green = NaN; this.Blue = NaN;
        }
        else {
            this.Red = (tr<0)?0:((tr>255)?255:tr);
            this.Green = (tg<0)?0:((tg>255)?255:tg);
            this.Blue = (tb<0)?0:((tb>255)?255:tb);
        }
    }
    toString() {
        return this.Red + ';' + this.Green + ';' + this.Blue;
    }
}