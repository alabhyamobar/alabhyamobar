document.addEventListener('DOMContentLoaded', () => {

  const themeToggle = document.getElementById('theme-toggle');
  const modeIcon = themeToggle.querySelector('.mode-icon');
  const toggleText = themeToggle.querySelector('.toggle-text');

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeUI('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeUI('light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme);
    
    logTerminal(`System theme switched to: ${newTheme.toUpperCase()}`);
  });

  function updateThemeUI(theme) {
    if (theme === 'dark') {
      modeIcon.textContent = '💀';
      toggleText.textContent = 'CYBER';
      themeToggle.style.backgroundColor = 'var(--neon-pink)';
    } else {
      modeIcon.textContent = '🌞';
      toggleText.textContent = 'LIGHT';
      themeToggle.style.backgroundColor = 'var(--neon-yellow)';
    }
  }

  const typingText = document.getElementById('typing-text');
  const phrases = [
    "Building Production Ready Applications",
    "Learning Distributed Systems",
    "Exploring Cloud & Backend Engineering",
    "Future Software Engineer in Japan 🇯🇵"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);

  const interactiveTodos = document.querySelectorAll('.interactive-todo');
  const completedCountEl = document.getElementById('completed-count');
  const totalCountEl = document.getElementById('total-count');

  function updateRoadmapCounter() {
    const completed = document.querySelectorAll('.roadmap-item.completed').length;
    const total = document.querySelectorAll('.roadmap-item').length;
    completedCountEl.textContent = completed;
    totalCountEl.textContent = total;
  }

  interactiveTodos.forEach(todo => {
    const isCompleted = localStorage.getItem(`roadmap-${todo.id}`) === 'true';
    if (isCompleted) {
      todo.checked = true;
      todo.closest('.roadmap-item').classList.add('completed');
    }

    todo.addEventListener('change', (e) => {
      const item = e.target.closest('.roadmap-item');
      if (e.target.checked) {
        item.classList.add('completed');
        localStorage.setItem(`roadmap-${e.target.id}`, 'true');
        logTerminal(`[ROADMAP] Completed learning milestone: ${e.target.nextElementSibling.nextElementSibling.textContent}`);
      } else {
        item.classList.remove('completed');
        localStorage.setItem(`roadmap-${e.target.id}`, 'false');
        logTerminal(`[ROADMAP] Reverted milestone status: ${e.target.nextElementSibling.nextElementSibling.textContent}`);
      }
      updateRoadmapCounter();
    });
  });

  updateRoadmapCounter();

  const syncBtn = document.getElementById('refresh-dashboard');
  const progressFills = document.querySelectorAll('.progress-bar-fill');

  syncBtn.addEventListener('click', () => {
    logTerminal('Initiating telemetry synchronization sync_dashboard.sh...');
    syncBtn.disabled = true;
    syncBtn.textContent = 'SYNCING';

    progressFills.forEach(fill => {
      const targetWidth = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => {
        fill.style.width = targetWidth;
      }, 300);
    });

    setTimeout(() => {
      syncBtn.disabled = false;
      syncBtn.textContent = 'SYNC';
      logTerminal('Telemetry synchronization SUCCESS. Dashboard updated.');
    }, 1300);
  });

  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalClear = document.querySelector('.term-clear');
  const quickBtns = document.querySelectorAll('.term-quick-btn');

  function handleCommand(cmdText) {
    const trimmedCmd = cmdText.trim().toLowerCase();
    if (trimmedCmd === '') return;

    appendLog(`alabhya@mobar-box:~$ ${cmdText}`, 'user-cmd');

    switch (trimmedCmd) {
      case 'help':
        appendLog(`Available commands:
  about       - Detailed introduction and status
  skills      - Full list of current tech languages & tools
  projects    - Descriptions of highlighted projects
  japan       - Read details regarding Alabhya's Japan goal
  clear       - Clear the terminal console output`);
        break;
      case 'clear':
        terminalHistory.innerHTML = '<div>Console logs cleared. Enter <span class="text-neon-cyan">help</span> for a list of actions.</div>';
        addQuickButtons();
        break;
      case 'about':
        appendLog(`=== ABOUT ALABHYA MOBAR ===
STATUS:   Building production-grade applications
FOCUS:    Backend, distributed systems, and AI integration
LOCATION: India (Relocation ready)
BIO:      I design scalable, high-performance backends using Express/Node.js, 
          PostgreSQL, MongoDB, and Docker. Currently focused on deep systems 
          engineering and cloud automation.`);
        break;
      case 'skills':
        appendLog(`=== TECHNICAL CAPABILITIES ===
[Languages] TypeScript, JavaScript, Python, C++, Java
[Frontend]  React, Vite, Tailwind CSS, HTML5, CSS3
[Backend]   Node.js, Express, MongoDB, PostgreSQL, Docker
[Learning]  Linux Administration, AWS, Redis, Go Programming, GitHub Actions`);
        break;
      case 'projects':
        appendLog(`=== FEATURED WORK ===
1. Placify [AI Interview Simulator]
   Evaluating performance metrics dynamically using Gemini API.
2. Industrial Brain AI [Knowledge Base]
   Structured document search built using Python, LangChain, and RAG.
3. SyncBoard AI [Collab Board]
   Interactive Rich-Text workspace running on React, Socket.io, and Redis.
4. Sky Renewable Energy [Marketing Site]
   High fidelity interface showcasing Framer Motion capabilities.`);
        break;
      case 'japan':
        appendLog(`=== JAPAN DESTINATION GOAL 🇯🇵 ===
A key career milestone is securing a Software Engineering position in Japan.
Focusing on learning language basics, exploring Japan's tech ecosystems, 
and building robust distributed backends that meet global standards. 
Active, ambitious, and ready to bring value to global teams.`);
        break;
      default:
        appendLog(`bash: command not found: ${cmdText}. Type 'help' to see list of valid routines.`, 'error-cmd');
    }

    terminalHistory.scrollTop = terminalHistory.scrollHeight;
  }

  function appendLog(text, className = '') {
    const div = document.createElement('div');
    if (className) div.className = className;
    div.textContent = text;
    terminalHistory.appendChild(div);
  }

  function logTerminal(text) {
    appendLog(`[SYSTEM] ${text}`, 'system-log');
    terminalHistory.scrollTop = terminalHistory.scrollHeight;
  }

  function addQuickButtons() {
    const btnContainer = document.createElement('div');
    btnContainer.className = 'terminal-quick-btns';
    
    const cmds = ['about', 'skills', 'projects', 'japan', 'clear'];
    cmds.forEach(cmd => {
      const btn = document.createElement('button');
      btn.className = 'term-quick-btn';
      btn.dataset.cmd = cmd;
      btn.textContent = cmd === 'japan' ? 'japan-goal' : cmd;
      btn.addEventListener('click', () => {
        terminalInput.value = cmd;
        handleCommand(cmd);
        terminalInput.value = '';
        terminalInput.focus();
      });
      btnContainer.appendChild(btn);
    });
    
    terminalHistory.appendChild(btnContainer);
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      handleCommand(val);
      terminalInput.value = '';
    }
  });

  terminalClear.addEventListener('click', () => {
    handleCommand('clear');
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cmd = e.target.dataset.cmd;
      terminalInput.value = cmd;
      handleCommand(cmd);
      terminalInput.value = '';
      terminalInput.focus();
    });
  });

  const emailBtn = document.getElementById('email-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailAddress = "alabhyamobar50@gmail.com";
    
    navigator.clipboard.writeText(emailAddress).then(() => {
      showToast("Email address copied to clipboard!");
      logTerminal(`Copied email context: ${emailAddress}`);
    }).catch(err => {
      showToast("Failed to copy email automatically.");
    });
  });

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const projId = item.dataset.project;
      const title = item.querySelector('.project-title').textContent;
      logTerminal(`Inspected project: ${title} [ID: ${projId}]`);
    });
  });

  const techBadges = document.querySelectorAll('.tech-badge');
  techBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const tech = badge.dataset.tech;
      logTerminal(`Tech interest registered: ${badge.textContent.toUpperCase()}`);
    });
  });

});
