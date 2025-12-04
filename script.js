// قاعدة بيانات صغيرة للخدمات
const services = {
    "مستشفى": "أقرب مستشفى: مستشفى الملك فهد – يبعد 3 كم.",
    "مدرسة": "أقرب مدرسة: المدرسة المتوسطة الرابعة – تبعد 1.2 كم.",
    "صيانة": "أقرب مركز صيانة: مركز صيانة الإلكترونيات – يبعد 900 متر.",
    "مكتبة": "أقرب مكتبة: مكتبة المعرفة – تبعد 1.5 كم.",
    "مطار": "أقرب مطار: مطار الملك خالد الدولي.",
    "جامعة": "أقرب جامعة: جامعة الملك سعود."
};

function smartSearch() {
    const input = document.getElementById("searchInput").value.trim();
    const resultBox = document.getElementById("searchResult");

    if (services[input]) {
        resultBox.innerHTML = services[input];
    } else if (input === "") {
        resultBox.innerHTML = "الرجاء كتابة اسم الخدمة.";
    } else {
        resultBox.innerHTML = "الخدمة غير موجودة… سيتم إضافتها لاحقًا.";
    }
}
