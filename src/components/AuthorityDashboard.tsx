import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Report, ReportStatus } from '@/types';
import { MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthorityDashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<'all' | ReportStatus>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]');
    setReports(allReports);
  };

  const updateReportStatus = (reportId: string, newStatus: ReportStatus) => {
    const allReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]');
    const updatedReports = allReports.map((r: Report) =>
      r.id === reportId
        ? {
            ...r,
            status: newStatus,
            assignedTo: newStatus === 'in_progress' ? user?.id : r.assignedTo,
            assignedToName: newStatus === 'in_progress' ? user?.name : r.assignedToName,
            updatedAt: new Date().toISOString(),
          }
        : r
    );
    localStorage.setItem('opengov_reports', JSON.stringify(updatedReports));
    loadReports();
    
    toast({
      title: 'Status Updated',
      description: `Report marked as ${newStatus.replace('_', ' ')}`,
    });
  };

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(r => r.status === filter);

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    inProgress: reports.filter(r => r.status === 'in_progress').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Authority Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user?.name} - Manage and respond to citizen reports</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          <div className="text-sm text-muted-foreground">Total Reports</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-accent-foreground">{stats.pending}</div>
            <Clock className="w-8 h-8 text-accent-foreground" />
          </div>
          <div className="text-sm text-muted-foreground">Pending Review</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-secondary">{stats.inProgress}</div>
            <Clock className="w-8 h-8 text-secondary" />
          </div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-success">{stats.resolved}</div>
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <div className="text-sm text-muted-foreground">Resolved</div>
        </Card>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter reports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No reports to display</p>
          </Card>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="p-6 hover:shadow-lg transition-smooth">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{report.title}</h3>
                    <Badge variant="outline">{report.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{report.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {report.location}
                    </div>
                    <div>
                      Reported by: <span className="font-medium text-foreground">{report.citizenName}</span>
                    </div>
                    <div>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t">
                <span className="text-sm font-medium mr-2">Update Status:</span>
                <Button
                  size="sm"
                  variant={report.status === 'in_progress' ? 'default' : 'outline'}
                  onClick={() => updateReportStatus(report.id, 'in_progress')}
                  className={report.status === 'in_progress' ? 'bg-primary' : ''}
                >
                  In Progress
                </Button>
                <Button
                  size="sm"
                  variant={report.status === 'resolved' ? 'default' : 'outline'}
                  onClick={() => updateReportStatus(report.id, 'resolved')}
                  className={report.status === 'resolved' ? 'bg-success' : ''}
                >
                  Resolved
                </Button>
                <Button
                  size="sm"
                  variant={report.status === 'rejected' ? 'default' : 'outline'}
                  onClick={() => updateReportStatus(report.id, 'rejected')}
                  className={report.status === 'rejected' ? 'bg-destructive' : ''}
                >
                  Reject
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AuthorityDashboard;
