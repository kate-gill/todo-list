const form = document.getElementById('mainForm');
const input = document.getElementById('todoInput');
const ul = document.getElementById('todoLst');
const compUl = document.getElementById('compTodoLst');
const btnAdd = document.getElementById('btnAdd');
const btnDel = document.getElementById('btnDel');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

const todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
const compArray = localStorage.getItem('compTodos') ? JSON.parse(localStorage.getItem('compTodos')) : [];

localStorage.setItem('todos', JSON.stringify(todosArray));
localStorage.setItem('compTodos', JSON.stringify(compArray));

const data = JSON.parse(localStorage.getItem('todos'));
const data2 = JSON.parse(localStorage.getItem('compTodos'));

btnAdd.addEventListener('click', function(e){

    if (input.value === ''){
        alert('Can\'t be empty!');
    } else {
        todosArray.push(input.value);
        localStorage.setItem('todos', JSON.stringify(todosArray));
        addTodo(input.value);
    }
    
});

function addTodo(inpText) {

    btnDel.disabled = false;
    p2.classList.add('hidden');
        
        const newLi = document.createElement('li'); 

        const label = document.createElement('label');
        const editor = document.createElement('input');
        const btnDone = document.createElement('button'); 
        const btnEdit = document.createElement('button');

        label.textContent = inpText;
        editor.type = 'text';
        btnEdit.innerText = 'Edit';
        btnDone.innerText = 'Done!';

        editor.setAttribute('maxlength', 30);
        btnEdit.classList.add('btnNew', 'btn', 'btn-light');
        btnDone.classList.add('btnNew', 'btn', 'btn-light');
        editor.classList.add('editor');
        label.classList.add('todoStyle');
        newLi.classList.add('list-group-item');

        newLi.appendChild(label);
        newLi.appendChild(editor);
        newLi.appendChild(btnEdit);
        newLi.appendChild(btnDone);               
              
        ul.appendChild(newLi);
                            
        editLi(btnEdit, btnDone);
        doneLi(btnDone, label);
        
        input.value = '';
} 

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (input.value === ''){
        alert('Can\'t be empty!');
    } else {
        todosArray.push(input.value);
        localStorage.setItem('todos', JSON.stringify(todosArray));
        addTodo(input.value);
    }
  });
  
  
function editLi(bEdit, bDone){

    bEdit.addEventListener('click', function(e){

        const cur = e.currentTarget.parentNode;
        const editCur = cur.querySelector('input[type=text]');
        const label = cur.querySelector('label');
        const containsClass = cur.classList.contains('editMode');

        if (bEdit.innerText == 'Edit'){
            bEdit.innerText = 'Save';
            bDone.classList.add('hidden');
            label.classList.add('hidden');

        } else {
            bEdit.innerText = 'Edit';
            bDone.classList.remove('hidden');
            label.classList.remove('hidden');
        }  

        const pos = todosArray.indexOf(label.innerText);     

        if(containsClass) {
            if (editCur.value === '') {
                alert('Can\'t be empty!');
            } else {
                label.innerText = editCur.value;
                todosArray[pos] = editCur.value;
            }
        } else {
            editCur.value = label.innerText;
        }        
        
        cur.classList.toggle('editMode');
        localStorage.setItem('todos', JSON.stringify(todosArray));

    });

}

function doneLi(bDone, lab){
    bDone.addEventListener('click', function(e){

        compArray.push(lab.innerHTML);
        localStorage.setItem('compTodos', JSON.stringify(compArray));
        addCompTodo(lab.innerHTML);
        e.currentTarget.parentNode.remove();
        todosArray.splice(todosArray.indexOf(lab.innerHTML), 1);
        localStorage.setItem('todos', JSON.stringify(todosArray));

        if (todosArray.length <= 0){
            p2.classList.remove('hidden');
        }
    });

}


function addCompTodo(todoText) {
    
    btnDel.disabled = false;
    p1.classList.add('hidden');

    const compLi = document.createElement('li'); 
    const label = document.createElement('label');
    const delBtn = document.createElement('button');
    const undoBtn = document.createElement('button');
    const line = document.createElement('hr');    

    label.textContent = todoText;   
    undoBtn.innerText = 'Undo';
    delBtn.innerText = 'Delete'; 

    label.classList.add('liStyle');
    line.classList.add('hrLine');
    undoBtn.classList.add('btnNew', 'btn', 'btn-light');
    delBtn.classList.add('btnNew', 'btn', 'btn-light');

    compLi.appendChild(label);
    compLi.appendChild(undoBtn);
    compLi.appendChild(delBtn);
    compLi.appendChild(line);

    compUl.appendChild(compLi);  
    
    undoTodo(undoBtn, label);
    deleteComp(delBtn, label);
}

function undoTodo(undoB, lab){

    undoB.addEventListener('click', function(e){

        e.currentTarget.parentNode.remove();
        compArray.splice(compArray.indexOf(lab.innerHTML), 1);
        todosArray.push(lab.innerHTML);
        addTodo(lab.innerHTML);

        localStorage.setItem('compTodos', JSON.stringify(compArray));
        localStorage.setItem('todos', JSON.stringify(todosArray));

        if (compArray.length <= 0){
            p1.classList.remove('hidden');
        }
    });
}


function deleteComp(delB, lab){
    delB.addEventListener('click', function(e){

        e.currentTarget.parentNode.remove();
        compArray.splice(compArray.indexOf(lab.innerHTML), 1);
        localStorage.setItem('compTodos', JSON.stringify(compArray));

        if (compArray.length <= 0 && todosArray.length <= 0){
            p1.classList.remove('hidden');
            btnDel.disabled = true;
        }
        else if (compArray.length <= 0){
            p1.classList.remove('hidden');
        }
    });
}


function deleteAll(){
    
    const confirm = prompt('Are you sure you want to delete everything? Type \'Yes\' to confirm');

    if (confirm.toLowerCase() === 'yes'){
        localStorage.clear()
        ul.innerHTML = '';
        compUl.innerHTML = '';
        p1.classList.remove('hidden')
        p2.classList.remove('hidden')
        btnDel.disabled = true;
    }
}

data.forEach(todo => addTodo(todo));
data2.forEach(todo => addCompTodo(todo));