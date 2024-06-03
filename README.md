# Инструкция

## Для запуска необходимо ПО:

Vs code;


PyCharm;


Docker;


Postman


---
## Шаги для запуска:
1. Открыть папку backend при помощи PyCharm;
2. В терминале прописать команду


*docker compose up --build -d*
В докере соберется контейнер 
3. В Docker проверить наличие одного запущенного контейнера cyberslum-backend-bd


![изображение](https://github.com/Ritiss/Docker/assets/115828441/97ec7402-9543-49d8-a592-01fccc8f0f75)


5. Во избежание ошибок при импорте данных, необходимо создать тестовый продукт - открыть Postman
6. Создать новую коллекцию


![изображение](https://github.com/Ritiss/Docker/assets/115828441/e74105dd-3144-4677-9ea9-e5bf22c2f1e0)
8. Нажать на "Add request"


![изображение](https://github.com/Ritiss/Docker/assets/115828441/cf545f16-5c36-4d89-9243-88b10873002f)


10. В адрес поисковой строки поместить http://localhost:8000/product, слева от поисковой строки выбрать запрос  POST

    
![изображение](https://github.com/Ritiss/Docker/assets/115828441/304ba615-8d6e-4664-a37e-d07d53c8549b)
12. Выбрать Body - raw


![изображение](https://github.com/Ritiss/Docker/assets/115828441/80969623-0f0d-4966-a673-00401eb8a6bd)
13. Внести *данные* и отправить запрос SEND


{


    "name": "Акселератор",

    
    "type": "Лобная доля",

    
    "price": 3000,

    
    "img": "https://static.wikia.nocookie.net/cyberpunk/images/5/56/HealOnKill.png",

    
    "capacity": 30,

    
    "description": "Увеличивает физические способности. Позволяет пользователю быстрее реагировать на окружающие события и увеличивает скорость движения пользователя.",

    
    "effect": "Мгновенно восстанавливает  2/3/6/10% здоровья"

    
} 

11. В VScode открыть терминал и ввести


*npm i*


для установки пакетов


12. Для запуска проекта ввести в терминал


*npm run dev*
