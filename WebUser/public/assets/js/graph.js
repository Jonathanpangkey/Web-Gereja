document.addEventListener("DOMContentLoaded", function () {
    // Mengambil nilai dari elemen data
    const dataContainer = document.getElementById("data-container");
    const totalIncome = parseFloat(dataContainer.getAttribute("data-total-income"));
    const totalExpense = parseFloat(dataContainer.getAttribute("data-total-expense"));
  
    const ctx = document.getElementById("financialChart").getContext("2d");
  
    const financialChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Pemasukkan", "Pengeluaran"],
        datasets: [
          {
            label: "Grafik Keuangan",
            data: [totalIncome, totalExpense],
            backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              boxWidth: 0,
              color: "black", // Warna teks legend
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  });
  