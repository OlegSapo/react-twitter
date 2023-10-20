class Post {
  //властивості класу
  static #list = []
  static #count = 1 //для створення унікальних ідентифікаторів постам

  constructor(username, text) {
    this.id = Post.#count++
    this.username = username //автор поста
    this.text = text //текст поста
    this.date = new Date().getTime() //дата створення поста
    this.reply = [] //коментарі для постів
  }

  //метод класу для створення нового поста
  static create(username, text, post) {
    const newPost = new Post(username, text)

    if (post) {
      //для створення поста з коментарями
      post.reply.push(newPost)

      console.log(post)
    } else {
      //для створення поста без коментарями
      this.#list.push(newPost)
    }

    console.log(this.#list)

    return newPost
  }

  static getById(id) {
    return (
      this.#list.find((item) => item.id === Number(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = { Post }
