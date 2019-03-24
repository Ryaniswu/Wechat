const collectBusi = require("../business/collection");
const messageBean = require("../bean/MessageBean");
const { log }     = require("../util");

function trans(num){
    if(num<10){
        return "0"+num;
    }else{
        return num;
    }
}

async function inquireCou(ctx, next) {
    try {
        let data = await collectBusi.inquireCou();
        //返回数据
        ctx.body = data;
    } catch (e) {
        console.log(e);
        ctx.body = messageBean.SYSTEM_ERROR;
    }
}

async function inquireRel(ctx, next) {
    const { className, date } = ctx.request.body;
    let result;
    if   (!className) result = messageBean.INVALID_PARAM("className");
    else if (!date) result   = messageBean.INVALID_PARAM("date");
    if (result) { ctx.body = result; return; }

    try {
        let data = await collectBusi.inquireRel(className, date);
        //返回数据
        ctx.body = data;
    } catch (e) {
        console.log(e);
        ctx.body = messageBean.SYSTEM_ERROR;
    }
}

async function inquireTab(ctx, next) {
    let { className, dateFirst,dateLast } = ctx.request.body;
    let result;
    if   (!className) result   = messageBean.INVALID_PARAM("className");
    else if (!dateFirst) result = messageBean.INVALID_PARAM("dateFirst");
    else if (!dateLast) result = messageBean.INVALID_PARAM("dateLast");
    if (result) { ctx.body = result; return; }
    try {
        //定义输出表格,由student表长决定数组长度
        let table = new Array();
        let date = dateFirst;
        while(date<=dateLast){
            let data = await collectBusi.inquireTab(className, date);
            for(let i=0;i<50;i++){               
                if(data[i]!=null){
                    if(table[i]==null){
                        table[i] = {};
                        table[i].studentId = data[i].student_id;
                        table[i].total = 0;
                    }
                    table[i][date] = data[i].date_score;
                    table[i].total += parseInt(table[i][date]);
                }
            }
            //天数+1
            date = date.substring(0,7)+"-"+trans(date.substring(8,10)-0+1).toString();

        }
        
        //返回数据
        
        ctx.body = JSON.stringify(table);
        //ctx.body = data;
    } catch (e) {
        console.log(e);
        ctx.body = messageBean.SYSTEM_ERROR;
    }
}

module.exports = {
    inquireRel,
    inquireTab,
    inquireCou
}