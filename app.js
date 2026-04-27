// Vitarn Vidya - Study Notes Application
// GitHub: https://github.com/Safacts/syllabus

const GITHUB_REPO = 'Safacts/syllabus';
const GITHUB_API_BASE = 'https://api.github.com/repos';

// State
let subjects = [];
let currentFilter = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchSubjects();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderSubjects();
    });

    // Filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.filter;
            renderSubjects();
        });
    });
}

// Fetch Subjects from GitHub
async function fetchSubjects() {
    try {
        // Fetch CSM-4-2 folder structure
        const response = await fetch(`${GITHUB_API_BASE}/${GITHUB_REPO}/contents/CSM-4-2`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
            subjects = data.filter(item => item.type === 'dir').map(folder => ({
                name: folder.name,
                path: folder.path,
                type: 'subject'
            }));
            renderSubjects();
        }
    } catch (error) {
        console.error('Error fetching subjects:', error);
        document.getElementById('subjects-grid').innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--vitarn-text-light);">
                Failed to load subjects. Please try again later.
            </div>
        `;
    }
}

// Render Subjects
function renderSubjects() {
    const grid = document.getElementById('subjects-grid');
    
    const filteredSubjects = subjects.filter(subject => {
        const matchesFilter = currentFilter === 'all' || subject.name.toLowerCase().includes(currentFilter.toLowerCase());
        const matchesSearch = subject.name.toLowerCase().includes(searchQuery);
        return matchesFilter && matchesSearch;
    });

    if (filteredSubjects.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--vitarn-text-light);">
                No subjects found matching your search.
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredSubjects.map(subject => `
        <div class="subject-card" onclick="openSubject('${subject.path}', '${subject.name}')">
            <div class="subject-name">${formatSubjectName(subject.name)}</div>
            <div class="subject-meta">CSM 4-2</div>
        </div>
    `).join('');
}

// Format Subject Name
function formatSubjectName(name) {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Open Subject
async function openSubject(path, name) {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('notes-viewer').classList.add('active');
    document.getElementById('notes-title').textContent = formatSubjectName(name);
    
    // Fetch subject files
    try {
        const response = await fetch(`${GITHUB_API_BASE}/${GITHUB_REPO}/contents/${path}`);
        const files = await response.json();
        
        if (Array.isArray(files)) {
            // Filter for markdown files
            const mdFiles = files.filter(file => file.name.endsWith('.md') && !file.name.includes('SYLLABUS'));
            
            if (mdFiles.length > 0) {
                // Load the first markdown file (or create a list of files)
                await loadMarkdownFile(mdFiles[0].path, mdFiles, name);
            } else {
                document.getElementById('notes-content').innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--vitarn-text-light);">
                        No notes available for this subject yet.
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading subject:', error);
        document.getElementById('notes-content').innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--vitarn-text-light);">
                Failed to load notes. Please try again later.
            </div>
        `;
    }
}

// Load Markdown File
async function loadMarkdownFile(filePath, allFiles, subjectName) {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/${GITHUB_REPO}/contents/${filePath}`);
        const data = await response.json();
        
        if (data.content) {
            // Decode base64 content
            const content = atob(data.content);
            const html = renderMarkdown(content);
            
            // Create file navigation if multiple files
            let fileNav = '';
            if (allFiles.length > 1) {
                fileNav = `
                    <div style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--vitarn-border);">
                        <div style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--vitarn-text-light);">UNITS:</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${allFiles.map(file => `
                                <button 
                                    class="filter-chip ${file.path === filePath ? 'active' : ''}"
                                    onclick="loadMarkdownFile('${file.path}', ${JSON.stringify(allFiles)}, '${subjectName}')"
                                >
                                    ${file.name.replace('.md', '')}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            document.getElementById('notes-content').innerHTML = fileNav + html;
        }
    } catch (error) {
        console.error('Error loading markdown:', error);
        document.getElementById('notes-content').innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--vitarn-text-light);">
                Failed to load content. Please try again later.
            </div>
        `;
    }
}

// Render Markdown to HTML
function renderMarkdown(markdown) {
    if (!markdown) return '';
    
    let html = markdown
        // Headers
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Code blocks
        .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        // Tables
        .replace(/\|(.+)\|/gim, (match) => {
            const cells = match.split('|').filter(c => c.trim());
            if (cells.some(c => c.includes('---'))) return ''; // Skip separator row
            return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
        })
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
    
    // Fix table wrapping
    html = html.replace(/<p><tr>/g, '<table><tr>');
    html = html.replace(/<\/tr><\/p>/g, '</tr></table>');
    
    // Fix blockquote wrapping
    html = html.replace(/<p><blockquote>/g, '<blockquote>');
    html = html.replace(/<\/blockquote><\/p>/g, '</blockquote>');
    
    return html;
}

// Show Home
function showHome() {
    document.getElementById('notes-viewer').classList.remove('active');
    document.getElementById('home-page').classList.remove('hidden');
    document.getElementById('notes-content').innerHTML = '<div class="loading"><div class="spinner"></div></div>';
}
