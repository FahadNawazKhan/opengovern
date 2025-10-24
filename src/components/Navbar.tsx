import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Shield } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              user.role === 'citizen' ? 'bg-primary' : 'bg-secondary'
            }`}>
              {user.role === 'citizen' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Shield className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                OpenGov
              </h1>
              <p className="text-xs text-muted-foreground capitalize">{user.role} Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
