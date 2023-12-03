# get request

function getTodos() {
    axios
        .get('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        timeout: 5000
        })
        .then(res => showOutput(res))
        .catch(err => console.error(err));
} 

# // POST REQUEST
function addTodo() {
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo',
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}