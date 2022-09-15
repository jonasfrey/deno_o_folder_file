class O_selfref{
    constructor(){
        this.o_this = this;


        this.s = "asdf"
    }
}


var o = new O_selfref()