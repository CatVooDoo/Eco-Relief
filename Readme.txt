{% extends "base.html" %}
{% block title %}Вход в систему{% endblock %}

{% block content %}
<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
            <div class="card shadow-lg border-0">
                <div class="card-header bg-success text-white text-center">
                    <h3 class="mb-0"><i class="fas fa-sign-in-alt me-2"></i>Авторизация</h3>
                </div>
                
                <div class="card-body p-4">
                    <!-- Сообщения об ошибках -->
                    {% with messages = get_flashed_messages() %}
                        {% if messages %}
                            {% for message in messages %}
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                {{ message }}
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                            {% endfor %}
                        {% endif %}
                    {% endwith %}

                    <!-- Форма входа -->
                    <form method="POST" action="{{ url_for('login') }}">
                        {{ form.hidden_tag() }}
                        
                        <div class="mb-3">
                            <label for="username" class="form-label">
                                <i class="fas fa-user me-1"></i>Логин
                            </label>
                            {{ form.username(class="form-control", placeholder="Введите ваш логин") }}
                        </div>
                        
                        <div class="mb-4">
                            <label for="password" class="form-label">
                                <i class="fas fa-lock me-1"></i>Пароль
                            </label>
                            {{ form.password(class="form-control", placeholder="Введите пароль") }}
                        </div>
                        
                        <div class="d-grid mb-3">
                            {{ form.submit(class="btn btn-success btn-lg") }}
                        </div>
                        
                        <div class="text-center">
                            <p class="text-muted">Нет аккаунта? <a href="#" class="text-success">Зарегистрируйтесь</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}
