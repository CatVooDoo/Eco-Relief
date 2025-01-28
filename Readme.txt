<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduPortal - {% block title %}{% endblock %}</title>
    
    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>
<body class="d-flex flex-column min-vh-100">
    <!-- Навигационная панель -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
        <div class="container">
            <a class="navbar-brand" href="{{ url_for('home') }}">
                <i class="fas fa-graduation-cap me-2"></i>EduPortal
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    {% if current_user.is_authenticated %}
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url_for('dashboard') }}">
                                <i class="fas fa-home me-1"></i>Личный кабинет
                            </a>
                        </li>
                        {% if current_user.is_teacher %}
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url_for('create_material') }}">
                                <i class="fas fa-plus-circle me-1"></i>Создать материал
                            </a>
                        </li>
                        {% endif %}
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url_for('logout') }}">
                                <i class="fas fa-sign-out-alt me-1"></i>Выход
                            </a>
                        </li>
                    {% else %}
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url_for('login') }}">
                                <i class="fas fa-sign-in-alt me-1"></i>Вход
                            </a>
                        </li>
                    {% endif %}
                </ul>
            </div>
        </div>
    </nav>

    <!-- Основной контент -->
    <main class="flex-grow-1">
        {% block content %}{% endblock %}
    </main>

    <!-- Подвал -->
    <footer class="bg-primary text-white mt-5 py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5>О проекте</h5>
                    <p>EduPortal - современная платформа для онлайн-образования. Учитесь в любое время, в любом месте!</p>
                </div>
                <div class="col-md-4">
                    <h5>Контакты</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-envelope me-2"></i>support@eduportal.ru</li>
                        <li><i class="fas fa-phone me-2"></i>8-800-555-35-35</li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Соцсети</h5>
                    <div class="social-links">
                        <a href="#" class="text-white me-3"><i class="fab fa-vk"></i></a>
                        <a href="#" class="text-white me-3"><i class="fab fa-telegram"></i></a>
                        <a href="#" class="text-white"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="text-center mt-3">
                <p>&copy; 2024 EduPortal. Все права защищены.</p>
            </div>
        </div>
    </footer>

    <!-- Скрипты -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    {% block scripts %}{% endblock %}
</body>
</html>
