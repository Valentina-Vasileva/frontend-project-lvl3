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
        },
      },
    },
    data_loading: {
      success: 'RSS успешно загружен',
      errors: {
        parsing: 'Ресурс не содержит валидный RSS',
        network: 'Ошибка сети',
      },
    },
    buttons: {
      add: 'Добавить',
    },
    author: 'created by Valentina',
  },
};
