const teacherBusi = require("../business/teacher");
const messageBean = require("../bean/MessageBean");
const {
  log
} = require("../util");

async function login(ctx, next) {
  const {
    userName,
    userPassword
  } = ctx.request.body;
  let result;
  if (!userName) result = messageBean.INVALID_PARAM("Wechat Name");
  else if (!userPassword) result = messageBean.INVALID_PARAM("Wechat Password");
  if (result) {
    ctx.body = result;
    return;
  }

  try {
    let data = await teacherBusi.login(userName, userPassword);
    if (data[0] != null) {
      //session
      ctx.session.userID = data[0].id;
      log.debug("userID: " + data[0].id);
      ctx.body = {
        state: 'success'
      };
    } else {
      ctx.body = {
        state: 'false'
      };
    }

  } catch (e) {
    console.log(e);
    ctx.body = messageBean.SYSTEM_ERROR;
  }
}

async function register(ctx, next) {
  const {
    name,
    userName,
    userPassword
  } = ctx.query;
  let result;
  if (!name) result = messageBean.INVALID_PARAM("Teacher Name");
  else if (!userName) result = messageBean.INVALID_PARAM("Wechat Name");
  else if (!userPassword) result = messageBean.INVALID_PARAM("Wechat Password");
  if (result) {
    ctx.body = result;
    return;
  }

  try {
    await teacherBusi.register(name, userName, userPassword);
    ctx.body = messageBean.SUCCESS;

  } catch (e) {
    console.log(e);
    ctx.body = messageBean.SYSTEM_ERROR;
  }
}

async function identity(ctx, next) {
  if (ctx.session.userID != null) {
    try {
      let data = await teacherBusi.identity(ctx.session.userID);
      ctx.body = data[0];

    } catch (e) {
      console.log(e);
      ctx.body = messageBean.SYSTEM_ERROR;
    }
  } else {
    ctx.body = {
      wxopenid: null
    };
  }
}

async function deleteTest(ctx, next) {
  if (ctx.session.userID != null) {
    const { id } = ctx.request.body;
    let result;
    if (!id  ) result = messageBean.INVALID_PARAM("id");
    if (result) {
      ctx.body = result;
      return;
    }
    try {
      await teacherBusi.deleteTest(id);
      ctx.body = messageBean.SUCCESS;

    } catch (e) {
      console.log(e);
      ctx.body = messageBean.SYSTEM_ERROR;
    }
  } else {
    ctx.body = messageBean.NOT_LOGIN;
  }
}

async function alterTest(ctx, next) {
  if (ctx.session.userID != null) {
    const {title, addScore, id } = ctx.request.body;
    let result;
    if (!title) result = messageBean.INVALID_PARAM("title");
    else if (!addScore) result = messageBean.INVALID_PARAM("addScore");
    else if (!id  ) result = messageBean.INVALID_PARAM("id");
    if (result) {
      ctx.body = result;
      return;
    }
    try {
      await teacherBusi.alterTest(title, addScore, id);
      ctx.body = messageBean.SUCCESS;

    } catch (e) {
      console.log(e);
      ctx.body = messageBean.SYSTEM_ERROR;
    }
  } else {
    ctx.body = messageBean.NOT_LOGIN;
  }
}

module.exports = {
  login,
  register,
  identity,
  alterTest,
  deleteTest
}
