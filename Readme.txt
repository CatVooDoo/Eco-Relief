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
