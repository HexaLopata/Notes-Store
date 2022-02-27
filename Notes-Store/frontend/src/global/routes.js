import AddNotesPage from '../pages/AddNotesPage'
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
import NotesPage from '../pages/NotesPage'
import RegisterPage from '../pages/RegisterPage'

export const publicRoutes = [
    { path: '/', page: <MainPage/>, name: 'Главная' },
    { path: '/register/', page: <RegisterPage/>, name: 'Регистрация' },
    { path: '/login/', page: <LoginPage/>, name: 'Логин' }
]
    
export const privateRoutes = [
    { path: '/', page: <MainPage/>, name: 'Главная' },
    { path: '/addNotes/', page: <AddNotesPage/>, name: 'Добавить заметки' },
    { path: '/notes/', page: <NotesPage/>, name: 'Заметки' }
]