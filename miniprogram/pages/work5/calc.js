function add(arg1,arg2){
    let t1=0;
    let t2=0;
    if(arg1.toString().indexOf('.')>-1){
        t1 = arg1.toString().split('.')[1].length
    }
    if(arg2.toString().indexOf('.')>-1){
        t2=arg2.toString().split('.')[1].length
    }
    let m=Math.pow(10,Math.max(t1,t2))
    let result =(arg1*m + arg2*m)/m
    return result
}

function mul(arg1,arg2){
    let a1=arg1.toString();
    let a2=arg2.toString();
    let m=0;
    if(a1.indexOf('.')>-1){
        m+=a1.split('.')[1].length;
    }
    if(a2.indexOf('.')>-1){
        m+=a2.split('.')[1].length;
    }
    return Number(a1.replace('.',''))*Number(a2.replace('.','')) / Math.pow(10,m)
}

function sub(arg1,arg2){
    let t1=0;
    let t2=0;
    if(arg1.toString().indexOf('.')>-1){
        t1=arg1.toString().split('.')[1].length
    }
    if(arg2.toString().indexOf('.')>-1){
        t2=arg2.toString().split('.')[1].length
    }
    let m =Math.pow(10,Math.max(t1,t2))
    let result =(mul(arg1, m)-mul(arg2,m))/m
    return result
}

function div(arg1,arg2){
    let t1=0;
    let t2=0;
    let a1=arg1.toString();
    let a2=arg2.toString();

    if(a1.indexOf('.')>-1){
        t1=a1.split('.')[1].length
    }
    if(a2.indexOf('.')>-1){
        t2=a2.split('.')[1].length;
    }
    let r1 =Number(a1.replace('.',''))
    let r2 =Number(a2.replace('.',''))
    return mul(r1/r2,Math.pow(10,t2-t1))
}
function square(arg1,arg2){
    let t1=0;
    let t2=0;
    if(arg1.toString().indexOf('.')>-1){
        t1 = arg1.toString().split('.')[1].length
    }
    if(arg2.toString().indexOf('.')>-1){
        t2=arg2.toString().split('.')[1].length
    }
}
module.exports ={
    add,mul,sub,div
}