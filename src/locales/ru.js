export default {
  translation: {
    title: 'Hexlet Frontend Project',
    app_name: 'RSS агрегатор',
    lead: 'Начните читать RSS сегодня! Это легко, это красиво.',
    inputs: {
      url: {
        label: 'Ссылка RSS',
        placeholder: 'Ссылка RSS',
        example: 'Пример: https://ru.hexlet.io/lessons.rss',
        errors: {
          invalid: 'Ссылка должна быть валидным URL',
          one_of: 'RSS уже существует',
          required: 'Не должно быть пустым',
        },
      },
    },
    data_loading: {
      success: 'RSS успешно загружен',
      errors: {
        parsing: 'Ресурс не содержит валидный RSS',
        network: 'Ошибка сети',
        default: 'Неизвестная ошибка. Что-то пошло не так.',
      },
    },
    buttons: {
      add: 'Добавить',
      watch: 'Просмотр',
      read: 'Читать полностью',
      close: 'Закрыть',
    },
    feeds: {
      title: 'Фиды',
    },
    posts: {
      title: 'Посты',
    },
    author: 'created by Valentina testblabla',
  },
};
