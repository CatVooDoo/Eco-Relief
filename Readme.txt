{% extends "base.html" %}
{% block content %}
<h1>Регистрация</h1>
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
    <div>
        {{ form.role.label }}<br>
        {{ form.role(class="form-control") }}<br>
    </div>
    <button type="submit" class="btn btn-success w-100 mt-3">Зарегистрироваться</button>
</form>
{% endblock %}
