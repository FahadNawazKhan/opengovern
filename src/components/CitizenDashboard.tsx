import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Report } from '@/types';
import { Plus, MapPin, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import ReportForm from './ReportForm';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadReports();
  }, [user]);

  const loadReports = () => {
    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]');
    const userReports = allReports.filter((r: Report) => r.citizenId === user?.id);
    setReports(userReports);
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <Loader className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-accent text-accent-foreground';
      case 'in_progress':
        return 'bg-primary text-primary-foreground';
      case 'resolved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
    }
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => {
            setShowForm(false);
            loadReports();
          }}
          className="mb-4"
        >
          ← Back to Dashboard
        </Button>
        <ReportForm onSuccess={() => {
          setShowForm(false);
          loadReports();
        }} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground">Track your reports and make your community better</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="text-3xl font-bold text-primary">{reports.length}</div>
          <div className="text-sm text-muted-foreground">Total Reports</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="text-3xl font-bold text-accent-foreground">{reports.filter(r => r.status === 'pending').length}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="text-3xl font-bold text-primary">{reports.filter(r => r.status === 'in_progress').length}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5">
          <div className="text-3xl font-bold text-success">{reports.filter(r => r.status === 'resolved').length}</div>
          <div className="text-sm text-muted-foreground">Resolved</div>
        </Card>
      </div>

      {/* New Report Button */}
      <Button
        onClick={() => setShowForm(true)}
        className="mb-6 bg-secondary text-secondary-foreground hover:opacity-90"
        size="lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Submit New Report
      </Button>

      {/* Reports List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Reports</h2>
        {reports.length === 0 ? (
          <Card className="p-12 text-center">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">You haven't submitted any reports yet</p>
            <Button onClick={() => setShowForm(true)} className="bg-primary">
              Submit Your First Report
            </Button>
          </Card>
        ) : (
          reports.map((report) => (
            <Card key={report.id} className="p-6 hover:shadow-lg transition-smooth">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{report.title}</h3>
                  <p className="text-muted-foreground mb-3">{report.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {report.location}
                  </div>
                </div>
                <Badge className={`${getStatusColor(report.status)} flex items-center gap-1`}>
                  {getStatusIcon(report.status)}
                  {report.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Badge variant="outline">{report.category}</Badge>
                <span className="text-muted-foreground">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
              {report.assignedToName && (
                <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                  Assigned to: <span className="font-medium text-foreground">{report.assignedToName}</span>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;
