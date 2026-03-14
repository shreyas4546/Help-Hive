import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AnimatedButton from '../components/ui/AnimatedButton';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, loginAsRole, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const roleFromQuery = searchParams.get('role');
    if (roleFromQuery === 'admin' || roleFromQuery === 'volunteer') {
      setRole(roleFromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!user?.role) return;
    navigate('/role-selection', { replace: true });
  }, [user, navigate]);

  const handleRoleLogin = async (role) => {
    setError('');
    setSubmitting(true);
    try {
      await loginAsRole(role);
    } catch (err) {
      setError(err.response?.data?.message || 'Role login failed. Ensure seed users exist in backend.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your email and password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col items-center"
      >
        <h1 className="mb-2 font-['Sora'] text-2xl font-bold text-center">HelpHive Login</h1>
        <p className="mb-6 text-center text-sm text-[var(--text-secondary)]">Access your admin or volunteer dashboard securely.</p>

        <div className="w-full space-y-3 mb-5">
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-[var(--border-muted)] bg-[var(--card-elevated)] p-1">
            <button
              type="button"
              onClick={() => setRole('volunteer')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${role === 'volunteer' ? 'bg-emerald-600 text-white' : 'text-[var(--text-secondary)]'}`}
            >
              Volunteer
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${role === 'admin' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)]'}`}
            >
              Admin
            </button>
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-[var(--border-muted)] bg-[var(--card-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-[var(--border-muted)] bg-[var(--card-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]"
          />
        </div>

        {error ? <p className="mb-3 w-full rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-center text-xs text-rose-300">{error}</p> : null}

        <div className="w-full space-y-4">
          <AnimatedButton type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </AnimatedButton>

          <div className="grid grid-cols-2 gap-3">
            <AnimatedButton
              type="button"
              onClick={() => handleRoleLogin('admin')}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={submitting}
            >
              Quick Admin
            </AnimatedButton>
            <AnimatedButton
              type="button"
              onClick={() => handleRoleLogin('volunteer')}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={submitting}
            >
              Quick Volunteer
            </AnimatedButton>
          </div>

          <p className="pt-1 text-center text-xs text-[var(--text-muted)]">
            Quick login uses seeded backend role users.
          </p>
          <p className="text-center text-xs text-[var(--text-secondary)]">
            New here? <Link to={`/register?role=${role}`} className="font-semibold text-[var(--text-primary)]">Register here</Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default LoginPage;
