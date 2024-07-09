// fungsi export pdf
document.getElementById("export-pdf-btn").addEventListener("click", async function () {
  const {jsPDF} = window.jspdf;

  try {
    // Fetch data from the server
    const response = await fetch("/api/export");
    const data = await response.json();

    // Get selected month and year
    const selectedMonth = parseInt(document.getElementById("month-select").value);
    const selectedYear = parseInt(document.getElementById("year-select").value);

    // Calculate previous month and year
    let prevMonth = selectedMonth - 1;
    let prevYear = selectedYear;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear -= 1;
    }

    // Process and filter data based on the selected month and year
    const pemasukkan = data.pemasukkan
      .filter((item) => {
        const date = new Date(item.tanggal);
        return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
      })
      .map((item) => ({
        date: item.tanggal,
        description: `${item.kategori} - ${item.nama_jemaat}`,
        income: parseFloat(item.nominal),
        expense: 0,
      }));

    const pengeluaran = data.pengeluaran
      .filter((item) => {
        const date = new Date(item.tanggal);
        return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
      })
      .map((item) => ({
        date: item.tanggal,
        description: item.kategori,
        income: 0,
        expense: parseFloat(item.nominal),
      }));

    const entries = [...pemasukkan, ...pengeluaran].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate previous month balance
    let prevBalance = 0;
    data.pemasukkan.forEach((item) => {
      const date = new Date(item.tanggal);
      if (date.getMonth() === prevMonth && date.getFullYear() === prevYear) {
        prevBalance += parseFloat(item.nominal);
      }
    });
    data.pengeluaran.forEach((item) => {
      const date = new Date(item.tanggal);
      if (date.getMonth() === prevMonth && date.getFullYear() === prevYear) {
        prevBalance -= parseFloat(item.nominal);
      }
    });

    // Calculate totals for the selected month
    let totalIncome = pemasukkan.reduce((sum, item) => sum + item.income, 0);
    let totalExpense = pengeluaran.reduce((sum, item) => sum + item.expense, 0);
    let totalSaldo = prevBalance + totalIncome - totalExpense;

    // Get selected month name
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const currentMonth = monthNames[selectedMonth];
    const currentYear = selectedYear;

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add title and headers
    doc.setFontSize(12);
    doc.text("GEREJA MASEHI INJILI DI MINAHASA", 105, 10, null, null, "center");
    doc.setFontSize(10);
    doc.text('JEMAAT "IMANUEL" REMBOKEN - WILAYAH REMBOKEN', 105, 16, null, null, "center");
    doc.text("BUKU KAS JEMAAT", 105, 22, null, null, "center");
    doc.text(`BULAN ${currentMonth.toUpperCase()} ${currentYear}`, 105, 28, null, null, "center");

    // Prepare table headers and rows
    const headers = [["Hari/Tanggal", "Uraian", "Pemasukkan", "Pengeluaran", "Saldo"]];
    const rows = [];

    // Add previous balance row
    rows.push([
      "",
      `Saldo Bulan ${monthNames[prevMonth]} ${prevYear}`,
      "",
      "",
      `Rp ${prevBalance.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
    ]);

    // Add entries rows
    let saldo = prevBalance;
    entries.forEach((entry) => {
      saldo += entry.income - entry.expense;
      rows.push([
        entry.date,
        entry.description,
        `Rp ${entry.income.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
        `Rp ${entry.expense.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
        `Rp ${saldo.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      ]);
    });

    // Add table using autoTable plugin
    doc.autoTable({
      startY: 36,
      head: headers,
      body: rows,
      styles: {
        fontSize: 9,
        cellPadding: 3,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0], // Text color black
        fillColor: [255, 255, 255], // Background color white
        lineWidth: 0.1,
      },
      theme: "grid",
      headStyles: {
        fillColor: [255, 255, 255], // Header background color white
        textColor: [0, 0, 0], // Header text color black
        lineColor: [0, 0, 0], // Header border color black
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // Alternating row background color white
        textColor: [0, 0, 0], // Alternating row text color black
        lineColor: [0, 0, 0], // Alternating row border color black
      },
    });

    // Add Rekapitulasi section
    const rekapitulasiY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text("Rekapitulasi", 14, rekapitulasiY);
    doc.setFontSize(9);
    doc.text(`Saldo Bulan ${monthNames[prevMonth]} ${prevYear}:`, 14, rekapitulasiY + 6);
    doc.text(`Rp ${prevBalance.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 90, rekapitulasiY + 6);
    doc.text(`Total Penerimaan Bulan ${currentMonth} ${currentYear}:`, 14, rekapitulasiY + 12);
    doc.text(`Rp ${totalIncome.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 90, rekapitulasiY + 12);
    doc.text(`Total Pengeluaran Bulan ${currentMonth} ${currentYear}:`, 14, rekapitulasiY + 18);
    doc.text(`Rp ${totalExpense.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 90, rekapitulasiY + 18);
    doc.text(`Total Saldo Bulan ${currentMonth} ${currentYear}:`, 14, rekapitulasiY + 24);
    doc.text(`Rp ${totalSaldo.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 90, rekapitulasiY + 24);

    // Save the PDF
    doc.save("financial-report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
});
