const deleteButtons = document.querySelectorAll('.button-delete');
deleteButtons.forEach((button) => 
{ button.addEventListener('click', (event) => 
{ event.preventDefault(); const boardId = button.dataset.boardId;
    const confirmDelete = confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) { fetch(`/board/${boardId}`, { method: 'DELETE' }).then(() => 
    { window.location.href = '/board'; }).catch((error) => 
    { console.error(error); 
    });
}
});
});
​