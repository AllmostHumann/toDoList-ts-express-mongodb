import { HashRouter, Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Nav } from './components/Navigation/nav';
import { toTask, toTasks, toAutor } from './routers';
import { TaskPage } from './to-do-list/TaskPage/task';
import { TasksPage } from './to-do-list/TasksPage/tasksPage';
import { AuthorPage } from './to-do-list/AuthorPage/author';
import { Footer } from './components/Footer/footer';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { LoginMenu } from './components/LoginMenu/loginMenu';
import { useState } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 24,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
});

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <HashRouter>
        <Nav setShowModal={setShowModal} />
        {showModal && <LoginMenu setShowModal={setShowModal} />}
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
        </Routes>
        <Footer />
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
