const seatingTranslations = {
  vi: {
    seating_page_title: 'Thịnh & Vy — Sơ Đồ Chỗ Ngồi', seating_meta_description: 'Sơ đồ chỗ ngồi lễ thành hôn của Thịnh và Vy.',
    seating_skip: 'Tìm chỗ ngồi của bạn', back_invitation_aria: 'Trở về thiệp cưới', back_invitation: 'Thiệp cưới', seating_heading: 'Sơ đồ chỗ ngồi', hall_section: 'Sơ đồ sảnh tiệc',
    finder_kicker: 'Tìm chỗ của bạn', finder_title: 'Bạn tên là gì?', guest_name: 'Tên khách mời', search_placeholder: 'Ví dụ: Cậu Anh, Nguyễn Văn Anh…',
    finder_help: 'Chọn tên trong danh sách gợi ý để xem vị trí bàn.', plan_legend: 'Chú giải sơ đồ', banquet_table_legend: 'Bàn tiệc · 12 ghế', main_aisle: 'Lối đi chính', pan_hint: 'Vuốt ngang để xem toàn bộ sơ đồ',
    hall_scroll: 'Sơ đồ sảnh tiệc, có thể cuộn ngang trên màn hình nhỏ', stage: 'Sân khấu', aisle: 'Lối đi', hall_entrances: 'Lối vào sảnh tiệc', entrance: 'Lối vào', groom_family: 'Nhà trai', bride_family: 'Nhà gái',
    welcome_hall: 'Chào mừng bạn đến chung vui cùng chúng mình', seating_load_error: 'Chưa thể tải sơ đồ chỗ ngồi. Bạn vui lòng thử tải lại trang.',
    dialog_close: 'Đóng danh sách khách', guest_list_table: 'Danh sách khách · Bàn', footer_meet: 'Hẹn gặp bạn tại ngày vui của', seating_footer_credits: 'Mỹ thuật: VY TRAN · Kỹ thuật: THINH HOANG',
    seating_unavailable_eyebrow: 'Thông báo', seating_unavailable_title: 'Sơ đồ chỗ ngồi', seating_unavailable_message: 'Sơ đồ chỗ ngồi chưa được cập nhật. Hãy kiểm tra lại khi gần đến ngày cưới nhé. Thành thật xin lỗi và cảm ơn bạn.',
    search_empty: 'Không tìm thấy tên phù hợp. Bạn thử tên đầy đủ hoặc cách gọi khác nhé.', search_no_match: 'Chưa tìm thấy khách mời phù hợp.',
    dialog_updating: 'Danh sách khách đang được cập nhật', dialog_empty: 'Chúng mình sẽ bổ sung tên khách tại bàn này sớm nhé.', load_guests_error: 'Chưa thể tải danh sách khách mời.',
    table_word: 'Bàn', seating_table_label: (id, label) => `Bàn ${id} · ${label}`, search_results: (count) => `${count} tên phù hợp — chọn đúng tên của bạn.`,
    guest_seated_suffix: (id, label) => ` ngồi tại Bàn ${id} — ${label}.`, dialog_guest_count: (count) => `${count} khách trong danh sách`,
    table_aria: (id, label) => `Bàn ${id}: ${label}, 12 ghế`, table_guests_aria: (id, label) => `Xem danh sách khách tại Bàn ${id}: ${label}`,
    table_labels: {},
  },
  en: {
    seating_page_title: 'Thịnh & Vy — Seating Plan', seating_meta_description: 'Seating plan for Thịnh and Vy’s wedding.',
    seating_skip: 'Find your seat', back_invitation_aria: 'Return to the wedding invitation', back_invitation: 'Invitation', seating_heading: 'Seating Plan', hall_section: 'Reception hall seating plan',
    finder_kicker: 'Find your seat', finder_title: 'What is your name?', guest_name: 'Guest name', search_placeholder: 'For example: Cậu Anh, Nguyễn Văn Anh…',
    finder_help: 'Select your name from the suggestions to see your table.', plan_legend: 'Seating plan legend', banquet_table_legend: 'Dining table · 12 seats', main_aisle: 'Main aisle', pan_hint: 'Swipe horizontally to view the full plan',
    hall_scroll: 'Reception hall seating plan; scroll horizontally on smaller screens', stage: 'Stage', aisle: 'Aisle', hall_entrances: 'Reception hall entrances', entrance: 'Entrance', groom_family: 'Groom’s side', bride_family: 'Bride’s side',
    welcome_hall: 'Welcome—thank you for celebrating with us', seating_load_error: 'The seating plan could not be loaded. Please reload the page.',
    dialog_close: 'Close guest list', guest_list_table: 'Guest list · Table', footer_meet: 'We look forward to celebrating with you at the wedding of', seating_footer_credits: 'Lead Artist: VY TRAN · Engineering: THINH HOANG',
    seating_unavailable_eyebrow: 'Notice', seating_unavailable_title: 'Seating Plan', seating_unavailable_message: 'The seating plan has not been updated yet. Please check again closer to the wedding date. We sincerely apologize, and thank you for your understanding.',
    search_empty: 'No matching name was found. Try your full name or another familiar name.', search_no_match: 'No matching guest was found.',
    dialog_updating: 'The guest list is being updated', dialog_empty: 'Guest names for this table will be added soon.', load_guests_error: 'The guest list could not be loaded.',
    table_word: 'Table', seating_table_label: (id, label) => `Table ${id} · ${label}`, search_results: (count) => `${count} matching name${count === 1 ? '' : 's'} — select yours.`,
    guest_seated_suffix: (id, label) => ` is seated at Table ${id} — ${label}.`, dialog_guest_count: (count) => `${count} guest${count === 1 ? '' : 's'} on the list`,
    table_aria: (id, label) => `Table ${id}: ${label}, 12 seats`, table_guests_aria: (id, label) => `View the guest list for Table ${id}: ${label}`,
    table_labels: {
      'Gia đình nhà trai': 'Groom’s family', 'Họ hàng nhà trai': 'Groom’s relatives', 'Bạn bè Ba Mẹ chú rể': 'Friends of the groom’s parents', 'Hàng xóm nhà trai': 'Groom’s family neighbours',
      'GV Đại học Bách Khoa & Đại học Văn Lang': 'Faculty of Bach Khoa & Van Lang Universities', 'Cựu SV Bách Khoa': 'Bach Khoa alumni', 'Đồng nghiệp chú rể': 'Groom’s colleagues',
      'Bạn THPT chú rể': 'Groom’s high-school friends', 'Bạn đại học chú rể': 'Groom’s university friends', 'Bạn bè chú rể': 'Groom’s friends',
      'Gia đình nhà gái': 'Bride’s family', 'Họ hàng nhà gái': 'Bride’s relatives', 'Bạn THPT cô dâu': 'Bride’s high-school friends', 'Bạn đại học cô dâu': 'Bride’s university friends',
      'Bạn bè Ba Mẹ cô dâu': 'Friends of the bride’s parents', 'Đồng nghiệp cô dâu': 'Bride’s colleagues', 'Bạn bè cô dâu': 'Bride’s friends', 'Bạn bè Thịnh & Vy': 'Friends of Thịnh & Vy', 'Ban tổ chức & Media': 'Event team & media',
    },
  },
  fr: {
    seating_page_title: 'Thịnh & Vy — Plan de table', seating_meta_description: 'Plan de table du mariage de Thịnh et Vy.',
    seating_skip: 'Trouver votre place', back_invitation_aria: 'Retourner au faire-part de mariage', back_invitation: 'Faire-part', seating_heading: 'Plan de table', hall_section: 'Plan de la salle de réception',
    finder_kicker: 'Trouvez votre place', finder_title: 'Comment vous appelez-vous ?', guest_name: 'Nom de l’invité', search_placeholder: 'Par exemple : Cậu Anh, Nguyễn Văn Anh…',
    finder_help: 'Sélectionnez votre nom dans les suggestions pour voir votre table.', plan_legend: 'Légende du plan', banquet_table_legend: 'Table · 12 places', main_aisle: 'Allée centrale', pan_hint: 'Faites glisser horizontalement pour voir tout le plan',
    hall_scroll: 'Plan de la salle de réception ; défilement horizontal sur petit écran', stage: 'Scène', aisle: 'Allée', hall_entrances: 'Entrées de la salle', entrance: 'Entrée', groom_family: 'Côté marié', bride_family: 'Côté mariée',
    welcome_hall: 'Bienvenue et merci de célébrer avec nous', seating_load_error: 'Le plan de table ne peut pas être chargé. Veuillez actualiser la page.',
    dialog_close: 'Fermer la liste des invités', guest_list_table: 'Liste des invités · Table', footer_meet: 'Au plaisir de vous retrouver pour le mariage de', seating_footer_credits: 'Artiste principale : VY TRAN · Ingénierie : THINH HOANG',
    seating_unavailable_eyebrow: 'Information', seating_unavailable_title: 'Plan de table', seating_unavailable_message: 'Le plan de table n’est pas encore à jour. Merci de revenir à l’approche du mariage. Nous vous prions sincèrement de nous excuser et vous remercions de votre compréhension.',
    search_empty: 'Aucun nom correspondant. Essayez votre nom complet ou un autre nom familier.', search_no_match: 'Aucun invité correspondant trouvé.',
    dialog_updating: 'La liste des invités est en cours de mise à jour', dialog_empty: 'Les noms des invités de cette table seront bientôt ajoutés.', load_guests_error: 'La liste des invités ne peut pas être chargée.',
    table_word: 'Table', seating_table_label: (id, label) => `Table ${id} · ${label}`, search_results: (count) => `${count} nom${count > 1 ? 's' : ''} correspondant${count > 1 ? 's' : ''} — sélectionnez le vôtre.`,
    guest_seated_suffix: (id, label) => ` est à la table ${id} — ${label}.`, dialog_guest_count: (count) => `${count} invité${count > 1 ? 's' : ''} sur la liste`,
    table_aria: (id, label) => `Table ${id} : ${label}, 12 places`, table_guests_aria: (id, label) => `Voir la liste des invités de la table ${id} : ${label}`,
    table_labels: {
      'Gia đình nhà trai': 'Famille du marié', 'Họ hàng nhà trai': 'Proches du marié', 'Bạn bè Ba Mẹ chú rể': 'Amis des parents du marié', 'Hàng xóm nhà trai': 'Voisins de la famille du marié',
      'GV Đại học Bách Khoa & Đại học Văn Lang': 'Enseignants des universités Bach Khoa et Van Lang', 'Cựu SV Bách Khoa': 'Anciens étudiants de Bach Khoa', 'Đồng nghiệp chú rể': 'Collègues du marié',
      'Bạn THPT chú rể': 'Amis de lycée du marié', 'Bạn đại học chú rể': 'Amis d’université du marié', 'Bạn bè chú rể': 'Amis du marié',
      'Gia đình nhà gái': 'Famille de la mariée', 'Họ hàng nhà gái': 'Proches de la mariée', 'Bạn THPT cô dâu': 'Amis de lycée de la mariée', 'Bạn đại học cô dâu': 'Amis d’université de la mariée',
      'Bạn bè Ba Mẹ cô dâu': 'Amis des parents de la mariée', 'Đồng nghiệp cô dâu': 'Collègues de la mariée', 'Bạn bè cô dâu': 'Amis de la mariée', 'Bạn bè Thịnh & Vy': 'Amis de Thịnh & Vy', 'Ban tổ chức & Media': 'Équipe organisatrice et médias',
    },
  },
  zh: {
    seating_page_title: 'Thịnh & Vy — 婚宴座位图', seating_meta_description: 'Thịnh 与 Vy 婚礼的宾客座位图。',
    seating_skip: '查找您的座位', back_invitation_aria: '返回婚礼请柬', back_invitation: '婚礼请柬', seating_heading: '婚宴座位图', hall_section: '婚宴大厅座位图',
    finder_kicker: '查找您的座位', finder_title: '请输入您的姓名', guest_name: '宾客姓名', search_placeholder: '例如：Cậu Anh、Nguyễn Văn Anh…',
    finder_help: '请从建议列表中选择您的姓名以查看桌位。', plan_legend: '座位图图例', banquet_table_legend: '宴会桌 · 12个座位', main_aisle: '中央通道', pan_hint: '横向滑动以查看完整座位图',
    hall_scroll: '婚宴大厅座位图；小屏幕上可横向滚动', stage: '舞台', aisle: '通道', hall_entrances: '婚宴大厅入口', entrance: '入口', groom_family: '男方亲友', bride_family: '女方亲友',
    welcome_hall: '欢迎您前来与我们共同庆祝', seating_load_error: '暂时无法加载座位图，请刷新页面重试。', dialog_close: '关闭宾客名单', guest_list_table: '宾客名单 · 桌号',
    seating_unavailable_eyebrow: '通知', seating_unavailable_title: '婚宴座位图', seating_unavailable_message: '婚宴座位图尚未更新。请在临近婚礼日期时再次查看。给您带来不便，我们深表歉意，并感谢您的理解。',
    footer_meet: '期待在婚礼上与您相见', seating_footer_credits: '首席艺术：VY TRAN · 技术：THINH HOANG', search_empty: '未找到匹配的姓名，请尝试输入全名或其他常用称呼。', search_no_match: '未找到匹配的宾客。',
    dialog_updating: '宾客名单正在更新', dialog_empty: '此桌的宾客姓名将很快补充。', load_guests_error: '暂时无法加载宾客名单。',
    table_word: '桌号', seating_table_label: (id, label) => `${id}号桌 · ${label}`, search_results: (count) => `找到${count}个匹配姓名——请选择您的姓名。`, guest_seated_suffix: (id, label) => `的座位在${id}号桌——${label}。`,
    dialog_guest_count: (count) => `名单中有${count}位宾客`, table_aria: (id, label) => `${id}号桌：${label}，12个座位`, table_guests_aria: (id, label) => `查看${id}号桌的宾客名单：${label}`,
    table_labels: {
      'Gia đình nhà trai': '新郎家属', 'Họ hàng nhà trai': '新郎亲戚', 'Bạn bè Ba Mẹ chú rể': '新郎父母的朋友', 'Hàng xóm nhà trai': '新郎家的邻居',
      'GV Đại học Bách Khoa & Đại học Văn Lang': '百科大学与文朗大学教师', 'Cựu SV Bách Khoa': '百科大学校友', 'Đồng nghiệp chú rể': '新郎同事',
      'Bạn THPT chú rể': '新郎高中同学', 'Bạn đại học chú rể': '新郎大学同学', 'Bạn bè chú rể': '新郎朋友',
      'Gia đình nhà gái': '新娘家属', 'Họ hàng nhà gái': '新娘亲戚', 'Bạn THPT cô dâu': '新娘高中同学', 'Bạn đại học cô dâu': '新娘大学同学',
      'Bạn bè Ba Mẹ cô dâu': '新娘父母的朋友', 'Đồng nghiệp cô dâu': '新娘同事', 'Bạn bè cô dâu': '新娘朋友', 'Bạn bè Thịnh & Vy': 'Thịnh 与 Vy 的朋友', 'Ban tổ chức & Media': '婚礼策划与媒体团队',
    },
  },
  ja: {
    seating_page_title: 'Thịnh & Vy — 席次表', seating_meta_description: 'ThịnhとVyの結婚披露宴の席次表です。',
    seating_skip: 'お席を探す', back_invitation_aria: '結婚式の招待状に戻る', back_invitation: '招待状', seating_heading: '席次表', hall_section: '披露宴会場の席次表',
    finder_kicker: 'お席を探す', finder_title: 'お名前を入力してください', guest_name: 'ゲストのお名前', search_placeholder: '例：Cậu Anh、Nguyễn Văn Anh…',
    finder_help: '候補リストからお名前を選ぶと、テーブルの位置を確認できます。', plan_legend: '席次表の凡例', banquet_table_legend: 'テーブル · 12席', main_aisle: '中央通路', pan_hint: '横にスワイプして席次表全体を表示',
    hall_scroll: '披露宴会場の席次表。小さい画面では横にスクロールできます', stage: 'ステージ', aisle: '通路', hall_entrances: '披露宴会場の入口', entrance: '入口', groom_family: '新郎側', bride_family: '新婦側',
    welcome_hall: '私たちのお祝いにお越しいただきありがとうございます', seating_load_error: '席次表を読み込めませんでした。ページを再読み込みしてください。',
    dialog_close: 'ゲストリストを閉じる', guest_list_table: 'ゲストリスト · テーブル', footer_meet: '結婚式でお会いできることを楽しみにしています', seating_footer_credits: 'リードアーティスト：VY TRAN · エンジニアリング：THINH HOANG',
    seating_unavailable_eyebrow: 'お知らせ', seating_unavailable_title: '席次表', seating_unavailable_message: '席次表はまだ更新されていません。挙式日が近づきましたら、もう一度ご確認ください。心よりお詫び申し上げるとともに、ご理解に感謝いたします。',
    search_empty: '一致するお名前が見つかりません。フルネームまたは別の呼び名をお試しください。', search_no_match: '一致するゲストが見つかりません。',
    dialog_updating: 'ゲストリストを更新しています', dialog_empty: 'このテーブルのゲスト名は近日中に追加されます。', load_guests_error: 'ゲストリストを読み込めませんでした。',
    table_word: '卓', seating_table_label: (id, label) => `テーブル${id} · ${label}`, search_results: (count) => `${count}件のお名前が見つかりました。ご自身のお名前を選択してください。`,
    guest_seated_suffix: (id, label) => `様のお席はテーブル${id}（${label}）です。`, dialog_guest_count: (count) => `リストに${count}名`,
    table_aria: (id, label) => `テーブル${id}：${label}、12席`, table_guests_aria: (id, label) => `テーブル${id}のゲストリストを見る：${label}`,
    table_labels: {
      'Gia đình nhà trai': '新郎のご家族', 'Họ hàng nhà trai': '新郎のご親族', 'Bạn bè Ba Mẹ chú rể': '新郎ご両親のご友人', 'Hàng xóm nhà trai': '新郎家のご近所',
      'GV Đại học Bách Khoa & Đại học Văn Lang': 'バックコア大学・ヴァンラン大学教員', 'Cựu SV Bách Khoa': 'バックコア大学同窓生', 'Đồng nghiệp chú rể': '新郎の同僚',
      'Bạn THPT chú rể': '新郎の高校時代の友人', 'Bạn đại học chú rể': '新郎の大学時代の友人', 'Bạn bè chú rể': '新郎の友人',
      'Gia đình nhà gái': '新婦のご家族', 'Họ hàng nhà gái': '新婦のご親族', 'Bạn THPT cô dâu': '新婦の高校時代の友人', 'Bạn đại học cô dâu': '新婦の大学時代の友人',
      'Bạn bè Ba Mẹ cô dâu': '新婦ご両親のご友人', 'Đồng nghiệp cô dâu': '新婦の同僚', 'Bạn bè cô dâu': '新婦の友人', 'Bạn bè Thịnh & Vy': 'ThịnhとVyの友人', 'Ban tổ chức & Media': '運営・メディアチーム',
    },
  },
};

const translations = {
  vi: {
    ...seatingTranslations.vi,
    htmlLang: 'vi', locale: 'vi-VN',
    page_title: 'Vy & Thịnh — Thiệp Mời Lễ Thành Hôn',
    meta_description: 'Thiệp mời lễ thành hôn của Thịnh và Vy — Chủ Nhật, ngày 02 tháng 08 năm 2026.',
    skip_hero: 'Bỏ qua ảnh mở đầu', brand_home: 'Thịnh và Vy — trở về đầu trang',
    navigation: 'Điều hướng thiệp cưới', language: 'Ngôn ngữ', language_select: 'Chọn ngôn ngữ',
    menu_open: 'Mở trình đơn', menu_close: 'Đóng trình đơn', theme_to_dark: 'Chuyển sang giao diện tối', theme_to_light: 'Chuyển sang giao diện sáng',
    nav_invitation: 'Thiệp báo tin', nav_gallery: 'Thư viện ảnh', nav_menu: 'Thực đơn', nav_countdown: 'Đếm ngược',
    nav_schedule: 'Chương trình', nav_seating_plan: 'Sơ đồ chỗ ngồi', nav_wishes: 'Lời chúc phúc', nav_find_seat: 'Tìm chỗ ngồi',
    photo_hero_alt: 'Thịnh và Vy đứng bên nhau dưới vòm cây xanh', save_the_date: 'Save the Date', hero_shortcuts: 'Lối tắt thiệp cưới', hero_invitation: 'Thiệp báo tin',
    families: 'Hai gia đình', parents: 'Ông, Bà', family_address: 'P. Bàn Cờ, Tp. Hồ Chí Minh',
    announce: 'Trân trọng báo tin', wedding_ceremony: 'Lễ Thành Hôn', our_children: 'của hai con chúng tôi',
    couple_intro: 'Hoàng Đình Thịnh — Quý Nam và Trần Nhật Vy — Ái Nữ', son: 'Quý Nam', daughter: 'Ái Nữ',
    ceremony_home: 'Hôn lễ được cử hành tại tư gia', full_date: 'Chủ Nhật, 02 tháng 08 năm 2026', lunar_date: 'Nhằm ngày 20 tháng 06 năm Bính Ngọ',
    gallery_title: 'Thư viện ảnh', gallery_viewer: 'Xem ảnh cưới', gallery_close: 'Đóng ảnh', gallery_previous: 'Ảnh trước', gallery_next: 'Ảnh tiếp theo',
    gallery_show_more: 'Xem thêm', gallery_show_less: 'Thu gọn', gallery_tabs: 'Chọn bộ sưu tập ảnh', gallery_pre_wedding: 'Pre-wedding', gallery_wedding: 'Wedding',
    gallery_wedding_empty: 'Hãy quay trở lại sau ngày cưới để tìm ảnh của bạn ở đây nhé.',
    menu_kicker: 'Tiệc mừng', menu_title: 'Thực đơn', menu_intro: 'Sáu món được phục vụ theo thứ tự bên dưới, dành cho bàn tiệc 10 khách.',
    dish_1: 'Bông bí nhồi thịt · Gỏi bò bóp thấu', dish_2: 'Tôm chiên giòn sốt mayonnaise thơm', dish_3: 'Bò tiêu xanh · Bánh mì',
    dish_4: 'Xôi gà nướng thập cẩm', dish_5: 'Lẩu cá tầm măng chua · Bún tươi', dish_6: 'Panna cotta việt quất',
    allergen_1: 'Có thể chứa: đậu nành, cá (nước mắm), đậu phộng.', allergen_2: 'Có thể chứa: giáp xác, trứng, lúa mì (gluten).',
    allergen_3: 'Có thể chứa: lúa mì (gluten), sữa, đậu nành.', allergen_4: 'Có thể chứa: đậu nành, mè.', allergen_5: 'Có thể chứa: cá, đậu nành.',
    allergen_6: 'Có thể chứa: sữa; có thể có các loại hạt dùng trang trí.',
    allergy_disclaimer: 'Thông tin dị ứng dựa trên cách chế biến phổ biến. Thành phần và nguy cơ tiếp xúc chéo có thể thay đổi; vui lòng ghi rõ mọi dị ứng trong biểu mẫu để nhà hàng xác nhận.',
    meal_request_prompt: 'Bạn dùng món chay hoặc có yêu cầu riêng?', meal_request_open: 'Gửi yêu cầu món ăn', meal_dialog_close: 'Đóng biểu mẫu món ăn',
    meal_dialog_kicker: 'Dành riêng cho bạn', meal_dialog_title: 'Yêu cầu món ăn', meal_dialog_intro: 'Cho chúng mình biết lựa chọn của bạn. Mỗi khách vui lòng gửi một biểu mẫu.',
    meal_name: 'Tên khách mời', meal_preference: 'Lựa chọn món ăn', meal_standard: 'Thực đơn mặn', meal_standard_hint: 'Sáu món được giới thiệu ở trên',
    meal_vegetarian: 'Thực đơn chay', meal_vegetarian_hint: 'Set 01 gồm bốn món chay của nhà hàng',
    vegetarian_fixed_title: 'Set chay 01 · 4 món', vegetarian_fixed_intro: 'Đây là lựa chọn chay duy nhất được phục vụ.',
    vegetarian_dish_1: 'Súp Bào Ngư Vi Cá Hải Sâm', vegetarian_dish_2: 'Bò Xào Hương Truffle · Bánh Mì',
    vegetarian_dish_3: 'Cơm Chiên Kỷ Tử', vegetarian_dish_4: 'Trái Cây (Cam & Nho)',
    vegetarian_allergen_1: 'Có thể chứa: đậu nành, lúa mì (gluten), mè.', vegetarian_allergen_2: 'Có thể chứa: đậu nành, lúa mì (gluten).',
    vegetarian_allergen_3: 'Có thể chứa: đậu nành, mè.', vegetarian_allergen_4: 'Không nhận diện chất gây dị ứng phổ biến; vẫn có nguy cơ tiếp xúc chéo.',
    vegetarian_allergy_note: 'Thành phần và nguy cơ tiếp xúc chéo có thể thay đổi. Hãy ghi rõ mọi dị ứng của bạn bên dưới để nhà hàng xác nhận.',
    meal_notes: 'Ghi chú cá nhân hoặc dị ứng', meal_notes_placeholder: 'Ví dụ: dị ứng đậu phộng, không dùng sữa…', meal_submit: 'Gửi yêu cầu',
    meal_sending: 'Đang gửi…', meal_sending_status: 'Đang gửi yêu cầu món ăn của bạn…', meal_name_required: 'Bạn vui lòng cho chúng mình biết tên nhé.',
    meal_success: 'Đã ghi nhận yêu cầu của bạn. Cảm ơn bạn ❦', meal_error: 'Chưa thể gửi yêu cầu lúc này. Bạn vui lòng thử lại sau nhé.',
    countdown_section: 'Đếm ngược đến ngày trọng đại', countdown_line_one: 'Cùng đếm ngược đến', countdown_line_two: 'ngày trọng đại',
    countdown_timer: 'Thời gian còn lại đến lễ cưới', days: 'Ngày', hours: 'Giờ', minutes: 'Phút', countdown_complete: 'Ngày hạnh phúc đã đến',
    photo_portrait_alt: 'Chân dung Thịnh và Vy giữa vòm cây', schedule_title: 'Chương trình hôn lễ', schedule_date: 'Chủ Nhật, ngày 02 tháng 08 năm 2026',
    morning: 'Buổi sáng', ancestral_ceremony: 'Lễ Gia Tiên', at_home: 'Tại tư gia', noon: 'Buổi trưa', wedding_reception: 'Tiệc Cưới',
    ban_co: 'Phường Bàn Cờ', an_nhon: 'Phường An Nhơn', hcm_city_short: 'Tp.HCM', venue_and: '&',
    ban_co_map: 'Phường Bàn Cờ, Tp.HCM — mở trong cửa sổ mới', an_nhon_map: 'Phường An Nhơn, Tp.HCM — mở trong cửa sổ mới',
    reception_address: '202 Hoàng Văn Thụ, P. Đức Nhuận, Tp.HCM', reception_map: '202 Hoàng Văn Thụ, P. Đức Nhuận, Tp.HCM — mở trong cửa sổ mới',
    thanks_section: 'Lời cảm ơn', photo_forest_alt: 'Thịnh và Vy giữa rừng thông',
    thanks_line_one: 'Cảm ơn bạn đã đến,', thanks_line_two: 'để ngày hạnh phúc của chúng tôi', thanks_line_three: 'thêm trọn vẹn.',
    wishes_title: 'Lời Chúc Phúc', wishes_intro: 'Gửi đến Thịnh & Vy đôi lời chúc phúc thân thương.', wish_stats: 'Thống kê lời chúc',
    wishes_stat: 'Lời chúc', countries_stat: 'Quốc gia', wish_name: 'Tên của bạn', wish_message_label: 'Lời chúc dành cho cô dâu chú rể',
    wish_message_placeholder: 'Viết lời chúc của bạn…', wish_submit: 'Gửi lời chúc', wish_sending: 'Đang gửi…', wish_sending_status: 'Đang gửi lời chúc của bạn…',
    wish_name_required: 'Bạn vui lòng cho chúng tôi biết tên nhé.', wish_message_required: 'Bạn vui lòng viết đôi lời chúc nhé.',
    wish_success: 'Cảm ơn bạn đã gửi lời chúc đến Thịnh & Vy ❦', wish_error: 'Chưa thể gửi lời chúc lúc này. Bạn vui lòng thử lại sau nhé.',
    footer_wedding: 'Hôn lễ Vy & Thịnh - 02.08.2026', footer_artist: 'Mỹ thuật: Vy Tran',
    music_on: 'Bật nhạc nền', music_off: 'Tắt nhạc nền',
    gallery_open: (number, description) => `Mở ảnh ${number}: ${description}`,
    photos: [
      'Thịnh và Vy đứng bên nhau dưới vòm cây xanh', 'Thịnh khẽ nâng khăn voan của Vy bên hồ giữa rừng cây',
      'Thịnh và Vy trong khung cảnh rừng thông rộng lớn', 'Chân dung Thịnh và Vy giữa vòm cây',
      'Thịnh và Vy trong khoảnh khắc bên hồ dưới vòm lá', 'Một khoảnh khắc của Thịnh và Vy giữa thiên nhiên',
      'Chân dung đời thường của Vy bên hồ', 'Chân dung đời thường của Vy bên kệ sách',
    ],
  },
  en: {
    ...seatingTranslations.en,
    htmlLang: 'en', locale: 'en-US',
    page_title: 'Vy & Thịnh — Wedding Invitation', meta_description: 'Wedding invitation for Thịnh and Vy — Sunday, August 2, 2026.',
    skip_hero: 'Skip the opening photo', brand_home: 'Thịnh and Vy — back to top', navigation: 'Wedding invitation navigation', language: 'Language', language_select: 'Choose language',
    menu_open: 'Open menu', menu_close: 'Close menu', theme_to_dark: 'Switch to dark theme', theme_to_light: 'Switch to light theme', nav_invitation: 'Invitation', nav_gallery: 'Gallery', nav_menu: 'Menu', nav_countdown: 'Countdown', nav_schedule: 'Schedule',
    nav_seating_plan: 'Seating plan', nav_wishes: 'Well wishes', nav_find_seat: 'Find your seat', photo_hero_alt: 'Thịnh and Vy standing together beneath green trees', save_the_date: 'Save the date',
    hero_shortcuts: 'Invitation shortcuts', hero_invitation: 'View invitation', families: 'The two families', parents: 'Mr. & Mrs.', family_address: 'Bàn Cờ Ward, Ho Chi Minh City',
    announce: 'Joyfully announce', wedding_ceremony: 'Wedding Ceremony', our_children: 'of our beloved children',
    couple_intro: 'Hoàng Đình Thịnh — Son and Trần Nhật Vy — Daughter', son: 'Son', daughter: 'Daughter',
    ceremony_home: 'The ceremony will be held at the family residence', full_date: 'Sunday, August 2, 2026', lunar_date: '20th day of the 6th lunar month, Year of the Horse',
    gallery_title: 'Photo Gallery', gallery_viewer: 'View wedding photos', gallery_close: 'Close photo', gallery_previous: 'Previous photo', gallery_next: 'Next photo',
    gallery_show_more: 'Show more', gallery_show_less: 'Show less', gallery_tabs: 'Choose a photo collection', gallery_pre_wedding: 'Pre-wedding', gallery_wedding: 'Wedding',
    gallery_wedding_empty: 'Please come back after the wedding to find your photos here.',
    menu_kicker: 'Our celebration feast', menu_title: 'Menu', menu_intro: 'Six courses will be served in the order below, for each table of 10 guests.',
    dish_1: 'Pork-stuffed pumpkin blossoms · Vietnamese beef salad', dish_2: 'Crispy shrimp with fragrant mayonnaise sauce', dish_3: 'Green pepper beef · Baguette',
    dish_4: 'Mixed roast chicken with sticky rice', dish_5: 'Sour bamboo shoot sturgeon hotpot · Fresh rice vermicelli', dish_6: 'Blueberry panna cotta',
    allergen_1: 'May contain: soy, fish (fish sauce), peanuts.', allergen_2: 'May contain: crustaceans, egg, wheat (gluten).',
    allergen_3: 'May contain: wheat (gluten), milk, soy.', allergen_4: 'May contain: soy, sesame.', allergen_5: 'May contain: fish, soy.',
    allergen_6: 'May contain: milk; garnish may include tree nuts.',
    allergy_disclaimer: 'Allergen information is based on common preparation methods. Ingredients and cross-contact risks may vary; please list every allergy in the form so the venue can confirm.',
    meal_request_prompt: 'Vegetarian, or have a special request?', meal_request_open: 'Send a meal request', meal_dialog_close: 'Close meal request form',
    meal_dialog_kicker: 'Especially for you', meal_dialog_title: 'Meal request', meal_dialog_intro: 'Tell us your preference. Please submit one form per guest.',
    meal_name: 'Guest name', meal_preference: 'Meal preference', meal_standard: 'Standard menu', meal_standard_hint: 'The six courses shown above',
    meal_vegetarian: 'Vegetarian menu', meal_vegetarian_hint: 'The venue’s four-course Set 01',
    vegetarian_fixed_title: 'Vegetarian Set 01 · 4 dishes', vegetarian_fixed_intro: 'This is the only vegetarian option being served.',
    vegetarian_dish_1: 'Vegan abalone, shark fin & sea cucumber soup', vegetarian_dish_2: 'Truffle vegetarian beef · Bread',
    vegetarian_dish_3: 'Goji berry fried rice', vegetarian_dish_4: 'Oranges & grapes',
    vegetarian_allergen_1: 'May contain: soy, wheat (gluten), sesame.', vegetarian_allergen_2: 'May contain: soy, wheat (gluten).',
    vegetarian_allergen_3: 'May contain: soy, sesame.', vegetarian_allergen_4: 'No common allergens identified; cross-contact remains possible.',
    vegetarian_allergy_note: 'Ingredients and cross-contact risks may vary. Please list every allergy below so the venue can confirm.',
    meal_notes: 'Personal notes or allergies', meal_notes_placeholder: 'For example: peanut allergy, dairy-free…', meal_submit: 'Send request',
    meal_sending: 'Sending…', meal_sending_status: 'Sending your meal request…', meal_name_required: 'Please let us know your name.',
    meal_success: 'Your request has been recorded. Thank you ❦', meal_error: 'Your request could not be sent right now. Please try again later.',
    countdown_section: 'Countdown to our special day', countdown_line_one: 'Counting down to', countdown_line_two: 'our special day', countdown_timer: 'Time remaining until the wedding',
    days: 'Days', hours: 'Hours', minutes: 'Minutes', countdown_complete: 'Our happy day has arrived', photo_portrait_alt: 'Portrait of Thịnh and Vy beneath the trees',
    schedule_title: 'Wedding Schedule', schedule_date: 'Sunday, August 2, 2026', morning: 'Morning', ancestral_ceremony: 'Ancestral Ceremony', at_home: 'At the family residences', noon: 'Noon', wedding_reception: 'Wedding Reception',
    ban_co: 'Bàn Cờ Ward', an_nhon: 'An Nhơn Ward', hcm_city_short: 'Ho Chi Minh City', venue_and: '&', ban_co_map: 'Bàn Cờ Ward, Ho Chi Minh City — opens in a new window',
    an_nhon_map: 'An Nhơn Ward, Ho Chi Minh City — opens in a new window', reception_address: '202 Hoàng Văn Thụ, Đức Nhuận Ward, Ho Chi Minh City',
    reception_map: '202 Hoàng Văn Thụ, Đức Nhuận Ward, Ho Chi Minh City — opens in a new window', thanks_section: 'Thank you', photo_forest_alt: 'Thịnh and Vy in a pine forest',
    thanks_line_one: 'Thank you for joining us,', thanks_line_two: 'and making our happiest day', thanks_line_three: 'truly complete.',
    wishes_title: 'Well Wishes', wishes_intro: 'Send Thịnh & Vy your warmest wishes.', wish_stats: 'Wish statistics', wishes_stat: 'Wishes', countries_stat: 'Countries',
    wish_name: 'Your name', wish_message_label: 'Your message for the newlyweds', wish_message_placeholder: 'Write your wishes…', wish_submit: 'Send wishes',
    wish_sending: 'Sending…', wish_sending_status: 'Sending your wishes…', wish_name_required: 'Please let us know your name.', wish_message_required: 'Please write a message for the couple.',
    wish_success: 'Thank you for sending your wishes to Thịnh & Vy ❦', wish_error: 'Your wishes could not be sent right now. Please try again later.',
    footer_wedding: 'Vy & Thịnh’s Wedding - 02.08.2026', footer_artist: 'Lead Artist: Vy Tran', music_on: 'Play background music', music_off: 'Pause background music',
    gallery_open: (number, description) => `Open photo ${number}: ${description}`,
    photos: ['Thịnh and Vy standing together beneath green trees', 'Thịnh gently lifting Vy’s veil beside a forest lake', 'Thịnh and Vy in a sweeping pine forest', 'Portrait of Thịnh and Vy beneath the trees', 'Thịnh and Vy sharing a moment by the lake beneath the leaves', 'A moment with Thịnh and Vy in nature', 'A candid portrait of Vy beside the lake', 'A candid portrait of Vy beside a bookshelf'],
  },
  fr: {
    ...seatingTranslations.fr,
    htmlLang: 'fr', locale: 'fr-FR',
    page_title: 'Vy & Thịnh — Faire-part de mariage', meta_description: 'Faire-part de mariage de Thịnh et Vy — dimanche 2 août 2026.',
    skip_hero: "Passer la photo d’ouverture", brand_home: 'Thịnh et Vy — retour en haut', navigation: 'Navigation du faire-part', language: 'Langue', language_select: 'Choisir la langue',
    menu_open: 'Ouvrir le menu', menu_close: 'Fermer le menu', theme_to_dark: 'Passer au thème sombre', theme_to_light: 'Passer au thème clair', nav_invitation: 'Faire-part', nav_gallery: 'Galerie', nav_menu: 'Menu', nav_countdown: 'Compte à rebours', nav_schedule: 'Programme',
    nav_seating_plan: 'Plan de table', nav_wishes: 'Félicitations', nav_find_seat: 'Trouver votre place', photo_hero_alt: 'Thịnh et Vy réunis sous une voûte de verdure', save_the_date: 'Réservez la date',
    hero_shortcuts: 'Raccourcis du faire-part', hero_invitation: 'Voir le faire-part', families: 'Les deux familles', parents: 'M. et Mme', family_address: 'Quartier Bàn Cờ, Hô Chi Minh-Ville',
    announce: 'Ont la joie de vous annoncer', wedding_ceremony: 'La Cérémonie de Mariage', our_children: 'de leurs chers enfants',
    couple_intro: 'Hoàng Đình Thịnh — Fils et Trần Nhật Vy — Fille', son: 'Fils', daughter: 'Fille', ceremony_home: 'La cérémonie sera célébrée au domicile familial',
    full_date: 'Dimanche 2 août 2026', lunar_date: '20e jour du 6e mois lunaire, année du Cheval', gallery_title: 'Galerie photos', gallery_viewer: 'Voir les photos de mariage',
    gallery_close: 'Fermer la photo', gallery_previous: 'Photo précédente', gallery_next: 'Photo suivante', countdown_section: 'Compte à rebours avant le grand jour',
    gallery_show_more: 'Voir plus', gallery_show_less: 'Voir moins', gallery_tabs: 'Choisir une collection de photos', gallery_pre_wedding: 'Avant le mariage', gallery_wedding: 'Mariage',
    gallery_wedding_empty: 'Revenez après le mariage pour retrouver vos photos ici.',
    menu_kicker: 'Notre repas de fête', menu_title: 'Menu', menu_intro: 'Six plats seront servis dans l’ordre ci-dessous, pour chaque table de 10 convives.',
    dish_1: 'Fleurs de courge farcies au porc · Salade vietnamienne de bœuf', dish_2: 'Crevettes croustillantes, sauce mayonnaise parfumée', dish_3: 'Bœuf au poivre vert · Baguette',
    dish_4: 'Poulet rôti assorti et riz gluant', dish_5: 'Fondue d’esturgeon aux pousses de bambou aigres · Vermicelles de riz frais', dish_6: 'Panna cotta aux myrtilles',
    allergen_1: 'Peut contenir : soja, poisson (nuoc-mâm), arachides.', allergen_2: 'Peut contenir : crustacés, œuf, blé (gluten).',
    allergen_3: 'Peut contenir : blé (gluten), lait, soja.', allergen_4: 'Peut contenir : soja, sésame.', allergen_5: 'Peut contenir : poisson, soja.',
    allergen_6: 'Peut contenir : lait ; la garniture peut contenir des fruits à coque.',
    allergy_disclaimer: 'Les allergènes indiqués reposent sur les préparations habituelles. Les ingrédients et les risques de contamination croisée peuvent varier ; veuillez signaler chaque allergie dans le formulaire afin que le lieu puisse confirmer.',
    meal_request_prompt: 'Végétarien ou demande particulière ?', meal_request_open: 'Envoyer une demande de repas', meal_dialog_close: 'Fermer le formulaire de repas',
    meal_dialog_kicker: 'Rien que pour vous', meal_dialog_title: 'Demande de repas', meal_dialog_intro: 'Indiquez-nous votre préférence. Merci d’envoyer un formulaire par invité.',
    meal_name: 'Nom de l’invité', meal_preference: 'Préférence de repas', meal_standard: 'Menu standard', meal_standard_hint: 'Les six plats présentés ci-dessus',
    meal_vegetarian: 'Menu végétarien', meal_vegetarian_hint: 'Le menu 01 de quatre plats proposé par le lieu',
    vegetarian_fixed_title: 'Menu végétarien 01 · 4 plats', vegetarian_fixed_intro: 'Il s’agit de l’unique option végétarienne proposée.',
    vegetarian_dish_1: 'Soupe végétale aux ormeaux, ailerons de requin et concombre de mer', vegetarian_dish_2: 'Bœuf végétal à la truffe · Pain',
    vegetarian_dish_3: 'Riz frit aux baies de goji', vegetarian_dish_4: 'Fruits (oranges et raisins)',
    vegetarian_allergen_1: 'Peut contenir : soja, blé (gluten), sésame.', vegetarian_allergen_2: 'Peut contenir : soja, blé (gluten).',
    vegetarian_allergen_3: 'Peut contenir : soja, sésame.', vegetarian_allergen_4: 'Aucun allergène courant identifié ; une contamination croisée reste possible.',
    vegetarian_allergy_note: 'Les ingrédients et les risques de contamination croisée peuvent varier. Indiquez chaque allergie ci-dessous afin que le lieu puisse confirmer.',
    meal_notes: 'Notes personnelles ou allergies', meal_notes_placeholder: 'Par exemple : allergie aux arachides, sans lait…', meal_submit: 'Envoyer la demande',
    meal_sending: 'Envoi…', meal_sending_status: 'Envoi de votre demande de repas…', meal_name_required: 'Veuillez nous indiquer votre nom.',
    meal_success: 'Votre demande a bien été enregistrée. Merci ❦', meal_error: 'Votre demande ne peut pas être envoyée pour le moment. Veuillez réessayer plus tard.',
    countdown_line_one: 'Compte à rebours avant', countdown_line_two: 'notre grand jour', countdown_timer: 'Temps restant avant le mariage', days: 'Jours', hours: 'Heures', minutes: 'Minutes',
    countdown_complete: 'Le grand jour est arrivé', photo_portrait_alt: 'Portrait de Thịnh et Vy sous les arbres', schedule_title: 'Programme du mariage', schedule_date: 'Dimanche 2 août 2026',
    morning: 'Matin', ancestral_ceremony: 'Cérémonie des Ancêtres', at_home: 'Aux domiciles familiaux', noon: 'Midi', wedding_reception: 'Réception de Mariage',
    ban_co: 'Quartier Bàn Cờ', an_nhon: 'Quartier An Nhơn', hcm_city_short: 'Hô Chi Minh-Ville', venue_and: 'et', ban_co_map: 'Quartier Bàn Cờ, Hô Chi Minh-Ville — ouvre une nouvelle fenêtre',
    an_nhon_map: 'Quartier An Nhơn, Hô Chi Minh-Ville — ouvre une nouvelle fenêtre', reception_address: '202 Hoàng Văn Thụ, quartier Đức Nhuận, Hô Chi Minh-Ville',
    reception_map: '202 Hoàng Văn Thụ, quartier Đức Nhuận, Hô Chi Minh-Ville — ouvre une nouvelle fenêtre', thanks_section: 'Remerciements', photo_forest_alt: 'Thịnh et Vy dans une forêt de pins',
    thanks_line_one: 'Merci d’être à nos côtés,', thanks_line_two: 'et de rendre notre plus beau jour', thanks_line_three: 'encore plus précieux.',
    wishes_title: 'Vœux & Félicitations', wishes_intro: 'Adressez vos vœux les plus chaleureux à Thịnh & Vy.', wish_stats: 'Statistiques des vœux', wishes_stat: 'Vœux', countries_stat: 'Pays',
    wish_name: 'Votre nom', wish_message_label: 'Votre message aux jeunes mariés', wish_message_placeholder: 'Écrivez vos vœux…', wish_submit: 'Envoyer mes vœux',
    wish_sending: 'Envoi…', wish_sending_status: 'Envoi de vos vœux…', wish_name_required: 'Veuillez nous indiquer votre nom.', wish_message_required: 'Veuillez écrire un message aux mariés.',
    wish_success: 'Merci d’avoir envoyé vos vœux à Thịnh & Vy ❦', wish_error: 'Vos vœux ne peuvent pas être envoyés pour le moment. Veuillez réessayer plus tard.',
    footer_wedding: 'Mariage de Vy & Thịnh - 02.08.2026', footer_artist: 'Artiste principale : Vy Tran', music_on: 'Jouer la musique', music_off: 'Arrêter la musique',
    gallery_open: (number, description) => `Ouvrir la photo ${number} : ${description}`,
    photos: ['Thịnh et Vy réunis sous une voûte de verdure', 'Thịnh soulève délicatement le voile de Vy au bord d’un lac forestier', 'Thịnh et Vy dans une vaste forêt de pins', 'Portrait de Thịnh et Vy sous les arbres', 'Un instant partagé par Thịnh et Vy au bord du lac', 'Un instant de Thịnh et Vy en pleine nature', 'Portrait spontané de Vy au bord du lac', 'Portrait spontané de Vy près d’une bibliothèque'],
  },
  zh: {
    ...seatingTranslations.zh,
    htmlLang: 'zh-CN', locale: 'zh-CN',
    page_title: 'Vy & Thịnh — 婚礼请柬', meta_description: 'Thịnh 与 Vy 的婚礼请柬——2026年8月2日，星期日。',
    skip_hero: '跳过开场照片', brand_home: 'Thịnh 与 Vy——返回顶部', navigation: '婚礼请柬导航', language: '语言', language_select: '选择语言', menu_open: '打开菜单', menu_close: '关闭菜单', theme_to_dark: '切换到深色主题', theme_to_light: '切换到浅色主题',
    nav_invitation: '婚礼请柬', nav_gallery: '照片集', nav_menu: '菜单', nav_countdown: '倒计时', nav_schedule: '婚礼流程', nav_seating_plan: '座位图', nav_wishes: '祝福留言', nav_find_seat: '查找座位',
    photo_hero_alt: 'Thịnh 与 Vy 相依站在绿荫之下', save_the_date: '敬请留期', hero_shortcuts: '请柬快捷链接', hero_invitation: '查看请柬', families: '双方家庭', parents: '父母', family_address: '胡志明市棋盘坊',
    announce: '谨此喜告', wedding_ceremony: '结婚典礼', our_children: '爱子爱女喜结良缘', couple_intro: 'Hoàng Đình Thịnh——新郎，与 Trần Nhật Vy——新娘', son: '新郎', daughter: '新娘',
    ceremony_home: '婚礼将在家中举行', full_date: '2026年8月2日，星期日', lunar_date: '丙午年六月二十', gallery_title: '婚礼照片', gallery_viewer: '查看婚礼照片',
    gallery_close: '关闭照片', gallery_previous: '上一张照片', gallery_next: '下一张照片', countdown_section: '幸福之日倒计时', countdown_line_one: '共同期待', countdown_line_two: '幸福之日',
    gallery_show_more: '查看更多', gallery_show_less: '收起', gallery_tabs: '选择照片集', gallery_pre_wedding: '婚前照', gallery_wedding: '婚礼',
    gallery_wedding_empty: '请在婚礼结束后再来这里寻找您的照片。',
    menu_kicker: '我们的婚宴', menu_title: '菜单', menu_intro: '以下六道菜将依次上桌，每桌供10位宾客享用。',
    dish_1: '猪肉酿南瓜花 · 越式拌牛肉', dish_2: '香脆炸虾配香味蛋黄酱', dish_3: '青胡椒牛肉 · 法棍面包',
    dish_4: '什锦烤鸡配糯米饭', dish_5: '酸笋鲟鱼火锅 · 鲜米粉', dish_6: '蓝莓意式奶冻',
    allergen_1: '可能含有：大豆、鱼类（鱼露）、花生。', allergen_2: '可能含有：甲壳类、鸡蛋、小麦（麸质）。', allergen_3: '可能含有：小麦（麸质）、牛奶、大豆。',
    allergen_4: '可能含有：大豆、芝麻。', allergen_5: '可能含有：鱼类、大豆。', allergen_6: '可能含有：牛奶；装饰可能含坚果。',
    allergy_disclaimer: '过敏原信息依据常见烹饪方法整理。实际配料及交叉接触风险可能有所不同；请在表单中注明所有过敏情况，以便宴会场地确认。',
    meal_request_prompt: '需要素食或有特别要求？', meal_request_open: '提交餐食要求', meal_dialog_close: '关闭餐食要求表单', meal_dialog_kicker: '为您特别准备',
    meal_dialog_title: '餐食要求', meal_dialog_intro: '请告诉我们您的选择。每位宾客请提交一份表单。', meal_name: '宾客姓名', meal_preference: '餐食选择',
    meal_standard: '标准菜单', meal_standard_hint: '上方介绍的六道菜', meal_vegetarian: '素食菜单', meal_vegetarian_hint: '场地提供的四道菜套餐01',
    vegetarian_fixed_title: '素食套餐01 · 4道菜', vegetarian_fixed_intro: '这是本次提供的唯一素食选项。',
    vegetarian_dish_1: '素鲍鱼、素鱼翅与素海参汤', vegetarian_dish_2: '松露素牛肉 · 面包',
    vegetarian_dish_3: '枸杞炒饭', vegetarian_dish_4: '水果（橙子和葡萄）',
    vegetarian_allergen_1: '可能含有：大豆、小麦（麸质）、芝麻。', vegetarian_allergen_2: '可能含有：大豆、小麦（麸质）。',
    vegetarian_allergen_3: '可能含有：大豆、芝麻。', vegetarian_allergen_4: '未发现常见过敏原；仍可能发生交叉接触。',
    vegetarian_allergy_note: '配料及交叉接触风险可能有所不同。请在下方注明所有过敏情况，以便场地确认。',
    meal_notes: '个人备注或过敏情况', meal_notes_placeholder: '例如：花生过敏、不含乳制品……', meal_submit: '提交要求', meal_sending: '正在提交……',
    meal_sending_status: '正在提交您的餐食要求……', meal_name_required: '请输入您的姓名。',
    meal_success: '您的要求已记录。谢谢 ❦', meal_error: '目前无法提交您的要求，请稍后再试。',
    countdown_timer: '距离婚礼剩余时间', days: '天', hours: '小时', minutes: '分钟', countdown_complete: '幸福之日已经到来', photo_portrait_alt: 'Thịnh 与 Vy 在树荫下的合影',
    schedule_title: '婚礼流程', schedule_date: '2026年8月2日，星期日', morning: '上午', ancestral_ceremony: '祭祖仪式', at_home: '于双方家中', noon: '中午', wedding_reception: '婚宴',
    ban_co: '棋盘坊', an_nhon: '安仁坊', hcm_city_short: '胡志明市', venue_and: '和', ban_co_map: '胡志明市棋盘坊——在新窗口中打开', an_nhon_map: '胡志明市安仁坊——在新窗口中打开',
    reception_address: '胡志明市德润坊 Hoàng Văn Thụ 街202号', reception_map: '胡志明市德润坊 Hoàng Văn Thụ 街202号——在新窗口中打开', thanks_section: '感谢', photo_forest_alt: '松林中的 Thịnh 与 Vy',
    thanks_line_one: '感谢您的到来，', thanks_line_two: '让我们的幸福之日', thanks_line_three: '更加圆满。', wishes_title: '祝福留言', wishes_intro: '向 Thịnh & Vy 送上您最温暖的祝福。',
    wish_stats: '祝福统计', wishes_stat: '条祝福', countries_stat: '个国家', wish_name: '您的姓名', wish_message_label: '给新人的祝福', wish_message_placeholder: '写下您的祝福…', wish_submit: '发送祝福',
    wish_sending: '发送中…', wish_sending_status: '正在发送您的祝福…', wish_name_required: '请告诉我们您的姓名。', wish_message_required: '请为新人写下祝福。',
    wish_success: '感谢您向 Thịnh & Vy 送上祝福 ❦', wish_error: '暂时无法发送您的祝福，请稍后再试。', footer_wedding: 'Vy & Thịnh 婚礼 - 02.08.2026',
    footer_artist: '首席艺术：Vy Tran', music_on: '播放背景音乐', music_off: '暂停背景音乐', gallery_open: (number, description) => `打开第${number}张照片：${description}`,
    photos: ['Thịnh 与 Vy 相依站在绿荫之下', 'Thịnh 在林间湖畔轻轻掀起 Vy 的头纱', 'Thịnh 与 Vy 置身于广阔的松林中', 'Thịnh 与 Vy 在树荫下的合影', 'Thịnh 与 Vy 在湖畔树荫下的温馨时刻', 'Thịnh 与 Vy 在大自然中的美好瞬间', 'Vy 在湖边的生活照', 'Vy 在书架旁的生活照'],
  },
  ja: {
    ...seatingTranslations.ja,
    htmlLang: 'ja', locale: 'ja-JP',
    page_title: 'Vy & Thịnh — 結婚式のご招待', meta_description: 'ThịnhとVyの結婚式のご招待 — 2026年8月2日（日）。',
    skip_hero: '最初の写真をスキップ', brand_home: 'ThịnhとVy — ページ上部へ', navigation: '結婚式招待状のナビゲーション', language: '言語', language_select: '言語を選択',
    menu_open: 'メニューを開く', menu_close: 'メニューを閉じる', theme_to_dark: 'ダークテーマに切り替える', theme_to_light: 'ライトテーマに切り替える', nav_invitation: 'ご招待', nav_gallery: 'フォトギャラリー', nav_menu: 'お料理', nav_countdown: 'カウントダウン', nav_schedule: 'プログラム',
    nav_seating_plan: '座席表', nav_wishes: 'お祝いメッセージ', nav_find_seat: '座席を探す', photo_hero_alt: '緑の木々の下で寄り添うThịnhとVy', save_the_date: 'この日を空けておいてください', hero_shortcuts: '招待状へのショートカット',
    hero_invitation: '招待状を見る', families: '両家', parents: 'ご両親', family_address: 'ホーチミン市バンコー坊', announce: '謹んでご報告申し上げます', wedding_ceremony: '結婚式', our_children: '両家の子どもたち',
    couple_intro: 'Hoàng Đình Thịnh — 新郎、Trần Nhật Vy — 新婦', son: '新郎', daughter: '新婦', ceremony_home: '挙式は自宅にて執り行います', full_date: '2026年8月2日（日）', lunar_date: '旧暦 丙午年6月20日',
    gallery_title: 'フォトギャラリー', gallery_viewer: '結婚写真を見る', gallery_close: '写真を閉じる', gallery_previous: '前の写真', gallery_next: '次の写真', countdown_section: '特別な日までのカウントダウン',
    gallery_show_more: 'もっと見る', gallery_show_less: '折りたたむ', gallery_tabs: 'フォトコレクションを選択', gallery_pre_wedding: '前撮り', gallery_wedding: '結婚式',
    gallery_wedding_empty: '結婚式の後、こちらでお写真を探してみてください。',
    menu_kicker: '祝宴のお料理', menu_title: 'お料理', menu_intro: '10名様の各テーブルに、以下の6品を順番にお出しします。',
    dish_1: '豚肉詰めカボチャの花 · ベトナム風牛肉サラダ', dish_2: '海老のクリスピーフライ 香味マヨネーズソース', dish_3: '牛肉の青胡椒ソース · バゲット',
    dish_4: 'ローストチキンとおこわの盛り合わせ', dish_5: 'チョウザメと酸味竹の子の鍋 · 生米麺', dish_6: 'ブルーベリーのパンナコッタ',
    allergen_1: '含まれる可能性：大豆、魚（魚醤）、落花生。', allergen_2: '含まれる可能性：甲殻類、卵、小麦（グルテン）。', allergen_3: '含まれる可能性：小麦（グルテン）、乳、大豆。',
    allergen_4: '含まれる可能性：大豆、ごま。', allergen_5: '含まれる可能性：魚、大豆。', allergen_6: '含まれる可能性：乳。飾りに木の実を使用する場合があります。',
    allergy_disclaimer: 'アレルゲン情報は一般的な調理法をもとにしています。食材や交差接触の可能性は変わる場合がありますので、会場が確認できるよう、すべてのアレルギーをフォームにご記入ください。',
    meal_request_prompt: 'ベジタリアン料理や特別なご希望はありますか？', meal_request_open: '食事の希望を送る', meal_dialog_close: '食事希望フォームを閉じる',
    meal_dialog_kicker: 'お一人おひとりのために', meal_dialog_title: '食事のご希望', meal_dialog_intro: 'ご希望をお知らせください。お一人につき1件ずつ送信してください。',
    meal_name: 'ゲストのお名前', meal_preference: 'お食事の選択', meal_standard: '通常メニュー', meal_standard_hint: '上記の6品', meal_vegetarian: 'ベジタリアンメニュー',
    meal_vegetarian_hint: '会場が提供する4品のセット01', vegetarian_fixed_title: 'ベジタリアンセット01 · 4品',
    vegetarian_fixed_intro: 'こちらが唯一のベジタリアンオプションです。', vegetarian_allergen_1: '含まれる可能性：大豆、小麦（グルテン）、ごま。',
    vegetarian_dish_1: 'ヴィーガン鮑・フカヒレ・ナマコのスープ', vegetarian_dish_2: 'トリュフ香るベジタリアンビーフ · パン',
    vegetarian_dish_3: 'クコの実入り炒飯', vegetarian_dish_4: 'フルーツ（オレンジ＆ぶどう）',
    vegetarian_allergen_2: '含まれる可能性：大豆、小麦（グルテン）。', vegetarian_allergen_3: '含まれる可能性：大豆、ごま。',
    vegetarian_allergen_4: '一般的なアレルゲンは確認されていませんが、交差接触の可能性があります。',
    vegetarian_allergy_note: '食材や交差接触の可能性は変わる場合があります。会場が確認できるよう、すべてのアレルギーを下欄にご記入ください。',
    meal_notes: '個別のご要望・アレルギー', meal_notes_placeholder: '例：落花生アレルギー、乳製品なし…', meal_submit: '希望を送信', meal_sending: '送信中…',
    meal_sending_status: '食事の希望を送信しています…', meal_name_required: 'お名前を入力してください。',
    meal_success: 'ご希望を承りました。ありがとうございます ❦', meal_error: '現在送信できません。しばらくしてからもう一度お試しください。',
    countdown_line_one: 'ふたりの特別な日まで', countdown_line_two: 'カウントダウン', countdown_timer: '結婚式までの残り時間', days: '日', hours: '時間', minutes: '分', countdown_complete: '幸せな日を迎えました',
    photo_portrait_alt: '木々の下で寄り添うThịnhとVyのポートレート', schedule_title: '結婚式プログラム', schedule_date: '2026年8月2日（日）', morning: '午前', ancestral_ceremony: 'ご先祖様への儀式',
    at_home: '両家の自宅にて', noon: '正午', wedding_reception: '披露宴', ban_co: 'バンコー坊', an_nhon: 'アンニョン坊', hcm_city_short: 'ホーチミン市', venue_and: 'と',
    ban_co_map: 'ホーチミン市バンコー坊 — 新しいウィンドウで開く', an_nhon_map: 'ホーチミン市アンニョン坊 — 新しいウィンドウで開く',
    reception_address: 'ホーチミン市ドゥックニュアン坊 Hoàng Văn Thụ通り202番地', reception_map: 'ホーチミン市ドゥックニュアン坊 Hoàng Văn Thụ通り202番地 — 新しいウィンドウで開く',
    thanks_section: '感謝の言葉', photo_forest_alt: '松林の中のThịnhとVy', thanks_line_one: 'お越しいただき、', thanks_line_two: '私たちの幸せな一日を', thanks_line_three: 'より特別なものにしてくださりありがとうございます。',
    wishes_title: 'お祝いメッセージ', wishes_intro: 'Thịnh & Vyへ温かいお祝いの言葉をお寄せください。', wish_stats: 'メッセージの統計', wishes_stat: 'メッセージ', countries_stat: 'か国',
    wish_name: 'お名前', wish_message_label: '新郎新婦へのメッセージ', wish_message_placeholder: 'メッセージを書いてください…', wish_submit: 'メッセージを送る', wish_sending: '送信中…', wish_sending_status: 'メッセージを送信しています…',
    wish_name_required: 'お名前を入力してください。', wish_message_required: '新郎新婦へのメッセージを入力してください。', wish_success: 'Thịnh & Vyへのメッセージをありがとうございます ❦',
    wish_error: '現在メッセージを送信できません。しばらくしてからもう一度お試しください。', footer_wedding: 'Vy & Thịnh 結婚式 - 02.08.2026', footer_artist: 'リードアーティスト：Vy Tran',
    music_on: 'BGMを再生', music_off: 'BGMを停止', gallery_open: (number, description) => `写真${number}を開く：${description}`,
    photos: ['緑の木々の下で寄り添うThịnhとVy', '森の湖畔でVyのベールをそっと上げるThịnh', '広大な松林の中のThịnhとVy', '木々の下で寄り添うThịnhとVyのポートレート', '湖畔の木陰で過ごすThịnhとVy', '自然の中で過ごすThịnhとVyのひととき', '湖畔でのVyの自然なポートレート', '本棚のそばでのVyの自然なポートレート'],
  },
};

const defaultLanguage = 'vi';

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem('invitation_language');
    return translations[stored] ? stored : defaultLanguage;
  } catch {
    return defaultLanguage;
  }
}

export function getLanguage() {
  return document.documentElement.dataset.language || readStoredLanguage();
}

export function getTranslations(language = getLanguage()) {
  return translations[language] || translations[defaultLanguage];
}

export function applyLanguage(language, { persist = true } = {}) {
  const selectedLanguage = translations[language] ? language : defaultLanguage;
  const text = translations[selectedLanguage];

  document.documentElement.lang = text.htmlLang;
  document.documentElement.dataset.language = selectedLanguage;
  const titleElement = document.querySelector('[data-i18n-title]');
  const pageTitleKey = titleElement?.dataset.i18nTitle;
  document.title = (pageTitleKey && text[pageTitleKey]) || text.page_title;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = text[element.dataset.i18n];
    if (typeof value === 'string') element.textContent = value;
  });

  document.querySelectorAll('[data-i18n-dish]').forEach((element) => {
    element.lang = text.htmlLang;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const value = text[element.dataset.i18nAria];
    if (typeof value === 'string') element.setAttribute('aria-label', value);
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    const value = text[element.dataset.i18nAlt];
    if (typeof value === 'string') element.alt = value;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const value = text[element.dataset.i18nPlaceholder];
    if (typeof value === 'string') element.placeholder = value;
  });

  document.querySelectorAll('[data-i18n-content]').forEach((element) => {
    const value = text[element.dataset.i18nContent];
    if (typeof value === 'string') element.setAttribute('content', value);
  });

  const menuToggle = document.querySelector('[data-i18n-menu]');
  if (menuToggle) {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-label', isOpen ? text.menu_close : text.menu_open);
  }

  const musicToggle = document.querySelector('[data-i18n-music]');
  if (musicToggle) {
    const isPlaying = musicToggle.getAttribute('aria-pressed') === 'true';
    musicToggle.setAttribute('aria-label', isPlaying ? text.music_off : text.music_on);
  }

  const languageSelect = document.getElementById('language-select');
  if (languageSelect) languageSelect.value = selectedLanguage;

  if (persist) {
    try {
      localStorage.setItem('invitation_language', selectedLanguage);
    } catch {
      // Translation still works when storage is unavailable.
    }
  }

  document.dispatchEvent(new CustomEvent('invitation:languagechange', {
    detail: { language: selectedLanguage, text },
  }));

  return text;
}

export function initializeLanguage() {
  const languageSelect = document.getElementById('language-select');
  const initialLanguage = readStoredLanguage();

  languageSelect?.addEventListener('change', (event) => {
    applyLanguage(event.currentTarget.value);
  });

  return applyLanguage(initialLanguage, { persist: false });
}
