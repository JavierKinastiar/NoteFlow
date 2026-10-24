/**
 * script.js — NoteFlow AI Smart Notes
 * ======================================
 * Modules:
 *  1.  State & Storage
 *  2.  Demo data seed
 *  3.  Utility helpers
 *  4.  Landing page controls
 *  5.  App shell / routing
 *  6.  Dashboard page
 *  7.  Notes page + CRUD
 *  8.  Tasks page + CRUD
 *  9.  Calendar page + CRUD
 *  10. Projects page + CRUD (Kanban)
 *  11. AI Assistant (demo simulation)
 *  12. Focus & Habits (Pomodoro + Habit tracker)
 *  13. Settings page
 *  14. Modal / dialog / toast helpers
 *  15. Global search
 *  16. Initialization
 */

"use strict";

/* ============================================================
   1. STATE & STORAGE
   ============================================================ */

const STORAGE_KEY = "noteflow_v1";

let state = {
  notes:    [],
  tasks:    [],
  events:   [],
  projects: [],
  habits:   [],
  settings: { userName: "Alex", theme: "light" },
  pomodoro: { workMin:25, breakMin:5, longBreakMin:15 },
  habitLog: {}   // { "YYYY-MM-DD": { habitId: true } }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = Object.assign(state, parsed);
    }
  } catch(e) { console.warn("State load failed:", e); }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch(e) { console.warn("State save failed:", e); }
}

/* ============================================================
   2. DEMO DATA SEED
   ============================================================ */

function seedDemoData() {
  const today = new Date();
  const fmt = d => d.toISOString().split("T")[0];
  const d = (offset) => { const x=new Date(today); x.setDate(x.getDate()+offset); return fmt(x); };

  state.notes = [
    { id:"n1", title:"Project Kickoff Meeting Notes", content:"Team discussed scope, timeline, and resource allocation.\n- Define MVP features\n- Set sprint goals\n- Assign task owners\n\n**Action items:**\n- Alex: prepare wireframes\n- Sara: setup repo\n- Mike: write PRD", folder:"Work", tags:["meeting","project"], pinned:true, linked_tasks:["t2"], linked_project:"p1", created_at: d(-5), updated_at: d(-1) },
    { id:"n2", title:"React Hooks Study Notes", content:"useState, useEffect, useCallback, useMemo, useRef.\n\n**useEffect cleanup:**\nReturn a function from useEffect to clean up subscriptions and timers.", folder:"Study", tags:["react","frontend"], pinned:false, linked_tasks:[], linked_project:null, created_at: d(-10), updated_at: d(-3) },
    { id:"n3", title:"Book Club Ideas", content:"1. Atomic Habits by James Clear\n2. Deep Work by Cal Newport\n3. The Lean Startup\n\nNext meeting: discuss chapter 5–8.", folder:"Personal", tags:["books","personal"], pinned:false, linked_tasks:[], linked_project:null, created_at: d(-2), updated_at: d(-2) },
    { id:"n4", title:"Freelance Client Requirements", content:"Client: PT Nusantara Digital\nProject: E-commerce redesign\nDeadline: End of month\n\n- Mobile-first design\n- Dark mode support\n- Payment gateway integration", folder:"Work", tags:["freelance","client"], pinned:true, linked_tasks:["t3"], linked_project:"p2", created_at: d(-7), updated_at: d(0) },
    { id:"n5", title:"Daily Standup Template", content:"**Yesterday:**\n- \n\n**Today:**\n- \n\n**Blockers:**\n- None", folder:"Work", tags:["template","daily"], pinned:false, linked_tasks:[], linked_project:null, created_at: d(-14), updated_at: d(-14) },
  ];

  state.tasks = [
    { id:"t1", title:"Design homepage wireframes", desc:"Create low-fidelity wireframes for mobile and desktop.", deadline:d(2), priority:"high", status:"inprogress", linked_note:"n1", linked_project:"p1", created_at:d(-3) },
    { id:"t2", title:"Write technical specification", desc:"Document API endpoints, data models, and architecture decisions.", deadline:d(5), priority:"high", status:"todo", linked_note:"n1", linked_project:"p1", created_at:d(-3) },
    { id:"t3", title:"Client feedback revision", desc:"Apply feedback from client review meeting.", deadline:d(1), priority:"high", status:"todo", linked_note:"n4", linked_project:"p2", created_at:d(-1) },
    { id:"t4", title:"Study React Query", desc:"Learn server state management with React Query.", deadline:d(7), priority:"medium", status:"todo", linked_note:"n2", linked_project:null, created_at:d(-2) },
    { id:"t5", title:"Update portfolio website", desc:"Add recent projects and update bio section.", deadline:d(-1), priority:"medium", status:"todo", linked_note:null, linked_project:null, created_at:d(-5) },
    { id:"t6", title:"Review PR #42", desc:"Code review for authentication module.", deadline:d(0), priority:"medium", status:"inprogress", linked_note:null, linked_project:"p1", created_at:d(-1) },
    { id:"t7", title:"Read Atomic Habits Ch.1-4", desc:"", deadline:d(3), priority:"low", status:"completed", linked_note:"n3", linked_project:null, created_at:d(-6) },
    { id:"t8", title:"Setup CI/CD pipeline", desc:"Configure GitHub Actions for automated tests.", deadline:d(10), priority:"medium", status:"completed", linked_note:null, linked_project:"p1", created_at:d(-8) },
  ];

  state.events = [
    { id:"e1", title:"Team Standup", desc:"Daily sync with dev team", date:d(0), start_time:"09:00", end_time:"09:30", category:"work", linked_note:"n5", linked_project:"p1" },
    { id:"e2", title:"Design Review", desc:"Review UI mockups with stakeholders", date:d(0), start_time:"14:00", end_time:"15:30", category:"work", linked_note:"n1", linked_project:"p1" },
    { id:"e3", title:"Client Meeting", desc:"Monthly check-in with PT Nusantara Digital", date:d(2), start_time:"10:00", end_time:"11:00", category:"business", linked_note:"n4", linked_project:"p2" },
    { id:"e4", title:"React Study Session", desc:"Go through React Hooks documentation", date:d(1), start_time:"19:00", end_time:"21:00", category:"study", linked_note:"n2", linked_project:null },
    { id:"e5", title:"Book Club Meeting", desc:"Discuss chapters 5–8", date:d(5), start_time:"18:00", end_time:"20:00", category:"personal", linked_note:"n3", linked_project:null },
    { id:"e6", title:"Sprint Planning", desc:"Plan tasks for next sprint", date:d(3), start_time:"09:00", end_time:"11:00", category:"work", linked_note:null, linked_project:"p1" },
  ];

  state.projects = [
    { id:"p1", name:"E-Commerce Platform", desc:"Build a modern e-commerce platform with cart, payments, and admin.", status:"inprogress", start_date:d(-14), end_date:d(30), color:"#2563eb" },
    { id:"p2", name:"Client Website Redesign", desc:"Redesign website for PT Nusantara Digital with mobile-first approach.", status:"inprogress", start_date:d(-7), end_date:d(21), color:"#f97316" },
    { id:"p3", name:"Personal Portfolio", desc:"Update portfolio with latest projects and skills.", status:"todo", start_date:d(0), end_date:d(14), color:"#10b981" },
  ];

  state.habits = [
    { id:"h1", name:"Morning Exercise", icon:"🏃", color:"#2563eb" },
    { id:"h2", name:"Read 30 minutes", icon:"📚", color:"#f97316" },
    { id:"h3", name:"Drink 8 glasses water", icon:"💧", color:"#06b6d4" },
    { id:"h4", name:"No social media before 10am", icon:"📵", color:"#8b5cf6" },
  ];

  saveState();
}

/* ============================================================
   3. UTILITY HELPERS
   ============================================================ */

const uid = () => "_" + Math.random().toString(36).substr(2,9);
const today = () => new Date().toISOString().split("T")[0];
const now   = () => new Date();

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}

function formatDateShort(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month:"short", day:"numeric" });
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  return dateStr < today();
}

function isPriority(p) {
  return { high:"priority-high", medium:"priority-medium", low:"priority-low" }[p] || "priority-low";
}

function isStatus(s) {
  return { todo:"status-todo", inprogress:"status-inprogress", completed:"status-completed" }[s] || "status-todo";
}

function priorityLabel(p) {
  return { high:"High", medium:"Medium", low:"Low" }[p] || p;
}

function statusLabel(s) {
  return { todo:"To Do", inprogress:"In Progress", completed:"Completed" }[s] || s;
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = Math.round((new Date(dateStr+"T12:00:00") - new Date()) / 86400000);
  if (diff < 0)  return `${Math.abs(diff)} day${Math.abs(diff)!==1?"s":""} overdue`;
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  return `Due in ${diff} days`;
}

function escHtml(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function getProjectProgress(projectId) {
  const tasks = state.tasks.filter(t => t.linked_project === projectId);
  if (!tasks.length) return 0;
  const done = tasks.filter(t => t.status === "completed").length;
  return Math.round((done / tasks.length) * 100);
}

function getUserInitials(name) {
  return (name || "U").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
}

/* ============================================================
   4. LANDING PAGE CONTROLS
   ============================================================ */

function openApp() {
  document.getElementById("landingPage").classList.add("hidden");
  document.getElementById("appShell").classList.remove("hidden");
  document.getElementById("appShell").classList.add("flex");
  navigateTo("dashboard");
  applyTheme();
}

function backToLanding() {
  document.getElementById("appShell").classList.add("hidden");
  document.getElementById("appShell").classList.remove("flex");
  document.getElementById("landingPage").classList.remove("hidden");
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.add("hidden");
}

document.getElementById("mobileMenuBtn")?.addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("hidden");
});

/* ============================================================
   5. APP SHELL / ROUTING
   ============================================================ */

let currentPage = "dashboard";
let globalSearchQuery = "";

function navigateTo(page) {
  currentPage = page;
  // Update sidebar active state
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
  // Close sidebar on mobile
  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.add("-translate-x-full");
    document.getElementById("sidebarOverlay").classList.add("hidden");
  }
  // Render page
  const container = document.getElementById("pageContent");
  container.classList.remove("animate-fade-in");
  void container.offsetWidth; // reflow
  container.classList.add("animate-fade-in");
  const pages = { dashboard, notes, tasks, calendar, projects, ai, focus, settings, study };
  if (pages[page]) pages[page]();
  // Update task badge
  updateTaskBadge();
}

function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  const ov = document.getElementById("sidebarOverlay");
  const isOpen = !sb.classList.contains("-translate-x-full");
  sb.classList.toggle("-translate-x-full", isOpen);
  ov.classList.toggle("hidden", isOpen);
}

function applyTheme() {
  const dark = state.settings.theme === "dark";
  document.documentElement.classList.toggle("dark", dark);
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.innerHTML = dark
      ? `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>`
      : `<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>`;
  }
}

function toggleTheme() {
  state.settings.theme = state.settings.theme === "light" ? "dark" : "light";
  saveState();
  applyTheme();
}

function updateTaskBadge() {
  const badge = document.getElementById("taskBadge");
  const active = state.tasks.filter(t => t.status !== "completed").length;
  if (active > 0) {
    badge.textContent = active;
    badge.classList.remove("hidden");
    badge.classList.add("flex");
  } else {
    badge.classList.add("hidden");
    badge.classList.remove("flex");
  }
}

function updateUserDisplay() {
  const name = state.settings.userName || "User";
  const el = document.getElementById("userNameDisplay");
  const av = document.getElementById("userAvatar");
  if (el) el.textContent = name;
  if (av) av.textContent = getUserInitials(name);
}

/* ============================================================
   6. DASHBOARD PAGE
   ============================================================ */

function dashboard() {
  const pc = document.getElementById("pageContent");
  const todayStr = today();
  const todayEvents = state.events.filter(e => e.date === todayStr).sort((a,b)=>a.start_time.localeCompare(b.start_time));
  const upcomingDeadlines = state.tasks.filter(t => t.status !== "completed" && t.deadline && t.deadline >= todayStr).sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,5);
  const recentNotes = [...state.notes].sort((a,b)=>b.updated_at.localeCompare(a.updated_at)).slice(0,3);
  const activeTasks = state.tasks.filter(t => t.status !== "completed").length;
  const completedTasks = state.tasks.filter(t => t.status === "completed").length;
  const overdueTasks = state.tasks.filter(t => t.status !== "completed" && isOverdue(t.deadline)).length;
  const activeProjects = state.projects.filter(p => p.status !== "completed").length;
  const name = state.settings.userName || "User";

  pc.innerHTML = `
  <div class="max-w-5xl mx-auto space-y-6">
    <!-- Greeting + quick actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 class="text-2xl font-bold text-navy dark:text-slate-100">${getGreeting()}, ${escHtml(name)} 👋</h2>
        <p class="text-slate-500 text-sm mt-1">${formatDate(todayStr)} · ${t("dash_events_today",{n:todayEvents.length})}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="openNoteModal()" class="btn-primary flex items-center gap-1.5 text-xs px-3 py-2">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> ${t("nav_notes")}
        </button>
        <button onclick="openTaskModal()" class="btn-secondary flex items-center gap-1.5 text-xs px-3 py-2">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> ${t("nav_tasks")}
        </button>
        <button onclick="openEventModal()" class="btn-secondary flex items-center gap-1.5 text-xs px-3 py-2">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> ${t("nav_calendar")}
        </button>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="stat-card cursor-pointer" onclick="navigateTo('notes')">
        <div class="text-3xl font-bold text-primary">${state.notes.length}</div>
        <div class="text-slate-500 text-sm mt-1">${t("dash_notes_count")}</div>
      </div>
      <div class="stat-card cursor-pointer" onclick="navigateTo('tasks')">
        <div class="text-3xl font-bold text-accent">${activeTasks}</div>
        <div class="text-slate-500 text-sm mt-1">${t("dash_active_tasks")}</div>
      </div>
      <div class="stat-card cursor-pointer" onclick="navigateTo('tasks')">
        <div class="text-3xl font-bold text-green-600">${completedTasks}</div>
        <div class="text-slate-500 text-sm mt-1">${t("dash_completed")}</div>
      </div>
      <div class="stat-card cursor-pointer" onclick="navigateTo('projects')">
        <div class="text-3xl font-bold ${overdueTasks>0?'text-red-500':'text-blue-500'}">${overdueTasks > 0 ? overdueTasks : activeProjects}</div>
        <div class="text-slate-500 text-sm mt-1">${overdueTasks > 0 ? t("dash_overdue_tasks") : t("dash_projects")}</div>
      </div>
    </div>

    <!-- Main content grid -->
    <div class="grid md:grid-cols-2 gap-6">

      <!-- Today's Agenda -->
      <div class="stat-card">
        <div class="section-header">
          <span class="section-title">${t("dash_agenda_title")}</span>
          <button onclick="navigateTo('calendar')" class="text-xs text-primary hover:underline font-medium">${t("dash_view_calendar")}</button>
        </div>
        ${todayEvents.length === 0 ? `<div class="empty-state py-6"><svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><p class="text-slate-400 text-sm">${t("dash_agenda_empty")}</p></div>` :
          todayEvents.map(ev => `
          <div class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer mb-2" onclick="viewEventDetail('${ev.id}')">
            <div class="w-1 h-10 rounded-full ${catColor(ev.category)} flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-sm text-slate-700 dark:text-slate-200 truncate">${escHtml(ev.title)}</p>
              <p class="text-xs text-slate-500">${ev.start_time} – ${ev.end_time}</p>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium cal-event-${ev.category}">${t("event_cat_"+ev.category)||ev.category}</span>
          </div>`).join("")}
      </div>

      <!-- Upcoming Deadlines -->
      <div class="stat-card">
        <div class="section-header">
          <span class="section-title">${t("dash_deadlines_title")}</span>
          <button onclick="navigateTo('tasks')" class="text-xs text-primary hover:underline font-medium">${t("dash_all_tasks")}</button>
        </div>
        ${upcomingDeadlines.length === 0 ? `<div class="empty-state py-6"><svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/></svg><p class="text-slate-400 text-sm">${t("dash_deadlines_empty")}</p></div>` :
          upcomingDeadlines.map(t2 => `
          <div class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition mb-2 cursor-pointer" onclick="viewTaskDetail('${t2.id}')">
            <input type="checkbox" class="task-check" ${t2.status==='completed'?'checked':''} onchange="toggleTaskStatus('${t2.id}');dashboard()" onclick="event.stopPropagation()"/>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm text-slate-700 dark:text-slate-200 truncate ${t2.status==='completed'?'line-through text-slate-400':''}">${escHtml(t2.title)}</p>
              <p class="text-xs ${isOverdue(t2.deadline)?'text-red-500 font-semibold':'text-slate-500'}">${daysUntil(t2.deadline)}</p>
            </div>
            <span class="priority-badge ${isPriority(t2.priority)}">${priorityLabel(t2.priority)}</span>
          </div>`).join("")}
      </div>
    </div>

    <!-- Recent Notes + Projects -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Recent Notes -->
      <div class="stat-card">
        <div class="section-header">
          <span class="section-title">${t("dash_notes_title")}</span>
          <button onclick="navigateTo('notes')" class="text-xs text-primary hover:underline font-medium">${t("dash_all_notes")}</button>
        </div>
        ${recentNotes.length === 0 ? `<div class="empty-state py-4"><p class="text-slate-400 text-sm">${t("dash_notes_empty")}</p></div>` :
          recentNotes.map(n => `
          <div class="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition mb-2 cursor-pointer" onclick="openNoteDetail('${n.id}')">
            <div class="flex items-center gap-2 mb-1">
              ${n.pinned ? `<svg class="w-3 h-3 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4a1 1 0 011 1v6l2 3H5l2-3V5a1 1 0 011-1h8z"/></svg>` : ""}
              <p class="font-semibold text-sm text-slate-700 dark:text-slate-200 truncate flex-1">${escHtml(n.title)}</p>
            </div>
            <p class="text-xs text-slate-500 truncate">${escHtml(n.content.substring(0,80))}…</p>
            <p class="text-xs text-slate-400 mt-1">${t("dash_updated")} ${formatDateShort(n.updated_at)}</p>
          </div>`).join("")}
      </div>

      <!-- Active Projects -->
      <div class="stat-card">
        <div class="section-header">
          <span class="section-title">${t("dash_proj_title")}</span>
          <button onclick="navigateTo('projects')" class="text-xs text-primary hover:underline font-medium">${t("dash_all_projects")}</button>
        </div>
        ${state.projects.filter(p=>p.status!=='completed').length === 0 ? `<div class="empty-state py-4"><p class="text-slate-400 text-sm">${t("dash_proj_empty")}</p></div>` :
          state.projects.filter(p=>p.status!=='completed').map(p => {
            const prog = getProjectProgress(p.id);
            return `
            <div class="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition mb-2 cursor-pointer" onclick="navigateTo('projects')">
              <div class="flex justify-between mb-1">
                <p class="font-semibold text-sm text-slate-700 dark:text-slate-200 truncate flex-1">${escHtml(p.name)}</p>
                <span class="text-xs font-bold text-slate-500 ml-2">${prog}%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:${prog}%;background:${p.color}"></div></div>
              <p class="text-xs text-slate-400 mt-1">${t("proj_due")} ${formatDateShort(p.end_date)}</p>
            </div>`;
          }).join("")}
      </div>
    </div>

    <!-- Study Mode quick-access widget -->
    ${(()=>{ ensureStudyState(); const sets=state.study.studySets; const prog=state.study.progress; if(sets.length===0&&prog.totalSessions===0) return ""; return `
    <div class="stat-card">
      <div class="section-header mb-3">
        <span class="section-title">${t("study_title")}</span>
        <button onclick="navigateTo('study')" class="text-xs text-primary hover:underline font-medium">${t("study_btn_start")}</button>
      </div>
      <div class="grid grid-cols-3 gap-3 text-center text-sm">
        <div><p class="text-xl font-bold text-primary">${prog.totalSessions}</p><p class="text-xs text-slate-400">${t("study_stat_sessions")}</p></div>
        <div><p class="text-xl font-bold text-accent">${prog.totalCards}</p><p class="text-xs text-slate-400">${t("study_stat_cards")}</p></div>
        <div><p class="text-xl font-bold text-green-600">${prog.totalQuizzes>0?Math.round(prog.totalScore/prog.totalQuizzes)+"%":"—"}</p><p class="text-xs text-slate-400">${t("study_stat_avg")}</p></div>
      </div>
      ${sets.length>0?`<div class="mt-3 flex gap-2 overflow-x-auto pb-1">${sets.slice(0,3).map(s=>`<button onclick="navigateTo('study')" class="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-primary-50 text-primary hover:bg-primary hover:text-white transition font-medium">${escHtml(s.name)}</button>`).join("")}</div>`:""}
    </div>`; })()}
  </div>`;
}

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
}

function catColor(cat) {
  return { personal:"bg-blue-400", work:"bg-yellow-400", study:"bg-emerald-500", business:"bg-purple-400" }[cat] || "bg-slate-400";
}

/* ============================================================
   7. NOTES PAGE + CRUD
   ============================================================ */

let notesFilter = "all";
let notesSearch = "";
let notesFolder = "all";

function notes() {
  const pc = document.getElementById("pageContent");
  const folders = ["all", ...new Set(state.notes.map(n=>n.folder).filter(Boolean))];

  const filtered = state.notes.filter(n => {
    const matchFolder = notesFolder === "all" || n.folder === notesFolder;
    const q = notesSearch.toLowerCase();
    const matchSearch = !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
    const matchFilter = notesFilter === "all" || (notesFilter === "pinned" && n.pinned);
    return matchFolder && matchSearch && matchFilter;
  }).sort((a,b) => b.pinned - a.pinned || b.updated_at.localeCompare(a.updated_at));

  pc.innerHTML = `
  <div class="max-w-5xl mx-auto">
    <!-- Header -->
    <div class="section-header mb-4">
      <div>
        <h2 class="section-title text-xl">${t("notes_title")}</h2>
        <p class="text-slate-500 text-sm">${state.notes.length} ${t("dash_notes_count").toLowerCase()}</p>
      </div>
      <button onclick="openNoteModal()" class="btn-primary flex items-center gap-1.5">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> ${t("notes_new")}
      </button>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row gap-3 mb-5">
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" value="${escHtml(notesSearch)}" placeholder="${t("notes_search")}" oninput="notesSearch=this.value;notes()" class="form-input pl-9" />
      </div>
      <div class="flex gap-2 overflow-x-auto pb-1">
        <button onclick="notesFilter='all';notes()" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${notesFilter==='all'?'bg-primary text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}">${t("notes_filter_all")}</button>
        <button onclick="notesFilter='pinned';notes()" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${notesFilter==='pinned'?'bg-accent text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}">${t("notes_filter_pinned")}</button>
        ${folders.filter(f=>f!=='all').map(f => `<button onclick="notesFolder='${escHtml(f)}';notes()" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${notesFolder===f?'bg-navy text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}">${escHtml(f)}</button>`).join("")}
        ${notesFolder!=='all'?`<button onclick="notesFolder='all';notes()" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition">✕</button>`:""}
      </div>
    </div>

    <!-- Grid -->
    ${filtered.length === 0 ? `<div class="empty-state mt-10"><svg class="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg><p class="text-slate-400 font-medium">${t("notes_empty_title")}</p><p class="text-slate-300 text-sm">${t("notes_empty_desc")}</p></div>` :
    `<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">${filtered.map(n => noteCard(n)).join("")}</div>`}
  </div>`;
}

function noteCard(n) {
  return `
  <div class="note-card ${n.pinned?'pinned':''}" onclick="openNoteDetail('${n.id}')">
    <div class="flex items-start gap-2 mb-2">
      <div class="flex-1 min-w-0">
        <p class="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug truncate">${escHtml(n.title)}</p>
        <p class="text-xs text-slate-500 mt-0.5">${escHtml(n.folder||t("note_general"))}</p>
      </div>
      <div class="flex items-center gap-1 flex-shrink-0" onclick="event.stopPropagation()">
        <button onclick="toggleNotePin('${n.id}')" class="btn-icon text-${n.pinned?'accent':'slate-400'}" data-tooltip="${n.pinned?t('note_unpin'):t('note_pin')}">
          <svg class="w-3.5 h-3.5" fill="${n.pinned?'currentColor':'none'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
        </button>
        <button onclick="deleteNote('${n.id}')" class="btn-icon text-slate-300 hover:text-red-500">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    </div>
    <p class="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-3">${escHtml(n.content.substring(0,120))}${n.content.length>120?"…":""}</p>
    <div class="flex items-center justify-between">
      <div class="flex gap-1 flex-wrap">${(n.tags||[]).slice(0,2).map(tg=>`<span class="tag-chip">#${escHtml(tg)}</span>`).join("")}</div>
      <span class="text-xs text-slate-400">${formatDateShort(n.updated_at)}</span>
    </div>
  </div>`;
}

function openNoteDetail(id) {
  if (!id) { openModal(t("note_modal_new"), buildNoteForm(null)); return; }
  const n = state.notes.find(x => x.id === id);
  if (!n) return;
  // ── View mode ──────────────────────────────────────────────
  openModal(escHtml(n.title), `
  <div class="space-y-4">
    <!-- Meta row -->
    <div class="flex flex-wrap gap-2 text-xs text-slate-500">
      ${n.folder ? `<span class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">📁 ${escHtml(n.folder)}</span>` : ""}
      ${(n.tags||[]).map(tg=>`<span class="tag-chip">#${escHtml(tg)}</span>`).join("")}
      ${n.pinned ? `<span class="bg-orange-50 text-accent px-2 py-0.5 rounded-full">📌 ${t("note_pin_label")}</span>` : ""}
      <span class="ml-auto text-slate-400">${formatDate(n.updated_at)}</span>
    </div>
    <!-- Content -->
    <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 min-h-[140px] max-h-[55vh] overflow-y-auto">
      <p class="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">${escHtml(n.content)}</p>
    </div>
    <!-- Actions -->
    <div class="flex gap-2 pt-1 border-t border-slate-100">
      <button onclick="deleteNote('${n.id}')" class="btn-danger text-sm py-2 px-4">${t("btn_delete")}</button>
      <div class="flex gap-2 ml-auto">
        <button onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_close")}</button>
        <button onclick="openNoteEdit('${n.id}')" class="btn-primary text-sm py-2 px-4">✏️ ${t("btn_edit")}</button>
      </div>
    </div>
  </div>`);
}

function openNoteEdit(id) {
  const n = state.notes.find(x => x.id === id);
  if (!n) return;
  openModal(t("note_modal_edit") + " — " + escHtml(n.title), buildNoteForm(n));
}

function buildNoteForm(n) {
  return `
  <form onsubmit="saveNote(event,'${n?n.id:''}')">
    <div class="space-y-4">
      <div><label class="form-label">${t("note_label_title")}</label><input id="nTitle" class="form-input" value="${escHtml(n?.title||'')}" placeholder="${t("note_placeholder_title")}" required maxlength="120"/></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="form-label">${t("note_label_folder")}</label><input id="nFolder" class="form-input" value="${escHtml(n?.folder||'')}" placeholder="${t("note_placeholder_folder")}" list="folderSuggestions"/>
        <datalist id="folderSuggestions">${[...new Set(state.notes.map(x=>x.folder).filter(Boolean))].map(f=>`<option value="${escHtml(f)}">`).join("")}</datalist>
        </div>
        <div><label class="form-label">${t("note_label_tags")}</label><input id="nTags" class="form-input" value="${escHtml((n?.tags||[]).join(', '))}" placeholder="${t("note_placeholder_tags")}"/></div>
      </div>
      <div>
        <label class="form-label">${t("note_label_content")}</label>
        <textarea id="nContent" class="form-input min-h-[160px] resize-y" placeholder="${t("note_placeholder_content")}" required>${escHtml(n?.content||'')}</textarea>
      </div>
      <div class="flex items-center gap-2">
        <input type="checkbox" id="nPinned" ${n?.pinned?'checked':''} class="task-check"/>
        <label for="nPinned" class="text-sm text-slate-600 cursor-pointer select-none">${t("note_pin_label")}</label>
      </div>
      <div class="flex gap-3 pt-2 border-t border-slate-100">
        ${n ? `<button type="button" onclick="deleteNote('${n.id}')" class="btn-danger text-sm py-2 px-4">${t("btn_delete")}</button>` : ""}
        <div class="flex gap-2 ml-auto">
          <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
          <button type="submit" class="btn-primary text-sm py-2 px-4">${t("btn_save")}</button>
        </div>
      </div>
    </div>
  </form>`;
}

function openNoteModal(id) { openNoteDetail(id||null); }

function saveNote(e, id) {
  e.preventDefault();
  const title   = document.getElementById("nTitle").value.trim();
  const content = document.getElementById("nContent").value.trim();
  const folder  = document.getElementById("nFolder").value.trim() || t("note_general");
  const tags    = document.getElementById("nTags").value.split(",").map(tag=>tag.trim()).filter(Boolean);
  const pinned  = document.getElementById("nPinned").checked;
  if (!title || !content) return showToast(t("err_fields_required"),"error");

  if (id) {
    const n = state.notes.find(x=>x.id===id);
    if (n) { Object.assign(n, { title, content, folder, tags, pinned, updated_at:today() }); }
  } else {
    state.notes.unshift({ id:uid(), title, content, folder, tags, pinned, linked_tasks:[], linked_project:null, created_at:today(), updated_at:today() });
  }
  saveState();
  closeModal();
  showToast(id?t("toast_note_updated"):t("toast_note_created"),"success");
  if (currentPage === "notes") notes();
  if (currentPage === "dashboard") dashboard();
}

function toggleNotePin(id) {
  const n = state.notes.find(x=>x.id===id);
  if (n) { n.pinned = !n.pinned; saveState(); showToast(n.pinned?t("toast_note_pinned"):t("toast_note_unpinned"),"info"); notes(); }
}

function deleteNote(id) {
  confirmAction(t("confirm_delete_note"), () => {
    state.notes = state.notes.filter(x=>x.id!==id);
    saveState();
    closeModal();
    showToast(t("toast_note_deleted"),"success");
    if (currentPage === "notes") notes();
    if (currentPage === "dashboard") dashboard();
  });
}

/* ============================================================
   8. TASKS PAGE + CRUD
   ============================================================ */

let tasksFilter = "all";
let tasksSearch = "";
let tasksSortBy = "deadline";

function tasks() {
  const pc = document.getElementById("pageContent");
  const todayStr = today();
  const filterLabels = {all:t("tasks_filter_all"),active:t("tasks_filter_active"),today:t("tasks_filter_today"),overdue:t("tasks_filter_overdue"),completed:t("tasks_filter_completed")};

  let filtered = state.tasks.filter(tk => {
    const q = tasksSearch.toLowerCase();
    const matchSearch = !q || tk.title.toLowerCase().includes(q) || (tk.desc||"").toLowerCase().includes(q);
    const matchFilter =
      tasksFilter === "all"       ? true :
      tasksFilter === "active"    ? tk.status !== "completed" :
      tasksFilter === "completed" ? tk.status === "completed" :
      tasksFilter === "overdue"   ? (tk.status !== "completed" && isOverdue(tk.deadline)) :
      tasksFilter === "today"     ? tk.deadline === todayStr :
      true;
    return matchSearch && matchFilter;
  });

  // Sort
  filtered.sort((a,b) => {
    if (tasksSortBy === "deadline") {
      if (!a.deadline) return 1; if (!b.deadline) return -1;
      return a.deadline.localeCompare(b.deadline);
    }
    if (tasksSortBy === "priority") {
      const p = {high:0,medium:1,low:2};
      return (p[a.priority]||2) - (p[b.priority]||2);
    }
    return b.created_at.localeCompare(a.created_at);
  });

  pc.innerHTML = `
  <div class="max-w-3xl mx-auto">
    <div class="section-header mb-4">
      <div>
        <h2 class="section-title text-xl">${t("tasks_title")}</h2>
        <p class="text-slate-500 text-sm">${state.tasks.filter(tk=>tk.status!=='completed').length} ${t("tasks_filter_active").toLowerCase()} · ${state.tasks.filter(tk=>tk.status==='completed').length} ${t("tasks_filter_completed").toLowerCase()}</p>
      </div>
      <button onclick="openTaskModal()" class="btn-primary flex items-center gap-1.5">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> ${t("tasks_new")}
      </button>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row gap-3 mb-5">
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" value="${escHtml(tasksSearch)}" placeholder="${t("tasks_search")}" oninput="tasksSearch=this.value;tasks()" class="form-input pl-9"/>
      </div>
      <select onchange="tasksSortBy=this.value;tasks()" class="form-input w-auto py-2 text-sm">
        <option value="deadline" ${tasksSortBy==='deadline'?'selected':''}>${t("tasks_sort_deadline")}</option>
        <option value="priority" ${tasksSortBy==='priority'?'selected':''}>${t("tasks_sort_priority")}</option>
        <option value="created"  ${tasksSortBy==='created'?'selected':''}>${t("tasks_sort_newest")}</option>
      </select>
    </div>
    <div class="flex gap-1.5 mb-5 flex-wrap">
      ${["all","active","today","overdue","completed"].map(f=>`
      <button onclick="tasksFilter='${f}';tasks()" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${tasksFilter===f?'bg-primary text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}">${filterLabels[f]}</button>`).join("")}
    </div>

    <!-- Task list -->
    <div class="space-y-3">
    ${filtered.length === 0 ? `<div class="empty-state mt-10"><svg class="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/></svg><p class="text-slate-400 font-medium">${t("tasks_empty")}</p></div>` :
      filtered.map(tk => taskItemHtml(tk)).join("")}
    </div>
  </div>`;
}

function taskItemHtml(t) {
  const overdueFlag = t.status !== "completed" && isOverdue(t.deadline);
  return `
  <div class="task-item ${overdueFlag?'overdue':''} ${t.status==='completed'?'completed-task':''}" id="ti_${t.id}">
    <input type="checkbox" class="task-check" ${t.status==='completed'?'checked':''} onchange="toggleTaskStatus('${t.id}')"/>
    <div class="flex-1 min-w-0 cursor-pointer" onclick="viewTaskDetail('${t.id}')">
      <p class="task-title font-semibold text-sm text-slate-800 dark:text-slate-100">${escHtml(t.title)}</p>
      ${t.desc ? `<p class="text-xs text-slate-500 truncate mt-0.5">${escHtml(t.desc)}</p>` : ""}
      <div class="flex items-center gap-2 mt-1 flex-wrap">
        ${t.deadline ? `<span class="text-xs ${overdueFlag?'text-red-500 font-semibold':'text-slate-400'}">📅 ${formatDateShort(t.deadline)} · ${daysUntil(t.deadline)}</span>` : ""}
        ${t.linked_project ? `<span class="text-xs text-slate-400">📁 ${escHtml(state.projects.find(p=>p.id===t.linked_project)?.name||'Project')}</span>` : ""}
      </div>
    </div>
    <div class="flex items-center gap-1.5 flex-shrink-0">
      <span class="priority-badge ${isPriority(t.priority)}">${priorityLabel(t.priority)}</span>
      <span class="status-badge ${isStatus(t.status)}">${statusLabel(t.status)}</span>
      <button onclick="openTaskModal('${t.id}')" class="btn-icon text-slate-400 hover:text-primary" title="${t("btn_edit")}">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
      </button>
      <button onclick="deleteTask('${t.id}')" class="btn-icon text-slate-300 hover:text-red-500">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      </button>
    </div>
  </div>`;
}

function openTaskModal(id) {
  const tk = id ? state.tasks.find(x=>x.id===id) : null;
  openModal(tk ? t("task_modal_edit") : t("task_modal_new"), buildTaskForm(tk));
}

function viewTaskDetail(id) {
  const tk = state.tasks.find(x => x.id === id);
  if (!tk) return;
  const overdueFlag = tk.status !== "completed" && isOverdue(tk.deadline);
  const proj = tk.linked_project ? state.projects.find(p=>p.id===tk.linked_project) : null;
  openModal(escHtml(tk.title), `
  <div class="space-y-4">
    <!-- Badges -->
    <div class="flex flex-wrap gap-2">
      <span class="priority-badge ${isPriority(tk.priority)}">${priorityLabel(tk.priority)}</span>
      <span class="status-badge ${isStatus(tk.status)}">${statusLabel(tk.status)}</span>
      ${tk.deadline ? `<span class="text-xs px-2 py-0.5 rounded-full ${overdueFlag?'bg-red-100 text-red-600 font-semibold':'bg-slate-100 text-slate-600'}">📅 ${formatDate(tk.deadline)} · ${daysUntil(tk.deadline)}</span>` : ""}
      ${proj ? `<span class="text-xs bg-blue-50 text-primary px-2 py-0.5 rounded-full">📁 ${escHtml(proj.name)}</span>` : ""}
    </div>
    <!-- Description -->
    ${tk.desc ? `
    <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 min-h-[60px]">
      <p class="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">${escHtml(tk.desc)}</p>
    </div>` : ""}
    <!-- Toggle complete -->
    <label class="flex items-center gap-2 cursor-pointer select-none">
      <input type="checkbox" class="task-check" ${tk.status==="completed"?"checked":""} onchange="toggleTaskStatus('${tk.id}');viewTaskDetail('${tk.id}')"/>
      <span class="text-sm text-slate-600">${tk.status==="completed" ? t("toast_task_reopened") : t("toast_task_done")}</span>
    </label>
    <!-- Actions -->
    <div class="flex gap-2 pt-1 border-t border-slate-100">
      <button onclick="deleteTask('${tk.id}')" class="btn-danger text-sm py-2 px-4">${t("btn_delete")}</button>
      <div class="flex gap-2 ml-auto">
        <button onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_close")}</button>
        <button onclick="openTaskModal('${tk.id}')" class="btn-primary text-sm py-2 px-4">✏️ ${t("btn_edit")}</button>
      </div>
    </div>
  </div>`);
}

function buildTaskForm(tk) {
  return `
  <form onsubmit="saveTask(event,'${tk?tk.id:''}')">
    <div class="space-y-4">
      <div><label class="form-label">${t("task_label_title")}</label><input id="tTitle" class="form-input" value="${escHtml(tk?.title||'')}" placeholder="${t("task_placeholder_title")}" required maxlength="120"/></div>
      <div><label class="form-label">${t("task_label_desc")}</label><textarea id="tDesc" class="form-input" rows="2" placeholder="${t("task_placeholder_desc")}">${escHtml(tk?.desc||'')}</textarea></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="form-label">${t("task_label_deadline")}</label><input id="tDeadline" type="date" class="form-input" value="${tk?.deadline||''}"/></div>
        <div><label class="form-label">${t("task_label_priority")}</label>
          <select id="tPriority" class="form-input">
            <option value="low"    ${tk?.priority==='low'?'selected':''}>${t("priority_low")}</option>
            <option value="medium" ${tk?.priority==='medium'||!tk?'selected':''}>${t("priority_medium")}</option>
            <option value="high"   ${tk?.priority==='high'?'selected':''}>${t("priority_high")}</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="form-label">${t("task_label_status")}</label>
          <select id="tStatus" class="form-input">
            <option value="todo"       ${tk?.status==='todo'||!tk?'selected':''}>${t("status_todo")}</option>
            <option value="inprogress" ${tk?.status==='inprogress'?'selected':''}>${t("status_inprogress")}</option>
            <option value="completed"  ${tk?.status==='completed'?'selected':''}>${t("status_completed")}</option>
          </select>
        </div>
        <div><label class="form-label">${t("task_label_project")}</label>
          <select id="tProject" class="form-input">
            <option value="">${t("task_no_project")}</option>
            ${state.projects.map(p=>`<option value="${p.id}" ${tk?.linked_project===p.id?'selected':''}>${escHtml(p.name)}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="flex gap-3 pt-2 border-t border-slate-100">
        ${tk ? `<button type="button" onclick="deleteTask('${tk.id}')" class="btn-danger text-sm py-2 px-4">${t("btn_delete")}</button>` : ""}
        <div class="flex gap-2 ml-auto">
          <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
          <button type="submit" class="btn-primary text-sm py-2 px-4">${t("btn_save")}</button>
        </div>
      </div>
    </div>
  </form>`;
}

function saveTask(e, id) {
  e.preventDefault();
  const title    = document.getElementById("tTitle").value.trim();
  const desc     = document.getElementById("tDesc").value.trim();
  const deadline = document.getElementById("tDeadline").value;
  const priority = document.getElementById("tPriority").value;
  const status   = document.getElementById("tStatus").value;
  const linked_project = document.getElementById("tProject").value || null;
  if (!title) return showToast(t("err_title_required"),"error");

  if (id) {
    const tk2 = state.tasks.find(x=>x.id===id);
    if (tk2) Object.assign(tk2, { title, desc, deadline, priority, status, linked_project });
  } else {
    state.tasks.unshift({ id:uid(), title, desc, deadline, priority, status, linked_note:null, linked_project, created_at:today() });
  }
  saveState();
  closeModal();
  showToast(id?t("toast_task_updated"):t("toast_task_created"),"success");
  if (currentPage==="tasks") tasks();
  if (currentPage==="dashboard") dashboard();
  if (currentPage==="projects") projects();
  updateTaskBadge();
}

function toggleTaskStatus(id) {
  const tk3 = state.tasks.find(x=>x.id===id);
  if (!tk3) return;
  tk3.status = tk3.status === "completed" ? "todo" : "completed";
  saveState();
  showToast(tk3.status==="completed"?t("toast_task_done"):t("toast_task_reopened"),"info");
  if (currentPage==="tasks") tasks();
  if (currentPage==="dashboard") dashboard();
  if (currentPage==="projects") projects();
  updateTaskBadge();
}

function deleteTask(id) {
  confirmAction(t("confirm_delete_task"), () => {
    state.tasks = state.tasks.filter(x=>x.id!==id);
    saveState();
    closeModal();
    showToast(t("toast_task_deleted"),"success");
    if (currentPage==="tasks") tasks();
    if (currentPage==="dashboard") dashboard();
    updateTaskBadge();
  });
}

/* ============================================================
   9. CALENDAR PAGE + CRUD
   ============================================================ */

let calView = "month";
let calDate = new Date();

function calendar() {
  const pc = document.getElementById("pageContent");
  pc.innerHTML = `
  <div class="max-w-5xl mx-auto">
    <div class="section-header mb-4">
      <div>
        <h2 class="section-title text-xl">${t("cal_title")}</h2>
      </div>
      <button onclick="openEventModal()" class="btn-primary flex items-center gap-1.5">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> ${t("cal_new_event")}
      </button>
    </div>

    <!-- Calendar controls -->
    <div class="bg-white rounded-2xl border border-slate-200 p-4 mb-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <button onclick="calNavPrev()" class="btn-icon border border-slate-200 hover:bg-slate-50 w-8 h-8">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h3 id="calTitle" class="font-bold text-navy text-lg min-w-[160px] text-center"></h3>
          <button onclick="calNavNext()" class="btn-icon border border-slate-200 hover:bg-slate-50 w-8 h-8">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
          <button onclick="calDate=new Date();renderCalendar()" class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">${t("cal_today")}</button>
        </div>
        <div class="flex gap-1">
          ${["month","week","day"].map(v=>`<button onclick="calView='${v}';renderCalendar()" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${calView===v?'bg-primary text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}">${t("cal_"+v)}</button>`).join("")}
        </div>
      </div>
    </div>

    <!-- Calendar body -->
    <div id="calBody" class="bg-white rounded-2xl border border-slate-200 p-4"></div>

    <!-- Agenda panel -->
    <div id="agendaPanel" class="mt-4 bg-white rounded-2xl border border-slate-200 p-4 hidden">
      <h4 class="font-bold text-slate-700 mb-3" id="agendaTitle"></h4>
      <div id="agendaList" class="space-y-2"></div>
    </div>
  </div>`;
  renderCalendar();
}

function renderCalendar() {
  const titleEl = document.getElementById("calTitle");
  const bodyEl  = document.getElementById("calBody");
  if (!titleEl || !bodyEl) return;

  if (calView === "month") renderMonthView(titleEl, bodyEl);
  else if (calView === "week") renderWeekView(titleEl, bodyEl);
  else renderDayView(titleEl, bodyEl);
}

function calNavPrev() {
  if (calView === "month") calDate.setMonth(calDate.getMonth()-1);
  else if (calView === "week") calDate.setDate(calDate.getDate()-7);
  else calDate.setDate(calDate.getDate()-1);
  calDate = new Date(calDate);
  renderCalendar();
}
function calNavNext() {
  if (calView === "month") calDate.setMonth(calDate.getMonth()+1);
  else if (calView === "week") calDate.setDate(calDate.getDate()+7);
  else calDate.setDate(calDate.getDate()+1);
  calDate = new Date(calDate);
  renderCalendar();
}

function renderMonthView(titleEl, bodyEl) {
  const year = calDate.getFullYear(), month = calDate.getMonth();
  titleEl.textContent = calDate.toLocaleDateString("en-US",{month:"long",year:"numeric"});
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const todayStr = today();

  let html = `<div class="cal-grid mb-1">${ta("cal_days_short").map(d=>`<div class="cal-day-header">${d}</div>`).join("")}</div><div class="cal-grid">`;

  // Previous month filler
  const prevDays = new Date(year, month, 0).getDate();
  for (let i = firstDay-1; i >= 0; i--) {
    html += `<div class="cal-day other-month"><div class="cal-day-num">${prevDays-i}</div></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const isToday = dateStr === todayStr;
    const dayEvents = state.events.filter(e=>e.date===dateStr);
    const dayTasks  = state.tasks.filter(t=>t.deadline===dateStr && t.status!=="completed");
    html += `<div class="cal-day ${isToday?'today':''}" onclick="showDayAgenda('${dateStr}')">
      <div class="cal-day-num">${day}</div>
      ${dayEvents.slice(0,2).map(ev=>`<div class="cal-event-dot cal-event-${ev.category} truncate" onclick="event.stopPropagation();viewEventDetail('${ev.id}')">${ev.title}</div>`).join("")}
      ${dayTasks.slice(0,1).map(t=>`<div class="cal-event-dot cal-event-task truncate" onclick="event.stopPropagation();openTaskModal('${t.id}')">${t.title}</div>`).join("")}
      ${(dayEvents.length+dayTasks.length)>3?`<div class="text-xs text-slate-400 text-center">+${dayEvents.length+dayTasks.length-3} more</div>`:""}
    </div>`;
  }

  const remainder = (firstDay + daysInMonth) % 7;
  if (remainder > 0) for (let i=1;i<=(7-remainder);i++) html += `<div class="cal-day other-month"><div class="cal-day-num">${i}</div></div>`;

  html += `</div>`;
  bodyEl.innerHTML = html;
}

function renderWeekView(titleEl, bodyEl) {
  const d = new Date(calDate);
  d.setDate(d.getDate() - d.getDay()); // start of week
  const weekDays = [];
  for (let i=0;i<7;i++) {
    const x=new Date(d); x.setDate(d.getDate()+i); weekDays.push(x);
  }
  titleEl.textContent = `${weekDays[0].toLocaleDateString("en-US",{month:"short",day:"numeric"})} – ${weekDays[6].toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`;
  const todayStr = today();
  let html=`<div class="overflow-x-auto"><div class="min-w-[600px]">
  <div class="grid grid-cols-7 gap-2 mb-3">
  ${weekDays.map(d=>{
    const ds=d.toISOString().split("T")[0];
    const isT=ds===todayStr;
    return `<div class="text-center cursor-pointer rounded-xl p-2 ${isT?'bg-primary-50 border border-primary':''} hover:bg-slate-50 transition" onclick="showDayAgenda('${ds}')">
      <p class="text-xs font-medium text-slate-500">${d.toLocaleDateString("en-US",{weekday:"short"})}</p>
      <p class="text-lg font-bold ${isT?'text-primary':'text-slate-700'}">${d.getDate()}</p>
    </div>`;
  }).join("")}
  </div>
  <div class="grid grid-cols-7 gap-2">
  ${weekDays.map(d=>{
    const ds=d.toISOString().split("T")[0];
    const evs=state.events.filter(e=>e.date===ds);
    const tks=state.tasks.filter(t=>t.deadline===ds&&t.status!=="completed");
    return `<div class="min-h-[120px] rounded-xl border border-slate-100 p-1.5">
      ${evs.map(ev=>`<div class="cal-event-dot cal-event-${ev.category} truncate mb-1 cursor-pointer" onclick="viewEventDetail('${ev.id}')">${ev.title}</div>`).join("")}
      ${tks.map(t=>`<div class="cal-event-dot cal-event-task truncate mb-1 cursor-pointer" onclick="openTaskModal('${t.id}')">${t.title}</div>`).join("")}
    </div>`;
  }).join("")}
  </div></div></div>`;
  bodyEl.innerHTML = html;
}

function renderDayView(titleEl, bodyEl) {
  const dateStr = calDate.toISOString().split("T")[0];
  titleEl.textContent = calDate.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
  const dayEvents = state.events.filter(e=>e.date===dateStr).sort((a,b)=>a.start_time.localeCompare(b.start_time));
  const dayTasks  = state.tasks.filter(t=>t.deadline===dateStr);
  bodyEl.innerHTML = `
  <div class="space-y-3">
    ${dayEvents.length===0&&dayTasks.length===0?`<div class="empty-state py-8"><p class="text-slate-400">${t("cal_nothing")}</p><button onclick="openEventModal()" class="mt-3 btn-primary text-sm py-2">${t("cal_add_event")}</button></div>`:""}
    ${dayEvents.map(ev=>`
    <div class="flex gap-3 p-4 rounded-xl border border-slate-200 hover:border-primary transition cursor-pointer" onclick="viewEventDetail('${ev.id}')">
      <div class="w-1 rounded-full ${catColor(ev.category)} flex-shrink-0"></div>
      <div class="flex-1">
        <div class="flex justify-between">
          <p class="font-bold text-slate-800">${escHtml(ev.title)}</p>
          <span class="text-xs cal-event-${ev.category} px-2 py-0.5 rounded-full font-medium">${ev.category}</span>
        </div>
        ${ev.desc?`<p class="text-sm text-slate-500 mt-1">${escHtml(ev.desc)}</p>`:""}
        <p class="text-xs text-slate-400 mt-2">🕐 ${ev.start_time} – ${ev.end_time}</p>
      </div>
    </div>`).join("")}
    ${dayTasks.length>0?`<div class="border-t border-slate-100 pt-3"><p class="text-xs font-bold text-slate-500 uppercase mb-2">${t("cal_tasks_due")}</p>
    ${dayTasks.map(t=>`<div class="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onclick="openTaskModal('${t.id}')">
      <span class="priority-badge ${isPriority(t.priority)}">${priorityLabel(t.priority)}</span>
      <p class="text-sm text-slate-700 ${t.status==='completed'?'line-through text-slate-400':''}">${escHtml(t.title)}</p>
    </div>`).join("")}</div>`:""}
  </div>`;
}

function showDayAgenda(dateStr) {
  calDate = new Date(dateStr+"T12:00:00");
  if (calView === "month") {
    const panel = document.getElementById("agendaPanel");
    const title = document.getElementById("agendaTitle");
    const list  = document.getElementById("agendaList");
    if (!panel) return;
    const evs = state.events.filter(e=>e.date===dateStr).sort((a,b)=>a.start_time.localeCompare(b.start_time));
    const tks = state.tasks.filter(tk=>tk.deadline===dateStr);
    title.textContent = formatDate(dateStr);
    list.innerHTML = evs.length===0&&tks.length===0
      ? `<p class="text-slate-400 text-sm">${t("cal_no_events")}. <button onclick="openEventModal()" class="text-primary underline">${t("cal_add_event")}</button></p>`
      : [
          ...evs.map(ev=>`<div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onclick="viewEventDetail('${ev.id}')"><span class="w-2 h-2 rounded-full ${catColor(ev.category)} flex-shrink-0"></span><div class="flex-1"><p class="font-medium text-sm text-slate-700">${escHtml(ev.title)}</p><p class="text-xs text-slate-400">${ev.start_time}–${ev.end_time}</p></div></div>`),
          ...tks.map(t=>`<div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onclick="openTaskModal('${t.id}')"><span class="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></span><p class="text-sm text-slate-700 ${t.status==='completed'?'line-through text-slate-400':''}">📋 ${escHtml(t.title)}</p></div>`)
        ].join("");
    panel.classList.remove("hidden");
  } else {
    calView = "day";
    renderCalendar();
  }
}

function openEventModal(id) {
  const ev = id ? state.events.find(x=>x.id===id) : null;
  openModal(ev ? t("event_modal_edit") : t("event_modal_new"), buildEventForm(ev));
}

function buildEventForm(ev) {
  return `
  <form onsubmit="saveEvent(event,'${ev?ev.id:''}')">
    <div class="space-y-4">
      <div><label class="form-label">${t("event_label_title")}</label><input id="evTitle" class="form-input" value="${escHtml(ev?.title||'')}" placeholder="${t("event_label_title").replace(" *","")}" required/></div>
      <div><label class="form-label">${t("event_label_desc")}</label><textarea id="evDesc" class="form-input" rows="2">${escHtml(ev?.desc||'')}</textarea></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="form-label">${t("event_label_date")}</label><input id="evDate" type="date" class="form-input" value="${ev?.date||today()}" required/></div>
        <div><label class="form-label">${t("event_label_cat")}</label>
          <select id="evCat" class="form-input">
            ${["personal","work","study","business"].map(c=>`<option value="${c}" ${ev?.category===c?'selected':''}>${t("event_cat_"+c)}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="form-label">${t("event_label_start")}</label><input id="evStart" type="time" class="form-input" value="${ev?.start_time||'09:00'}"/></div>
        <div><label class="form-label">${t("event_label_end")}</label><input id="evEnd" type="time" class="form-input" value="${ev?.end_time||'10:00'}"/></div>
      </div>
      <div class="flex gap-3 pt-2 border-t border-slate-100">
        ${ev ? `<button type="button" onclick="deleteEvent('${ev.id}')" class="btn-danger text-sm py-2 px-4">${t("btn_delete")}</button>` : ""}
        <div class="flex gap-2 ml-auto">
          <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
          <button type="submit" class="btn-primary text-sm py-2 px-4">${t("btn_save")}</button>
        </div>
      </div>
    </div>
  </form>`;
}

function saveEvent(e, id) {
  e.preventDefault();
  const title      = document.getElementById("evTitle").value.trim();
  const desc       = document.getElementById("evDesc").value.trim();
  const date       = document.getElementById("evDate").value;
  const category   = document.getElementById("evCat").value;
  const start_time = document.getElementById("evStart").value;
  const end_time   = document.getElementById("evEnd").value;
  if (!title||!date) return showToast(t("err_date_required"),"error");

  if (id) {
    const ev = state.events.find(x=>x.id===id);
    if (ev) Object.assign(ev,{title,desc,date,category,start_time,end_time});
  } else {
    state.events.unshift({id:uid(),title,desc,date,category,start_time,end_time,linked_note:null,linked_project:null});
  }
  saveState();
  closeModal();
  showToast(id?t("toast_event_updated"):t("toast_event_created"),"success");
  if (currentPage==="calendar") calendar();
  if (currentPage==="dashboard") dashboard();
}

function viewEventDetail(id) {
  const ev = state.events.find(x=>x.id===id);
  if (!ev) return;
  openModal(escHtml(ev.title), `
  <div class="space-y-3">
    <div class="flex gap-2"><span class="cal-event-${ev.category} px-2 py-0.5 rounded-full text-xs font-semibold">${t("event_cat_"+ev.category)||ev.category}</span></div>
    ${ev.desc?`<p class="text-slate-600 text-sm">${escHtml(ev.desc)}</p>`:""}
    <div class="grid grid-cols-2 gap-3 text-sm">
      <div><p class="text-slate-400 text-xs">${t("event_label_date").replace(" *","")}</p><p class="font-semibold text-slate-700">${formatDate(ev.date)}</p></div>
      <div><p class="text-slate-400 text-xs">${t("event_label_start")}</p><p class="font-semibold text-slate-700">${ev.start_time} – ${ev.end_time}</p></div>
    </div>
    <div class="flex gap-2 pt-3 border-t border-slate-100">
      <button onclick="closeModal();openEventModal('${ev.id}')" class="btn-primary text-sm py-2 px-4">${t("btn_edit")}</button>
      <button onclick="deleteEvent('${ev.id}')" class="btn-danger text-sm py-2 px-4">${t("btn_delete")}</button>
      <button onclick="closeModal()" class="btn-secondary text-sm py-2 px-4 ml-auto">${t("btn_close")}</button>
    </div>
  </div>`);
}

function deleteEvent(id) {
  confirmAction(t("confirm_delete_event"), () => {
    state.events = state.events.filter(x=>x.id!==id);
    saveState();
    closeModal();
    showToast(t("toast_event_deleted"),"success");
    if (currentPage==="calendar") calendar();
    if (currentPage==="dashboard") dashboard();
  });
}

/* ============================================================
   10. PROJECTS PAGE + CRUD (Kanban)
   ============================================================ */

let projectView = "list";

function projects() {
  const pc = document.getElementById("pageContent");
  pc.innerHTML = `
  <div class="max-w-5xl mx-auto">
    <div class="section-header mb-4">
      <div>
        <h2 class="section-title text-xl">${t("proj_title")}</h2>
        <p class="text-slate-500 text-sm">${state.projects.length} ${t("proj_title").toLowerCase()}</p>
      </div>
      <div class="flex gap-2">
        <div class="flex gap-1">
          ${["list","kanban"].map(v=>`<button onclick="projectView='${v}';projects()" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${projectView===v?'bg-primary text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}">${v==='list'?t("proj_view_list"):t("proj_view_kanban")}</button>`).join("")}
        </div>
        <button onclick="openProjectModal()" class="btn-primary flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> ${t("proj_new")}
        </button>
      </div>
    </div>
    ${projectView==="list" ? renderProjectList() : renderProjectKanban()}
  </div>`;
}

function renderProjectList() {
  if (state.projects.length===0) return `<div class="empty-state mt-10"><p class="text-slate-400 font-medium">${t("proj_empty")}</p></div>`;
  return `<div class="space-y-4">${state.projects.map(p=>{
    const prog = getProjectProgress(p.id);
    const ptasks = state.tasks.filter(tk=>tk.linked_project===p.id);
    return `
    <div class="stat-card hover:shadow-card transition cursor-pointer" onclick="openProjectModal('${p.id}')">
      <div class="flex items-start gap-4">
        <div class="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" style="background:${p.color}"></div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start mb-1">
            <p class="font-bold text-slate-800 dark:text-slate-100">${escHtml(p.name)}</p>
            <div class="flex gap-2 items-center ml-3">
              <span class="status-badge ${isStatus(p.status)}">${statusLabel(p.status)}</span>
              <button onclick="event.stopPropagation();deleteProject('${p.id}')" class="btn-icon text-slate-300 hover:text-red-500 text-xs">✕</button>
            </div>
          </div>
          <p class="text-slate-500 text-sm mb-3 truncate">${escHtml(p.desc||'')}</p>
          <div class="flex items-center gap-4">
            <div class="flex-1 max-w-xs">
              <div class="flex justify-between text-xs text-slate-500 mb-1"><span>${ptasks.filter(tk=>tk.status==='completed').length}/${ptasks.length} ${t("proj_tasks")}</span><span class="font-bold">${prog}%</span></div>
              <div class="progress-bar"><div class="progress-fill" style="width:${prog}%;background:${p.color}"></div></div>
            </div>
            <p class="text-xs text-slate-400">${t("proj_due")} ${formatDateShort(p.end_date)}</p>
          </div>
        </div>
      </div>
    </div>`;
  }).join("")}`;
}

function renderProjectKanban() {
  const cols = [
    { key:"todo",       label:t("status_todo"),       cls:"bg-slate-100" },
    { key:"inprogress", label:t("status_inprogress"),  cls:"bg-blue-50"  },
    { key:"completed",  label:t("status_completed"),    cls:"bg-green-50" },
  ];
  return `<div class="flex gap-4 overflow-x-auto pb-4">
  ${cols.map(col=>{
    const items = state.projects.filter(p=>p.status===col.key);
    return `
    <div class="kanban-col" style="min-width:260px">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-sm text-slate-700 dark:text-slate-200">${col.label}</h3>
        <span class="text-xs font-bold text-slate-500 bg-slate-200 rounded-full px-2 py-0.5">${items.length}</span>
      </div>
      ${items.map(p=>{
        const prog=getProjectProgress(p.id);
        return `
        <div class="kanban-card" onclick="openProjectModal('${p.id}')">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2.5 h-2.5 rounded-full" style="background:${p.color}"></div>
            <p class="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">${escHtml(p.name)}</p>
          </div>
          <p class="text-xs text-slate-500 mb-2 truncate">${escHtml(p.desc||'')}</p>
          <div class="progress-bar mb-1"><div class="progress-fill" style="width:${prog}%;background:${p.color}"></div></div>
          <p class="text-xs text-slate-400">${prog}% · ${t("proj_due")} ${formatDateShort(p.end_date)}</p>
        </div>`;
      }).join("")}
    </div>`;
  }).join("")}
  </div>`;
}

function openProjectModal(id) {
  const p = id ? state.projects.find(x=>x.id===id) : null;
  const ptasks = p ? state.tasks.filter(tk=>tk.linked_project===p.id) : [];
  openModal(p?t("proj_modal_edit"):t("proj_modal_new"), `
  <form onsubmit="saveProject(event,'${p?p.id:''}')">
    <div class="space-y-4">
      <div><label class="form-label">${t("proj_label_name")}</label><input id="pName" class="form-input" value="${escHtml(p?.name||'')}" required/></div>
      <div><label class="form-label">${t("proj_label_desc")}</label><textarea id="pDesc" class="form-input" rows="2">${escHtml(p?.desc||'')}</textarea></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="form-label">${t("proj_label_start")}</label><input id="pStart" type="date" class="form-input" value="${p?.start_date||today()}"/></div>
        <div><label class="form-label">${t("proj_label_end")}</label><input id="pEnd" type="date" class="form-input" value="${p?.end_date||''}"/></div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="form-label">${t("proj_label_status")}</label>
          <select id="pStatus" class="form-input">
            <option value="todo"       ${p?.status==='todo'||!p?'selected':''}>${t("status_todo")}</option>
            <option value="inprogress" ${p?.status==='inprogress'?'selected':''}>${t("status_inprogress")}</option>
            <option value="completed"  ${p?.status==='completed'?'selected':''}>${t("status_completed")}</option>
          </select>
        </div>
        <div><label class="form-label">${t("proj_label_color")}</label><input id="pColor" type="color" class="form-input h-10 cursor-pointer" value="${p?.color||'#2563eb'}"/></div>
      </div>
      ${p&&ptasks.length>0?`
      <div class="border-t border-slate-100 pt-3">
        <p class="text-xs font-semibold text-slate-500 uppercase mb-2">${t("proj_linked_tasks")} (${ptasks.length})</p>
        <div class="space-y-1 max-h-32 overflow-y-auto">${ptasks.map(tk=>`<div class="flex items-center gap-2 text-sm"><span class="${tk.status==='completed'?'text-green-500':'text-slate-400'}">●</span><span class="truncate ${tk.status==='completed'?'line-through text-slate-400':''}">${escHtml(tk.title)}</span></div>`).join("")}</div>
      </div>`:""}
      <div class="flex gap-3 pt-2 border-t border-slate-100">
        ${p?`<button type="button" onclick="deleteProject('${p.id}')" class="btn-danger text-sm py-2 px-4">${t("btn_delete")}</button>`:""}
        <div class="flex gap-2 ml-auto">
          <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
          <button type="submit" class="btn-primary text-sm py-2 px-4">${t("btn_save")}</button>
        </div>
      </div>
    </div>
  </form>`);
}

function saveProject(e, id) {
  e.preventDefault();
  const name   = document.getElementById("pName").value.trim();
  const desc   = document.getElementById("pDesc").value.trim();
  const start  = document.getElementById("pStart").value;
  const end    = document.getElementById("pEnd").value;
  const status = document.getElementById("pStatus").value;
  const color  = document.getElementById("pColor").value;
  if (!name) return showToast(t("err_project_required"),"error");
  if (id) {
    const p = state.projects.find(x=>x.id===id);
    if (p) Object.assign(p,{name,desc,start_date:start,end_date:end,status,color});
  } else {
    state.projects.unshift({id:uid(),name,desc,start_date:start,end_date:end,status,color});
  }
  saveState();
  closeModal();
  showToast(id?t("toast_project_updated"):t("toast_project_created"),"success");
  if (currentPage==="projects") projects();
  if (currentPage==="dashboard") dashboard();
}

function deleteProject(id) {
  confirmAction(t("confirm_delete_project"), () => {
    state.tasks.forEach(tk=>{ if(tk.linked_project===id) tk.linked_project=null; });
    state.projects = state.projects.filter(x=>x.id!==id);
    saveState();
    closeModal();
    showToast(t("toast_project_deleted"),"success");
    if (currentPage==="projects") projects();
    if (currentPage==="dashboard") dashboard();
  });
}

/* ============================================================
   11. AI ASSISTANT (Demo simulation)
   ============================================================ */

let aiHistory = [];

function ai() {
  const suggestions = ta("ai_suggestions");
  const pc = document.getElementById("pageContent");
  pc.innerHTML = `
  <div class="max-w-2xl mx-auto flex flex-col" style="height:calc(100vh - 7rem)">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white flex-shrink-0">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
      </div>
      <div>
        <h2 class="font-bold text-navy dark:text-slate-100">${t("ai_title")}</h2>
        <p class="text-xs text-slate-500">${t("ai_subtitle")}</p>
      </div>
      <span class="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">${t("ai_demo_badge")}</span>
    </div>

    <!-- Chat window -->
    <div id="aiChat" class="flex-1 overflow-y-auto space-y-3 mb-4 p-1">
      ${aiHistory.length===0 ? buildAIWelcome() : aiHistory.map(h=>`
        <div class="flex flex-col gap-3">
          <div class="flex justify-end"><div class="chat-bubble user">${escHtml(h.user)}</div></div>
          <div class="flex gap-2 items-end"><div class="w-7 h-7 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center text-purple-600 text-xs font-bold">AI</div><div class="chat-bubble ai">${h.ai}</div></div>
        </div>`).join("")}
    </div>

    <!-- Suggestions -->
    ${aiHistory.length===0?`<div class="flex gap-2 flex-wrap mb-3">${suggestions.map(s=>`<button onclick="aiSend('${escHtml(s)}')" class="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 text-xs font-medium hover:bg-purple-50 transition">${escHtml(s)}</button>`).join("")}</div>`:""}

    <!-- Input -->
    <div class="flex gap-2">
      <input id="aiInput" type="text" placeholder="${t("ai_placeholder")}" class="form-input flex-1" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();aiSendInput()}"/>
      <button onclick="aiSendInput()" class="btn-primary px-4 py-2 flex items-center gap-1.5">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        ${t("ai_send")}
      </button>
    </div>
  </div>`;
  scrollAiChat();
}

function buildAIWelcome() {
  return `<div class="flex gap-2 items-end"><div class="w-7 h-7 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center text-purple-600 text-xs font-bold">AI</div>
  <div class="chat-bubble ai">Hi! I'm your NoteFlow AI assistant 👋<br/><br/>I can help you with your <strong>${state.notes.length} ${t("ai_welcome_notes")}</strong> and <strong>${state.tasks.length} ${t("ai_welcome_tasks")}</strong>. ${ta("ai_suggestions").slice(0,3).map(s=>`<br/>• ${escHtml(s)}`).join("")}<br/><br/><em>Demo mode — ${escHtml(t("ai_subtitle"))}</em></div></div>`;
}

function aiSendInput() {
  const input = document.getElementById("aiInput");
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = "";
  aiSend(msg);
}

function aiSend(msg) {
  aiHistory.push({ user: msg, ai: "<span class='typing-dot'></span><span class='typing-dot'></span><span class='typing-dot'></span>" });
  if (currentPage==="ai") ai();
  setTimeout(() => {
    aiHistory[aiHistory.length-1].ai = generateAIResponse(msg);
    if (currentPage==="ai") ai();
    scrollAiChat();
  }, 1000 + Math.random()*600);
}

function scrollAiChat() {
  const chat = document.getElementById("aiChat");
  if (chat) setTimeout(()=>{chat.scrollTop=chat.scrollHeight;},50);
}

function generateAIResponse(msg) {
  const q = msg.toLowerCase();
  const todayStr = today();

  if (q.includes("deadline") || q.includes("due") || q.includes("upcoming")) {
    const upcoming = state.tasks.filter(t=>t.status!=="completed"&&t.deadline&&t.deadline>=todayStr).sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,5);
    const overdue  = state.tasks.filter(t=>t.status!=="completed"&&isOverdue(t.deadline));
    let r = "";
    if (overdue.length>0) r+=`⚠️ <strong>${overdue.length} overdue task${overdue.length>1?"s":""}:</strong><br/>${overdue.map(t=>`• ${escHtml(t.title)} (${formatDateShort(t.deadline)})`).join("<br/>")}<br/><br/>`;
    if (upcoming.length>0) r+=`📅 <strong>Upcoming deadlines:</strong><br/>${upcoming.map(t=>`• ${escHtml(t.title)} — ${daysUntil(t.deadline)}`).join("<br/>")}`;
    return r || "No upcoming deadlines found. Great job staying on top of things! 🎉";
  }

  if (q.includes("summarize") || q.includes("summary") || q.includes("notes")) {
    const pinned = state.notes.filter(n=>n.pinned);
    const recent = [...state.notes].sort((a,b)=>b.updated_at.localeCompare(a.updated_at)).slice(0,3);
    return `📝 <strong>Your Notes Summary:</strong><br/><br/>You have <strong>${state.notes.length} notes</strong> across ${new Set(state.notes.map(n=>n.folder)).size} folders.<br/><br/>${pinned.length>0?`📌 <strong>Pinned:</strong><br/>${pinned.map(n=>`• ${escHtml(n.title)}`).join("<br/>")}<br/><br/>`:""}📅 <strong>Recently updated:</strong><br/>${recent.map(n=>`• ${escHtml(n.title)} (${formatDateShort(n.updated_at)})`).join("<br/>")}`;
  }

  if (q.includes("plan") || q.includes("today") || q.includes("schedule")) {
    const todayEvents = state.events.filter(e=>e.date===todayStr).sort((a,b)=>a.start_time.localeCompare(b.start_time));
    const highPri = state.tasks.filter(t=>t.status!=="completed"&&t.priority==="high").slice(0,3);
    let r=`🗓️ <strong>Your plan for today:</strong><br/><br/>`;
    if (todayEvents.length>0) r+=`<strong>Events:</strong><br/>${todayEvents.map(e=>`• ${e.start_time} — ${escHtml(e.title)}`).join("<br/>")}<br/><br/>`;
    if (highPri.length>0) r+=`<strong>High priority tasks to focus on:</strong><br/>${highPri.map(t=>`• ${escHtml(t.title)}`).join("<br/>")}<br/><br/>`;
    r+="💡 Tip: Use the Pomodoro timer in Focus & Habits to stay productive!";
    return r;
  }

  if (q.includes("task") && (q.includes("turn")||q.includes("convert")||q.includes("into"))) {
    const recent = state.notes[0];
    if (!recent) return "No notes found to convert. Create a note first!";
    return `✅ <strong>Suggested tasks from "${escHtml(recent.title)}":</strong><br/><br/>Based on the content, here are suggested action items:<br/><br/>• Review and finalize the main points<br/>• Follow up on any action items mentioned<br/>• Share or present the note to relevant stakeholders<br/>• Set a reminder for follow-up<br/><br/><em>You can create these tasks manually in the Tasks section. Direct AI-to-task conversion requires full AI integration.</em>`;
  }

  if (q.includes("focus") || q.includes("priority") || q.includes("important")) {
    const top = state.tasks.filter(t=>t.status!=="completed"&&t.priority==="high").slice(0,3);
    const ov  = state.tasks.filter(t=>t.status!=="completed"&&isOverdue(t.deadline));
    let r=`🎯 <strong>Focus recommendations:</strong><br/><br/>`;
    if (ov.length>0) r+=`1. <strong>Handle overdue first:</strong> You have ${ov.length} overdue task${ov.length>1?"s":""}.<br/>`;
    if (top.length>0) r+=`2. <strong>High priority:</strong><br/>${top.map((t,i)=>`${i+2}. ${escHtml(t.title)}`).join("<br/>")}<br/>`;
    r+="<br/>💡 Try the Pomodoro technique: 25 min work, 5 min break.";
    return r;
  }

  if (q.includes("project") || q.includes("break")) {
    const p = state.projects.find(x=>x.status!=="completed");
    if (!p) return "No active projects found. Create a project to get started!";
    const ptasks = state.tasks.filter(t=>t.linked_project===p.id&&t.status!=="completed");
    return `📁 <strong>Project: ${escHtml(p.name)}</strong><br/><br/>${ptasks.length>0?`Remaining tasks:<br/>${ptasks.map(t=>`• ${escHtml(t.title)} (${priorityLabel(t.priority)})`).join("<br/>")}`:"All tasks in this project are completed! 🎉"}<br/><br/>Progress: ${getProjectProgress(p.id)}%`;
  }

  if (q.includes("overdue")) {
    const ov = state.tasks.filter(t=>t.status!=="completed"&&isOverdue(t.deadline));
    return ov.length===0
      ? "🎉 Great news! You have no overdue tasks."
      : `⚠️ <strong>${ov.length} overdue task${ov.length>1?"s":""}:</strong><br/><br/>${ov.map(t=>`• ${escHtml(t.title)} — ${daysUntil(t.deadline)}`).join("<br/>")}<br/><br/>I recommend addressing the highest priority ones first!`;
  }

  return `I understand you're asking about <em>"${escHtml(msg)}"</em>.<br/><br/>As a demo assistant, I can help with:<br/>• Summarizing your notes<br/>• Listing upcoming deadlines<br/>• Planning your day<br/>• Reviewing overdue tasks<br/>• Project progress<br/><br/><em>Full AI capabilities require integration with an AI model (e.g., OpenAI, IBM watsonx).</em>`;
}

/* ============================================================
   12. FOCUS & HABITS
   ============================================================ */

let pomodoroState = { mode:"work", seconds:25*60, total:25*60, running:false, interval:null, sessions:0 };

function focus() {
  const pc = document.getElementById("pageContent");
  const todayStr = today();
  // Pomodoro durations from settings (or defaults)
  const workMin      = state.pomodoro?.workMin      || 25;
  const breakMin     = state.pomodoro?.breakMin     || 5;
  const longBreakMin = state.pomodoro?.longBreakMin || 15;

  pc.innerHTML = `
  <div class="max-w-4xl mx-auto">
    <div class="section-header mb-6">
      <h2 class="section-title text-xl">${t("focus_title")}</h2>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <!-- Pomodoro -->
      <div class="stat-card text-center">
        <h3 class="font-bold text-slate-700 dark:text-slate-200 mb-4">${t("pomodoro_title")}</h3>
        <div class="pomodoro-ring mx-auto mb-4" style="width:160px;height:160px">
          <svg width="160" height="160">
            <circle class="pomo-track" cx="80" cy="80" r="68"/>
            <circle id="pomoProgress" class="pomo-progress" cx="80" cy="80" r="68"
              stroke-dasharray="${2*Math.PI*68}" stroke-dashoffset="${2*Math.PI*68}"/>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <p id="pomoTime" class="text-3xl font-bold text-slate-800 dark:text-slate-100 tabular-nums">25:00</p>
            <p id="pomoMode" class="text-xs text-slate-500 capitalize">${pomodoroState.mode}</p>
          </div>
        </div>
        <p class="text-xs text-slate-500 mb-4">${t("pomodoro_sessions")} <strong id="pomoSessions">${pomodoroState.sessions}</strong></p>
        <div class="flex justify-center gap-2 mb-4">
          <button id="pomoBtnWork"   onclick="setPomodoroMode('work')"      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${pomodoroState.mode==='work'?'bg-primary text-white':'bg-slate-100 text-slate-600'}">${t("pomodoro_work").replace("{n}",workMin)}</button>
          <button id="pomoBtnBreak"  onclick="setPomodoroMode('break')"     class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${pomodoroState.mode==='break'?'bg-green-500 text-white':'bg-slate-100 text-slate-600'}">${t("pomodoro_break").replace("{n}",breakMin)}</button>
          <button id="pomoBtnLong"   onclick="setPomodoroMode('longbreak')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${pomodoroState.mode==='longbreak'?'bg-blue-500 text-white':'bg-slate-100 text-slate-600'}">${t("pomodoro_long").replace("{n}",longBreakMin)}</button>
        </div>
        <div class="flex justify-center gap-3">
          <button id="pomoStartBtn" onclick="togglePomodoro()" class="btn-primary px-6">
            ${pomodoroState.running ? t("pomodoro_pause") : t("pomodoro_start")}
          </button>
          <button onclick="resetPomodoro()" class="btn-secondary px-4">${t("pomodoro_reset")}</button>
        </div>
      </div>

      <!-- Habit Tracker -->
      <div class="stat-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-700 dark:text-slate-200">${t("habit_title")}</h3>
          <button onclick="openHabitModal()" class="btn-icon border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs px-2 py-1 rounded-lg">${t("habit_add")}</button>
        </div>
        ${state.habits.length===0?`<div class="empty-state py-4"><p class="text-slate-400 text-sm">${t("habit_empty")}</p></div>`:""}
        <div class="space-y-3" id="habitList">
        ${state.habits.map(h=>{
          const done = state.habitLog[todayStr]?.[h.id]||false;
          return `
          <div class="flex items-center gap-3">
            <button onclick="toggleHabit('${h.id}')" class="habit-dot ${done?'done':''} flex-shrink-0" style="${done?`background:${h.color};border-color:${h.color}`:""}">
              ${done?`<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`:`<span>${h.icon}</span>`}
            </button>
            <div class="flex-1">
              <p class="font-medium text-sm text-slate-700 dark:text-slate-200">${escHtml(h.name)}</p>
              <div class="habit-week-grid mt-1.5">
                ${getWeekDays().map(d=>{
                  const doneDay=state.habitLog[d]?.[h.id]||false;
                  return `<div class="habit-dot ${doneDay?'done':''} w-5 h-5 rounded text-xs" style="${doneDay?`background:${h.color};border-color:${h.color}`:""}"></div>`;
                }).join("")}
              </div>
            </div>
            <button onclick="deleteHabit('${h.id}')" class="btn-icon text-slate-300 hover:text-red-400">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>`;
        }).join("")}
        </div>
      </div>
    </div>

    <!-- Focus stats -->
    <div class="stat-card mt-6">
      <h3 class="font-bold text-slate-700 dark:text-slate-200 mb-4">${t("week_stats_title")}</h3>
      <div class="grid grid-cols-4 gap-4 text-center">
        <div><p class="text-2xl font-bold text-primary">${pomodoroState.sessions}</p><p class="text-xs text-slate-500">${t("week_pomodoros")}</p></div>
        <div><p class="text-2xl font-bold text-green-600">${state.tasks.filter(tk=>tk.status==='completed').length}</p><p class="text-xs text-slate-500">${t("week_done")}</p></div>
        <div><p class="text-2xl font-bold text-accent">${state.habits.length}</p><p class="text-xs text-slate-500">${t("week_habits")}</p></div>
        <div><p class="text-2xl font-bold text-purple-600">${state.notes.length}</p><p class="text-xs text-slate-500">${t("week_notes")}</p></div>
      </div>
    </div>
  </div>`;

  // Re-sync timer display
  updatePomodoroDisplay();
}

function getWeekDays() {
  const days=[]; const d=new Date();
  d.setDate(d.getDate()-d.getDay());
  for(let i=0;i<7;i++){const x=new Date(d);x.setDate(d.getDate()+i);days.push(x.toISOString().split("T")[0]);}
  return days;
}

function setPomodoroMode(mode) {
  stopPomodoro();
  pomodoroState.mode = mode;
  pomodoroState.seconds = { work:25*60, break:5*60, longbreak:15*60 }[mode];
  pomodoroState.total   = pomodoroState.seconds;
  pomodoroState.running = false;
  if (currentPage==="focus") focus();
}

function togglePomodoro() {
  if (pomodoroState.running) { stopPomodoro(); }
  else {
    if (!pomodoroState.total) setPomodoroMode(pomodoroState.mode);
    if (!pomodoroState.seconds) pomodoroState.seconds = pomodoroState.total;
    pomodoroState.running = true;
    pomodoroState.interval = setInterval(() => {
      pomodoroState.seconds--;
      updatePomodoroDisplay();
      if (pomodoroState.seconds <= 0) {
        stopPomodoro();
        pomodoroState.sessions++;
        showToast(pomodoroState.mode==="work" ? t("pomodoro_done_work") : t("pomodoro_done_break"), "success");
        if (currentPage==="focus") focus();
      }
    }, 1000);
  }
  const btn = document.getElementById("pomoStartBtn");
  if (btn) btn.textContent = pomodoroState.running ? t("pomodoro_pause") : t("pomodoro_start");
}

function stopPomodoro() {
  clearInterval(pomodoroState.interval);
  pomodoroState.running = false;
}

function resetPomodoro() {
  stopPomodoro();
  pomodoroState.seconds = pomodoroState.total || 25*60;
  updatePomodoroDisplay();
  const btn = document.getElementById("pomoStartBtn");
  if (btn) btn.textContent = t("pomodoro_start");
}

function updatePomodoroDisplay() {
  const m=Math.floor((pomodoroState.seconds||0)/60).toString().padStart(2,"0");
  const s=((pomodoroState.seconds||0)%60).toString().padStart(2,"0");
  const timeEl=document.getElementById("pomoTime");
  const progEl=document.getElementById("pomoProgress");
  if (timeEl) timeEl.textContent=`${m}:${s}`;
  if (progEl) {
    const r=68, circ=2*Math.PI*r;
    const pct=(pomodoroState.total?(pomodoroState.seconds/pomodoroState.total):1);
    progEl.style.strokeDashoffset=circ*(1-pct);
    progEl.style.stroke=pomodoroState.mode==="work"?"#2563eb":pomodoroState.mode==="break"?"#22c55e":"#3b82f6";
  }
}

function toggleHabit(id) {
  const todayStr=today();
  if (!state.habitLog[todayStr]) state.habitLog[todayStr]={};
  state.habitLog[todayStr][id] = !state.habitLog[todayStr][id];
  saveState();
  if (currentPage==="focus") focus();
}

function deleteHabit(id) {
  state.habits=state.habits.filter(h=>h.id!==id);
  saveState();
  if (currentPage==="focus") focus();
}

function openHabitModal() {
  openModal(t("habit_modal_new"), `
  <form onsubmit="saveHabit(event)">
    <div class="space-y-4">
      <div><label class="form-label">${t("habit_label_name")}</label><input id="hName" class="form-input" placeholder="${t("habit_placeholder")}" required/></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="form-label">${t("habit_label_icon")}</label><input id="hIcon" class="form-input text-2xl" value="✅" maxlength="4"/></div>
        <div><label class="form-label">${t("habit_label_color")}</label><input id="hColor" type="color" class="form-input h-10 cursor-pointer" value="#2563eb"/></div>
      </div>
      <div class="flex gap-2 justify-end pt-2 border-t border-slate-100">
        <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
        <button type="submit" class="btn-primary text-sm py-2 px-4">${t("habit_modal_new")}</button>
      </div>
    </div>
  </form>`);
}

function saveHabit(e) {
  e.preventDefault();
  const name=document.getElementById("hName").value.trim();
  const icon=document.getElementById("hIcon").value||"✅";
  const color=document.getElementById("hColor").value;
  if (!name) return;
  state.habits.push({id:uid(),name,icon,color});
  saveState();
  closeModal();
  if (currentPage==="focus") focus();
  showToast(t("toast_habit_added"), "success");
}

/* ============================================================
   13. SETTINGS PAGE
   ============================================================ */

function settings() {
  const pc = document.getElementById("pageContent");
  pc.innerHTML = `
  <div class="max-w-2xl mx-auto">
    <h2 class="section-title text-xl mb-6">${t("settings_title")}</h2>

    <div class="space-y-4">
      <!-- Profile -->
      <div class="stat-card">
        <h3 class="font-semibold text-slate-700 dark:text-slate-200 mb-4">${t("settings_profile")}</h3>
        <div class="space-y-3">
          <div><label class="form-label">${t("settings_name_label")}</label>
            <input id="settingName" class="form-input" value="${escHtml(state.settings.userName||'')}" placeholder="${t("settings_name_label")}" oninput="state.settings.userName=this.value;saveState();updateUserDisplay()"/>
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div class="stat-card">
        <h3 class="font-semibold text-slate-700 dark:text-slate-200 mb-4">${t("settings_appearance")}</h3>
        <div class="flex items-center justify-between">
          <div><p class="font-medium text-sm text-slate-700 dark:text-slate-200">${t("settings_dark_mode")}</p><p class="text-xs text-slate-500">${t("settings_dark_desc")}</p></div>
          <button onclick="toggleTheme()" class="relative w-12 h-6 rounded-full transition-colors ${state.settings.theme==='dark'?'bg-primary':'bg-slate-200'}">
            <div class="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${state.settings.theme==='dark'?'translate-x-6':'translate-x-0.5'}"></div>
          </button>
        </div>
      </div>

      <!-- Language -->
      <div class="stat-card">
        <h3 class="font-semibold text-slate-700 dark:text-slate-200 mb-4">${t("settings_lang")}</h3>
        <div>
          <label class="form-label">${t("settings_lang_label")}</label>
          ${buildLangSelectorHTML("settingsLangSelect")}
        </div>
      </div>

      <!-- Pomodoro settings -->
      <div class="stat-card">
        <h3 class="font-semibold text-slate-700 dark:text-slate-200 mb-4">${t("settings_pomodoro")}</h3>
        <div class="grid grid-cols-3 gap-3">
          <div><label class="form-label">${t("settings_pomo_work")}</label><input type="number" class="form-input" value="${state.pomodoro.workMin}" min="1" max="60" onchange="state.pomodoro.workMin=+this.value;saveState()"/></div>
          <div><label class="form-label">${t("settings_pomo_break")}</label><input type="number" class="form-input" value="${state.pomodoro.breakMin}" min="1" max="30" onchange="state.pomodoro.breakMin=+this.value;saveState()"/></div>
          <div><label class="form-label">${t("settings_pomo_long")}</label><input type="number" class="form-input" value="${state.pomodoro.longBreakMin}" min="1" max="60" onchange="state.pomodoro.longBreakMin=+this.value;saveState()"/></div>
        </div>
      </div>

      <!-- Data -->
      <div class="stat-card">
        <h3 class="font-semibold text-slate-700 dark:text-slate-200 mb-4">${t("settings_data")}</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div><p class="text-sm font-medium text-slate-700 dark:text-slate-200">${t("settings_export")}</p><p class="text-xs text-slate-500">${t("settings_export_desc")}</p></div>
            <button onclick="exportData()" class="btn-secondary text-sm py-2 px-4">${t("btn_export")}</button>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <div><p class="text-sm font-medium text-red-600">${t("settings_clear")}</p><p class="text-xs text-slate-500">${t("settings_clear_desc")}</p></div>
            <button onclick="clearAllData()" class="btn-danger text-sm py-2 px-4">${t("btn_clear")}</button>
          </div>
        </div>
      </div>

      <!-- About -->
      <div class="stat-card bg-primary-50">
        <div class="text-center">
          <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white mx-auto mb-3">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <p class="font-bold text-navy">NoteFlow AI — Smart Notes</p>
          <p class="text-slate-500 text-xs mt-1">${t("settings_about")}</p>
          <p class="text-slate-400 text-xs mt-1">${t("settings_no_account")}</p>
        </div>
      </div>
    </div>
  </div>`;
}

function exportData() {
  const blob = new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = "noteflow-backup.json"; a.click();
  URL.revokeObjectURL(url);
  showToast(t("toast_exported"), "success");
}

function clearAllData() {
  confirmAction(t("confirm_clear_all"), () => {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });
}

/* ============================================================
   14. MODAL / DIALOG / TOAST HELPERS
   ============================================================ */

function openModal(title, body) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

let _confirmCallback = null;

function confirmAction(message, callback) {
  document.getElementById("confirmMessage").textContent = message;
  _confirmCallback = callback;
  document.getElementById("confirmDialog").classList.remove("hidden");
}

document.getElementById("confirmOkBtn").addEventListener("click", () => {
  document.getElementById("confirmDialog").classList.add("hidden");
  if (_confirmCallback) { _confirmCallback(); _confirmCallback=null; }
});

function closeConfirm() {
  document.getElementById("confirmDialog").classList.add("hidden");
  _confirmCallback = null;
}

function showToast(message, type="info") {
  const container = document.getElementById("toastContainer");
  const icons = {
    success:`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
    error:  `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
    info:   `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0-4h.01"/></svg>`,
    warning:`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  };
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type]||icons.info}<span>${escHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function showQuickAdd() { document.getElementById("quickAddMenu").classList.remove("hidden"); }
function closeQuickAdd(){ document.getElementById("quickAddMenu").classList.add("hidden"); }

/* ============================================================
   15. GLOBAL SEARCH
   ============================================================ */

document.getElementById("globalSearch").addEventListener("input", function() {
  const q = this.value.trim().toLowerCase();
  if (!q) return;
  // If on notes page, update search
  if (currentPage==="notes") { notesSearch=q; notes(); return; }
  if (currentPage==="tasks") { tasksSearch=q; tasks(); return; }
  // Otherwise open notes with search
  notesSearch = q;
  navigateTo("notes");
});


/* ============================================================
   17. STUDY MODE — Full Feature Module
   ============================================================
   Data structures stored in state.study:
     studySets[]  — { id, name, noteIds[], cards[], created_at }
     cards[]      — { id, setId, front, back, mastered }
     sessions[]   — { id, setId, mode, duration, cardsReviewed, score, date }
     progress     — { totalSessions, totalCards, totalQuizzes, totalScore }
   ============================================================ */

// ── State initialisation (merged into global state on load) ──────────────
function ensureStudyState() {
  if (!state.study) {
    state.study = { studySets: [], sessions: [], progress: { totalSessions:0, totalCards:0, totalQuizzes:0, totalScore:0 } };
  }
  if (!state.study.studySets)  state.study.studySets  = [];
  if (!state.study.sessions)   state.study.sessions   = [];
  if (!state.study.progress)   state.study.progress   = { totalSessions:0, totalCards:0, totalQuizzes:0, totalScore:0 };
}

// ── Active session timer state ───────────────────────────────────────────
let studySession = { active:false, interval:null, elapsed:0, cardsReviewed:0, quizScore:null };

// ── Utility: generate quiz questions from note content ───────────────────
function generateQuizQuestions(noteIds, type, count, difficulty) {
  const notes = state.notes.filter(n => noteIds.includes(n.id));
  const questions = [];
  // Build a pool of sentence/keyword pairs from note content
  notes.forEach(n => {
    const sentences = (n.content || "").split(/[\n.!?]+/).map(s => s.trim()).filter(s => s.length > 20);
    const title = n.title;
    sentences.forEach(sentence => {
      if (type === "mc" || type === "sa") {
        // Extract a key term (first capitalised word or the title)
        const words = sentence.split(" ").filter(w => w.length > 3);
        if (words.length < 4) return;
        const termIdx = Math.floor(Math.random() * Math.min(words.length, 3));
        const term = words[termIdx];
        questions.push({
          q: sentence.replace(term, "___"),
          correct: term,
          source: title,
          type: type === "sa" ? "sa" : "mc",
          explanation: `From: "${escHtml(title)}"`
        });
      } else if (type === "tf") {
        questions.push({
          q: sentence,
          correct: "true",
          source: title,
          type: "tf",
          explanation: `From: "${escHtml(title)}"`
        });
      }
    });
  });

  // If not enough real questions, add title-based ones
  notes.forEach(n => {
    if (questions.length < count * 2) {
      if (type === "tf") {
        questions.push({ q: `The note "${escHtml(n.title)}" exists in your notes.`, correct:"true", source:n.title, type:"tf", explanation:`Source note: "${escHtml(n.title)}"` });
      } else {
        questions.push({ q: `What is the main topic of the note "${escHtml(n.title)}"?`, correct:n.title, source:n.title, type:type==="sa"?"sa":"mc", explanation:`The note is titled: "${escHtml(n.title)}"` });
      }
    }
  });

  // Add distractor options for MC
  if (type === "mc") {
    questions.forEach(q => {
      const pool = notes.map(n => n.title).filter(v => v !== q.correct);
      const distractors = [];
      while (distractors.length < 3 && pool.length > 0) {
        const idx = Math.floor(Math.random() * pool.length);
        distractors.push(pool.splice(idx, 1)[0]);
      }
      while (distractors.length < 3) distractors.push(`Option ${distractors.length + 1}`);
      const options = [q.correct, ...distractors].sort(() => Math.random() - 0.5);
      q.options = options;
    });
  }

  // Shuffle and slice
  const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, Math.max(1, count));
  return shuffled;
}

// ── STUDY DASHBOARD ──────────────────────────────────────────────────────
function study() {
  ensureStudyState();
  const pc = document.getElementById("pageContent");
  const sets = state.study.studySets;
  const prog = state.study.progress;
  const sessions = state.study.sessions;
  const todayStr = today();
  const upcomingSessions = state.events.filter(e => e.category === "study" && e.date >= todayStr).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3);
  // Cards needing review (not mastered across all sets)
  const reviewCards = sets.flatMap(s => (s.cards||[]).filter(c => !c.mastered));

  pc.innerHTML = `
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="section-header mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 class="section-title text-xl">${t("study_title")}</h2>
        <p class="text-slate-500 text-sm mt-0.5">${t("study_subtitle")}</p>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button onclick="openStudyNoteSelector()" class="btn-primary text-sm py-2 px-4">${t("study_btn_start")}</button>
        <button onclick="openCreateSetModal()" class="btn-secondary text-sm py-2 px-4">${t("study_btn_flashcard")}</button>
        <button onclick="openQuizSetup()" class="btn-secondary text-sm py-2 px-4">${t("study_btn_quiz")}</button>
      </div>
    </div>

    <!-- Progress Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div class="stat-card text-center">
        <p class="text-2xl font-bold text-primary">${prog.totalSessions}</p>
        <p class="text-xs text-slate-500 mt-1">${t("study_stat_sessions")}</p>
      </div>
      <div class="stat-card text-center">
        <p class="text-2xl font-bold text-accent">${prog.totalCards}</p>
        <p class="text-xs text-slate-500 mt-1">${t("study_stat_cards")}</p>
      </div>
      <div class="stat-card text-center">
        <p class="text-2xl font-bold text-green-600">${prog.totalQuizzes}</p>
        <p class="text-xs text-slate-500 mt-1">${t("study_stat_quizzes")}</p>
      </div>
      <div class="stat-card text-center">
        <p class="text-2xl font-bold text-purple-600">${prog.totalQuizzes>0?Math.round(prog.totalScore/prog.totalQuizzes)+"%":"—"}</p>
        <p class="text-xs text-slate-500 mt-1">${t("study_stat_avg")}</p>
      </div>
    </div>

    ${sets.length === 0 ? `
    <!-- Empty state -->
    <div class="stat-card">
      <div class="empty-state py-10">
        <svg class="w-14 h-14 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
        <p class="font-semibold text-slate-500 mb-1">${t("study_empty_title")}</p>
        <p class="text-slate-400 text-sm">${t("study_empty_desc")}</p>
        <button onclick="openStudyNoteSelector()" class="btn-primary mt-4 text-sm px-5 py-2">${t("study_btn_start")}</button>
      </div>
    </div>` : `
    <!-- Study Sets -->
    <div class="mb-6">
      <h3 class="font-semibold text-slate-700 dark:text-slate-200 mb-3 text-sm uppercase tracking-wide">${t("study_sets")}</h3>
      <div class="grid sm:grid-cols-2 gap-3">
        ${sets.map(s => {
          const cards = s.cards || [];
          const mastered = cards.filter(c=>c.mastered).length;
          const pct = cards.length ? Math.round(mastered/cards.length*100) : 0;
          return `
          <div class="stat-card hover:border-primary transition cursor-pointer" onclick="openFlashcardView('${s.id}')">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-slate-700 dark:text-slate-200 truncate">${escHtml(s.name)}</p>
                <p class="text-xs text-slate-400 mt-0.5">${cards.length} cards · ${mastered} ${t("fc_mastered").replace(" ✓","")}</p>
              </div>
              <div class="flex gap-1 ml-2">
                <button onclick="event.stopPropagation();openFlashcardView('${s.id}')" class="btn-icon text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg p-1" title="${t("study_btn_start")}">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </button>
                <button onclick="event.stopPropagation();renameStudySet('${s.id}')" class="btn-icon text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg p-1" title="${t("study_rename_set")}">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button onclick="event.stopPropagation();deleteStudySet('${s.id}')" class="btn-icon text-slate-300 hover:text-red-400 hover:bg-red-50 rounded-lg p-1" title="${t("btn_delete")}">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-1.5 mt-2">
              <div class="bg-primary h-1.5 rounded-full transition-all" style="width:${pct}%"></div>
            </div>
            <p class="text-xs text-slate-400 mt-1">${pct}% ${t("fc_mastered").replace(" ✓","")}</p>
          </div>`;
        }).join("")}
      </div>
    </div>`}

    ${upcomingSessions.length > 0 ? `
    <!-- Upcoming Sessions -->
    <div class="stat-card mb-6">
      <h3 class="font-semibold text-slate-700 dark:text-slate-200 mb-3">${t("study_upcoming")}</h3>
      <div class="space-y-2">
        ${upcomingSessions.map(e=>`
        <div class="flex items-center gap-3 text-sm">
          <span class="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
          <span class="flex-1 text-slate-600">${escHtml(e.title)}</span>
          <span class="text-xs text-slate-400">${formatDateShort(e.date)} ${e.start_time}</span>
        </div>`).join("")}
      </div>
    </div>` : ""}

    ${reviewCards.length > 0 ? `
    <!-- Review Queue -->
    <div class="stat-card mb-6">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-slate-700 dark:text-slate-200">${t("study_review")} (${reviewCards.length})</h3>
      </div>
      <div class="space-y-2">
        ${reviewCards.slice(0,5).map(c=>`
        <div class="flex items-center gap-3 p-2 bg-orange-50 rounded-lg text-sm">
          <span class="w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
          <span class="flex-1 text-slate-600 truncate">${escHtml(c.front)}</span>
          <span class="text-xs text-accent font-medium">${t("fc_practice")}</span>
        </div>`).join("")}
        ${reviewCards.length > 5 ? `<p class="text-xs text-slate-400 mt-1">+${reviewCards.length-5} more</p>` : ""}
      </div>
    </div>` : ""}

    <!-- Recent Sessions History -->
    ${sessions.length > 0 ? `
    <div class="stat-card">
      <h3 class="font-semibold text-slate-700 dark:text-slate-200 mb-3">${t("study_history_title")}</h3>
      <div class="space-y-2">
        ${[...sessions].reverse().slice(0,5).map(s=>`
        <div class="flex items-center justify-between text-sm py-1.5 border-b border-slate-50 last:border-0">
          <div>
            <p class="font-medium text-slate-700">${escHtml(s.setName||"Session")}</p>
            <p class="text-xs text-slate-400">${formatDate(s.date)} · ${s.duration}${t("session_min")}</p>
          </div>
          <div class="text-right">
            ${s.score!=null?`<p class="font-semibold text-primary text-sm">${s.score}%</p>`:``}
            <p class="text-xs text-slate-400">${s.cardsReviewed} ${t("study_stat_cards").toLowerCase()}</p>
          </div>
        </div>`).join("")}
      </div>
    </div>` : ""}
  </div>`;
}

// ── NOTE SELECTOR MODAL ──────────────────────────────────────────────────
function openStudyNoteSelector() {
  ensureStudyState();
  const renderList = (query="") => {
    const filtered = state.notes.filter(n =>
      !query || n.title.toLowerCase().includes(query.toLowerCase()) || (n.folder||"").toLowerCase().includes(query.toLowerCase())
    );
    return filtered.length === 0 ? `<p class="text-slate-400 text-sm text-center py-4">${t("study_no_notes")}</p>` :
      filtered.map(n => `
      <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-primary hover:bg-primary-50 cursor-pointer transition group">
        <input type="checkbox" class="note-pick mt-0.5 w-4 h-4 accent-primary" value="${n.id}"/>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-slate-700 text-sm truncate group-hover:text-primary">${escHtml(n.title)}</p>
          <p class="text-xs text-slate-400">${escHtml(n.folder||"—")} ${n.tags.length?'· '+n.tags.slice(0,2).map(escHtml).join(", "):""}</p>
        </div>
      </label>`).join("");
  };

  openModal(t("study_select_notes_title"), `
  <div class="space-y-4">
    <p class="text-slate-500 text-sm">${t("study_select_notes_desc")}</p>
    <input id="notePickSearch" oninput="document.getElementById('notePickList').innerHTML=renderNotePickList(this.value)"
      class="form-input text-sm" placeholder="${t("study_search_notes")}"/>
    <div id="notePickList" class="space-y-2 max-h-64 overflow-y-auto pr-1">${renderList()}</div>
    <div class="space-y-2 pt-2 border-t border-slate-100">
      <label class="form-label">${t("study_set_name_label")}</label>
      <input id="studySetNameInput" class="form-input text-sm" placeholder="${t("study_set_name_ph")}"/>
    </div>
    <div class="flex gap-2 justify-end pt-1">
      <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
      <button type="button" onclick="createStudySetFromSelected()" class="btn-primary text-sm py-2 px-4">${t("study_btn_create_set")}</button>
    </div>
  </div>`);
}

// Exposed to inline oninput handler
function renderNotePickList(query) {
  const filtered = state.notes.filter(n =>
    !query || n.title.toLowerCase().includes(query.toLowerCase()) || (n.folder||"").toLowerCase().includes(query.toLowerCase())
  );
  return filtered.length === 0 ? `<p class="text-slate-400 text-sm text-center py-4">${t("study_no_notes")}</p>` :
    filtered.map(n => `
    <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-primary hover:bg-primary-50 cursor-pointer transition group">
      <input type="checkbox" class="note-pick mt-0.5 w-4 h-4 accent-primary" value="${n.id}"/>
      <div class="flex-1 min-w-0">
        <p class="font-medium text-slate-700 text-sm truncate group-hover:text-primary">${escHtml(n.title)}</p>
        <p class="text-xs text-slate-400">${escHtml(n.folder||"—")}</p>
      </div>
    </label>`).join("");
}

function createStudySetFromSelected() {
  const picks = [...document.querySelectorAll(".note-pick:checked")].map(cb => cb.value);
  const name  = document.getElementById("studySetNameInput")?.value.trim();
  if (picks.length === 0) return showToast(t("study_select_notes_desc"), "error");
  if (!name)              return showToast(t("study_set_name_label") + " ?", "error");
  ensureStudyState();
  const set = { id:uid(), name, noteIds:picks, cards:[], created_at:today() };
  state.study.studySets.push(set);
  saveState();
  closeModal();
  showToast(t("toast_study_set_created"), "success");
  openFlashcardView(set.id);
}

function openCreateSetModal() {
  ensureStudyState();
  openModal(t("study_btn_flashcard"), `
  <div class="space-y-4">
    <div>
      <label class="form-label">${t("study_set_name_label")}</label>
      <input id="newSetName" class="form-input text-sm" placeholder="${t("study_set_name_ph")}"/>
    </div>
    <div class="flex gap-2 justify-end pt-1 border-t border-slate-100">
      <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
      <button type="button" onclick="createEmptyStudySet()" class="btn-primary text-sm py-2 px-4">${t("study_btn_create_set")}</button>
    </div>
  </div>`);
}

function createEmptyStudySet() {
  const name = document.getElementById("newSetName")?.value.trim();
  if (!name) return showToast(t("study_set_name_label")+" ?","error");
  ensureStudyState();
  const set = { id:uid(), name, noteIds:[], cards:[], created_at:today() };
  state.study.studySets.push(set);
  saveState();
  closeModal();
  showToast(t("toast_study_set_created"),"success");
  openFlashcardView(set.id);
}

function deleteStudySet(id) {
  confirmAction(t("confirm_delete_study_set"), () => {
    state.study.studySets = state.study.studySets.filter(s => s.id !== id);
    saveState();
    showToast(t("toast_study_set_deleted"), "success");
    navigateTo("study");
  });
}

function renameStudySet(id) {
  ensureStudyState();
  const set = state.study.studySets.find(s => s.id === id);
  if (!set) return;
  openModal(t("study_rename_set"), `
  <div class="space-y-4">
    <div>
      <label class="form-label">${t("study_set_name_label")}</label>
      <input id="renameSetInput" class="form-input" value="${escHtml(set.name)}" placeholder="${t("study_rename_ph")}" maxlength="80"/>
    </div>
    <div class="flex gap-2 justify-end pt-2 border-t border-slate-100">
      <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
      <button type="button" onclick="saveRenameStudySet('${id}')" class="btn-primary text-sm py-2 px-4">${t("btn_save")}</button>
    </div>
  </div>`);
  // Select all text for quick editing
  setTimeout(() => {
    const inp = document.getElementById("renameSetInput");
    if (inp) { inp.focus(); inp.select(); }
  }, 50);
}

function saveRenameStudySet(id) {
  const newName = document.getElementById("renameSetInput")?.value.trim();
  if (!newName) return;
  ensureStudyState();
  const set = state.study.studySets.find(s => s.id === id);
  if (!set) return;
  set.name = newName;
  saveState();
  closeModal();
  showToast(t("toast_study_set_renamed"), "success");
  // Refresh: if on flashcard view, re-render it; otherwise refresh study dashboard
  if (currentPage === "study") {
    if (fcState.setId === id) {
      renderFlashcardPage(document.getElementById("pageContent"), set);
    } else {
      study();
    }
  }
}

function deleteFlashcardCard(cardId, setId) {
  confirmAction(t("confirm_delete_card"), () => {
    ensureStudyState();
    const set = state.study.studySets.find(s => s.id === setId);
    if (!set) return;
    set.cards = set.cards.filter(c => c.id !== cardId);
    // Sync shuffled array and fix index
    fcState.shuffled = fcState.shuffled.filter(c => c.id !== cardId);
    fcState.idx = Math.min(fcState.idx, Math.max(0, fcState.shuffled.length - 1));
    fcState.flipped = false;
    saveState();
    showToast(t("toast_study_card_deleted"), "success");
    renderFlashcardPage(document.getElementById("pageContent"), set);
  });
}

// ── FLASHCARD VIEW ───────────────────────────────────────────────────────
let fcState = { setId:null, idx:0, flipped:false, shuffled:[], showAddForm:false };

function openFlashcardView(setId) {
  ensureStudyState();
  const set = state.study.studySets.find(s => s.id === setId);
  if (!set) return;
  fcState = { setId, idx:0, flipped:false, shuffled:[...(set.cards||[])], showAddForm:false };
  navigateTo("study"); // keep current page = study
  const pc = document.getElementById("pageContent");
  renderFlashcardPage(pc, set);
}

function renderFlashcardPage(pc, set) {
  const cards = fcState.shuffled;
  const idx   = fcState.idx;
  const card  = cards[idx];
  const total = cards.length;
  const mastered  = cards.filter(c=>c.mastered).length;

  pc.innerHTML = `
  <div class="max-w-2xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button onclick="navigateTo('study')" class="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <div class="flex-1 min-w-0">
        <h2 class="font-bold text-navy text-lg truncate">${escHtml(set.name)}</h2>
        <p class="text-xs text-slate-400">${t("fc_title")} · ${mastered}/${total} ${t("fc_mastered").replace(" ✓","")}</p>
      </div>
      <!-- Set actions -->
      <div class="flex gap-1.5 items-center">
        <button onclick="addFlashcard('${set.id}')" class="btn-secondary text-sm py-1.5 px-3">${t("fc_add")}</button>
        <button onclick="renameStudySet('${set.id}')" class="p-2 rounded-xl hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition" title="${t("study_rename_set")}">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        </button>
        <button onclick="deleteStudySet('${set.id}')" class="p-2 rounded-xl hover:bg-red-50 text-slate-300 hover:text-red-500 transition" title="${t("btn_delete")}">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    </div>

    ${total === 0 ? `
    <div class="stat-card">
      <div class="empty-state py-10">
        <p class="text-slate-400 text-sm mb-4">${t("fc_empty")}</p>
        <button onclick="addFlashcard('${set.id}')" class="btn-primary text-sm px-5 py-2">${t("fc_add_manual")}</button>
      </div>
    </div>` : `
    <!-- Flashcard -->
    <div class="stat-card mb-4">
      <!-- Counter -->
      <p class="text-center text-xs text-slate-400 mb-4">${idx+1} ${t("fc_of")} ${total}</p>

      <!-- Card (flip) -->
      <div id="fcCard" onclick="flipCard('${set.id}')"
        class="w-full min-h-[200px] flex flex-col items-center justify-center text-center p-8 rounded-2xl cursor-pointer select-none transition-all duration-300 ${fcState.flipped?'bg-primary text-white':'bg-slate-50 border-2 border-slate-200 hover:border-primary'}"
        title="${t('fc_flip')}">
        <p class="text-xs font-semibold uppercase tracking-wide mb-3 ${fcState.flipped?'text-blue-200':'text-slate-400'}">${fcState.flipped?t("fc_back"):t("fc_front")}</p>
        <p class="text-lg font-semibold leading-relaxed">${escHtml(fcState.flipped?(card.back||""):(card.front||""))}</p>
        <p class="text-xs mt-4 ${fcState.flipped?'text-blue-200':'text-slate-300'}">${t("fc_flip")} →</p>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between mt-5">
        <button onclick="fcNav(-1,'${set.id}')" class="btn-secondary text-sm py-2 px-4" ${idx===0?"disabled":""}>← ${t("fc_prev")}</button>
        <div class="flex gap-2">
          ${fcState.flipped ? `
          <button onclick="markCard('${card.id}','${set.id}',true)"  class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition">${t("fc_mastered")}</button>
          <button onclick="markCard('${card.id}','${set.id}',false)" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-100 text-accent hover:bg-orange-200 transition">${t("fc_practice")}</button>
          ` : `<button onclick="flipCard('${set.id}')" class="btn-primary text-sm px-5">${t("fc_flip")}</button>`}
        </div>
        <button onclick="fcNav(1,'${set.id}')" class="btn-secondary text-sm py-2 px-4" ${idx>=total-1?"disabled":""}>
          ${t("fc_next")} →
        </button>
      </div>
    </div>

    <!-- Shuffle + progress bar -->
    <div class="flex items-center justify-between mb-4">
      <button onclick="shuffleCards('${set.id}')" class="text-sm text-slate-500 hover:text-primary transition flex items-center gap-1.5">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5M20 4l-4 4-4-4M4 20l4-4 4 4"/></svg>
        ${t("fc_shuffle")}
      </button>
      <div class="flex-1 mx-4">
        <div class="w-full bg-slate-100 rounded-full h-2">
          <div class="bg-primary h-2 rounded-full transition-all" style="width:${total?Math.round((idx+1)/total*100):0}%"></div>
        </div>
      </div>
      <span class="text-xs text-slate-400">${idx+1}/${total}</span>
    </div>

    <!-- Card list (mini) -->
    <div class="stat-card">
      <h4 class="font-semibold text-slate-600 text-sm mb-3">${t("fc_title")} (${total})</h4>
      <div class="space-y-1.5 max-h-48 overflow-y-auto">
        ${cards.map((c,i)=>`
        <div class="flex items-center gap-2 text-xs p-1.5 rounded-lg hover:bg-slate-50 ${i===idx?'bg-primary-50 border border-primary/20':''}">
          <span class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold cursor-pointer ${c.mastered?'bg-green-500 text-white':'bg-slate-200 text-slate-500'}" onclick="fcJump(${i},'${set.id}')">${i+1}</span>
          <span class="flex-1 truncate text-slate-600 cursor-pointer" onclick="fcJump(${i},'${set.id}')">${escHtml(c.front)}</span>
          <span class="${c.mastered?'text-green-500':'text-orange-400'}">${c.mastered?"✓":"○"}</span>
          <button onclick="deleteFlashcardCard('${c.id}','${set.id}')" class="btn-icon text-slate-200 hover:text-red-400 flex-shrink-0 p-0.5" title="${t("btn_delete")}">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>`).join("")}
      </div>
    </div>`}

    <!-- Start Session Button -->
    ${total>0?`
    <div class="mt-4 flex gap-2 justify-center">
      <button onclick="openSessionSetup('${set.id}','fc')" class="btn-primary text-sm px-6 py-2.5">${t("session_btn_start")}</button>
      <button onclick="openQuizSetupForSet('${set.id}')" class="btn-secondary text-sm px-4 py-2.5">${t("quiz_generate")}</button>
    </div>`:""}
  </div>`;
}

function flipCard(setId) {
  fcState.flipped = !fcState.flipped;
  const set = state.study.studySets.find(s=>s.id===setId);
  if (set) renderFlashcardPage(document.getElementById("pageContent"), set);
}

function fcNav(dir, setId) {
  fcState.idx = Math.max(0, Math.min(fcState.shuffled.length-1, fcState.idx+dir));
  fcState.flipped = false;
  const set = state.study.studySets.find(s=>s.id===setId);
  if (set) renderFlashcardPage(document.getElementById("pageContent"), set);
}

function fcJump(idx, setId) {
  fcState.idx = idx;
  fcState.flipped = false;
  const set = state.study.studySets.find(s=>s.id===setId);
  if (set) renderFlashcardPage(document.getElementById("pageContent"), set);
}

function shuffleCards(setId) {
  fcState.shuffled = fcState.shuffled.sort(()=>Math.random()-0.5);
  fcState.idx = 0; fcState.flipped = false;
  const set = state.study.studySets.find(s=>s.id===setId);
  if (set) renderFlashcardPage(document.getElementById("pageContent"), set);
}

function markCard(cardId, setId, mastered) {
  ensureStudyState();
  const set = state.study.studySets.find(s=>s.id===setId);
  if (!set) return;
  const card = set.cards.find(c=>c.id===cardId);
  if (card) card.mastered = mastered;
  // sync shuffled copy
  const sc = fcState.shuffled.find(c=>c.id===cardId);
  if (sc) sc.mastered = mastered;
  saveState();
  // Auto-advance
  fcState.flipped = false;
  if (fcState.idx < fcState.shuffled.length-1) fcState.idx++;
  renderFlashcardPage(document.getElementById("pageContent"), set);
  // Update progress counter
  state.study.progress.totalCards++;
  saveState();
}

function addFlashcard(setId) {
  openModal(t("fc_add_manual"), `
  <form onsubmit="saveFlashcard(event,'${setId}')">
    <div class="space-y-4">
      <div><label class="form-label">${t("fc_front_label")}</label>
        <textarea id="fcFront" class="form-input min-h-[80px] resize-y" placeholder="${t("fc_front_ph")}" required></textarea></div>
      <div><label class="form-label">${t("fc_back_label")}</label>
        <textarea id="fcBack"  class="form-input min-h-[80px] resize-y" placeholder="${t("fc_back_ph")}"  required></textarea></div>
      <div class="flex gap-2 justify-end pt-2 border-t border-slate-100">
        <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
        <button type="submit" class="btn-primary text-sm py-2 px-4">${t("btn_save")}</button>
      </div>
    </div>
  </form>`);
}

function saveFlashcard(e, setId) {
  e.preventDefault();
  const front = document.getElementById("fcFront").value.trim();
  const back  = document.getElementById("fcBack").value.trim();
  if (!front || !back) return;
  ensureStudyState();
  const set = state.study.studySets.find(s=>s.id===setId);
  if (!set) return;
  const card = { id:uid(), setId, front, back, mastered:false };
  set.cards.push(card);
  fcState.shuffled.push(card);
  saveState();
  closeModal();
  showToast(t("toast_study_card_added"), "success");
  renderFlashcardPage(document.getElementById("pageContent"), set);
}

// ── QUIZ SETUP & RUNNER ──────────────────────────────────────────────────
let quizState = { questions:[], idx:0, answers:[], submitted:false, setId:null };

function openQuizSetup() {
  ensureStudyState();
  const sets = state.study.studySets;
  const setOptions = sets.length > 0
    ? sets.map(s=>`<option value="${s.id}">${escHtml(s.name)}</option>`).join("")
    : `<option value="">${t("study_empty_title")}</option>`;
  const noteOptions = state.notes.map(n=>`<option value="${n.id}">${escHtml(n.title)}</option>`).join("");

  openModal(t("quiz_generate"), `
  <div class="space-y-4">
    <div>
      <label class="form-label">${t("quiz_source")}</label>
      <select id="quizSource" class="form-input text-sm">
        <optgroup label="${t("study_sets")}">${setOptions}</optgroup>
        <optgroup label="${t("nav_notes")}">${noteOptions}</optgroup>
      </select>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="form-label">${t("quiz_type")}</label>
        <select id="quizType" class="form-input text-sm">
          <option value="mc">${t("quiz_type_mc")}</option>
          <option value="tf">${t("quiz_type_tf")}</option>
          <option value="sa">${t("quiz_type_sa")}</option>
        </select>
      </div>
      <div>
        <label class="form-label">${t("quiz_count")}</label>
        <select id="quizCount" class="form-input text-sm">
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
    <div>
      <label class="form-label">${t("quiz_difficulty")}</label>
      <div class="flex gap-2">
        <button type="button" onclick="setQuizDiff(this,'easy')"   data-diff="easy"   class="diff-btn active-diff flex-1 py-2 rounded-xl text-xs font-semibold border-2 border-primary bg-primary text-white transition">${t("quiz_diff_easy")}</button>
        <button type="button" onclick="setQuizDiff(this,'medium')" data-diff="medium" class="diff-btn flex-1 py-2 rounded-xl text-xs font-semibold border-2 border-slate-200 text-slate-600 transition">${t("quiz_diff_medium")}</button>
        <button type="button" onclick="setQuizDiff(this,'hard')"   data-diff="hard"   class="diff-btn flex-1 py-2 rounded-xl text-xs font-semibold border-2 border-slate-200 text-slate-600 transition">${t("quiz_diff_hard")}</button>
      </div>
      <input type="hidden" id="quizDiff" value="easy"/>
    </div>
    <div class="flex gap-2 justify-end pt-2 border-t border-slate-100">
      <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
      <button type="button" onclick="startQuiz()" class="btn-primary text-sm py-2 px-4">${t("quiz_btn_start")}</button>
    </div>
  </div>`);
}

function setQuizDiff(btn, diff) {
  document.querySelectorAll(".diff-btn").forEach(b=>{b.classList.remove("active-diff","border-primary","bg-primary","text-white");b.classList.add("border-slate-200","text-slate-600");});
  btn.classList.add("active-diff","border-primary","bg-primary","text-white");
  btn.classList.remove("border-slate-200","text-slate-600");
  document.getElementById("quizDiff").value = diff;
}

function openQuizSetupForSet(setId) {
  closeModal();
  openQuizSetup();
  setTimeout(()=>{ const sel=document.getElementById("quizSource"); if(sel) sel.value=setId; },50);
}

function startQuiz() {
  const sourceId  = document.getElementById("quizSource").value;
  const type      = document.getElementById("quizType").value;
  const count     = parseInt(document.getElementById("quizCount").value,10);

  ensureStudyState();
  let noteIds = [];
  const set = state.study.studySets.find(s=>s.id===sourceId);
  if (set) {
    noteIds = set.noteIds;
    // Also build questions from set's own cards if available
    if (set.cards && set.cards.length > 0) {
      const cardQs = set.cards.map(c => ({
        q:c.front, correct:c.back, source:set.name,
        type: type==="tf"?"tf":type==="sa"?"sa":"mc",
        options: type==="mc"?[c.back,...state.study.studySets.flatMap(s2=>s2.cards).filter(x=>x.id!==c.id).slice(0,3).map(x=>x.back)].sort(()=>Math.random()-0.5):undefined,
        explanation: c.back
      }));
      closeModal();
      quizState = { questions: cardQs.slice(0,count), idx:0, answers:[], submitted:false, setId:set.id };
      renderQuizPage();
      return;
    }
    noteIds = set.noteIds;
  } else {
    // sourceId is a note id
    noteIds = [sourceId];
  }

  const questions = generateQuizQuestions(noteIds, type, count, document.getElementById("quizDiff").value);
  closeModal();
  if (questions.length === 0) return showToast(t("study_no_notes"), "error");
  quizState = { questions, idx:0, answers:[], submitted:false, setId: set?.id||null };
  renderQuizPage();
}

function renderQuizPage() {
  currentPage = "study";
  document.querySelectorAll(".nav-item").forEach(btn=>btn.classList.toggle("active",btn.dataset.page==="study"));
  const pc = document.getElementById("pageContent");
  const { questions, idx, answers, submitted } = quizState;
  const q = questions[idx];
  if (!q) { renderQuizResults(); return; }

  const userAnswer = answers[idx];

  pc.innerHTML = `
  <div class="max-w-2xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button onclick="navigateTo('study')" class="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <div class="flex-1">
        <h2 class="font-bold text-navy">${t("quiz_title")}</h2>
        <p class="text-xs text-slate-400">${idx+1} ${t("quiz_of")} ${questions.length}</p>
      </div>
    </div>

    <!-- Progress -->
    <div class="w-full bg-slate-100 rounded-full h-2 mb-6">
      <div class="bg-primary h-2 rounded-full transition-all" style="width:${Math.round((idx+1)/questions.length*100)}%"></div>
    </div>

    <!-- Question Card -->
    <div class="stat-card mb-4">
      <p class="text-xs text-slate-400 uppercase tracking-wide mb-2">${t("quiz_type_"+q.type)||q.type}</p>
      <p class="font-semibold text-slate-800 dark:text-slate-100 text-base leading-relaxed mb-4">${escHtml(q.q)}</p>

      <!-- Answer area -->
      ${q.type==="mc" ? `
      <div class="space-y-2" id="optionArea">
        ${(q.options||[]).map((opt,i)=>{
          let cls = "w-full text-left p-3 rounded-xl border-2 text-sm font-medium transition ";
          if (submitted) {
            if (opt === q.correct) cls += "border-green-500 bg-green-50 text-green-700";
            else if (opt === userAnswer && opt !== q.correct) cls += "border-red-400 bg-red-50 text-red-700";
            else cls += "border-slate-200 text-slate-400";
          } else {
            cls += opt===userAnswer ? "border-primary bg-primary-50 text-primary" : "border-slate-200 hover:border-primary hover:bg-primary-50 text-slate-700";
          }
          return `<button ${submitted?"disabled":""} onclick="selectMCAnswer(${i})" class="${cls}">${escHtml(opt)}</button>`;
        }).join("")}
      </div>` :
      q.type==="tf" ? `
      <div class="flex gap-3" id="optionArea">
        ${["true","false"].map(v=>{
          let cls = "flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition ";
          if (submitted) {
            if (v===q.correct) cls+="border-green-500 bg-green-50 text-green-700";
            else if (v===userAnswer&&v!==q.correct) cls+="border-red-400 bg-red-50 text-red-700";
            else cls+="border-slate-200 text-slate-400";
          } else {
            cls += v===userAnswer?"border-primary bg-primary-50 text-primary":"border-slate-200 hover:border-primary text-slate-600";
          }
          return `<button ${submitted?"disabled":""} onclick="selectTFAnswer('${v}')" class="${cls}">${v==="true"?"✓ True":"✗ False"}</button>`;
        }).join("")}
      </div>` : `
      <input id="saInput" type="text" class="form-input text-sm ${submitted?(userAnswer?.toLowerCase()===q.correct.toLowerCase()?"border-green-400 bg-green-50":"border-red-400 bg-red-50"):""}"
        placeholder="${t("fc_front_ph")}" value="${escHtml(userAnswer||"")}" ${submitted?"disabled":""}/>`}

      <!-- Feedback (after submit) -->
      ${submitted ? `
      <div class="mt-4 p-3 rounded-xl ${userAnswer?.toLowerCase()===q.correct.toLowerCase()?'bg-green-50 border border-green-200':'bg-red-50 border border-red-200'}">
        <p class="text-sm font-semibold ${userAnswer?.toLowerCase()===q.correct.toLowerCase()?'text-green-700':'text-red-700'}">
          ${userAnswer?.toLowerCase()===q.correct.toLowerCase()?`✓ ${t("quiz_correct")}`:`✗ ${t("quiz_wrong")}`}
        </p>
        <p class="text-xs text-slate-500 mt-1">${t("quiz_correct_answer")} <strong>${escHtml(q.correct)}</strong></p>
        ${q.explanation?`<p class="text-xs text-slate-400 mt-1">${t("quiz_explanation")} ${escHtml(q.explanation)}</p>`:""}
      </div>` : ""}
    </div>

    <!-- Action buttons -->
    <div class="flex gap-3 justify-end">
      ${!submitted ? `<button onclick="submitQuizAnswer()" class="btn-primary text-sm px-6 py-2.5">${t("quiz_submit")}</button>` :
        idx < questions.length-1 ? `<button onclick="nextQuizQuestion()" class="btn-primary text-sm px-6 py-2.5">${t("quiz_next")} →</button>` :
        `<button onclick="renderQuizResults()" class="btn-primary text-sm px-6 py-2.5">${t("quiz_result_title")} →</button>`}
    </div>
  </div>`;
}

function selectMCAnswer(i) {
  const opt = quizState.questions[quizState.idx].options[i];
  quizState.answers[quizState.idx] = opt;
  // Highlight selected option immediately
  document.querySelectorAll("#optionArea button").forEach((btn, bi) => {
    const sel = bi === i;
    btn.classList.toggle("border-primary", sel);
    btn.classList.toggle("bg-primary-50", sel);
    btn.classList.toggle("text-primary", sel);
    btn.classList.toggle("border-slate-200", !sel);
    btn.classList.toggle("text-slate-700", !sel);
  });
}

function selectTFAnswer(v) {
  quizState.answers[quizState.idx] = v;
  // Highlight immediately
  document.querySelectorAll("#optionArea button").forEach(btn=>{
    const isThis = btn.textContent.includes(v==="true"?"True":"False");
    btn.classList.toggle("border-primary",isThis);
    btn.classList.toggle("bg-primary-50",isThis);
    btn.classList.toggle("text-primary",isThis);
    btn.classList.toggle("border-slate-200",!isThis);
    btn.classList.toggle("text-slate-600",!isThis);
  });
}

function submitQuizAnswer() {
  const q = quizState.questions[quizState.idx];
  if (q.type==="sa") {
    quizState.answers[quizState.idx] = document.getElementById("saInput")?.value.trim()||"";
  }
  if (!quizState.answers[quizState.idx]) return showToast(t("err_fields_required"),"error");
  quizState.submitted = true;
  renderQuizPage();
}

function nextQuizQuestion() {
  quizState.idx++;
  quizState.submitted = false;
  renderQuizPage();
}

function renderQuizResults() {
  ensureStudyState();
  const { questions, answers } = quizState;
  let correct = 0;
  questions.forEach((q,i)=>{
    const ans = (answers[i]||"").toLowerCase().trim();
    const cor = (q.correct||"").toLowerCase().trim();
    if (ans===cor||ans.includes(cor)||cor.includes(ans)) correct++;
  });
  const score = questions.length ? Math.round(correct/questions.length*100) : 0;
  const passed = score >= 60;

  // Save to progress
  state.study.progress.totalQuizzes++;
  state.study.progress.totalScore += score;
  const session = { id:uid(), setId:quizState.setId, setName: state.study.studySets.find(s=>s.id===quizState.setId)?.name||t("quiz_title"), mode:"quiz", duration:0, cardsReviewed:questions.length, score, date:today() };
  state.study.sessions.push(session);
  state.study.progress.totalSessions++;
  saveState();

  currentPage = "study";
  const pc = document.getElementById("pageContent");
  pc.innerHTML = `
  <div class="max-w-2xl mx-auto">
    <div class="stat-card text-center mb-6">
      <div class="w-20 h-20 rounded-full ${passed?"bg-green-100 text-green-600":"bg-orange-100 text-accent"} flex items-center justify-center mx-auto mb-4">
        <span class="text-3xl font-bold">${score}%</span>
      </div>
      <h2 class="font-bold text-navy text-xl mb-1">${t("quiz_result_title")}</h2>
      <p class="font-semibold text-lg ${passed?"text-green-600":"text-accent"}">${passed?t("quiz_passed"):t("quiz_failed")}</p>
      <div class="grid grid-cols-3 gap-4 mt-6 text-center">
        <div><p class="text-2xl font-bold text-primary">${correct}</p><p class="text-xs text-slate-500">${t("quiz_correct")}</p></div>
        <div><p class="text-2xl font-bold text-red-500">${questions.length-correct}</p><p class="text-xs text-slate-500">${t("quiz_wrong")}</p></div>
        <div><p class="text-2xl font-bold text-slate-600">${questions.length}</p><p class="text-xs text-slate-500">${t("quiz_count")}</p></div>
      </div>
    </div>

    <!-- Review wrong answers -->
    ${questions.some((_,i)=>{const a=(answers[i]||"").toLowerCase().trim(),c=(questions[i].correct||"").toLowerCase().trim();return a!==c&&!a.includes(c)&&!c.includes(a);})?`
    <div class="stat-card mb-4">
      <h3 class="font-semibold text-slate-700 mb-3">${t("quiz_review_title")}</h3>
      <div class="space-y-3">
      ${questions.map((q,i)=>{
        const ans=(answers[i]||"").toLowerCase().trim(), cor=(q.correct||"").toLowerCase().trim();
        const isWrong = ans!==cor&&!ans.includes(cor)&&!cor.includes(ans);
        if (!isWrong) return "";
        return `
        <div class="p-3 rounded-xl bg-red-50 border border-red-100">
          <p class="text-sm font-medium text-slate-700 mb-1">${escHtml(q.q)}</p>
          <p class="text-xs text-red-600">${t("quiz_your_answer")} ${escHtml(answers[i]||"—")}</p>
          <p class="text-xs text-green-700">${t("quiz_correct_answer")} ${escHtml(q.correct)}</p>
          ${q.explanation?`<p class="text-xs text-slate-400 mt-1">${t("quiz_explanation")} ${escHtml(q.explanation)}</p>`:""}
        </div>`;
      }).join("")}
      </div>
    </div>`:""}

    <div class="flex gap-3 flex-wrap justify-center">
      <button onclick="startQuizRetry()" class="btn-secondary text-sm py-2.5 px-6">${t("quiz_btn_retry")}</button>
      <button onclick="navigateTo('study')" class="btn-primary text-sm py-2.5 px-6">${t("quiz_btn_back")}</button>
    </div>
  </div>`;
}

function startQuizRetry() {
  quizState.idx = 0;
  quizState.answers = [];
  quizState.submitted = false;
  // Shuffle question order
  quizState.questions = quizState.questions.sort(()=>Math.random()-0.5);
  renderQuizPage();
}

// ── STUDY SESSION TIMER ──────────────────────────────────────────────────
function openSessionSetup(setId, mode) {
  const set = state.study.studySets.find(s=>s.id===setId);
  const durations = [10,15,25,45];
  openModal(t("session_title"), `
  <div class="space-y-4">
    <div>
      <label class="form-label">${t("session_duration")}</label>
      <div class="flex gap-2 flex-wrap">
        ${durations.map(d=>`<button type="button" onclick="setSessionDuration(this,${d})" data-dur="${d}" class="dur-btn ${d===25?"border-primary bg-primary text-white":"border-slate-200 text-slate-600"} border-2 rounded-xl px-4 py-2 text-sm font-semibold transition">${d} ${t("session_min")}</button>`).join("")}
      </div>
      <input type="hidden" id="sessionDur" value="25"/>
    </div>
    <p class="text-slate-500 text-sm">${set?escHtml(set.name):"—"} · ${mode==="fc"?t("session_mode_fc"):t("session_mode_quiz")}</p>
    <div class="flex gap-2 justify-end pt-2 border-t border-slate-100">
      <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
      <button type="button" onclick="startStudySession('${setId}','${mode}')" class="btn-primary text-sm py-2 px-4">${t("session_btn_start")}</button>
    </div>
  </div>`);
}

function setSessionDuration(btn, dur) {
  document.querySelectorAll(".dur-btn").forEach(b=>{b.classList.remove("border-primary","bg-primary","text-white");b.classList.add("border-slate-200","text-slate-600");});
  btn.classList.add("border-primary","bg-primary","text-white");
  btn.classList.remove("border-slate-200","text-slate-600");
  document.getElementById("sessionDur").value = dur;
}

function startStudySession(setId, mode) {
  const dur = parseInt(document.getElementById("sessionDur")?.value||25,10);
  closeModal();
  studySession = { active:true, interval:null, elapsed:0, cardsReviewed:0, quizScore:null, setId, mode, totalDur:dur*60 };

  // If flashcard mode — go to flashcard view with timer overlay
  if (mode==="fc") {
    openFlashcardView(setId);
  } else {
    openQuizSetupForSet(setId);
    return;
  }

  // Inject timer overlay
  setTimeout(()=>{
    const pc = document.getElementById("pageContent");
    const timerBar = document.createElement("div");
    timerBar.id = "studyTimerBar";
    timerBar.className = "fixed top-16 left-0 right-0 md:left-64 z-20 bg-primary text-white px-4 py-2 flex items-center gap-4 text-sm shadow";
    timerBar.innerHTML = `
      <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span id="timerDisplay">${dur}:00</span>
      <div class="flex-1 bg-blue-400 rounded-full h-1.5"><div id="timerBar" class="bg-white h-1.5 rounded-full transition-all" style="width:100%"></div></div>
      <button onclick="pauseResumeSession()" id="timerPauseBtn" class="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 font-medium">${t("session_btn_pause")}</button>
      <button onclick="endStudySession()" class="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 font-medium">${t("session_btn_end")}</button>`;
    document.getElementById("appShell").appendChild(timerBar);
    runSessionTimer();
  }, 100);
}

function runSessionTimer() {
  studySession.interval = setInterval(()=>{
    if (!studySession.active) return;
    studySession.elapsed++;
    const remaining = studySession.totalDur - studySession.elapsed;
    const m = Math.floor(remaining/60).toString().padStart(2,"0");
    const s = (remaining%60).toString().padStart(2,"0");
    const disp = document.getElementById("timerDisplay");
    const bar  = document.getElementById("timerBar");
    if (disp) disp.textContent = `${m}:${s}`;
    if (bar)  bar.style.width  = `${Math.max(0,(remaining/studySession.totalDur)*100)}%`;
    if (remaining <= 0) endStudySession();
  },1000);
}

function pauseResumeSession() {
  studySession.active = !studySession.active;
  const btn = document.getElementById("timerPauseBtn");
  if (btn) btn.textContent = studySession.active ? t("session_btn_pause") : t("session_btn_resume");
}

function endStudySession() {
  clearInterval(studySession.interval);
  studySession.active = false;
  const timerBar = document.getElementById("studyTimerBar");
  if (timerBar) timerBar.remove();

  ensureStudyState();
  const set = state.study.studySets.find(s=>s.id===studySession.setId);
  const dur = Math.round(studySession.elapsed/60);
  const session = {
    id:uid(), setId:studySession.setId, setName:set?.name||t("session_title"),
    mode:studySession.mode, duration:Math.max(1,dur),
    cardsReviewed:studySession.cardsReviewed, score:null, date:today()
  };
  state.study.sessions.push(session);
  state.study.progress.totalSessions++;
  state.study.progress.totalCards += studySession.cardsReviewed;
  saveState();
  showToast(t("toast_session_saved"),"success");
  navigateTo("study");
}

// ── SCHEDULE STUDY SESSION IN CALENDAR ───────────────────────────────────
function scheduleStudySession(setId) {
  const set = state.study.studySets.find(s=>s.id===setId);
  openModal(t("study_schedule_title"), `
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-3">
      <div><label class="form-label">${t("study_schedule_date")}</label>
        <input id="schedDate" type="date" class="form-input" value="${today()}"/></div>
      <div><label class="form-label">${t("study_schedule_time")}</label>
        <input id="schedTime" type="time" class="form-input" value="09:00"/></div>
    </div>
    <p class="text-slate-500 text-sm">${set?escHtml(set.name):"—"}</p>
    <div class="flex gap-2 justify-end pt-2 border-t border-slate-100">
      <button type="button" onclick="closeModal()" class="btn-secondary text-sm py-2 px-4">${t("btn_cancel")}</button>
      <button type="button" onclick="saveStudySessionToCalendar('${setId}')" class="btn-primary text-sm py-2 px-4">${t("study_schedule_btn")}</button>
    </div>
  </div>`);
}

function saveStudySessionToCalendar(setId) {
  const date = document.getElementById("schedDate")?.value;
  const time = document.getElementById("schedTime")?.value||"09:00";
  const set  = state.study.studySets.find(s=>s.id===setId);
  if (!date) return showToast(t("err_date_required"),"error");
  const [h,m] = time.split(":").map(Number);
  const endH = String(h+1).padStart(2,"0"), endM = String(m).padStart(2,"0");
  const event = {
    id:uid(), title:`📚 ${set?set.name:t("session_title")}`, desc:t("session_mode_fc"),
    date, start_time:time, end_time:`${endH}:${endM}`, category:"study", linked_note:null, linked_project:null
  };
  state.events.push(event);
  saveState();
  closeModal();
  showToast(t("toast_event_created"),"success");
  navigateTo("study");
}


/* ============================================================
   16. INITIALIZATION
   ============================================================ */

(function init() {
  // Load persisted language FIRST so all t() calls use the correct locale
  if (typeof loadLanguage === "function") loadLanguage();

  loadState();
  // Seed demo data if empty
  if (state.notes.length===0 && state.tasks.length===0) {
    seedDemoData();
  }
  applyTheme();
  updateUserDisplay();
  updateTaskBadge();

  // Render i18n text on landing page and app shell
  if (typeof renderLandingText  === "function") renderLandingText();
  if (typeof renderAppShellText === "function") renderAppShellText();

  // Keyboard shortcut: Escape to close modal
  document.addEventListener("keydown", e => {
    if (e.key==="Escape") {
      closeModal();
      closeConfirm();
      closeQuickAdd();
    }
  });
})();
