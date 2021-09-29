//Load the Todos from the backend
const backendUrl = 'http://localhost:3000/todos';


// READ
$(document).ready(function(){
    //ajax === asynchronous javascript and xml
    fetch(backendUrl)
  .then(response => {
    if(!response.ok) {
      throw Error();
    }
    return response.json()})
  .then(data => {
    $('ul').empty();
    data.map(function(todo){
      $('ul').append(`<li class="${todo.isComplete ? 'completed' : ''}" data-id=${todo._id}>${todo.description}<span><i class="fas fa-trash-alt"></i></li>`)
    })
  })
  .catch(err => {
    console.log(err)
  });

    // $.ajax({
    //     url: backendUrl,
    //     method: 'GET'
    // })
    // .done(function(data){
    //     $('ul').empty();
    //     data.map(function(todo){
    //         $('ul').append(`

    //         <li>${todo.description}</li>

    //         `
    //         )
    //     })
    // })
    // .fail(function(err){
    //     console.log(err);
    // })
});

//Updating list item complete
$('ul').on('click', 'li', function(){
    //1. Get the id
    let thisId = $(this).data('id');
    //2. Form the backend url
    let url = `${backendUrl}/${thisId}`;
    //3. inform the backend
    $.ajax({ 
      url: url,
      method: 'PUT'
     })
     .done(() => {
         //4. if success then inform the front-end
      $(this).toggleClass('completed');
     })
     .fail((err) => {
       console.log('Something went wrong.', err);
     });
});


//deleting a list item
$('ul').on('click', 'span', function(event){
  event.stopPropagation();
  let thisId = $(this).parent().data('id');
    let url = `${backendUrl}/${thisId}`;
  //informing the backend
    $.ajax({
      url,
      method: 'DELETE'
    })
    .done(() => {
      //informing the front-end
      $(this).parent().remove()
    })
    .fail((err) => console.error('Something went wrong, please reload', err));
    
});

//add list item
$('input').keypress(function(event){
    if(event.which === 13) {
        var todoItem = $(this).val();
         let newTodoItem = {
        description: todoItem
    }

        fetch(backendUrl, { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newTodoItem)
        })
        .then(response => response.json())
        .then(todoItem =>{
            $('ul').append(
                `<li data-id=${todoItem._id}>
                ${todoItem.description}
                <span>
                <i class="fas fa-trash-alt"></i>
                </span>
                </li>
                `
            )
            $(this).val("");
            
        })
        .catch(err => console.log('Error in posting data to server', err))


        //console.log(todoItem);
       
        
    }
});