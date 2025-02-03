{% extends "base.html" %}
{% block content %}
<h1>Вход</h1>
<form method="POST">
    {{ form.hidden_tag() }}
    <div>
        {{ form.username.label }}<br>
        {{ form.username(class="form-control") }}<br>
    </div>
    <div>
        {{ form.password.label }}<br>
        {{ form.password(class="form-control") }}<br>
    </div>
    <button type="submit" class="btn btn-primary w-100 mt-3">Войти</button>
</form>
{% endblock %}
