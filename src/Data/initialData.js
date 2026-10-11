export const initialCategories = [
  {
    id: 'furniture',
    title: 'ציוד וריהוט לבית',
    items: [
      {
        id: 1,
        title: 'שטיח סלון וינטג׳ (דנה)',
        location: 'כפר מונש',
        region: 'שרון',
        image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=500&q=80',
        wanted: 'אופני הרים או מקדחה',
        condition: 'כמו חדש',
        description: 'שטיח צמר איכותי בעיצוב וינטג׳ נעים, נשמר במצב מעולה ללא כתמים.'
      },
      {
        id: 2,
        title: 'כורסת יחיד מרופדת',
        location: 'נתניה',
        region: 'שרון',
        image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d128d?auto=format&fit=crop&w=500&q=80',
        wanted: 'שולחן כתיבה או מדפים',
        condition: 'משומש',
        description: 'כורסה סופר נוחה עם ריפוד בד ירוק זית, נוחה מאוד לקריאה.'
      },
      {
        id: 3,
        title: 'שידת לילה עץ מלא',
        location: 'רעננה',
        region: 'מרכז',
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=500&q=80',
        wanted: 'מנורת עמידה או צמחים',
        condition: 'כמו חדש',
        description: 'שידה קטנה עם מגירה עמוקה, עשויה עץ אורן אמיתי.'
      }
    ]
  },
  {
    id: 'kitchen',
    title: 'כלי מטבח ואירוח',
    items: [
      {
        id: 4,
        title: 'מכונת קפה ידנית DeLonghi',
        location: 'תל אביב',
        region: 'מרכז',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebd02f2a888?auto=format&fit=crop&w=500&q=80',
        wanted: 'בלנדר חזק או מעבד מזון',
        condition: 'כמו חדש',
        description: 'מכונת קפה אספרסו שמורה ומתוחזקת היטב, כוללת ידית חליטה ודוחסן.'
      },
      {
        id: 5,
        title: 'סט סירים מפלדת אל-חלד',
        location: 'חיפה',
        region: 'צפון',
        image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=500&q=80',
        wanted: 'מחפש מיקסר או תנור אפייה קטן',
        condition: 'משומש',
        description: 'סט של 4 סירים בגדלים שונים במצב מצוין עם מכסי זכוכית.'
      }
    ]
  },
  {
    id: 'tools',
    title: 'כלי עבודה ו-DIY',
    items: [
      {
        id: 6,
        title: 'מקדחה נטענת בוש (אופיר)',
        location: 'חדרה',
        region: 'שרון',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80',
        wanted: 'שטיח סלון או תאורת גינה',
        condition: 'כמו חדש',
        description: 'מקדחה/מברגת אימפקט עוצמתית 18V כוללת שתי סוללות ומטען מקורי.'
      },
      {
        id: 7,
        title: 'סט מפתחות פתוחים/רינג',
        location: 'קיבוץ משמר העמק',
        region: 'צפון',
        image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=500&q=80',
        wanted: 'מסור אנכי או פטישון',
        condition: 'כמו חדש',
        description: 'סט מקצועי בתיק נשיאה קשיח, כמעט ולא נעשה בו שימוש.'
      }
    ]
  },
  {
    id: 'plants',
    title: 'עציצים וייחורים',
    items: [
      {
        id: 8,
        title: 'מנשדרה ענקית (מונסטרה) בעציץ מעוצב',
        location: 'כפר מונש',
        region: 'שרון',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80',
        wanted: 'עציצים קטנים או כלי קרמיקה',
        condition: 'חדש לגמרי',
        description: 'מונסטרה מרהיבה ובריאה עם עלים מחורצים ענקיים, מגיעה עם עציץ חרס.'
      },
      {
        id: 9,
        title: 'ייחורים של פוטוס זהוב וסקולנטים',
        location: 'זכרון יעקב',
        region: 'צפון',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80',
        wanted: 'אדניות עץ או ספר בישול',
        condition: 'חדש לגמרי',
        description: 'סט ייחורים מבוססים היטב במים, מוכנים לעציד באדניות.'
      }
    ]
  },
  {
    id: 'books',
    title: 'ספרים ועיון',
    items: [
      {
        id: 10,
        title: 'אוסף ספרי פנטזיה ומדע בדיוני',
        location: 'ירושלים',
        region: 'ירושלים',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
        wanted: 'ספרי בישול או טיולים בארץ',
        condition: 'כמו חדש',
        description: 'כ-10 ספרים שמורים היטב בכריכה קשה ממיטב הסופרים.'
      },
      {
        id: 11,
        title: 'אנציקלופדיית הידע והטבע (סט מלא)',
        location: 'באר שבע',
        region: 'דרום',
        image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=500&q=80',
        wanted: 'משחקי קופסה או פאזלים',
        condition: 'משומש',
        description: 'סט קלאסי מדהים לילדים ולסקרנים שמתעניינים בטבע וגאוגרפיה.'
      }
    ]
  },
  {
    id: 'fitness',
    title: 'ציוד כושר ויוגה',
    items: [
      {
        id: 12,
        title: 'מזרן יغا איכותי + בלוקים',
        location: 'תל אביב',
        region: 'מרכז',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80',
        wanted: 'משקולות יד או גומיות התנגדות',
        condition: 'חדש לגמרי',
        description: 'מזרן עבה במיוחד נגד החלקה כולל שני קוביות שורק מעץ.'
      },
      {
        id: 13,
        title: 'סט משקולות יד מתכוונן (עד 10 ק"ג)',
        location: 'מודיעין',
        region: 'מרכז',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=500&q=80',
        wanted: 'מתח לפתח דלת או כדור פיזיו',
        condition: 'כמו חדש',
        description: 'משקולות מעולות לאימונים בבית, נוחות מאוד לשינוי משקל.'
      }
    ]
  },
  {
    id: 'boardgames',
    title: 'משחקי קופסה ופאזלים',
    items: [
      {
        id: 14,
        title: 'משחק קטאן (Catan) מקורי',
        location: 'הוד השרון',
        region: 'מרכז',
        image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=500&q=80',
        wanted: 'משחקי קופסה אחרים למבוגרים',
        condition: 'כמו חדש',
        description: 'המשחק המיתולוגי באריזה המקורית, כל החלקים בפנים במצב מושלם.'
      },
      {
        id: 15,
        title: 'פאזל 1000 חלקים - נוף טוסקנה',
        location: 'נתניה',
        region: 'שרון',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=500&q=80',
        wanted: 'ספר מתח טוב או משחק קלפים',
        condition: 'חדש לגמרי',
        description: 'הורכב פעם אחת בלבד, כל החלקים קיימים באחריות.'
      }
    ]
  },
  {
    id: 'camping',
    title: 'ציוד קמפינג וטיולים',
    items: [
      {
        id: 16,
        title: 'אוהל בין רגע ל-4 אנשים',
        location: 'כפר סבא',
        region: 'מרכז',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=500&q=80',
        wanted: 'ציוד בישול שדה או פרימוס',
        condition: 'כמו חדש',
        description: 'אוהל איכותי שנפתח תוך דקה, כולל תיק נשיאה ויתדות.'
      },
      {
        id: 17,
        title: 'צידנית קשיחה גדולה (35 ליטר)',
        location: 'חיפה',
        region: 'צפון',
        image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=500&q=80',
        wanted: 'כיסאות קמפינג מתקפלים',
        condition: 'משומש',
        description: 'שומרת על קור לאורך שעות ארוכות בים או בטיולים.'
      }
    ]
  },
  {
    id: 'electronics',
    title: 'מוצרי חשמל',
    items: [
      {
        id: 18,
        title: 'מקרן נייד XGIMI MoGo',
        location: 'הרצליה',
        region: 'מרכז',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80',
        wanted: 'ציוד סאונד או רמקולים',
        condition: 'חדש לגמרי',
        description: 'מקרן קולנוע ביתי איכותי וקומפקטי, עובד מצוין לצפייה בחצר או בסלון.'
      }
    ]
  },
  {
    id: 'sports',
    title: 'ספורט ופנאי',
    items: [
      {
        id: 19,
        title: 'גלשן ים סופט (Softboard)',
        location: 'תל אביב',
        region: 'מרכז',
        image: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?auto=format&fit=crop&w=500&q=80',
        wanted: 'אופניים או ציוד צלילה',
        condition: 'משומש',
        description: 'גלשן מעולה למתחילים ולמתקדמים, יציב ובטוח לגלים.'
      },
      {
        id: 20,
        title: 'קורקינט עירוני מתקפל',
        location: 'רמת גן',
        region: 'מרכז',
        image: 'https://images.unsplash.com/photo-1564865878688-9a244444042a?auto=format&fit=crop&w=500&q=80',
        wanted: 'רמקול בלוטות׳ נייד',
        condition: 'כמו חדש',
        description: 'מהיר, קל משקל ונוח מאוד לנשיאה באוטובוסים ובכاعة.'
      }
    ]
  },
  { id: 'kids', title: 'תינוקות וילדים', items: [] },
  { id: 'fashion', title: 'אופנה ואקססוריז', items: [] },
  { id: 'art', title: 'אמנות ויצירה', items: [] },
  { id: 'music', title: 'מוזיקה וכלי נגינה', items: [] },
  { id: 'gaming', title: 'גיימינג ופנאי', items: [] },
  { id: 'office', title: 'ציוד משרדי ועבודה מהבית', items: [] },
  { id: 'photography', title: 'צילום ומצלמות', items: [] },
  { id: 'decor', title: 'עיצוב הבית ותאורה', items: [] },
  { id: 'baking', title: 'אפייה וקונדיטוריה', items: [] },
  { id: 'auto', title: 'ציוד לרכב ודו-גלגלי', items: [] },
  { id: 'pets', title: 'ציוד לבעלי חיים', items: [] },
  { id: 'beauty', title: 'טיפוח וספא', items: [] },
  { id: 'hobbies', title: 'תחביבים ואספנות', items: [] },
  { id: 'other', title: 'שונות / אחר', items: [] }
];