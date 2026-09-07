// ========================================
// CLIPCRAFT ANALYTICS HISTORY
// Frontend Mock Data
// ========================================


const analyticsData = [

    {
        id: 1,
        project: "Product Promo",
        date: "2026-09-06",
        duration: 42,
        type: "Video Editing",
        status: "Completed"
    },

    {
        id: 2,
        project: "YouTube Short",
        date: "2026-09-05",
        duration: 28,
        type: "Video Editing",
        status: "Completed"
    },

    {
        id: 3,
        project: "Instagram Reel",
        date: "2026-09-04",
        duration: 35,
        type: "Video Editing",
        status: "Completed"
    },

    {
        id: 4,
        project: "College Project",
        date: "2026-09-03",
        duration: 65,
        type: "Video Editing",
        status: "Completed"
    },

    {
        id: 5,
        project: "Marketing Video",
        date: "2026-09-02",
        duration: 48,
        type: "Video Editing",
        status: "Processing"
    },

    {
        id: 6,
        project: "Travel Vlog",
        date: "2026-08-29",
        duration: 55,
        type: "Video Editing",
        status: "Completed"
    },

    {
        id: 7,
        project: "Portfolio Video",
        date: "2026-08-25",
        duration: 32,
        type: "Video Editing",
        status: "Completed"
    },

    {
        id: 8,
        project: "Tutorial Video",
        date: "2026-08-20",
        duration: 70,
        type: "Video Editing",
        status: "Completed"
    }

];


// ========================================
// ELEMENTS
// ========================================

const totalProjects =
    document.getElementById("totalProjects");

const totalTime =
    document.getElementById("totalTime");

const videosEdited =
    document.getElementById("videosEdited");

const historyTable =
    document.getElementById("historyTable");

const mobileHistory =
    document.getElementById("mobileHistory");

const activityList =
    document.getElementById("activityList");

const chartBars =
    document.getElementById("chartBars");

const chartLabels =
    document.getElementById("chartLabels");

const dateFilter =
    document.getElementById("dateFilter");

const searchInput =
    document.getElementById("searchInput");

const emptyState =
    document.getElementById("emptyState");

const exportBtn =
    document.getElementById("exportBtn");


// ========================================
// FORMAT TIME
// ========================================

function formatTime(minutes) {

    const hours =
        Math.floor(minutes / 60);

    const mins =
        minutes % 60;

    return `${hours}h ${mins}m`;
}


// ========================================
// SUMMARY
// ========================================

function updateSummary(data) {

    totalProjects.textContent =
        data.length;

    videosEdited.textContent =
        data.length;

    const totalMinutes =
        data.reduce(
            (sum, item) =>
                sum + item.duration,
            0
        );

    totalTime.textContent =
        formatTime(totalMinutes);
}


// ========================================
// TABLE
// ========================================

function renderTable(data) {

    historyTable.innerHTML = "";

    data.forEach(item => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>
                <strong>${item.project}</strong>
            </td>

            <td>
                ${formatDate(item.date)}
            </td>

            <td>
                ${formatTime(item.duration)}
            </td>

            <td>
                ${item.type}
            </td>

            <td>

                <span
                    class="status ${item.status.toLowerCase()}"
                >
                    ${item.status}
                </span>

            </td>

            <td>

                <button
                    class="view-btn"
                    onclick="viewAnalytics(${item.id})"
                >
                    View
                </button>

            </td>

        `;

        historyTable.appendChild(row);

    });
}


// ========================================
// MOBILE HISTORY
// ========================================

function renderMobile(data) {

    mobileHistory.innerHTML = "";

    data.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "mobile-history-card";

        card.innerHTML = `

            <div class="mobile-project">

                <strong>
                    ${item.project}
                </strong>

                <span
                    class="status ${item.status.toLowerCase()}"
                >
                    ${item.status}
                </span>

            </div>


            <div class="mobile-meta">

                <div>
                    <span>Date</span>
                    <strong>
                        ${formatDate(item.date)}
                    </strong>
                </div>

                <div>
                    <span>Duration</span>
                    <strong>
                        ${formatTime(item.duration)}
                    </strong>
                </div>

                <div>
                    <span>Type</span>
                    <strong>
                        ${item.type}
                    </strong>
                </div>

                <div>
                    <span>Status</span>
                    <strong>
                        ${item.status}
                    </strong>
                </div>

            </div>


            <button
                class="mobile-view-btn"
                onclick="viewAnalytics(${item.id})"
            >
                View Analytics
            </button>

        `;

        mobileHistory.appendChild(card);

    });
}


// ========================================
// RECENT ACTIVITY
// ========================================

function renderRecentActivity(data) {

    activityList.innerHTML = "";

    const recent =
        data.slice(0, 3);

    recent.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "activity-card";

        card.innerHTML = `

            <div class="activity-top">

                <div class="activity-icon">
                    ▶
                </div>

                <strong>
                    ${item.project}
                </strong>

            </div>

            <small>
                ${item.type} •
                ${formatDate(item.date)}
            </small>

        `;

        activityList.appendChild(card);

    });
}


// ========================================
// CHART
// ========================================

function renderChart(data) {

    chartBars.innerHTML = "";
    chartLabels.innerHTML = "";

    if (data.length === 0) {
        return;
    }


    const grouped = {};

    data.forEach(item => {

        if (!grouped[item.date]) {
            grouped[item.date] = 0;
        }

        grouped[item.date]++;

    });


    const dates =
        Object.keys(grouped)
            .sort()
            .slice(-7);


    dates.forEach(date => {

        const count =
            grouped[date];

        const bar =
            document.createElement("div");

        bar.className = "bar";


        const height =
            Math.min(
                count * 10,
                100
            );

        bar.style.height =
            `${Math.max(height, 8)}%`;


        chartBars.appendChild(bar);


        const label =
            document.createElement("span");

        label.textContent =
            formatShortDate(date);

        chartLabels.appendChild(label);

    });

}


// ========================================
// FILTER
// ========================================

function getFilteredData() {

    const filter =
        dateFilter.value;

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    let data =
        analyticsData;


    // Date filter

    if (filter !== "all") {

        const days =
            Number(filter);

        const today =
            new Date();

        const limit =
            new Date();

        limit.setDate(
            today.getDate() - days
        );


        data =
            data.filter(item => {

                const itemDate =
                    new Date(item.date);

                return itemDate >= limit;

            });

    }


    // Search

    if (search) {

        data =
            data.filter(item =>
                item.project
                    .toLowerCase()
                    .includes(search)
            );

    }


    return data;
}


// ========================================
// UPDATE UI
// ========================================

function updateUI() {

    const data =
        getFilteredData();


    updateSummary(data);

    renderTable(data);

    renderMobile(data);

    renderRecentActivity(data);

    renderChart(data);


    if (data.length === 0) {

        emptyState.style.display =
            "block";

    } else {

        emptyState.style.display =
            "none";

    }

}


// ========================================
// DATE FORMAT
// ========================================

function formatDate(date) {

    const d =
        new Date(date);

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function formatShortDate(date) {

    const d =
        new Date(date);

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short"
        }
    );

}


// ========================================
// VIEW ANALYTICS
// ========================================

function viewAnalytics(id) {

    const item =
        analyticsData.find(
            data => data.id === id
        );


    if (!item) return;


    alert(

        "Analytics Details\n\n" +

        "Project: " +
        item.project +

        "\nDate: " +
        formatDate(item.date) +

        "\nDuration: " +
        formatTime(item.duration) +

        "\nType: " +
        item.type +

        "\nStatus: " +
        item.status

    );

}


// ========================================
// EXPORT
// ========================================

exportBtn.addEventListener(
    "click",
    function () {

        alert(
            "Frontend demo: Analytics report export will be connected to the backend later."
        );

    }
);


// ========================================
// EVENTS
// ========================================

dateFilter.addEventListener(
    "change",
    updateUI
);

searchInput.addEventListener(
    "input",
    updateUI
);


// ========================================
// INITIAL LOAD
// ========================================

updateUI();