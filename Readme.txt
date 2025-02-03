<nav>
    <ul>
        <li><a href="{{ url_for('index') }}">Главная</a></li>
        {% if current_user.is_authenticated %}
        <li><a href="{{ url_for('dashboard') }}">Панель</a></li>
        {% if current_user.role == 'teacher' %}
        <li><a href="{{ url_for('create_lecture') }}">Лекция</a></li>
        <li><a href="{{ url_for('create_test') }}">Тест</a></li>
        {% endif %}
        <li><a href="{{ url_for('logout') }}">Выйти</a></li>
        {% else %}
        <li><a href="{{ url_for('login') }}">Войти</a></li>
        <li><a href="{{ url_for('register') }}">Регистрация</a></li>
        {% endif %}
    </ul>
</nav>
