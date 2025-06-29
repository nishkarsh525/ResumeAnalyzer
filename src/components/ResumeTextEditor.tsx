
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, RefreshCw, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeTextEditorProps {
  originalText: string;
  improvements: Array<{
    section: string;
    original: string;
    improved: string;
    applied: boolean;
  }>;
  onApplyImprovement: (index: number) => void;
  onRevertImprovement: (index: number) => void;
}

const ResumeTextEditor = ({ 
  originalText, 
  improvements, 
  onApplyImprovement, 
  onRevertImprovement 
}: ResumeTextEditorProps) => {
  const [editedText, setEditedText] = useState(originalText);
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Text has been copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const downloadText = () => {
    const blob = new Blob([editedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'improved-resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your improved resume text is being downloaded.",
    });
  };

  const appliedCount = improvements.filter(imp => imp.applied).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="font-medium">{appliedCount}</span> of {improvements.length} improvements applied
            </div>
            <Badge variant={appliedCount > 0 ? "default" : "secondary"}>
              {appliedCount > 0 ? "Modified" : "Original"}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => copyToClipboard(editedText)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button size="sm" variant="outline" onClick={downloadText}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </Card>

      {/* Text Editor */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Improved Resume Text</h4>
        <Textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="min-h-[400px] font-mono text-sm"
          placeholder="Your improved resume text will appear here..."
        />
        <div className="mt-4 text-sm text-gray-600">
          You can edit the text directly or apply AI suggestions below.
        </div>
      </Card>

      {/* Quick Apply Actions */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium">Quick Actions</h5>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                improvements.forEach((_, index) => {
                  if (!improvements[index].applied) {
                    onApplyImprovement(index);
                  }
                });
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Apply All
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                improvements.forEach((_, index) => {
                  if (improvements[index].applied) {
                    onRevertImprovement(index);
                  }
                });
                setEditedText(originalText);
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResumeTextEditor;
