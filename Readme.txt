/* Общие стили */
body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    color: #333;
    margin: 0;
    padding: 0;
}

/* Навигационная панель */
.navbar {
    background-color: #343a40 !important;
}

.navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.navbar-nav .nav-link {
    color: #ffffff !important;
    transition: color 0.3s;
}

.navbar-nav .nav-link:hover {
    color: #ffc107 !important;
}

/* Контейнер */
.container {
    max-width: 1200px;
    margin: auto;
}

/* Карточки */
.card {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.card:hover {
    transform: scale(1.03);
}

.card-body {
    padding: 20px;
}

.card-title {
    font-size: 1.2rem;
    font-weight: bold;
}

/* Модальные окна */
.modal-content {
    border-radius: 8px;
}

.modal-header {
    background-color: #343a40;
    color: white;
}

.modal-footer {
    justify-content: space-between;
}

/* Кнопки */
.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}

.btn-success {
    background-color: #28a745;
}

.btn-success:hover {
    background-color: #1e7e34;
}

/* Футер */
footer {
    background-color: #343a40;
    color: white;
    text-align: center;
    padding: 15px;
    margin-top: 20px;
    font-size: 14px;
}

/* Форма */
form {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

form div {
    margin-bottom: 15px;
}

form input, form select, form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 16px;
}

form input:focus, form select:focus, form textarea:focus {
    border-color: #007bff;
    outline: none;
}

/* Адаптивность */
@media (max-width: 768px) {
    .navbar-nav {
        text-align: center;
    }

    .card {
        margin-bottom: 20px;
    }
}

/* Дополнительные элементы */
.badge {
    font-size: 0.9rem;
    padding: 5px 10px;
    border-radius: 5px;
}

.badge.bg-success {
    background-color: #28a745 !important;
}

.badge.bg-danger {
    background-color: #dc3545 !important;
}

/* Боковая панель */
nav ul {
    list-style: none;
    padding: 0;
    background-color: #343a40;
    margin: 0;
    padding: 10px;
    text-align: center;
}

nav ul li {
    display: inline;
    margin-right: 20px;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;
}

nav ul li a:hover {
    color: #ffc107;
}

/* Анимации */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-content {
    animation: fadeIn 0.3s ease-in-out;
}

/* Тени и стиль контейнеров */
.shadow-box {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    background: white;
    border-radius: 8px;
}
