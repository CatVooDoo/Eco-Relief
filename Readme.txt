{% extends "base.html" %}
{% block content %}
<div class="row">
    <h1 class="mb-4">Добро пожаловать!</h1>
    {% for lecture in lectures %}
    <div class="col-md-4">
        <div class="card shadow-box">
            <div class="card-body">
                <h5 class="card-title">{{ lecture.title }}</h5>
                <p class="card-text">{{ lecture.content[:100] }}...</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#lectureModal{{ lecture.id }}">
                    Просмотр
                </button>
                <span class="badge bg-{{ 'success' if lecture.is_read else 'danger' }}">
                    {{ 'Прочитано' if lecture.is_read else 'Не прочитано' }}
                </span>
            </div>
        </div>
    </div>
    {% endfor %}
</div>
{% endblock %}
