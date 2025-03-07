# Weather App Documentation

## О проекте
Простое веб-приложение для просмотра текущей погоды и почасового прогноза с использованием Vue 3 и OpenWeatherMap API. Приложение имеет адаптивный дизайн и возможность выбора города.

## Содержание
- Технологии
- Установка
- Настройка API
- Структура проекта
- Особенности реализации
- Деплой
- Лицензия
- Доработки

## Технологии
- **Frontend:** Vue 3 (Composition API), Vue Router, Pinia
- **Стили:** SCSS (миксины, CSS-переменные)
- **API:** OpenWeatherMap API
- **Сборка:** Vite
- **Дополнительно:** TypeScript, Axios, GitHub Pages

## Установка
### 1. Клонирование репозитория
git clone https://github.com/SolovevaJulia/weather.git
cd weather

### 2. Установка зависимостей
npm install

### 3. Запуск dev-сервера
npm run dev
# Доступно на http://localhost:5173

## Настройка API
### Получение API-ключа
1. Зарегистрируйтесь на [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).
2. Создайте API-ключ в разделе "API keys".
3. Добавьте ключ в файл `.env`:
VITE_OPENWEATHER_API_KEY=ваш_api_ключ

## Структура проекта
```plaintext
src/
├── assets/          # Графические ресурсы
│   └── img/         # SVG-иконки погоды
├── components/      # UI-компоненты
│   ├── Header.vue   # Шапка приложения
├── pages/           # Страницы
│   ├── HomeView.vue     # Главная страница
│   └── WeeklyView.vue   # Прогноз на неделю (в разработке)
├── router/          # Настройки маршрутизации
├── store/           # Хранилище Pinia
├── styles/          # Глобальные стили
│   ├── global.sass  # Базовые стили
│   ├── mixins.sass  # Миксины
│   └── variables.sass # Переменные SCSS
├── api/             # API-запросы
└── App.vue          # Корневой компонент
```

## Особенности реализации
### 1. Динамические иконки погоды
Автоматический выбор иконок на основе данных OpenWeatherMap:
```typescript
const iconMap = {
  '01d': sunnyIcon,   // Ясно
  '02d': cloudyIcon,  // Немного облачно
  '09d': rainyIcon,   // Дождь
  // ... другие маппинги
};
```

### 2. Реактивность
Обновление данных при смене города:
```typescript
watch(selectedCity, async () => {
  await fetchWeather();
});
```

### 3. Адаптивность
Медиа-запросы для разных устройств:
```sass
@media (max-width: 768px) 
  .weather__card 
    flex-direction: column
    padding: 12px
```

### 4. Популярные города
Автоматическая загрузка данных для списка популярных городов:
```typescript
const popularCityNames = ['Москва', 'Новосибирск', 'Краснодар'];
```

## Деплой
### На GitHub Pages
npm run build
npm run deploy
**Важно:**
- В `vite.config.ts` должен быть указан корректный `base`:
  ```typescript
  base: '/ваш-репозиторий/',
  ```
- В настройках репозитория GitHub Pages нужно выбрать ветку `gh-pages`.

## Доработки
Планируемые улучшения:
- Реализация прогноза на неделю
- Интеграция Pinia для управления состоянием
- Анимация загрузки данных

