<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Образовательный портал</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ url_for('static', filename='css/styles.css') }}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Навбар -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="{{ url_for('index') }}">Образовательный портал</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    {% if current_user.is_authenticated %}
                        <li class="nav-item"><a class="nav-link" href="{{ url_for('dashboard') }}">Панель</a></li>
                        {% if current_user.role == 'teacher' %}
                            <li class="nav-item"><a class="nav-link" href="{{ url_for('create_lecture') }}">Лекция</a></li>
                            <li class="nav-item"><a class="nav-link" href="{{ url_for('create_test') }}">Тест</a></li>
                        {% endif %}
                        <li class="nav-item"><a class="nav-link" href="{{ url_for('logout') }}">Выйти</a></li>
                    {% else %}
                        <li class="nav-item"><a class="nav-link" href="{{ url_for('login') }}">Войти</a></li>
                        <li class="nav-item"><a class="nav-link" href="{{ url_for('register') }}">Регистрация</a></li>
                    {% endif %}
                </ul>
            </div>
        </div>
    </nav>

    <!-- Контент -->
    <div class="container mt-4">
        {% block content %}{% endblock %}
    </div>

    <!-- Футер -->
    <footer>
        <p>Страница создана Минаевым Никитой Игоревичем из группы 22ОА14</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
