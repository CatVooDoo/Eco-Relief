Привет, смотри
Я начал делать проект посвященный образовательному порталу.
Иерархия проекта следующая:
portal
    instance
	eduportal.db
    static
	css
	    style.css
	images
	js
    templates
	base.html
	login.html
	dashboard.html
	materials.html
	stats.html
	tests.html
    venv(это просто виртуальное окружение с библиотеками)
    app.py

вот стек который я использую:
Flask==3.0.2
Flask-SQLAlchemy==3.1.1
Flask-Login==0.6.3
Flask-WTF==1.2.1
WTForms==3.1.2
python-dotenv==1.0.1



Этот портал имеет цветовую гамму синий голубой зеленый.


Вот код app.py
```
from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eduportal.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Инициализация расширений
db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'login'

db.init_app(app)
login_manager.init_app(app)

# Модели данных
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_teacher = db.Column(db.Boolean, default=False)
    materials_viewed = db.relationship('MaterialView', backref='student', lazy=True)

class Material(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    views = db.relationship('MaterialView', backref='material', lazy=True)

class MaterialView(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    material_id = db.Column(db.Integer, db.ForeignKey('material.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    questions = db.Column(db.Text)  # JSON в реальном проекте использовать лучше отдельную таблицу
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Формы
class LoginForm(FlaskForm):
    username = StringField('Логин', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    submit = SubmitField('Войти')

class MaterialForm(FlaskForm):
    title = StringField('Название', validators=[DataRequired(), Length(max=150)])
    content = TextAreaField('Содержание', validators=[DataRequired()])
    submit = SubmitField('Создать')

# Логика авторизации
@login_manager.user_loader
def load_user(user_id):
    return db.get_or_404(User, user_id)

# Маршруты
@app.route('/')
def home():
    return render_template('base.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.password == form.password.data:  # В реальном проекте использовать хеширование!
            login_user(user)
            return redirect(url_for('dashboard'))
        flash('Неверный логин или пароль')
    return render_template('login.html', form=form)

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.is_teacher:
        materials = Material.query.filter_by(teacher_id=current_user.id).all()
        return render_template('teacher_dashboard.html', materials=materials)
    else:
        materials = Material.query.all()
        return render_template('student_dashboard.html', materials=materials)

@app.route('/material/<int:id>')
@login_required
def view_material(id):
    material = db.get_or_404(Material, id)
    
    if not current_user.is_teacher:
        # Фиксируем просмотр
        view = MaterialView(student_id=current_user.id, material_id=id)
        db.session.add(view)
        db.session.commit()
    
    return render_template('material.html', material=material)

@app.route('/create-material', methods=['GET', 'POST'])
@login_required
def create_material():
    if not current_user.is_teacher:
        return redirect(url_for('dashboard'))
    
    form = MaterialForm()
    if form.validate_on_submit():
        material = Material(
            title=form.title.data,
            content=form.content.data,
            teacher_id=current_user.id
        )
        db.session.add(material)
        db.session.commit()
        return redirect(url_for('dashboard'))
    return render_template('create_material.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Создание БД
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)

```

Вот код base.html
```
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
```

Вот код login.css

```
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
```

Вот код style.css

```
:root {
    --primary-blue: #2A5CAA;
    --light-blue: #87CEEB;
    --accent-green: #4CAF50;
    --white: #FFFFFF;
}

body {
    background: linear-gradient(120deg, var(--light-blue), var(--white));
    min-height: 100vh;
}

.navbar {
    background: var(--primary-blue) !important;
}

.sidebar {
    background: rgba(135, 206, 235, 0.1);
    border-radius: 15px;
    padding: 20px;
}

.btn-primary {
    background: var(--primary-blue);
    border: none;
}

.btn-success {
    background: var(--accent-green);
}

.card {
    border: 2px solid var(--light-blue);
    border-radius: 10px;
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}

/* Основные стили */
body {
    background-color: #f8f9fa;
}

.card {
    border-radius: 15px;
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* Форма входа */
.card-header.bg-success {
    background: linear-gradient(45deg, #4CAF50, #45a049);
}

.btn-success {
    background-color: #4CAF50;
    border: none;
    padding: 12px;
    transition: all 0.3s;
}

.btn-success:hover {
    background-color: #45a049;
    transform: scale(1.02);
}

/* Адаптивность */
@media (max-width: 768px) {
    .navbar-nav {
        margin-top: 15px;
    }
    
    footer .row > div {
        margin-bottom: 30px;
    }
}
```

Я бы хотел, чтобы ты помог мне с данным проектом. 

Напиши код для левого меню данного портала. Там должно отображаться несколько пунктов, тесты, лекции, вебинары и т.п 
Также, в main base.html должны быть использованы карточки. В карточках должны находиться либо лекции либо тесты либо вебинары и т.д.
Каждая карточка имеет индикатор, красный или зеленый, в зависимости от того, ознакомлен студент с информацией или нет.
Карточка должна открываться модальным окном занимающим около 75% основной страницы, когда открыто модальное окно, фон должен быть заблюрен.
Должен быть крестик для закрытия окна.
Также карточка с лекцией или вебинаром открывается как модальное окно. 
Реализуй вход и регистрацию на данный портал.
