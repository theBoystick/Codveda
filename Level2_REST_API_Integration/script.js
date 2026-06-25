// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const resultsSection = document.getElementById('resultsSection');
const resultsList = document.getElementById('resultsList');
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');
const sortRadios = document.querySelectorAll('input[name="sort"]');

// API Configuration
const API_BASE = 'https://api.github.com/search/repositories';
const DEBOUNCE_DELAY = 500;

let debounceTimer;
let currentQuery = '';
let currentSort = 'stars';

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

sortRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        currentSort = e.target.value;
        if (currentQuery) {
            // Debounce the search to avoid excessive API calls
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(handleSearch, DEBOUNCE_DELAY);
        }
    });
});

// Handle Search
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        showError('Veuillez entrer un terme de recherche');
        return;
    }

    currentQuery = query;
    showLoading();

    try {
        const data = await fetchRepositories(query, currentSort);
        displayResults(data);
    } catch (error) {
        showError(error.message);
    }
}

// Fetch from GitHub API
async function fetchRepositories(query, sort = 'stars') {
    const params = new URLSearchParams({
        q: query,
        sort: sort,
        order: 'desc',
        per_page: 15,
    });

    const response = await fetch(`${API_BASE}?${params}`);

    if (!response.ok) {
        if (response.status === 422) {
            throw new Error('Requête invalide. Veuillez vérifier votre recherche.');
        }
        if (response.status === 403) {
            throw new Error('Limite d\'API atteinte. Veuillez attendre quelques minutes.');
        }
        throw new Error('Erreur lors de la récupération des données');
    }

    return await response.json();
}

// Display Results
function displayResults(data) {
    hideAllStates();

    if (data.items.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.textContent = '😶 Aucun résultat trouvé pour votre recherche';
        return;
    }

    resultsSection.classList.remove('hidden');
    resultCount.textContent = Math.min(data.total_count, 1000);

    resultsList.innerHTML = data.items.map(repo => createRepoCard(repo)).join('');
}

// Create Repository Card
function createRepoCard(repo) {
    const stars = formatNumber(repo.stargazers_count);
    const forks = formatNumber(repo.forks_count);
    const updated = new Date(repo.updated_at).toLocaleDateString('fr-FR');
    const language = repo.language || 'Non spécifié';
    const description = repo.description || 'Pas de description disponible';

    return `
        <div class="repo-card">
            <div class="repo-header">
                <a href="${repo.html_url}" target="_blank" class="repo-name">
                    ${repo.name}
                </a>
                <span class="repo-language">${language}</span>
            </div>
            <p class="repo-description">${escapeHtml(description)}</p>
            <div class="repo-stats">
                <span class="stat">⭐ ${stars} stars</span>
                <span class="stat">🍴 ${forks} forks</span>
                <span class="stat">👁️ ${formatNumber(repo.watchers_count)} watchers</span>
                <span class="stat">📅 ${updated}</span>
            </div>
        </div>
    `;
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoading() {
    hideAllStates();
    loadingState.classList.remove('hidden');
}

function showError(message) {
    hideAllStates();
    errorState.classList.remove('hidden');
    errorState.innerHTML = `
        <strong>⚠️ Erreur:</strong> ${message}
    `;
    emptyState.classList.remove('hidden');
}

function hideAllStates() {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    resultsSection.classList.add('hidden');
    emptyState.classList.add('hidden');
}

// Initialize
console.log('REST API Integration - GitHub Repository Finder loaded');
