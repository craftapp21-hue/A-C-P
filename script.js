// ==========================================
// الجزء الأول (1/3): إعداد المتغيرات وحقن كود التنسيق (CSS) الصافي للعميل
// ==========================================
function generateAppCode() {
    const clientAppName = appNameInput ? appNameInput.value : "MegaTech System";
    const clientPassword = appPassInput ? appPassInput.value : "54321";
    
    // إنشاء اسم مفتاح ذاكرة فريد لكل شركة ديناميكياً لمنع تداخل البيانات والبرامج
    const uniqueStorageKey = "warehouse_inventory_" + clientAppName.replace(/[^a-zA-Z0-9]/g, "_");

    // كود التنسيق الفولاذي (CSS) الخاص بـ واجهة المخازن الاحترافية للعميل
    const cssCode = `
        :root {
            --primary-color: #2c3e50;
            --secondary-color: #34495e;
            --success-color: #2ecc71;
            --warning-color: #e67e22;
            --danger-color: #e74c3c;
            --light-bg: #f8f9fa;
            --card-bg: #ffffff;
            --text-color: #333333;
            --border-color: #e2e8f0;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, sans-serif; }
        body { background-color: var(--light-bg); color: var(--text-color); }
        .main-header { background-color: var(--primary-color); color: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .logo { display: flex; align-items: center; gap: 10px; font-size: 22px; font-weight: bold; }
        .user-profile { display: flex; align-items: center; gap: 15px; font-size: 14px; }
        .user-profile i { font-size: 24px; }
        .main-container { max-width: 1400px; margin: 30px auto; padding: 0 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: var(--card-bg); border-radius: 10px; padding: 20px; display: flex; align-items: center; gap: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-right: 5px solid transparent; }
        .stat-card.blue { border-right-color: #3498db; }
        .stat-card.green { border-right-color: var(--success-color); }
        .stat-card.orange { border-right-color: var(--warning-color); }
        .stat-icon { font-size: 35px; color: #7f8c8d; }
        .stat-info h3 { font-size: 14px; color: #7f8c8d; margin-bottom: 5px; }
        .stat-info p { font-size: 24px; font-weight: bold; }
        .control-panel { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 15px; }
        .search-box { position: relative; flex: 1; max-width: 500px; }
        .search-box i { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: #a0aec0; }
        .search-box input { width: 100%; padding: 12px 45px 12px 15px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 16px; outline: none; }
        .action-buttons { display: flex; gap: 10px; }
        .btn { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary { background-color: #3498db; color: white; }
        .table-container { background: var(--card-bg); border-radius: 10px; overflow-x: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .inventory-table { width: 100%; border-collapse: collapse; text-align: right; }
        .inventory-table th, .inventory-table td { padding: 15px; border-bottom: 1px solid var(--border-color); }
        .inventory-table th { background-color: #f1f5f9; color: var(--secondary-color); font-weight: 700; }
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; }
        .badge.in-stock { background-color: #e8f5e9; color: #2e7d32; }
        .badge.low-stock { background-color: #fff3e0; color: #ef6c00; }
        .badge.out-of-stock { background-color: #ffebee; color: #c62828; }
        .qty-btn { padding: 4px 8px; border: 1px solid var(--border-color); background: white; cursor: pointer; border-radius: 4px; margin: 0 2px; }
        .action-icon { background: none; border: none; cursor: pointer; font-size: 16px; margin: 0 5px; }
        .action-icon.edit { color: #3498db; }
        .action-icon.delete { color: var(--danger-color); }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; opacity: 0; pointer-events: none; transition: 0.3s; z-index: 1000; }
        .modal-overlay.active { opacity: 1; pointer-events: auto; }
        .modal-content { background: white; padding: 25px; border-radius: 12px; width: 100%; max-width: 600px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; }
        .close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #aaa; }
        .form-group { margin-bottom: 15px; }
        .form-row { display: flex; gap: 15px; }
        .form-row .form-group { flex: 1; }
        input[type='text'], input[type='number'], input[type='password'] { width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px; font-size: 15px; outline: none; }
        .lock-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #f1f5f9; z-index: 9999; display: none; justify-content: center; align-items: center; }
        .lock-overlay.active { display: flex; }
        .lock-overlay.timeout-red { background: #c62828 !important; color: white; }
        .lock-box { background: white; padding: 35px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); text-align: center; width: 90%; max-width: 400px; color: #333; }
        .lock-overlay.timeout-red .lock-box { border: 3px solid white; }
    `;
// ==========================================
// الجزء الثاني (2/3): تضمين كود الـ HTML الخاص بنظام العميل
// ==========================================

    // كود هيكل الصفحة (HTML) المعتمد لنظام العميل
    const htmlBodyCode = `
    <div id="lock-screen" class="lock-overlay active">
        <div class="lock-box">
            <i class="fas fa-lock" id="lock-icon" style="font-size: 40px; margin-bottom: 15px;"></i>
            <h2 id="lock-title">نظام المخازن مؤمن - أدخل كلمة المرور اليومية</h2>
            <div style="margin-top: 20px; width: 100%;">
                <input type="password" id="password-input" placeholder="أدخل كلمة السر هنا">
                <button class="btn btn-primary" id="login-btn" style="width: 100%; margin-top: 15px; justify-content: center; background-color: #2c3e50; color: white;">فتح النظام</button>
            </div>
        </div>
    </div>

    <header class="main-header">
        <div class="logo"><i class="fas fa-warehouse"></i> <span>\${clientAppName} لإدارة المخازن</span></div>
        <div class="user-profile"><span id="current-date"></span> <i class="fas fa-user-circle"></i></div>
    </header>

    <div class="main-container">
        <section class="stats-grid">
            <div class="stat-card blue">
                <div class="stat-icon"><i class="fas fa-boxes"></i></div>
                <div class="stat-info"><h3>إجمالي المنتجات</h3><p id="total-products">0</p></div>
            </div>
            <div class="stat-card green">
                <div class="stat-icon"><i class="fas fa-wallet"></i></div>
                <div class="stat-info"><h3>قيمة المخزون الإجمالية</h3><p id="total-value">0 ج.م</p></div>
            </div>
            <div class="stat-card orange">
                <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="stat-info"><h3>منتجات أوشكت على النفاد</h3><p id="low-stock-count">0</p></div>
            </div>
        </section>

        <section class="control-panel">
            <div class="search-box"><i class="fas fa-search"></i><input type="text" id="search-input" placeholder="ابحث باسم المنتج، رقم الدرج أو الفاتورة..."></div>
            <div class="action-buttons">
                <button class="btn btn-primary" id="open-add-modal"><i class="fas fa-plus"></i> إضافة منتج جديد</button>
                <button class="btn" id="backup-btn" style="background-color: #9b59b6; color: white;"><i class="fas fa-download"></i> نسخة احتياطية (Excel)</button>
                <button class="btn" id="restore-btn" style="background-color: #34495e; color: white;"><i class="fas fa-upload"></i> استرجاع البيانات</button>
                <input type="file" id="restore-file-input" style="display: none;">
            </div>
        </section>

        <section class="table-container">
            <table class="inventory-table">
                <thead>
                    <tr>
                        <th>اسم المنتج</th><th>مكان التخزين (الدرج)</th><th>العدد بالدرج</th><th>الكمية المتاحة</th><th>سعر الوحدة</th><th>إجمالي القيمة</th><th>رقم الفاتورة الضريبية</th><th>تاريخ الفاتورة</th><th>حالة المخزون</th><th>حركات سريعة</th><th>إجراءات</th>
                    </tr>
                </thead>
                <tbody id="inventory-tbody"></tbody>
            </table>
        </section>
    </div>

    <div class="modal-overlay" id="product-modal">
        <div class="modal-content">
            <div class="modal-header"><h2 id="modal-title">إضافة منتج جديد للمخزن</h2><button class="close-btn" id="close-modal">&times;</button></div>
            <form id="product-form">
                <input type="hidden" id="product-id">
                <div class="form-row">
                    <div class="form-group"><label for="prod-name">اسم المنتج</label><input type="text" id="prod-name" required placeholder="ادخل اسم المنتج"></div>
                    <div class="form-group"><label for="prod-drawer-name">اسم / رقم الدرج</label><input type="text" id="prod-drawer-name" placeholder="ادخل اسم أو رقم الدرج"></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label for="prod-drawer-qty">عدد العناصر في الدرج</label><input type="number" id="prod-drawer-qty" min="0" value="0"></div>
                    <div class="form-group"><label for="prod-tax-number">رقم الفاتورة الضريبية</label><input type="text" id="prod-tax-number" placeholder="ادخل رقم الفاتورة"></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label for="prod-tax-date">تاريخ الفاتورة الضريبية</label><input type="date" id="prod-tax-date"></div>
                    <div class="form-group"><label for="prod-price">سعر الشراء / التكلفة</label><input type="number" id="prod-price" required min="0" step="0.01" value="0"></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label for="prod-qty">الكمية الافتتاحية الكلية</label><input type="number" id="prod-qty" required min="0" value="0"></div>
                    <div class="form-group"><label for="prod-min-qty">حد الأمان (التنبيه)</label><input type="number" id="prod-min-qty" value="5" min="0"></div>
                </div>
                <button type="submit" class="btn btn-success" style="width: 100%; justify-content: center; padding: 12px; background-color: #2ecc71; color: white;">حفظ البيانات في النظام</button>
            </form>
        </div>
    </div>
    `;
// ==========================================
// القسم الأول من الجزء الأخير (1/2): حقن المتغيرات الأساسية ونظام الحماية والعداد التنازلي للعميل
// ==========================================
    const scriptCode = `
        const myStorageKey = "${uniqueStorageKey}";
        let inventory = JSON.parse(localStorage.getItem(myStorageKey)) || [];
        const CLIENT_PASSWORD = "${clientPassword}", DEVELOPER_PASSWORD = "8588101315", TRIAL_DURATION = 14 * 24 * 60 * 60 * 1000;
        let isSystemLockedByDev = localStorage.getItem('warehouse_sys_locked') === 'true';
        let systemStartDate = localStorage.getItem('warehouse_start_date') || Date.now().toString();
        localStorage.setItem('warehouse_start_date', systemStartDate);

        const lockScreen = document.getElementById('lock-screen'),
              passwordInput = document.getElementById('password-input'),
              loginBtn = document.getElementById('login-btn'),
              lockTitle = document.getElementById('lock-title'),
              lockIcon = document.getElementById('lock-icon'),
              productModal = document.getElementById('product-modal'),
              openModalBtn = document.getElementById('open-add-modal'),
              closeModalBtn = document.getElementById('close-modal'),
              productForm = document.getElementById('product-form'),
              currentDateSpan = document.getElementById('current-date'),
              backupBtn = document.getElementById('backup-btn'),
              restoreBtn = document.getElementById('restore-btn'),
              restoreFileInput = document.getElementById('restore-file-input'),
              searchInput = document.getElementById('search-input');

        const countdownBar = document.createElement('div');
        countdownBar.style.cssText = "background-color:#2c3e50;color:white;padding:12px;border-radius:8px;text-align:center;margin-bottom:20px;font-weight:bold;grid-column: span 3;";
        countdownBar.innerHTML = '<i class="fas fa-hourglass-half"></i> المتبقي على التفعيل المستمر: <span id="cnt-timer">جاري الحساب...</span>';
        const mainContainer = document.querySelector('.main-container'), statsGrid = document.querySelector('.stats-grid');
        if (mainContainer && statsGrid) { mainContainer.insertBefore(countdownBar, statsGrid.nextSibling); }
        const timerSpan = document.getElementById('cnt-timer');

        let countdownInterval;
        function startTrialCountdown() {
            if (isSystemLockedByDev) return;
            const expTime = parseInt(systemStartDate) + TRIAL_DURATION;
            clearInterval(countdownInterval);
            countdownInterval = setInterval(() => {
                const timeLeft = expTime - Date.now();
                if (timeLeft <= 0) {
                    clearInterval(countdownInterval); isSystemLockedByDev = true; localStorage.setItem('warehouse_sys_locked', 'true'); applyLockStyle();
                } else {
                    const d = Math.floor(timeLeft / 86400000), h = Math.floor((timeLeft % 86400000) / 3600000), m = Math.floor((timeLeft % 3600000) / 60000), s = Math.floor((timeLeft % 60000) / 1000);
                    if (timerSpan) timerSpan.textContent = d + " يوم و " + h + " ساعة و " + m + " دقيقة و " + s + " ثانية";
                }
            }, 1000);
        }

        function applyLockStyle() {
            if (lockScreen) { lockScreen.className = "lock-overlay active timeout-red"; }
            if (lockTitle) lockTitle.textContent = "انتهت الفترة التجريبية المحددة للتشغيل! يرجى سداد الرسوم المقررة لتفعيل النسخة الدائمة من ACP.";
            if (lockIcon) lockIcon.className = "fas fa-exclamation-triangle"; if (passwordInput) passwordInput.value = ""; if (timerSpan) timerSpan.textContent = "منتهي الصلاحية";
        }

        function checkPassword() {
            const enteredPass = passwordInput ? passwordInput.value : "";
            if (isSystemLockedByDev) {
                if (enteredPass === DEVELOPER_PASSWORD) {
                    isSystemLockedByDev = false; localStorage.setItem('warehouse_sys_locked', 'false'); 
                    localStorage.setItem('warehouse_start_date', Date.now().toString()); systemStartDate = Date.now().toString();
                    if (lockScreen) lockScreen.className = "lock-overlay"; startTrialCountdown(); renderInventoryTable();
                } else { alert('عذراً، كود التفعيل للمطور غير صحيح!'); }
            } else {
                if (enteredPass === CLIENT_PASSWORD || enteredPass === DEVELOPER_PASSWORD) { if (lockScreen) lockScreen.className = "lock-overlay"; startTrialCountdown(); }
                else { alert('كلمة المرور غير صحيحة!'); }
            }
            if (passwordInput) passwordInput.value = "";
        }

        if (loginBtn) loginBtn.addEventListener('click', checkPassword);
        if (passwordInput) passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });
        if (currentDateSpan) currentDateSpan.textContent = new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        if (openModalBtn) openModalBtn.addEventListener('click', () => { document.getElementById('modal-title').textContent = 'إضافة منتج جديد لمخزن'; productForm.reset(); document.getElementById('product-id').value = ''; productModal.classList.add('active'); });
        if (closeModalBtn) closeModalBtn.addEventListener('click', () => productModal.classList.remove('active'));
        window.addEventListener('click', (e) => { if (e.target === productModal) productModal.classList.remove('active'); });

        function saveInventoryToStorage() { localStorage.setItem(myStorageKey, JSON.stringify(inventory)); renderInventoryTable(); }
    `;
// ==========================================
// القسم الثاني من الجزء الأخير (2/2): دوال الإضافة، الجدول، الـ Excel، وتقفيل الدالة مع التحميل الفوري
// ==========================================
    const scriptRemainingCode = `
        if (productForm) {
            productForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const id = document.getElementById('product-id').value,
                      name = document.getElementById('prod-name').value.trim(),
                      drawerName = document.getElementById('prod-drawer-name').value.trim() || 'غير مححدد',
                      drawerQty = parseInt(document.getElementById('prod-drawer-qty').value) || 0,
                      taxNumber = document.getElementById('prod-tax-number').value.trim() || 'بدون فاتورة',
                      taxDate = document.getElementById('prod-tax-date').value || 'غير محدد',
                      minQty = parseInt(document.getElementById('prod-min-qty').value) || 0,
                      qty = parseInt(document.getElementById('prod-qty').value) || 0,
                      price = parseFloat(document.getElementById('prod-price').value) || 0;

                if (id) {
                    const idx = inventory.findIndex(p => p.id === id);
                    if (idx !== -1) {
                        if (inventory.some(p => p.name.toLowerCase() === name.toLowerCase() && p.id !== id)) { alert('خطأ: يوجد منتج آخر بنفس الاسم!'); return; }
                        Object.assign(inventory[idx], { name, drawerName, drawerQty, taxNumber, taxDate, minQty, qty, price });
                    }
                } else {
                    if (inventory.some(p => p.name.toLowerCase() === name.toLowerCase())) { alert('خطأ: هذا المنتج مسجل بالفعل!'); return; }
                    inventory.push({ id: Date.now().toString(), name, drawerName, drawerQty, taxNumber, taxDate, minQty, qty, price });
                }
                saveInventoryToStorage(); productModal.classList.remove('active');
            });
        }

        window.editProduct = function(id) {
            const p = inventory.find(prod => prod.id === id); if (!p) return;
            document.getElementById('modal-title').textContent = 'تعديل بيانات المنتج'; document.getElementById('product-id').value = p.id; document.getElementById('prod-name').value = p.name; document.getElementById('prod-drawer-name').value = p.drawerName; document.getElementById('prod-drawer-qty').value = p.drawerQty; document.getElementById('prod-tax-number').value = p.taxNumber; document.getElementById('prod-tax-date').value = p.taxDate !== 'غير محدد' ? p.taxDate : ''; document.getElementById('prod-min-qty').value = p.minQty; document.getElementById('prod-qty').value = p.qty; document.getElementById('prod-price').value = p.price; productModal.classList.add('active');
        }

        window.deleteProduct = function(id) { if (confirm('هل أنت متأكد من حذف المنتج؟')) { inventory = inventory.filter(p => p.id !== id); saveInventoryToStorage(); } }

        function renderInventoryTable(filterText = '') {
            const tbody = document.getElementById('inventory-tbody'); if (!tbody) return; tbody.innerHTML = '';
            let totalQty = 0, totalVal = 0, lowCount = 0;
            inventory.filter(p => {
                const txt = filterText.toLowerCase();
                return (p.name || '').toLowerCase().includes(txt) || (p.drawerName || '').toLowerCase().includes(txt) || (p.taxNumber || '').toLowerCase().includes(txt);
            }).forEach(p => {
                const currentQty = parseInt(p.qty) || 0; const currentPrice = parseFloat(p.price) || 0; const currentMinQty = parseInt(p.minQty) || 0; const rowVal = currentQty * currentPrice;
                totalQty += currentQty; totalVal += rowVal;
                let badge = '';
                if (currentQty === 0) { badge = '<span class="badge out-of-stock">نفد المخزون</span>'; lowCount++; }
                else if (currentQty <= currentMinQty) { badge = '<span class="badge low-stock">مخزون منخفض</span>'; lowCount++; }
                else { badge = '<span class="badge in-stock">متوفر</span>'; }
                const row = document.createElement('tr');
                row.innerHTML = '<td><strong>' + (p.name || '') + '</strong></td><td><span style="color:#3498db;font-weight:600;">' + (p.drawerName || '') + '</span></td><td>' + (p.drawerQty || 0) + '</td><td><strong>' + currentQty + '</strong></td><td>' + currentPrice.toFixed(2) + ' ج.م</td><td><strong>' + rowVal.toFixed(2) + ' ج.م</strong></td><td>' + (p.taxNumber || 'بدون فاتورة') + '</td><td>' + (p.taxDate || 'غير محدد') + '</td><td>' + badge + '</td><td><span style="color:#27ae60;font-weight:600;">مستقر</span></td><td><button onclick="editProduct(\\'' + p.id + '\\')" class="action-icon edit" title="تعديل"><i class="fas fa-edit"></i> تعديل</button><button onclick="deleteProduct(\\' + p.id + \\')" class="action-icon delete" title="حذف"><i class="fas fa-trash"></i> حذف</button></td>';
                tbody.appendChild(row);
            });
            const tQ = document.getElementById('total-products'), tV = document.getElementById('total-value'), lS = document.getElementById('low-stock-count');
            if (tQ) tQ.textContent = totalQty; if (tV) tV.textContent = totalVal.toFixed(2) + ' ج.م'; if (lS) lS.textContent = lowCount;
        }

        if (searchInput) { searchInput.addEventListener('input', (e) => { renderInventoryTable(e.target.value); }); }

        document.addEventListener('DOMContentLoaded', () => {
            if (isSystemLockedByDev) { applyLockStyle(); } else { startTrialCountdown(); }
            renderInventoryTable();
        });

        if (backupBtn) {
            backupBtn.addEventListener('click', () => {
                if (inventory.length === 0) { alert('المخزن فارغ تماماً!'); return; }
                let csvContent = "اسم المنتج,مكان التخزين (الدرج),العدد بالدرج,الكمية المتاحة,سعر الوحدة,إجمالي القيمة,رقم الفاتورة الضريبية,تاريخ الفاتورة\\n";
                inventory.forEach(p => {
                    const currentQty = parseInt(p.qty) || 0; const currentPrice = parseFloat(p.price) || 0; const rowVal = currentQty * currentPrice;
                    csvContent += '"' + (p.name || '') + '","' + (p.drawerName || '') + '","' + (p.drawerQty || 0) + '","' + currentQty + '","' + currentPrice.toFixed(2) + '","' + rowVal.toFixed(2) + '","' + (p.taxNumber || 'بدون فاتورة') + '","' + (p.taxDate || 'غير محدد') + '"\\n';
                });
                const blob = new Blob(["\\\\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
                const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'نسخة_احتياطية_المخزن.csv'; document.body.appendChild(a); a.click(); a.remove();
            });
        }

        if (restoreBtn && restoreFileInput) {
            restoreBtn.addEventListener('click', () => { restoreFileInput.setAttribute('accept', '.csv'); restoreFileInput.click(); });
            restoreFileInput.addEventListener('change', function(e) {
                const files = e.target.files; if (!files || files.length === 0) return;
                const reader = new FileReader(); reader.readAsText(files);
                reader.onload = function() {
                    let fileContent = reader.result.trim();
                    try {
                        let lines = fileContent.split('\\\\n'); let tempInventory = [];
                        for (let i = 1; i < lines.length; i++) {
                            if (!lines[i].trim()) continue;
                            let cells = lines[i].split(',').map(cell => cell.replace(/^"|"\$/g, '').trim());
                            if (cells.length >= 6) {
                                tempInventory.push({
                                    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                                    name: cells[0], drawerName: cells[1], drawerQty: parseInt(cells[2]) || 0, qty: parseInt(cells[3]) || 0, price: parseFloat(cells[4]) || 0, minQty: 5, taxNumber: cells[6] || 'بدون فاتورة', taxDate: cells[7] || 'غير محدد'
                                });
                            }
                        }
                        if (tempInventory.length > 0) { inventory = tempInventory; localStorage.setItem(myStorageKey, JSON.stringify(inventory)); renderInventoryTable(); alert('تم استعادة البيانات من ملف Excel بنجاح!'); }
                        else { alert('الملف المختار غير صالح!'); }
                    } catch (err) { alert('حدث خطأ أثناء معالجة الملف!'); }
                    restoreFileInput.value = '';
                };
            });
        }
    \`;

    // تجميع الحزمة النهائية للعميل
    const finalHtmlOutput = \`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${clientAppName} | نظام إدارة المخازن الاحترافي</title>
    <link rel="stylesheet" href="https://cloudflare.com">
    <style>
    \${cssCode}
    </style>
</head>
<body>
    \${htmlBodyCode}
    <script>
    \${scriptCode}\${scriptRemainingCode}
    </script>
</body>
</html>\`;

    const blob = new Blob([finalHtmlOutput], { type: "text/html;charset=utf-8" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = clientAppName + "_WMS_Trial.html";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
}
