const participantList = [];
const participantTable = document.getElementById('participantList');

// Tambahkan peserta baru
document.getElementById('addParticipant').addEventListener('click', () => {
  const name = document.getElementById('participant').value.trim();
  const points = parseInt(document.getElementById('points').value, 10);

  if (name && !isNaN(points)) {
    participantList.push({ name, points });
    updateTable();
    document.getElementById('participant').value = '';
    document.getElementById('points').value = '';
  } else {
    alert('Masukkan data peserta dengan benar!');
  }
});

// Perbarui tabel peserta
function updateTable() {
  participantTable.innerHTML = '';
  participantList.forEach((participant, index) => {
    participantTable.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${participant.name}</td>
        <td>${participant.points}</td>
      </tr>
    `;
  });
}

// Urutkan menggunakan iteratif (Selection Sort)
document.getElementById('calculateIterative').addEventListener('click', () => {
  selectionSortIterative(participantList);
  updateTable();
});

function selectionSortIterative(list) {
  for (let i = 0; i < list.length - 1; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < list.length; j++) {
      if (list[j].points > list[maxIndex].points) {
        maxIndex = j;
      }
    }
    // Tukar elemen
    if (maxIndex !== i) {
      const temp = list[i];
      list[i] = list[maxIndex];
      list[maxIndex] = temp;
    }
  }
}

// Urutkan menggunakan rekursif (Selection Sort)
document.getElementById('calculateRecursive').addEventListener('click', () => {
  selectionSortRecursive(participantList, 0);
  updateTable();
});

function findMaxIndexRecursive(list, currentIndex, maxIndex) {
  if (currentIndex >= list.length) return maxIndex; // Basis rekursi: selesai jika indeks akhir tercapai
  if (list[currentIndex].points > list[maxIndex].points) {
    return findMaxIndexRecursive(list, currentIndex + 1, currentIndex);
  } else {
    return findMaxIndexRecursive(list, currentIndex + 1, maxIndex);
  }
}

function selectionSortRecursive(list, startIndex = 0) {
  if (startIndex >= list.length - 1) 
    return;
  
  const maxIndex = findMaxIndexRecursive(list, startIndex + 1, startIndex);

  if (maxIndex !== startIndex) {
    const temp = list[startIndex];
    list[startIndex] = list[maxIndex];
    list[maxIndex] = temp;
  }

  selectionSortRecursive(list, startIndex + 1);
}

// Gunakan fungsi ini di event listener Anda
document.getElementById('calculateRecursive').addEventListener('click', () => {
  selectionSortRecursive(participantList, 0);
  updateTable();
});