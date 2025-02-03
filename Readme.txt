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
                        <li class="nav-item"><a class="nav-link" href="{{ url_for('logout') }}">Выйти</a></li>
                    {% else %}
                        <li class="nav-item"><a class="nav-link" href="{{ url_for('login') }}">Войти</a></li>
                        <li class="nav-item"><a class="nav-link" href="{{ url_for('register') }}">Регистрация</a></li>
                    {% endif %}
                </ul>
            </div>
        </div>
    </nav>

    <!-- Контейнер с сайдбаром и контентом -->
    <div class="container-fluid">
        <div class="row">
            <!-- Сайдбар -->
            <div class="col-md-3 sidebar">
                {% include "sidebar.html" %}
            </div>

            <!-- Основной контент -->
            <div class="col-md-9 main-content">
                {% block content %}{% endblock %}
            </div>
        </div>
    </div>

    <!-- Футер -->
    <footer>
        <p>Страница создана Минаевым Никитой Игоревичем из группы 22ОА14</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>



<nav class="sidebar-nav">
    <ul class="list-group">
        <li class="list-group-item"><a href="{{ url_for('lectures') }}"><i class="fas fa-book"></i> Лекции</a></li>
        <li class="list-group-item"><a href="{{ url_for('webinars') }}"><i class="fas fa-video"></i> Вебинары</a></li>
        <li class="list-group-item"><a href="{{ url_for('courses') }}"><i class="fas fa-graduation-cap"></i> Курсы</a></li>
        <li class="list-group-item"><a href="{{ url_for('tests') }}"><i class="fas fa-file-alt"></i> Тесты</a></li>
        <li class="list-group-item"><a href="{{ url_for('homework') }}"><i class="fas fa-pencil-alt"></i> Домашнее задание</a></li>
    </ul>
</nav>


/* Сайдбар */
.sidebar {
    background-color: #343a40;
    padding: 15px;
    height: 100vh;
    position: fixed;
    width: 250px;
    top: 56px;
    left: 0;
    color: white;
}

.sidebar-nav {
    padding-top: 20px;
}

.sidebar-nav .list-group-item {
    background-color: #343a40;
    color: white;
    border: none;
    padding: 15px;
    font-size: 16px;
}

.sidebar-nav .list-group-item a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.sidebar-nav .list-group-item i {
    margin-right: 10px;
}

.sidebar-nav .list-group-item:hover {
    background-color: #495057;
}

/* Контент с отступом */
.main-content {
    margin-left: 270px;
    padding: 20px;
}




