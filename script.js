const GITHUB_ORG = 'irandawn';
const DATABASE_REPO = 'database';
const DEFAULT_BRANCH = 'main';
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_ORG}`;
const BROWSE_BASE = `https://github.com/${GITHUB_ORG}`;
const FOOTER_LINK = BROWSE_BASE;
const INDEX_PATH = 'INDEX.json';
const MAX_ITEMS = 50;
const DEFAULT_SECTION = 'home';
const DEFAULT_LANG = 'en';
const SETTINGS_KEY = 'irandawn.settings';
const DEFAULT_SETTINGS = {
  lang: DEFAULT_LANG,
  theme: 'system'
};

const LOCALES = {
  en: {
    label: 'English',
    dir: 'ltr',
    strings: {
      'site.title': 'Iran Dawn',
      'nav.home': 'Home',
      'nav.database': 'Database',
      'nav.events': 'Events',
      'nav.stats': 'Stats',
      'nav.submit': 'Submit',
      'nav.language': 'Language',
      'home.title': 'Iran Dawn',
      'home.lead': 'Open archive documenting events in Iran through community-submitted content. All data is publicly accessible, verifiable, and preserved on GitHub.',
      'home.stats.total_items': 'Total Items',
      'home.stats.events': 'Events',
      'home.stats.submissions': 'Submissions',
      'home.actions.browse': 'Browse Database',
      'home.actions.submit': 'Submit Content',
      'database.title': 'Database',
      'database.lead': 'Browse archived content. All items are stored as structured JSON files.',
      'database.search.placeholder': 'Search by description, event, or ID...',
      'database.filters.type_all': 'All Types',
      'database.filters.status_all': 'All Statuses',
      'database.loading': 'Loading database...',
      'database.empty': 'No content found.',
      'database.error': 'Failed to load database.',
      'database.showing': 'Showing {shown} of {total} items.',
      'database.summary.empty': 'No summary available.',
      'events.title': 'Events',
      'events.lead': 'Timeline of documented events.',
      'events.loading': 'Loading events...',
      'events.empty': 'No events have been published yet.',
      'events.fallback_title': 'Event {id}',
      'stats.title': 'Statistics',
      'stats.content_distribution': 'Content Distribution',
      'stats.submission_activity': 'Submission Activity',
      'stats.recent_activity': 'Recent Activity',
      'stats.loading': 'Loading statistics...',
      'stats.activity_loading': 'Loading activity log...',
      'stats.recent_loading': 'Loading recent activity...',
      'stats.empty': 'No data available.',
      'stats.recent.empty': 'No recent activity.',
      'stats.activity.default': 'Activity',
      'submit.title': 'Submit Content',
      'submit.lead': 'Help document events by submitting photos, videos, or reports.',
      'submit.steps.title': 'How to Submit',
      'submit.steps.portal.prefix': 'Go to the',
      'submit.steps.portal.link': 'submission portal',
      'submit.steps.template': 'Choose a template (Media Report, Event Report, etc.)',
      'submit.steps.fill': 'Fill out the form with accurate information',
      'submit.steps.wait': 'Submit and wait for automated validation',
      'submit.steps.review': 'If valid, a pull request is created for maintainer review',
      'submit.guidelines.title': 'Guidelines',
      'submit.guidelines.rights': 'Only submit content you have rights to share',
      'submit.guidelines.pii': 'Remove any personal identifiable information (PII)',
      'submit.guidelines.details': 'Provide accurate dates, times, and locations when possible',
      'submit.guidelines.license': 'All submissions are licensed under CC-BY-4.0',
      'submit.notes.title': 'What Happens Next',
      'submit.notes.validation': 'Submissions are validated automatically for required fields and PII.',
      'submit.notes.review': 'Maintainers review submissions for authenticity and accuracy before merging.',
      'submit.notes.audit': 'All activity is logged in the public audit log.',
      'submit.cta': 'Submit Content Now',
      'footer.text': 'Iran Dawn is an open-source project.',
      'footer.link': 'View on GitHub',
      'labels.status': 'Status: {value}',
      'labels.updated': 'Updated: {value}',
      'labels.created': 'Created: {value}',
      'labels.issue': 'Issue',
      'labels.record': 'Record',
      'labels.id': 'ID {value}',
      'labels.issue_number': 'Issue #{value}',
      'labels.pr_number': 'PR #{value}',
      'status.active': 'Active',
      'status.reserved': 'Reserved',
      'status.unknown': 'Unknown'
    }
  },
  fr: {
    label: 'Français',
    dir: 'ltr',
    strings: {
      'site.title': 'Iran Dawn',
      'nav.home': 'Accueil',
      'nav.database': 'Base de données',
      'nav.events': 'Événements',
      'nav.stats': 'Statistiques',
      'nav.submit': 'Soumettre',
      'nav.language': 'Langue',
      'home.title': 'Iran Dawn',
      'home.lead': 'Archive ouverte documentant les événements en Iran grâce aux contributions de la communauté. Toutes les données sont publiques, vérifiables et conservées sur GitHub.',
      'home.stats.total_items': 'Total des éléments',
      'home.stats.events': 'Événements',
      'home.stats.submissions': 'Soumissions',
      'home.actions.browse': 'Parcourir la base',
      'home.actions.submit': 'Soumettre du contenu',
      'database.title': 'Base de données',
      'database.lead': 'Parcourez le contenu archivé. Tous les éléments sont stockés en JSON structuré.',
      'database.search.placeholder': 'Rechercher par description, événement ou ID...',
      'database.filters.type_all': 'Tous les types',
      'database.filters.status_all': 'Tous les statuts',
      'database.loading': 'Chargement de la base de données...',
      'database.empty': 'Aucun contenu trouvé.',
      'database.error': 'Échec du chargement de la base de données.',
      'database.showing': 'Affichage de {shown} sur {total} éléments.',
      'database.summary.empty': 'Aucun résumé disponible.',
      'events.title': 'Événements',
      'events.lead': 'Chronologie des événements documentés.',
      'events.loading': 'Chargement des événements...',
      'events.empty': 'Aucun événement n\'a encore été publié.',
      'events.fallback_title': 'Événement {id}',
      'stats.title': 'Statistiques',
      'stats.content_distribution': 'Répartition du contenu',
      'stats.submission_activity': 'Activité des soumissions',
      'stats.recent_activity': 'Activité récente',
      'stats.loading': 'Chargement des statistiques...',
      'stats.activity_loading': 'Chargement du journal d\'activité...',
      'stats.recent_loading': 'Chargement de l\'activité récente...',
      'stats.empty': 'Aucune donnée disponible.',
      'stats.recent.empty': 'Aucune activité récente.',
      'stats.activity.default': 'Activité',
      'submit.title': 'Soumettre du contenu',
      'submit.lead': 'Aidez à documenter les événements en soumettant des photos, vidéos ou rapports.',
      'submit.steps.title': 'Comment soumettre',
      'submit.steps.portal.prefix': 'Accédez au',
      'submit.steps.portal.link': 'portail de soumission',
      'submit.steps.template': 'Choisissez un modèle (Rapport média, Rapport d\'événement, etc.)',
      'submit.steps.fill': 'Remplissez le formulaire avec des informations exactes',
      'submit.steps.wait': 'Soumettez et attendez la validation automatique',
      'submit.steps.review': 'Si valide, une PR est créée pour examen',
      'submit.guidelines.title': 'Consignes',
      'submit.guidelines.rights': 'Ne soumettez que du contenu que vous avez le droit de partager',
      'submit.guidelines.pii': 'Supprimez toute information personnelle identifiable (PII)',
      'submit.guidelines.details': 'Fournissez des dates, heures et lieux précis si possible',
      'submit.guidelines.license': 'Toutes les soumissions sont sous licence CC-BY-4.0',
      'submit.notes.title': 'Que se passe-t-il ensuite',
      'submit.notes.validation': 'Les soumissions sont validées automatiquement pour les champs requis et les PII.',
      'submit.notes.review': 'Les mainteneurs vérifient l\'authenticité et l\'exactitude avant fusion.',
      'submit.notes.audit': 'Toute activité est enregistrée dans le journal public.',
      'submit.cta': 'Soumettre maintenant',
      'footer.text': 'Iran Dawn est un projet open source.',
      'footer.link': 'Voir sur GitHub',
      'labels.status': 'Statut : {value}',
      'labels.updated': 'Mis à jour : {value}',
      'labels.created': 'Créé : {value}',
      'labels.issue': 'Issue',
      'labels.record': 'Enregistrement',
      'labels.id': 'ID {value}',
      'labels.issue_number': 'Issue #{value}',
      'labels.pr_number': 'PR #{value}',
      'status.active': 'Actif',
      'status.reserved': 'Réservé',
      'status.unknown': 'Inconnu'
    }
  },
  fa: {
    label: 'فارسی',
    dir: 'rtl',
    strings: {
      'site.title': 'ایران داون',
      'nav.home': 'خانه',
      'nav.database': 'پایگاه داده',
      'nav.events': 'رویدادها',
      'nav.stats': 'آمار',
      'nav.submit': 'ارسال',
      'nav.language': 'زبان',
      'home.title': 'ایران داون',
      'home.lead': 'آرشیوی باز برای مستندسازی رویدادهای ایران با مشارکت جامعه. همه داده‌ها عمومی، قابل راستی‌آزمایی و روی گیت‌هاب حفظ می‌شوند.',
      'home.stats.total_items': 'کل موارد',
      'home.stats.events': 'رویدادها',
      'home.stats.submissions': 'ارسال‌ها',
      'home.actions.browse': 'مشاهده پایگاه داده',
      'home.actions.submit': 'ارسال محتوا',
      'database.title': 'پایگاه داده',
      'database.lead': 'محتوای آرشیوشده را مرور کنید. همه موارد به صورت JSON ساخت‌یافته ذخیره می‌شوند.',
      'database.search.placeholder': 'جستجو بر اساس توضیح، رویداد یا شناسه...',
      'database.filters.type_all': 'همه انواع',
      'database.filters.status_all': 'همه وضعیت‌ها',
      'database.loading': 'در حال بارگذاری پایگاه داده...',
      'database.empty': 'محتوایی یافت نشد.',
      'database.error': 'بارگذاری پایگاه داده ناموفق بود.',
      'database.showing': 'نمایش {shown} از {total} مورد.',
      'database.summary.empty': 'خلاصه‌ای موجود نیست.',
      'events.title': 'رویدادها',
      'events.lead': 'خط زمانی رویدادهای مستند.',
      'events.loading': 'در حال بارگذاری رویدادها...',
      'events.empty': 'هنوز رویدادی منتشر نشده است.',
      'events.fallback_title': 'رویداد {id}',
      'stats.title': 'آمار',
      'stats.content_distribution': 'توزیع محتوا',
      'stats.submission_activity': 'فعالیت ارسال‌ها',
      'stats.recent_activity': 'فعالیت اخیر',
      'stats.loading': 'در حال بارگذاری آمار...',
      'stats.activity_loading': 'در حال بارگذاری گزارش فعالیت...',
      'stats.recent_loading': 'در حال بارگذاری فعالیت‌های اخیر...',
      'stats.empty': 'داده‌ای موجود نیست.',
      'stats.recent.empty': 'فعالیت اخیر وجود ندارد.',
      'stats.activity.default': 'فعالیت',
      'submit.title': 'ارسال محتوا',
      'submit.lead': 'با ارسال عکس، ویدئو یا گزارش به مستندسازی رویدادها کمک کنید.',
      'submit.steps.title': 'روش ارسال',
      'submit.steps.portal.prefix': 'به',
      'submit.steps.portal.link': 'درگاه ارسال',
      'submit.steps.template': 'یک الگو انتخاب کنید (گزارش رسانه‌ای، گزارش رویداد و ...)',
      'submit.steps.fill': 'فرم را با اطلاعات دقیق تکمیل کنید',
      'submit.steps.wait': 'ارسال کنید و منتظر اعتبارسنجی خودکار بمانید',
      'submit.steps.review': 'در صورت اعتبار، یک PR برای بررسی نگه‌دارندگان ایجاد می‌شود',
      'submit.guidelines.title': 'راهنما',
      'submit.guidelines.rights': 'فقط محتوایی را ارسال کنید که حق انتشار آن را دارید',
      'submit.guidelines.pii': 'اطلاعات شناسایی شخصی (PII) را حذف کنید',
      'submit.guidelines.details': 'تا حد امکان تاریخ، زمان و مکان دقیق ارائه کنید',
      'submit.guidelines.license': 'همه ارسال‌ها تحت مجوز CC-BY-4.0 هستند',
      'submit.notes.title': 'بعد چه می‌شود',
      'submit.notes.validation': 'ارسال‌ها به طور خودکار برای فیلدهای لازم و PII بررسی می‌شوند.',
      'submit.notes.review': 'نگه‌دارندگان پیش از ادغام، صحت و دقت را بررسی می‌کنند.',
      'submit.notes.audit': 'همه فعالیت‌ها در گزارش عمومی ثبت می‌شود.',
      'submit.cta': 'اکنون ارسال کنید',
      'footer.text': 'ایران داون یک پروژه متن‌باز است.',
      'footer.link': 'مشاهده در گیت‌هاب',
      'labels.status': 'وضعیت: {value}',
      'labels.updated': 'به‌روزرسانی: {value}',
      'labels.created': 'ایجاد شده: {value}',
      'labels.issue': 'Issue',
      'labels.record': 'رکورد',
      'labels.id': 'شناسه {value}',
      'labels.issue_number': 'Issue #{value}',
      'labels.pr_number': 'PR #{value}',
      'status.active': 'فعال',
      'status.reserved': 'رزرو',
      'status.unknown': 'نامشخص'
    }
  },
  ar: {
    label: 'العربية',
    dir: 'rtl',
    strings: {
      'site.title': 'إيران داون',
      'nav.home': 'الرئيسية',
      'nav.database': 'قاعدة البيانات',
      'nav.events': 'الأحداث',
      'nav.stats': 'إحصاءات',
      'nav.submit': 'إرسال',
      'nav.language': 'اللغة',
      'home.title': 'إيران داون',
      'home.lead': 'أرشيف مفتوح يوثّق أحداث إيران بمساهمات المجتمع. جميع البيانات عامة، قابلة للتحقق، ومحفوظة على GitHub.',
      'home.stats.total_items': 'إجمالي العناصر',
      'home.stats.events': 'الأحداث',
      'home.stats.submissions': 'عمليات الإرسال',
      'home.actions.browse': 'استعراض قاعدة البيانات',
      'home.actions.submit': 'إرسال محتوى',
      'database.title': 'قاعدة البيانات',
      'database.lead': 'تصفح المحتوى المؤرشف. يتم حفظ جميع العناصر كملفات JSON منظمة.',
      'database.search.placeholder': 'ابحث بالوصف أو الحدث أو المعرف...',
      'database.filters.type_all': 'كل الأنواع',
      'database.filters.status_all': 'كل الحالات',
      'database.loading': 'جارٍ تحميل قاعدة البيانات...',
      'database.empty': 'لا يوجد محتوى.',
      'database.error': 'فشل تحميل قاعدة البيانات.',
      'database.showing': 'عرض {shown} من أصل {total} عنصر.',
      'database.summary.empty': 'لا يوجد ملخص.',
      'events.title': 'الأحداث',
      'events.lead': 'خط زمني للأحداث الموثقة.',
      'events.loading': 'جارٍ تحميل الأحداث...',
      'events.empty': 'لم يتم نشر أي أحداث بعد.',
      'events.fallback_title': 'الحدث {id}',
      'stats.title': 'إحصاءات',
      'stats.content_distribution': 'توزيع المحتوى',
      'stats.submission_activity': 'نشاط الإرسال',
      'stats.recent_activity': 'النشاط الأخير',
      'stats.loading': 'جارٍ تحميل الإحصاءات...',
      'stats.activity_loading': 'جارٍ تحميل سجل النشاط...',
      'stats.recent_loading': 'جارٍ تحميل النشاط الأخير...',
      'stats.empty': 'لا توجد بيانات.',
      'stats.recent.empty': 'لا يوجد نشاط حديث.',
      'stats.activity.default': 'نشاط',
      'submit.title': 'إرسال محتوى',
      'submit.lead': 'ساهم بتوثيق الأحداث عبر إرسال صور أو فيديوهات أو تقارير.',
      'submit.steps.title': 'كيفية الإرسال',
      'submit.steps.portal.prefix': 'اذهب إلى',
      'submit.steps.portal.link': 'بوابة الإرسال',
      'submit.steps.template': 'اختر نموذجًا (تقرير وسائط، تقرير حدث، إلخ)',
      'submit.steps.fill': 'املأ النموذج بمعلومات دقيقة',
      'submit.steps.wait': 'أرسل وانتظر التحقق الآلي',
      'submit.steps.review': 'إذا كان صحيحًا، سيتم إنشاء طلب سحب للمراجعة',
      'submit.guidelines.title': 'إرشادات',
      'submit.guidelines.rights': 'أرسل فقط محتوى تملك حقوق مشاركته',
      'submit.guidelines.pii': 'احذف أي معلومات تعريف شخصية (PII)',
      'submit.guidelines.details': 'قدّم التاريخ والوقت والمكان بدقة قدر الإمكان',
      'submit.guidelines.license': 'جميع الإرسالات مرخصة تحت CC-BY-4.0',
      'submit.notes.title': 'ماذا بعد',
      'submit.notes.validation': 'يتم التحقق من الإرسالات تلقائيًا للحقول المطلوبة وPII.',
      'submit.notes.review': 'يراجع المشرفون المحتوى قبل الدمج.',
      'submit.notes.audit': 'يتم تسجيل جميع النشاطات في سجل تدقيق عام.',
      'submit.cta': 'أرسل الآن',
      'footer.text': 'إيران داون مشروع مفتوح المصدر.',
      'footer.link': 'عرض على GitHub',
      'labels.status': 'الحالة: {value}',
      'labels.updated': 'آخر تحديث: {value}',
      'labels.created': 'تاريخ الإنشاء: {value}',
      'labels.issue': 'Issue',
      'labels.record': 'سجل',
      'labels.id': 'المعرّف {value}',
      'labels.issue_number': 'Issue #{value}',
      'labels.pr_number': 'PR #{value}',
      'status.active': 'نشط',
      'status.reserved': 'محجوز',
      'status.unknown': 'غير معروف'
    }
  }
};

const state = {
  index: null,
  cache: new Map(),
  dataCache: new Map(),
  contentItems: [],
  databaseLoaded: false,
  databaseListeners: false,
  eventsLoaded: false,
  statsLoaded: false,
  homeLoaded: false,
  sections: [],
  sectionMap: new Map(),
  lang: DEFAULT_LANG,
  settings: { ...DEFAULT_SETTINGS }
};

function byId(id) {
  return document.getElementById(id);
}

function escapeHtml(value) {
  if (!value) {
    return '';
  }
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(value) {
  if (!value || value === 0) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return date.toLocaleDateString();
}

function formatStatus(value) {
  const status = String(value ?? '');
  if (status === '1') {
    return t('status.active');
  }
  if (status === '0') {
    return t('status.reserved');
  }
  if (!status) {
    return t('status.unknown');
  }
  return status;
}

function createOption(value, label) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;
  return option;
}

function loadSettings() {
  const settings = { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return settings;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return settings;
    }
    return { ...settings, ...parsed };
  } catch {
    return settings;
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage errors (private mode, blocked, etc.).
  }
}

function updateSettings(partial) {
  const next = { ...state.settings, ...partial };
  state.settings = next;
  saveSettings(next);
  return next;
}

function getLocale(lang) {
  return LOCALES[lang] || LOCALES[DEFAULT_LANG];
}

function formatString(template, params) {
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      return params[key];
    }
    return match;
  });
}

function t(key, params, fallback) {
  const locale = getLocale(state.lang);
  let value = locale && locale.strings ? locale.strings[key] : undefined;
  if (value === undefined && LOCALES[DEFAULT_LANG]) {
    value = LOCALES[DEFAULT_LANG].strings[key];
  }
  if (value === undefined) {
    value = fallback !== undefined ? fallback : key;
  }
  return formatString(value, params);
}

function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = t(key);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.setAttribute('placeholder', t(key));
  });
  root.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    element.setAttribute('title', t(key));
  });
}

function applyLanguage(lang) {
  const next = LOCALES[lang] ? lang : DEFAULT_LANG;
  state.lang = next;
  const locale = getLocale(next);
  document.documentElement.lang = next;
  document.documentElement.dir = locale && locale.dir ? locale.dir : 'ltr';
  return next;
}

function updateLanguagePicker() {
  const select = byId('language-select');
  if (!select) {
    return;
  }
  select.value = state.lang;
  select.setAttribute('aria-label', t('nav.language'));
}

function refreshLanguageSensitiveContent() {
  if (state.databaseLoaded) {
    filterContent();
  }
  if (state.eventsLoaded) {
    state.eventsLoaded = false;
    void loadEvents();
  }
  if (state.statsLoaded) {
    state.statsLoaded = false;
    void loadStats();
  }
  if (state.homeLoaded) {
    state.homeLoaded = false;
    void loadHomeStats();
  }
}

function setLanguage(lang, options = {}) {
  const { persist = true, apply = true, refresh = true } = options;
  const next = applyLanguage(lang);
  if (persist) {
    updateSettings({ lang: next });
  }
  updateLanguagePicker();
  if (apply) {
    applyTranslations();
  }
  if (refresh) {
    refreshLanguageSensitiveContent();
  }
}

function getSubmitUrl() {
  return `${BROWSE_BASE}/${DATABASE_REPO}/issues/new/choose`;
}

function getRawUrl(repo, path) {
  return `${RAW_BASE}/${repo}/${DEFAULT_BRANCH}/${path}`;
}

function getFallbackIndex() {
  return {
    indexes: [],
    available_types: [],
    id_schemas: [],
    counts: {
      by_status: {},
      by_type: {}
    }
  };
}

async function fetchJson(repo, path) {
  const url = getRawUrl(repo, path);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    return null;
  }
}

async function fetchJsonCached(repo, path) {
  const key = `${repo}:${path}`;
  if (state.cache.has(key)) {
    return state.cache.get(key);
  }
  const data = await fetchJson(repo, path);
  if (data) {
    state.cache.set(key, data);
  }
  return data;
}

async function ensureIndex() {
  if (state.index) {
    return state.index;
  }
  const index = await fetchJson(DATABASE_REPO, INDEX_PATH);
  state.index = index || getFallbackIndex();
  return state.index;
}

function hasIndex(index, name) {
  if (!index || !Array.isArray(index.indexes)) {
    return false;
  }
  return index.indexes.some(item => item.name === name);
}

function hasType(index, type) {
  if (!index || !Array.isArray(index.available_types)) {
    return false;
  }
  return index.available_types.includes(type);
}

function getIndexOutput(name, fallback) {
  if (!state.index || !Array.isArray(state.index.indexes)) {
    return fallback || '';
  }
  const def = state.index.indexes.find(item => item.name === name);
  return def ? def.output : fallback || '';
}

async function fetchIndexFile(name, fallback) {
  const output = getIndexOutput(name, fallback);
  if (!output) {
    return null;
  }
  return fetchJsonCached(DATABASE_REPO, output);
}

function getSchemaForId(id) {
  if (!state.index || !Array.isArray(state.index.id_schemas)) {
    return null;
  }
  return state.index.id_schemas.find(schema => schema.length === id.length) || null;
}

function idToPath(id, schema) {
  if (!schema) {
    return '';
  }
  const size = Number(schema.layer_size) || 2;
  const parts = [];
  for (let i = 0; i < id.length; i += size) {
    parts.push(id.slice(i, i + size));
  }
  return `${schema.data_root}/${parts.join('/')}/${id}.json`;
}

async function fetchDataRecord(id) {
  if (state.dataCache.has(id)) {
    return state.dataCache.get(id);
  }
  const schema = getSchemaForId(id);
  const path = idToPath(id, schema);
  if (!path) {
    return null;
  }
  const record = await fetchJsonCached(DATABASE_REPO, path);
  if (record) {
    state.dataCache.set(id, record);
  }
  return record;
}

function buildStatusMap(byStatus) {
  const map = new Map();
  if (!byStatus || !byStatus.items) {
    return map;
  }
  for (const [status, ids] of Object.entries(byStatus.items)) {
    for (const id of ids) {
      map.set(id, status);
    }
  }
  return map;
}

function buildContentItems(byType, statusMap) {
  const items = [];
  const seen = new Set();
  if (!byType || !byType.items) {
    return items;
  }
  for (const [type, ids] of Object.entries(byType.items)) {
    for (const id of ids) {
      if (seen.has(id)) {
        continue;
      }
      seen.add(id);
      items.push({
        id,
        type,
        status: statusMap.get(id) || ''
      });
    }
  }
  return items;
}

function getDescriptionFromRecord(record) {
  if (!record || !record.payload) {
    return '';
  }
  const fields = record.payload.fields || {};
  if (fields.description) {
    return fields.description;
  }
  if (fields.summary) {
    return fields.summary;
  }
  if (fields.title) {
    return fields.title;
  }
  if (fields.event) {
    return fields.event;
  }
  if (record.payload.job && record.payload.job.output) {
    return record.payload.job.output;
  }
  return '';
}

function buildSearchText(item, record) {
  const parts = [item.id, item.type, item.status];
  if (record) {
    const payload = record.payload || {};
    const fields = payload.fields || {};
    Object.values(fields).forEach(value => {
      if (typeof value === 'string') {
        parts.push(value);
      }
    });
    if (payload.job && typeof payload.job.output === 'string') {
      parts.push(payload.job.output);
    }
  }
  return parts.join(' ').toLowerCase();
}

async function enrichItem(item) {
  const record = await fetchDataRecord(item.id);
  if (record) {
    item.status = String(record.status ?? item.status);
    item.searchText = buildSearchText(item, record);
  } else {
    item.searchText = buildSearchText(item, null);
  }
  return { item, record };
}

function buildRecordLinks(record, id) {
  const schema = getSchemaForId(id);
  const path = idToPath(id, schema);
  const links = [];

  if (record && record.payload && record.payload.meta && record.payload.meta.issue_url) {
    links.push({
      label: t('labels.issue'),
      url: record.payload.meta.issue_url
    });
  }

  if (path) {
    links.push({
      label: t('labels.record'),
      url: `${BROWSE_BASE}/${DATABASE_REPO}/blob/${DEFAULT_BRANCH}/${path}`
    });
  }

  return links;
}

async function renderContentList(items) {
  const container = byId('content-list');
  if (!container) {
    return;
  }
  if (!items.length) {
    container.innerHTML = '<p data-i18n="database.empty"></p>';
    applyTranslations(container);
    return;
  }

  const slice = items.slice(0, MAX_ITEMS);
  const enriched = await Promise.all(slice.map(enrichItem));
  const rows = enriched.map(({ item, record }) => {
    const description = escapeHtml(getDescriptionFromRecord(record) || t('database.summary.empty'));
    const created = record ? formatDate(record.created_at) : '';
    const modified = record ? formatDate(record.modified_at) : '';
    const status = formatStatus(item.status);
    const links = buildRecordLinks(record, item.id);
    const linksHtml = links
      .map(link => `<a href="${link.url}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`)
      .join(' | ');

    const metaParts = [];
    if (status) {
      metaParts.push(t('labels.status', { value: status }));
    }
    if (modified) {
      metaParts.push(t('labels.updated', { value: modified }));
    } else if (created) {
      metaParts.push(t('labels.created', { value: created }));
    }
    if (linksHtml) {
      metaParts.push(linksHtml);
    }

    return `
      <div class="content-item">
        <div class="content-header">
          <span class="content-id">${escapeHtml(item.id)}</span>
          <span class="content-type">${escapeHtml(item.type)}</span>
        </div>
        <div class="content-description">${description}</div>
        <div class="content-meta">${metaParts.join(' | ')}</div>
      </div>
    `;
  });

  let footer = '';
  if (items.length > MAX_ITEMS) {
    const shown = Math.min(MAX_ITEMS, items.length);
    footer = `<p class="loading">${escapeHtml(t('database.showing', { shown, total: items.length }))}</p>`;
  }

  container.innerHTML = rows.join('') + footer;
}

function populateTypeFilter(types) {
  const select = byId('type-filter');
  if (!select) {
    return;
  }
  select.innerHTML = '';
  const allOption = createOption('', '');
  allOption.dataset.i18n = 'database.filters.type_all';
  select.appendChild(allOption);
  (types || []).forEach(type => {
    select.appendChild(createOption(type, type));
  });
  applyTranslations(select);
}

function populateStatusFilter(statuses) {
  const select = byId('event-filter');
  if (!select) {
    return;
  }
  select.innerHTML = '';
  const allOption = createOption('', '');
  allOption.dataset.i18n = 'database.filters.status_all';
  select.appendChild(allOption);
  (statuses || []).forEach(status => {
    select.appendChild(createOption(status, formatStatus(status)));
  });
  applyTranslations(select);
}

function filterContent() {
  const searchInput = byId('search-input');
  const typeFilter = byId('type-filter');
  const statusFilter = byId('event-filter');

  if (!searchInput || !typeFilter || !statusFilter) {
    return;
  }

  const search = searchInput.value.trim().toLowerCase();
  const typeValue = typeFilter.value;
  const statusValue = statusFilter.value;

  let filtered = state.contentItems;

  if (typeValue) {
    filtered = filtered.filter(item => item.type === typeValue);
  }
  if (statusValue) {
    filtered = filtered.filter(item => String(item.status) === statusValue);
  }
  if (search) {
    filtered = filtered.filter(item => {
      const text = item.searchText || `${item.id} ${item.type} ${item.status}`.toLowerCase();
      return text.includes(search);
    });
  }

  void renderContentList(filtered);
}

async function loadHomeStats() {
  if (state.homeLoaded) {
    return;
  }
  const index = await ensureIndex();
  if (!index) {
    return;
  }

  const byStatusCounts = index.counts && index.counts.by_status ? index.counts.by_status : {};
  const byTypeCounts = index.counts && index.counts.by_type ? index.counts.by_type : {};

  const totalItems = Number(byStatusCounts['1']) || 0;
  const totalSubmissions = Object.values(byStatusCounts).reduce((sum, value) => {
    return sum + Number(value || 0);
  }, 0);
  const totalEvents = Number(byTypeCounts.event) || 0;

  if (byId('total-items')) {
    byId('total-items').textContent = String(totalItems);
  }
  if (byId('total-events')) {
    byId('total-events').textContent = String(totalEvents);
  }
  if (byId('total-submissions')) {
    byId('total-submissions').textContent = String(totalSubmissions);
  }

  state.homeLoaded = true;
}

async function loadDatabase() {
  if (state.databaseLoaded) {
    filterContent();
    return;
  }

  const container = byId('content-list');
  if (container) {
    container.innerHTML = '<p class="loading" data-i18n="database.loading"></p>';
    applyTranslations(container);
  }

  const index = await ensureIndex();
  const byType = await fetchIndexFile('by-type', 'index/by-type.json');
  const byStatus = await fetchIndexFile('by-status', 'index/by-status.json');

  if (!index || !byType) {
    if (container) {
      container.innerHTML = '<p data-i18n="database.error"></p>';
      applyTranslations(container);
    }
    return;
  }

  const types = Array.isArray(index.available_types)
    ? index.available_types
    : Object.keys(byType.items || {});
  populateTypeFilter(types);

  const statusKeys = byStatus && byStatus.items ? Object.keys(byStatus.items) : [];
  populateStatusFilter(statusKeys);

  const statusMap = buildStatusMap(byStatus);
  state.contentItems = buildContentItems(byType, statusMap);
  state.databaseLoaded = true;

  if (!state.databaseListeners) {
    const searchInput = byId('search-input');
    const typeFilter = byId('type-filter');
    const statusFilter = byId('event-filter');

    if (searchInput) {
      searchInput.addEventListener('input', filterContent);
    }
    if (typeFilter) {
      typeFilter.addEventListener('change', filterContent);
    }
    if (statusFilter) {
      statusFilter.addEventListener('change', filterContent);
    }
    state.databaseListeners = true;
  }

  filterContent();
}

async function loadEvents() {
  if (state.eventsLoaded) {
    return;
  }

  const container = byId('events-list');
  if (container) {
    container.innerHTML = '<p class="loading" data-i18n="events.loading"></p>';
    applyTranslations(container);
  }

  const byType = await fetchIndexFile('by-type', 'index/by-type.json');
  const byStatus = await fetchIndexFile('by-status', 'index/by-status.json');
  const eventIds = byType && byType.items ? byType.items.event || [] : [];

  if (!eventIds.length) {
    if (container) {
      container.innerHTML = '<p data-i18n="events.empty"></p>';
      applyTranslations(container);
    }
    state.eventsLoaded = true;
    return;
  }

  const statusMap = buildStatusMap(byStatus);
  const items = eventIds.map(id => ({
    id,
    type: 'event',
    status: statusMap.get(id) || ''
  }));

  const enriched = await Promise.all(items.slice(0, MAX_ITEMS).map(enrichItem));
  const rows = enriched.map(({ item, record }) => {
    const fields = record && record.payload ? record.payload.fields || {} : {};
    const title = escapeHtml(fields.event || fields.title || t('events.fallback_title', { id: item.id }));
    const date = escapeHtml(fields.date || fields.event_date || fields.when || '');
    const description = escapeHtml(getDescriptionFromRecord(record) || t('database.summary.empty'));

    return `
      <div class="event-item">
        <div class="event-title">${title}</div>
        ${date ? `<div class="event-date">${date}</div>` : ''}
        <div class="event-description">${description}</div>
      </div>
    `;
  });

  if (container) {
    container.innerHTML = rows.join('');
  }
  state.eventsLoaded = true;
}

function translateTypeLabel(type) {
  return t(`types.${type}`, null, type);
}

function renderStatsTable(containerId, rows) {
  const container = byId(containerId);
  if (!container) {
    return;
  }
  if (!rows.length) {
    container.innerHTML = '<p class="loading" data-i18n="stats.empty"></p>';
    applyTranslations(container);
    return;
  }
  container.innerHTML = rows
    .map(row => `<div class="stats-row"><span>${escapeHtml(row.label)}</span><span>${row.value}</span></div>`)
    .join('');
}

async function loadStats() {
  if (state.statsLoaded) {
    return;
  }

  const byType = await fetchIndexFile('by-type', 'index/by-type.json');
  const logsRecent = await fetchIndexFile('logs-latest-100', 'logs-latest-100.json');
  const logsWide = await fetchIndexFile('logs-latest-1000', 'logs-latest-1000.json');

  if (byType && byType.items) {
    const rows = Object.entries(byType.items)
      .map(([type, ids]) => ({ label: translateTypeLabel(type), value: ids.length }))
      .sort((a, b) => b.value - a.value);
    renderStatsTable('content-stats', rows);
  } else {
    renderStatsTable('content-stats', []);
  }

  if (Array.isArray(logsWide)) {
    const counts = {};
    logsWide.forEach(entry => {
      const key = entry.event || 'unknown';
      counts[key] = (counts[key] || 0) + 1;
    });
    const rows = Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
    renderStatsTable('submission-stats', rows);
  } else {
    renderStatsTable('submission-stats', []);
  }

  if (Array.isArray(logsRecent)) {
    const container = byId('recent-activity');
    if (container) {
      const rows = logsRecent.slice(0, 20).map(entry => {
        const pieces = [];
        if (entry.event) {
          pieces.push(entry.event);
        }
        if (entry.content_id) {
          pieces.push(t('labels.id', { value: entry.content_id }));
        }
        if (entry.source_issue) {
          pieces.push(t('labels.issue_number', { value: entry.source_issue }));
        }
        if (entry.pr_number) {
          pieces.push(t('labels.pr_number', { value: entry.pr_number }));
        }
        const message = escapeHtml(pieces.join(' | ') || t('stats.activity.default'));
        const time = entry.timestamp ? escapeHtml(formatDate(entry.timestamp)) : '';
        return `
          <div class="activity-item">
            <div>${message}</div>
            ${time ? `<div class="activity-time">${time}</div>` : ''}
          </div>
        `;
      });
      container.innerHTML = rows.join('');
    }
  } else if (byId('recent-activity')) {
    const container = byId('recent-activity');
    container.innerHTML = '<p class="loading" data-i18n="stats.recent.empty"></p>';
    applyTranslations(container);
  }

  state.statsLoaded = true;
}

function buildHomeSection(section) {
  const actions = [];
  if (state.sections.includes('database')) {
    actions.push('<a href="#database" class="btn btn-primary" data-i18n="home.actions.browse"></a>');
  }
  if (state.sections.includes('submit')) {
    actions.push('<a href="#submit" class="btn btn-secondary" data-i18n="home.actions.submit"></a>');
  }

  section.innerHTML = `
    <h1 data-i18n="home.title"></h1>
    <p class="lead" data-i18n="home.lead"></p>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value" id="total-items">-</div>
        <div class="stat-label" data-i18n="home.stats.total_items"></div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="total-events">-</div>
        <div class="stat-label" data-i18n="home.stats.events"></div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="total-submissions">-</div>
        <div class="stat-label" data-i18n="home.stats.submissions"></div>
      </div>
    </div>
    <div class="action-buttons">
      ${actions.join('')}
    </div>
  `;
}

function buildDatabaseSection(section) {
  section.innerHTML = `
    <h1 data-i18n="database.title"></h1>
    <p data-i18n="database.lead"></p>
    <div class="search-box">
      <input type="text" id="search-input" data-i18n-placeholder="database.search.placeholder">
    </div>
    <div class="filter-bar">
      <select id="type-filter"></select>
      <select id="event-filter"></select>
    </div>
    <div id="content-list" class="content-list">
      <p class="loading" data-i18n="database.loading"></p>
    </div>
  `;
}

function buildEventsSection(section) {
  section.innerHTML = `
    <h1 data-i18n="events.title"></h1>
    <p data-i18n="events.lead"></p>
    <div id="events-list" class="events-list">
      <p class="loading" data-i18n="events.loading"></p>
    </div>
  `;
}

function buildStatsSection(section) {
  section.innerHTML = `
    <h1 data-i18n="stats.title"></h1>
    <div class="stats-section">
      <h2 data-i18n="stats.content_distribution"></h2>
      <div id="content-stats" class="stats-table">
        <p class="loading" data-i18n="stats.loading"></p>
      </div>
    </div>
    <div class="stats-section">
      <h2 data-i18n="stats.submission_activity"></h2>
      <div id="submission-stats" class="stats-table">
        <p class="loading" data-i18n="stats.activity_loading"></p>
      </div>
    </div>
    <div class="stats-section">
      <h2 data-i18n="stats.recent_activity"></h2>
      <div id="recent-activity" class="activity-log">
        <p class="loading" data-i18n="stats.recent_loading"></p>
      </div>
    </div>
  `;
}

function buildSubmitSection(section) {
  const submitUrl = getSubmitUrl();
  section.innerHTML = `
    <h1 data-i18n="submit.title"></h1>
    <p data-i18n="submit.lead"></p>
    <div class="submit-guide">
      <h2 data-i18n="submit.steps.title"></h2>
      <ol class="submit-steps">
        <li>
          <span data-i18n="submit.steps.portal.prefix"></span>
          <a href="${submitUrl}" target="_blank" rel="noreferrer" data-i18n="submit.steps.portal.link"></a>
        </li>
        <li data-i18n="submit.steps.template"></li>
        <li data-i18n="submit.steps.fill"></li>
        <li data-i18n="submit.steps.wait"></li>
        <li data-i18n="submit.steps.review"></li>
      </ol>
      <h2 data-i18n="submit.guidelines.title"></h2>
      <ul class="guidelines">
        <li data-i18n="submit.guidelines.rights"></li>
        <li data-i18n="submit.guidelines.pii"></li>
        <li data-i18n="submit.guidelines.details"></li>
        <li data-i18n="submit.guidelines.license"></li>
      </ul>
      <h2 data-i18n="submit.notes.title"></h2>
      <p data-i18n="submit.notes.validation"></p>
      <p data-i18n="submit.notes.review"></p>
      <p data-i18n="submit.notes.audit"></p>
      <a href="${submitUrl}" class="btn btn-primary" target="_blank" rel="noreferrer" data-i18n="submit.cta"></a>
    </div>
  `;
}

function buildFooter() {
  const footer = byId('site-footer');
  if (!footer) {
    return;
  }
  footer.innerHTML = `
    <div class="container">
      <p>
        <span data-i18n="footer.text"></span>
        <a href="${FOOTER_LINK}" target="_blank" rel="noreferrer" data-i18n="footer.link"></a>
      </p>
    </div>
  `;
}

function populateLanguageOptions(select) {
  select.innerHTML = '';
  Object.entries(LOCALES).forEach(([code, locale]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = locale.label || code;
    select.appendChild(option);
  });
  select.value = state.lang;
  select.setAttribute('aria-label', t('nav.language'));
}

function buildLanguagePicker(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-language';

  const label = document.createElement('span');
  label.dataset.i18n = 'nav.language';
  wrapper.appendChild(label);

  const select = document.createElement('select');
  select.id = 'language-select';
  select.className = 'language-select';
  select.addEventListener('change', () => {
    setLanguage(select.value);
  });
  wrapper.appendChild(select);

  container.appendChild(wrapper);
  populateLanguageOptions(select);
}

const SECTION_DEFS = [
  {
    id: 'home',
    labelKey: 'nav.home',
    build: buildHomeSection,
    load: loadHomeStats
  },
  {
    id: 'database',
    labelKey: 'nav.database',
    build: buildDatabaseSection,
    load: loadDatabase,
    enabled: index => hasIndex(index, 'by-type')
  },
  {
    id: 'events',
    labelKey: 'nav.events',
    build: buildEventsSection,
    load: loadEvents,
    enabled: index => hasIndex(index, 'by-type') && hasType(index, 'event')
  },
  {
    id: 'stats',
    labelKey: 'nav.stats',
    build: buildStatsSection,
    load: loadStats,
    enabled: index => hasIndex(index, 'by-type')
      || hasIndex(index, 'logs-latest-100')
      || hasIndex(index, 'logs-latest-1000')
  },
  {
    id: 'submit',
    labelKey: 'nav.submit',
    build: buildSubmitSection
  }
];

function buildLayout(index) {
  const navLinks = byId('nav-links');
  const main = byId('main-content');
  if (!navLinks || !main) {
    return;
  }

  const siteTitle = byId('site-title');
  if (siteTitle) {
    siteTitle.setAttribute('href', `#${DEFAULT_SECTION}`);
  }

  navLinks.innerHTML = '';
  main.innerHTML = '';

  const sections = SECTION_DEFS.filter(def => (def.enabled ? def.enabled(index) : true));
  state.sections = sections.map(def => def.id);
  state.sectionMap = new Map(sections.map(def => [def.id, def]));

  sections.forEach(def => {
    const link = document.createElement('a');
    link.href = `#${def.id}`;
    link.dataset.nav = def.id;
    link.dataset.i18n = def.labelKey || `nav.${def.id}`;
    navLinks.appendChild(link);

    const section = document.createElement('section');
    section.id = def.id;
    section.className = 'section';
    def.build(section);
    main.appendChild(section);
  });

  buildLanguagePicker(navLinks);
  buildFooter();
  applyTranslations(document);
}

function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  void handleRouteAsync();
}

async function handleRouteAsync() {
  const hash = window.location.hash.slice(1);
  const requested = hash || DEFAULT_SECTION;
  const activeId = state.sections.includes(requested)
    ? requested
    : state.sections[0] || DEFAULT_SECTION;

  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  const activeSection = byId(activeId);
  if (activeSection) {
    activeSection.classList.add('active');
    const activeNavLink = document.querySelector(`.nav-links a[data-nav="${activeId}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }
  }

  const def = state.sectionMap.get(activeId);
  if (def && typeof def.load === 'function') {
    await def.load();
  }
}

async function initApp() {
  state.settings = loadSettings();
  applyLanguage(state.settings.lang || DEFAULT_LANG);
  const index = await ensureIndex();
  buildLayout(index);
  initRouter();
}

document.addEventListener('DOMContentLoaded', () => {
  void initApp();
});
