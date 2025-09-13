<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Контент-планировщик</title>
    <style>
        :root {
            --primary-blue: #e1f5fe;
            --dark-blue: #4a6572;
            --beige: #f9f7f2;
            --mint: #98FB98;
            --yellow: #FFFFE0;
            --pink: #FFB6C1;
            --lavender: #E6E6FA;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        body {
            background-color: var(--beige);
            color: #333;
            padding: 15px;
            max-width: 100%;
            margin: 0 auto;
            min-height: 100vh;
        }
        
        header {
            text-align: center;
            margin-bottom: 20px;
            padding: 15px;
            background-color: var(--primary-blue);
            border-radius: 16px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: var(--dark-blue);
            margin-bottom: 15px;
            font-size: 24px;
        }
        
        .color-guide {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 15px;
        }
        
        .color-item {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin: 3px;
        }
        
        .color-box {
            width: 16px;
            height: 16px;
            border-radius: 4px;
            margin-right: 6px;
        }
        
        .family { background-color: var(--mint); }
        .health { background-color: var(--yellow); }
        .work { background-color: var(--pink); }
        .hobby { background-color: var(--lavender); }
        
        .calendar {
            background-color: white;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .calendar-header button {
            background: none;
            border: none;
            font-size: 20px;
            color: var(--dark-blue);
            cursor: pointer;
            padding: 8px 12px;
        }
        
        .calendar-header h2 {
            font-size: 18px;
            color: var(--dark-blue);
        }
        
        .weekdays {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            text-align: center;
            font-weight: bold;
            margin-bottom: 10px;
            color: var(--dark-blue);
        }
        
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 8px;
        }
        
        .calendar-day {
            text-align: center;
            padding: 10px 0;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 16px;
            position: relative;
        }
        
        .calendar-day:hover {
            background-color: #e8f4fc;
        }
        
        .other-month {
            color: #ccc;
        }
        
        .selected {
            outline: 2px solid #4a6572;
            font-weight: bold;
        }
        
        .content-type-selector {
            display: none;
            background-color: white;
            border-radius: 16px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .content-type-selector h3 {
            margin-bottom: 20px;
            color: var(--dark-blue);
            text-align: center;
            font-size: 20px;
        }
        
        .content-type-buttons {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .content-type-btn {
            padding: 15px;
            border: none;
            border-radius: 10px;
            background-color: var(--primary-blue);
            color: var(--dark-blue);
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            font-size: 16px;
        }
        
        .content-type-btn:hover {
            background-color: #bbdefb;
        }
        
        .editor {
            display: none;
            background-color: white;
            border-radius: 16px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .editor h3 {
            margin-bottom: 20px;
            color: var(--dark-blue);
            text-align: center;
            font-size: 20px;
        }
        
        .editor-actions {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .editor-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 500;
            font-size: 16px;
        }
        
        .back-btn {
            background-color: #f5f5dc;
            color: var(--dark-blue);
        }
        
        .copy-btn {
            background-color: var(--primary-blue);
            color: var(--dark-blue);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .form-group input, 
        .form-group textarea, 
        .form-group select {
            width: 100%;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid #ddd;
            font-size: 16px;
        }
        
        .form-group textarea {
            min-height: 120px;
            resize: vertical;
        }
        
        .saved-notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <header>
        <h1>Контент-планировщик</h1>
        <div class="color-guide">
            <div class="color-item"><div class="color-box family"></div>Семья</div>
            <div class="color-item"><div class="color-box health"></div>Здоровье</div>
            <div class="color-item"><div class="color-box work"></div>Работа</div>
            <div class="color-item"><div class="color-box hobby"></div>Хобби/Развитие</div>
        </div>
    </header>
    
    <div class="calendar">
        <div class="calendar-header">
            <button id="prev-month">&lt;</button>
            <h2 id="current-month-year">Май 2023</h2>
            <button id="next-month">&gt;</button>
        </div>
        <div class="weekdays">
            <div>Пн</div>
            <div>Вт</div>
            <div>Ср</div>
            <div>Чт</div>
            <div>Пт</div>
            <div>Сб</div>
            <div>Вс</div>
        </div>
        <div class="calendar-grid" id="calendar-days"></div>
    </div>
    
    <div class="content-type-selector" id="content-type-selector">
        <h3>Выберите тип контента</h3>
        <div class="content-type-buttons">
            <button class="content-type-btn" data-type="theme">Тема и Цель</button>
            <button class="content-type-btn" data-type="stories">Сторис</button>
            <button class="content-type-btn" data-type="post">Пост</button>
            <button class="content-type-btn" data-type="reels">Рилс</button>
        </div>
    </div>
    
    <div class="editor" id="theme-editor">
        <h3>Тема и Цель</h3>
        <div class="editor-actions">
            <button class="editor-btn back-btn" data-editor="theme">Назад</button>
            <button class="editor-btn copy-btn" id="copy-theme">Скопировать</button>
        </div>
        
        <div class="form-group">
            <label for="theme-select">Тема:</label>
            <select id="theme-select">
                <option value="">Выберите тему</option>
                <option value="family">Семья</option>
                <option value="health">Здоровье</option>
                <option value="work">Работа</option>
                <option value="hobby">Хобби/Развитие</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="title">Название:</label>
            <input type="text" id="title" placeholder="Введите название">
        </div>
        
        <div class="form-group">
            <label for="goal">Цель:</label>
            <input type="text" id="goal" placeholder="Введите цель">
        </div>
        
        <div class="form-group">
            <label for="activity">Активность:</label>
            <textarea id="activity" placeholder="Опишите активность"></textarea>
        </div>
    </div>
    
    <div class="editor" id="stories-editor">
        <h3>Сторис</h3>
        <div class="editor-actions">
            <button class="editor-btn back-btn" data-editor="stories">Назад</button>
            <button class="editor-btn copy-btn" id="copy-stories">Скопировать</button>
        </div>
        
        <div class="form-group">
            <label for="stories-content">Контент для сторис:</label>
            <textarea id="stories-content" placeholder="Введите текст для сторис"></textarea>
        </div>
    </div>
    
    <div class="editor" id="post-editor">
        <h3>Пост</h3>
        <div class="editor-actions">
            <button class="editor-btn back-btn" data-editor="post">Назад</button>
            <button class="editor-btn copy-btn" id="copy-post">Скопировать</button>
        </div>
        
        <div class="form-group">
            <label for="post-content">Контент для поста:</label>
            <textarea id="post-content" placeholder="Введите текст для поста"></textarea>
        </div>
    </div>
    
    <div class="editor" id="reels-editor">
        <h3>Рилс</h3>
        <div class="editor-actions">
            <button class="editor-btn back-btn" data-editor="reels">Назад</button>
            <button class="editor-btn copy-btn" id="copy-reels">Скопировать</button>
        </div>
        
        <div class="form-group">
            <label for="reels-content">Контент для рилс:</label>
            <textarea id="reels-content" placeholder="Введите текст для рилс"></textarea>
        </div>
    </div>

    <div class="saved-notification" id="saved-notification">Данные сохранены!</div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let currentDate = new Date();
            let selectedDate = null;
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();
            
            const calendarDays = document.getElementById('calendar-days');
            const currentMonthYear = document.getElementById('current-month-year');
            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');
            const contentTypeSelector = document.getElementById('content-type-selector');
            const themeEditor = document.getElementById('theme-editor');
            const storiesEditor = document.getElementById('stories-editor');
            const postEditor = document.getElementById('post-editor');
            const reelsEditor = document.getElementById('reels-editor');
            const savedNotification = document.getElementById('saved-notification');
            
            function initCalendar() {
                renderCalendar();
                prevMonthBtn.addEventListener('click', () => {
                    currentMonth--;
                    if (currentMonth < 0) {
                        currentMonth = 11;
                        currentYear--;
                    }
                    renderCalendar();
                    hideAllEditors();
                    contentTypeSelector.style.display = 'none';
                });
                
                nextMonthBtn.addEventListener('click', () => {
                    currentMonth++;
                    if (currentMonth > 11) {
                        currentMonth = 0;
                        currentYear++;
                    }
                    renderCalendar();
                    hideAllEditors();
                    contentTypeSelector.style.display = 'none';
                });
            }
            
            function renderCalendar() {
                const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                                   "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
                
                currentMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
                
                const firstDay = new Date(currentYear, currentMonth, 1);
                const lastDay = new Date(currentYear, currentMonth + 1, 0);
                let firstDayIndex = firstDay.getDay();
                firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
                const daysInMonth = lastDay.getDate();
                
                calendarDays.innerHTML = '';
                
                for (let i = 0; i < firstDayIndex; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.classList.add('calendar-day', 'other-month');
                    calendarDays.appendChild(emptyDay);
                }
                
                for (let i = 1; i <= daysInMonth; i++) {
                    const day = document.createElement('div');
                    day.classList.add('calendar-day');
                    day.textContent = i;
                    
                    const dateKey = formatDate(new Date(currentYear, currentMonth, i));
                    const savedData = localStorage.getItem(dateKey);
                    if (savedData) {
                        try {
                            const data = JSON.parse(savedData);
                            if (data.theme) {
                                const themeColors = {
                                    family: 'var(--mint)',
                                    health: 'var(--yellow)',
                                    work: 'var(--pink)',
                                    hobby: 'var(--lavender)'
                                };
                                day.style.backgroundColor = themeColors[data.theme] || '';
                            }
                        } catch (e) {
                            console.error("Ошибка parsing данных для даты", dateKey, e);
                        }
                    }
                    
                    const today = new Date();
                    if (currentYear === today.getFullYear() && 
                        currentMonth === today.getMonth() && 
                        i === today.getDate()) {
                        day.style.border = "2px solid #4a6572";
                    }
                    
                    day.addEventListener('click', () => {
                        const previouslySelected = document.querySelector('.calendar-day.selected');
                        if (previouslySelected) previouslySelected.classList.remove('selected');
                        day.classList.add('selected');
                        selectedDate = new Date(currentYear, currentMonth, i);
                        contentTypeSelector.style.display = 'block';
                        hideAllEditors();
                    });
                    
                    calendarDays.appendChild(day);
                }
            }
            
            function formatDate(date) {
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            
            function hideAllEditors() {
                themeEditor.style.display = 'none';
                storiesEditor.style.display = 'none';
                postEditor.style.display = 'none';
                reelsEditor.style.display = 'none';
            }
            
            function showSavedNotification() {
                savedNotification.style.opacity = '1';
                setTimeout(() => {
                    savedNotification.style.opacity = '0';
                }, 1500);
            }
            
            document.querySelectorAll('.content-type-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const type = this.getAttribute('data-type');
                    contentTypeSelector.style.display = 'none';
                    if (type === 'theme') {
                        loadThemeEditor();
                        themeEditor.style.display = 'block';
                    } else if (type === 'stories') {
                        loadStoriesEditor();
                        storiesEditor.style.display = 'block';
                    } else if (type === 'post') {
                        loadPostEditor();
                        postEditor.style.display = 'block';
                    } else if (type === 'reels') {
                        loadReelsEditor();
                        reelsEditor.style.display = 'block';
                    }
                });
            });
            
            document.querySelectorAll('.back-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const editor = this.getAttribute('data-editor');
                    if (editor === 'theme') saveThemeData();
                    if (editor === 'stories') saveStoriesData();
                    if (editor === 'post') savePostData();
                    if (editor === 'reels') saveReelsData();
                    hideAllEditors();
                    contentTypeSelector.style.display = 'block';
                });
            });
            
            function saveThemeData() {
                if (!selectedDate) return;
                const theme = document.getElementById('theme-select').value;
                const title = document.getElementById('title').value;
                const goal = document.getElementById('goal').value;
                const activity = document.getElementById('activity').value;
                
                const dateKey = formatDate(selectedDate);
                let savedData = localStorage.getItem(dateKey);
                let data = savedData ? JSON.parse(savedData) : {};
                
                data.theme = theme;
                data.themeData = { theme, goal, activity, title };
                
                localStorage.setItem(dateKey, JSON.stringify(data));
                updateCalendarDayColor(dateKey, theme);
                showSavedNotification();
            }
            
            function saveStoriesData() {
                if (!selectedDate) return;
                const content = document.getElementById('stories-content').value;
                const dateKey = formatDate(selectedDate);
                let savedData = localStorage.getItem(dateKey);
                let data = savedData ? JSON.parse(savedData) : {};
                
                data.stories = content;
                localStorage.setItem(dateKey, JSON.stringify(data));
                showSavedNotification();
            }
            
            function savePostData() {
                if (!selectedDate) return;
                const content = document.getElementById('post-content').value;
                const dateKey = formatDate(selectedDate);
                let savedData = localStorage.getItem(dateKey);
                let data = savedData ? JSON.parse(savedData) : {};
                
                data.post = content;
                localStorage.setItem(dateKey, JSON.stringify(data));
                showSavedNotification();
            }
            
            function saveReelsData() {
                if (!selectedDate) return;
                const content = document.getElementById('reels-content').value;
                const dateKey = formatDate(selectedDate);
                let savedData = localStorage.getItem(dateKey);
                let data = savedData ? JSON.parse(savedData) : {};
                
                data.reels = content;
                localStorage.setItem(dateKey, JSON.stringify(data));
                showSavedNotification();
            }
            
            function loadThemeEditor() {
                if (!selectedDate) return;
                const dateKey = formatDate(selectedDate);
                const savedData = localStorage.getItem(dateKey);
                if (savedData) {
                    try {
                        const data = JSON.parse(savedData);
                        document.getElementById('theme-select').value = data.theme || '';
                        document.getElementById('title').value = data.themeData?.title || '';
                        document.getElementById('goal').value = data.themeData?.goal || '';
                        document.getElementById('activity').value = data.themeData?.activity || '';
                    } catch (e) {
                        console.error("Ошибка загрузки темы:", e);
                    }
                } else {
                    document.getElementById('theme-select').value = '';
                    document.getElementById('title').value = '';
                    document.getElementById('goal').value = '';
                    document.getElementById('activity').value = '';
                }
            }
            
            function loadStoriesEditor() {
                if (!selectedDate) return;
                const dateKey = formatDate(selectedDate);
                const savedData = localStorage.getItem(dateKey);
                document.getElementById('stories-content').value = savedData ? (JSON.parse(savedData).stories || '') : '';
            }
            
            function loadPostEditor() {
                if (!selectedDate) return;
                const dateKey = formatDate(selectedDate);
                const savedData = localStorage.getItem(dateKey);
                document.getElementById('post-content').value = savedData ? (JSON.parse(savedData).post || '') : '';
            }
            
            function loadReelsEditor() {
                if (!selectedDate) return;
                const dateKey = formatDate(selectedDate);
                const savedData = localStorage.getItem(dateKey);
                document.getElementById('reels-content').value = savedData ? (JSON.parse(savedData).reels || '') : '';
            }
            
            function updateCalendarDayColor(dateKey, theme) {
                const [year, month, day] = dateKey.split('-').map(Number);
                
                if (year === currentYear && month - 1 === currentMonth) {
                    const dayElements = document.querySelectorAll('.calendar-day');
                    for (const dayElement of dayElements) {
                        if (parseInt(dayElement.textContent) === day) {
                            const themeColors = {
                                family: 'var(--mint)',
                                health: 'var(--yellow)',
                                work: 'var(--pink)',
                                hobby: 'var(--lavender)'
                            };
                            dayElement.style.backgroundColor = themeColors[theme] || '';
                            break;
                        }
                    }
                }
            }
            
            document.getElementById('copy-theme').addEventListener('click', () => {
                const theme = document.getElementById('theme-select').value;
                const title = document.getElementById('title').value;
                const goal = document.getElementById('goal').value;
                const activity = document.getElementById('activity').value;
                const text = `Тема: ${theme}\nНазвание: ${title}\nЦель: ${goal}\nАктивность: ${activity}`;
                navigator.clipboard.writeText(text);
                showSavedNotification();
            });
            
            document.getElementById('copy-stories').addEventListener('click', () => {
                const content = document.getElementById('stories-content').value;
                navigator.clipboard.writeText(content);
                showSavedNotification();
            });
            
            document.getElementById('copy-post').addEventListener('click', () => {
                const content = document.getElementById('post-content').value;
                navigator.clipboard.writeText(content);
                showSavedNotification();
            });
            
            document.getElementById('copy-reels').addEventListener('click', () => {
                const content = document.getElementById('reels-content').value;
                navigator.clipboard.writeText(content);
                showSavedNotification();
            });

            // Автосохранение при вводе
            ['title', 'goal', 'activity', 'theme-select'].forEach(id => {
                document.getElementById(id).addEventListener('input', saveThemeData);
            });
            
            ['stories-content'].forEach(id => {
                document.getElementById(id).addEventListener('input', saveStoriesData);
            });
            
            ['post-content'].forEach(id => {
                document.getElementById(id).addEventListener('input', savePostData);
            });
            
            ['reels-content'].forEach(id => {
                document.getElementById(id).addEventListener('input', saveReelsData);
            });
            
            initCalendar();
        });
    </script>
</body>
</html>
