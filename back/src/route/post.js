// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

//підключаємо (імпортуємо) клас Post
const { Post } = require('../class/post')

// ====================

// роутер-ПОСТ буде передавати дані на сервер щодо нового створенного поста
router.post('/post-create', function (req, res) {
  try {
    const { username, text, postId } = req.body

    if (!username || !text) {
      return res.status(400).json({
        message:
          'Потрібно передати всі дані для створення поста',
      })
    }

    //тимчасова змінна для поста
    let post = null

    console.log(postId, 'postId')

    //якщо postId існує, то створюємо пост з коментарями
    if (postId) {
      //отримуємо по індетифікатору postId, якщо він існує
      post = Post.getById(Number(postId))
      console.log('post', post)

      if (!post) {
        return res.status(400).json({
          message: 'пост з таким ID не існує',
        })
      }
    }

    //створюємо новий пост
    const newPost = Post.create(username, text, post)

    return res.status(200).json({
      //технічний вивід даних, щоб побачити, що пост створено
      post: {
        id: newPost.id,
        text: newPost.text,
        username: newPost.username,
        date: newPost.date,
      },
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//================

// роутер-ГЕТ буде відображати список постів отриманих з сервера
router.get('/post-list', function (req, res) {
  try {
    //отримуємо список список постів з сервера
    const list = Post.getList()

    if (list.length === 0) {
      return res.status(200).json({
        list: [],
      })
    }

    return res.status(200).json({
      //витягуємо потрібні дані та їх же повертаємо
      list: list.map(({ id, username, text, date }) => ({
        id,
        username,
        text,
        date,
      })),
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//================

// роутер-ГЕТ буде відображати список коментарів обраного поста
router.get('/post-item', function (req, res) {
  try {
    //витягуємо ідентифікатор id
    const { id } = req.query

    if (!id) {
      return res.status(400).json({
        message: 'Потрібно передати ID поста',
      })
    }

    //знаходимо пост за ідентифікатором ID
    const post = Post.getById(Number(id))

    if (!post) {
      return res.status(400).json({
        message: 'Пост з таким ID не існує',
      })
    }

    return res.status(200).json({
      post: {
        id: post.id,
        text: post.text,
        username: post.username,
        date: post.date,

        reply: post.reply.map((reply) => ({
          id: reply.id,
          text: reply.text,
          username: reply.username,
          date: reply.date,
        })),
      },
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//===============

module.exports = router // Підключаємо роутер до бек-енду
