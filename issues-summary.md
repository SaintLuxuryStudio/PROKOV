# Проблемы запуска и совместимости

## Зависимости
- `npm install` падает из-за конфликта peer-dependencies: `react-simple-maps@3.0.0` требует React 16–18, а в проекте React 19. Установка возможна только через `npm install --legacy-peer-deps`.
- Обнаружено 5 уязвимостей высокой серьёзности по `npm audit`.

## Dev-сервер
- Next.js обнаружил два `package-lock.json` и выбрал `C:\Users\game4\package-lock.json` как корень workspace, что вызывает предупреждение при `npm run dev`.
- Порт 3000 занят другим процессом — сервер автоматически стартует на порту 3002.

## Тесты
- Все тесты (`npm run test`) проходят без ошибок.

## Рекомендации
- Привести React/React DOM к версии 18.x **или** обновить `react-simple-maps` до версии с поддержкой React 19, чтобы уйти от `--legacy-peer-deps`.
- Удалить лишний `C:\Users\game4\package-lock.json` **или** указать `outputFileTracingRoot` в `next.config.ts` для подавления предупреждения.
- Освободить порт 3000 или запускать с явным портом: `$env:PORT=3002; npm run dev`.
- Прогнать `npm audit fix` (или `npm audit fix --force` после оценки рисков) для устранения уязвимостей.
