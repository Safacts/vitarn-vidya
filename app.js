// Vitarn Vidya - Study Notes Application
// GitHub: https://github.com/Safacts/syllabus

const GITHUB_REPO = 'Safacts/syllabus';
const GITHUB_API_BASE = 'https://api.github.com/repos';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';

// Configure marked.js with highlight.js
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true,
    gfm: true
});

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
        // Fetch root folder structure
        const response = await fetch(`${GITHUB_API_BASE}/${GITHUB_REPO}/contents`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
            // Get all folders (branch-year-semester folders)
            const folders = data.filter(item => item.type === 'dir');
            
            // Fetch subjects from each folder
            for (const folder of folders) {
                try {
                    const subResponse = await fetch(`${GITHUB_API_BASE}/${GITHUB_REPO}/contents/${folder.name}`);
                    const subData = await subResponse.json();
                    
                    if (Array.isArray(subData)) {
                        const subFolders = subData.filter(item => item.type === 'dir');
                        subFolders.forEach(subFolder => {
                            subjects.push({
                                name: subFolder.name,
                                path: subFolder.path,
                                branch: folder.name,
                                type: 'subject'
                            });
                        });
                    }
                } catch (e) {
                    console.error('Error fetching subfolder:', e);
                }
            }
            
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
        const matchesFilter = currentFilter === 'all' || subject.branch === currentFilter;
        const matchesSearch = subject.name.toLowerCase().includes(searchQuery) || 
                             subject.branch.toLowerCase().includes(searchQuery);
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
        <div class="subject-card" onclick="openSubject('${subject.path}', '${subject.name}', '${subject.branch}')">
            <div class="subject-name">${formatSubjectName(subject.name)}</div>
            <div class="subject-meta">${formatBranchName(subject.branch)}</div>
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

// Format Branch Name
function formatBranchName(name) {
    return name.toUpperCase();
}

// Format File Name
function formatFileName(name) {
    return name
        .replace('.md', '')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Open Subject
async function openSubject(path, name, branch) {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('notes-viewer').classList.add('active');
    document.getElementById('notes-title').textContent = formatSubjectName(name);
    
    // Fetch subject files
    try {
        const response = await fetch(`${GITHUB_API_BASE}/${GITHUB_REPO}/contents/${path}`);
        const files = await response.json();
        
        if (Array.isArray(files)) {
            // Filter for markdown files
            const mdFiles = files.filter(file => file.name.endsWith('.md')).sort((a, b) => {
                // Sort by name (UNIT_1, UNIT_2, etc.)
                return a.name.localeCompare(b.name);
            });
            
            if (mdFiles.length > 0) {
                // Load the first markdown file
                await loadMarkdownFile(mdFiles[0].path, mdFiles, name, branch);
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
async function loadMarkdownFile(filePath, allFiles, subjectName, branch) {
    try {
        // Use raw.githubusercontent.com for direct file access
        const response = await fetch(`${GITHUB_RAW_BASE}/${GITHUB_REPO}/main/${filePath}`);
        const content = await response.text();
        
        if (content) {
            // Use marked.js for proper markdown rendering
            const html = marked.parse(content);
            
            // Create file navigation if multiple files
            let fileNav = '';
            if (allFiles.length > 1) {
                fileNav = `
                    <div style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid var(--vitarn-border);">
                        <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; color: var(--vitarn-text-light);">UNITS:</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${allFiles.map(file => `
                                <button 
                                    class="filter-chip ${file.path === filePath ? 'active' : ''}"
                                    onclick="loadMarkdownFileByIndex(${allFiles.indexOf(file)})"
                                >
                                    ${formatFileName(file.name)}
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

// Show Home
function showHome() {
    document.getElementById('notes-viewer').classList.remove('active');
    document.getElementById('home-page').classList.remove('hidden');
    document.getElementById('notes-content').innerHTML = '<div class="loading"><div class="spinner"></div></div>';
}

// Load Markdown File by Index
function loadMarkdownFileByIndex(index) {
    if (window.currentFiles && window.currentFiles[index]) {
        const file = window.currentFiles[index];
        loadMarkdownFile(file.path, window.currentFiles, window.currentSubjectName, window.currentBranch);
    }
}
