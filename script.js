const GITHUB_ORG = 'irandawn';
const DATABASE_REPO = 'database';
const DEFAULT_BRANCH = 'main';
const MAX_ITEMS = 50;
const DEFAULT_SECTION = 'home';
const DEFAULT_LANG = 'en';
const SETTINGS_KEY = 'irandawn.settings';
const DEFAULT_SETTINGS = {
  lang: DEFAULT_LANG,
  theme: 'system'
};
const client = window.IranDawn && typeof window.IranDawn.createClient === 'function'
  ? window.IranDawn.createClient({
    org: GITHUB_ORG,
    repo: DATABASE_REPO,
    branch: DEFAULT_BRANCH
  })
  : null;

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
      'nav.settings': 'Settings',
      'nav.github': 'GitHub',
      'nav.menu': 'Menu',
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
      'status.unknown': 'Unknown',
      'loading.title': 'Loading...',
      'loading.step.sdk': 'Initializing SDK...',
      'loading.step.settings': 'Loading settings...',
      'loading.step.index': 'Fetching database index...',
      'loading.step.layout': 'Building interface...'
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
      'nav.settings': 'Paramètres',
      'nav.github': 'GitHub',
      'nav.menu': 'Menu',
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
      'status.unknown': 'Inconnu',
      'loading.title': 'Chargement...',
      'loading.step.sdk': 'Initialisation du SDK...',
      'loading.step.settings': 'Chargement des paramètres...',
      'loading.step.index': 'Récupération de l\'index...',
      'loading.step.layout': 'Construction de l\'interface...'
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
      'nav.settings': 'تنظیمات',
      'nav.github': 'گیت‌هاب',
      'nav.menu': 'منو',
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
      'status.unknown': 'نامشخص',
      'loading.title': 'در حال بارگذاری...',
      'loading.step.sdk': 'راه‌اندازی SDK...',
      'loading.step.settings': 'بارگذاری تنظیمات...',
      'loading.step.index': 'دریافت فهرست پایگاه داده...',
      'loading.step.layout': 'ساخت رابط کاربری...'
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
      'nav.settings': 'الإعدادات',
      'nav.github': 'GitHub',
      'nav.menu': 'القائمة',
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
      'status.unknown': 'غير معروف',
      'loading.title': 'جارٍ التحميل...',
      'loading.step.sdk': 'تهيئة SDK...',
      'loading.step.settings': 'تحميل الإعدادات...',
      'loading.step.index': 'جلب فهرس قاعدة البيانات...',
      'loading.step.layout': 'بناء الواجهة...'
    }
  }
};

const NAV_ICONS = {
  home: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>',
  database: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>',
  events: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>',
  stats: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>',
  submit: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>',
  settings: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>',
  github: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.74.5.09.68-.22.68-.49 0-.24-.01-.89-.01-1.75-2.78.62-3.36-1.37-3.36-1.37-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.37 1.12 2.95.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.11.38-2.01 1-2.72-.1-.26-.43-1.32.1-2.75 0 0 .82-.27 2.7 1.03.78-.22 1.62-.33 2.45-.33.83 0 1.67.11 2.45.33 1.88-1.3 2.7-1.03 2.7-1.03.53 1.43.2 2.49.1 2.75.62.71 1 1.61 1 2.72 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>'
};

const state = {
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

function updateLoadingStep(stepId, status) {
  const step = byId(stepId);
  if (step) {
    step.classList.remove('pending', 'active', 'done', 'error');
    step.classList.add(status);
  }
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

function createNavIcon(id) {
  const iconSvg = NAV_ICONS[id];
  if (!iconSvg) {
    return null;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(iconSvg, 'image/svg+xml');
  if (doc.documentElement.nodeName === 'parsererror') {
    console.error('Failed to parse SVG for icon:', id);
    return null;
  }
  return doc.documentElement;
}

function buildLoadingMarkup(key) {
  return `
    <div class="loading">
      <span class="spinner" aria-hidden="true"></span>
      <span data-i18n="${key}"></span>
    </div>
  `;
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
  const record = await client.fetchRecord(item.id);
  if (record) {
    item.status = String(record.status ?? item.status);
    item.searchText = buildSearchText(item, record);
  } else {
    item.searchText = buildSearchText(item, null);
  }
  return { item, record };
}

function buildRecordLinks(record, id) {
  const links = [];

  if (record && record.payload && record.payload.meta && record.payload.meta.issue_url) {
    links.push({
      label: t('labels.issue'),
      url: record.payload.meta.issue_url
    });
  }

  const recordUrl = client.getRecordUrl(id);
  if (recordUrl) {
    links.push({
      label: t('labels.record'),
      url: recordUrl
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

function getIndexViewByGroup(groupBy) {
  return client.buildView({ kind: 'index', group_by: groupBy });
}

function findLogDefByLimit(options = {}) {
  const defs = client.listIndexDefs().filter(def => def.kind === 'log');
  if (!defs.length) {
    return null;
  }
  let filtered = defs.filter(def => typeof def.limit === 'number');
  if (options.min !== undefined) {
    filtered = filtered.filter(def => def.limit >= options.min);
  }
  if (options.max !== undefined) {
    filtered = filtered.filter(def => def.limit <= options.max);
  }
  if (!filtered.length) {
    filtered = defs;
  }
  filtered.sort((a, b) => {
    const aLimit = typeof a.limit === 'number' ? a.limit : Number.MAX_SAFE_INTEGER;
    const bLimit = typeof b.limit === 'number' ? b.limit : Number.MAX_SAFE_INTEGER;
    if (options.prefer === 'large') {
      return bLimit - aLimit;
    }
    return aLimit - bLimit;
  });
  return filtered[0] || null;
}

function getLogView(options) {
  const def = findLogDefByLimit(options);
  if (!def) {
    return null;
  }
  return client.buildView(def);
}

async function loadHomeStats() {
  if (state.homeLoaded) {
    return;
  }
  const index = await client.getIndex();
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
    container.innerHTML = buildLoadingMarkup('database.loading');
    applyTranslations(container);
  }

  const index = await client.getIndex();
  const typeView = getIndexViewByGroup('type');
  const statusView = getIndexViewByGroup('status');
  const byType = await typeView.fetch();
  const byStatus = statusView ? await statusView.fetch() : null;

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

  const statusMap = client.buildStatusMap(byStatus);
  state.contentItems = client.buildContentItems(byType, statusMap);
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
    container.innerHTML = buildLoadingMarkup('events.loading');
    applyTranslations(container);
  }

  const typeView = getIndexViewByGroup('type');
  const statusView = getIndexViewByGroup('status');
  const byType = await typeView.fetch();
  const byStatus = statusView ? await statusView.fetch() : null;
  const eventIds = byType && byType.items ? byType.items.event || [] : [];

  if (!eventIds.length) {
    if (container) {
      container.innerHTML = '<p data-i18n="events.empty"></p>';
      applyTranslations(container);
    }
    state.eventsLoaded = true;
    return;
  }

  const statusMap = client.buildStatusMap(byStatus);
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

  const typeView = getIndexViewByGroup('type');
  const logRecentView = getLogView({ max: 200, prefer: 'small' });
  const logWideView = getLogView({ min: 500, prefer: 'large' });
  const byType = await typeView.fetch();
  const logsRecent = logRecentView ? await logRecentView.fetch() : null;
  const logsWide = logWideView ? await logWideView.fetch() : null;

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
      ${buildLoadingMarkup('database.loading')}
    </div>
  `;
}

function buildEventsSection(section) {
  section.innerHTML = `
    <h1 data-i18n="events.title"></h1>
    <p data-i18n="events.lead"></p>
    <div id="events-list" class="events-list">
      ${buildLoadingMarkup('events.loading')}
    </div>
  `;
}

function buildStatsSection(section) {
  section.innerHTML = `
    <h1 data-i18n="stats.title"></h1>
    <div class="stats-section">
      <h2 data-i18n="stats.content_distribution"></h2>
      <div id="content-stats" class="stats-table">
        ${buildLoadingMarkup('stats.loading')}
      </div>
    </div>
    <div class="stats-section">
      <h2 data-i18n="stats.submission_activity"></h2>
      <div id="submission-stats" class="stats-table">
        ${buildLoadingMarkup('stats.activity_loading')}
      </div>
    </div>
    <div class="stats-section">
      <h2 data-i18n="stats.recent_activity"></h2>
      <div id="recent-activity" class="activity-log">
        ${buildLoadingMarkup('stats.recent_loading')}
      </div>
    </div>
  `;
}

function buildSubmitSection(section) {
  const submitUrl = client.getSubmitUrl();
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
  const label = document.createElement('span');
  label.dataset.i18n = 'nav.language';
  container.appendChild(label);

  const select = document.createElement('select');
  select.id = 'language-select';
  select.className = 'language-select';
  select.addEventListener('change', () => {
    setLanguage(select.value);
  });
  container.appendChild(select);
  populateLanguageOptions(select);
}

function buildSettingsSection(section) {
  section.innerHTML = `
    <h1 data-i18n="nav.settings"></h1>
    <div id="language-setting"></div>
  `;
  const languageSetting = section.querySelector('#language-setting');
  if (languageSetting) {
    buildLanguagePicker(languageSetting);
  }
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
    enabled: () => !!client.findIndex({ kind: 'index', group_by: 'type' })
  },
  {
    id: 'events',
    labelKey: 'nav.events',
    build: buildEventsSection,
    load: loadEvents,
    enabled: () => !!client.findIndex({ kind: 'index', group_by: 'type' })
      && client.hasType('event')
  },
  {
    id: 'stats',
    labelKey: 'nav.stats',
    build: buildStatsSection,
    load: loadStats,
    enabled: () => !!client.findIndex({ kind: 'index', group_by: 'type' })
      || !!client.findIndex({ kind: 'log' })
  },
  {
    id: 'submit',
    labelKey: 'nav.submit',
    build: buildSubmitSection
  },
  {
    id: 'settings',
    labelKey: 'nav.settings',
    build: buildSettingsSection
  }
];

function buildLayout() {
  const navItems = byId('nav-items');
  const navItemsContainer = byId('nav-items-container');
  const navBrand = navItems ? navItems.querySelector('[data-nav-brand]') : null;
  const main = byId('main-content');
  if (!navItems || !navItemsContainer || !main) {
    return;
  }

  // Update brand link to point to default section
  if (navBrand) {
    navBrand.setAttribute('href', `#${DEFAULT_SECTION}`);
  }
  document.querySelectorAll('[data-site-title]').forEach(element => {
    element.setAttribute('href', `#${DEFAULT_SECTION}`);
  });

  // Clear the container and remove loading indicator
  navItemsContainer.innerHTML = '';

  // Remove app loading UI and clear main content
  const appLoading = byId('app-loading');
  if (appLoading) {
    appLoading.remove();
  }
  main.innerHTML = '';

  const sections = SECTION_DEFS.filter(def => (def.enabled ? def.enabled() : true));
  state.sections = sections.map(def => def.id);
  state.sectionMap = new Map(sections.map(def => [def.id, def]));

  sections.forEach(def => {
    const link = document.createElement('a');
    link.href = `#${def.id}`;
    link.dataset.nav = def.id;
    const icon = createNavIcon(def.id);
    if (icon) {
      link.appendChild(icon);
    }
    const label = document.createElement('span');
    label.dataset.i18n = def.labelKey || `nav.${def.id}`;
    link.appendChild(label);
    navItemsContainer.appendChild(link);

    const section = document.createElement('section');
    section.id = def.id;
    section.className = 'section';
    def.build(section);
    main.appendChild(section);
  });

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
  document.querySelectorAll('.nav-items a').forEach(link => {
    link.classList.remove('active');
  });

  const activeSection = byId(activeId);
  if (activeSection) {
    activeSection.classList.add('active');
    const activeNavLink = document.querySelector(`.nav-items a[data-nav="${activeId}"]`);
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
  // Apply translations to loading UI first
  applyTranslations(document);

  // Step 1: SDK check
  updateLoadingStep('step-sdk', 'active');
  if (!client) {
    console.error('IranDawn SDK is not loaded.');
    updateLoadingStep('step-sdk', 'error');
    return;
  }
  updateLoadingStep('step-sdk', 'done');

  // Step 2: Load settings
  updateLoadingStep('step-settings', 'active');
  state.settings = loadSettings();
  applyLanguage(state.settings.lang || DEFAULT_LANG);
  applyTranslations(document);
  updateLoadingStep('step-settings', 'done');

  // Step 3: Fetch database index
  updateLoadingStep('step-index', 'active');
  await client.getIndex();
  updateLoadingStep('step-index', 'done');

  // Step 4: Build layout
  updateLoadingStep('step-layout', 'active');
  buildLayout();

  initRouter();
}

document.addEventListener('DOMContentLoaded', () => {
  void initApp();
});
