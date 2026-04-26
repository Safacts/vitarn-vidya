// Vitarn Vidya - RPA Exam Prep Application
// Main Application Logic

// State Management
let state = {
    isAuthenticated: false,
    user: null,
    currentUnit: null,
    currentQuestion: 0,
    quizAnswers: [],
    quizScore: 0,
    progress: {
        unitsCompleted: [],
        quizScores: {},
        questionsAnswered: 0,
        timeSpent: 0
    }
};

// Aacharya OAuth Configuration
const AACHARYA_CONFIG = {
    baseUrl: 'https://jnwn.xyz',
    clientId: 'VITARN_CLIENT',
    redirectUri: window.location.origin + '/auth/callback'
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    checkAuth();
    renderDashboard();
    startTimer();
});

// State Management Functions
function loadState() {
    const savedState = localStorage.getItem('vitarn_vidya_state');
    if (savedState) {
        state.progress = JSON.parse(savedState);
    }
}

function saveState() {
    localStorage.setItem('vitarn_vidya_state', JSON.stringify(state.progress));
}

// Authentication Functions
function checkAuth() {
    const authData = localStorage.getItem('vitarn_auth');
    if (authData) {
        state.isAuthenticated = true;
        state.user = JSON.parse(authData);
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('dashboard').classList.add('active');
        updateAuthUI();
    }
}

function updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    if (state.isAuthenticated) {
        authSection.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="text-align: right;">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--vitarn-black);">${state.user.full_name || 'Student'}</div>
                    <div style="font-size: 0.625rem; font-weight: 600; color: var(--vitarn-text-light); text-transform: uppercase;">${state.user.role || 'Student'}</div>
                </div>
                <button class="btn" onclick="handleLogout()" style="padding: 0.5rem;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </button>
            </div>
        `;
        document.getElementById('user-name').textContent = state.user.full_name || 'Student';
    }
}

function openLoginModal() {
    document.getElementById('login-modal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('login-modal').classList.remove('active');
}

function handleAacharyaLogin() {
    // Generate PKCE code verifier and challenge
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const state = generateCodeVerifier();
    
    sessionStorage.setItem('aacharya_code_verifier', codeVerifier);
    sessionStorage.setItem('aacharya_oauth_state', state);
    
    const params = new URLSearchParams({
        client_id: AACHARYA_CONFIG.clientId,
        redirect_uri: AACHARYA_CONFIG.redirectUri,
        scope: 'openid profile email',
        response_type: 'code',
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
    });
    
    const authUrl = `${AACHARYA_CONFIG.baseUrl}/o/authorize/?${params.toString()}`;
    window.location.href = authUrl;
}

function handleGoogleLogin() {
    // For demo purposes, simulate Google login
    // In production, this would redirect to Google OAuth
    alert('Google OAuth would be implemented here. For demo, using Aacharya login.');
    handleAacharyaLogin();
}

function handleLogout() {
    localStorage.removeItem('vitarn_auth');
    localStorage.removeItem('vitarn_vidya_state');
    state.isAuthenticated = false;
    state.user = null;
    state.progress = {
        unitsCompleted: [],
        quizScores: {},
        questionsAnswered: 0,
        timeSpent: 0
    };
    window.location.reload();
}

// PKCE Helper Functions
function generateCodeVerifier() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return base64UrlEncode(array);
}

function generateCodeChallenge(verifier) {
    return base64UrlEncode(sha256(verifier));
}

function base64UrlEncode(buffer) {
    let str = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return hashBuffer;
}

// Dashboard Functions
function renderDashboard() {
    if (!state.isAuthenticated) return;
    
    const unitsGrid = document.getElementById('units-grid');
    unitsGrid.innerHTML = '';
    
    RPA_DATA.units.forEach(unit => {
        const isCompleted = state.progress.unitsCompleted.includes(unit.id);
        const quizScore = state.progress.quizScores[unit.id] || 0;
        const progressPercent = isCompleted ? 100 : (quizScore > 0 ? quizScore : 0);
        
        const card = document.createElement('div');
        card.className = 'unit-card';
        card.onclick = () => openUnit(unit.id);
        card.innerHTML = `
            <div class="unit-number">UNIT ${unit.id}</div>
            <div class="unit-title">${unit.title}</div>
            <div class="unit-topics">${unit.topics.slice(0, 3).join(' • ')}</div>
            <div class="unit-progress">
                <div class="unit-progress-bar">
                    <div class="unit-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <div class="unit-progress-text">${progressPercent}%</div>
            </div>
        `;
        unitsGrid.appendChild(card);
    });
    
    updateProgressStats();
}

function updateProgressStats() {
    const unitsCompleted = state.progress.unitsCompleted.length;
    const totalUnits = RPA_DATA.units.length;
    const overallPercent = Math.round((unitsCompleted / totalUnits) * 100);
    
    // Calculate average quiz score
    const quizScores = Object.values(state.progress.quizScores);
    const avgQuizScore = quizScores.length > 0 
        ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) 
        : 0;
    
    document.getElementById('units-completed').textContent = `${unitsCompleted}/${totalUnits}`;
    document.getElementById('quiz-score').textContent = `${avgQuizScore}%`;
    document.getElementById('questions-answered').textContent = state.progress.questionsAnswered;
    document.getElementById('time-spent').textContent = `${Math.floor(state.progress.timeSpent / 60)}h`;
    document.getElementById('overall-progress-text').textContent = `${overallPercent}%`;
    document.getElementById('overall-progress-bar').style.width = `${overallPercent}%`;
}

function startTimer() {
    setInterval(() => {
        if (state.isAuthenticated) {
            state.progress.timeSpent++;
            saveState();
            updateProgressStats();
        }
    }, 60000); // Update every minute
}

// Content Viewer Functions
function openUnit(unitId) {
    state.currentUnit = unitId;
    const unit = RPA_DATA.units.find(u => u.id === unitId);
    
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('content-viewer').classList.add('active');
    
    document.getElementById('content-title').textContent = unit.title;
    document.getElementById('content-body').innerHTML = renderMarkdown(unit.content);
}

function showDashboard() {
    document.getElementById('content-viewer').classList.remove('active');
    document.getElementById('quiz-section').classList.remove('active');
    document.getElementById('results').classList.remove('active');
    document.getElementById('exam-guide').classList.add('hidden');
    document.getElementById('dashboard').classList.add('active');
    renderDashboard();
}

function showExamGuide() {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('exam-guide').classList.remove('hidden');
    document.getElementById('exam-guide-content').innerHTML = renderMarkdown(RPA_DATA.examGuide);
}

// Quiz Functions
function startQuiz() {
    if (!state.currentUnit) return;
    
    state.currentQuestion = 0;
    state.quizAnswers = [];
    state.quizScore = 0;
    
    const unit = RPA_DATA.units.find(u => u.id === state.currentUnit);
    
    document.getElementById('content-viewer').classList.remove('active');
    document.getElementById('quiz-section').classList.add('active');
    
    document.getElementById('quiz-title').textContent = `Unit ${state.currentUnit} Quiz`;
    document.getElementById('quiz-info').textContent = `Question 1 of ${unit.quiz.length}`;
    
    renderQuestion();
}

function renderQuestion() {
    const unit = RPA_DATA.units.find(u => u.id === state.currentUnit);
    const question = unit.quiz[state.currentQuestion];
    
    const quizContainer = document.getElementById('quiz-questions');
    quizContainer.innerHTML = `
        <div class="question-card">
            <div class="question-number">Question ${state.currentQuestion + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option ${state.quizAnswers[state.currentQuestion] === index ? 'selected' : ''}" 
                         onclick="selectOption(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div class="explanation ${state.quizAnswers[state.currentQuestion] !== undefined ? 'show' : ''}">
                <strong>Explanation:</strong> ${question.explanation}
            </div>
        </div>
    `;
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = state.currentQuestion === 0;
    document.getElementById('next-btn').textContent = 
        state.currentQuestion === unit.quiz.length - 1 ? 'Finish' : 'Next';
}

function selectOption(optionIndex) {
    state.quizAnswers[state.currentQuestion] = optionIndex;
    renderQuestion();
}

function nextQuestion() {
    const unit = RPA_DATA.units.find(u => u.id === state.currentUnit);
    
    if (state.currentQuestion < unit.quiz.length - 1) {
        state.currentQuestion++;
        document.getElementById('quiz-info').textContent = 
            `Question ${state.currentQuestion + 1} of ${unit.quiz.length}`;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        document.getElementById('quiz-info').textContent = 
            `Question ${state.currentQuestion + 1} of ${unit.quiz.length}`;
        renderQuestion();
    }
}

function finishQuiz() {
    const unit = RPA_DATA.units.find(u => u.id === state.currentUnit);
    let correct = 0;
    
    unit.quiz.forEach((question, index) => {
        if (state.quizAnswers[index] === question.correct) {
            correct++;
        }
    });
    
    const score = Math.round((correct / unit.quiz.length) * 100);
    state.quizScore = score;
    
    // Update progress
    state.progress.quizScores[state.currentUnit] = score;
    state.progress.questionsAnswered += unit.quiz.length;
    
    if (score >= 70) {
        if (!state.progress.unitsCompleted.includes(state.currentUnit)) {
            state.progress.unitsCompleted.push(state.currentUnit);
        }
    }
    
    saveState();
    
    // Show results
    document.getElementById('quiz-section').classList.remove('active');
    document.getElementById('results').classList.add('active');
    
    document.getElementById('final-score').textContent = `${score}%`;
    document.getElementById('correct-count').textContent = correct;
    document.getElementById('incorrect-count').textContent = unit.quiz.length - correct;
    document.getElementById('total-questions').textContent = unit.quiz.length;
    
    let message = '';
    if (score >= 90) message = 'Excellent! You\'re well prepared!';
    else if (score >= 70) message = 'Good job! Keep practicing!';
    else if (score >= 50) message = 'Keep studying, you\'re getting there!';
    else message = 'Review the material and try again!';
    
    document.getElementById('results-message').textContent = message;
}

function retakeQuiz() {
    startQuiz();
}

// Markdown Renderer (Simple)
function renderMarkdown(text) {
    if (!text) return '';
    
    let html = text
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Code blocks
        .replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        // Lists
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
        // Line breaks
        .replace(/\n\n/gim, '</p><p>')
        .replace(/\n/gim, '<br>');
    
    // Wrap in paragraphs
    html = '<p>' + html + '</p>';
    
    // Fix list wrapping
    html = html.replace(/<p><li>/g, '<ul><li>');
    html = html.replace(/<\/li><\/p>/g, '</li></ul>');
    
    return html;
}

// Handle OAuth Callback (for when implemented)
function handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
        // Exchange code for token (this would call your backend)
        // For demo, we'll simulate successful auth
        const mockUser = {
            full_name: 'Demo Student',
            role: 'student',
            college: 'JNTU Wanaparty'
        };
        
        localStorage.setItem('vitarn_auth', JSON.stringify(mockUser));
        window.location.href = '/';
    }
}

// Check for OAuth callback on page load
if (window.location.search.includes('code')) {
    handleOAuthCallback();
}
