/**
 * i18n.js — NoteFlow AI Smart Notes
 * =====================================
 * Internationalization module.
 * Provides:
 *   - TRANSLATIONS dictionary for 6 languages
 *   - t(key, vars)    — translate a key with optional variable interpolation
 *   - setLanguage(code) — switch language and re-render the current page
 *   - formatDate / formatDateShort / daysUntil — locale-aware formatters
 *   - getLocale()     — return the BCP-47 locale string for the active language
 *
 * Supported languages:
 *   id    — Bahasa Indonesia (default)
 *   en    — English
 *   ms    — Bahasa Melayu
 *   es    — Español
 *   fr    — Français
 *   zh-CN — 简体中文
 */

"use strict";

/* ============================================================
   TRANSLATION DICTIONARY
   ============================================================ */

const TRANSLATIONS = {

  /* ── Bahasa Indonesia ──────────────────────────────────── */
  id: {
    // Meta
    lang_name: "Bahasa Indonesia",
    locale: "id-ID",

    // Landing — Navbar
    nav_features:    "Fitur",
    nav_how:         "Cara Kerja",
    nav_about:       "Tentang",
    nav_explore:     "Jelajahi Fitur",
    nav_get_started: "Mulai Sekarang",

    // Landing — Hero
    hero_badge:    "Produktivitas Berbasis AI",
    hero_title1:   "Catatan, Tugas & Waktu —",
    hero_title2:   "Semua di Satu Tempat.",
    hero_desc:     "NoteFlow AI menggabungkan catatan pintar, manajemen tugas, pelacakan tenggat waktu, perencanaan kalender, dan asisten AI — agar Anda bisa fokus pada hal yang penting.",
    hero_cta:      "Mulai Gratis →",
    hero_explore:  "Jelajahi Fitur",

    // Landing — Features section
    features_eyebrow: "Semua yang Anda Butuhkan",
    features_title:   "Fitur Canggih untuk Produktivitas Modern",
    features_desc:    "Semua alat untuk menangkap ide, mengelola tugas, melacak tenggat, dan tetap produktif — terpadu dalam satu ruang kerja.",
    feat_notes_title: "Catatan Pintar",
    feat_notes_desc:  "Tangkap ide, catatan rapat, dan riset dengan folder, tag, pin, dan daftar periksa.",
    feat_tasks_title: "Tugas & Tenggat",
    feat_tasks_desc:  "Buat tugas dengan level prioritas, tanggal jatuh tempo, dan status. Jangan pernah lewatkan tenggat lagi.",
    feat_cal_title:   "Kalender Pintar",
    feat_cal_desc:    "Tampilan bulan, minggu, dan hari. Event dan tenggat tugas ditampilkan bersama dalam satu kalender.",
    feat_ai_title:    "Asisten AI",
    feat_ai_desc:     "Ringkas catatan, ubah menjadi tugas, rencanakan hari Anda, dan dapatkan saran cerdas.",
    feat_proj_title:  "Manajemen Proyek",
    feat_proj_desc:   "Papan Kanban, pelacakan kemajuan, dan linimasa proyek untuk pekerjaan dan studi Anda.",
    feat_focus_title: "Pelacak Produktivitas",
    feat_focus_desc:  "Timer Pomodoro, pelacakan kebiasaan, dan mode fokus untuk mencapai tujuan Anda.",

    // Landing — How It Works
    how_eyebrow: "Proses Sederhana",
    how_title:   "Cara Kerjanya",
    how_s1_title: "Buat Catatan Anda",
    how_s1_desc:  "Tangkap ide, notulen rapat, riset, dan hal-hal penting — dengan folder dan tag.",
    how_s2_title: "Atur Tugas & Tenggat",
    how_s2_desc:  "Ubah catatan menjadi tugas yang dapat dikerjakan, tetapkan prioritas dan tenggat.",
    how_s3_title: "Rencanakan & Tetap Produktif",
    how_s3_desc:  "Gunakan kalender, asisten AI, dan alat fokus untuk merencanakan hari Anda.",

    // Landing — Benefits
    benefits_eyebrow: "Mengapa NoteFlow AI",
    benefits_title1:  "Semua terorganisir.",
    benefits_title2:  "Tidak ada yang terlupakan.",
    ben1_title: "Semua catatan dan tugas di satu tempat",
    ben1_desc:  "Tidak perlu berpindah aplikasi. Semua yang Anda butuhkan tersedia dalam satu tempat.",
    ben2_title: "Tenggat yang benar-benar terlihat",
    ben2_desc:  "Kalender visual dan notifikasi tenggat menjaga Anda tetap selangkah lebih maju.",
    ben3_title: "Perencanaan waktu yang cerdas",
    ben3_desc:  "AI membantu merencanakan hari Anda berdasarkan tugas, tenggat, dan prioritas.",
    ben4_title: "Proyek yang bisa dikelola",
    ben4_desc:  "Papan Kanban dan pelacakan kemajuan untuk proyek kerja, studi, dan freelance.",
    stat_notes: "Catatan dibuat",
    stat_tasks: "Tugas selesai",
    stat_proj:  "Proyek berjalan",
    stat_score: "skor produktivitas minggu ini",

    // Landing — CTA
    cta_title: "Siap mengendalikan produktivitas Anda?",
    cta_desc:  "Bergabung dengan ribuan pengguna yang mengatur catatan, tugas, dan waktu dengan NoteFlow AI.",
    cta_btn:   "Mulai Mengatur Hari Ini →",

    // Landing — Footer
    footer_desc:       "Catatan Pintar untuk era modern. Tangkap, atur, dan jadikan ide Anda tindakan nyata.",
    footer_product:    "Produk",
    footer_features:   "Fitur",
    footer_how:        "Cara Kerja",
    footer_launch:     "Buka Aplikasi",
    footer_usecases:   "Pengguna",
    footer_students:   "Pelajar",
    footer_freelancers:"Freelancer",
    footer_teams:      "Tim",
    footer_info:       "Info",
    footer_local:      "Data tersimpan di browser Anda",
    footer_no_account: "Tanpa akun",
    footer_offline:    "Bekerja offline",
    footer_copy:       "© 2025 NoteFlow AI — Smart Notes. Hak cipta dilindungi. Data tersimpan lokal di browser Anda.",

    // App — Sidebar
    nav_dashboard: "Dasbor",
    nav_notes:     "Catatan Saya",
    nav_tasks:     "Tugas",
    nav_calendar:  "Kalender",
    nav_projects:  "Proyek",
    nav_ai:        "Asisten AI",
    nav_focus:     "Fokus & Kebiasaan",
    nav_settings:  "Pengaturan",
    nav_local_ws:  "Ruang kerja lokal",

    // App — Topbar
    search_placeholder: "Cari catatan & tugas…",
    btn_new:            "Baru",

    // App — Quick Add
    quick_create:    "Buat Cepat",
    quick_note:      "Catatan Baru",
    quick_task:      "Tugas Baru",
    quick_event:     "Acara Baru",
    quick_project:   "Proyek Baru",

    // App — Modal / Confirm / Toast
    confirm_delete_title: "Konfirmasi Hapus",
    btn_cancel:  "Batal",
    btn_delete:  "Hapus",
    btn_save:    "Simpan",
    btn_close:   "Tutup",
    btn_edit:    "Edit",
    btn_add:     "Tambah",
    btn_export:  "Ekspor",
    btn_clear:   "Hapus Semua",
    toast_note_created:   "Catatan dibuat",
    toast_note_updated:   "Catatan diperbarui",
    toast_note_deleted:   "Catatan dihapus",
    toast_task_created:   "Tugas dibuat",
    toast_task_updated:   "Tugas diperbarui",
    toast_task_deleted:   "Tugas dihapus",
    toast_task_done:      "Tugas selesai! 🎉",
    toast_task_reopened:  "Tugas dibuka kembali",
    toast_event_created:  "Acara dibuat",
    toast_event_updated:  "Acara diperbarui",
    toast_event_deleted:  "Acara dihapus",
    toast_project_created:"Proyek dibuat",
    toast_project_updated:"Proyek diperbarui",
    toast_project_deleted:"Proyek dihapus",
    toast_note_pinned:    "Catatan disematkan",
    toast_note_unpinned:  "Catatan tidak disematkan",
    toast_exported:       "Data diekspor",
    toast_habit_added:    "Kebiasaan ditambahkan",
    toast_lang_changed:   "Bahasa diperbarui",
    err_title_required:   "Judul wajib diisi",
    err_fields_required:  "Judul dan isi wajib diisi",
    err_date_required:    "Judul dan tanggal wajib diisi",
    err_project_required: "Nama proyek wajib diisi",

    // Dashboard
    dash_greeting_morning:   "Selamat pagi",
    dash_greeting_afternoon: "Selamat siang",
    dash_greeting_evening:   "Selamat malam",
    dash_events_today:   "{n} acara hari ini",
    dash_active_tasks:   "Tugas Aktif",
    dash_completed:      "Selesai",
    dash_projects:       "Proyek",
    dash_overdue_tasks:  "Tugas Terlambat",
    dash_agenda_title:   "Agenda Hari Ini",
    dash_agenda_empty:   "Tidak ada acara hari ini",
    dash_deadlines_title:"Tenggat Mendatang",
    dash_deadlines_empty:"Tidak ada tenggat mendatang",
    dash_notes_title:    "Catatan Terbaru",
    dash_notes_empty:    "Belum ada catatan",
    dash_proj_title:     "Proyek Aktif",
    dash_proj_empty:     "Belum ada proyek aktif",
    dash_view_calendar:  "Lihat kalender →",
    dash_all_tasks:      "Semua tugas →",
    dash_all_notes:      "Semua catatan →",
    dash_all_projects:   "Semua proyek →",
    dash_notes_count:    "Catatan",
    dash_updated:        "Diperbarui",

    // Notes
    notes_title:      "Catatan Saya",
    notes_new:        "Catatan Baru",
    notes_search:     "Cari catatan…",
    notes_filter_all: "Semua",
    notes_filter_pinned: "📌 Disematkan",
    notes_empty_title:"Catatan tidak ditemukan",
    notes_empty_desc: "Buat catatan baru untuk memulai",
    note_updated:     "Diperbarui",
    note_general:     "Umum",
    note_modal_new:   "Catatan Baru",
    note_modal_edit:  "Edit Catatan",
    note_label_title: "Judul *",
    note_label_folder:"Folder",
    note_label_tags:  "Tag (pisahkan koma)",
    note_label_content:"Isi *",
    note_placeholder_title:  "Judul catatan…",
    note_placeholder_folder: "Kerja, Studi…",
    note_placeholder_tags:   "react, rapat…",
    note_placeholder_content:"Tulis catatan Anda di sini…",
    note_pin_label:   "📌 Sematkan catatan ini",
    note_pin:         "Sematkan",
    note_unpin:       "Lepas sematan",
    confirm_delete_note: "Hapus catatan ini secara permanen?",

    // Tasks
    tasks_title:       "Tugas",
    tasks_new:         "Tugas Baru",
    tasks_search:      "Cari tugas…",
    tasks_sort_deadline: "Urutkan: Tenggat",
    tasks_sort_priority: "Urutkan: Prioritas",
    tasks_sort_newest:   "Urutkan: Terbaru",
    tasks_filter_all:       "Semua",
    tasks_filter_active:    "Aktif",
    tasks_filter_today:     "Hari Ini",
    tasks_filter_overdue:   "Terlambat",
    tasks_filter_completed: "Selesai",
    tasks_empty: "Tugas tidak ditemukan",
    task_modal_new:  "Tugas Baru",
    task_modal_edit: "Edit Tugas",
    task_label_title:   "Judul *",
    task_label_desc:    "Deskripsi",
    task_label_deadline:"Tenggat",
    task_label_priority:"Prioritas",
    task_label_status:  "Status",
    task_label_project: "Tautkan ke Proyek",
    task_placeholder_title: "Judul tugas…",
    task_placeholder_desc:  "Detail opsional…",
    task_no_project: "Tidak ada",
    priority_high:   "Tinggi",
    priority_medium: "Sedang",
    priority_low:    "Rendah",
    status_todo:       "Harus Dikerjakan",
    status_inprogress: "Sedang Dikerjakan",
    status_completed:  "Selesai",
    due_today:      "Jatuh tempo hari ini",
    due_tomorrow:   "Jatuh tempo besok",
    due_in_days:    "Jatuh tempo {n} hari lagi",
    overdue_days:   "Terlambat {n} hari",
    confirm_delete_task: "Hapus tugas ini secara permanen?",

    // Calendar
    cal_title:       "Kalender Pintar",
    cal_new_event:   "Acara Baru",
    cal_today:       "Hari Ini",
    cal_month:       "Bulan",
    cal_week:        "Minggu",
    cal_day:         "Hari",
    cal_days_short:  ["Min","Sen","Sel","Rab","Kam","Jum","Sab"],
    cal_nothing:     "Tidak ada jadwal hari ini",
    cal_add_event:   "Tambah Acara",
    cal_tasks_due:   "Tugas Jatuh Tempo",
    cal_no_events:   "Belum ada acara",
    event_modal_new:  "Acara Baru",
    event_modal_edit: "Edit Acara",
    event_label_title:"Judul *",
    event_label_desc: "Deskripsi",
    event_label_date: "Tanggal *",
    event_label_cat:  "Kategori",
    event_label_start:"Waktu Mulai",
    event_label_end:  "Waktu Selesai",
    event_cat_personal: "Pribadi",
    event_cat_work:     "Kerja",
    event_cat_study:    "Studi",
    event_cat_business: "Bisnis",
    confirm_delete_event: "Hapus acara ini?",

    // Projects
    proj_title:    "Proyek",
    proj_new:      "Baru",
    proj_view_list:   "Daftar",
    proj_view_kanban: "Kanban",
    proj_empty:    "Belum ada proyek",
    proj_tasks:    "tugas",
    proj_due:      "Selesai",
    proj_modal_new:  "Proyek Baru",
    proj_modal_edit: "Edit Proyek",
    proj_label_name:  "Nama *",
    proj_label_desc:  "Deskripsi",
    proj_label_start: "Tanggal Mulai",
    proj_label_end:   "Target Selesai",
    proj_label_status:"Status",
    proj_label_color: "Warna",
    proj_linked_tasks:"Tugas Terhubung",
    confirm_delete_project: "Hapus proyek ini? Tugas yang terhubung akan dilepas.",

    // AI Assistant
    ai_title:      "Asisten AI",
    ai_subtitle:   "Mode demo — respons disimulasikan berdasarkan data Anda",
    ai_demo_badge: "Demo",
    ai_placeholder:"Tanyakan apa saja tentang catatan dan tugas Anda…",
    ai_send:       "Kirim",
    ai_suggestions:["Ringkas catatan saya","Ubah catatan ini menjadi tugas","Bantu rencanakan hari saya","Tenggat apa yang akan datang?","Pecah proyek menjadi tugas kecil","Tugas mana yang terlambat?","Apa yang harus difokuskan hari ini?"],
    ai_welcome_notes:   "catatan",
    ai_welcome_tasks:   "tugas",
    ai_no_notes:    "Catatan tidak ditemukan. Buat catatan terlebih dahulu!",
    ai_no_projects: "Proyek aktif tidak ditemukan.",
    ai_no_overdue:  "Tidak ada tugas yang terlambat. Kerja bagus! 🎉",
    ai_tip_pomodoro:"💡 Coba teknik Pomodoro: 25 menit kerja, 5 menit istirahat.",
    ai_note_label:  "Catatan:",

    // Focus & Habits
    focus_title:        "Fokus & Kebiasaan",
    pomodoro_title:     "🍅 Timer Pomodoro",
    pomodoro_sessions:  "Sesi hari ini:",
    pomodoro_work:      "Kerja ({n}m)",
    pomodoro_break:     "Istirahat ({n}m)",
    pomodoro_long:      "Panjang ({n}m)",
    pomodoro_start:     "▶ Mulai",
    pomodoro_pause:     "⏸ Jeda",
    pomodoro_reset:     "↺ Ulang",
    pomodoro_done_work:  "Sesi kerja selesai! 🎉",
    pomodoro_done_break: "Waktu istirahat habis!",
    habit_title:     "📋 Pelacak Kebiasaan",
    habit_add:       "+ Tambah",
    habit_empty:     "Tambahkan kebiasaan untuk dilacak",
    habit_modal_new: "Tambah Kebiasaan",
    habit_label_name: "Nama Kebiasaan *",
    habit_label_icon: "Ikon (emoji)",
    habit_label_color:"Warna",
    habit_placeholder:"Olahraga pagi…",
    week_stats_title: "📊 Progres Minggu Ini",
    week_pomodoros:   "Pomodoro",
    week_done:        "Selesai",
    week_habits:      "Kebiasaan",
    week_notes:       "Catatan",

    // Settings
    settings_title:      "Pengaturan",
    settings_profile:    "👤 Profil",
    settings_name_label: "Nama Tampilan",
    settings_appearance: "🎨 Tampilan",
    settings_dark_mode:  "Mode Gelap",
    settings_dark_desc:  "Beralih antara tema terang dan gelap",
    settings_lang:       "🌐 Bahasa",
    settings_lang_label: "Pilih Bahasa",
    settings_pomodoro:   "🍅 Pengaturan Pomodoro",
    settings_pomo_work:  "Kerja (menit)",
    settings_pomo_break: "Istirahat (menit)",
    settings_pomo_long:  "Istirahat Panjang (menit)",
    settings_data:       "💾 Manajemen Data",
    settings_export:     "Ekspor Data",
    settings_export_desc:"Unduh semua data sebagai JSON",
    settings_clear:      "Hapus Semua Data",
    settings_clear_desc: "Hapus semua catatan, tugas, acara, dan proyek",
    settings_about:      "Versi 1.0 · Data tersimpan lokal di browser Anda",
    settings_no_account: "Tanpa akun diperlukan · Bekerja offline",
    confirm_clear_all:   "Ini akan menghapus SEMUA catatan, tugas, acara, dan proyek. Tidak dapat dibatalkan!",
    // Study Mode
    nav_study:"Mode Belajar", study_nav_badge:"Baru",
    study_title:"Mode Belajar", study_subtitle:"Ubah catatan menjadi materi belajar interaktif",
    study_btn_start:"Mulai Belajar", study_btn_flashcard:"Buat Kartu Belajar", study_btn_quiz:"Buat Kuis",
    study_empty_title:"Belum ada materi belajar", study_empty_desc:"Pilih catatan untuk memulai sesi belajar Anda.",
    study_sets:"Set Belajar", study_recent:"Materi Terakhir", study_continue:"Lanjutkan Belajar",
    study_upcoming:"Sesi Mendatang", study_review:"Perlu Ditinjau",
    study_progress_title:"Progres Belajar",
    study_stat_sessions:"Sesi Selesai", study_stat_cards:"Kartu Ditinjau", study_stat_quizzes:"Kuis Diselesaikan", study_stat_avg:"Skor Rata-rata",
    study_select_notes_title:"Pilih Catatan", study_select_notes_desc:"Pilih catatan sebagai materi belajar",
    study_search_notes:"Cari catatan…", study_no_notes:"Tidak ada catatan tersedia",
    study_btn_create_set:"Buat Set Belajar", study_set_name_label:"Nama Set", study_set_name_ph:"mis. Ujian Biologi Bab 3…",
    fc_title:"Kartu Belajar", fc_front:"Depan", fc_back:"Belakang", fc_add:"+ Tambah Kartu",
    fc_flip:"Balik", fc_prev:"Sebelumnya", fc_next:"Berikutnya", fc_shuffle:"Acak",
    fc_mastered:"Dikuasai ✓", fc_practice:"Perlu Latihan", fc_of:"dari",
    fc_empty:"Set ini belum memiliki kartu belajar.", fc_add_manual:"Tambah Kartu Manual",
    fc_front_label:"Pertanyaan / Istilah", fc_back_label:"Jawaban / Penjelasan",
    fc_front_ph:"Masukkan pertanyaan atau istilah…", fc_back_ph:"Masukkan jawaban atau penjelasan…",
    fc_done_title:"Sesi Selesai!", fc_done_mastered:"Dikuasai", fc_done_practice:"Perlu Latihan",
    fc_btn_review:"Tinjau Belum Dikuasai", fc_btn_restart:"Mulai Ulang",
    quiz_title:"Kuis", quiz_generate:"Buat Kuis", quiz_source:"Sumber Materi",
    quiz_type:"Tipe Soal", quiz_type_mc:"Pilihan Ganda", quiz_type_tf:"Benar/Salah", quiz_type_sa:"Jawaban Singkat",
    quiz_count:"Jumlah Soal", quiz_difficulty:"Tingkat Kesulitan",
    quiz_diff_easy:"Mudah", quiz_diff_medium:"Sedang", quiz_diff_hard:"Sulit",
    quiz_btn_start:"Mulai Kuis", quiz_of:"dari", quiz_correct:"Benar", quiz_wrong:"Salah",
    quiz_submit:"Jawab", quiz_next:"Soal Berikutnya", quiz_your_answer:"Jawaban Anda:",
    quiz_correct_answer:"Jawaban benar:", quiz_explanation:"Penjelasan:",
    quiz_result_title:"Hasil Kuis", quiz_score:"Skor Anda", quiz_passed:"Lulus! 🎉", quiz_failed:"Perlu Belajar Lagi",
    quiz_btn_retry:"Kerjakan Ulang", quiz_btn_review:"Tinjau Jawaban", quiz_btn_back:"Kembali ke Mode Belajar",
    quiz_review_title:"Tinjau Jawaban",
    session_title:"Sesi Belajar", session_mode_fc:"Mode Kartu Belajar", session_mode_quiz:"Mode Kuis",
    session_duration:"Durasi", session_min:"menit",
    session_btn_start:"Mulai Sesi", session_btn_pause:"Jeda", session_btn_resume:"Lanjutkan", session_btn_end:"Akhiri Sesi",
    session_progress:"Progres Sesi", session_summary:"Ringkasan Sesi",
    session_summary_duration:"Durasi Belajar", session_summary_cards:"Kartu Ditinjau", session_summary_score:"Skor Kuis",
    study_history_title:"Riwayat Belajar", study_history_empty:"Belum ada riwayat sesi belajar.",
    study_schedule_title:"Jadwalkan Sesi", study_schedule_date:"Tanggal", study_schedule_time:"Waktu",
    study_schedule_btn:"Simpan ke Kalender",
    toast_study_set_created:"Set belajar dibuat", toast_study_card_added:"Kartu ditambahkan",
    toast_study_card_deleted:"Kartu dihapus", toast_study_set_deleted:"Set belajar dihapus",
    toast_session_saved:"Sesi belajar disimpan",
    confirm_delete_study_set:"Hapus set belajar ini? Kartu di dalamnya juga akan dihapus.",
    study_rename_set:"Ganti Nama Set", study_rename_ph:"Nama baru…",
    toast_study_set_renamed:"Nama set diubah", confirm_delete_card:"Hapus kartu ini?",
  },

  /* ── English ───────────────────────────────────────────── */
  en: {
    lang_name: "English",
    locale: "en-US",
    nav_features:"Features", nav_how:"How It Works", nav_about:"About",
    nav_explore:"Explore Features", nav_get_started:"Get Started",
    hero_badge:"AI-Powered Productivity",
    hero_title1:"Your Notes, Tasks & Time —", hero_title2:"All in One Place.",
    hero_desc:"NoteFlow AI brings together smart notes, task management, deadline tracking, calendar planning, and an AI assistant — so you can focus on what matters.",
    hero_cta:"Get Started for Free →", hero_explore:"Explore Features",
    features_eyebrow:"Everything You Need", features_title:"Powerful Features for Modern Productivity",
    features_desc:"All the tools to capture ideas, manage tasks, track deadlines, and stay productive — unified in one workspace.",
    feat_notes_title:"Smart Notes", feat_notes_desc:"Capture ideas, meeting notes, and research with folders, tags, pins, and checklists.",
    feat_tasks_title:"Tasks & Deadlines", feat_tasks_desc:"Create tasks with priority levels, due dates, and statuses. Never miss a deadline again.",
    feat_cal_title:"Smart Calendar", feat_cal_desc:"Month, week, and day views. Events and task deadlines shown together.",
    feat_ai_title:"AI Notes Assistant", feat_ai_desc:"Summarize notes, convert to tasks, plan your day, and get smart suggestions.",
    feat_proj_title:"Project Management", feat_proj_desc:"Kanban boards, progress tracking, and project timelines.",
    feat_focus_title:"Productivity Tracker", feat_focus_desc:"Pomodoro timer, habit tracking, and focus mode.",
    how_eyebrow:"Simple Process", how_title:"How It Works",
    how_s1_title:"Create Your Notes", how_s1_desc:"Capture ideas, meeting minutes, and research — with folders and tags.",
    how_s2_title:"Organize Tasks & Deadlines", how_s2_desc:"Turn notes into actionable tasks, assign priorities and deadlines.",
    how_s3_title:"Plan & Stay Productive", how_s3_desc:"Use the calendar, AI assistant, and focus tools to plan your day.",
    benefits_eyebrow:"Why NoteFlow AI", benefits_title1:"Everything organized.", benefits_title2:"Nothing forgotten.",
    ben1_title:"All notes and tasks in one place", ben1_desc:"No more switching between apps. Everything you need is unified.",
    ben2_title:"Deadlines you can actually see", ben2_desc:"Visual calendar and deadline alerts keep you ahead of every due date.",
    ben3_title:"Smart time planning", ben3_desc:"AI helps you plan your day based on tasks, deadlines, and priorities.",
    ben4_title:"Projects you can manage", ben4_desc:"Kanban boards and progress tracking for work, study, and freelance.",
    stat_notes:"Notes captured", stat_tasks:"Tasks completed", stat_proj:"Projects on track", stat_score:"productivity score this week",
    cta_title:"Ready to take control of your productivity?",
    cta_desc:"Join thousands of users who organize their notes, tasks, and time with NoteFlow AI.",
    cta_btn:"Start Organizing Today →",
    footer_desc:"Smart Notes for the modern era. Capture, organize, and act on your ideas.",
    footer_product:"Product", footer_features:"Features", footer_how:"How It Works", footer_launch:"Launch App",
    footer_usecases:"Use Cases", footer_students:"Students", footer_freelancers:"Freelancers", footer_teams:"Teams",
    footer_info:"Info", footer_local:"Data stored locally in your browser", footer_no_account:"No account required", footer_offline:"Works offline",
    footer_copy:"© 2025 NoteFlow AI — Smart Notes. All rights reserved. Data is stored locally in your browser.",
    nav_dashboard:"Dashboard", nav_notes:"My Notes", nav_tasks:"Tasks", nav_calendar:"Calendar",
    nav_projects:"Projects", nav_ai:"AI Assistant", nav_focus:"Focus & Habits", nav_settings:"Settings", nav_local_ws:"Local workspace",
    search_placeholder:"Search notes & tasks…", btn_new:"New",
    quick_create:"Quick Create", quick_note:"New Note", quick_task:"New Task", quick_event:"New Event", quick_project:"New Project",
    confirm_delete_title:"Confirm Delete", btn_cancel:"Cancel", btn_delete:"Delete", btn_save:"Save", btn_close:"Close", btn_edit:"Edit", btn_add:"Add", btn_export:"Export", btn_clear:"Clear All",
    toast_note_created:"Note created", toast_note_updated:"Note updated", toast_note_deleted:"Note deleted",
    toast_task_created:"Task created", toast_task_updated:"Task updated", toast_task_deleted:"Task deleted",
    toast_task_done:"Task completed! 🎉", toast_task_reopened:"Task reopened",
    toast_event_created:"Event created", toast_event_updated:"Event updated", toast_event_deleted:"Event deleted",
    toast_project_created:"Project created", toast_project_updated:"Project updated", toast_project_deleted:"Project deleted",
    toast_note_pinned:"Note pinned", toast_note_unpinned:"Note unpinned", toast_exported:"Data exported", toast_habit_added:"Habit added", toast_lang_changed:"Language updated",
    err_title_required:"Title is required", err_fields_required:"Title and content are required",
    err_date_required:"Title and date are required", err_project_required:"Project name is required",
    dash_greeting_morning:"Good morning", dash_greeting_afternoon:"Good afternoon", dash_greeting_evening:"Good evening",
    dash_events_today:"{n} event(s) today",
    dash_active_tasks:"Active Tasks", dash_completed:"Completed", dash_projects:"Projects", dash_overdue_tasks:"Overdue Tasks",
    dash_agenda_title:"Today's Agenda", dash_agenda_empty:"No events today",
    dash_deadlines_title:"Upcoming Deadlines", dash_deadlines_empty:"No upcoming deadlines",
    dash_notes_title:"Recent Notes", dash_notes_empty:"No notes yet",
    dash_proj_title:"Active Projects", dash_proj_empty:"No active projects",
    dash_view_calendar:"View calendar →", dash_all_tasks:"All tasks →", dash_all_notes:"All notes →", dash_all_projects:"All projects →",
    dash_notes_count:"Notes", dash_updated:"Updated",
    notes_title:"My Notes", notes_new:"New Note", notes_search:"Search notes…",
    notes_filter_all:"All", notes_filter_pinned:"📌 Pinned",
    notes_empty_title:"No notes found", notes_empty_desc:"Create a new note to get started",
    note_updated:"Updated", note_general:"General",
    note_modal_new:"New Note", note_modal_edit:"Edit Note",
    note_label_title:"Title *", note_label_folder:"Folder", note_label_tags:"Tags (comma separated)", note_label_content:"Content *",
    note_placeholder_title:"Note title…", note_placeholder_folder:"Work, Study…", note_placeholder_tags:"react, meeting…", note_placeholder_content:"Write your note here…",
    note_pin_label:"📌 Pin this note", note_pin:"Pin", note_unpin:"Unpin",
    confirm_delete_note:"Delete this note permanently?",
    tasks_title:"Tasks", tasks_new:"New Task", tasks_search:"Search tasks…",
    tasks_sort_deadline:"Sort: Deadline", tasks_sort_priority:"Sort: Priority", tasks_sort_newest:"Sort: Newest",
    tasks_filter_all:"All", tasks_filter_active:"Active", tasks_filter_today:"Today", tasks_filter_overdue:"Overdue", tasks_filter_completed:"Completed",
    tasks_empty:"No tasks found",
    task_modal_new:"New Task", task_modal_edit:"Edit Task",
    task_label_title:"Title *", task_label_desc:"Description", task_label_deadline:"Deadline", task_label_priority:"Priority", task_label_status:"Status", task_label_project:"Link to Project",
    task_placeholder_title:"Task title…", task_placeholder_desc:"Optional details…", task_no_project:"None",
    priority_high:"High", priority_medium:"Medium", priority_low:"Low",
    status_todo:"To Do", status_inprogress:"In Progress", status_completed:"Completed",
    due_today:"Due today", due_tomorrow:"Due tomorrow", due_in_days:"Due in {n} days", overdue_days:"{n} day(s) overdue",
    confirm_delete_task:"Delete this task permanently?",
    cal_title:"Smart Calendar", cal_new_event:"New Event", cal_today:"Today",
    cal_month:"Month", cal_week:"Week", cal_day:"Day",
    cal_days_short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    cal_nothing:"Nothing scheduled for this day", cal_add_event:"Add Event", cal_tasks_due:"Tasks Due",
    cal_no_events:"Nothing on this day",
    event_modal_new:"New Event", event_modal_edit:"Edit Event",
    event_label_title:"Title *", event_label_desc:"Description", event_label_date:"Date *", event_label_cat:"Category", event_label_start:"Start Time", event_label_end:"End Time",
    event_cat_personal:"Personal", event_cat_work:"Work", event_cat_study:"Study", event_cat_business:"Business",
    confirm_delete_event:"Delete this event?",
    proj_title:"Projects", proj_new:"New", proj_view_list:"List", proj_view_kanban:"Kanban", proj_empty:"No projects yet",
    proj_tasks:"tasks", proj_due:"Due",
    proj_modal_new:"New Project", proj_modal_edit:"Edit Project",
    proj_label_name:"Name *", proj_label_desc:"Description", proj_label_start:"Start Date", proj_label_end:"Target Date", proj_label_status:"Status", proj_label_color:"Color",
    proj_linked_tasks:"Linked Tasks",
    confirm_delete_project:"Delete this project? Linked tasks will be unlinked.",
    ai_title:"AI Assistant", ai_subtitle:"Demo mode — simulated responses based on your data", ai_demo_badge:"Demo",
    ai_placeholder:"Ask me anything about your notes and tasks…", ai_send:"Send",
    ai_suggestions:["Summarize my notes","Turn this note into tasks","Help me plan my day","What deadlines are coming up?","Break my project into smaller tasks","Which tasks are overdue?","What should I focus on today?"],
    ai_welcome_notes:"notes", ai_welcome_tasks:"tasks",
    ai_no_notes:"No notes found. Create a note first!", ai_no_projects:"No active projects found.",
    ai_no_overdue:"No overdue tasks. Great job! 🎉",
    ai_tip_pomodoro:"💡 Try the Pomodoro technique: 25 min work, 5 min break.",
    ai_note_label:"Note:",
    focus_title:"Focus & Habits",
    pomodoro_title:"🍅 Pomodoro Timer", pomodoro_sessions:"Sessions today:", pomodoro_work:"Work ({n}m)", pomodoro_break:"Break ({n}m)", pomodoro_long:"Long ({n}m)",
    pomodoro_start:"▶ Start", pomodoro_pause:"⏸ Pause", pomodoro_reset:"↺ Reset",
    pomodoro_done_work:"Work session done! 🎉", pomodoro_done_break:"Break time over!",
    habit_title:"📋 Habit Tracker", habit_add:"+ Add", habit_empty:"Add habits to track",
    habit_modal_new:"Add Habit", habit_label_name:"Habit Name *", habit_label_icon:"Icon (emoji)", habit_label_color:"Color", habit_placeholder:"Morning exercise…",
    week_stats_title:"📊 This Week's Progress", week_pomodoros:"Pomodoros", week_done:"Done", week_habits:"Habits", week_notes:"Notes",
    settings_title:"Settings", settings_profile:"👤 Profile", settings_name_label:"Display Name", settings_appearance:"🎨 Appearance",
    settings_dark_mode:"Dark Mode", settings_dark_desc:"Switch between light and dark theme",
    settings_lang:"🌐 Language", settings_lang_label:"Select Language",
    settings_pomodoro:"🍅 Pomodoro Settings", settings_pomo_work:"Work (min)", settings_pomo_break:"Break (min)", settings_pomo_long:"Long Break (min)",
    settings_data:"💾 Data Management", settings_export:"Export Data", settings_export_desc:"Download all data as JSON",
    settings_clear:"Clear All Data", settings_clear_desc:"Remove all notes, tasks, events, and projects",
    settings_about:"Version 1.0 · Data stored locally in your browser",
    settings_no_account:"No account required · Works offline",
    confirm_clear_all:"This will delete ALL your notes, tasks, events, and projects. This cannot be undone!",
    // Study Mode
    nav_study:"Study Mode", study_nav_badge:"New",
    study_title:"Study Mode", study_subtitle:"Transform your notes into interactive learning materials",
    study_btn_start:"Start Studying", study_btn_flashcard:"Create Flashcards", study_btn_quiz:"Generate Quiz",
    study_empty_title:"No study materials yet", study_empty_desc:"Select notes to begin your study session.",
    study_sets:"Study Sets", study_recent:"Recent Materials", study_continue:"Continue Learning",
    study_upcoming:"Upcoming Sessions", study_review:"Needs Review",
    study_progress_title:"Learning Progress",
    study_stat_sessions:"Sessions Done", study_stat_cards:"Cards Reviewed", study_stat_quizzes:"Quizzes Completed", study_stat_avg:"Avg Score",
    study_select_notes_title:"Select Notes", study_select_notes_desc:"Choose notes to use as study material",
    study_search_notes:"Search notes…", study_no_notes:"No notes available",
    study_btn_create_set:"Create Study Set", study_set_name_label:"Set Name", study_set_name_ph:"e.g. Biology Chapter 3 Exam…",
    fc_title:"Flashcards", fc_front:"Front", fc_back:"Back", fc_add:"+ Add Card",
    fc_flip:"Flip", fc_prev:"Previous", fc_next:"Next", fc_shuffle:"Shuffle",
    fc_mastered:"Mastered ✓", fc_practice:"Needs Practice", fc_of:"of",
    fc_empty:"This set has no flashcards yet.", fc_add_manual:"Add Card Manually",
    fc_front_label:"Question / Term", fc_back_label:"Answer / Explanation",
    fc_front_ph:"Enter question or term…", fc_back_ph:"Enter answer or explanation…",
    fc_done_title:"Session Complete!", fc_done_mastered:"Mastered", fc_done_practice:"Needs Practice",
    fc_btn_review:"Review Unmastered", fc_btn_restart:"Restart",
    quiz_title:"Quiz", quiz_generate:"Generate Quiz", quiz_source:"Source Material",
    quiz_type:"Question Type", quiz_type_mc:"Multiple Choice", quiz_type_tf:"True / False", quiz_type_sa:"Short Answer",
    quiz_count:"Number of Questions", quiz_difficulty:"Difficulty",
    quiz_diff_easy:"Easy", quiz_diff_medium:"Medium", quiz_diff_hard:"Hard",
    quiz_btn_start:"Start Quiz", quiz_of:"of", quiz_correct:"Correct", quiz_wrong:"Wrong",
    quiz_submit:"Submit Answer", quiz_next:"Next Question", quiz_your_answer:"Your answer:",
    quiz_correct_answer:"Correct answer:", quiz_explanation:"Explanation:",
    quiz_result_title:"Quiz Results", quiz_score:"Your Score", quiz_passed:"Passed! 🎉", quiz_failed:"Keep Studying",
    quiz_btn_retry:"Retry Quiz", quiz_btn_review:"Review Answers", quiz_btn_back:"Back to Study Mode",
    quiz_review_title:"Review Answers",
    session_title:"Study Session", session_mode_fc:"Flashcard Mode", session_mode_quiz:"Quiz Mode",
    session_duration:"Duration", session_min:"min",
    session_btn_start:"Start Session", session_btn_pause:"Pause", session_btn_resume:"Resume", session_btn_end:"End Session",
    session_progress:"Session Progress", session_summary:"Session Summary",
    session_summary_duration:"Study Duration", session_summary_cards:"Cards Reviewed", session_summary_score:"Quiz Score",
    study_history_title:"Study History", study_history_empty:"No study sessions recorded yet.",
    study_schedule_title:"Schedule Session", study_schedule_date:"Date", study_schedule_time:"Time",
    study_schedule_btn:"Save to Calendar",
    toast_study_set_created:"Study set created", toast_study_card_added:"Card added",
    toast_study_card_deleted:"Card deleted", toast_study_set_deleted:"Study set deleted",
    toast_session_saved:"Study session saved",
    confirm_delete_study_set:"Delete this study set? All cards inside will also be removed.",
    study_rename_set:"Rename Set", study_rename_ph:"New name…",
    toast_study_set_renamed:"Set renamed", confirm_delete_card:"Delete this card?",
  },

  /* ── Bahasa Melayu ─────────────────────────────────────── */
  ms: {
    lang_name: "Bahasa Melayu",
    locale: "ms-MY",
    nav_features:"Ciri-ciri", nav_how:"Cara Guna", nav_about:"Tentang",
    nav_explore:"Terokai Ciri", nav_get_started:"Mula Sekarang",
    hero_badge:"Produktiviti Berkuasa AI",
    hero_title1:"Nota, Tugas & Masa —", hero_title2:"Semuanya di Satu Tempat.",
    hero_desc:"NoteFlow AI menggabungkan nota pintar, pengurusan tugas, penjejakan tarikh akhir, perancangan kalendar, dan pembantu AI — supaya anda boleh fokus pada perkara penting.",
    hero_cta:"Mula Percuma →", hero_explore:"Terokai Ciri",
    features_eyebrow:"Semua Yang Anda Perlukan", features_title:"Ciri Canggih untuk Produktiviti Moden",
    features_desc:"Semua alat untuk menangkap idea, mengurus tugas, menjejak tarikh akhir, dan kekal produktif.",
    feat_notes_title:"Nota Pintar", feat_notes_desc:"Tangkap idea, nota mesyuarat, dan penyelidikan dengan folder, tag, dan pin.",
    feat_tasks_title:"Tugas & Tarikh Akhir", feat_tasks_desc:"Cipta tugas dengan tahap keutamaan, tarikh tamat, dan status.",
    feat_cal_title:"Kalendar Pintar", feat_cal_desc:"Paparan bulan, minggu, dan hari. Acara dan tarikh akhir bersama.",
    feat_ai_title:"Pembantu AI", feat_ai_desc:"Ringkaskan nota, tukar kepada tugas, rancang hari anda.",
    feat_proj_title:"Pengurusan Projek", feat_proj_desc:"Papan Kanban, penjejakan kemajuan, dan garis masa projek.",
    feat_focus_title:"Penjejak Produktiviti", feat_focus_desc:"Pemasa Pomodoro, penjejakan tabiat, dan mod fokus.",
    how_eyebrow:"Proses Mudah", how_title:"Cara Guna",
    how_s1_title:"Cipta Nota Anda", how_s1_desc:"Tangkap idea, minit mesyuarat, dan maklumat penting.",
    how_s2_title:"Susun Tugas & Tarikh Akhir", how_s2_desc:"Tukar nota kepada tugas boleh tindak, tetapkan keutamaan.",
    how_s3_title:"Rancang & Kekal Produktif", how_s3_desc:"Gunakan kalendar, pembantu AI, dan alat fokus.",
    benefits_eyebrow:"Mengapa NoteFlow AI", benefits_title1:"Semua tersusun.", benefits_title2:"Tiada yang terlupa.",
    ben1_title:"Semua nota dan tugas di satu tempat", ben1_desc:"Tidak perlu tukar aplikasi. Semua yang diperlukan bersatu.",
    ben2_title:"Tarikh akhir yang jelas kelihatan", ben2_desc:"Kalendar visual dan amaran tarikh akhir membantu anda.",
    ben3_title:"Perancangan masa yang bijak", ben3_desc:"AI membantu merancang hari anda berdasarkan tugas dan keutamaan.",
    ben4_title:"Projek yang boleh diurus", ben4_desc:"Papan Kanban dan penjejakan kemajuan untuk semua projek.",
    stat_notes:"Nota dicipta", stat_tasks:"Tugas siap", stat_proj:"Projek berjalan", stat_score:"skor produktiviti minggu ini",
    cta_title:"Bersedia untuk kawal produktiviti anda?",
    cta_desc:"Sertai ribuan pengguna yang mengurus nota, tugas, dan masa dengan NoteFlow AI.",
    cta_btn:"Mula Susun Hari Ini →",
    footer_desc:"Nota Pintar untuk era moden. Tangkap, susun, dan jadikan idea anda tindakan nyata.",
    footer_product:"Produk", footer_features:"Ciri-ciri", footer_how:"Cara Guna", footer_launch:"Buka Aplikasi",
    footer_usecases:"Pengguna", footer_students:"Pelajar", footer_freelancers:"Freelancer", footer_teams:"Pasukan",
    footer_info:"Maklumat", footer_local:"Data disimpan dalam pelayar anda", footer_no_account:"Tanpa akaun", footer_offline:"Boleh guna tanpa internet",
    footer_copy:"© 2025 NoteFlow AI — Smart Notes. Hak cipta terpelihara.",
    nav_dashboard:"Papan Pemuka", nav_notes:"Nota Saya", nav_tasks:"Tugas", nav_calendar:"Kalendar",
    nav_projects:"Projek", nav_ai:"Pembantu AI", nav_focus:"Fokus & Tabiat", nav_settings:"Tetapan", nav_local_ws:"Ruang kerja tempatan",
    search_placeholder:"Cari nota & tugas…", btn_new:"Baharu",
    quick_create:"Cipta Cepat", quick_note:"Nota Baharu", quick_task:"Tugas Baharu", quick_event:"Acara Baharu", quick_project:"Projek Baharu",
    confirm_delete_title:"Sahkan Padam", btn_cancel:"Batal", btn_delete:"Padam", btn_save:"Simpan", btn_close:"Tutup", btn_edit:"Edit", btn_add:"Tambah", btn_export:"Eksport", btn_clear:"Kosongkan",
    toast_note_created:"Nota dicipta", toast_note_updated:"Nota dikemaskini", toast_note_deleted:"Nota dipadam",
    toast_task_created:"Tugas dicipta", toast_task_updated:"Tugas dikemaskini", toast_task_deleted:"Tugas dipadam",
    toast_task_done:"Tugas selesai! 🎉", toast_task_reopened:"Tugas dibuka semula",
    toast_event_created:"Acara dicipta", toast_event_updated:"Acara dikemaskini", toast_event_deleted:"Acara dipadam",
    toast_project_created:"Projek dicipta", toast_project_updated:"Projek dikemaskini", toast_project_deleted:"Projek dipadam",
    toast_note_pinned:"Nota disematkan", toast_note_unpinned:"Nota dilepas", toast_exported:"Data dieksport", toast_habit_added:"Tabiat ditambah", toast_lang_changed:"Bahasa dikemaskini",
    err_title_required:"Tajuk diperlukan", err_fields_required:"Tajuk dan kandungan diperlukan",
    err_date_required:"Tajuk dan tarikh diperlukan", err_project_required:"Nama projek diperlukan",
    dash_greeting_morning:"Selamat pagi", dash_greeting_afternoon:"Selamat tengah hari", dash_greeting_evening:"Selamat petang",
    dash_events_today:"{n} acara hari ini",
    dash_active_tasks:"Tugas Aktif", dash_completed:"Selesai", dash_projects:"Projek", dash_overdue_tasks:"Tugas Lewat",
    dash_agenda_title:"Agenda Hari Ini", dash_agenda_empty:"Tiada acara hari ini",
    dash_deadlines_title:"Tarikh Akhir Akan Datang", dash_deadlines_empty:"Tiada tarikh akhir akan datang",
    dash_notes_title:"Nota Terkini", dash_notes_empty:"Belum ada nota",
    dash_proj_title:"Projek Aktif", dash_proj_empty:"Tiada projek aktif",
    dash_view_calendar:"Lihat kalendar →", dash_all_tasks:"Semua tugas →", dash_all_notes:"Semua nota →", dash_all_projects:"Semua projek →",
    dash_notes_count:"Nota", dash_updated:"Dikemaskini",
    notes_title:"Nota Saya", notes_new:"Nota Baharu", notes_search:"Cari nota…",
    notes_filter_all:"Semua", notes_filter_pinned:"📌 Disematkan",
    notes_empty_title:"Nota tidak ditemui", notes_empty_desc:"Cipta nota baharu untuk memulakan",
    note_updated:"Dikemaskini", note_general:"Umum",
    note_modal_new:"Nota Baharu", note_modal_edit:"Edit Nota",
    note_label_title:"Tajuk *", note_label_folder:"Folder", note_label_tags:"Tag (pisahkan koma)", note_label_content:"Kandungan *",
    note_placeholder_title:"Tajuk nota…", note_placeholder_folder:"Kerja, Belajar…", note_placeholder_tags:"react, mesyuarat…", note_placeholder_content:"Tulis nota anda di sini…",
    note_pin_label:"📌 Sematkan nota ini", note_pin:"Semat", note_unpin:"Lepas sematan",
    confirm_delete_note:"Padam nota ini secara kekal?",
    tasks_title:"Tugas", tasks_new:"Tugas Baharu", tasks_search:"Cari tugas…",
    tasks_sort_deadline:"Susun: Tarikh Akhir", tasks_sort_priority:"Susun: Keutamaan", tasks_sort_newest:"Susun: Terbaru",
    tasks_filter_all:"Semua", tasks_filter_active:"Aktif", tasks_filter_today:"Hari Ini", tasks_filter_overdue:"Lewat", tasks_filter_completed:"Selesai",
    tasks_empty:"Tiada tugas ditemui",
    task_modal_new:"Tugas Baharu", task_modal_edit:"Edit Tugas",
    task_label_title:"Tajuk *", task_label_desc:"Penerangan", task_label_deadline:"Tarikh Akhir", task_label_priority:"Keutamaan", task_label_status:"Status", task_label_project:"Kaitkan ke Projek",
    task_placeholder_title:"Tajuk tugas…", task_placeholder_desc:"Butiran pilihan…", task_no_project:"Tiada",
    priority_high:"Tinggi", priority_medium:"Sederhana", priority_low:"Rendah",
    status_todo:"Perlu Dibuat", status_inprogress:"Dalam Proses", status_completed:"Selesai",
    due_today:"Jatuh tempo hari ini", due_tomorrow:"Jatuh tempo esok", due_in_days:"Jatuh tempo dalam {n} hari", overdue_days:"Lewat {n} hari",
    confirm_delete_task:"Padam tugas ini secara kekal?",
    cal_title:"Kalendar Pintar", cal_new_event:"Acara Baharu", cal_today:"Hari Ini",
    cal_month:"Bulan", cal_week:"Minggu", cal_day:"Hari",
    cal_days_short:["Ahd","Isn","Sel","Rab","Kha","Jum","Sab"],
    cal_nothing:"Tiada jadual hari ini", cal_add_event:"Tambah Acara", cal_tasks_due:"Tugas Jatuh Tempo", cal_no_events:"Tiada pada hari ini",
    event_modal_new:"Acara Baharu", event_modal_edit:"Edit Acara",
    event_label_title:"Tajuk *", event_label_desc:"Penerangan", event_label_date:"Tarikh *", event_label_cat:"Kategori", event_label_start:"Masa Mula", event_label_end:"Masa Tamat",
    event_cat_personal:"Peribadi", event_cat_work:"Kerja", event_cat_study:"Belajar", event_cat_business:"Perniagaan",
    confirm_delete_event:"Padam acara ini?",
    proj_title:"Projek", proj_new:"Baharu", proj_view_list:"Senarai", proj_view_kanban:"Kanban", proj_empty:"Belum ada projek",
    proj_tasks:"tugas", proj_due:"Tamat",
    proj_modal_new:"Projek Baharu", proj_modal_edit:"Edit Projek",
    proj_label_name:"Nama *", proj_label_desc:"Penerangan", proj_label_start:"Tarikh Mula", proj_label_end:"Tarikh Sasaran", proj_label_status:"Status", proj_label_color:"Warna",
    proj_linked_tasks:"Tugas Dikaitkan",
    confirm_delete_project:"Padam projek ini? Tugas yang dikaitkan akan dilepas.",
    ai_title:"Pembantu AI", ai_subtitle:"Mod demo — respons disimulasikan berdasarkan data anda", ai_demo_badge:"Demo",
    ai_placeholder:"Tanya apa sahaja tentang nota dan tugas anda…", ai_send:"Hantar",
    ai_suggestions:["Ringkaskan nota saya","Tukar nota ini kepada tugas","Bantu rancang hari saya","Tarikh akhir apa yang akan datang?","Pecahkan projek kepada tugas kecil","Tugas mana yang lewat?","Apa yang perlu difokus hari ini?"],
    ai_welcome_notes:"nota", ai_welcome_tasks:"tugas",
    ai_no_notes:"Nota tidak ditemui. Cipta nota terlebih dahulu!", ai_no_projects:"Tiada projek aktif ditemui.",
    ai_no_overdue:"Tiada tugas yang lewat. Bagus! 🎉",
    ai_tip_pomodoro:"💡 Cuba teknik Pomodoro: 25 min kerja, 5 min rehat.",
    ai_note_label:"Nota:",
    focus_title:"Fokus & Tabiat",
    pomodoro_title:"🍅 Pemasa Pomodoro", pomodoro_sessions:"Sesi hari ini:", pomodoro_work:"Kerja ({n}m)", pomodoro_break:"Rehat ({n}m)", pomodoro_long:"Panjang ({n}m)",
    pomodoro_start:"▶ Mula", pomodoro_pause:"⏸ Jeda", pomodoro_reset:"↺ Set Semula",
    pomodoro_done_work:"Sesi kerja selesai! 🎉", pomodoro_done_break:"Masa rehat tamat!",
    habit_title:"📋 Penjejak Tabiat", habit_add:"+ Tambah", habit_empty:"Tambah tabiat untuk dijejak",
    habit_modal_new:"Tambah Tabiat", habit_label_name:"Nama Tabiat *", habit_label_icon:"Ikon (emoji)", habit_label_color:"Warna", habit_placeholder:"Senaman pagi…",
    week_stats_title:"📊 Kemajuan Minggu Ini", week_pomodoros:"Pomodoro", week_done:"Selesai", week_habits:"Tabiat", week_notes:"Nota",
    settings_title:"Tetapan", settings_profile:"👤 Profil", settings_name_label:"Nama Paparan", settings_appearance:"🎨 Penampilan",
    settings_dark_mode:"Mod Gelap", settings_dark_desc:"Tukar antara tema cerah dan gelap",
    settings_lang:"🌐 Bahasa", settings_lang_label:"Pilih Bahasa",
    settings_pomodoro:"🍅 Tetapan Pomodoro", settings_pomo_work:"Kerja (minit)", settings_pomo_break:"Rehat (minit)", settings_pomo_long:"Rehat Panjang (minit)",
    settings_data:"💾 Pengurusan Data", settings_export:"Eksport Data", settings_export_desc:"Muat turun semua data sebagai JSON",
    settings_clear:"Kosongkan Semua Data", settings_clear_desc:"Buang semua nota, tugas, acara, dan projek",
    settings_about:"Versi 1.0 · Data disimpan tempatan dalam pelayar anda",
    settings_no_account:"Tanpa akaun diperlukan · Boleh guna tanpa internet",
    confirm_clear_all:"Ini akan memadamkan SEMUA nota, tugas, acara, dan projek. Tidak boleh dibatalkan!",
    // Study Mode
    nav_study:"Mod Belajar", study_nav_badge:"Baharu",
    study_title:"Mod Belajar", study_subtitle:"Tukar nota anda kepada bahan pembelajaran interaktif",
    study_btn_start:"Mula Belajar", study_btn_flashcard:"Buat Kad Belajar", study_btn_quiz:"Jana Kuiz",
    study_empty_title:"Tiada bahan belajar lagi", study_empty_desc:"Pilih nota untuk memulakan sesi belajar anda.",
    study_sets:"Set Belajar", study_recent:"Bahan Terkini", study_continue:"Teruskan Belajar",
    study_upcoming:"Sesi Akan Datang", study_review:"Perlu Semakan",
    study_progress_title:"Kemajuan Pembelajaran",
    study_stat_sessions:"Sesi Selesai", study_stat_cards:"Kad Disemak", study_stat_quizzes:"Kuiz Selesai", study_stat_avg:"Skor Purata",
    study_select_notes_title:"Pilih Nota", study_select_notes_desc:"Pilih nota sebagai bahan kajian",
    study_search_notes:"Cari nota…", study_no_notes:"Tiada nota tersedia",
    study_btn_create_set:"Cipta Set Belajar", study_set_name_label:"Nama Set", study_set_name_ph:"cth. Peperiksaan Bio Bab 3…",
    fc_title:"Kad Imbas", fc_front:"Hadapan", fc_back:"Belakang", fc_add:"+ Tambah Kad",
    fc_flip:"Balik", fc_prev:"Sebelum", fc_next:"Seterusnya", fc_shuffle:"Kocok",
    fc_mastered:"Dikuasai ✓", fc_practice:"Perlu Latihan", fc_of:"daripada",
    fc_empty:"Set ini belum ada kad imbas.", fc_add_manual:"Tambah Kad Manual",
    fc_front_label:"Soalan / Istilah", fc_back_label:"Jawapan / Penjelasan",
    fc_front_ph:"Masukkan soalan atau istilah…", fc_back_ph:"Masukkan jawapan atau penjelasan…",
    fc_done_title:"Sesi Selesai!", fc_done_mastered:"Dikuasai", fc_done_practice:"Perlu Latihan",
    fc_btn_review:"Semak Belum Dikuasai", fc_btn_restart:"Mula Semula",
    quiz_title:"Kuiz", quiz_generate:"Jana Kuiz", quiz_source:"Sumber Bahan",
    quiz_type:"Jenis Soalan", quiz_type_mc:"Aneka Pilihan", quiz_type_tf:"Betul/Salah", quiz_type_sa:"Jawapan Pendek",
    quiz_count:"Bilangan Soalan", quiz_difficulty:"Tahap Kesukaran",
    quiz_diff_easy:"Mudah", quiz_diff_medium:"Sederhana", quiz_diff_hard:"Sukar",
    quiz_btn_start:"Mula Kuiz", quiz_of:"daripada", quiz_correct:"Betul", quiz_wrong:"Salah",
    quiz_submit:"Hantar Jawapan", quiz_next:"Soalan Seterusnya", quiz_your_answer:"Jawapan anda:",
    quiz_correct_answer:"Jawapan betul:", quiz_explanation:"Penjelasan:",
    quiz_result_title:"Keputusan Kuiz", quiz_score:"Skor Anda", quiz_passed:"Lulus! 🎉", quiz_failed:"Teruskan Belajar",
    quiz_btn_retry:"Cuba Lagi", quiz_btn_review:"Semak Jawapan", quiz_btn_back:"Kembali ke Mod Belajar",
    quiz_review_title:"Semak Jawapan",
    session_title:"Sesi Belajar", session_mode_fc:"Mod Kad Imbas", session_mode_quiz:"Mod Kuiz",
    session_duration:"Tempoh", session_min:"minit",
    session_btn_start:"Mula Sesi", session_btn_pause:"Jeda", session_btn_resume:"Sambung", session_btn_end:"Tamat Sesi",
    session_progress:"Kemajuan Sesi", session_summary:"Ringkasan Sesi",
    session_summary_duration:"Tempoh Belajar", session_summary_cards:"Kad Disemak", session_summary_score:"Skor Kuiz",
    study_history_title:"Sejarah Belajar", study_history_empty:"Tiada sesi belajar direkodkan lagi.",
    study_schedule_title:"Jadualkan Sesi", study_schedule_date:"Tarikh", study_schedule_time:"Masa",
    study_schedule_btn:"Simpan ke Kalendar",
    toast_study_set_created:"Set belajar dicipta", toast_study_card_added:"Kad ditambah",
    toast_study_card_deleted:"Kad dipadam", toast_study_set_deleted:"Set belajar dipadam",
    toast_session_saved:"Sesi belajar disimpan",
    confirm_delete_study_set:"Padam set belajar ini? Semua kad di dalamnya juga akan dipadam.",
    study_rename_set:"Namakan Semula Set", study_rename_ph:"Nama baharu…",
    toast_study_set_renamed:"Nama set diubah", confirm_delete_card:"Padam kad ini?",
  },

  /* ── Español ───────────────────────────────────────────── */
  es: {
    lang_name: "Español",
    locale: "es-ES",
    nav_features:"Características", nav_how:"Cómo funciona", nav_about:"Acerca de",
    nav_explore:"Explorar", nav_get_started:"Comenzar",
    hero_badge:"Productividad con IA",
    hero_title1:"Tus notas, tareas y tiempo —", hero_title2:"Todo en un solo lugar.",
    hero_desc:"NoteFlow AI combina notas inteligentes, gestión de tareas, seguimiento de plazos, planificación de calendario y un asistente de IA.",
    hero_cta:"Empezar gratis →", hero_explore:"Explorar funciones",
    features_eyebrow:"Todo lo que necesitas", features_title:"Funciones potentes para la productividad moderna",
    features_desc:"Todas las herramientas para capturar ideas, gestionar tareas, rastrear plazos y mantenerse productivo.",
    feat_notes_title:"Notas inteligentes", feat_notes_desc:"Captura ideas y notas de reuniones con carpetas, etiquetas y listas.",
    feat_tasks_title:"Tareas y plazos", feat_tasks_desc:"Crea tareas con prioridades, fechas límite y estados.",
    feat_cal_title:"Calendario inteligente", feat_cal_desc:"Vistas de mes, semana y día. Eventos y plazos juntos.",
    feat_ai_title:"Asistente de IA", feat_ai_desc:"Resume notas, conviértelas en tareas y planifica tu día.",
    feat_proj_title:"Gestión de proyectos", feat_proj_desc:"Tableros Kanban, seguimiento de progreso y cronogramas.",
    feat_focus_title:"Rastreador de productividad", feat_focus_desc:"Temporizador Pomodoro, seguimiento de hábitos y modo enfoque.",
    how_eyebrow:"Proceso simple", how_title:"Cómo funciona",
    how_s1_title:"Crea tus notas", how_s1_desc:"Captura ideas, actas de reuniones e información importante.",
    how_s2_title:"Organiza tareas y plazos", how_s2_desc:"Convierte notas en tareas, asigna prioridades y fechas.",
    how_s3_title:"Planifica y mantente productivo", how_s3_desc:"Usa el calendario, el asistente de IA y las herramientas de enfoque.",
    benefits_eyebrow:"Por qué NoteFlow AI", benefits_title1:"Todo organizado.", benefits_title2:"Nada olvidado.",
    ben1_title:"Todas las notas y tareas en un lugar", ben1_desc:"Sin cambiar de app. Todo lo que necesitas está unificado.",
    ben2_title:"Plazos que realmente puedes ver", ben2_desc:"El calendario visual y las alertas te mantienen al día.",
    ben3_title:"Planificación inteligente del tiempo", ben3_desc:"La IA te ayuda a planificar tu día según tareas y prioridades.",
    ben4_title:"Proyectos que puedes gestionar", ben4_desc:"Tableros Kanban y seguimiento de progreso para todos tus proyectos.",
    stat_notes:"Notas creadas", stat_tasks:"Tareas completadas", stat_proj:"Proyectos en curso", stat_score:"puntuación de productividad esta semana",
    cta_title:"¿Listo para tomar el control de tu productividad?",
    cta_desc:"Únete a miles de usuarios que organizan sus notas, tareas y tiempo con NoteFlow AI.",
    cta_btn:"Empieza a organizar hoy →",
    footer_desc:"Notas inteligentes para la era moderna. Captura, organiza y convierte tus ideas en acción.",
    footer_product:"Producto", footer_features:"Características", footer_how:"Cómo funciona", footer_launch:"Abrir app",
    footer_usecases:"Casos de uso", footer_students:"Estudiantes", footer_freelancers:"Freelancers", footer_teams:"Equipos",
    footer_info:"Info", footer_local:"Datos guardados localmente en tu navegador", footer_no_account:"Sin cuenta requerida", footer_offline:"Funciona sin conexión",
    footer_copy:"© 2025 NoteFlow AI — Smart Notes. Todos los derechos reservados.",
    nav_dashboard:"Panel", nav_notes:"Mis notas", nav_tasks:"Tareas", nav_calendar:"Calendario",
    nav_projects:"Proyectos", nav_ai:"Asistente IA", nav_focus:"Foco y hábitos", nav_settings:"Ajustes", nav_local_ws:"Espacio de trabajo local",
    search_placeholder:"Buscar notas y tareas…", btn_new:"Nuevo",
    quick_create:"Crear rápido", quick_note:"Nueva nota", quick_task:"Nueva tarea", quick_event:"Nuevo evento", quick_project:"Nuevo proyecto",
    confirm_delete_title:"Confirmar eliminación", btn_cancel:"Cancelar", btn_delete:"Eliminar", btn_save:"Guardar", btn_close:"Cerrar", btn_edit:"Editar", btn_add:"Añadir", btn_export:"Exportar", btn_clear:"Borrar todo",
    toast_note_created:"Nota creada", toast_note_updated:"Nota actualizada", toast_note_deleted:"Nota eliminada",
    toast_task_created:"Tarea creada", toast_task_updated:"Tarea actualizada", toast_task_deleted:"Tarea eliminada",
    toast_task_done:"¡Tarea completada! 🎉", toast_task_reopened:"Tarea reabierta",
    toast_event_created:"Evento creado", toast_event_updated:"Evento actualizado", toast_event_deleted:"Evento eliminado",
    toast_project_created:"Proyecto creado", toast_project_updated:"Proyecto actualizado", toast_project_deleted:"Proyecto eliminado",
    toast_note_pinned:"Nota fijada", toast_note_unpinned:"Nota desfijada", toast_exported:"Datos exportados", toast_habit_added:"Hábito añadido", toast_lang_changed:"Idioma actualizado",
    err_title_required:"El título es obligatorio", err_fields_required:"El título y el contenido son obligatorios",
    err_date_required:"El título y la fecha son obligatorios", err_project_required:"El nombre del proyecto es obligatorio",
    dash_greeting_morning:"Buenos días", dash_greeting_afternoon:"Buenas tardes", dash_greeting_evening:"Buenas noches",
    dash_events_today:"{n} evento(s) hoy",
    dash_active_tasks:"Tareas activas", dash_completed:"Completadas", dash_projects:"Proyectos", dash_overdue_tasks:"Tareas vencidas",
    dash_agenda_title:"Agenda de hoy", dash_agenda_empty:"No hay eventos hoy",
    dash_deadlines_title:"Próximas fechas límite", dash_deadlines_empty:"Sin fechas límite próximas",
    dash_notes_title:"Notas recientes", dash_notes_empty:"Aún no hay notas",
    dash_proj_title:"Proyectos activos", dash_proj_empty:"Sin proyectos activos",
    dash_view_calendar:"Ver calendario →", dash_all_tasks:"Todas las tareas →", dash_all_notes:"Todas las notas →", dash_all_projects:"Todos los proyectos →",
    dash_notes_count:"Notas", dash_updated:"Actualizado",
    notes_title:"Mis notas", notes_new:"Nueva nota", notes_search:"Buscar notas…",
    notes_filter_all:"Todas", notes_filter_pinned:"📌 Fijadas",
    notes_empty_title:"No se encontraron notas", notes_empty_desc:"Crea una nueva nota para empezar",
    note_updated:"Actualizado", note_general:"General",
    note_modal_new:"Nueva nota", note_modal_edit:"Editar nota",
    note_label_title:"Título *", note_label_folder:"Carpeta", note_label_tags:"Etiquetas (separadas por coma)", note_label_content:"Contenido *",
    note_placeholder_title:"Título de la nota…", note_placeholder_folder:"Trabajo, Estudio…", note_placeholder_tags:"react, reunión…", note_placeholder_content:"Escribe tu nota aquí…",
    note_pin_label:"📌 Fijar esta nota", note_pin:"Fijar", note_unpin:"Desfijar",
    confirm_delete_note:"¿Eliminar esta nota permanentemente?",
    tasks_title:"Tareas", tasks_new:"Nueva tarea", tasks_search:"Buscar tareas…",
    tasks_sort_deadline:"Ordenar: Fecha límite", tasks_sort_priority:"Ordenar: Prioridad", tasks_sort_newest:"Ordenar: Más reciente",
    tasks_filter_all:"Todas", tasks_filter_active:"Activas", tasks_filter_today:"Hoy", tasks_filter_overdue:"Vencidas", tasks_filter_completed:"Completadas",
    tasks_empty:"No se encontraron tareas",
    task_modal_new:"Nueva tarea", task_modal_edit:"Editar tarea",
    task_label_title:"Título *", task_label_desc:"Descripción", task_label_deadline:"Fecha límite", task_label_priority:"Prioridad", task_label_status:"Estado", task_label_project:"Vincular a proyecto",
    task_placeholder_title:"Título de la tarea…", task_placeholder_desc:"Detalles opcionales…", task_no_project:"Ninguno",
    priority_high:"Alta", priority_medium:"Media", priority_low:"Baja",
    status_todo:"Por hacer", status_inprogress:"En progreso", status_completed:"Completado",
    due_today:"Vence hoy", due_tomorrow:"Vence mañana", due_in_days:"Vence en {n} días", overdue_days:"Vencida hace {n} día(s)",
    confirm_delete_task:"¿Eliminar esta tarea permanentemente?",
    cal_title:"Calendario inteligente", cal_new_event:"Nuevo evento", cal_today:"Hoy",
    cal_month:"Mes", cal_week:"Semana", cal_day:"Día",
    cal_days_short:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],
    cal_nothing:"Nada programado para este día", cal_add_event:"Añadir evento", cal_tasks_due:"Tareas vencidas", cal_no_events:"Nada este día",
    event_modal_new:"Nuevo evento", event_modal_edit:"Editar evento",
    event_label_title:"Título *", event_label_desc:"Descripción", event_label_date:"Fecha *", event_label_cat:"Categoría", event_label_start:"Hora de inicio", event_label_end:"Hora de fin",
    event_cat_personal:"Personal", event_cat_work:"Trabajo", event_cat_study:"Estudio", event_cat_business:"Negocios",
    confirm_delete_event:"¿Eliminar este evento?",
    proj_title:"Proyectos", proj_new:"Nuevo", proj_view_list:"Lista", proj_view_kanban:"Kanban", proj_empty:"Aún no hay proyectos",
    proj_tasks:"tareas", proj_due:"Vence",
    proj_modal_new:"Nuevo proyecto", proj_modal_edit:"Editar proyecto",
    proj_label_name:"Nombre *", proj_label_desc:"Descripción", proj_label_start:"Fecha de inicio", proj_label_end:"Fecha objetivo", proj_label_status:"Estado", proj_label_color:"Color",
    proj_linked_tasks:"Tareas vinculadas",
    confirm_delete_project:"¿Eliminar este proyecto? Las tareas vinculadas se desvinculan.",
    ai_title:"Asistente IA", ai_subtitle:"Modo demo — respuestas simuladas basadas en tus datos", ai_demo_badge:"Demo",
    ai_placeholder:"Pregúntame cualquier cosa sobre tus notas y tareas…", ai_send:"Enviar",
    ai_suggestions:["Resumir mis notas","Convertir esta nota en tareas","Ayúdame a planificar mi día","¿Qué fechas límite se acercan?","Dividir mi proyecto en tareas pequeñas","¿Qué tareas están vencidas?","¿En qué debo enfocarme hoy?"],
    ai_welcome_notes:"notas", ai_welcome_tasks:"tareas",
    ai_no_notes:"No se encontraron notas. ¡Crea una primero!", ai_no_projects:"No se encontraron proyectos activos.",
    ai_no_overdue:"Sin tareas vencidas. ¡Buen trabajo! 🎉",
    ai_tip_pomodoro:"💡 Prueba la técnica Pomodoro: 25 min trabajo, 5 min descanso.",
    ai_note_label:"Nota:",
    focus_title:"Foco y hábitos",
    pomodoro_title:"🍅 Temporizador Pomodoro", pomodoro_sessions:"Sesiones hoy:", pomodoro_work:"Trabajo ({n}m)", pomodoro_break:"Descanso ({n}m)", pomodoro_long:"Largo ({n}m)",
    pomodoro_start:"▶ Iniciar", pomodoro_pause:"⏸ Pausar", pomodoro_reset:"↺ Reiniciar",
    pomodoro_done_work:"¡Sesión de trabajo completada! 🎉", pomodoro_done_break:"¡Tiempo de descanso terminado!",
    habit_title:"📋 Seguimiento de hábitos", habit_add:"+ Añadir", habit_empty:"Añade hábitos para rastrear",
    habit_modal_new:"Añadir hábito", habit_label_name:"Nombre del hábito *", habit_label_icon:"Ícono (emoji)", habit_label_color:"Color", habit_placeholder:"Ejercicio matutino…",
    week_stats_title:"📊 Progreso esta semana", week_pomodoros:"Pomodoros", week_done:"Completadas", week_habits:"Hábitos", week_notes:"Notas",
    settings_title:"Ajustes", settings_profile:"👤 Perfil", settings_name_label:"Nombre para mostrar", settings_appearance:"🎨 Apariencia",
    settings_dark_mode:"Modo oscuro", settings_dark_desc:"Cambiar entre tema claro y oscuro",
    settings_lang:"🌐 Idioma", settings_lang_label:"Seleccionar idioma",
    settings_pomodoro:"🍅 Ajustes de Pomodoro", settings_pomo_work:"Trabajo (min)", settings_pomo_break:"Descanso (min)", settings_pomo_long:"Descanso largo (min)",
    settings_data:"💾 Gestión de datos", settings_export:"Exportar datos", settings_export_desc:"Descargar todos los datos como JSON",
    settings_clear:"Borrar todos los datos", settings_clear_desc:"Eliminar todas las notas, tareas, eventos y proyectos",
    settings_about:"Versión 1.0 · Datos almacenados localmente en tu navegador",
    settings_no_account:"Sin cuenta requerida · Funciona sin conexión",
    confirm_clear_all:"¡Esto eliminará TODAS tus notas, tareas, eventos y proyectos. No se puede deshacer!",
    // Study Mode
    nav_study:"Modo Estudio", study_nav_badge:"Nuevo",
    study_title:"Modo Estudio", study_subtitle:"Transforma tus notas en materiales de aprendizaje interactivos",
    study_btn_start:"Comenzar a estudiar", study_btn_flashcard:"Crear tarjetas", study_btn_quiz:"Generar cuestionario",
    study_empty_title:"Sin materiales de estudio", study_empty_desc:"Selecciona notas para comenzar tu sesión de estudio.",
    study_sets:"Conjuntos de estudio", study_recent:"Materiales recientes", study_continue:"Continuar aprendiendo",
    study_upcoming:"Próximas sesiones", study_review:"Necesita revisión",
    study_progress_title:"Progreso de aprendizaje",
    study_stat_sessions:"Sesiones completadas", study_stat_cards:"Tarjetas revisadas", study_stat_quizzes:"Cuestionarios completados", study_stat_avg:"Puntuación media",
    study_select_notes_title:"Seleccionar notas", study_select_notes_desc:"Elige notas como material de estudio",
    study_search_notes:"Buscar notas…", study_no_notes:"No hay notas disponibles",
    study_btn_create_set:"Crear conjunto", study_set_name_label:"Nombre del conjunto", study_set_name_ph:"ej. Examen Bio Capítulo 3…",
    fc_title:"Tarjetas de memoria", fc_front:"Frente", fc_back:"Reverso", fc_add:"+ Agregar tarjeta",
    fc_flip:"Voltear", fc_prev:"Anterior", fc_next:"Siguiente", fc_shuffle:"Mezclar",
    fc_mastered:"Dominado ✓", fc_practice:"Necesita práctica", fc_of:"de",
    fc_empty:"Este conjunto no tiene tarjetas.", fc_add_manual:"Agregar tarjeta manual",
    fc_front_label:"Pregunta / Término", fc_back_label:"Respuesta / Explicación",
    fc_front_ph:"Ingresa pregunta o término…", fc_back_ph:"Ingresa respuesta o explicación…",
    fc_done_title:"¡Sesión completa!", fc_done_mastered:"Dominados", fc_done_practice:"Necesita práctica",
    fc_btn_review:"Revisar no dominados", fc_btn_restart:"Reiniciar",
    quiz_title:"Cuestionario", quiz_generate:"Generar cuestionario", quiz_source:"Material fuente",
    quiz_type:"Tipo de pregunta", quiz_type_mc:"Opción múltiple", quiz_type_tf:"Verdadero/Falso", quiz_type_sa:"Respuesta corta",
    quiz_count:"Número de preguntas", quiz_difficulty:"Dificultad",
    quiz_diff_easy:"Fácil", quiz_diff_medium:"Medio", quiz_diff_hard:"Difícil",
    quiz_btn_start:"Iniciar cuestionario", quiz_of:"de", quiz_correct:"Correcto", quiz_wrong:"Incorrecto",
    quiz_submit:"Enviar respuesta", quiz_next:"Siguiente pregunta", quiz_your_answer:"Tu respuesta:",
    quiz_correct_answer:"Respuesta correcta:", quiz_explanation:"Explicación:",
    quiz_result_title:"Resultados del cuestionario", quiz_score:"Tu puntuación", quiz_passed:"¡Aprobado! 🎉", quiz_failed:"Sigue estudiando",
    quiz_btn_retry:"Reintentar", quiz_btn_review:"Revisar respuestas", quiz_btn_back:"Volver al modo estudio",
    quiz_review_title:"Revisar respuestas",
    session_title:"Sesión de estudio", session_mode_fc:"Modo tarjetas", session_mode_quiz:"Modo cuestionario",
    session_duration:"Duración", session_min:"min",
    session_btn_start:"Iniciar sesión", session_btn_pause:"Pausar", session_btn_resume:"Reanudar", session_btn_end:"Finalizar sesión",
    session_progress:"Progreso de sesión", session_summary:"Resumen de sesión",
    session_summary_duration:"Duración del estudio", session_summary_cards:"Tarjetas revisadas", session_summary_score:"Puntuación del cuestionario",
    study_history_title:"Historial de estudio", study_history_empty:"Aún no hay sesiones de estudio registradas.",
    study_schedule_title:"Programar sesión", study_schedule_date:"Fecha", study_schedule_time:"Hora",
    study_schedule_btn:"Guardar en calendario",
    toast_study_set_created:"Conjunto de estudio creado", toast_study_card_added:"Tarjeta agregada",
    toast_study_card_deleted:"Tarjeta eliminada", toast_study_set_deleted:"Conjunto de estudio eliminado",
    toast_session_saved:"Sesión de estudio guardada",
    confirm_delete_study_set:"¿Eliminar este conjunto? Se eliminarán todas las tarjetas.",
    study_rename_set:"Renombrar conjunto", study_rename_ph:"Nuevo nombre…",
    toast_study_set_renamed:"Conjunto renombrado", confirm_delete_card:"¿Eliminar esta tarjeta?",
  },

  /* ── Français ──────────────────────────────────────────── */
  fr: {
    lang_name: "Français",
    locale: "fr-FR",
    nav_features:"Fonctionnalités", nav_how:"Comment ça marche", nav_about:"À propos",
    nav_explore:"Explorer", nav_get_started:"Commencer",
    hero_badge:"Productivité propulsée par l'IA",
    hero_title1:"Vos notes, tâches & temps —", hero_title2:"Tout en un seul endroit.",
    hero_desc:"NoteFlow AI regroupe notes intelligentes, gestion des tâches, suivi des échéances, planification de calendrier et assistant IA.",
    hero_cta:"Commencer gratuitement →", hero_explore:"Explorer les fonctions",
    features_eyebrow:"Tout ce dont vous avez besoin", features_title:"Des fonctionnalités puissantes pour une productivité moderne",
    features_desc:"Tous les outils pour capturer des idées, gérer des tâches, suivre les délais et rester productif.",
    feat_notes_title:"Notes intelligentes", feat_notes_desc:"Capturez idées et notes de réunion avec dossiers, étiquettes et listes.",
    feat_tasks_title:"Tâches et délais", feat_tasks_desc:"Créez des tâches avec niveaux de priorité, dates d'échéance et statuts.",
    feat_cal_title:"Calendrier intelligent", feat_cal_desc:"Vues mensuelle, hebdomadaire et journalière. Événements et délais ensemble.",
    feat_ai_title:"Assistant IA", feat_ai_desc:"Résumez des notes, convertissez-les en tâches, planifiez votre journée.",
    feat_proj_title:"Gestion de projets", feat_proj_desc:"Tableaux Kanban, suivi de progression et chronologies de projets.",
    feat_focus_title:"Suivi de productivité", feat_focus_desc:"Minuteur Pomodoro, suivi des habitudes et mode concentration.",
    how_eyebrow:"Processus simple", how_title:"Comment ça marche",
    how_s1_title:"Créez vos notes", how_s1_desc:"Capturez idées, comptes rendus et informations importantes.",
    how_s2_title:"Organisez tâches et délais", how_s2_desc:"Transformez les notes en tâches, assignez priorités et délais.",
    how_s3_title:"Planifiez et restez productif", how_s3_desc:"Utilisez le calendrier, l'assistant IA et les outils de concentration.",
    benefits_eyebrow:"Pourquoi NoteFlow AI", benefits_title1:"Tout organisé.", benefits_title2:"Rien d'oublié.",
    ben1_title:"Toutes vos notes et tâches au même endroit", ben1_desc:"Fini de jongler entre les apps. Tout est unifié.",
    ben2_title:"Des délais vraiment visibles", ben2_desc:"Le calendrier visuel et les alertes vous gardent en avance.",
    ben3_title:"Planification intelligente du temps", ben3_desc:"L'IA vous aide à planifier votre journée selon vos tâches et priorités.",
    ben4_title:"Des projets que vous pouvez gérer", ben4_desc:"Tableaux Kanban et suivi pour vos projets de travail et d'études.",
    stat_notes:"Notes créées", stat_tasks:"Tâches accomplies", stat_proj:"Projets en cours", stat_score:"score de productivité cette semaine",
    cta_title:"Prêt à reprendre le contrôle de votre productivité ?",
    cta_desc:"Rejoignez des milliers d'utilisateurs qui organisent leurs notes, tâches et temps avec NoteFlow AI.",
    cta_btn:"Commencer à organiser →",
    footer_desc:"Notes intelligentes pour l'ère moderne. Capturez, organisez et transformez vos idées en actions.",
    footer_product:"Produit", footer_features:"Fonctionnalités", footer_how:"Comment ça marche", footer_launch:"Lancer l'app",
    footer_usecases:"Cas d'usage", footer_students:"Étudiants", footer_freelancers:"Freelancers", footer_teams:"Équipes",
    footer_info:"Infos", footer_local:"Données stockées localement", footer_no_account:"Sans compte requis", footer_offline:"Fonctionne hors ligne",
    footer_copy:"© 2025 NoteFlow AI — Smart Notes. Tous droits réservés.",
    nav_dashboard:"Tableau de bord", nav_notes:"Mes notes", nav_tasks:"Tâches", nav_calendar:"Calendrier",
    nav_projects:"Projets", nav_ai:"Assistant IA", nav_focus:"Focus et habitudes", nav_settings:"Paramètres", nav_local_ws:"Espace de travail local",
    search_placeholder:"Rechercher notes et tâches…", btn_new:"Nouveau",
    quick_create:"Création rapide", quick_note:"Nouvelle note", quick_task:"Nouvelle tâche", quick_event:"Nouvel événement", quick_project:"Nouveau projet",
    confirm_delete_title:"Confirmer la suppression", btn_cancel:"Annuler", btn_delete:"Supprimer", btn_save:"Enregistrer", btn_close:"Fermer", btn_edit:"Modifier", btn_add:"Ajouter", btn_export:"Exporter", btn_clear:"Tout effacer",
    toast_note_created:"Note créée", toast_note_updated:"Note mise à jour", toast_note_deleted:"Note supprimée",
    toast_task_created:"Tâche créée", toast_task_updated:"Tâche mise à jour", toast_task_deleted:"Tâche supprimée",
    toast_task_done:"Tâche terminée ! 🎉", toast_task_reopened:"Tâche rouverte",
    toast_event_created:"Événement créé", toast_event_updated:"Événement mis à jour", toast_event_deleted:"Événement supprimé",
    toast_project_created:"Projet créé", toast_project_updated:"Projet mis à jour", toast_project_deleted:"Projet supprimé",
    toast_note_pinned:"Note épinglée", toast_note_unpinned:"Note désépinglée", toast_exported:"Données exportées", toast_habit_added:"Habitude ajoutée", toast_lang_changed:"Langue mise à jour",
    err_title_required:"Le titre est obligatoire", err_fields_required:"Le titre et le contenu sont obligatoires",
    err_date_required:"Le titre et la date sont obligatoires", err_project_required:"Le nom du projet est obligatoire",
    dash_greeting_morning:"Bonjour", dash_greeting_afternoon:"Bon après-midi", dash_greeting_evening:"Bonsoir",
    dash_events_today:"{n} événement(s) aujourd'hui",
    dash_active_tasks:"Tâches actives", dash_completed:"Terminées", dash_projects:"Projets", dash_overdue_tasks:"Tâches en retard",
    dash_agenda_title:"Agenda du jour", dash_agenda_empty:"Pas d'événements aujourd'hui",
    dash_deadlines_title:"Prochaines échéances", dash_deadlines_empty:"Pas d'échéances prochaines",
    dash_notes_title:"Notes récentes", dash_notes_empty:"Pas encore de notes",
    dash_proj_title:"Projets actifs", dash_proj_empty:"Pas de projets actifs",
    dash_view_calendar:"Voir le calendrier →", dash_all_tasks:"Toutes les tâches →", dash_all_notes:"Toutes les notes →", dash_all_projects:"Tous les projets →",
    dash_notes_count:"Notes", dash_updated:"Mis à jour",
    notes_title:"Mes notes", notes_new:"Nouvelle note", notes_search:"Rechercher des notes…",
    notes_filter_all:"Toutes", notes_filter_pinned:"📌 Épinglées",
    notes_empty_title:"Aucune note trouvée", notes_empty_desc:"Créez une nouvelle note pour commencer",
    note_updated:"Mis à jour", note_general:"Général",
    note_modal_new:"Nouvelle note", note_modal_edit:"Modifier la note",
    note_label_title:"Titre *", note_label_folder:"Dossier", note_label_tags:"Étiquettes (séparées par virgule)", note_label_content:"Contenu *",
    note_placeholder_title:"Titre de la note…", note_placeholder_folder:"Travail, Études…", note_placeholder_tags:"react, réunion…", note_placeholder_content:"Écrivez votre note ici…",
    note_pin_label:"📌 Épingler cette note", note_pin:"Épingler", note_unpin:"Désépingler",
    confirm_delete_note:"Supprimer cette note définitivement ?",
    tasks_title:"Tâches", tasks_new:"Nouvelle tâche", tasks_search:"Rechercher des tâches…",
    tasks_sort_deadline:"Trier : Échéance", tasks_sort_priority:"Trier : Priorité", tasks_sort_newest:"Trier : Plus récent",
    tasks_filter_all:"Toutes", tasks_filter_active:"Actives", tasks_filter_today:"Aujourd'hui", tasks_filter_overdue:"En retard", tasks_filter_completed:"Terminées",
    tasks_empty:"Aucune tâche trouvée",
    task_modal_new:"Nouvelle tâche", task_modal_edit:"Modifier la tâche",
    task_label_title:"Titre *", task_label_desc:"Description", task_label_deadline:"Échéance", task_label_priority:"Priorité", task_label_status:"Statut", task_label_project:"Lier au projet",
    task_placeholder_title:"Titre de la tâche…", task_placeholder_desc:"Détails optionnels…", task_no_project:"Aucun",
    priority_high:"Haute", priority_medium:"Moyenne", priority_low:"Basse",
    status_todo:"À faire", status_inprogress:"En cours", status_completed:"Terminé",
    due_today:"Échéance aujourd'hui", due_tomorrow:"Échéance demain", due_in_days:"Échéance dans {n} jours", overdue_days:"En retard de {n} jour(s)",
    confirm_delete_task:"Supprimer cette tâche définitivement ?",
    cal_title:"Calendrier intelligent", cal_new_event:"Nouvel événement", cal_today:"Aujourd'hui",
    cal_month:"Mois", cal_week:"Semaine", cal_day:"Jour",
    cal_days_short:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],
    cal_nothing:"Rien de prévu ce jour", cal_add_event:"Ajouter un événement", cal_tasks_due:"Tâches dues", cal_no_events:"Rien ce jour-là",
    event_modal_new:"Nouvel événement", event_modal_edit:"Modifier l'événement",
    event_label_title:"Titre *", event_label_desc:"Description", event_label_date:"Date *", event_label_cat:"Catégorie", event_label_start:"Heure de début", event_label_end:"Heure de fin",
    event_cat_personal:"Personnel", event_cat_work:"Travail", event_cat_study:"Études", event_cat_business:"Affaires",
    confirm_delete_event:"Supprimer cet événement ?",
    proj_title:"Projets", proj_new:"Nouveau", proj_view_list:"Liste", proj_view_kanban:"Kanban", proj_empty:"Pas encore de projets",
    proj_tasks:"tâches", proj_due:"Fin",
    proj_modal_new:"Nouveau projet", proj_modal_edit:"Modifier le projet",
    proj_label_name:"Nom *", proj_label_desc:"Description", proj_label_start:"Date de début", proj_label_end:"Date cible", proj_label_status:"Statut", proj_label_color:"Couleur",
    proj_linked_tasks:"Tâches liées",
    confirm_delete_project:"Supprimer ce projet ? Les tâches liées seront dissociées.",
    ai_title:"Assistant IA", ai_subtitle:"Mode démo — réponses simulées basées sur vos données", ai_demo_badge:"Démo",
    ai_placeholder:"Posez-moi une question sur vos notes et tâches…", ai_send:"Envoyer",
    ai_suggestions:["Résumer mes notes","Convertir cette note en tâches","M'aider à planifier ma journée","Quelles échéances approchent ?","Diviser mon projet en petites tâches","Quelles tâches sont en retard ?","Sur quoi me concentrer aujourd'hui ?"],
    ai_welcome_notes:"notes", ai_welcome_tasks:"tâches",
    ai_no_notes:"Aucune note trouvée. Créez-en une d'abord !", ai_no_projects:"Aucun projet actif trouvé.",
    ai_no_overdue:"Aucune tâche en retard. Excellent travail ! 🎉",
    ai_tip_pomodoro:"💡 Essayez la technique Pomodoro : 25 min travail, 5 min pause.",
    ai_note_label:"Note :",
    focus_title:"Focus et habitudes",
    pomodoro_title:"🍅 Minuteur Pomodoro", pomodoro_sessions:"Sessions aujourd'hui :", pomodoro_work:"Travail ({n}m)", pomodoro_break:"Pause ({n}m)", pomodoro_long:"Longue ({n}m)",
    pomodoro_start:"▶ Démarrer", pomodoro_pause:"⏸ Pause", pomodoro_reset:"↺ Réinitialiser",
    pomodoro_done_work:"Session de travail terminée ! 🎉", pomodoro_done_break:"La pause est terminée !",
    habit_title:"📋 Suivi des habitudes", habit_add:"+ Ajouter", habit_empty:"Ajoutez des habitudes à suivre",
    habit_modal_new:"Ajouter une habitude", habit_label_name:"Nom de l'habitude *", habit_label_icon:"Icône (emoji)", habit_label_color:"Couleur", habit_placeholder:"Exercice matinal…",
    week_stats_title:"📊 Progrès cette semaine", week_pomodoros:"Pomodoros", week_done:"Terminées", week_habits:"Habitudes", week_notes:"Notes",
    settings_title:"Paramètres", settings_profile:"👤 Profil", settings_name_label:"Nom affiché", settings_appearance:"🎨 Apparence",
    settings_dark_mode:"Mode sombre", settings_dark_desc:"Basculer entre thème clair et sombre",
    settings_lang:"🌐 Langue", settings_lang_label:"Sélectionner la langue",
    settings_pomodoro:"🍅 Paramètres Pomodoro", settings_pomo_work:"Travail (min)", settings_pomo_break:"Pause (min)", settings_pomo_long:"Longue pause (min)",
    settings_data:"💾 Gestion des données", settings_export:"Exporter les données", settings_export_desc:"Télécharger toutes les données en JSON",
    settings_clear:"Effacer toutes les données", settings_clear_desc:"Supprimer toutes les notes, tâches, événements et projets",
    settings_about:"Version 1.0 · Données stockées localement dans votre navigateur",
    settings_no_account:"Sans compte requis · Fonctionne hors ligne",
    confirm_clear_all:"Ceci supprimera TOUTES vos notes, tâches, événements et projets. Impossible à annuler !",
    // Study Mode
    nav_study:"Mode Étude", study_nav_badge:"Nouveau",
    study_title:"Mode Étude", study_subtitle:"Transformez vos notes en matériaux d'apprentissage interactifs",
    study_btn_start:"Commencer à étudier", study_btn_flashcard:"Créer des fiches", study_btn_quiz:"Générer un quiz",
    study_empty_title:"Pas encore de matériaux", study_empty_desc:"Sélectionnez des notes pour commencer votre session d'étude.",
    study_sets:"Ensembles d'étude", study_recent:"Matériaux récents", study_continue:"Continuer à apprendre",
    study_upcoming:"Sessions à venir", study_review:"À revoir",
    study_progress_title:"Progression d'apprentissage",
    study_stat_sessions:"Sessions terminées", study_stat_cards:"Fiches révisées", study_stat_quizzes:"Quiz complétés", study_stat_avg:"Score moyen",
    study_select_notes_title:"Sélectionner des notes", study_select_notes_desc:"Choisissez des notes comme matériau d'étude",
    study_search_notes:"Rechercher des notes…", study_no_notes:"Aucune note disponible",
    study_btn_create_set:"Créer un ensemble", study_set_name_label:"Nom de l'ensemble", study_set_name_ph:"ex. Exam Bio Chapitre 3…",
    fc_title:"Fiches de révision", fc_front:"Recto", fc_back:"Verso", fc_add:"+ Ajouter une fiche",
    fc_flip:"Retourner", fc_prev:"Précédent", fc_next:"Suivant", fc_shuffle:"Mélanger",
    fc_mastered:"Maîtrisé ✓", fc_practice:"À pratiquer", fc_of:"sur",
    fc_empty:"Cet ensemble n'a pas encore de fiches.", fc_add_manual:"Ajouter manuellement",
    fc_front_label:"Question / Terme", fc_back_label:"Réponse / Explication",
    fc_front_ph:"Entrez une question ou un terme…", fc_back_ph:"Entrez une réponse ou une explication…",
    fc_done_title:"Session terminée !", fc_done_mastered:"Maîtrisés", fc_done_practice:"À pratiquer",
    fc_btn_review:"Revoir les non-maîtrisés", fc_btn_restart:"Recommencer",
    quiz_title:"Quiz", quiz_generate:"Générer un quiz", quiz_source:"Source du matériau",
    quiz_type:"Type de question", quiz_type_mc:"Choix multiple", quiz_type_tf:"Vrai/Faux", quiz_type_sa:"Réponse courte",
    quiz_count:"Nombre de questions", quiz_difficulty:"Difficulté",
    quiz_diff_easy:"Facile", quiz_diff_medium:"Moyen", quiz_diff_hard:"Difficile",
    quiz_btn_start:"Commencer le quiz", quiz_of:"sur", quiz_correct:"Correct", quiz_wrong:"Incorrect",
    quiz_submit:"Soumettre la réponse", quiz_next:"Question suivante", quiz_your_answer:"Votre réponse :",
    quiz_correct_answer:"Bonne réponse :", quiz_explanation:"Explication :",
    quiz_result_title:"Résultats du quiz", quiz_score:"Votre score", quiz_passed:"Réussi ! 🎉", quiz_failed:"Continuez à étudier",
    quiz_btn_retry:"Réessayer", quiz_btn_review:"Revoir les réponses", quiz_btn_back:"Retour au mode étude",
    quiz_review_title:"Revoir les réponses",
    session_title:"Session d'étude", session_mode_fc:"Mode fiches", session_mode_quiz:"Mode quiz",
    session_duration:"Durée", session_min:"min",
    session_btn_start:"Démarrer la session", session_btn_pause:"Pause", session_btn_resume:"Reprendre", session_btn_end:"Terminer la session",
    session_progress:"Progression de la session", session_summary:"Résumé de la session",
    session_summary_duration:"Durée d'étude", session_summary_cards:"Fiches révisées", session_summary_score:"Score du quiz",
    study_history_title:"Historique d'étude", study_history_empty:"Aucune session d'étude enregistrée.",
    study_schedule_title:"Planifier une session", study_schedule_date:"Date", study_schedule_time:"Heure",
    study_schedule_btn:"Enregistrer dans le calendrier",
    toast_study_set_created:"Ensemble d'étude créé", toast_study_card_added:"Fiche ajoutée",
    toast_study_card_deleted:"Fiche supprimée", toast_study_set_deleted:"Ensemble d'étude supprimé",
    toast_session_saved:"Session d'étude sauvegardée",
    confirm_delete_study_set:"Supprimer cet ensemble ? Toutes les fiches seront également supprimées.",
    study_rename_set:"Renommer l'ensemble", study_rename_ph:"Nouveau nom…",
    toast_study_set_renamed:"Ensemble renommé", confirm_delete_card:"Supprimer cette fiche ?",
  },

  /* ── 简体中文 ──────────────────────────────────────────── */
  "zh-CN": {
    lang_name: "简体中文",
    locale: "zh-CN",
    nav_features:"功能", nav_how:"使用方法", nav_about:"关于",
    nav_explore:"探索功能", nav_get_started:"立即开始",
    hero_badge:"AI 驱动的生产力工具",
    hero_title1:"您的笔记、任务与时间 —", hero_title2:"尽在一处。",
    hero_desc:"NoteFlow AI 将智能笔记、任务管理、截止日期跟踪、日历规划和 AI 助手融为一体，让您专注于最重要的事情。",
    hero_cta:"免费开始 →", hero_explore:"探索功能",
    features_eyebrow:"您所需的一切", features_title:"面向现代生产力的强大功能",
    features_desc:"捕捉想法、管理任务、跟踪截止日期并保持高效所需的所有工具。",
    feat_notes_title:"智能笔记", feat_notes_desc:"使用文件夹、标签、图钉和清单捕捉想法与会议记录。",
    feat_tasks_title:"任务与截止日期", feat_tasks_desc:"创建带有优先级、截止日期和状态的任务。",
    feat_cal_title:"智能日历", feat_cal_desc:"月、周、日视图。事件和任务截止日期一并显示。",
    feat_ai_title:"AI 助手", feat_ai_desc:"摘要笔记、转换为任务、规划一天并获取智能建议。",
    feat_proj_title:"项目管理", feat_proj_desc:"看板、进度跟踪和项目时间线。",
    feat_focus_title:"生产力追踪", feat_focus_desc:"番茄时钟、习惯追踪和专注模式。",
    how_eyebrow:"简单流程", how_title:"使用方法",
    how_s1_title:"创建笔记", how_s1_desc:"捕捉想法、会议记录和重要信息。",
    how_s2_title:"整理任务和截止日期", how_s2_desc:"将笔记转换为可执行任务，设置优先级和截止日期。",
    how_s3_title:"规划并保持高效", how_s3_desc:"使用日历、AI 助手和专注工具规划您的一天。",
    benefits_eyebrow:"为什么选择 NoteFlow AI", benefits_title1:"一切井然有序。", benefits_title2:"不再遗忘任何事。",
    ben1_title:"所有笔记和任务集中一处", ben1_desc:"不再需要切换应用。您所需的一切都已整合。",
    ben2_title:"截止日期清晰可见", ben2_desc:"可视化日历和截止日期提醒让您时刻保持领先。",
    ben3_title:"智能时间规划", ben3_desc:"AI 根据任务、截止日期和优先级帮您规划一天。",
    ben4_title:"可管理的项目", ben4_desc:"看板和进度跟踪，适用于工作、学习和自由职业项目。",
    stat_notes:"已创建笔记", stat_tasks:"已完成任务", stat_proj:"进行中项目", stat_score:"本周生产力分数",
    cta_title:"准备好掌控您的生产力了吗？",
    cta_desc:"加入数千名使用 NoteFlow AI 管理笔记、任务和时间的用户。",
    cta_btn:"立即开始整理 →",
    footer_desc:"面向现代时代的智能笔记。捕捉、整理并将想法转化为行动。",
    footer_product:"产品", footer_features:"功能", footer_how:"使用方法", footer_launch:"打开应用",
    footer_usecases:"使用场景", footer_students:"学生", footer_freelancers:"自由职业者", footer_teams:"团队",
    footer_info:"信息", footer_local:"数据存储在您的浏览器中", footer_no_account:"无需账户", footer_offline:"可离线使用",
    footer_copy:"© 2025 NoteFlow AI — Smart Notes。版权所有。数据存储在您的浏览器本地。",
    nav_dashboard:"仪表板", nav_notes:"我的笔记", nav_tasks:"任务", nav_calendar:"日历",
    nav_projects:"项目", nav_ai:"AI 助手", nav_focus:"专注与习惯", nav_settings:"设置", nav_local_ws:"本地工作区",
    search_placeholder:"搜索笔记和任务…", btn_new:"新建",
    quick_create:"快速创建", quick_note:"新建笔记", quick_task:"新建任务", quick_event:"新建事件", quick_project:"新建项目",
    confirm_delete_title:"确认删除", btn_cancel:"取消", btn_delete:"删除", btn_save:"保存", btn_close:"关闭", btn_edit:"编辑", btn_add:"添加", btn_export:"导出", btn_clear:"清除全部",
    toast_note_created:"笔记已创建", toast_note_updated:"笔记已更新", toast_note_deleted:"笔记已删除",
    toast_task_created:"任务已创建", toast_task_updated:"任务已更新", toast_task_deleted:"任务已删除",
    toast_task_done:"任务完成！🎉", toast_task_reopened:"任务已重新打开",
    toast_event_created:"事件已创建", toast_event_updated:"事件已更新", toast_event_deleted:"事件已删除",
    toast_project_created:"项目已创建", toast_project_updated:"项目已更新", toast_project_deleted:"项目已删除",
    toast_note_pinned:"笔记已置顶", toast_note_unpinned:"笔记已取消置顶", toast_exported:"数据已导出", toast_habit_added:"习惯已添加", toast_lang_changed:"语言已更新",
    err_title_required:"标题为必填项", err_fields_required:"标题和内容为必填项",
    err_date_required:"标题和日期为必填项", err_project_required:"项目名称为必填项",
    dash_greeting_morning:"早上好", dash_greeting_afternoon:"下午好", dash_greeting_evening:"晚上好",
    dash_events_today:"今天 {n} 个事件",
    dash_active_tasks:"进行中任务", dash_completed:"已完成", dash_projects:"项目", dash_overdue_tasks:"逾期任务",
    dash_agenda_title:"今日议程", dash_agenda_empty:"今天没有事件",
    dash_deadlines_title:"即将到期", dash_deadlines_empty:"暂无即将到期的任务",
    dash_notes_title:"最近笔记", dash_notes_empty:"暂无笔记",
    dash_proj_title:"进行中项目", dash_proj_empty:"暂无进行中项目",
    dash_view_calendar:"查看日历 →", dash_all_tasks:"所有任务 →", dash_all_notes:"所有笔记 →", dash_all_projects:"所有项目 →",
    dash_notes_count:"笔记", dash_updated:"更新于",
    notes_title:"我的笔记", notes_new:"新建笔记", notes_search:"搜索笔记…",
    notes_filter_all:"全部", notes_filter_pinned:"📌 已置顶",
    notes_empty_title:"未找到笔记", notes_empty_desc:"创建新笔记开始使用",
    note_updated:"更新于", note_general:"通用",
    note_modal_new:"新建笔记", note_modal_edit:"编辑笔记",
    note_label_title:"标题 *", note_label_folder:"文件夹", note_label_tags:"标签（逗号分隔）", note_label_content:"内容 *",
    note_placeholder_title:"笔记标题…", note_placeholder_folder:"工作、学习…", note_placeholder_tags:"react、会议…", note_placeholder_content:"在此写下您的笔记…",
    note_pin_label:"📌 置顶此笔记", note_pin:"置顶", note_unpin:"取消置顶",
    confirm_delete_note:"永久删除此笔记？",
    tasks_title:"任务", tasks_new:"新建任务", tasks_search:"搜索任务…",
    tasks_sort_deadline:"排序：截止日期", tasks_sort_priority:"排序：优先级", tasks_sort_newest:"排序：最新",
    tasks_filter_all:"全部", tasks_filter_active:"进行中", tasks_filter_today:"今天", tasks_filter_overdue:"逾期", tasks_filter_completed:"已完成",
    tasks_empty:"未找到任务",
    task_modal_new:"新建任务", task_modal_edit:"编辑任务",
    task_label_title:"标题 *", task_label_desc:"描述", task_label_deadline:"截止日期", task_label_priority:"优先级", task_label_status:"状态", task_label_project:"关联项目",
    task_placeholder_title:"任务标题…", task_placeholder_desc:"可选详情…", task_no_project:"无",
    priority_high:"高", priority_medium:"中", priority_low:"低",
    status_todo:"待处理", status_inprogress:"进行中", status_completed:"已完成",
    due_today:"今天到期", due_tomorrow:"明天到期", due_in_days:"{n} 天后到期", overdue_days:"逾期 {n} 天",
    confirm_delete_task:"永久删除此任务？",
    cal_title:"智能日历", cal_new_event:"新建事件", cal_today:"今天",
    cal_month:"月", cal_week:"周", cal_day:"日",
    cal_days_short:["日","一","二","三","四","五","六"],
    cal_nothing:"今天没有日程", cal_add_event:"添加事件", cal_tasks_due:"到期任务", cal_no_events:"当天没有内容",
    event_modal_new:"新建事件", event_modal_edit:"编辑事件",
    event_label_title:"标题 *", event_label_desc:"描述", event_label_date:"日期 *", event_label_cat:"类别", event_label_start:"开始时间", event_label_end:"结束时间",
    event_cat_personal:"个人", event_cat_work:"工作", event_cat_study:"学习", event_cat_business:"商务",
    confirm_delete_event:"删除此事件？",
    proj_title:"项目", proj_new:"新建", proj_view_list:"列表", proj_view_kanban:"看板", proj_empty:"暂无项目",
    proj_tasks:"任务", proj_due:"截止",
    proj_modal_new:"新建项目", proj_modal_edit:"编辑项目",
    proj_label_name:"名称 *", proj_label_desc:"描述", proj_label_start:"开始日期", proj_label_end:"目标日期", proj_label_status:"状态", proj_label_color:"颜色",
    proj_linked_tasks:"关联任务",
    confirm_delete_project:"删除此项目？关联任务将被解除关联。",
    ai_title:"AI 助手", ai_subtitle:"演示模式 — 基于您数据的模拟回复", ai_demo_badge:"演示",
    ai_placeholder:"询问关于您的笔记和任务的任何问题…", ai_send:"发送",
    ai_suggestions:["摘要我的笔记","将此笔记转换为任务","帮我规划今天","有哪些即将到期的任务？","将项目分解为小任务","哪些任务已逾期？","今天应该专注于什么？"],
    ai_welcome_notes:"笔记", ai_welcome_tasks:"任务",
    ai_no_notes:"未找到笔记。请先创建笔记！", ai_no_projects:"未找到进行中项目。",
    ai_no_overdue:"没有逾期任务。干得好！🎉",
    ai_tip_pomodoro:"💡 尝试番茄工作法：25 分钟工作，5 分钟休息。",
    ai_note_label:"笔记：",
    focus_title:"专注与习惯",
    pomodoro_title:"🍅 番茄时钟", pomodoro_sessions:"今日完成：", pomodoro_work:"工作 ({n}分)", pomodoro_break:"休息 ({n}分)", pomodoro_long:"长休 ({n}分)",
    pomodoro_start:"▶ 开始", pomodoro_pause:"⏸ 暂停", pomodoro_reset:"↺ 重置",
    pomodoro_done_work:"工作阶段完成！🎉", pomodoro_done_break:"休息时间结束！",
    habit_title:"📋 习惯追踪", habit_add:"+ 添加", habit_empty:"添加习惯以开始追踪",
    habit_modal_new:"添加习惯", habit_label_name:"习惯名称 *", habit_label_icon:"图标（emoji）", habit_label_color:"颜色", habit_placeholder:"晨练…",
    week_stats_title:"📊 本周进度", week_pomodoros:"番茄数", week_done:"已完成", week_habits:"习惯", week_notes:"笔记",
    settings_title:"设置", settings_profile:"👤 个人资料", settings_name_label:"显示名称", settings_appearance:"🎨 外观",
    settings_dark_mode:"深色模式", settings_dark_desc:"在浅色和深色主题之间切换",
    settings_lang:"🌐 语言", settings_lang_label:"选择语言",
    settings_pomodoro:"🍅 番茄时钟设置", settings_pomo_work:"工作（分钟）", settings_pomo_break:"休息（分钟）", settings_pomo_long:"长休息（分钟）",
    settings_data:"💾 数据管理", settings_export:"导出数据", settings_export_desc:"下载所有数据为 JSON",
    settings_clear:"清除所有数据", settings_clear_desc:"删除所有笔记、任务、事件和项目",
    settings_about:"版本 1.0 · 数据存储在您的浏览器本地",
    settings_no_account:"无需账户 · 可离线使用",
    confirm_clear_all:"这将删除您的全部笔记、任务、事件和项目，且无法撤销！",
    // Study Mode
    nav_study:"学习模式", study_nav_badge:"新",
    study_title:"学习模式", study_subtitle:"将您的笔记转化为互动学习材料",
    study_btn_start:"开始学习", study_btn_flashcard:"创建闪卡", study_btn_quiz:"生成测验",
    study_empty_title:"暂无学习材料", study_empty_desc:"选择笔记以开始您的学习会话。",
    study_sets:"学习套件", study_recent:"最近材料", study_continue:"继续学习",
    study_upcoming:"即将到来的课程", study_review:"需要复习",
    study_progress_title:"学习进度",
    study_stat_sessions:"已完成课程", study_stat_cards:"已复习卡片", study_stat_quizzes:"已完成测验", study_stat_avg:"平均分",
    study_select_notes_title:"选择笔记", study_select_notes_desc:"选择笔记作为学习材料",
    study_search_notes:"搜索笔记…", study_no_notes:"没有可用笔记",
    study_btn_create_set:"创建学习套件", study_set_name_label:"套件名称", study_set_name_ph:"例如 生物第三章考试…",
    fc_title:"闪卡", fc_front:"正面", fc_back:"背面", fc_add:"+ 添加卡片",
    fc_flip:"翻转", fc_prev:"上一张", fc_next:"下一张", fc_shuffle:"随机",
    fc_mastered:"已掌握 ✓", fc_practice:"需要练习", fc_of:"共",
    fc_empty:"此套件暂无闪卡。", fc_add_manual:"手动添加卡片",
    fc_front_label:"问题 / 术语", fc_back_label:"答案 / 解释",
    fc_front_ph:"输入问题或术语…", fc_back_ph:"输入答案或解释…",
    fc_done_title:"会话完成！", fc_done_mastered:"已掌握", fc_done_practice:"需要练习",
    fc_btn_review:"复习未掌握", fc_btn_restart:"重新开始",
    quiz_title:"测验", quiz_generate:"生成测验", quiz_source:"来源材料",
    quiz_type:"题型", quiz_type_mc:"选择题", quiz_type_tf:"判断题", quiz_type_sa:"简答题",
    quiz_count:"题目数量", quiz_difficulty:"难度",
    quiz_diff_easy:"简单", quiz_diff_medium:"中等", quiz_diff_hard:"困难",
    quiz_btn_start:"开始测验", quiz_of:"共", quiz_correct:"正确", quiz_wrong:"错误",
    quiz_submit:"提交答案", quiz_next:"下一题", quiz_your_answer:"您的答案：",
    quiz_correct_answer:"正确答案：", quiz_explanation:"解释：",
    quiz_result_title:"测验结果", quiz_score:"您的分数", quiz_passed:"通过！🎉", quiz_failed:"继续努力",
    quiz_btn_retry:"重新测验", quiz_btn_review:"查看答案", quiz_btn_back:"返回学习模式",
    quiz_review_title:"查看答案",
    session_title:"学习会话", session_mode_fc:"闪卡模式", session_mode_quiz:"测验模式",
    session_duration:"时长", session_min:"分钟",
    session_btn_start:"开始会话", session_btn_pause:"暂停", session_btn_resume:"继续", session_btn_end:"结束会话",
    session_progress:"会话进度", session_summary:"会话摘要",
    session_summary_duration:"学习时长", session_summary_cards:"已复习卡片", session_summary_score:"测验分数",
    study_history_title:"学习记录", study_history_empty:"暂无学习会话记录。",
    study_schedule_title:"安排会话", study_schedule_date:"日期", study_schedule_time:"时间",
    study_schedule_btn:"保存到日历",
    toast_study_set_created:"学习套件已创建", toast_study_card_added:"卡片已添加",
    toast_study_card_deleted:"卡片已删除", toast_study_set_deleted:"学习套件已删除",
    toast_session_saved:"学习会话已保存",
    confirm_delete_study_set:"删除此学习套件？其中的所有卡片也将被删除。",
    study_rename_set:"重命名套件", study_rename_ph:"新名称…",
    toast_study_set_renamed:"套件已重命名", confirm_delete_card:"删除此卡片？",
  },
};

/* ============================================================
   i18n STATE & HELPERS
   ============================================================ */

const LANG_STORAGE_KEY = "noteflow_lang";
const SUPPORTED_LANGS  = ["id","en","ms","es","fr","zh-CN"];

/** Active language code — default Bahasa Indonesia */
let currentLang = "id";

/**
 * Translate a key, with optional {n} variable substitution.
 * Falls back to English, then the raw key.
 * @param {string} key
 * @param {Object} [vars]  — e.g. { n: 5 }
 * @returns {string}
 */
function t(key, vars) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS["id"];
  let str = dict[key] ?? TRANSLATIONS["en"]?.[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k,v]) => {
      str = str.replace(new RegExp(`\\{${k}\\}`, "g"), v);
    });
  }
  return str;
}

/**
 * Returns an array translation (e.g. calendar day names).
 * @param {string} key
 * @returns {string[]}
 */
function ta(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS["id"];
  return dict[key] ?? TRANSLATIONS["en"]?.[key] ?? [];
}

/**
 * Change the active language, persist it, and re-render.
 * @param {string} code — one of SUPPORTED_LANGS
 */
function setLanguage(code) {
  if (!SUPPORTED_LANGS.includes(code)) return;
  currentLang = code;
  localStorage.setItem(LANG_STORAGE_KEY, code);
  // Update <html lang>
  document.documentElement.lang = TRANSLATIONS[code]?.locale?.split("-")[0] || code;
  // Re-render landing page static text
  renderLandingText();
  // Re-render app shell static labels (sidebar + topbar)
  renderAppShellText();
  // Re-render current app page if app is visible
  if (!document.getElementById("appShell").classList.contains("hidden")) {
    navigateTo(currentPage);
  }
  showToast(t("toast_lang_changed"), "info");
}

/**
 * Load persisted language preference.
 * Defaults to "id" (Bahasa Indonesia).
 */
function loadLanguage() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) {
    currentLang = saved;
  } else {
    currentLang = "id";
  }
  document.documentElement.lang = TRANSLATIONS[currentLang]?.locale?.split("-")[0] || currentLang;
}

/* ============================================================
   LOCALE-AWARE DATE / TIME FORMATTERS
   (Override the plain versions in script.js)
   ============================================================ */

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    const locale = TRANSLATIONS[currentLang]?.locale || "id-ID";
    return new Date(dateStr + "T12:00:00").toLocaleDateString(locale, { month:"long", day:"numeric", year:"numeric" });
  } catch { return dateStr; }
}

function formatDateShort(dateStr) {
  if (!dateStr) return "—";
  try {
    const locale = TRANSLATIONS[currentLang]?.locale || "id-ID";
    return new Date(dateStr + "T12:00:00").toLocaleDateString(locale, { month:"short", day:"numeric" });
  } catch { return dateStr; }
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = Math.round((new Date(dateStr+"T12:00:00") - new Date()) / 86400000);
  if (diff < 0)  return t("overdue_days",  { n: Math.abs(diff) });
  if (diff === 0) return t("due_today");
  if (diff === 1) return t("due_tomorrow");
  return t("due_in_days", { n: diff });
}

function priorityLabel(p) {
  return { high: t("priority_high"), medium: t("priority_medium"), low: t("priority_low") }[p] || p;
}

function statusLabel(s) {
  return { todo: t("status_todo"), inprogress: t("status_inprogress"), completed: t("status_completed") }[s] || s;
}

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? t("dash_greeting_morning") : h < 17 ? t("dash_greeting_afternoon") : t("dash_greeting_evening");
}

/* ============================================================
   LANDING PAGE TEXT RENDERER
   (Updates all data-i18n elements on the landing page)
   ============================================================ */

function renderLandingText() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === "INPUT" && el.placeholder !== undefined) {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  // Update language selector in navbar (landing)
  const navLangSel = document.getElementById("navLangSelect");
  if (navLangSel) navLangSel.value = currentLang;
  // Update language selector in mobile menu (landing)
  const mobileLangSel = document.getElementById("mobileLangSelect");
  if (mobileLangSel) mobileLangSel.value = currentLang;
  // Update language selector in settings (if rendered)
  const settLangSel = document.getElementById("settingsLangSelect");
  if (settLangSel) settLangSel.value = currentLang;
  // Update hero mockup greeting text
  const mockupGreeting = document.getElementById("mockupGreeting");
  if (mockupGreeting) mockupGreeting.textContent = getGreeting() + (
    typeof state !== "undefined" && state.settings?.userName
      ? ", " + state.settings.userName + "!"
      : "!"
  );
}

/* ============================================================
   APP SHELL TEXT RENDERER
   (Updates sidebar nav labels & topbar placeholders)
   ============================================================ */

function renderAppShellText() {
  // Sidebar nav labels (data-i18n-nav)
  document.querySelectorAll("[data-i18n-nav]").forEach(el => {
    el.textContent = t(el.dataset.i18nNav);
  });
  // Sidebar workspace label
  const wsLabel = document.getElementById("workspaceLabel");
  if (wsLabel) wsLabel.textContent = t("nav_local_ws");
  // Topbar search placeholder
  const gs = document.getElementById("globalSearch");
  if (gs) gs.placeholder = t("search_placeholder");
  // Topbar "New" button label
  const newBtnLabel = document.getElementById("topbarNewLabel");
  if (newBtnLabel) newBtnLabel.textContent = t("btn_new");
  // Quick add modal title (if open)
  const qaTitle = document.getElementById("quickAddTitle");
  if (qaTitle) qaTitle.textContent = t("quick_create");
  // Confirm dialog title
  const cfTitle = document.getElementById("confirmDialogTitle");
  if (cfTitle) cfTitle.textContent = t("confirm_delete_title");
  const cfCancel = document.getElementById("confirmCancelBtn");
  if (cfCancel) cfCancel.textContent = t("btn_cancel");
  const cfOk = document.getElementById("confirmOkBtn");
  if (cfOk) cfOk.textContent = t("btn_delete");
}

/* ============================================================
   LANGUAGE SELECTOR HTML BUILDER
   (Used in both navbar and Settings page)
   ============================================================ */

function buildLangSelectorHTML(id, extraClass = "") {
  const options = SUPPORTED_LANGS.map(code =>
    `<option value="${code}" ${code === currentLang ? "selected" : ""}>${TRANSLATIONS[code].lang_name}</option>`
  ).join("");
  return `<select id="${id}" onchange="setLanguage(this.value)"
    class="form-input py-1.5 text-sm cursor-pointer ${extraClass}" aria-label="Language selector">
    ${options}
  </select>`;
}
