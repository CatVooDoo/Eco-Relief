{% extends "base.html" %}
{% block content %}
<h1>Панель управления</h1>
<div class="row">
    {% for lecture in lectures %}
    <div class="col-md-4">
        <div class="card shadow-box">
            <div class="card-body">
                <h5 class="card-title">{{ lecture.title }}</h5>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#lectureModal{{ lecture.id }}">
                    Открыть лекцию
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
