const camp=new Vue({
    el:'#camp',
    data:{
        jnArr:['回复药','拔刀斩','鬼人药','烈焰突刺'],
        jN1:0,
        jN2:0
    }
})
const alli =new Vue({
    el:"#allitm",
    data:{
        moneyG:0,
    }
})
const mmvm = new Vue({
    el:'#mainMenu',
    methods: {
        thisClose(){
            window.close()
        },
    },
})
//敌人图片，修改vem.a的值显示不同敌人
const vem =new Vue({
    el:'#enemy',
    data:{
        gBig:1,
        gSmall:1,
        a:'yhl'
    },
})
var bh1=0;
var bh2=0;
var bh3=Math.floor(Math.random()*3)
var emArr=[[['sss','jgl','yz'],['dmdx','tgs']],[['rys','czz'],['qgl','fzz']],[['ybs','mgl'],['bts','byl']]]
vem.a=emArr[0][0][bh3]
//玩家数据
const vst =new Vue({
    el:'#player',
    data:{
        step:50,    //剩余步数
        plh:1500,
        plhh:1500,
        pc2:1,
        moneyA:0,
        pcc1:50,
        pcc2:100,
        pcc3:150,
        pcc4:0.05,
        plmy:0
    },
    watch:{
        // 实时修改血量
        plh(){
            document.getElementById("plD").style.left=this.plh/this.plhh*390+"px"
        },
        plhh(){
            document.getElementById("plD").style.left=this.plh/this.plhh*390+"px"
        },     
        moneyA(){
            if(vshop.moneyN<=this.moneyA){
                $('.goods button').attr('disabled',false);
            }
        }
    }
})
//敌人数据
const veh =new Vue({
    el:'#emH',
    data:{
        elh:10000,      //敌人血量
        a:'he'         //敌人行动
    },
    watch:{
        // 实时修改血量
        elh(){
            document.getElementById("elD").style.right=this.elh/elhh*740+"px"
        }
    }
})
//敌人最大生命值
var elhh=Math.floor(Math.random()*50)*100+5000;
veh.elh=elhh;
$('#wjss').click(function(){
    vst.plh--
})
//基础棋子效果
// 占位符、基准回复,攻击,特攻,增伤
var pc1=1;        //实际回复
//实际攻击  vst.pc2
var pc3=1;        //实际特攻
var pc4=1;        //实际增伤
var pc4n=0;
//其他效果
var huD=0;      //护盾
$("#tuicu").click(function(){
    $("body").append('<div class="zz"></div>')//创建遮罩
    $(".zz").append('<div class="tancuang"></div>')//创建弹窗
    $('.tancuang').append('<div class="juz">确定退出吗</div></br><div class="juz2"><button id="qdtc" type="button" class="btn btn-lg btn-outline-dark btn1">确定</button><button type="button" id="qxtc" class="btn btn-lg btn-outline-dark btn2">取消</button></div>')
    $("#qdtc").click(function(){window.close()})
    $("#qxtc").click(function(){
        $(".zz").remove();
    })
}); 
$('#start').click(function(){
    $("#gameBody").show()
})
//物品效果
function getGd(i){
    switch (i) {
        case 0:
            vst.pcc2+=50;//力量戒指
        break;
        case 1:
            vst.plhh+=250;//守护戒指 
        break;
        case 2:
            vst.pcc2+=100;//力量护符
        break;
        case 3:
            vst.plhh+=500;//守护护符
        break;
        case 4:
            vst.plmy+=1;//凤凰秘药
        break;
        case 5:
            vst.pcc3+=150;//不祥之刃
            vst.plhh-=250;
        break;
        case 6:
            vst.pcc4*=2;//勇气之证 
        break;
        case 7:
            vst.pcc3+=100;//狱炎宝石 
        break;
    }
}
const vshop=new Vue({
    el:'#shop',
    data:{
        moneyN:1000,
        gd1:0,
        gd2:0,
        gd3:0,
        gnArr:['力量戒指','守护戒指','力量护符','守护护符','凤凰秘药','不祥之刃','勇气之证','狱炎宝石'],
        grArr:['提高普通攻击的伤害','增加生命值的上限','提高更多普攻伤害','增加更多生命值上限','血量为0时回复全部血量','提高特攻，降低血量上限','提高鬼人药的增伤效果','增加特殊攻击的伤害']
    },
    watch:{
        // 侦测钱够不够
        moneyN(){
            if(this.moneyN>vst.moneyA){
                $('.goods button').attr('disabled',true);
            }
        }
    }
})
var gmg=document.getElementById('gmg'); //棋盘
var lines=[[],[],[],[],[],[],[]];   //所有棋子的固定位置
var pis=[1,2,3,4]  //棋子类型
var cupis=[];      //可随机的棋子类型
var pid={};        //棋子的id
var aa;            //属性名
var bb=0;          //属性值，永远自加，当棋子消除后，自加作为新棋子id
var pbb;           //"p"+属性值，棋子元素的id
/*
    lines和pid的关系
    lines[i][j]所对应的棋子，就是pid["p"+i+j]对应的棋子
    获取i和j后，可以根据lines的获得棋子在棋盘上的位置
    left=j*100+'px';top=i*100+'px'; 
*/            
//创建棋盘
for(var i=0;i<7;i++){
    for(var j=0;j<8;j++){
        cupis=[1,2,3,4];
        if(lines[i-2]!=undefined){
            if(lines[i-2][j]==lines[i-1][j]){
                cupis.splice(cupis.indexOf(lines[i-1][j]),1);
            }
        }
        if(lines[i][j-2]!=undefined){
            if(lines[i][j-1]==lines[i][j-2]){
                cupis.splice(cupis.indexOf(lines[i][j-1]),1);
            }
        }
        lines[i][j]=cupis[Math.floor(Math.random()*cupis.length)]
        aa='p'+i+j;
        eval("pid."+aa+"="+bb);
        bb++
    }
}
for(var i=0;i<7;i++){
    for(var j=0;j<8;j++){
        var newP=document.createElement('div');
        newP.className='c c'+lines[i][j];
        newP.style.left=j*100+'px';
        newP.style.top=i*100+'px';
        aa='p'+i+j;
        eval("pbb='p'+pid."+aa+"");
        newP.id=pbb;
        gmg.appendChild(newP)
    }
}
//拖动
var tuod=false;//是否拖动中，按下为t，松开或离开元素为f
var beitd;  //被拖动的元素
var beiyd;  //被beitd交换位置的元素
var xt=0;   //beitd原x轴位置
var yt=0;   //beitd原y轴位置
var xy=0;   //beiyd原x轴位置
var yt=0;   //beiyd原y轴位置
var jl=0;   //移动的距离
var hft;     //定时器，错误拖动的棋子返回原位置
var hfy;     //定时器，错误移动的棋子返回原位置
var tdfx='un'; //拖动方向 x1左 x2右 y1上 y2下 un未确定
var zz=document.getElementById('zz');   //遮罩，覆盖在所有棋子之上
for(var i=0;i<8;i++){
    eval("var ne"+i+"= 0");
}                                          //每一列上面需要建新的棋子
zz.onmousedown=function(e){
    anxia(e)
};
function anxia(e1){                     //在遮罩中按下棋子
    var i1=Math.floor(e1.offsetY/100);
    var j1=Math.floor(e1.offsetX/100);
    tuod=true;
    aa='p'+i1+j1;
    eval("pbb='p'+pid."+aa+"");
    beitd=document.getElementById(pbb);
    xt=parseInt(beitd.style.left);
    yt=parseInt(beitd.style.top);
    zz.onmousemove=function(e2){
        if(tuod){
            if(tdfx=='un'){
                if(Math.abs(e1.offsetX-e2.offsetX)>Math.abs(e1.offsetY-e2.offsetY)){    //左右拖动
                    if(e1.offsetX-e2.offsetX>5&&j1-1>=0){      //向左
                        tdfx='x1'
                        var i2=i1;
                        var j2=j1-1;
                        aa='p'+i2+j2;
                        eval("pbb='p'+pid."+aa+"");
                        beiyd=document.getElementById(pbb);
                        xy=parseInt(beiyd.style.left);
                        yy=parseInt(beiyd.style.top);
                    }else if(e2.offsetX-e1.offsetX>5&&j1+1<=7){                          //向右
                        tdfx='x2'
                        var i2=i1;
                        var j2=j1+1;
                        aa='p'+i2+j2;
                        eval("pbb='p'+pid."+aa+"");
                        beiyd=document.getElementById(pbb);
                        xy=parseInt(beiyd.style.left);
                        yy=parseInt(beiyd.style.top);
                    }   
                }else if(Math.abs(e1.offsetX-e2.offsetX)<=Math.abs(e1.offsetY-e2.offsetY)){ //上下拖动
                    if(e1.offsetY-e2.offsetY>5&&i1-1>=0){      //向上
                        tdfx='y1'
                        var i2=i1-1;
                        var j2=j1;
                        aa='p'+i2+j2;
                        eval("pbb='p'+pid."+aa+"");
                        beiyd=document.getElementById(pbb);
                        xy=parseInt(beiyd.style.left);
                        yy=parseInt(beiyd.style.top);
                    }else if(e2.offsetY-e1.offsetY>5&&i1+1<=6){                          //向下
                        tdfx='y2'
                        var i2=i1+1;
                        var j2=j1;
                        aa='p'+i2+j2;
                        eval("pbb='p'+pid."+aa+"");
                        beiyd=document.getElementById(pbb);
                        xy=parseInt(beiyd.style.left);
                        yy=parseInt(beiyd.style.top);
                    }
            }
            //判断拖动方向
        }
        if(tdfx=='x1'){
                jl=e1.offsetX-e2.offsetX;
                if(jl>100){
                    jl=100
                }else if(jl<0){
                    jl=0
                }
                beitd.style.left=xt-jl+'px'
                beiyd.style.left=xy+jl+'px'
            }else if(tdfx=='x2'){
                jl=e2.offsetX-e1.offsetX;
                if(jl>100){
                    jl=100
                }else if(jl<0){
                    jl=0
                }
                beitd.style.left=xt+jl+'px'
                beiyd.style.left=xy-jl+'px'
            }else if(tdfx=='y1'){
                jl=e1.offsetY-e2.offsetY;
                if(jl>100){
                    jl=100
                }else if(jl<0){
                    jl=0
                }
                beitd.style.top=yt-jl+'px'
                beiyd.style.top=yy+jl+'px'
            }else if(tdfx=='y2'){
                jl=e2.offsetY-e1.offsetY;
                if(jl>100){
                    jl=100
                }else if(jl<0){
                    jl=0
                }
                beitd.style.top=yt+jl+'px'
                beiyd.style.top=yy-jl+'px'
            }
        //鼠标抬起或者离开页面时选择棋子返回位置还是消除
            zz.onmouseup=function(){
                if(jl==100){    //当拖动距离为100时开始判断,将btd和byd的lines位置和pid位置交换
                    //btd所对应的pid属性名
                    for(var i in pid){
                        if(pid[i]==beitd.id.slice(1)){
                            pidT=i
                        }
                    }                        
                    for(var i in pid){
                        if(pid[i]==beiyd.id.slice(1)){
                            pidY=i
                        }
                    }
                    //lines中btd和byd交换位置
                    var wzT=lines[parseInt(pidT.slice(1,2))][parseInt(pidT.slice(2))]
                    //console.log(wzThf);
                    lines[parseInt(pidT.slice(1,2))][parseInt(pidT.slice(2))]=lines[parseInt(pidY.slice(1,2))][parseInt(pidY.slice(2))];
                    lines[parseInt(pidY.slice(1,2))][parseInt(pidY.slice(2))]=wzT;

                    if(!retrieval()){ //全局检索
                        wzT=lines[parseInt(pidY.slice(1,2))][parseInt(pidY.slice(2))];
                        lines[parseInt(pidY.slice(1,2))][parseInt(pidY.slice(2))]=lines[parseInt(pidT.slice(1,2))][parseInt(pidT.slice(2))];
                        lines[parseInt(pidT.slice(1,2))][parseInt(pidT.slice(2))]=wzT;
                        goBack();

                    }else{
                        //pid重新定位
                        getPid();
                        setTimeout(() => {
                            xiaoCu();
                        }, 100);
                        
                        if(tuod){
                            tuod=false; //关闭拖动
                            tdfx='un';  //清除拖动方向
                        }
                    }
                }else{
                    goBack()
                }
            }
        }
    }
}

//pid根据画面重新定位
function getPid(){
    for(var i=0;i<56;i++){
        let yyy=document.getElementsByClassName('c')[i];
        let ppp='p'+parseInt(yyy.style.top)/100+parseInt(yyy.style.left)/100;
        let zzz=yyy.id.slice(1)
        eval("pid."+ppp+"="+zzz);
    }
}
var pidT;
var pidY;
//没有消除时原棋子返回位置
function goBack(){
    if(tuod){
        tuod=false; //关闭拖动
        tdfx='un';  //清除拖动方向
        for(var i in pid){
            if(pid[i]==beitd.id.slice(1)){
                //i是pid的属性名，格式为‘pij’
                let sx=i.slice(2)*100
                let sy=i.slice(1,2)*100
                hft=setInterval(function(){
                    zz.onmousedown='return false'
                    if(parseInt(beitd.style.left)>sx){
                        beitd.style.left=parseInt(beitd.style.left)-1+'px'
                    }else if(parseInt(beitd.style.left)<sx){
                        beitd.style.left=parseInt(beitd.style.left)+1+'px'
                    }else if(parseInt(beitd.style.top)<sy){
                        beitd.style.top=parseInt(beitd.style.top)+1+'px'
                    }else if(parseInt(beitd.style.top)>sy){
                        beitd.style.top=parseInt(beitd.style.top)-1+'px'
                    }else{
                        clearInterval(hft)
                    }
                }
                ,1)
            }
        }                        
        for(var i in pid){
            if(pid[i]==beiyd.id.slice(1)){
                let sx=i.slice(2)*100
                let sy=i.slice(1,2)*100
                hfy=setInterval(function(){
                    if(parseInt(beiyd.style.left)>sx){
                        beiyd.style.left=parseInt(beiyd.style.left)-1+'px'
                    }else if(parseInt(beiyd.style.left)<sx){
                        beiyd.style.left=parseInt(beiyd.style.left)+1+'px'
                    }else if(parseInt(beiyd.style.top)<sy){
                        beiyd.style.top=parseInt(beiyd.style.top)+1+'px'
                    }else if(parseInt(beiyd.style.top)>sy){
                        beiyd.style.top=parseInt(beiyd.style.top)-1+'px'
                    }else{
                        zz.onmousedown=function(e){
                            anxia(e)
                        };
                        clearInterval(hfy)
                    }
                }
                ,1)
            }
        }
    }

}
//全图检索    
var jieG
var arr=[]
function retrieval(){
    jieG=[];
    arr=[];
    var xed=[]; //已经确定在x轴有相连的棋子不会重复测试
    var yed=[]; //已经确定在y轴有相连的棋子不会重复测试
    for(var i=0;i<7;i++){
        for(var j=0;j<8;j++){
            if(xed.indexOf('p'+i+j)==-1&&j+2<8){
                if(lines[i][j]==lines[i][j+1]&&lines[i][j+1]==lines[i][j+2]){//横向三个相连
                    if(j+3<8&&lines[i][j]==lines[i][j+3]){//横向四个相连
                        if(j+4<8&&lines[i][j]==lines[i][j+4]){//横向五个相连
                            arr.push(['p'+i+j,'p'+i+(j+1),'p'+i+(j+2),'p'+i+(j+3),'p'+i+(j+4)])
                            xed.push('p'+i+j,'p'+i+(j+1),'p'+i+(j+2),'p'+i+(j+3),'p'+i+(j+4))   //把确定好的加入到xed
                        }else{
                            arr.push(['p'+i+j,'p'+i+(j+1),'p'+i+(j+2),'p'+i+(j+3)])
                            xed.push('p'+i+j,'p'+i+(j+1),'p'+i+(j+2),'p'+i+(j+3))
                        }
                    }else{
                        arr.push(['p'+i+j,'p'+i+(j+1),'p'+i+(j+2)])
                        xed.push('p'+i+j,'p'+i+(j+1),'p'+i+(j+2))
                    }
                }
            }
            if(yed.indexOf('p'+i+j)==-1&&i+2<7){
                if(lines[i][j]==lines[i+1][j]&&lines[i+1][j]==lines[i+2][j]){//纵向三个相连
                    if(i+3<7&&lines[i][j]==lines[i+3][j]){//纵向四个相连
                        if(i+4<7&&lines[i][j]==lines[i+4][j]){//纵向五个相连
                            arr.push(['p'+i+j,'p'+(i+1)+j,'p'+(i+2)+j,'p'+(i+3)+j,'p'+(i+4)+j])
                            yed.push('p'+i+j,'p'+(i+1)+j,'p'+(i+2)+j,'p'+(i+3)+j,'p'+(i+4)+j)   //把确定好的加入到yed
                        }else{
                            arr.push(['p'+i+j,'p'+(i+1)+j,'p'+(i+2)+j,'p'+(i+3)+j])
                            yed.push('p'+i+j,'p'+(i+1)+j,'p'+(i+2)+j,'p'+(i+3)+j)
                        }
                    }else{
                        arr.push(['p'+i+j,'p'+(i+1)+j,'p'+(i+2)+j])
                        yed.push('p'+i+j,'p'+(i+1)+j,'p'+(i+2)+j)
                    }
                }
            }
        }
    }
    //根据arr中数组进行统计得分
    //console.log(arr);
    ppe(arr)
    //xed和yed清除相同值合并以进行消除
    for(var i=0;i<xed.length;i++){
        if(yed.indexOf(xed[i])!=-1){
            yed.splice(yed.indexOf(xed[i]),1)
        }
    } 
    for(var i=0;i<yed.length;i++){
        xed.push(yed[i])
    }//需要消除的棋子就是xed
    if(arr[0]==undefined){
        return false;
    }else{
        jieG=[arr,xed]
        return true;
    }
}
//消除棋子和棋子下落
var p   //数字
var needNew=[] //数组，集合所有的需要新建的棋子
function xiaoCu(){
    //棋子清除
    for(var i=0;i<jieG[1].length;i++){
        let xxx=document.getElementById('p'+eval('pid.'+jieG[1][i]));
        xxx.remove()
        lines[jieG[1][i].slice(1,2)][jieG[1][i].slice(2)]=0;    //lines中把清除的棋子值变为0
        eval("pid.p"+jieG[1][i].slice(1,2)+jieG[1][i].slice(2)+"=NaN")  //pid中把清除的棋子值变为NaN
    }

    setTimeout(function(){ //等待0.1秒lines中棋子下落
            needNew=[]
            for(var i=6;i>=0;i--){
                for(var j=7;j>=0;j--){
                    if(lines[i][j]==0){
                        if(i-1>=0&&lines[i-1][j]!=0){
                            lines[i][j]=lines[i-1][j];            
                            lines[i-1][j]=0;                          //lines中修改棋子位置

                            eval("pid.p"+i+j+"=pid.p"+(i-1)+j);
                            eval("pid.p"+(i-1)+j+"=NaN");               //pid中修改棋子位置

                        }else if(i-1>=0&&lines[0][j]!=0&&lines[i-1][j]==0){ //当空位子上面为空，但是最上面还有棋子时
                            for(var o=i-1;o>=0;o--){
                                if(lines[o][j]!=0){
                                    p=o
                                    break;                             //p为应该下落的棋子的i位置
                                }
                            }
                            lines[i][j]=lines[p][j];            
                            lines[p][j]=0;                          //lines中修改棋子位置
                            
                            eval("pid.p"+i+j+"=pid.p"+p+j);
                            eval("pid.p"+p+j+"=NaN");               //pid中修改棋子位置

                        }else{  //当空位子上面没有棋子时
                            lines[i][j]=Math.floor(Math.random()*4)+1;  //lines中增加新棋子
                            bb++
                            needNew.push([i,j,lines[i][j],bb])             //document中加入新棋子
                            eval("pid.p"+i+j+"="+bb)                    //pid中加入新棋子
                        }
                    }
                }
            }
            for(var i=0;i<needNew.length;i++){      //在画面外建新出新的棋子
                eval("ne"+needNew[i][1]+"++")
                var newpic=document.createElement('div')
                newpic.className="c c"+needNew[i][2];
                newpic.style.left=needNew[i][1]*100+'px'
                newpic.id="p"+needNew[i][3]
                newpic.style.top=-100*eval("ne"+needNew[i][1])+'px'
                gmg.appendChild(newpic)
            }
            for(var i=0;i<8;i++){               //建新完成后清除ne“i”
                eval("ne"+i+"="+0); 
            }    
            allDown();
    
        },500)
}
var allDownT;
var isDown=true;
var ifd;
function allDown(){                        //棋子根据pid位置下落
    isDown=true
    allDownT = setInterval(() => {
        if(isDown){
            ifd=0;
            zz.onmousedown='return false'                      //需要移动时自加
            for(var i=0;i<7;i++){
                for(var j=0;j<8;j++){
                    var pdid=eval("pid.p"+i+j)
                    var pddc=document.getElementById("p"+pdid)
                    if(parseInt(pddc.style.top)!=i*100){
                        ifd++
                        pddc.style.top=parseInt(pddc.style.top)+2+'px'
                    }
                }
            }
            if(ifd==0){
                isDown=false
            }
        }else{
            clearInterval(allDownT)
            if(retrieval()){
                //getPid();
                setTimeout(()=>{
                    xiaoCu();
                },100)
            }else{
                vst.step--
                //一次移动到此结束
                if(Math.floor(veh.elh)<=0){//判断敌人死亡
                    emD()
                }else{//敌人攻击
                    emHit()
                }
                //开启玩家可移动棋子权限，改到其他地方
                zz.onmousedown=function(e){
                    anxia(e)
                };  
            }
        }
    }, 1);
}

//棋子产生效果
function ppe(arr){
    if(arr!=[]){
        for(var i=0;i<arr.length;i++){
            var lx=lines[arr[i][0].charAt(1)][arr[i][0].charAt(2)]
            //console.log(lx);
            if (arr[i].length==5) { //五连珠 5倍效果
                pc1+=4;vst.pc2+=4;pc3+=4;pc4+=4;
            }else if(arr[i].length==4){ //四连珠 2倍效果
                pc1+=1;vst.pc2+=1;pc3+=1;pc4+=1;
            }
            switch (lx) {
                case 1:
                    pzc1(arr[i].length)
                    break;
                case 2:
                    pzc2(arr[i].length)
                    break;
                case 3:
                    pzc3(arr[i].length)
                    break;
                case 4:
                    pzc4(arr[i].length)
                    break;
            }
            if (arr[i].length==5) {//清除效果
                pc1-=4;vst.pc2-=4;pc3-=4;pc4-=4;
            }else if(arr[i].length==4){
                pc1-=1;vst.pc2-=1;pc3-=1;pc4-=1;
            }
        }
    }
}

//回复血量
function pzc1(n){
    if((n*vst.pcc1*pc1+vst.plh)>vst.plhh){
        vst.plh=vst.plhh;
    }else{
        vst.plh+=n*vst.pcc1*pc1;
    }
    let str="+"+Math.floor(n*vst.pcc1*pc1)
    setTimeout(function(){
        ptj(str,'rgb(13, 219, 61)')
    },200+Math.random()*300)
}
//普攻
function pzc2(n){
    veh.elh=veh.elh-n*vst.pcc2*vst.pc2;
    let str="-"+Math.floor(n*vst.pcc2*vst.pc2)
    setTimeout(function(){
        etj(str,"rgb(81, 113, 229)")
    },200+Math.random()*300)
}
//特攻
function pzc3(n){
    veh.elh=veh.elh-n*vst.pcc3*pc3;
    let str="-"+Math.floor(n*vst.pcc3*pc3)
    setTimeout(function(){
        etj(str,"rgb(251, 91, 12)")
    },200+Math.random()*300)
}
//增伤
function pzc4(n){
    pc4n+=n*vst.pcc4*pc4;   //本关结束后清除增伤效果
    vst.pc2+=n*vst.pcc4*pc4;
    pc3+=n*vst.pcc4*pc4;
    let a=n*vst.pcc4*pc4;
    setTimeout(function(){
        ptj("↑"+a.toFixed(2),'rgb(241, 186, 21)')
    },200+Math.random()*300)
}

var guanqia=[1,1]//关卡数

var psn=0//跳出数字次数
function ptj(str,fcolor){   //玩家位置跳出数字
    psn++
    let psnn=psn
    $("#pm").append($('<span id="spann'+psnn+'" style="color:'+fcolor+';top:'+Math.floor(80*Math.random())+'%;left:'+Math.floor(60*Math.random())+'%;animation-name:am1;animation-delay:0.2s;animation-duration:0.9s">'+str+'</span>'))
    setTimeout(function(){
       $('#spann'+psnn).remove()
    },900)
}
function etj(str,fcolor){   //敌人位置跳出数字
    psn++
    let psnn=psn
    $("#em").append($('<span id="spann'+psnn+'" style="color:'+fcolor+';top:'+Math.floor(80*Math.random())+'%;left:'+Math.floor(60*Math.random())+'%;animation-name:am1;animation-delay:0.2s;animation-duration:0.9s">'+str+'</span>'))
    setTimeout(function(){
       $('#spann'+psnn).remove()
    },900)
}

function emD(){   //敌人死亡
    //隐藏棋盘，显示提示框
    if($('#emn').text()=='最终关卡'){
        sengLi()//游戏胜利
    }else{
        alli.moneyG=-Math.floor(veh.elh);
        vst.moneyA+=alli.moneyG;
        $("#pg").hide();
        $("#tsk").show()
    }
}
function emHit(){   //敌人技能
    switch (veh.a) {
        case 'at1':
            let atn1=emS*Math.floor(Math.random()*100+200);
            vst.plh-=atn1;
            setTimeout(function(){
                ptj("-"+atn1,"red")
            },200+Math.random()*300)
            break;
        case 'at2':
            let atn2=emS*Math.floor(Math.random()*300+100);
            vst.plh-=atn2;
            setTimeout(function(){
                ptj("-"+atn2,"red")
            },200+Math.random()*300)
            break;
        case 'he':
            let hen=emS*Math.floor(Math.random()*500+500);
            veh.elh+=hen;
            setTimeout(function(){
                etj("+"+hen,"green")
            },200+Math.random()*300)
            break;
    }
    siBai();
    let ra=Math.floor(Math.random()*3)
    switch (ra) {
        case 0:
            veh.a='at1'
            break;
        case 1:
            veh.a='at2'
            break;
        case 2:
            veh.a='he'
            break;
    }
}
//显示&隐藏状态栏
$('#wjzt').click(function(){
    $('#wjzt').hide();
    $('#wjzt1').show()
})
$('#wjzt1').click(function(){
    $('#wjzt').show();
    $('#wjzt1').hide()
})
//获得金币，进入额外关卡
var rnb
$("#hdjb").click(function(){
    vst.pc2-=pc4n;
    pc3-=pc4n;
    pc4n=0;
    rnb=Math.floor(Math.random()*3);
    console.log(rnb);
    $("#emH").css('opacity','0');
    $("#em").css('opacity','0');
    $('#tsk').hide()
    switch (rnb) {
        case 0: //进入商店
            vshop.gd1=Math.floor(Math.random()*8)
            $('.gd1 .itim').css('background-image','url(./img/物品/'+vshop.gd1+'.png')
            vshop.gd2=Math.floor(Math.random()*8)
            $('.gd2 .itim').css('background-image','url(./img/物品/'+vshop.gd2+'.png')
            vshop.gd3=Math.floor(Math.random()*8)
            $('.gd3 .itim').css('background-image','url(./img/物品/'+vshop.gd3+'.png')
            $("#shop").show()
            $('.goods').show()
            break;
        case 1: //进入营地
            camp.jN1=Math.floor(Math.random()*4);
            camp.jN2=Math.floor(Math.random()*3);
            if(camp.jN1==camp.jN2){camp.jN2++};
            $('.jn1 div').css('background-image','url(./img/棋子/'+camp.jnArr[camp.jN1]+'.png)')
            $('.jn2 div').css('background-image','url(./img/棋子/'+camp.jnArr[camp.jN2]+'.png)')
            $('.jn1').css('background-color',caCl[camp.jN1])
            $('.jn2').css('background-color',caCl[camp.jN2])
            $("#camp").show()
            break;
        case 2:
            //进入事件
            $('#unKnown').show()
            sji=Math.floor(Math.random()*10)
            $('#unKnown button').hide();
            $('.tls').text(sjArr[sji][0]);
            $('.tlb1').text(sjArr[sji][1]);
            $('.tlb2').text(sjArr[sji][2]);
            $('.tlb').show();
            break;
    }
})
$('.tlb1').click(function(){
    $('.tls').text(sjArr[sji][3]);
    sjJ(sji,0)
    $('.tlb').hide();
    $('#unKnown button').show();
})
$('.tlb2').click(function(){
    $('.tls').text(sjArr[sji][4]);
    sjJ(sji,1)
    $('.tlb').hide();
    $('#unKnown button').show();
})
var sji;
//营地技能选择颜色
var caCl=['rgba(6, 246, 57,0.8)','rgba(91, 101, 168,0.8)','rgba(242, 172, 18,0.8)','rgba(245, 123, 26,0.8)']
//营地按钮
function zengQ(n){  //增强技能
    switch (n) {
        case 0:
            vst.pcc1+=50;
            break;
        case 1:
            vst.pcc2+=75;
            break;
        case 2:
            vst.pcc4*=2;
            break;
        case 3:
            vst.pcc3+=50;
            break;
    }
}
$('.jn1 button').click(function(){
    zengQ(camp.jN1)
    xyg()

})
$('.jn2 button').click(function(){
    zengQ(camp.jN2)
    xyg()
})
var emS=1//敌人强度 
//进入下一关
function xyg(){
    if(vem.gSmall==5){
        //进入下一大关
        vem.gBig++;
        vem.gSmall=1;
        switch (vem.gBig) {
            case 2:
                $('#gameBody').css('background-image','url("./img/背景图/熔岩洞.jpg")')
                break;
            case 3:
                $('#gameBody').css('background-image','url("./img/背景图/冰封群岛.jpg")')                
                break;
            case 4:
                $('#gameBody').css('background-image','url("./img/背景图/废神社.jpg")')         
                break;
        }
    }else{
        vem.gSmall++;
    }//关卡切换
    //敌人修改
    if(vem.gBig==4){    //最终关卡
        emS++
        $("#emn").text('最终关卡');
        vem.a='yhl';
        veh.elh=50000;
        elhh=veh.elh;
    }else{
        if(vem.gSmall<5){   //普通怪物
            bh1=vem.gBig-1;
            bh2=0;
            bh3=Math.floor(Math.random()*emArr[vem.gBig-1][0].length);
            vem.a=emArr[bh1][bh2][bh3]
            veh.elh=emS*(Math.floor(Math.random()*50)*100+5000);
            elhh=veh.elh;
        }else{  //关底Boss
            emS+=0.2;//强度增加
            bh1=vem.gBig-1;
            bh2=1;
            bh3=Math.floor(Math.random()*emArr[vem.gBig-1][1].length);
            vem.a=emArr[bh1][bh2][bh3]
            veh.elh=emS*(Math.floor(Math.random()*100)*200+10000);
            elhh=veh.elh;
        }
    }        
    //隐藏其他内容，显示敌人和棋盘
    $("#shop").hide()
    $("#camp").hide()
    $("#unKnown").hide()
    $("#emH").css('opacity','1');
    $("#em").css('opacity','1');
    $("#pg").show();
}
$('.xyg').click(function(){xyg()})
if(vshop.moneyN>vst.moneyA){
    $('.goods button').attr('disabled',true);
}
$('.gd1 button').click(function(){
    getGd(vshop.gd1)
    $('.gd1').hide()
    vst.moneyA-=vshop.moneyN;
    vshop.moneyN+=1000;
})
$('.gd2 button').click(function(){
    getGd(vshop.gd2)
    $('.gd2').hide()
    vst.moneyA-=vshop.moneyN;
    vshop.moneyN+=1000;
})
$('.gd3 button').click(function(){
    getGd(vshop.gd3)
    $('.gd3').hide()
    vst.moneyA-=vshop.moneyN;
    vshop.moneyN+=1000;
})
//事件数组
var sjArr=[
    [
        ['你发现一处山洞和旁边的一条溪流，你决定'],
        ['进入山洞一探究竟'],
        ['顺着溪流往下探索 '],
        ['在山洞内部发现了白色的箱子，你搜索了一下，获得不祥之刃'],
        ['在溪流下游发现了一具尸体，你尝试着搜索一下，获得力量护符']
    ],
    [
        ['你发现路边受伤的巫师正在向你寻求帮助，你决定'],
        ['帮助他回到暴风城'],
        ['趁其受伤杀死巫师 '],
        ['巫师很感谢你，为你炼制了凤凰秘药'],
        ['搜刮他并从头手上了获得力量戒指']
    ],
    [
        ['你发现帝国巡逻队和暴风斗篷巡逻队的械斗，你决定 '],
        ['帮助帝国巡逻队'],
        ['帮助暴风斗篷巡逻队'],
        ['帝国巡逻队很感谢你的帮助，给你了一些金币'],
        ['暴风斗篷巡逻队绝的你是个勇士，授予你勇气之证']
    ],
    [
        ['你发现雪漫西边的平原远处有一片不死族坟地 你决定'],
        ['去深处探险并与不死族决斗'],
        ['往左边走避开不死族'],
        ['你在决斗的个过程中受了伤，但发现了宝箱，失去了一半血量 获得狱炎宝石'],
        ['什么都没有发生']
    ],
    [
        ['你发现一个莫名其妙的兄弟会刺客突然袭击你 你决定'],
        ['正面对敌 '],
        ['立即逃跑'],
        ['搏斗中被他袖剑刺中失去一半血量,成功击败他从他胸前拿到了力量护符'],
        ['逃跑的过程中被飞剑刺中,失去一半血量   ']
    ],
    [
        ['你发现了一只强大的鸟龙类怪物，你决定'],
        ['正大光明的攻击它'],
        ['趁它不注意偷袭它'],
        ['你与它斗个旗鼓相当，它飞走了，留下了勇气之证'],
        ['你通过偷袭成功击杀了它，在它身上上发现了凤凰秘药']
    ],
    [
        ['你发现了一只被石头压住的艾露猫 旁边还有一把锋利的刀刃，你决定'],
        ['把它从石头里面解救出来'],
        ['无视它并从他一旁拿走那把锋利的刀刃'],
        ['它很开心给你了守护戒指'],
        ['获得不祥之刃']
    ],
    [
        ['你发现了左右山上各有一处矿脉，你决定'],
        ['往左边走开采红色矿石'],
        ['往右边走开采金矿'],
        ['获得狱炎宝石'],
        ['获得随机金钱']
    ],
    [
        ['你在发现天际城一头可怕的巨龙在袭击人类，你决定'],
        ['攻击巨龙吸引注意'],
        ['找机会疏散市民逃跑'],
        ['与巨龙僵持中被他的龙息烧中失去了一半血量,国王很感谢你的帮助，授予你力量护符'],
        ['市民们感激你的帮助,授予你守护护符']
    ],
    [
        ['你发现了惨死野外的猎人，你决定'],
        ['小心的埋葬他的尸体'],
        ['搜刮他的物品 '],
        ['过程中从他衣服口袋里掉落了力量戒指'],
        ['被他的胸前伤口处黑魔法断刃划伤,失去了一半血量']
    ],
]
//事件结果
function sjJ(i,j){
    switch(""+i+j){
        case '00':vst.pcc3+=150;vst.plhh-=250;break;
        case '01':vst.pcc2+=100;break;
        case '10':vst.plmy+=1; break;
        case '11':vst.pcc2+=50; break;
        case '20':vst.moneyA+=Math.floor(Math.random()*10000); break;
        case '21':vst.pcc4*=2; break;
        case '30':vst.plh*=0.5;vst.pcc3+=100; break;
        case '31': break;
        case '40':vst.plh*=0.5;vst.pcc2+=100; break;
        case '41':vst.plh*=0.5; break;
        case '50':vst.pcc4*=2; break;
        case '51':vst.plmy+=1; break;
        case '70':vst.pcc3+=100; break;
        case '71':vst.moneyA+=Math.floor(Math.random()*10000);break;
        case '80':vst.plh*=0.5;vst.pcc2+=100; break;
        case '81':vst.plhh+=500; break;
        case '60':vst.plhh+=250;break;
        case '61':vst.plhh-=250; vst.pcc3+=150;break;
        case '90':vst.pcc2+=50 ;break;
        case '91':vst.plh*=0.5 ;break;
    }
}
var emnArr=[[['水生兽','狡狗龙','野猪'],['大名盾蟹','天狗兽']],[['熔岩兽','臣蜘蛛'],['奇怪龙','妃蜘蛛']],[['变形幼冰鲨','眠狗龙'],['白兔兽','冰牙龙']]]
function siBai(){   //失败判定
    if(vst.plh<=0){ //当玩家血量小于等于0时
        if(vst.plmy>0){ //如果有凤凰秘药
            vst.plmy--; //秘药减一，回复全部血量
            vst.plh=vst.plhh;
        }else{  //失败，游戏结束
            //$("#gameBody").append('<div class="zz"></div>');
            jiLu(0)
            $('#vct').text('失败');
            if ($('#emn').text()=='最终关卡') {
                $('#gmny').text('你死于怨虎龙,游戏失败')
            }else{
                $('#gmny').text('你死于'+emnArr[bh1][bh2][bh3]+',游戏失败')
            }
            $('#hdjb').text('确定')
            $('#hdjb').off()
            $('#hdjb').click(function(){
                location.reload()
            })
            $('#pg').hide()
            $('#tsk').show();

        }
    }
}
function sengLi(){
    jiLu(1)
    $('#vct').text('胜利');
    $('#gmny').text('你成功了,游戏胜利')
    $('#hdjb').text('确定')
    $('#hdjb').off()
    $('#hdjb').click(function(){
        location.reload()
    })
    $('#pg').hide()
    $('#tsk').show();
}
var cb;
function jiLu(b){//储存记录
    if(b==1){
        cb='成功'
    }else{
        cb='失败'
    }
    var d = new Date();
    var fz=d.getMinutes();
    if(fz<10){
        fz='0'+fz
    }
    var jln=localStorage.getItem('gtjl');
    //成败、关卡、状态值、时间
    var jlp=cb+"*"+$('#emn').text()+"*"+(d.getMonth()+1)+'月'+(d.getDate())+'日'+(d.getHours())+':'+fz+'*攻击:'+vst.pcc2+' 特攻:'+vst.pcc3+' 回复:'+vst.pcc1+' 增伤:'+vst.pcc4+' 生命:'+vst.plhh
    if(jln==null){
        localStorage.setItem("gtjl",jlp);
    }else{
        localStorage.setItem("gtjl",jln+'|'+jlp);
    }
}
$("#credits").click(function(){
    $("body").append('<div class="zz2"></div>')
    $(".zz2").append('<div class="tanchuanga"></div>')
    $('.tanchuanga').append('<div class="namep"><h1 id="zhizuomingdan" class="mask">制作名单:</h1><div class="mask"></br><span class="mask1" data>主程序:</span></br><span class="mask2">马健</span></br><span class="mask1">标题页面:</span></br><span class="mask2">周士博</span></br><span class="mask1">历史记录:</span></br><span class="mask2">马广林</span></br><span class="mask1">商店页面:</span></br><span class="mask2">毛森森</span></br><span class="mask1">物品设计:</span></br><span class="mask2">毛森森</span></br><span class="mask1">事件页面:</span></br><span class="mask2">潘丽硕</span></br><span class="mask1">事件设计:</span></br><span class="mask2">潘丽硕</span></div><button id="guanbi">关闭</button></div>')
    $("#guanbi").click(function(){
        $(".zz2").remove();
      });
})
$('#history').click(function(){
    $('#lsjl').show()
})
$('#lsjl button').click(
    function(){
        $('#lsjl').hide()
    }
)
var jlArr0=localStorage.getItem('gtjl')
if(jlArr0!=null){
    var jlArr1=jlArr0.split('|').reverse()
    var jlArr=jlArr1.reverse()
    for(var i=0;i<jlArr.length;i++){
        var jarr=jlArr[i].split('*')
        $('#lsjl').append('<div class="jld"><span class="cf">'+jarr[0]+'</span><span class="gqs">'+jarr[1]+'</span><span class="dTime">'+jarr[2]+'</span><span class="ztz">'+jarr[3]+'</span></div>');
    }
}





jjkj