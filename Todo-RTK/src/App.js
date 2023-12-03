import './App.css';
// import TodoList from './components/TodoList';
import TodoView from './features/todo/TodoView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoView />
      </header>
    </div>
  );
}

export default App;
