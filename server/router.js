var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var moduleDB = require('./db/db') // 引入数据模型
var $sql = require('./db/mySQL') // 引入sql语句对象
// 连接 mysql 数据库
var conn = mysql.createConnection(moduleDB.mysql)
conn.connect()

// 注册
// router.post('/register', (req, res) => {
//   // res.send("纳米好")
//   // 1、获取表单提交数据
//   const user = req.body
//   // console.log(user.username);
//   // 获取对于的sql语句
//   const selUser_sql =
//     $sql.usersql.select +
//     " where username = '" +
//     user.username +
//     "' or email = '" +
//     user.email +
//     "' "
//   // console.log(reg_sql);
//   const addUser_sql = $sql.usersql.add
//   // 2、 先查询是否存在该用户名
//   conn.query(selUser_sql, user, (error, result1) => {
//     if (error) {
//       // console.log(error);
//       res.send({
//         meta: {
//           msg: '请求错误！',
//           status: 400
//         }
//       })
//       return
//     }
//     // console.log(user);
//     if (result1.length != 0 && user.username === result1[0].username) {
//       res.send({
//         meta: {
//           msg: '用户名已存在',
//           status: 403
//         }
//       }) // 表示用户名已存在
//     } else if (result1.length != 0 && user.email === result1[0].email) {
//       res.send({
//         meta: {
//           msg: '邮箱已存在',
//           status: 403
//         }
//       }) // 表示邮箱已存在
//     } else {
//       // 如果不存在就进行 插入数据
//       conn.query(
//         addUser_sql,
//         [user.username, user.email, user.password],
//         (err, result2) => {
//           if (err) {
//             // console.log(err);
//             res.send({
//               meta: {
//                 msg: '请求错误！',
//                 status: 400
//               }
//             })
//           } else {
//             // console.log(result2);
//             res.send({
//               data: {
//                 username: user.username,
//                 email: user.email,
//                 password: user.password
//               },
//               meta: {
//                 msg: '注册成功',
//                 status: 200
//               }
//             })
//           }
//         }
//       )
//     }
//   })
// })

// 登录：
router.post('/login', (req, res) => {
  const getUser = req.body
  // console.log(getUser);
  const selEmail_sql =
    $sql.usersql.select + " where username = '" + getUser.username + "'"
  // 进行数据查询
  conn.query(selEmail_sql, getUser.username, (error, results1) => {
    if (error) {
      console.log(error)
      res.send({
        meta: {
          msg: '请求错误！',
          status: 400
        }
      })
      return
    }
    // 如果查询不到登录用户
    if (results1[0] === undefined) {
      // 用户不存在
      res.send({
        meta: {
          msg: '用户名不存在，请先注册!',
          status: 402,
          date: results1
        }
      })
    } else {
      // 登录根据email和password来登录
      if (
        results1[0].username == getUser.username &&
        results1[0].password == getUser.password
      ) {
        res.send({
          meta: {
            msg: '登录成功',
            status: 200
          }
        })
      } else {
        res.send({
          // 用户存在，但是输入的密码错误
          meta: {
            msg: '用户或者密码错误',
            status: 404
          }
        })
      }
    }
  })
})

// conn.end()
module.exports = router
