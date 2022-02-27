export default class TranslationService {
    constructor() {
        this._phrases = new Map()
        this._phrases.set(
            'User already exists', 'Такой пользователь уже существует'
        ).set(
            'Invalid username or password', 'Неверный email или пароль'
        ).set(
            'username', 'Email'
        ).set(
            'password', 'Пароль'
        )
    }

    translate(string) {
        if (this._phrases.has(string)) {
            return this._phrases.get(string)
        } else {
            return string
        }
    }
}