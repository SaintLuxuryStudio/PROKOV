# Проблемы запуска и совместимости

## Зависимости
- `npm install` падает из-за конфликта peer dependencies: `react-simple-maps@3.0.0` требует React 16–18, в проекте React 19. Сейчас установка прошла только с `npm install --legacy-peer-deps`.
- Есть 5 high severity vulnerabilities по `npm audit` (детали не проверялись).

## Dev-сервер
- Next.js нашёл два `package-lock.json` и выбрал `C:\Users\game4\package-lock.json` как корень workspace. Это вызывает предупреждение при `npm run dev`.
- Порт 3000 занят, сервер стартует на 3002.

## Тесты
- `npm run test` проходит без ошибок.

## Рекомендации
- Привести React/React DOM к 18.x **или** обновить `react-simple-maps` на версию с поддержкой React 19 (если такая есть), чтобы уйти от `--legacy-peer-deps`.
- Удалить лишний lockfile в `C:\Users\game4\package-lock.json` **или** указать `outputFileTracingRoot` на корень проекта в `next.config.ts` для подавления предупреждения.
- Освободить порт 3000 или запускать с явным портом: в PowerShell ` $env:PORT=3002; npm run dev`.
- Прогнать `npm audit fix` (или `--force` после оценки рисков) для исправления уязвимостей.
