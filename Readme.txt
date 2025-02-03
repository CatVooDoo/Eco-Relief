{% extends "base.html" %}
{% block content %}
<h1>Создать лекцию</h1>
<form method="POST">
    {{ form.hidden_tag() }}
    <div>
        {{ form.title.label }}<br>
        {{ form.title(class="form-control") }}<br>
    </div>
    <div>
        {{ form.content.label }}<br>
        {{ form.content(class="form-control", rows=10) }}<br>
    </div>
    <button type="submit" class="btn btn-primary w-100 mt-3">Сохранить</button>
</form>
{% endblock %}
