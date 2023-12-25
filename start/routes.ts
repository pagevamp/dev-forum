/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'ThreadController.index')
Route.post('/search', 'ThreadController.search')

Route.get('/fake-login', async ({ auth, response }) => {
  try {
    await auth.use('web').attempt('admin@outside.tech', 'secret')
    response.redirect('/posts')
  } catch {
    return response.badRequest('Invalid credentials')
  }
})

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    await auth.use('web').attempt(email, password)
    response.redirect('/threads')
  } catch {
    return response.badRequest('Invalid credentials')
  }
})

Route.get('/threads/:id', async ({ view }) => {
  return view.render('detail')
})

Route.group(() => {
  Route.post('/threads', 'ThreadController.create')
  Route.patch('/threads/:id', 'ThreadController.patch')
  Route.post('/threads/:tradeId/comments', 'CommentController.create')
  Route.patch('/comments/:id', 'CommentController.create')
}).middleware('auth')

Route.get('/users', 'UserController.index')
