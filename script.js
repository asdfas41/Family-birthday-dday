
// 다음 생일 날짜 계산
function getNextBirthday(month, day) {
    const today = new Date();

    let year = today.getFullYear();
    let birthday = new Date(year, month - 1, day);

    const startToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    if (birthday < startToday) {
        year++;
        birthday = new Date(year, month - 1, day);
    }

    return birthday;
}

// 남은 날짜 계산
function getDays(birthday) {
    const today = new Date();

    const startToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    return Math.round(
        (birthday - startToday) / 86400000
    );
}

// D-Day 표시
function makeDday(days) {
    return days === 0 ? "D-DAY!" : `D-${days}`;
}

// 화면 업데이트
function updateDday() {
    const today = new Date();

    const todayText = today.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    });

    document.getElementById("today").textContent = todayText;

    // 엄마 생일
    const momBirthday = getNextBirthday(2, 12);
    const momDays = getDays(momBirthday);

    document.getElementById("momDday").textContent =
        makeDday(momDays);

    // 아빠 생일
    const dadBirthday = getNextBirthday(6, 27);
    const dadDays = getDays(dadBirthday);

    document.getElementById("dadDday").textContent =
        makeDday(dadDays);
}

// 프로필 문구 복사
async function copyMessage() {
    const todayText =
        document.getElementById("today").textContent;

    const momText =
        document.getElementById("momDday").textContent;

    const dadText =
        document.getElementById("dadDday").textContent;

    const customMessage =
        document.getElementById("customMessage").value;

    const text =
        `🎂 우리 가족 생일 D-DAY!\n\n` +
        `📅 ${todayText}\n` +
        `👩 엄마 생일까지 ${momText}\n` +
        `👨 아빠 생일까지 ${dadText}\n\n` +
        `${customMessage}`;

    try {
        await navigator.clipboard.writeText(text);

        document.getElementById("copyText").textContent =
            "🎉 문구 복사 완료!";
    } catch (error) {
        document.getElementById("copyText").textContent =
            "복사에 실패했어. HTTPS 주소에서 다시 시도해 줘.";
    }
}

// 실행
updateDday();

document.getElementById("copyButton")
    .addEventListener("click", copyMessage);
