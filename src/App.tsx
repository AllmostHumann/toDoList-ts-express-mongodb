import {
  HashRouter,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import { Nav } from './components/Navigation/nav';
import { toTask, toTasks, toAutor } from './routers';
import { TaskPage } from './to-do-list/TaskPage/task';
import { TasksPage } from './to-do-list/TasksPage/tasksPage';
import { AuthorPage } from './to-do-list/AuthorPage/author';

export default function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route
          path={toTask()}
          element={<TaskPage />}
        />
        <Route
          path={toTasks()}
          element={<TasksPage />}
        />
        <Route
          path={toAutor()}
          element={<AuthorPage />}
        />
        <Route
          path=''
          element={
            <Navigate
              to={toTasks()}
              replace
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}
