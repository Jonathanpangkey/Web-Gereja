// fungsi menampilkan foto bukti transaksi
function openModal(imageSrc) {
  document.getElementById("modalImage").src = imageSrc;
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
