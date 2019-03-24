const studentBusi = require("../business/student");
const messageBean = require("../bean/MessageBean");
const { log }     = require("../util");

async function insert(ctx, next) {
    const { studentName, studentId } = ctx.request.body;
    let result;
    if   (!studentName) result  = messageBean.INVALID_PARAM("Student Name");
    else if (!studentId) result = messageBean.INVALID_PARAM("Student ID");
    if (result) { ctx.body = result; return; }

    try {
        let data = await studentBusi.insert(studentName, studentId);
        if(data!=0){
        ctx.body = messageBean.SUCCESS;
        }else{
            ctx.body = messageBean.SYSTEM_ERROR;
        }
    } catch (e) {
        console.log(e);
        ctx.body = messageBean.SYSTEM_ERROR;
    }
}

async function deleteStu(ctx, next) {
    const { studentName, studentId } = ctx.request.body;
    let result;
    if   (!studentName) result  = messageBean.INVALID_PARAM("Student Name");
    else if (!studentId) result = messageBean.INVALID_PARAM("Student ID");
    if (result) { ctx.body = result; return; }
    try {
        await studentBusi.deleteStu(studentName, studentId );
        ctx.body = messageBean.SUCCESS;
    } catch (e) {
        console.log(e);
        ctx.body = messageBean.SYSTEM_ERROR;
    }
}

async function output(ctx, next) {
    try {
        let data = await studentBusi.output();
        ctx.body = data;
    } catch (e) {
        console.log(e);
        ctx.body = messageBean.SYSTEM_ERROR;
    }
}

async function alterStu(ctx, next) {
    const { studentName, studentId, id } = ctx.request.body;
    let result;
    if   (!studentName) result  = messageBean.INVALID_PARAM("Student Name");
    else if (!studentId) result = messageBean.INVALID_PARAM("Student ID");
    else if (!id) result = messageBean.INVALID_PARAM("id");
    if (result) { ctx.body = result; return; }

    try {
        await studentBusi.alterStu(studentName, studentId, id);
        ctx.body = messageBean.SUCCESS;
    } catch (e) {
        console.log(e);
        ctx.body = messageBean.SYSTEM_ERROR;
    }
}

async function insertData(ctx,next){
    if (ctx.session.userID != null) {
    const { className, title,studentID ,addScore} = ctx.request.body;
    let result;
    if   (!className) result    = messageBean.INVALID_PARAM("Class Name")
    else if (!title) result    = messageBean.INVALID_PARAM("Tittle")
    else if (!studentID) result = messageBean.INVALID_PARAM("Student ID")
    else if (!addScore) result  = messageBean.INVALID_PARAM("Add Score");
    if (result) { ctx.body = result; return; }

    try {
        
        for(let s of studentID){
        await studentBusi.insertData(className, title,s ,addScore,ctx.session.userID);
        }
        ctx.body = messageBean.SUCCESS;
    } catch (e) {
        console.log(e);
        ctx.body = messageBean.SYSTEM_ERROR;
    }
} else {
    ctx.body = messageBean.NOT_LOGIN;
  }
}

async function inquire(ctx,next){
    if (ctx.session.userID != null) {
    const {className, studentID ,date} = ctx.request.body;
    let result;
    if   (!studentID) result = messageBean.INVALID_PARAM("Student ID")
    else if (!date) result   = messageBean.INVALID_PARAM("date");
    else if (!className) result   = messageBean.INVALID_PARAM("className");
    if (result) { ctx.body = result; return; }

    try {
        let data = await studentBusi.inquire(className, studentID , date, ctx.session.userID);
        //返回数据
        ctx.body = data[0];
    } catch (e) {
        console.log(e);
        ctx.body = messageBean.SYSTEM_ERROR;
    }
}else{
    ctx.body = messageBean.NOT_LOGIN;
}
}

module.exports = {
    insert,
    insertData,
    inquire,
    output,
    deleteStu,
    alterStu

}