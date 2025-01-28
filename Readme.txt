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
