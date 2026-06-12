import { useEffect, useState } from 'react';

const STORAGE_KEY = 'vibetask.tasks';

function App() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((current) => [
      { id: Date.now().toString(), text: trimmed, completed: false },
      ...current,
    ]);
    setText('');
  };

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home">
            VibeTask
          </a>
          <nav className="site-nav">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Task tracking made simple</span>
              <h1>Stay on top of your day with VibeTask</h1>
              <p>
                Capture priorities, track progress, and keep work moving with a clean,
                lightweight task tracker built for focus.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#features">
                  Explore Features
                </a>
                <a className="button button-secondary" href="#contact">
                  Get in Touch
                </a>
              </div>
            </div>

            <div className="task-panel">
              <div className="task-panel-header">
                <div>
                  <h2>Your tasks</h2>
                  <p>Quickly add, complete, and remove tasks.</p>
                </div>
                <span id="task-count">{tasks.length} task{tasks.length === 1 ? '' : 's'}</span>
              </div>

              <form className="task-form" onSubmit={addTask}>
                <input
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  type="text"
                  placeholder="Add a new task"
                  aria-label="Add a new task"
                />
                <button type="submit">Add</button>
              </form>

              <ul className="task-list" aria-live="polite">
                {tasks.length === 0 ? (
                  <li className="task-item">
                    <p className="task-text">No tasks yet. Add one to get started.</p>
                  </li>
                ) : (
                  tasks.map((task) => (
                    <li
                      key={task.id}
                      data-id={task.id}
                      className={`task-item${task.completed ? ' done' : ''}`}
                    >
                      <button
                        type="button"
                        className="task-toggle"
                        aria-label="Toggle task completion"
                        onClick={() => toggleTask(task.id)}
                      >
                        {task.completed ? '☑' : '☐'}
                      </button>
                      <p className="task-text">{task.text}</p>
                      <div className="task-actions">
                        <button
                          type="button"
                          className="task-delete"
                          aria-label="Delete task"
                          onClick={() => deleteTask(task.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </section>

        <section id="features" className="section-block">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Features</span>
              <h2>Built for clarity and speed</h2>
              <p>
                VibeTask gives you the essentials to create tasks, mark them done, and keep your
                workflow visible on every device.
              </p>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <h3>Simple task input</h3>
                <p>Create tasks instantly with a single entry field and keep your day organized without clutter.</p>
              </article>
              <article className="feature-card">
                <h3>Fast completion</h3>
                <p>Mark progress with a tap and see your completed tasks fade away as you keep moving.</p>
              </article>
              <article className="feature-card">
                <h3>Responsive layout</h3>
                <p>The app adapts to phones, tablets, and desktops so your task list is always easy to access.</p>
              </article>
              <article className="feature-card">
                <h3>Minimal interface</h3>
                <p>Focus on the work that matters with a clean design that removes distractions.</p>
              </article>
              <article className="feature-card">
                <h3>Contact support</h3>
                <p>Reach out quickly when you need help or want to share feedback.</p>
              </article>
              <article className="feature-card">
                <h3>Modern styling</h3>
                <p>Enjoy a polished visual experience with accessible typography and soothing colors.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section-block section-contact">
          <div className="container contact-grid">
            <div>
              <span className="eyebrow">Contact</span>
              <h2>Let’s make your planning better</h2>
              <p>Have a question or want help customizing your workflow? Send a message and we’ll reply soon.</p>
            </div>

            <form className="contact-form" action="mailto:hello@vibetask.example" method="post" encType="text/plain">
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" placeholder="Tell us about your task needs" required />
              </label>
              <button type="submit" className="button button-primary">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 VibeTask. Lightweight task tracking for focused teams.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
// Vercel deployment triggered
