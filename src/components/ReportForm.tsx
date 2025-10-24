import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReportCategory, Report } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Send } from 'lucide-react';

interface ReportFormProps {
  onSuccess: () => void;
}

const ReportForm = ({ onSuccess }: ReportFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ReportCategory>('infrastructure');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newReport: Report = {
        id: Math.random().toString(36).substring(7),
        title,
        description,
        category,
        status: 'pending',
        location,
        citizenId: user!.id,
        citizenName: user!.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]');
      existingReports.push(newReport);
      localStorage.setItem('opengov_reports', JSON.stringify(existingReports));

      toast({
        title: 'Report Submitted!',
        description: 'Your report has been submitted successfully.',
      });

      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Submit New Report</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Report Title</Label>
          <Input
            id="title"
            placeholder="e.g., Broken streetlight on Main Street"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={(value) => setCategory(value as ReportCategory)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Provide detailed information about the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-2 min-h-32"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <div className="relative mt-2">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              id="location"
              placeholder="e.g., 123 Main Street, City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Be as specific as possible to help authorities locate the issue
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-secondary text-secondary-foreground hover:opacity-90"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            'Submitting...'
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Report
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ReportForm;
