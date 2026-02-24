// First, create a new file: components/ContactRecruitmentModal.tsx

import { useState } from 'react';
import { Send, X, Phone, Mail, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { toast } from 'sonner';

interface ContactRecruitmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialRole?: string;
}

export function ContactRecruitmentModal({ 
  open, 
  onOpenChange,
  initialRole = '' 
}: ContactRecruitmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    department: 'careers',
    subject: '',
    message: '',
    roleOfInterest: initialRole
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent to Recruitment Team!', { 
      description: 'A recruitment specialist will respond within 24 hours.' 
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      department: 'careers',
      subject: '',
      message: '',
      roleOfInterest: ''
    });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid divide-x divide-slate-100">
          {/* Left Panel - Recruitment Team Info */}
    

          {/* Right Panel - Contact Form */}
          <div className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Send a Message
                </h3>
                <p className="text-sm text-slate-500">
                  Fill out the form and a recruiter will respond within 24 hours
                </p>
              </div>
              <button 
                onClick={() => onOpenChange(false)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-name">Full Name *</Label>
                  <Input
                    id="modal-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-email">Email *</Label>
                  <Input
                    id="modal-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-phone">Phone</Label>
                  <Input
                    id="modal-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-company">Current Company</Label>
                  <Input
                    id="modal-company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Your Company"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-role">Role of Interest</Label>
                  <Input
                    id="modal-role"
                    value={formData.roleOfInterest}
                    onChange={(e) => setFormData(prev => ({ ...prev, roleOfInterest: e.target.value }))}
                    placeholder="e.g., Senior Process Engineer"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-subject">Subject *</Label>
                  <Input
                    id="modal-subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="How can we help?"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-message">Message *</Label>
                <Textarea
                  id="modal-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about your inquiry..."
                  className="resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 mb-4">
                  By submitting, you agree to our privacy policy and consent to being contacted by our recruitment team.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}