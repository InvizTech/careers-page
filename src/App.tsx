import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Briefcase, MapPin, Clock, ChevronDown } from 'lucide-react';
import { Button } from './components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';

interface Job {
  title: string;
  level: string;
  description: string;
  location: string;
  type: string;
  department: string;
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedDept, setExpandedDept] = useState<string | null>('Design');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const departments = ['All', 'Design', 'Development', 'Marketing', 'Strategy'];

  const jobs: Job[] = [
    {
      title: 'UI/UX Designer',
      level: 'Intern',
      description: 'Create next-gen user experiences with Figma, motion UI, and AI-driven prototypes.',
      location: 'Remote',
      type: 'Internship',
      department: 'Design',
    },
    {
      title: 'Brand & Visual Designer',
      level: 'Mid-Level',
      description: 'Develop visual identities, campaigns, and brand systems for global clients.',
      location: 'On-site',
      type: 'Full-time',
      department: 'Design',
    },
    {
      title: 'Frontend Developer',
      level: 'Intern',
      description: 'Work with React/Next.js to build interactive web experiences.',
      location: 'Remote',
      type: 'Internship',
      department: 'Development',
    },
    {
      title: 'AI Engineer',
      level: 'Mid-Level',
      description: 'Integrate AI and automation tools into digital products and experiences.',
      location: 'Hybrid',
      type: 'Full-time',
      department: 'Development',
    },
    {
      title: 'Social Media Strategist',
      level: 'Intern',
      description: 'Craft social campaigns that connect brands with their audiences.',
      location: 'Remote',
      type: 'Internship',
      department: 'Marketing',
    },
    {
      title: 'Digital Marketing Executive',
      level: 'Mid-Level',
      description: 'Lead performance marketing and SEO campaigns for growth-driven results.',
      location: 'On-site',
      type: 'Full-time',
      department: 'Marketing',
    },
    {
      title: 'Project Coordinator',
      level: 'Intern',
      description: 'Collaborate with design and tech teams to manage agile workflows.',
      location: 'Hybrid',
      type: 'Internship',
      department: 'Strategy',
    },
    {
      title: 'Business Development Executive',
      level: 'Mid-Level',
      description: 'Drive new client relationships and growth opportunities.',
      location: 'On-site',
      type: 'Full-time',
      department: 'Strategy',
    },
  ];

  const filteredJobs = activeFilter === 'All' 
    ? jobs 
    : jobs.filter(job => job.department === activeFilter);

  const jobsByDepartment = {
    Design: jobs.filter(j => j.department === 'Design'),
    Development: jobs.filter(j => j.department === 'Development'),
    Marketing: jobs.filter(j => j.department === 'Marketing'),
    Strategy: jobs.filter(j => j.department === 'Strategy'),
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  const handlePortfolioClick = () => {
    setSelectedJob(null); // No specific job selected
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    if (selectedJob) {
      console.log('Application submitted for:', selectedJob.title);
    } else {
      console.log('Portfolio submission received');
    }
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-[#FFAC3E]" />
              <span className="text-sm text-zinc-400">We're Hiring</span>
            </div>
            
            <h1 className="mb-6 text-white" style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1 }}>
              Current Openings
            </h1>
            
            <p className="text-zinc-400 max-w-3xl mx-auto" style={{ fontSize: '1.125rem' }}>
              Explore roles across our creative, tech, and strategy teams. Join us in building the future of design and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-6 sticky top-0 bg-black/95 backdrop-blur-lg z-40 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeFilter === dept
                    ? 'bg-[#FFAC3E] text-black'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {activeFilter === 'All' ? (
            // Department Expandable View
            <div className="space-y-6">
              {Object.entries(jobsByDepartment).map(([dept, deptJobs]) => (
                <motion.div
                  key={dept}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#FFAC3E]/30 transition-all duration-300"
                >
                  {/* Department Header */}
                  <button
                    onClick={() => setExpandedDept(expandedDept === dept ? null : dept)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-zinc-900/70 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FFAC3E]/10 border border-[#FFAC3E]/30 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-[#FFAC3E]" />
                      </div>
                      <div className="text-left">
                        <h2 className="text-white" style={{ fontSize: '1.5rem' }}>
                          {dept} Team
                        </h2>
                        <p className="text-zinc-500 text-sm">
                          {deptJobs.length} Open Position{deptJobs.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-[#FFAC3E] transition-transform duration-300 ${
                        expandedDept === dept ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Job Cards Grid */}
                  {expandedDept === dept && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deptJobs.map((job, index) => (
                          <JobCard key={index} job={job} onApply={handleApply} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            // Filtered Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <JobCard key={index} job={job} onApply={handleApply} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-white" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              Didn't find your role?
            </h2>
            <p className="text-zinc-400 mb-8" style={{ fontSize: '1.125rem' }}>
              We're always looking for creative minds. Send us your portfolio and let's talk.
            </p>
            <Button 
              onClick={handlePortfolioClick} // Add onClick handler
              className="bg-[#FFAC3E] hover:bg-[#FF9A1E] text-black px-8 py-6 border-0 group"
            >
              Send Your Portfolio
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white" style={{ fontSize: '1.5rem' }}>
              {selectedJob ? `Apply for ${selectedJob.title}` : 'Portfolio Submission'}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              {selectedJob 
                ? `${selectedJob.level} • ${selectedJob.department} Team` 
                : 'Submit your portfolio to join our creative team'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-white">Portfolio/LinkedIn URL</Label>
              <Input
                id="portfolio"
                type="url"
                placeholder="https://portfolio.com"
                required={selectedJob === null} // Make required for portfolio submissions
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume" className="text-white">Resume (PDF/DOC)</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="bg-zinc-900 border-zinc-800 text-white file:text-white file:bg-[#FFAC3E]/20 file:border-[#FFAC3E]/30 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-white">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                placeholder={selectedJob 
                  ? `Tell us why you're a great fit for the ${selectedJob.title} role...` 
                  : 'Tell us about yourself and why you want to join our team...'}
                rows={6}
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#FFAC3E]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-[#FFAC3E] hover:bg-[#FF9A1E] text-black border-0"
              >
                {selectedJob ? 'Submit Application' : 'Submit Portfolio'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="bg-transparent border-zinc-800 hover:bg-zinc-900 text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-[#FFAC3E] hover:shadow-lg hover:shadow-[#FFAC3E]/10 transition-all duration-300 group"
    >
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <span className="inline-block px-3 py-1 bg-[#FFAC3E]/10 border border-[#FFAC3E]/30 rounded-full text-sm text-[#FFAC3E]">
            {job.level}
          </span>
        </div>
        
        <h3 className="text-white mb-2" style={{ fontSize: '1.25rem' }}>
          {job.title}
        </h3>
        
        <p className="text-zinc-400 mb-4 line-clamp-2">
          {job.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
      </div>

      <Button
        onClick={() => onApply(job)}
        className="w-full bg-transparent border-2 border-zinc-800 hover:border-[#FFAC3E] hover:bg-[#FFAC3E] hover:text-black text-white transition-all duration-300 group/btn"
      >
        Apply Now
        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
}